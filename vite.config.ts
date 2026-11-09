import { defineConfig, type Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { renderSections } from './src/sections/index.ts'

/**
 * Swaps each `<!-- @section name -->` marker in index.html for the markup rendered from
 * src/sections, so the menu, hours and copy ship as plain HTML that search engines (and people
 * on slow phones) can read without any JavaScript. Vite restarts the dev server by itself when
 * anything this config imports (src/data, src/sections, src/lib) changes.
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

export default defineConfig({
  plugins: [staticSections(), tailwindcss()],
})
