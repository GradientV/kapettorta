import { nowInNewYork } from '../lib/hours.ts'

/**
 * A notice with an end date is left out of builds made after it, but the page that's already live
 * keeps it. This swaps it back to the usual hours-and-address strip once its day has passed.
 */
export function initNotice(): void {
  const strip = document.querySelector<HTMLElement>('[data-notice][data-until]')
  if (!strip?.dataset.until || strip.dataset.until >= nowInNewYork().date) return
  strip.remove()
  const fallback = document.querySelector<HTMLElement>('[data-notice-fallback]')
  if (fallback) fallback.hidden = false
}
