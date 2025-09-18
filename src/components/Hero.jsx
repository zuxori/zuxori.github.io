import React from 'react';
import styles from '../pages/index.module.css'; 

export default function Hero() {
      return (
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1 className={styles.title}>ZU × ORI</h1>
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
                  href="https://deepwiki.com/zuxori/story"
                  className={styles.cta}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ask DeepWiki
                </a>
              </div>
            </div>
            <div className={`${styles.heroImage} no-zoom`}>
              <img src="/img/zuxori-logo-tp.png" alt="ZU × ORI Logo" />
            </div>
          </div>
        </section>
      )
}