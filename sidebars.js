/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 */

 // sidebars.js

 module.exports = {
  archiveSidebar: [
    {
      type: 'category',
      label: 'ZU X ORI Archive',
      collapsed: false,
      items: [
        'intro',
        {
          type: 'category',
          label: 'Story',
          link: { type: 'doc', id: 'story/index' },
          items: [
            'story/episodes',
            'story/timeline',
            'story/screenplay-notes',
          ],
        },
        {
          type: 'category',
          label: 'Characters',
          link: { type: 'doc', id: 'characters/index' },
          items: [
            'characters/zu',
            'characters/ori',
            'characters/tai',
            'characters/hermes',
            'characters/lauren',
            'characters/lucrezia',
          ],
        },
        {
          type: 'category',
          label: 'Lore',
          link: { type: 'doc', id: 'lore/index' },
          items: [
            'lore/prophecy',
            'lore/reincarnation',
            'lore/memory-vs-fate',
          ],
        },
        {
          type: 'category',
          label: 'Research',
          link: { type: 'doc', id: 'research/index' },
          items: [
            'research/hyperosmia',
            'research/nepenthe',
            'research/capulet-vs-montague',
          ],
        },
        {
          type: 'category',
          label: 'Images',
          link: { type: 'doc', id: 'images/index' },
          items: [
            'images/sketchbook',
            'images/iconography',
          ],
        },
        {
          type: 'category',
          label: 'Wallpapers',
          link: { type: 'doc', id: 'wallpapers/index' },
          items: [
            'wallpapers/scene-backgrounds',
          ],
        },
        {
          type: 'category',
          label: 'Remix',
          link: { type: 'doc', id: 'remix/index' },
          items: [
            'remix/collaboration-guide',
          ],
        },
      ],
    },
  ],
};