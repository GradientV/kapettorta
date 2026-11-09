import '@fontsource-variable/sofia-sans'
import '@fontsource-variable/sofia-sans/wght-italic.css'
import '@fontsource-variable/sofia-sans-extra-condensed'
import '@fontsource/zilla-slab/latin-500.css'
import '@fontsource/zilla-slab/latin-500-italic.css'
import '@fontsource/zilla-slab/latin-600.css'
import '@fontsource/zilla-slab/latin-700.css'
import '@fontsource/oleo-script/latin-400.css'
import '@fontsource/oleo-script/latin-700.css'
import './styles.css'
import { initHeader } from './ui/header.ts'
import { initNotice } from './ui/notice.ts'
import { initOpenStatus } from './ui/open-status.ts'
import { initReveal } from './ui/reveal.ts'

initNotice()
initHeader()
initOpenStatus()
initReveal()

document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = String(new Date().getFullYear())
})
