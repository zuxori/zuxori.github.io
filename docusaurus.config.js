// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ZU × ORI',
  tagline: 'Every Future Has A Past',
  favicon: 'img/favicon.svg',

  url: 'https://zuxori.github.io',
  organizationName: 'zuxori',
  projectName: 'zuxori.github.io',
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

plugins: [
  [
   require.resolve('@easyops-cn/docusaurus-search-local'),
       {
         docsRouteBasePath: '/',
         indexPages: true,
         hashed: true,
         highlightSearchTermsOnTargetPage: true,
       },
  ],
],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({

      metadata: [
        {
          name: 'description',
          property: 'og:description',
          content:
            'The open-source reincarnation sequel to Romeo + Juliet. Chat with Zu, read LLM-authored research, and stream the ZU × ORI podcast.',
        },
        {name: 'google-site-verification', content: 'mirBolSMbVy5IId-raVFxc9MJuQ6gsSRunZNPNrrf_k'},
        {name: 'twitter:card', content: 'summary_large_image'},
        {property: 'og:title', content: 'ZU × ORI Portal'},
        {property: 'og:image', content: 'https://zuxori.github.io/img/logo.png'},
        {property: 'og:image:type', content: 'image/png'},
        {property: 'og:url', content: 'https://zuxori.github.io/'},
        {property: 'og:type', content: 'website'},
        {
          tagName: 'link',
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
      ],

      navbar: {
        title: 'ZU × ORI',
        logo: {alt: 'ZU × ORI Logo', src: 'img/zuxori-logo-tp.png'},
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'archiveSidebar',
            position: 'left',
            label: 'Archive',
          },
          /* ----- DocSearch input (renders with the keys above) ----- */
          { type: 'search', position: 'right' },  
       
          /* ----- GitHub link ----- */
          {href: 'https://github.com/zuxori', label: 'GitHub', position: 'right'},
        ],
      },

      footer: {
  style: 'dark',

  // ✅ Built-in footer knows how to place this logo responsively
  logo: {
    alt: 'ZU × ORI Logo',
    src: 'img/zuxori-logo-tp.png',
    srcDark: 'img/zuxori-logo-tp.png'      // transparent PNG for dark mode
  },

  copyright:
    'Every Future Has A Past',


  links: [
    {
      title: 'Story',
      items: [
        { label: 'Amazon',  href: 'https://www.amazon.com/dp/B0DJ4TFSWM' },
        { label: 'Spotify', href: 'https://open.spotify.com/show/34Dy2R2iBFOaKowM1DbOBn' }
      ]
    },

    {
      title: 'Social',
      items: [
        { label: 'Instagram', href: 'https://www.instagram.com/zuxori.official' },
        { label: 'TikTok',     href: 'https://www.tiktok.com/@zudreamer' }
      ]
    },
  ]
},

      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;