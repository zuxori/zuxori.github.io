import React, { useState } from 'react';
import styles from '../pages/index.module.css'; // reuse main CSS

export default function ElevenLabsChat() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className={styles.cardButton}
        onClick={() => setOpen(true)}
      >
        Talk to Zu (Voice)
      </button>

      {open && (
        <>
          <div className={styles.backdrop} onClick={() => setOpen(false)} />
          <div className={styles.modal}>
            <button className={styles.close} onClick={() => setOpen(false)}>×</button>
            <elevenlabs-convai agent-id="KIczusg3fKBZmtRqlfNQ" 
            ui-version="minimal"
             />
          </div>
        </>
      )}
    </>
  );
}