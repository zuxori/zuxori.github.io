import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from '../pages/index.module.css'; 

export default function MythEngine() {
  const [mythResponse, setMythResponse] = useState('');
  const [mythLoading, setMythLoading] = useState(false);

  const runMythEngine = async () => {
    setMythLoading(true);
    setMythResponse('Imagining a scene…');

    try {
      const res = await fetch('https://zu-portal.hello-7ef.workers.dev/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt:
            'Generate a new scene from the ZU × ORI universe. Make it mythic, emotional, and true to the timeline.',
        }),
      });

      const data = await res.json();
      setMythResponse(data.reply || 'Scene not retrieved. Try again.');
    } catch (err) {
      console.error(err);
      setMythResponse('Myth Engine is recharging. Try again soon.');
    }

    setMythLoading(false);
  };

  return (
    <section id="myth-engine" className={styles.coreRepos}>
      <div className={styles.sectionHeader}>
        <h2>Myth Engine</h2>
        <p className={styles.tagline}>
          Generate a mythic moment from the world of ZU × ORI — never written until now.
        </p>
      </div>

      <div className={styles.llmInputBox}>
        <button
          className={styles.llmSubmit}
          onClick={runMythEngine}
          disabled={mythLoading}
        >
          {mythLoading ? 'Imagining a scene…' : 'Run Myth Engine'}
        </button>
      </div>

      {mythResponse && (
        <div className={styles.llmResponse}>
          <ReactMarkdown>{mythResponse}</ReactMarkdown>
        </div>
      )}
    </section>
  );
}