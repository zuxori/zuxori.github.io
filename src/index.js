// Myth-Socket: public register + quota + search + chat (persona-enhanced)
// - Workers AI embeddings (@cf/baai/bge-base-en-v1.5)
// - Workers AI LLM (model from env.LLM_MODEL or default Llama 3.1 8B Instruct)
// - Per-key quotas; register is open with IP/day limit + max 100 active keys + 7-day TTL
// - Chat routes retrieve context, then synthesize a reply in selected persona's voice.

// Ensure a per-isolate KV prompt cache exists
const PERSONA_CACHE = globalThis.__PERSONA_CACHE || (globalThis.__PERSONA_CACHE = new Map());
// Retrieval config
const DEFAULT_TOPK = Number.parseInt(globalThis.TOPK ?? 3, 10); // mirror Chat with Zu

// --- NYC context (time + weather), cached for ~10 min ---

function wxCodeToText(code) {
  const c = Number(code);
  if (c === 0) return "clear";
  if ([1,2].includes(c)) return "mostly clear";
  if (c === 3) return "overcast";
  if ([45,48].includes(c)) return "fog";
  if ([51,53,55].includes(c)) return "drizzle";
  if ([56,57].includes(c)) return "freezing drizzle";
  if ([61,63,65].includes(c)) return "rain";
  if ([66,67].includes(c)) return "freezing rain";
  if ([71,73,75].includes(c)) return "snow";
  if ([80,81,82].includes(c)) return "rain showers";
  if ([85,86].includes(c)) return "snow showers";
  if (c === 95) return "thunderstorm";
  if ([96,99].includes(c)) return "thunderstorm with hail";
  return "unknown conditions";
}

// --- Local moon calculations (no external API) ---
// Minimal port of SunCalc-style formulas for moon position & illumination.
const PI = Math.PI, rad = PI / 180;
function toRad(d){ return d*rad; }
const dayMs = 1000*60*60*24;
const J1970 = 2440588;
const J2000 = 2451545;
function toJulian(date){ return date.valueOf()/dayMs - 0.5 + J1970; }
function toDays(date){ return toJulian(date) - J2000; }

// Astronomical constants
const e = toRad(23.4397); // obliquity

function rightAscension(l, b){ return Math.atan2(Math.sin(l)*Math.cos(e) - Math.tan(b)*Math.sin(e), Math.cos(l)); }
function declination(l, b){ return Math.asin(Math.sin(b)*Math.cos(e) + Math.cos(b)*Math.sin(e)*Math.sin(l)); }
function azimuth(H, phi, dec){ return Math.atan2(Math.sin(H), Math.cos(H)*Math.sin(phi) - Math.tan(dec)*Math.cos(phi)); }
function altitude(H, phi, dec){ return Math.asin(Math.sin(phi)*Math.sin(dec) + Math.cos(phi)*Math.cos(dec)*Math.cos(H)); }

function siderealTime(d, lw){ return toRad((280.16 + 360.9856235*d) % 360) - lw; }

// Moon ecliptic longitude/latitude/dist approx
function moonCoords(d){
  const L = toRad((218.316 + 13.176396*d) % 360); // ecliptic longitude
  const M = toRad((134.963 + 13.064993*d) % 360); // mean anomaly
  const F = toRad((93.272 + 13.229350*d) % 360);  // mean distance
  // perturbations
  const l = L + toRad(6.289)*Math.sin(M);
  const b = toRad(5.128)*Math.sin(F);
  const dt = 385001 - 20905*Math.cos(M);
  return { ra: rightAscension(l, b), dec: declination(l, b), dist: dt, lon:l, lat:b };
}

// Sun ecliptic longitude approx (for illumination)
function solarMeanAnomaly(d){ return toRad((357.5291 + 0.98560028*d) % 360); }
function eclipticLongitude(M){
  const C = toRad(1.9148)*Math.sin(M) + toRad(0.02)*Math.sin(2*M) + toRad(0.0003)*Math.sin(3*M);
  const P = toRad(102.9372); // perihelion
  return M + C + P + PI; // longitude
}
function sunCoords(d){
  const M = solarMeanAnomaly(d);
  const L = eclipticLongitude(M);
  return { ra: rightAscension(L, 0), dec: declination(L, 0) };
}

