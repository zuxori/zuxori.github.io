import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from '../pages/index.module.css'; 

export default function ChatWithZu() {
  const [inputValue, setInputValue] = useState('');
  const [zuReply, setZuReply] = useState('');
  const [loading, setLoading] = useState(false);
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
  const [placeholder, setPlaceholder] = useState(zuPrompts[0]);

   useEffect(() => {
      const interval = setInterval(() => {
        const random = Math.floor(Math.random() * zuPrompts.length);
        setPlaceholder(zuPrompts[random]);
      }, 4000);
      return () => clearInterval(interval);
    }, []);

  const [messages, setMessages] = useState([]);

  const sendToZu = async () => {
    const userInput = inputValue.trim();
    if (!userInput) return;
    setLoading(true);
    setZuReply("Messaging Zu..");
    const updatedMessages = [...messages, { role: "user", content: userInput }].slice(-6);
    try {
      const res = await fetch("https://zu-portal.hello-7ef.workers.dev/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          system: "If you miss something earlier, you can say: 'Sorry—there’s a lot going on.'"
        }),
      });
      const data = await res.json();
      const reply = data.reply ?? "Sorry—Zu didn’t respond.";
      setMessages([...updatedMessages, { role: "assistant", content: reply }]);
      setZuReply(reply);
      setInputValue('');
    } catch (err) {
      console.error("Zu API error:", err);
      setZuReply("Zu is in class.");
    } finally {
      setLoading(false);
    }
  };

  return (

                <section id="chat" className={`${styles.coreRepos} ${styles.llmEmbed}`}>
                  <div className={styles.sectionHeader}>
                    <h2>Chat with Zu</h2>
                    <p>About her story, her memories, and the lore of ZU × ORI</p>
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
    <ReactMarkdown>{zuReply}</ReactMarkdown>
  </div>
)}

                </section>
  );
}