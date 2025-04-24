// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ZU X ORI',
  tagline: 'Every Future Has A Past',
  favicon: 'img/favicon.svg',

  // Set the production url of your site here
  url: 'https://zuxori.github.io',
  organizationName: 'zuxori', // your GitHub username
  projectName: 'zuxori.github.io',
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
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

        { name: 'description', content: 'ZU X ORI is the reincarnation sequel to Romeo and Juliet, told across open story repositories: episodes, characters, research, imagery, and lore.' },
        { name: 'google-site-verification', content: 'mirBolSMbVy5IId-raVFxc9MJuQ6gsSRunZNPNrrf_k' },

        { name: 'twitter:card', content: 'summary_large_image' },
        { property: 'og:title', content: 'ZU X ORI Repository Portal' },
        { property: 'og:description', content: 'The reincarnation sequel to Romeo + Juliet, told through story, research, and mythic design — across lifetimes, timelines, and GitHub repositories.' },
        { property: 'og:image', content: 'https://zuxori.github.io/img/logo.png' },
        { property: 'og:image:type', content: 'image/png' },
        { property: 'og:url', content: 'https://zuxori.github.io/' },
        { property: 'og:type', content: 'website' }
      ],

      navbar: {
        title: 'ZU X ORI',
        logo: {
          alt: 'ZU X ORI Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'archiveSidebar',
            position: 'left',
            label: 'Archive',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/zuxori',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Story',
            items: [
              { label: 'Episodes', to: '/docs/intro' },
              { label: 'Characters', to: '/characters' }
            ],
          },
          {
            title: 'Community',
            items: [
              { label: 'GitHub', href: 'https://github.com/zuxori' },
              { label: 'Twitter / X', href: 'https://x.com/zuxori' }
            ],
          },
          {
            title: 'More',
            items: [
              { label: 'Blog', to: '/blog' },
              { label: 'ZU X ORI', href: 'https://zuxori.com' },
            ],
          },
        ],
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