function getMoonPosition(date, lat, lon){
  const lw = toRad(-lon);
  const phi = toRad(lat);
  const d = toDays(date);
  const c = moonCoords(d);
  const H = siderealTime(d, lw) - c.ra;
  const h = altitude(H, phi, c.dec);
  // parallax correction (~0.017)
  const hCorr = h - toRad(0.017) / Math.tan(h + toRad(10.26)/(h + toRad(5.10)));
  return { azimuth: azimuth(H, phi, c.dec), altitude: hCorr, dist: c.dist };
}

// Sun position helper (reuse shared math)
function getSunPosition(date, lat, lon){
  const lw = toRad(-lon);
  const phi = toRad(lat);
  const d = toDays(date);
  const s = sunCoords(d);
  const H = siderealTime(d, lw) - s.ra;
  const h = altitude(H, phi, s.dec);
  return { azimuth: azimuth(H, phi, s.dec), altitude: h };
}

function getMoonIllumination(date){
  const d = toDays(date);
  const s = sunCoords(d);
  const m = moonCoords(d);
  const sdist = 149598000; // km
  const phi = Math.acos(Math.sin(s.dec)*Math.sin(m.dec) + Math.cos(s.dec)*Math.cos(m.dec)*Math.cos(s.ra - m.ra));
  const inc = Math.atan2(sdist*Math.sin(phi), m.dist - sdist*Math.cos(phi));
  const fraction = (1 + Math.cos(inc)) / 2; // illuminated fraction (0..1)
  // phase orientation (waxing vs waning): sign of this angle indicates waxing (>0) or waning (<0)
  const angle = Math.atan2(
    Math.cos(s.dec)*Math.sin(s.ra - m.ra),
    Math.sin(s.dec)*Math.cos(m.dec) - Math.cos(s.dec)*Math.sin(m.dec)*Math.cos(s.ra - m.ra)
  );
  const waxing = angle > 0; // SunCalc convention
  // normalized phase age (0=new, 0.25=first quarter, 0.5=full, 0.75=last quarter)
  const phase = 0.5 + 0.5 * (waxing ? 1 : -1) * (1 - inc/Math.PI);
  const normPhase = Math.max(0, Math.min(1, phase));
  return { fraction, phase: normPhase, waxing };
}

function moonPhaseLabel(fraction, waxing) {
  if (!Number.isFinite(fraction)) return "unknown";
  const f = Math.max(0, Math.min(1, fraction));
  if (f < 0.03) return "new";
  if (f < 0.35) return "thin crescent";          // waxing/waning both sound natural
  if (f < 0.65) return "half";                   // quarter phases
  if (f < 0.95) return waxing ? "almost full" : "just past full";
  return "full";
}

async function nycContext() {
  // Local NYC time/date string
  const nowNY = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    weekday: "long",
    year: "numeric", month: "long", day: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true
  });

  // Weather via Open-Meteo (free) with imperial units
  const cache = caches.default;
  const wxURL = "https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.0060&current=temperature_2m,weather_code,precipitation,cloud_cover,wind_speed_10m,relative_humidity_2m&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York";
  let resp = await cache.match(wxURL);
  if (!resp) {
    resp = await fetch(wxURL, { cf: { cacheTtl: 600, cacheEverything: true } });
    if (resp.ok) await cache.put(wxURL, resp.clone());
  }

  let wxText = "weather unavailable";
  let cloudCoverPct = undefined;
  try {
    const j = await resp.json();
    const cur = j && j.current;
    if (cur) {
      const parts = [];
      if (typeof cur.temperature_2m === 'number') parts.push(`${Math.round(cur.temperature_2m)}°F`);
      if (typeof cur.weather_code !== 'undefined') parts.push(wxCodeToText(cur.weather_code));
      if (typeof cur.cloud_cover === 'number') parts.push(`${cur.cloud_cover}% cloud cover`);
      if (typeof cur.wind_speed_10m === 'number') parts.push(`wind ${Math.round(cur.wind_speed_10m)} mph`);
      if (typeof cur.relative_humidity_2m === 'number') parts.push(`humidity ${Math.round(cur.relative_humidity_2m)}%`);
      if (typeof cur.precipitation === 'number' && cur.precipitation > 0) parts.push(`${cur.precipitation}" precip`);
      if (parts.length) wxText = parts.join(", ");
      if (typeof cur.cloud_cover === 'number') cloudCoverPct = cur.cloud_cover;
    }
  } catch (_) {}

  // Moon phase / visibility (local calc; no external API)
  let moonText = "moon data unavailable";
  try {
    const now = new Date();
    const pos = getMoonPosition(now, 40.7128, -74.0060);
    const illum = getMoonIllumination(now);
    const sunPos = getSunPosition(now, 40.7128, -74.0060);
    const phaseSimple = moonPhaseLabel(illum.fraction, illum.waxing);

    // Visibility: geometric + conditions. If moon above horizon, check clouds; mark daytime visibility if sun above horizon.
    let vis = 'not visible';
    if (pos.altitude > 0) {
      const cloudy = (typeof cloudCoverPct === 'number') ? (cloudCoverPct >= 70) : false; // 70%+ clouds considered obscured
      if (sunPos.altitude > 0) {
        vis = cloudy ? 'daytime (likely obscured)' : 'daytime';
      } else {
        vis = cloudy ? 'obscured' : 'visible';
      }
    }
    moonText = `${phaseSimple}, ${vis}`;
  } catch (_) {}

  return {
    systemLine:
      `Context — New York City: ${nowNY}. Current weather: ${wxText}. Moon: ${moonText}. Use naturally only when relevant; don't over-mention.`
  };
}

