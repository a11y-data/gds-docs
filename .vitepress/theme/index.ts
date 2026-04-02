
import Theme from 'vitepress/theme'
import './lite-youtube.css'
import './styles.css'
// import custom element used in markdown files

import { Icon } from '@lit-app/cmp/icon/internal/icon'
Icon.getURL = function (name, noFill) {
  return `/images/material-symbols/${name}/materialsymbolsoutlined/${name}${noFill ? '' : '_fill1'}_${Icon.opticalSize}px.svg`
}

// lite-youtube
import '../components/lite-youtube-embed.ts'
// lapp-icon
import '@lit-app/cmp/icon/icon'

export default Theme

// function importYoutube() {
//   // We need to import the youtube component to make it available in markdown files
//   import('@lit-app/cmp/youtube/youtube')
// }