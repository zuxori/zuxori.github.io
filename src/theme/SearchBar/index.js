import React, {useRef, useEffect} from 'react';
import {useHistory} from '@docusaurus/router';
import {useWindowSize} from '@docusaurus/theme-common';

// minimal copy of the default component – we change only the placeholder text
export default function SearchBar() {
  const history = useHistory();
  const inputEl = useRef(null);

  // Focus the search input when the user presses ⌘ K (Mac) or Ctrl K (Win/Linux)
  useEffect(() => {
    function handleKey(e) {
      const isK = e.key === 'k' || e.key === 'K';
      const withCmdOrCtrl = e.metaKey || e.ctrlKey;
      const activeTag = document.activeElement?.tagName;
      const inEditable = activeTag === 'INPUT' || activeTag === 'TEXTAREA' || document.activeElement?.isContentEditable;

      if (isK && withCmdOrCtrl && !inEditable) {
        e.preventDefault();
        inputEl.current?.focus();
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

const windowSize = useWindowSize();          // 'mobile' | 'desktop' | 'ssr'
const isMobile = windowSize === 'mobile' || windowSize === 'ssr';
 const placeholder = isMobile ? 'Search' : 'Search ⌘ K';

  return (
        <div className="navbar__search">
    <input
  ref={inputEl}
  type="search"
  placeholder={placeholder}   // ← use variable
  aria-label="Search"
  onKeyDown={(e) => {
    if (e.key === 'Enter') history.push(`/search?q=${e.target.value}`);
  }}
  className="navbar__search-input"
/>
    </div>
  );
}