// --- UI/CSS NOTE ---
// To match the UI's .llmInputBox/.llmInput styling, update your CSS for .llmResponse:
// .llmResponse {
//   max-width: 700px;
//   margin-left: auto;
//   margin-right: auto;
//   white-space: pre-wrap;
//   word-wrap: break-word;
// }

export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      if (request.method === "OPTIONS") return handleOptions(env, request);

      // Health
      if (url.pathname === "/health") {
        return json({ ok: true, time: new Date().toISOString() }, 200, env, request);
      }

      // Public /register (no invite), with IP/day + cap 100 + TTL 7d
      if (url.pathname === "/register" && request.method === "POST") {
        const ip = request.headers.get("CF-Connecting-IP") || "0.0.0.0";

        // 1 per IP per day
        const ipKey = `regip:${ip}:${pstDayKey()}`;
        if (await env.RATE_LIMIT.get(ipKey)) {
          return json({ error: "Already issued a key for this IP today" }, 429, env, request);
        }

        // max 100 active keys
        const active = await listActiveKeys(env);
        if ((active.keys?.length || 0) >= 100) {
          return json({ error: "Max active demo keys reached, try later" }, 429, env, request);
        }

        const key = `MSK-${await randBase32(12)}`;
        const expiresInDays = 7;
        const expiresAt = new Date(Date.now() + expiresInDays * 24 * 3600 * 1000).toISOString();
        const record = { status: "active", createdAt: new Date().toISOString(), expiresAt };
        await env.DEMO_KEYS.put(keyRecordKey(key), JSON.stringify(record), {
          expirationTtl: expiresInDays * 24 * 3600
        });
        await env.RATE_LIMIT.put(ipKey, "1", { expirationTtl: secondsUntilNextMidnightPST() });

        return json({ key, expiresInDays }, 200, env, request);
      }

      // Quota-protected routes
      const route = routeLimits(url.pathname, request.method);
      if (route) {
        const key = getDemoKeyOrThrow(request);
        const rec = await getKeyRecord(env, key);
        if (!rec) return json({ error: "invalid key" }, 401, env, request);
        if (rec.status !== "active") return json({ error: "key disabled" }, 403, env, request);

        const limit = (rec.limits && typeof rec.limits[route.bucket] === "number")
          ? rec.limits[route.bucket]
          : route.limit;

        const ok = await enforceDailyQuota(env, key, route.bucket, limit);
        if (!ok) return json({ error: "quota exceeded for today" }, 429, env, request);
      }

      // Quota read (doesn't increment)
      if (url.pathname === "/quota" && request.method === "GET") {
        const key = getDemoKeyOrThrow(request);
        const day = pstDayKey();
        const searchUsed = await readCount(env, day, "search", key);
        const chatUsed   = await readCount(env, day, "chat",   key);

        // Pull expiry info from KV record if present
        let expiresAt = null;
        let expiresInDays = null;
        try {
          const rec = await getKeyRecord(env, key);
          if (rec && rec.expiresAt) {
            expiresAt = rec.expiresAt;
            const ms = new Date(expiresAt).getTime() - Date.now();
            if (Number.isFinite(ms)) {
              expiresInDays = Math.max(0, Math.ceil(ms / (24*3600*1000)));
            }
          }
        } catch(_) {}

        return json({ day, used: { search: searchUsed, chat: chatUsed }, expiresAt, expiresInDays }, 200, env, request);
      }

      // SEARCH (debug/internal; still available if you want to call it)
      if (url.pathname === "/search" && request.method === "POST") {
        const { text } = await safeJson(request);
        const TOPK = DEFAULT_TOPK;
        if (!text) return json({ error: "text is required" }, 400, env, request);
        const vector = await embedOpenAI(text, env);
        const NAMESPACE = (env.INDEX_NAMESPACE ?? "").trim();
        const result = await pineconeQuery(vector, TOPK, NAMESPACE, env);
        return json({ namespace: NAMESPACE, matches: result.matches || [] }, 200, env, request);
      }

      // CHAT — persona-enhanced RAG
      if (url.pathname === "/chat" && request.method === "POST") {
        const { persona = "ZU", message, history } = await safeJson(request);
        const PERSONA = String(persona || "ZU").toUpperCase();
        const TOPK = DEFAULT_TOPK;
        if (!message) return json({ error: "message is required" }, 400, env, request);

        // 1) Retrieve
        const vector = await embedOpenAI(message, env);
        const NAMESPACE = (env.INDEX_NAMESPACE ?? "").trim();
        console.log("[RAG] persona=", PERSONA, "ns=", (NAMESPACE || "<default>"), "topK=", TOPK, "dims=", Array.isArray(vector) ? vector.length : null);
        const result = await pineconeQuery(vector, TOPK, NAMESPACE, env);
        console.log("[RAG] pinecone matches:", Array.isArray(result?.matches) ? result.matches.length : null);
        const matches = Array.isArray(result?.matches) ? result.matches : [];
        if (matches.length === 0) {
          console.log("[RAG] no matches — check namespace, host, and that index has data");
        }
        const snippets = matches
        .map(m => (m && m.metadata && typeof m.metadata.text === 'string') ? m.metadata.text : "")
        .filter(Boolean)
        .slice(0, Math.max(1, Math.min(5, TOPK)));

        // --- Build short-term memory from client-provided history (last 6 turns) ---
        const historyArr = Array.isArray(history) ? history : [];
        const prunedHistory = historyArr
          .filter(m => m && typeof m.content === 'string' && (m.role === 'user' || m.role === 'assistant'))
          .slice(-6); // keep last 6 turns max

        // 2) NYC context (time + weather)
        const { systemLine } = await nycContext();
        const timeWeatherSystem = { role: "system", content: systemLine };

        // 3) Build prompt with persona style + retrieved context (two system messages)
        const sys = await personaSystemPrompt(PERSONA, env);
        const lore = snippets.join("\n\n---\n\n").slice(0, 4000);

        const baseSystem = {
          role: "system",
          content: sys || "You are Zu. If you lose track say: 'Sorry—there’s a lot going on.'"
        };

        const loreSystem = lore
          ? { role: "system", content: "Here are relevant lore excerpts:\n\n" + lore }
          : null;

        const messages = [
          timeWeatherSystem,
          baseSystem,
          ...(loreSystem ? [loreSystem] : []),
          ...prunedHistory,
          { role: "user", content: message }
        ];

        // 4) Call CF Workers AI LLM
        const chatModel = env.OPENAI_CHAT_MODEL || "gpt-4-turbo";
        const r = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
                "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
                "Content-Type": "application/json"
            },
        body: JSON.stringify({
                model: chatModel,
                messages,
                temperature: 1.0,
                top_p: 0.95,
                max_tokens: 256,
                presence_penalty: 0.6,
         })
            });
            const jr = await r.json();
            if (!r.ok) throw new Error(jr?.error?.message || "OpenAI chat error");
            const content = jr?.choices?.[0]?.message?.content ?? "(no response)";

        return json({ persona: PERSONA, matchCount: snippets.length, reply: content ?? "(no response)", format: "markdown" }, 200, env, request);
      }

      return json({ error: "not found" }, 404, env, request);
    } catch (err) {
      return json({ error: err.message || String(err) }, 500, env, request);
    }
  }
};

