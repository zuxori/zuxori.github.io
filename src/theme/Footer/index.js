/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import FooterLinks from '@theme/Footer/Links';
import FooterLogo from '@theme/Footer/Logo';
import FooterCopyright from '@theme/Footer/Copyright';
import FooterLayout from '@theme/Footer/Layout';
function Footer() {
  const {footer} = useThemeConfig();
  if (!footer) {
    return null;
  }
  const {copyright, links, logo, style} = footer;
  return (
    <>
      <FooterLayout
        style={style}
        links={links && links.length > 0 && <FooterLinks links={links} />}
        logo={logo && <FooterLogo logo={logo} />}
        copyright={copyright && <FooterCopyright copyright={copyright} />}
      />
  
      {/* 👇 Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "CreativeWorkSeries",
                "@id": "https://zuxori.com/#series",
                "name": "ZU X ORI",
                "url": "https://zuxori.github.io/",
                "description": "The reincarnation sequel to Romeo and Juliet, told through open source narrative repositories and visual storytelling.",
                "genre": ["fiction", "romance", "mythic", "reincarnation"],
                "keywords": ["zu x ori", "romeo and juliet sequel", "open story", "fictional universe", "episodes", "karma", "rebirth", "narrative design"],
                "inLanguage": "en",
                "license": "https://creativecommons.org/publicdomain/zero/1.0/",
                "creator": {
                  "@id": "https://zuxori.com/#sov"
                },
                "mainEntityOfPage": "https://zuxori.github.io/",
                "episode": [
                  { "@type": "Episode", "name": "Zu", "position": 1, "url": "https://github.com/zuxori/story/blob/main/episodes/E01-ZU.md" },
                  { "@type": "Episode", "name": "Crash", "position": 2, "url": "https://github.com/zuxori/story/blob/main/episodes/E02-CRASH.md" },
                  { "@type": "Episode", "name": "Verona", "position": 3, "url": "https://github.com/zuxori/story/blob/main/episodes/E03-VERONA.md" },
                  { "@type": "Episode", "name": "500 Years", "position": 4, "url": "https://github.com/zuxori/story/blob/main/episodes/E04-500-YEARS.md" },
                  { "@type": "Episode", "name": "A Capulet Secret", "position": 5, "url": "https://github.com/zuxori/story/blob/main/episodes/E05-A-CAPULET-SECRET.md" },
                  { "@type": "Episode", "name": "Forget Me Not", "position": 6, "url": "https://github.com/zuxori/story/blob/main/episodes/E06-FORGET-ME-NOT.md" },
                  { "@type": "Episode", "name": "I Trusted You", "position": 7, "url": "https://github.com/zuxori/story/blob/main/episodes/E07-I-TRUSTED-YOU.md" },
                  { "@type": "Episode", "name": "Two Houses Alike", "position": 8, "url": "https://github.com/zuxori/story/blob/main/episodes/E08-TWO-HOUSES-ALIKE.md" },
                  { "@type": "Episode", "name": "Timelines", "position": 9, "url": "https://github.com/zuxori/story/blob/main/episodes/E09-TIMELINES.md" },
                  { "@type": "Episode", "name": "Love Awakens", "position": 10, "url": "https://github.com/zuxori/story/blob/main/episodes/E10-LOVE-AWAKENS.md" },
                  { "@type": "Episode", "name": "Forgiveness", "position": 11, "url": "https://github.com/zuxori/story/blob/main/episodes/E11-FORGIVENESS.md" },
                  { "@type": "Episode", "name": "For All Humanity", "position": 12, "url": "https://github.com/zuxori/story/blob/main/episodes/E12-FOR-ALL-HUMANITY.md" }
                ],
                "hasPart": {
                  "@type": "CreativeWork",
                  "name": "Prologue",
                  "url": "https://github.com/zuxori/story/blob/main/episodes/PROLOGUE.md",
                  "description": "A standalone prologue/epilogue.",
                  "additionalProperty": {
                    "@type": "PropertyValue",
                    "name": "narrativeRole",
                    "value": "epilogue"
                  }
                },
                "character": [
                  { "@id": "https://zuxori.com/#zu" },
                  { "@type": "Person", "name": "Ori", "alternateName": "Romeo", "description": "Creative, curious, and deeply connected — Romeo reborn." },
                  { "@type": "Person", "name": "Tai", "alternateName": "Tybalt", "description": "Juliet’s reincarnated brother, protector of secrets and keeper of Nepenthe." },
                  { "@type": "Person", "name": "Hermes", "alternateName": "Mercutio", "description": "A rebel in every lifetime — prophet, Initiate, vision with a compass." },
                  { "@type": "Person", "name": "Lucrezia", "description": "Alchemist of scent and memory. Searching for a secret." },
                  { "@type": "Person", "name": "Lauren", "alternateName": "Friar Lawrence", "description": "Guide, teacher, and quiet observer — always tries her best." }
                ]
              }
            ]
          })
        }}
      />
    </>
  );
} //
export default React.memo(Footer);
