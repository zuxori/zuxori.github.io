import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import styles from './index.module.css';


export default function Home() {
  return (
    <Layout title="ZU X ORI Repository Portal" description="The reincarnation sequel to Romeo + Juliet, told through story, research, and mythic design — across lifetimes, timelines, and GitHub repositories.">
      <Head>
          <title>ZU X ORI Repository Portal</title>
      </Head>
      
      <main>

        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1 className={styles.title}>ZU X ORI</h1>
              <p className={styles.subtitle}>Reborn in New York. Haunted by Verona.</p>
              <p className={styles.tagline}>
                The reincarnation sequel to Romeo + Juliet, told through story, research, and mythic design — across lifetimes, timelines, and GitHub repositories.
              </p>
              <div className={styles.buttonGroup}>
                <a
                  href="https://www.amazon.com/dp/B0DJ4TFSWM"
                  className={styles.cta}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read the Story
                </a>
                <a
                  href="https://github.com/zuxori"
                  className={styles.secondary}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </a>
              </div>
            </div>
            <div className={styles.heroImage}>
              <img src="/img/logo.png" alt="ZU X ORI Logo" />
            </div>
          </div>
        </section>

        {/* Core Repos (previously Story Repository) */}
        <section className={styles.coreRepos}>
          <div className={styles.sectionHeader}>
            <h2>Core Repos</h2>
            <p>Explore the ZU X ORI universe</p>
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
              <h3>zuxori-perfume</h3>
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

      </main>
    </Layout>
  );
}