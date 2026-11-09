import { notice } from '../data/notice.ts'
import { site } from '../data/site.ts'
import { nowInNewYork } from '../lib/hours.ts'
import { esc, html } from '../lib/html.ts'
import { icon } from '../lib/icons.ts'
import { container, external, openStatus, wordmark } from './ui.ts'

const left = [
  { label: 'Menu', href: '#menu' },
  { label: 'Cakes', href: '#cakes' },
  { label: 'Our story', href: '#story' },
]
const right = [
  { label: 'Kape', href: '#kape' },
  { label: 'Visit', href: '#visit' },
]

/** Hours, address and phone; or, while there is one, the notice from src/data/notice.ts. */
function strip(): string {
  const now = nowInNewYork()
  const usual = html`<div class="${container} flex items-center justify-center gap-x-6 py-2 sm:justify-between">
    ${openStatus()}
    <p class="hidden sm:block"><a class="hover:underline" href="${site.links.directions}" ${external}>${site.address.street}, ${site.address.locality}</a></p>
    <p class="hidden md:block"><a class="hover:underline" href="${site.phoneHref}">${site.phone}</a></p>
  </div>`

  // A notice whose date has passed is left out at build time, and hidden by src/ui/notice.ts if it lapses later.
  const active = notice && (!notice.until || notice.until >= now.date) ? notice : null
  if (!active) return html`<div class="strip bg-roast-800 text-cream/85">${usual}</div>`

  return html`<div class="strip bg-torta text-paper" data-notice ${active.until ? `data-until="${active.until}"` : ''}>
      <p class="${container} py-2 text-center">
        ${esc(active.message)}
        ${active.link && html` <a class="ml-1 font-bold whitespace-nowrap underline decoration-paper/50 underline-offset-4 hover:decoration-paper" href="${active.link.href}">${esc(active.link.label)}</a>`}
      </p>
    </div>
    <div class="strip bg-roast-800 text-cream/85" data-notice-fallback hidden>${usual}</div>`
}

export function header(): string {
  return html`${strip()}
  <header data-header class="sticky top-0 z-40 bg-roast text-cream" style="--focus-ring: var(--color-yema)">
    <div class="${container} relative flex h-16 items-center justify-between lg:grid lg:h-22 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
      <nav aria-label="Main" class="hidden items-center gap-9 lg:flex">
        ${left.map((link) => html`<a class="nav-link" href="${link.href}">${link.label}</a>`)}
      </nav>

      <a href="#top" class="lg:justify-self-center" aria-label="Kape’t Torta, back to the top">${wordmark('header')}</a>

      <nav aria-label="More" class="hidden items-center justify-end gap-9 pr-36 lg:flex xl:pr-40">
        ${right.map((link) => html`<a class="nav-link" href="${link.href}">${link.label}</a>`)}
        <a class="nav-link hidden whitespace-nowrap tabular-nums xl:inline" href="${site.phoneHref}">${site.phone}</a>
      </nav>

      <a class="order-tab edge-b hidden lg:flex" href="${site.links.order}" ${external}>
        <span class="order-tab-label">Order</span>
        <span class="order-tab-sub">Pickup · Delivery</span>
      </a>

      <div class="flex items-center gap-2 lg:hidden">
        <a class="btn btn-torta btn-sm" href="${site.links.order}" ${external}>Order</a>
        <button type="button" class="grid size-11 place-items-center border border-cream/30 hover:border-cream" data-nav-toggle aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu">
          <span data-icon-open>${icon('menu', 'size-6')}</span>
          <span data-icon-close hidden>${icon('close', 'size-6')}</span>
        </button>
      </div>
    </div>

    <div id="mobile-nav" class="fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-roast lg:hidden" hidden>
      <nav aria-label="Mobile" class="${container} flex min-h-full flex-col py-8">
        <ul class="border-t border-cream/15">
          ${[...left, ...right].map(
            (link) => html`<li class="border-b border-cream/15"><a class="flex items-center justify-between py-4 font-display text-[2.6rem] leading-none font-extrabold tracking-[0.01em] uppercase hover:text-yema" href="${link.href}">${link.label}${icon('arrow', 'size-6 text-cream/40')}</a></li>`,
          )}
        </ul>
        <div class="mt-8 space-y-4">
          ${openStatus(undefined, 'text-cream/85')}
          <p class="text-cream/75">${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}</p>
        </div>
        <div class="mt-8 grid grid-cols-2 gap-3">
          <a class="btn btn-ghost" href="${site.phoneHref}">${icon('phone', 'size-4')} Call</a>
          <a class="btn btn-ghost" href="${site.links.directions}" ${external}>${icon('pin', 'size-4')} Directions</a>
          <a class="btn btn-torta col-span-2" href="${site.links.order}" ${external}>${icon('bag', 'size-4')} Order pickup or delivery</a>
        </div>
      </nav>
    </div>
  </header>`
}
