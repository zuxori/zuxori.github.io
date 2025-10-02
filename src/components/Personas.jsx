import React from 'react';
import styles from '../pages/index.module.css';

const characters = [

    {
    name: "Zu",
    role: "Juliet",
    traits: "Curious, sensitive, quietly defiant",
    archetype: "The Storyteller",
    prompt: "I have a story to tell. I just don’t know what it is.",
    scent: "matcha, rose, static electricity",
    image: "/img/zu-card.jpeg",
    spark: "/sparks/zu-spark.zip",
    socket: "/connect/zu"
  },
  {
    name: "Ori",
    role: "Romeo",
    traits: "Enigmatic, gifted, wounded",
    archetype: "The Reborn Flame",
    prompt: "I’ve always felt I had a secret.",
    scent: "charcoal, salt, midnight rain",
    image: "/img/ori-card.jpeg",
    spark: "/sparks/ori-spark.zip",
    socket: "/connect/ori"
  },
  {
    name: "Hermes",
    role: "Mercutio",
    traits: "Brilliant, irreverent, prophetic",
    archetype: "The Initiate",
    prompt: "Destiny doesn't wait.",
    scent: "ozone, ink, lemon chips",
    image: "/img/hermes-card.png",
    spark: "/sparks/hermes-spark.zip",
    socket: "/connect/hermes"
  },
  {
    name: "Tai",
    role: "Tybalt",
    traits: "Ruthless, elegant, haunted",
    archetype: "The Remnant",
    prompt: "You and Romeo killed yourselves for nothing.",
    scent: "burnt citrus, metal, sorrow",
    image: "/img/tai-card.jpeg",
    spark: "/sparks/tai-spark.zip",
    socket: "/connect/tai"
  },
  {
    name: "Lucrezia",
    role: "Lia",
    traits: "Graceful, scientific, searching",
    archetype: "The Recollector",
    prompt: "A poor sort of memory only works backward.",
    scent: "blue jasmine, paper, longing",
    image: "/img/lu-card.png",
    spark: "/sparks/lucrezia-spark.zip",
    socket: "/connect/lucrezia"
  },
  {
    name: "Lauren",
    role: "The Friar",
    traits: "Wise, nurturing, quietly regretful",
    archetype: "The Mentor",
    prompt: "Your story will find you.",
    scent: "warm rose, tea, theater dust",
    image: "/img/lauren-card.jpeg",
    spark: "/sparks/lauren-spark.zip",
    socket: "/connect/lauren"
  }
];

export default function Personas() {
  return (
    <section id="personas" className={styles.coreRepos}>
      <div className={styles.sectionHeader}>
        <h2>Reincarnated Personas</h2>
        <p className={styles.tagline}>
          Open-source souls. Use ZU × ORI SPARKs in LLM models and games. Connect to Myth Socket for full knowledge.
        </p>
      </div>

      <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
    maxWidth: '1080px',
    margin: '0 auto'
  }}>
    {characters.map((char) => (
      <div key={char.name} 
        className="personaCard"  
      style={{
       
        padding: '1.25rem',
        borderRadius: '12px',
    
      }}>
        <img
          src={char.image}
          alt={char.name}
          style={{
            borderRadius: '10px',
            width: '100%',
            height: '180px',
            objectFit: 'cover',
            marginBottom: '1rem'
          }}
        />
        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>
          {char.name} <span style={{ color: '#999' }}>/ {char.role}</span>
        </h3>
        <p style={{ fontStyle: 'italic', color: '#666', marginBottom: '0.5rem' }}>{char.archetype}</p>
        <p>{char.traits}</p>
        <blockquote style={{
  display: 'flex',
  alignItems: 'center',
  minHeight: '3.5rem',
  paddingLeft: '0.75rem',
  margin: '1rem 0',
  borderLeft: '3px solid #e63985',
  fontStyle: 'italic',
  color: '#444',
  lineHeight: 1.4
}}>
  “{char.prompt}”
</blockquote>
        <p style={{ fontSize: '0.85rem', color: '#888' }}>
          Signature scent: {char.scent}
        </p>

        {/* Final two buttons only */}
        <div style={{
  display: 'flex',
  justifyContent: 'center',
  gap: '0.75rem',
  marginTop: '1.25rem'
}}>
          <a
            href={char.spark}
            download
                        className={styles.personaButton}
            title={`Download ${char.name}'s SPARK`}
          >
            SPARK ↓
          </a>

          <a
            href="https://socket.zuxori.com/"
            className={styles.personaButton}
            title="Connect to Myth Socket"
            target="_blank"
            rel="noopener noreferrer"
          >
            Myth Socket
          </a>
        </div>
      </div>
    ))}
  </div>
</section>
  );
}