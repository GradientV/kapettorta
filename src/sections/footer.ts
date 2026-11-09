import { hours } from '../data/hours.ts'
import { site } from '../data/site.ts'
import { pastryCounter } from '../lib/art.ts'
import { summarizeWeek } from '../lib/hours.ts'
import { html } from '../lib/html.ts'
import { icon } from '../lib/icons.ts'
import { badge, container, external, wordmark } from './ui.ts'

const heading = 'eyebrow text-yema'
const linkClass = 'hover:text-yema'

/** The fixed Call / Directions / Order bar on phones. */
function actionBar(): string {
  const cell = 'flex flex-col items-center justify-center gap-1 py-2.5 font-display text-[0.92rem] font-bold tracking-[0.16em] uppercase'
  return html`<nav aria-label="Quick actions" class="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 divide-x divide-cream/15 border-t border-cream/15 bg-roast pb-[env(safe-area-inset-bottom)] text-cream lg:hidden" style="--focus-ring: var(--color-yema)">
    <a class="${cell}" href="${site.phoneHref}">${icon('phone', 'size-5')} Call</a>
    <a class="${cell}" href="${site.links.directions}" ${external}>${icon('pin', 'size-5')} Directions</a>
    <a class="${cell} bg-torta" href="${site.links.order}" ${external}>${icon('bag', 'size-5')} Order</a>
  </nav>`
}

export function footer(): string {
  const { street, locality, region, postalCode } = site.address
  return html`<div class="overflow-hidden bg-kraft pt-6 text-roast" aria-hidden="true">
    <div class="counter">${pastryCounter('block h-full w-full')}</div>
  </div>
  <footer class="bg-roast text-cream" style="--focus-ring: var(--color-yema)">
    <div class="${container} grid gap-12 py-16 sm:py-20 lg:grid-cols-12">
      <div class="flex items-center gap-7 lg:col-span-4">
        ${badge('footer-badge', 'size-28 shrink-0 text-cream/75 sm:size-32')}
        <div>
          <a href="#top" aria-label="Kape’t Torta, back to the top">${wordmark('footer')}</a>
          <p class="mt-3 max-w-[16rem] text-[0.98rem] text-cream/70"><i>Kape at torta</i>: coffee and cake from Gingoog, baked and brewed on Queens Blvd since ${site.established}.</p>
        </div>
      </div>

      <div class="grid gap-10 sm:grid-cols-3 lg:col-span-8 lg:pl-8">
        <div>
          <p class="${heading}">Visit</p>
          <address class="mt-4 leading-relaxed text-cream/85 not-italic">
            <a class="${linkClass}" href="${site.links.directions}" ${external}>${street}<br />${locality}, ${region} ${postalCode}</a><br />
            <a class="${linkClass}" href="${site.phoneHref}">${site.phone}</a><br />
            <a class="${linkClass} break-all" href="mailto:${site.email}">${site.email}</a>
          </address>
        </div>
        <div>
          <p class="${heading}">Hours</p>
          <dl class="mt-4 grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 leading-relaxed text-cream/85">
            ${summarizeWeek(hours).map((group) => html`<dt>${group.days}</dt><dd class="tabular-nums">${group.hours}</dd>`)}
          </dl>
        </div>
        <div>
          <p class="${heading}">Order &amp; follow</p>
          <ul class="mt-4 space-y-1 leading-relaxed text-cream/85">
            <li><a class="${linkClass}" href="${site.links.order}" ${external}>Order pickup or delivery</a></li>
            <li><a class="${linkClass}" href="#cakes">Pre-order a whole cake</a></li>
            <li><a class="${linkClass} inline-flex items-center gap-2" href="${site.links.instagram}" ${external}>${icon('instagram', 'size-4')} ${site.instagramHandle}</a></li>
            <li><a class="${linkClass} inline-flex items-center gap-2" href="${site.links.facebook}" ${external}>${icon('facebook', 'size-4')} Facebook</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="border-t border-cream/10">
      <div class="${container} flex flex-col gap-3 py-7 font-display text-[0.92rem] font-semibold tracking-[0.18em] text-cream/55 uppercase sm:flex-row sm:items-center sm:justify-between">
        <p>© <span data-year>${new Date().getFullYear()}</span> Kape’t Torta · <span class="normal-case tracking-normal font-slab italic text-[1.05rem] text-cream/70">Daghang salamat!</span></p>
        <p>Website by <a class="text-cream/80 underline underline-offset-4 hover:text-cream" href="https://gradientv.com" ${external}>GradientV</a></p>
      </div>
    </div>
    <div class="h-16 lg:hidden" aria-hidden="true"></div>
  </footer>
  ${actionBar()}`
}
