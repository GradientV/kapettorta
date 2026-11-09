import { hours } from '../data/hours.ts'
import { formatTime } from '../lib/hours.ts'
import { esc, html } from '../lib/html.ts'

/** Page gutter and max width, shared by every section. */
export const container = 'mx-auto w-full max-w-[86rem] px-5 sm:px-8 lg:px-12'

/** Attributes for links that leave the site. */
export const external = 'target="_blank" rel="noopener"'

/**
 * The name set the way their sign and Instagram logo set it: "Kape’t" in a heavy slab,
 * "Torta" in red script with a cream outline. A stand-in until we have their logo files.
 */
export function wordmark(size: 'header' | 'footer' | 'drawer' = 'header'): string {
  return html`<span class="wordmark wordmark-${size}" aria-hidden="true"><span class="wordmark-kape">Kape’t</span><span class="wordmark-torta">Torta</span></span>`
}

/** The round stamp after The Smith's: the address number in the middle, the name and year around it. */
export function badge(id: string, className = ''): string {
  return html`<svg class="badge ${className}" viewBox="0 0 200 200" role="img" aria-label="Kape’t Torta, 83-13 Queens Blvd, Elmhurst, Queens. Established 2019.">
    <defs><path id="${id}" d="M100 100m-75 0a75 75 0 1 1 150 0a75 75 0 1 1-150 0"/></defs>
    <circle cx="100" cy="100" r="97" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="100" cy="100" r="91" fill="none" stroke="currentColor" stroke-width=".75"/>
    <circle cx="100" cy="100" r="58" fill="none" stroke="currentColor" stroke-width="1"/>
    <text class="badge-ring"><textPath href="#${id}" textLength="468" lengthAdjust="spacing">Kape’t Torta ✦ Elmhurst, Queens ✦ Est. 2019 ✦</textPath></text>
    <text class="badge-number" x="100" y="104" text-anchor="middle">83-13</text>
    <text class="badge-street" x="100" y="126" text-anchor="middle">Queens Blvd</text>
  </svg>`
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
export function openStatus(fallback = statusFallback(), className = ''): string {
  return html`<p class="open-status ${className}" data-open-status>
    <span class="open-dot" aria-hidden="true"></span><span data-open-status-label>${esc(fallback)}</span>
  </p>`
}

/** Small tracked label above a heading. */
export function eyebrow(text: string, className = ''): string {
  return html`<p class="eyebrow ${className}">${text}</p>`
}
