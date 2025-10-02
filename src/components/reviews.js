import React, { useEffect, useRef } from 'react';
import quotes from '@site/static/quotes.json';

export default function Reviews() {
  const lanes = [useRef(null), useRef(null), useRef(null)];
  const durations = [6000, 8000, 12000]; // Left, Right, Center
  const fullCycle = 24000;
  const activeSpan = [0, 0, 0]; // tracks which span is showing for each lane

  useEffect(() => {
    const quoteCycle = [];

    const updateQuote = (container, laneIndex, beat) => {
      const quoteEls = container.querySelectorAll('.quote-text');
      const current = activeSpan[laneIndex];
      const next = 1 - current;

      const nextEl = quoteEls[next];
      const prevEl = quoteEls[current];

      nextEl.textContent = `“${quotes[Math.floor(Math.random() * quotes.length)]}”`;

      // Reset new quote to invisible and prep transition
      nextEl.textContent = `“${quotes[Math.floor(Math.random() * quotes.length)]}”`;

nextEl.style.opacity = 1;              // 👈 fade in
prevEl.style.opacity = 0;              // 👈 fade out

activeSpan[laneIndex] = next;

      // Fade out old quote
      prevEl.classList.remove('fade-in');
      prevEl.style.opacity = 0;

      activeSpan[laneIndex] = next;
    };

    const startCycle = () => {
      lanes.forEach((ref, i) => {
        const container = ref.current;
        if (!container) return;

        const beat = durations[i];
        let t = 0;

        if (quoteCycle[i]) clearInterval(quoteCycle[i]);
        updateQuote(container, i, beat);

        quoteCycle[i] = setInterval(() => {
          t += beat;
          if (t >= fullCycle) {
            t = 0;
            clearInterval(quoteCycle[i]);
            startCycle(); // reset global rhythm
          } else {
            updateQuote(container, i, beat);
          }
        }, beat);
      });
    };

    startCycle();
    return () => quoteCycle.forEach(clearInterval);
  }, []);

  return (
    <>
      {lanes.map((ref, i) => (
        <span key={i} ref={ref} className="quote">
          <span className="quote-text quote-a" />
          <span className="quote-text quote-b" />
        </span>
      ))}
    </>
  );
}