import React, { useState } from 'react';
import styles from '../pages/index.module.css';

export default function CreativeEcosystem() {

const [loraImage, setLoraImage] = useState('/img/zu-id-185.jpg');
const [loraGenerating, setLoraGenerating] = useState(false);

  return (
                <section id="ecosystem" className={`${styles.section} ${styles.ecosystem}`}>
          <div className={styles.sectionHeader}>
            <h2>Creative Ecosystem</h2>
            <p>Join us in bringing Zu and the ZU × ORI universe to life</p>
          </div>

          <div className={styles.cardGrid}>
          <div className={`${styles.imageCard} ecosystemCard`}>
              <img src={loraImage} alt="ZU / LoRA" />
              <h3>Zu / LoRA Model</h3>
              <p>A Flux LoRA image model fine-tuned on Zu's visual identity.</p>
              <button
                className={styles.cardButton}
                onClick={async () => {
                  if (loraGenerating) return;
                  setLoraGenerating(true);
                  try {
                    const res = await fetch("https://zu-lora.hello-7ef.workers.dev/image", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: "{}"          // or: JSON.stringify({})
                    });

                    if (!res.ok) {
                      throw new Error(`Worker error: ${await res.text()}`);
                    }

                    const data = await res.json();
                    const imageUrl =
                      data.image_url || data.image || data.url || data.output || null;

                    if (!imageUrl) {
                      console.error("Unexpected Worker response:", data);
                      throw new Error("No image URL found in Worker reply.");
                    }

                    setLoraImage(imageUrl);      // ⬅️  update the card’s image
                  } catch (err) {
                    console.error("Zu‑LoRA error:", err);
                    alert("Image generation failed – check console.");
                  } finally {
                    setLoraGenerating(false);
                  }
                }}
                disabled={loraGenerating}
                title="Generate a Zu image"
              >
                {loraGenerating ? "Generating…" : "Generate"}
              </button>
            </div>
            
            <div className={`${styles.imageCard} ecosystemCard`}>
              <img src="/img/gallery.png" alt="Characters" />
              <h3>Image Gallery</h3>
              <p>Explore over 200 images from the ZU × ORI story universe.</p>
              <a href="https://zuxori.com/gallery.html" target="_blank" className={styles.cardButton}>View</a>
            </div>

            <div className={`${styles.imageCard} ecosystemCard`}>
              <img src="/img/podcast.png" alt="Podcast" />
              <h3>Podcast</h3>
              <p>Hosted by Sov and Zu. Episodes and musings on memory, identity and myth.</p>
              <a href="https://open.spotify.com/show/34Dy2R2iBFOaKowM1DbOBn" target="_blank" className={styles.cardButton}>Listen</a>
            </div>

            <div className={`${styles.imageCard} ecosystemCard`}>
              <img src="/img/tiktok.jpg" alt="TikTok" />
              <h3>Zu on TikTok</h3>
              <p>My first time on social — fragments, feelings, and maybe a little chaos.</p>
              <a href="https://tiktok.com/@zudreamer" target="_blank" className={styles.cardButton}>Follow</a>
            </div>

            <div className={`${styles.imageCard} ecosystemCard`}>
              <img src="/img/zuxori-cap-pink.png" alt="Shop" />
              <h3>Shop</h3>
              <p>Apparel and essential gear from the ZU × ORI storyworld.</p>
              <a href="https://zuxori.com/#shop" target="_blank" className={styles.cardButton}>Shop</a>
            </div>

            <div className={`${styles.imageCard} ecosystemCard`}>
              <img src="/img/llm.jpg" alt="LLM Research" />
              <h3>ZU × ORI Research</h3>
              <p>LLM-authored thought papers on reincarnation, memory, and paradox.</p>
              <a href="https://github.com/zuxori/research" target="_blank" className={styles.cardButton}>Explore</a>
            </div>
            </div>
        </section>
  )
}