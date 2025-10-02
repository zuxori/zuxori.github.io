// Node 18+ (built-in fetch). Save as upsert-demo-index.js
import fs from "fs/promises";

// ===== Config =====
const FILE_PATH        = "./zuxori-repomix.txt";
const CF_ACCOUNT_ID    = process.env.CF_ACCOUNT_ID;
const CF_API_TOKEN     = process.env.CF_API_TOKEN;
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_HOST    = process.env.PINECONE_HOST;   // e.g. https://<host>.svc.us-east-1-aws.pinecone.io
const NAMESPACE        = process.env.NAMESPACE || "myth-socket-demo";

// Chunk targets (approximate 400 tokens; ~4 chars/token → ~1600 chars)
const TARGET_CHARS      = 1600;
const MIN_CHARS         = 1000;   // don’t create ultra-short fragments
const MAX_CHARS         = 1900;   // stay well under 512-token cap
const UPSERT_BATCH_SIZE = 64;     // Pinecone batch size
const SLEEP_MS          = 150;    // polite delay between embeds

// ===== Helpers =====
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// Sentence-aware chunking with soft limits
function chunkBySentences(text) {
  const sentences = text
    .replace(/\r\n/g, "\n")
    .split(/(?<=[.!?…])\s+(?=[A-Z0-9"“‘(])/m); // rough sentence splitter

  const chunks = [];
  let buf = "";

  const flush = () => {
    const trimmed = buf.trim();
    if (trimmed.length >= MIN_CHARS || (trimmed.length > 0 && chunks.length === 0)) {
      chunks.push(trimmed);
    }
    buf = "";
  };

  for (const s of sentences) {
    if ((buf + " " + s).length <= TARGET_CHARS) {
      buf = buf ? (buf + " " + s) : s;
    } else {
      if (buf.length >= MIN_CHARS) {
        flush();
        buf = s;
      } else {
        // current buffer is too small; try to pack more until MAX_CHARS
        if ((buf + " " + s).length <= MAX_CHARS) {
          buf = buf ? (buf + " " + s) : s;
        } else {
          // even adding one sentence would exceed MAX; force flush whatever we have
          flush();
          buf = s;
        }
      }
    }
  }
  if (buf.trim().length) flush();

  // final cleanup: trim empties
  return chunks.filter(Boolean);
}

// Normalize Workers AI embedding response (handles array-of-arrays, etc.)
function extractEmbedding(json) {
  // CF API v4 typically returns { result: { data: [[...]] } }
  if (json?.result?.data) {
    const d = json.result.data;
    if (Array.isArray(d[0])) return d[0];
    if (d[0]?.embedding) return d[0].embedding;
  }
  // Fallbacks for other shapes
  if (Array.isArray(json?.data)) {
    if (Array.isArray(json.data[0])) return json.data[0];
    if (json.data[0]?.embedding) return json.data[0].embedding;
  }
  if (Array.isArray(json?.embeddings)) return json.embeddings;
  if (Array.isArray(json)) return json;
  throw new Error("Unexpected CF embedding shape: " + JSON.stringify(json)?.slice(0, 300));
}

// CF Workers AI embed
async function embedWithWorkersAI(text) {
  const url = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/ai/run/@cf/baai/bge-base-en-v1.5`;
  const r = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${CF_API_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text })
  });
  if (!r.ok) {
    const body = await r.text();
    throw new Error(`CF AI embed failed: ${r.status} ${body}`);
  }
  const j = await r.json();
  return extractEmbedding(j); // returns 768-dim array
}

// Pinecone upsert (batch)
async function upsertBatch(vectors) {
  const url = `${PINECONE_HOST.replace(/\/$/,"")}/vectors/upsert`;
  const r = await fetch(url, {
    method: "POST",
    headers: {
      "Api-Key": PINECONE_API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ vectors, namespace: NAMESPACE })
  });
  if (!r.ok) {
    const body = await r.text();
    throw new Error(`Pinecone upsert failed: ${r.status} ${body}`);
  }
}

async function main() {
  // Guard-env
  for (const [k,v] of Object.entries({
    CF_ACCOUNT_ID, CF_API_TOKEN, PINECONE_API_KEY, PINECONE_HOST
  })) {
    if (!v) throw new Error(`Missing env var: ${k}`);
  }

  const raw = await fs.readFile(FILE_PATH, "utf8");
  // Optional: collapse extreme whitespace to help chunking
  const text = raw.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n");
  const chunks = chunkBySentences(text);
  console.log(`📄 Source: ${FILE_PATH}`);
  console.log(`✂️  Created ${chunks.length} chunks (avg ~${Math.round(text.length / chunks.length)} chars/chunk).`);

  const vectors = [];
  for (let i = 0; i < chunks.length; i++) {
    const chunkText = chunks[i];
    try {
      const embedding = await embedWithWorkersAI(chunkText);
      vectors.push({
        id: `msd-${i.toString().padStart(6,"0")}`,
        values: embedding,
        metadata: { text: chunkText }
      });
      if (vectors.length >= UPSERT_BATCH_SIZE) {
        await upsertBatch(vectors.splice(0, vectors.length));
        process.stdout.write(`⬆️  Upserted ${i+1}/${chunks.length}\r`);
      }
    } catch (e) {
      console.error(`\n⚠️  Embed/upsert error at chunk ${i}:`, e.message);
    }
    await sleep(SLEEP_MS); // be polite to CF API
  }
  if (vectors.length) {
    await upsertBatch(vectors);
  }
  console.log(`\n✅ Done. Upserted ${chunks.length} chunks to namespace "${NAMESPACE}".`);
}

main().catch(err => {
  console.error("Fatal:", err);
  process.exit(1);
});