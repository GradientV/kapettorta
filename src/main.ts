import '@fontsource-variable/figtree'
import '@fontsource-variable/figtree/wght-italic.css'
import '@fontsource-variable/source-serif-4/standard.css'
import './styles.css'
import { initHeader } from './ui/header.ts'
import { initOpenStatus } from './ui/open-status.ts'

initHeader()
initOpenStatus()

document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = String(new Date().getFullYear())
})
