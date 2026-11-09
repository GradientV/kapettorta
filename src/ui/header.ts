/** The mobile menu: the toggle opens it; Escape, link clicks and growing past the lg breakpoint close it. */
export function initHeader(): void {
  const header = document.querySelector<HTMLElement>('[data-header]')
  const toggle = header?.querySelector<HTMLButtonElement>('[data-nav-toggle]')
  const panel = document.getElementById('mobile-nav')
  if (!header || !toggle || !panel) return

  const openIcon = toggle.querySelector<HTMLElement>('[data-icon-open]')
  const closeIcon = toggle.querySelector<HTMLElement>('[data-icon-close]')
  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true'

  // The header sits under the top strip until the page scrolls, so start the panel wherever it ends.
  const placePanel = () => panel.style.setProperty('--nav-top', `${Math.max(0, header.getBoundingClientRect().bottom)}px`)

  const setOpen = (open: boolean) => {
    if (open) placePanel()
    toggle.setAttribute('aria-expanded', String(open))
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
    panel.hidden = !open
    if (openIcon) openIcon.hidden = open
    if (closeIcon) closeIcon.hidden = !open
    document.documentElement.classList.toggle('overflow-hidden', open)
  }

  toggle.addEventListener('click', () => setOpen(!isOpen()))
  panel.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a')) setOpen(false)
  })
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false)
      toggle.focus()
    }
  })
  window.addEventListener('resize', () => {
    if (isOpen()) placePanel()
  })
  window.matchMedia('(min-width: 64rem)').addEventListener('change', (event) => {
    if (event.matches) setOpen(false)
  })
}
