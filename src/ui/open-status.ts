import { hours } from '../data/hours.ts'
import { getOpenStatus, nowInNewYork } from '../lib/hours.ts'

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

/**
 * Keeps every "Open now · until 8:30 PM" line and today's row in the hours table current, in New
 * York time. Where a status has a separate detail line, the label is split at the "·": "Open now"
 * and "Until 8:30 PM".
 */
export function initOpenStatus(): void {
  const lines = document.querySelectorAll<HTMLElement>('[data-open-status]')
  const rows = document.querySelectorAll<HTMLElement>('[data-hours-day]')
  if (!lines.length && !rows.length) return

  const update = () => {
    const now = nowInNewYork()
    const status = getOpenStatus(hours, now)
    lines.forEach((line) => {
      line.dataset.state = status.state
      const label = line.querySelector('[data-open-status-label]')
      const detail = line.querySelector('[data-open-status-detail]')
      if (detail) {
        const [state, ...rest] = status.label.split(' · ')
        if (label) label.textContent = state
        detail.textContent = capitalize(rest.join(' · '))
      } else if (label) {
        label.textContent = status.label
      }
    })
    rows.forEach((row) => row.toggleAttribute('data-today', Number(row.dataset.hoursDay) === now.day))
  }

  update()
  window.setInterval(update, 60_000)
}
