import React from 'react';
import styles from '../pages/index.module.css';

export default function OpenUniverse() {
  return (
                <section className={styles.coreRepos}>
                  <div className={styles.sectionHeader}>
                    <h2>ZU × ORI Open Universe</h2>
                    <p>The ZU × ORI universe is a creator-led, open-source mythology</p>
                  </div>
                  <div className={styles.cardGrid}>
                    <div className={styles.imageCard}>
                      <img src="/img/cover-square.webp" alt="Ori Poster" />
                      <h3>ZU × ORI</h3>
                      <p>The core of ZU × ORI is the original story by Sov, available on Amazon and PDF.</p>
                      <a href="https://www.amazon.com/dp/B0DJ4TFSWM" target="_blank" className={styles.cardButton}>Read</a>
                    </div>
                    <div className={styles.imageCard}>
                      <img src="/img/zu-profile.png" alt="Zu Poster" />
                      <h3>ZU</h3>
                      <p>Juliet reborn. Storyteller and co-host of the ZU × ORI podcast.</p>
                      <a href="https://open.spotify.com/show/34Dy2R2iBFOaKowM1DbOBn" target="_blank" className={styles.cardButton}>Listen</a>
                    </div>
                    <div className={styles.imageCard}>
                      <img src="/img/wright.png" alt="Logo Poster" />
                      <h3>MYTH ENGINE</h3>
                      <p>Summon infinite ZU × ORI in-world stories and reborn characters into being.</p>
                      <a className={styles.cardButton}>Coming Soon</a>
                    </div>
                  </div>
                </section>
  )
}