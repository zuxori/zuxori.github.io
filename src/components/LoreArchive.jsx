import React from 'react';
import styles from '../pages/index.module.css';

export default function LoreArchive() {
  return (

        <section id="archive" className={styles.coreRepos}>
  <div className={styles.sectionHeader}>
    <h2>Lore Archive</h2>
    <p>The source repos — story, characters, images, and myth — shaping the ZU × ORI world</p>
  </div>
  <div className={styles.repoGrid}>

    <a
      href="https://github.com/zuxori/story"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.repoCard}
    >
      <div className={styles.repoHeader}>
        <span className={styles.emoji}>📖</span>
        <h3>Story</h3>
      </div>
      <p>Full episode archive and core narrative from Zu and Ori's reincarnated path.</p>
    </a>

    <a
      href="https://github.com/zuxori/characters"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.repoCard}
    >
      <div className={styles.repoHeader}>
        <span className={styles.emoji}>🧬</span>
        <h3>Characters</h3>
      </div>
      <p>Profiles, past lives, symbolic items, and memories of the cast reborn.</p>
    </a>

    <a
      href="https://github.com/zuxori/research"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.repoCard}
    >
      <div className={styles.repoHeader}>
        <span className={styles.emoji}>🔮</span>
        <h3>Research</h3>
      </div>
      <p>LLM-authored thought papers on reincarnation, karma, and paradox.</p>
    </a>

    <a
      href="https://github.com/zuxori/images"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.repoCard}
    >
      <div className={styles.repoHeader}>
        <span className={styles.emoji}>🎨</span>
        <h3>Images</h3>
      </div>
      <p>Covers, logos and posters from the ZU × ORI creative universe.</p>
    </a>

    <a
      href="https://github.com/zuxori/wallpapers"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.repoCard}
    >
      <div className={styles.repoHeader}>
        <span className={styles.emoji}>🖼️</span>
        <h3>Wallpapers</h3>
      </div>
      <p>Download desktop and mobile backgrounds to carry with you.</p>
    </a>

    <a
      href="https://opensea.io/collection/zuxori"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.repoCard}
    >
      <div className={styles.repoHeader}>
        <span className={styles.emoji}>🤝</span>
        <h3>Collabs</h3>
      </div>
      <p> Original artwork by Undeadlu, from the ZU × ORI NFT collection.</p>
    </a>

  </div>
</section>
  )
}