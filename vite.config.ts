import { defineConfig, type Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { renderSections } from './src/sections/index.ts'

/**
 * Swaps each `<!-- @section name [page] -->` marker in index.html and story.html for the markup
 * rendered from src/sections, so the menu, hours and copy ship as plain HTML that search engines
 * (and people on slow phones) can read without any JavaScript. Vite restarts the dev server by
 * itself when anything this config imports (src/data, src/sections, src/lib) changes.
 */
function staticSections(): Plugin {
  return {
    name: 'kapettorta:static-sections',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => renderSections(html),
    },
  }
}

/** Absolute path of a page next to this file. */
const page = (file: string) => decodeURIComponent(new URL(file, import.meta.url).pathname)

export default defineConfig({
  plugins: [staticSections(), tailwindcss()],
  build: {
    rollupOptions: {
      // Two pages: the home page (menu, hours, location) and /story.
      input: { main: page('./index.html'), story: page('./story.html') },
    },
  },
})
