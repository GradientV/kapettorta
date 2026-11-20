import { hours } from '../data/hours.ts'
import { formatTime, summarizeWeek } from '../lib/hours.ts'
import { esc, html } from '../lib/html.ts'

/** Page gutter and max width, shared by every section. */
export const container = 'mx-auto w-full max-w-[80rem] px-5 sm:px-8 lg:px-10'

/** Attributes for links that leave the site. */
export const external = 'target="_blank" rel="noopener"'

/** Which page is being rendered, for the <head> tags and the current nav link. */
export type Page = 'home' | 'story'

export function isPage(value: string | undefined): value is Page {
  return value === 'home' || value === 'story'
}

/** The linked wordmark gets its accessible name from the surrounding home link. */
export function logo(): string {
  return html`<span class="wordmark" aria-hidden="true">Kape’t <span>Torta</span></span>`
}

/**
 * What the open/closed line says before the script fills in the live status (and if it never runs):
 * "Open 7 days · until 8:30 PM". Build-time "open now" would be stale by the time anyone reads it.
 */
export function statusFallback(): string {
  const open = hours.filter((day) => day !== null)
  const closes = new Set(open.map((day) => day.closes))
  const days = open.length === 7 ? 'Open 7 days' : `Open ${open.length} days a week`
  return closes.size === 1 ? `${days} · until ${formatTime(open[0].closes)}` : days
}

/** "● Open now · until 8:30 PM", kept current in New York time by src/ui/open-status.ts. */
export function openStatus(className = ''): string {
  return html`<p class="open-status ${className}" data-open-status>
    <span class="open-dot" aria-hidden="true"></span><span data-open-status-label>${esc(statusFallback())}</span>
  </p>`
}

/**
 * The same status on two lines, for tight spaces: "● Open now" large, "Until 8:30 PM" under it.
 * src/ui/open-status.ts splits the live label the same way.
 */
export function openStatusStacked(stateClass = '', detailClass = ''): string {
  const [state, ...detail] = statusFallback().split(' · ')
  const rest = detail.join(' · ')
  return html`<div data-open-status>
    <p class="open-status ${stateClass}"><span class="open-dot" aria-hidden="true"></span><span data-open-status-label>${esc(state)}</span></p>
    <p class="${detailClass}" data-open-status-detail>${esc(rest.charAt(0).toUpperCase() + rest.slice(1))}</p>
  </div>`
}

/** "Mon–Thu 9 AM – 8:30 PM" and "Fri–Sun 8 AM – 8:30 PM", one entry per run of days with the same hours. */
export function weekSummary(): { days: string; hours: string }[] {
  return summarizeWeek(hours)
}
