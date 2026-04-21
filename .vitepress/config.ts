import { defineConfig } from 'vitepress'
import { getNav as getRootNav } from './getNav.ts'
import { getSidebar } from './getSidebar.ts'
import { getSocialLinks } from './getSocialLinks.ts'



// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "GDS Portal User guide",

  description: "for commitments and reporting",
  // assetsDir: 'assets',
  srcExclude: ['**/README.md', '**/TODO.md'],
  cleanUrls: true,
  // lastUpdated: true,
  metaChunk: true,
  head: [['link', { rel: 'icon', href: '/icon_64.png' }]],
  srcDir: "docs",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/icon_64.png',
    editLink: {
      pattern: 'https://github.com/a11y-data/gds-docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    search: {
      provider: 'algolia',
      options: {
        appId: '58I7HKT3AS',
        indexName: 'gds-docs-crawler',
        apiKey: 'cd6fa287ce0d5f1d871ac8b357df6e72',
        askAi: {
          indexName: 'markdown-index', // an index specifically for AI search, which includes the full content of the markdown files
          assistantId: '1a0bd94f-5368-4d53-bfe0-7fa609b232d0',
          sidePanel: true,
          suggestedQuestions: true,
          agentStudio: true // this is not passed to algolia - https://github.com/vuejs/vitepress/issues/5168
        }
      }
    },

    nav: getNav(),
    sidebar: getSidebar(),
    socialLinks: getSocialLinks()
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.includes('-')
      }
    }
  }
})

function getNav() {
  const nav = getRootNav()
  nav.push({ text: 'GDS Portal', link: 'https://gds.idata.tools' })
  nav.push({ text: 'Official GDS web site', link: 'https://www.globaldisabilitysummit.org/' })
  return nav
} 