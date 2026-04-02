import { defineConfig } from 'vitepress'
import { getNav as getRootNav } from './getNav.ts'
import { getSidebar } from './getSidebar.ts'
import { getSocialLinks } from './getSocialLinks.ts'



// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "GDS Portal Docs",

  description: "Documentation for GDS documentation applications ",
  // assetsDir: 'assets',
  srcExclude: ['**/README.md', '**/TODO.md'],
  cleanUrls: true,
  // lastUpdated: true,
  metaChunk: true,
  head: [['link', { rel: 'icon', href: '/a14y_logo_style.svg' }]],
  srcDir: "docs",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/a14y_logo_style.svg',
    editLink: {
      pattern: 'https://github.com/preignition/program-user-guide/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    search: {
      provider: 'algolia',
      options: {
        appId: 'YHQBY741RD',
        indexName: 'a11y-data-doc-crawler',
        apiKey: '5cc71dd055506e2b975024ace4074cb7',
        askAi: {
          assistantId: 'hMFvvrrSqi93',
          sidePanel: true
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
  return nav
} 