// ===== Limits =====
// Keep both; chat has its own daily quota (tweak as you like).
function routeLimits(path, method) {
  if (path === "/search" && method === "POST") return { bucket: "search", limit: 40 };
  if (path === "/chat"   && method === "POST") return { bucket: "chat",   limit: 40 };
  return null;
}

// ===== Key registry =====
function keyRecordKey(key) { return `key:${key}`; }
async function getKeyRecord(env, key) {
  const j = await env.DEMO_KEYS.get(keyRecordKey(key));
  return j ? JSON.parse(j) : null;
}
async function listActiveKeys(env) {
  // KV list() returns {keys:[{name}...]}
  return await env.DEMO_KEYS.list();
}

// ===== Identity =====
function getDemoKeyOrThrow(request) {
  const key = request.headers.get("x-demo-key");
  if (!key) throw new Error("missing x-demo-key");
  return key;
}

// ===== Rate limiting =====
async function enforceDailyQuota(env, key, bucket, limit) {
  const day = pstDayKey();
  const kvKey = `rl:${day}:${bucket}:${key}`;
  const current = parseInt((await env.RATE_LIMIT.get(kvKey)) || "0", 10);
  if (current >= limit) return false;
  await env.RATE_LIMIT.put(kvKey, String(current + 1), { expirationTtl: secondsUntilNextMidnightPST() });
  return true;
}
async function readCount(env, day, bucket, key) {
  const kvKey = `rl:${day}:${bucket}:${key}`;
  return parseInt((await env.RATE_LIMIT.get(kvKey)) || "0", 10);
}
function pstDayKey(date = new Date()) {
  const pst = new Date(date.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
  return pst.toISOString().slice(0, 10);
}
function secondsUntilNextMidnightPST() {
  const now = new Date();
  const pstNow = new Date(now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
  const next = new Date(pstNow); next.setHours(24, 0, 0, 0);
  return Math.max(60, Math.ceil((next - pstNow) / 1000)); // CF KV requires TTL >= 60
}

// ===== Common =====
async function safeJson(request) {
  const txt = await request.text();
  return txt ? JSON.parse(txt) : {};
}
function cors(env, request) {
  return {
    "Access-Control-Allow-Origin": env.ALLOW_ORIGIN || "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "content-type,x-demo-key"
  };
}
function handleOptions(env, request) { return new Response(null, { headers: cors(env, request) }); }
function json(data, status, env, request) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json", ...cors(env, request) }
  });
}

