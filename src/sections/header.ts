import { notice } from '../data/notice.ts'
import { site } from '../data/site.ts'
import { nowInNewYork } from '../lib/hours.ts'
import { esc, html } from '../lib/html.ts'
import { icon } from '../lib/icons.ts'
import { container, external, logo, openStatus, type Page } from './ui.ts'

interface NavLink {
  label: string
  href: string
  /** The page this link is, for aria-current. */
  page?: Page
}

const links: readonly NavLink[] = [
  { label: 'Menu', href: '/#menu' },
  { label: 'Our story', href: '/story', page: 'story' },
  { label: 'Visit', href: '/#visit' },
]

/** The notice from src/data/notice.ts, while there is one. One whose date has passed is left out. */
function noticeStrip(): string {
  if (!notice || (notice.until && notice.until < nowInNewYork().date)) return ''
  return html`<div class="bg-ube-950 text-[0.95rem] leading-snug text-milk" style="--focus-ring: var(--color-cheese)" data-notice ${notice.until ? `data-until="${notice.until}"` : ''}>
    <p class="${container} py-2.5 text-center">
      ${esc(notice.message)}${notice.link && html` <a class="ml-1 font-bold whitespace-nowrap text-cheese underline decoration-cheese/50 underline-offset-4 hover:decoration-cheese" href="${notice.link.href}">${esc(notice.link.label)}</a>`}
    </p>
  </div>`
}

export function header(page: Page): string {
  const current = (link: NavLink) => (link.page === page ? 'aria-current="page"' : '')
  return html`${noticeStrip()}
  <header data-header class="sticky top-0 z-40 border-b border-ink/10 bg-milk">
    <div class="${container} flex h-16 items-center justify-between gap-6 lg:h-20">
      <a href="/" class="flex items-center gap-3.5" aria-label="Kape’t Torta, home">
        ${logo('sm', 'lg:[--logo:3.5rem]')}
        <span class="hidden leading-tight sm:block">
          <span class="block font-bold">Filipino bakery &amp; café</span>
          <span class="block text-[0.92rem] text-ink/65">${site.address.street}, ${site.address.locality}</span>
        </span>
      </a>

      <nav aria-label="Main" class="hidden items-center gap-8 lg:flex">
        ${links.map((link) => html`<a class="nav-link" href="${link.href}" ${current(link)}>${link.label}</a>`)}
        <a class="nav-link whitespace-nowrap tabular-nums" href="${site.phoneHref}">${site.phone}</a>
        <a class="btn btn-ube" href="${site.links.order}" ${external}>Order online</a>
      </nav>

      <div class="flex items-center gap-2 lg:hidden">
        <a class="btn btn-ube btn-sm" href="${site.links.order}" ${external}>Order</a>
        <button type="button" class="grid size-11 place-items-center border-2 border-ink/15 transition-colors hover:border-ink" data-nav-toggle aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu">
          <span data-icon-open>${icon('menu', 'size-6')}</span>
          <span data-icon-close hidden>${icon('close', 'size-6')}</span>
        </button>
      </div>
    </div>

    <div id="mobile-nav" class="fixed inset-x-0 bottom-0 z-40 overflow-y-auto border-t border-ink/10 bg-milk lg:hidden" style="top: var(--nav-top, 4rem)" hidden>
      <nav aria-label="Mobile" class="${container} flex min-h-full flex-col py-4">
        <ul>
          ${links.map(
            (link) => html`<li class="border-b border-ink/12"><a class="flex items-center justify-between py-4 font-display text-[2.4rem] leading-none" href="${link.href}" ${current(link)}>${link.label}${icon('arrow', 'size-6 text-ink/35')}</a></li>`,
          )}
        </ul>
        <div class="mt-7 space-y-1.5">
          ${openStatus('font-semibold')}
          <p class="text-ink/70">${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}</p>
        </div>
        <div class="mt-7 grid grid-cols-2 gap-3">
          <a class="btn btn-line" href="${site.phoneHref}">${icon('phone', 'size-4')} Call</a>
          <a class="btn btn-line" href="${site.links.directions}" ${external}>${icon('pin', 'size-4')} Directions</a>
          <a class="btn btn-ube col-span-2" href="${site.links.order}" ${external}>${icon('bag', 'size-4')} Order pickup or delivery</a>
        </div>
      </nav>
    </div>
  </header>`
}
