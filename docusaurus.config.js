// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '片面 Crypto',
  tagline: '写点和 Crypto 相关的东西',
  favicon: 'img/wayne.ico',

  // Set the production url of your site here
  url: 'https://pmcrypto.xyz/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Wayneeeee', // Usually your GitHub org/user name.
  projectName: 'blog-website', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },
  

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '', // 设置为空字符串，移除 /docs 前缀
          sidebarPath: './sidebars.js',



          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/Wayneeeee/blog-website/tree/main/',
        },
        blog: {
          showReadingTime: true,


          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
          blogTitle: "文章",
          blogDescription: '片面 Crypto 的文章列表。',
          // editUrl:
          //   'https://github.com/Wayneeeee/blog-website/blob/main/',
        },
        gtag: {
          trackingID: 'G-SHML70GYWY',
          anonymizeIP: false,
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
      // Replace with your project's social card
      // 推特的设定，关于这部分的内容很多，特别还有结构化数据方面的内容 https://docusaurus.io/docs/seo#global-metadata，与 SEO 有关
      blog: {
        sidebar: {
          groupByYear: true,
        },
      },
      metadata: [
        {name:'twitter:card', content:'summary_large_image'},
        {name:'twitter:site', content:'@0xwayne_z'},
        {name:'twitter:creator', content:'@0xwayne_z'},
        {name:'twitter:image', content:'https://pmcrypto.xyz/img/pmcrypto.png'},
        {name:'og:type', content:'article'},

      ],
      // 网页顶部的 announcement
      // announcementBar: {
      //   id: 'support_me',
      //   content:
      //     'We are looking to revamp our docs, please fill <a target="_blank" rel="noopener noreferrer" href="#">this survey</a>',
      //   backgroundColor: '#fafbfc',
      //   textColor: '#091E42',
      //   isCloseable: false,
      // },
      // 封面图片
      image: 'img/pmcrypto.png',
      navbar: {
        title: '',
        logo: {
          alt: '片面 Crypto',
          src: 'img/wayne.png',
          // style: {border: 'solid red'},
        },
        items: [

          {to: '/blog', label: '文章', position: 'left'},
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Narrative Tracking',
          },
          {to: '/about-me', label: 'About', position: 'right'},

          // {
          //   href: 'https://twitter.com/0xwayne_z',
          //   label: 'Twitter',
          //   position: 'right',
          // },
          // {
          //   href: 'https://t.me/narrative_tracking',
          //   label: 'Telegram',
          //   position: 'right',
          // },
          // {
          //   href: 'https://github.com/Wayneeeee',
          //   label: 'GitHub',
          //   position: 'right',
          // },
          // {
          //   type: 'dropdown',
          //   label: 'Social',
          //   position: 'right',
          //   items: [
          //     {
          //       label: 'Twitter',
          //       href: 'https://twitter.com/0xwayne_z',
          //     },
          //     {
          //       label: 'Telegram',
          //       href: 'https://t.me/narrative_tracking',
          //     },
          //     {
          //       label:'GitHub',
          //       href: 'https://github.com/Wayneeeee',
          //     }
          //   ]
          //   },

          
        ],
      },

      footer: {
        // links: [
          // {
          //   title: 'Docs',
          //   items: [
          //     {
          //       label: 'Introduction',
          //       href: '/docs',
          //       target: '_self',
          //     },
          //   ],
          // },
          // {
          //   title: 'Community',
          //   items: [
          //     {
          //       label: 'User Showcase',
          //       href: '/users',
          //       target: '_self',
          //     },
          //   ],
          // },
          // {
          //   title: 'Legal',
          //   items: [
          //     {
          //       label: 'Privacy',
          //       href: 'https://opensource.facebook.com/legal/privacy/',
          //     },
          //     {
          //       label: 'Terms',
          //       href: 'https://opensource.facebook.com/legal/terms/',
          //     },
          //     {
          //       label: 'Data Policy',
          //       href: 'https://opensource.facebook.com/legal/data-policy/',
          //     },
          //     {
          //       label: 'Cookie Policy',
          //       href: 'https://opensource.facebook.com/legal/cookie-policy/',
          //     },
          //   ],
          // },
        // ],
        // logo: {
        //   src: 'img/wayne.png',
        // },
        copyright: `欲买桂花同载酒，终不似，少年游。`,
      },
      
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
