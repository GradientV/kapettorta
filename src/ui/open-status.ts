import { hours } from '../data/hours.ts'
import { getOpenStatus, nowInNewYork } from '../lib/hours.ts'

/** Keeps every "Open now · until 8:30 PM" line and today's row in the hours table current, in New York time. */
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
      if (label) label.textContent = status.label
    })
    rows.forEach((row) => row.toggleAttribute('data-today', Number(row.dataset.hoursDay) === now.day))
  }

  update()
  window.setInterval(update, 60_000)
}
