import '@fontsource-variable/figtree'
import '@fontsource-variable/figtree/wght-italic.css'
import '@fontsource/caprasimo/latin-400.css'
import '@fontsource/oleo-script/latin-700.css'
import './styles.css'
import { initHeader } from './ui/header.ts'
import { initNotice } from './ui/notice.ts'
import { initOpenStatus } from './ui/open-status.ts'

initNotice()
initHeader()
initOpenStatus()

document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = String(new Date().getFullYear())
})