// ===== Embeddings (OpenAI) =====
async function embedOpenAI(text, env) {
  text = truncateTokensApprox(text, 400); // keep it short for speed/cost
  const key = "e:" + (await sha256Hex(text));
  const cached = await env.EMBED_CACHE?.get?.(key);
  if (cached) return JSON.parse(cached);

  const model = env.OPENAI_EMBED_MODEL || "text-embedding-3-small";
  const r = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ model, input: text })
  });
  if (!r.ok) throw new Error("OpenAI embeddings failed: " + (await r.text()));
  const j = await r.json();
  const vec = j?.data?.[0]?.embedding;
  if (!Array.isArray(vec)) throw new Error("Bad embedding shape");
  // cache if KV bound
  try { await env.EMBED_CACHE.put(key, JSON.stringify(vec), { expirationTtl: 86400 }); } catch (_) {}
  return vec;
}
function truncateTokensApprox(s, tokenTarget = 400) {
  const charCap = tokenTarget * 4;
  return s.length <= charCap ? s : s.slice(0, charCap);
}
async function sha256Hex(s) {
  const b = new TextEncoder().encode(s);
  const d = await crypto.subtle.digest("SHA-256", b);
  return [...new Uint8Array(d)].map(x=>x.toString(16).padStart(2,"0")).join("");
}

// ===== Pinecone =====
function pineconeURL(env, path) {
  const base = env.PINECONE_HOST.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
}
async function pineconeQuery(vector, topK, namespace, env) {
  const payload = { vector, topK, includeMetadata: true };
  if (namespace && namespace.length > 0) payload.namespace = namespace; // omit for default namespace
  const r = await fetch(pineconeURL(env, "/query"), {
    method: "POST",
    headers: { "Api-Key": env.PINECONE_API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!r.ok) throw new Error("Pinecone query failed: " + (await r.text()));
  return r.json();
}

// ===== Personas & LLM helpers =====
// personaSystemPrompt(name, env): fetch persona's full system prompt from KV (PERSONAS)
async function personaSystemPrompt(name, env) {
  const key = String(name || "ZU").toUpperCase();
  const cacheKey = `persona:${key}`;
  if (PERSONA_CACHE.has(cacheKey)) return PERSONA_CACHE.get(cacheKey);

  const prompt = (await env.PERSONAS.get(`persona:${key}`)) || "";
  PERSONA_CACHE.set(cacheKey, prompt);
  return prompt;
}

// ===== Random key util =====
async function randBase32(n=12) {
  const bytes = new Uint8Array(n);
  crypto.getRandomValues(bytes);
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let out = "";
  for (const b of bytes) out += alphabet[b % alphabet.length];
  return out;
}