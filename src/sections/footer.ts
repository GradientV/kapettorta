import { site } from '../data/site.ts'
import { html } from '../lib/html.ts'
import { icon } from '../lib/icons.ts'
import { container, external, logo, weekSummary } from './ui.ts'

const heading = 'text-[0.9rem] font-semibold text-milk'
const linkClass = 'hover:text-white hover:underline underline-offset-4'

/** The fixed Call / Directions / Order bar on phones. */
function actionBar(): string {
  const cell = 'flex flex-col items-center justify-center gap-1 py-2.5 text-[0.85rem] font-bold'
  return html`<nav aria-label="Quick actions" class="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 divide-x divide-rule border-t border-rule bg-milk pb-[env(safe-area-inset-bottom)] text-ink lg:hidden">
    <a class="${cell}" href="${site.phoneHref}">${icon('phone', 'size-5')} Call</a>
    <a class="${cell}" href="${site.links.directions}" ${external}>${icon('pin', 'size-5')} Directions</a>
    <a class="${cell} bg-accent text-white hover:bg-accent-dark" href="${site.links.order}" ${external}>${icon('bag', 'size-5')} Order</a>
  </nav>`
}

export function footer(): string {
  const { street, locality, region, postalCode } = site.address
  return html`<footer class="bg-ink text-milk/85" style="--focus-ring: var(--color-milk)">
    <div class="${container} grid gap-10 pt-12 pb-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
      <div class="sm:col-span-2 lg:col-span-4">
        <a href="/" class="inline-block text-milk" aria-label="Kape’t Torta, home">${logo()}</a>
        <p class="mt-3 max-w-[17rem] text-[0.98rem] text-milk/75">Kape at torta means coffee and cake. Baked and brewed on Queens Blvd since ${site.established}.</p>
      </div>
      <div class="lg:col-span-3">
        <h2 class="${heading}">Visit</h2>
        <address class="mt-3 leading-relaxed not-italic">
          <a class="${linkClass}" href="${site.links.directions}" ${external}>${street}<br />${locality}, ${region} ${postalCode}</a><br />
          <a class="${linkClass} tabular-nums" href="${site.phoneHref}">${site.phone}</a><br />
          <a class="${linkClass} break-all" href="mailto:${site.email}">${site.email}</a>
        </address>
      </div>
      <div class="lg:col-span-3">
        <h2 class="${heading}">Hours</h2>
        <dl class="mt-3 grid grid-cols-[auto_1fr] gap-x-5 leading-relaxed">
          ${weekSummary().map((group) => html`<dt>${group.days}</dt><dd class="tabular-nums">${group.hours}</dd>`)}
        </dl>
      </div>
      <div class="lg:col-span-2">
        <h2 class="${heading}">More</h2>
        <ul class="mt-3 space-y-0.5 leading-relaxed">
          <li><a class="${linkClass}" href="/story">Our story</a></li>
          <li><a class="${linkClass}" href="${site.links.order}" ${external}>Order online</a></li>
          <li><a class="${linkClass} inline-flex items-center gap-2" href="${site.links.instagram}" ${external}>${icon('instagram', 'size-4')} Instagram</a></li>
          <li><a class="${linkClass} inline-flex items-center gap-2" href="${site.links.facebook}" ${external}>${icon('facebook', 'size-4')} Facebook</a></li>
        </ul>
      </div>
    </div>

    <div class="border-t border-milk/10">
      <div class="${container} flex flex-col gap-2 py-6 text-[0.92rem] text-milk/55 sm:flex-row sm:items-center sm:justify-between">
        <p>© <span data-year>${new Date().getFullYear()}</span> Kape’t Torta · <i class="text-milk/75">Daghang salamat!</i></p>
        <p>Website by <a class="text-milk/80 underline underline-offset-4 hover:text-milk" href="https://gradientv.com" ${external}>GradientV</a></p>
      </div>
    </div>
    <div class="h-16 lg:hidden" aria-hidden="true"></div>
  </footer>
  ${actionBar()}`
}
