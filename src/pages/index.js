import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import styles from './index.module.css';

export default function Home() {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // 🔁 State for dynamic placeholder
  const zuPrompts = [
    "Ask Zu .. what it feels like to remember a life that hasn’t happened yet",
    "Ask Zu .. what changed after Verona",
    "Ask Zu .. if Ori always finds her",
    "Ask Zu .. what Tai is hiding",
    "Ask Zu .. how many timelines she’s broken",
    "Ask Zu .. who she was before Juliet",
    "Ask Zu .. if memory is something you can trust",
    "Ask Zu .. what the red thread is tied to",
    "Ask Zu .. why some lives are louder than others",
    "Ask Zu .. if this version of the story ends differently"
  ];

  const [placeholder, setPlaceholder] = React.useState(zuPrompts[0]);

const [zuReply, setZuReply] = useState('');
const [loading, setLoading] = useState(false);

const sendToZu = async () => {
  if (!inputValue.trim()) return;

  setLoading(true);
  setZuReply("Messaging Zu...");

  try {
    const res = await fetch("https://zu-portal.hello-7ef.workers.dev/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: inputValue })
    });

    const data = await res.json();
    if (data.error) throw new Error(data.error);

    setZuReply(data.reply ?? "Zu didn't respond clearly.");
  } catch (err) {
    console.error("sendToZu error:", err);
    setZuReply(`Zu is in class. (${err.message})`);
  } finally {
    setLoading(false);
    setInputValue("");
  }
};
  // 🎯 Animate placeholder every 4 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * zuPrompts.length);
      setPlaceholder(zuPrompts[random]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // 🌊 Smooth scroll setup
  useEffect(() => {
    import('smooth-scroll').then(({ default: SmoothScroll }) => {
      new SmoothScroll('a[href*="#"]', {
        speed: 300,
        speedAsDuration: true,
        easing: 'linear',
        offset: 0,
      });
    });
  }, []);

  return (
    <Layout
      title="ZU X ORI Portal"
      description="The reincarnation sequel to Romeo + Juliet, told through story, research, and mythic design — across lifetimes, timelines, and GitHub repositories."
    >
      <Head>
        <title>ZU X ORI Portal</title>
      </Head>
      
      <main>

        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1 className={styles.title}>ZU X ORI</h1>
              <h2 className={styles.title}>
  the open-source reincarnation sequel to Romeo{" "}
  <span className={styles.plusRotate}>
    <span className={styles.barHorizontal} />
    <span className={styles.barVertical} />
  </span>{" "}
  Juliet
</h2>           <p className={styles.subtitle}>Reborn in New York. Haunted by Verona.</p>
              <p className={styles.tagline}>
               
              </p>
              <div className={styles.buttonGroup}>
                <a
                  href="#chat"
                  className={styles.cta}
                >
                  Chat with Zu ✨
                </a>
                <a
                  href="/repomix.txt"
                  className={styles.cta}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Copy LLMs.txt
                </a>
              </div>
            </div>
            <div className={styles.heroImage}>
              <img src="/img/zuxori-logo-tp.png" alt="ZU X ORI Logo" />
            </div>
          </div>
        </section>

         {/* Chat Section */}
                <section id="chat" className={`${styles.coreRepos} ${styles.llmEmbed}`}>
                  <div className={styles.sectionHeader}>
                    <h2>Chat with Zu</h2>
                    <p>About her story, her memories, and the lore of ZU X ORI</p>
                  </div>

                  <div className={styles.llmInputBox}>
                  <input
  type="text"
  value={inputValue}
  onChange={(e) => setInputValue(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevents default form submit behavior if inside a form
      sendToZu();
    }
  }}
  placeholder={placeholder}
  className={styles.llmInput}
/>
  <button
    className={styles.llmSubmit}
    onClick={sendToZu}
    disabled={loading}
  >
    {loading ? "..." : "Send"}
  </button>
</div>

{zuReply && (
  <div className={styles.llmResponse}>
    <p>{zuReply}</p>
  </div>
)}

                    {hasInteracted && (
                     <iframe
                     src="https://zuxori-zu.hf.space"
                     style={{ width: "100%", height: "600px", border: "none" }}
                     title="Chat with Zu"
                     allow="clipboard-read; clipboard-write"
                   />
                    )}
                </section>

              {/* Visual Cards */}
                <section className={styles.coreRepos}>
                  <div className={styles.sectionHeader}>
                    <h2>ZU X ORI Open Universe</h2>
                    <p>The ZU X ORI universe is a creator-led, open-source mythology</p>
                  </div>
                  <div className={styles.cardGrid}>
                    <div className={styles.imageCard}>
                      <img src="/img/cover-square.webp" alt="Ori Poster" />
                      <h3>ZU X ORI</h3>
                      <p>The core of ZU X ORI is the original story by Sov, available on Amazon and PDF.</p>
                      <a href="https://www.amazon.com/dp/B0DJ4TFSWM" target="_blank" className={styles.cardButton}>Read</a>
                    </div>
                    <div className={styles.imageCard}>
                      <img src="/img/zu-profile.png" alt="Zu Poster" />
                      <h3>ZU</h3>
                      <p>Juliet reborn. Storyteller and co-host of the ZU X ORI podcast.</p>
                      <a href="#" className={styles.cardButton}>Listen</a>
                    </div>
                    <div className={styles.imageCard}>
                      <img src="/img/wright.png" alt="Logo Poster" />
                      <h3>MYTH ENGINE</h3>
                      <p>Explore our reincarnation mythology, retrieval tech, and LLM-authored research.</p>
                      <a href="#" className={styles.cardButton}>Learn</a>
                    </div>
                  </div>
                </section>


        {/* Core Repos (previously Story Repository) */}
        <section className={styles.coreRepos}>
  <div className={styles.sectionHeader}>
    <h2>Repo Archive</h2>
    <p>The source layers — story, character, images, and myth — shaping the ZU X ORI world</p>
  </div>
  <div className={styles.repoGrid}>

    <div className={styles.repoCard}>
    <a href="https://github.com/zuxori/story" target="_blank" rel="noopener noreferrer" className={styles.externalIcon}>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
    viewBox="0 0 24 24" stroke="#EC3D9F" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m5-3h5m0 0v5m0-5L10 14" />
  </svg>
</a>
      <div className={styles.repoHeader}>
        <span className={styles.emoji}>📖</span>
        <h3>Story</h3>
      </div>
      <p>Full episode archive and core narrative from Zu and Ori's reincarnated path.</p>
    </div>

    <div className={styles.repoCard}>
      <a href="https://github.com/zuxori/characters" target="_blank" rel="noopener noreferrer" className={styles.externalIcon}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
    viewBox="0 0 24 24" stroke="#EC3D9F" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m5-3h5m0 0v5m0-5L10 14" />
  </svg>
      </a>
      <div className={styles.repoHeader}>
        <span className={styles.emoji}>🧬</span>
        <h3>Characters</h3>
      </div>
      <p>Profiles, past lives, symbolic items, and memories of the cast reborn.</p>
    </div>

    <div className={styles.repoCard}>
      <a href="https://github.com/zuxori/research" target="_blank" rel="noopener noreferrer" className={styles.externalIcon}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
    viewBox="0 0 24 24" stroke="#EC3D9F" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m5-3h5m0 0v5m0-5L10 14" />
  </svg>
      </a>
      <div className={styles.repoHeader}>
        <span className={styles.emoji}>🔮</span>
        <h3>Research</h3>
      </div>
      <p>LLM-authored thought papers on reincarnation, karma, and memory.</p>
    </div>

    <div className={styles.repoCard}>
      <a href="https://github.com/zuxori/images" target="_blank" rel="noopener noreferrer" className={styles.externalIcon}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
    viewBox="0 0 24 24" stroke="#EC3D9F" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m5-3h5m0 0v5m0-5L10 14" />
  </svg>
      </a>
      <div className={styles.repoHeader}>
        <span className={styles.emoji}>🎨</span>
        <h3>Images</h3>
      </div>
      <p>Covers, logos and posters from the ZU X ORI creative universe.</p>
    </div>

    <div className={styles.repoCard}>
      <a href="https://github.com/zuxori/wallpapers" target="_blank" rel="noopener noreferrer" className={styles.externalIcon}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
    viewBox="0 0 24 24" stroke="#EC3D9F" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m5-3h5m0 0v5m0-5L10 14" />
  </svg>
      </a>
      <div className={styles.repoHeader}>
        <span className={styles.emoji}>🖼️</span>
        <h3>Wallpapers</h3>
      </div>
      <p>Download mobile and desktop backgrounds to carry with you.</p>
    </div>

    <div className={styles.repoCard}>
    <a href="https://github.com/zuxori/wallpapers" target="_blank" rel="noopener noreferrer" className={styles.externalIcon}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
    viewBox="0 0 24 24" stroke="#EC3D9F" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m5-3h5m0 0v5m0-5L10 14" />
  </svg>
      </a>
      <div className={styles.repoHeader}>
        <span className={styles.emoji}>🤝</span>
        <h3>Collaboration</h3>
      </div>
      <p> Scenes from the story, artworks by Undeadlu and others.</p>
    </div>

  </div>
</section>

              {/* Ecosystem */}
                <section className={`${styles.section} ${styles.ecosystem}`}>
          <div className={styles.sectionHeader}>
            <h2>Creative Ecosystem</h2>
            <p>Join us in bringing Zu and the ZU X ORI world to life</p>
          </div>

          <div className={styles.ecosystemGrid}>
          <div className={styles.ecosystemCard}>
              <img src="/img/lora.jpg" alt="ZU / LoRA" className={styles.ecosystemImage} />
              <h3>Zu / LoRA Model</h3>
              <p>A Flux LoRA image model fine-tuned on Zu's visual identity.</p>
              <a href="https://huggingface.co/USERNAME/zu-lora" target="_blank" className={styles.cardButton}>Generate</a>
            </div>
            
            <div className={styles.ecosystemCard}>
              <img src="/img/character.png" alt="Characters" className={styles.ecosystemImage} />
              <h3>Open Source Characters</h3>
              <p>Forkable, AI-ready character profiles for assistants, games, or narrative systems.</p>
              <a href="https://github.com/zuxori/characters" target="_blank" className={styles.cardButton}>View Repo</a>
            </div>

            <div className={styles.ecosystemCard}>
              <img src="/img/podcast.png" alt="Podcast" className={styles.ecosystemImage} />
              <h3>Podcast</h3>
              <p>Hosted by Sov and Zu. Conversations on memory, identity, myth, and tech.</p>
              <a href="https://open.spotify.com/show/YOUR-PODCAST-LINK" target="_blank" className={styles.cardButton}>Listen</a>
            </div>

            <div className={styles.ecosystemCard}>
              <img src="/img/tiktok2.jpg" alt="TikTok" className={styles.ecosystemImage} />
              <h3>Zu on TikTok</h3>
              <p>My first time on social — fragments, feelings, and maybe a little chaos.</p>
              <a href="https://tiktok.com/@zudreamer" target="_blank" className={styles.cardButton}>Follow</a>
            </div>

            <div className={styles.ecosystemCard}>
              <img src="/img/voice.jpg" alt="ZU Voice" className={styles.ecosystemImage} />
              <h3>Zu Voice</h3>
              <p>A custom-tuned language model trained on Zu’s personality, tone, and narrative arc.</p>
              <a href="#" className={styles.cardButton}>Meet Zu</a>
            </div>

            <div className={styles.ecosystemCard}>
              <img src="/img/llm.jpg" alt="LLM Research" className={styles.ecosystemImage} />
              <h3>ZU X ORI Research</h3>
              <p>LLM-authored thought papers on reincarnation, karma, memory, and paradox.</p>
              <a href="https://github.com/zuxori/research" target="_blank" className={styles.cardButton}>Explore</a>
            </div>
            </div>
        </section>


      </main>
    </Layout>
  );
}