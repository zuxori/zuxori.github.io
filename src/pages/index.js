import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import styles from './index.module.css';

export default function Home() {
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
      title="ZU X ORI Repository Portal"
      description="The reincarnation sequel to Romeo + Juliet, told through story, research, and mythic design — across lifetimes, timelines, and GitHub repositories."
    >
      <Head>
        <title>ZU X ORI Repository Portal</title>
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
                      placeholder={placeholder}
                      className={styles.llmInput}
                    />
                    <button className={styles.llmSubmit}>Send</button>
                  </div>

                  <iframe
                    src="https://huggingface.co/embed/USERNAME/zuxori-chat?token=YOUR_TOKEN"
                    style={{ width: '100%', height: '600px', border: 'none' }}
                    allow="clipboard-read; clipboard-write"
                    title="ZU LLM"
                  ></iframe>
                </section>

              {/* Visual Cards */}
                <section className={styles.coreRepos}>
                  <div className={styles.sectionHeader}>
                    <h2>The ZU X ORI Open Universe</h2>
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
                      <h3>FUTURE OF MEMORY</h3>
                      <p>Explore our reincarnation technology, mythology, and LLM-authored research.</p>
                      <a href="#" className={styles.cardButton}>Browse</a>
                    </div>
                  </div>
                </section>


        {/* Core Repos (previously Story Repository) */}
        <section className={styles.coreRepos}>
          <div className={styles.sectionHeader}>
            <h2>Core Repos</h2>
            <p>The source layers — story, character, images, and myth — that shape ZU X ORI</p>
          </div>
          <div className={styles.repoGrid}>
            <div className={styles.repoCard}>
              <div className={styles.emoji}>📖</div>
              <h3>Story</h3>
              <p>Full episode archive and core narrative from Zu and Ori's reincarnated path.</p>
              <a href="https://github.com/zuxori/story"  target="_blank">View Archive →</a>
            </div>
            <div className={styles.repoCard}>
              <div className={styles.emoji}>🧬</div>
              <h3>Characters</h3>
              <p>Profiles, past lives, symbolic items, mythology and memories of the cast reborn.</p>
              <a href="https://github.com/zuxori/characters"  target="_blank">Meet Them →</a>
            </div>
            <div className={styles.repoCard}>
              <div className={styles.emoji}>🔮</div>
              <h3>Research</h3>
              <p>LLM-authored thought papers on reincarnation, karma, memory, and mythology.</p>
              <a href="https://github.com/zuxori/research"  target="_blank">Explore Papers →</a>
            </div>
            <div className={styles.repoCard}>
              <div className={styles.emoji}>🎨</div>
              <h3>Images</h3>
              <p>Logos, posters, and mystic visual symbols from the ZU X ORI creative universe.</p>
              <a href="https://github.com/zuxori/images"  target="_blank">Browse Visuals →</a>
            </div>
            <div className={styles.repoCard}>
              <div className={styles.emoji}>🖼️</div>
              <h3>Wallpapers</h3>
              <p>Download mobile and desktop backgrounds to carry pieces of the story with you.</p>
              <a href="https://github.com/zuxori/wallpapers"  target="_blank">Get Art →</a>
            </div>
            <div className={styles.repoCard}>
              <div className={styles.emoji}>🤝</div>
              <h3>Collaboration</h3>
              <p>Community contributions, creative extensions, and collaborative forks of the ZU X ORI world.</p>
              <a href="/collaboration">Explore →</a>
            </div>
          </div>
        </section>

        {/* Extensions (previously Core Repos) */}
        <section className={styles.extensions}>
          <div className={styles.sectionHeader}>
            <h2>Extensions</h2>
            <p>Explore the foundations of the ZU X ORI universe — from story engine to scent alchemy.</p>
          </div>
          <div className={styles.repoGrid}>
            <div className={styles.repoCard}>
              <div className={styles.emoji}>🎭</div>
              <h3>zuxori</h3>
              <p>The core narrative engine and website for the ZU X ORI experience. Built on Docusaurus.</p>
              <a href="https://github.com/zuxori/zuxori" target="_blank" rel="noreferrer">View Repo →</a>
            </div>
            <div className={styles.repoCard}>
              <div className={styles.emoji}>🌹</div>
              <h3>zuxori-social</h3>
              <p>Fragrance + memory models inspired by Capulet legacy perfumes. Experimental AI + sensory research.</p>
              <a href="https://github.com/zuxori/zuxori-perfume" target="_blank" rel="noreferrer">View Repo →</a>
            </div>
            <div className={styles.repoCard}>
              <div className={styles.emoji}>🧠</div>
              <h3>zuxori-ai</h3>
              <p>Custom GPT agents for Ori, Zu, and Tai. Dialogue tuning and narrative constraints through RAG pipelines.</p>
              <a href="https://github.com/zuxori/zuxori-ai" target="_blank" rel="noreferrer">View Repo →</a>
            </div>
            <div className={styles.repoCard}>
              <div className={styles.emoji}>🧬</div>
              <h3>zuxori-timeline</h3>
              <p>Explores reincarnation logic, narrative timelines, and alternate lifepaths. Foundation for the dream engine.</p>
              <a href="https://github.com/zuxori/zuxori-timeline" target="_blank" rel="noreferrer">View Repo →</a>
            </div>
            <div className={styles.repoCard}>
              <div className={styles.emoji}>📜</div>
              <h3>zuxori-lore</h3>
              <p>Prophecies and mystic history. Source material for the ZU X ORI narrative universe.</p>
              <a href="https://github.com/zuxori/zuxori-lore" target="_blank" rel="noreferrer">View Repo →</a>
            </div>
            <div className={styles.repoCard}>
              <div className={styles.emoji}>🛠️</div>
              <h3>zuxori-dev</h3>
              <p>Development tools, deployment scripts, and system-level utilities for the ZU X ORI ecosystem.</p>
              <a href="https://github.com/zuxori/zuxori-dev" target="_blank" rel="noreferrer">View Repo →</a>
            </div>
          </div>
        </section>

              {/* Ecosystem */}
                <section className={`${styles.section} ${styles.ecosystem}`}>
          <div className={styles.sectionHeader}>
            <h2>Ecosystem</h2>
            <p>Innovations and interfaces from the ZU X ORI universe — designed for interaction, reflection, and mythic remix.</p>
          </div>

          <div className={styles.ecosystemGrid}>
          <div className={styles.ecosystemCard}>
              <img src="/img/lora.jpg" alt="ZU / LoRA" className={styles.ecosystemImage} />
              <h3>Zu / LoRA Model</h3>
              <p>A Flux LoRA image model fine-tuned on Zu's visual identity.</p>
              <a href="https://huggingface.co/USERNAME/zu-lora" target="_blank" className={styles.cardButton}>Create on 🤗</a>
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
              <img src="/img/voice.jpg" alt="ZU Voice Agent" className={styles.ecosystemImage} />
              <h3>ZU Voice Agent</h3>
              <p>A custom-tuned language model trained on Zu’s personality, tone, and narrative arc.</p>
              <a href="#" className={styles.cardButton}>Coming Soon</a>
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