/** Keep the disclosure and its accessible state in sync. */
export function initHeader(): void {
  const header = document.querySelector<HTMLElement>('[data-header]')
  const toggle = header?.querySelector<HTMLButtonElement>('[data-nav-toggle]')
  const panel = document.getElementById('mobile-nav')
  if (!header || !toggle || !panel) return

  const openIcon = toggle.querySelector<HTMLElement>('[data-icon-open]')
  const closeIcon = toggle.querySelector<HTMLElement>('[data-icon-close]')
  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true'

  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open))
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation')
    panel.hidden = !open
    if (openIcon) openIcon.hidden = open
    if (closeIcon) closeIcon.hidden = !open
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
  const closeOutside = (event: Event) => {
    if (isOpen() && event.target instanceof Node && !header.contains(event.target)) setOpen(false)
  }
  document.addEventListener('pointerdown', closeOutside)
  document.addEventListener('focusin', closeOutside)
  window.matchMedia('(min-width: 64rem)').addEventListener('change', (event) => {
    if (event.matches) setOpen(false)
  })
}
