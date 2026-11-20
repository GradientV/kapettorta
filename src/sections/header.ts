import { site } from '../data/site.ts'
import { html } from '../lib/html.ts'
import { icon } from '../lib/icons.ts'
import { container, external, logo, type Page } from './ui.ts'

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

export function header(page: Page): string {
  const current = (link: NavLink) => (link.page === page ? 'aria-current="page"' : '')
  return html`<header data-header class="sticky top-0 z-40 border-b border-rule bg-milk">
    <div class="${container} flex h-16 items-center justify-between gap-6 lg:h-20">
      <a href="/" class="inline-flex min-h-11 items-center" aria-label="Kape’t Torta, home">${logo()}</a>

      <nav aria-label="Main" class="hidden items-center gap-8 lg:flex">
        ${links.map((link) => html`<a class="nav-link" href="${link.href}" ${current(link)}>${link.label}</a>`)}
        <a class="btn btn-primary" href="${site.links.order}" ${external}>Order online</a>
      </nav>

      <button type="button" class="grid size-11 cursor-pointer place-items-center text-ink hover:text-accent lg:hidden" data-nav-toggle aria-expanded="false" aria-controls="mobile-nav" aria-label="Open navigation">
        <span data-icon-open>${icon('menu', 'size-6')}</span>
        <span data-icon-close hidden>${icon('close', 'size-6')}</span>
      </button>
    </div>

    <nav id="mobile-nav" aria-label="Mobile" class="absolute inset-x-0 top-full max-h-[calc(100dvh-4.1rem)] overflow-y-auto overscroll-contain border-y border-rule bg-milk lg:hidden" hidden>
      <div class="${container} pt-1 pb-5">
        ${links.map((link) => html`<a class="mobile-nav-link" href="${link.href}" ${current(link)}>${link.label}</a>`)}
        <div class="mt-5 flex flex-wrap items-center justify-between gap-3">
          <a class="nav-link tabular-nums" href="${site.phoneHref}">${site.phone}</a>
          <a class="btn btn-primary" href="${site.links.order}" ${external}>Order online</a>
        </div>
      </div>
    </nav>
  </header>`
}
