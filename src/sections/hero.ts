import { bakery } from '../data/menu.ts'
import { photos } from '../data/photos.ts'
import { site } from '../data/site.ts'
import { html, money } from '../lib/html.ts'
import { icon } from '../lib/icons.ts'
import { img } from '../lib/photo.ts'
import { container, external, openStatusStacked } from './ui.ts'

/** The three things people look the shop up for: when it's open, where it is, how to order. */
function infoBar(): string {
  const label = 'text-[0.9rem] font-bold text-ink/65'
  const big = 'font-display text-[1.45rem] leading-tight'
  return html`<div class="scallops bg-cheese" style="--scallop-color: var(--color-ube-800)" aria-hidden="true"></div>
  <section class="bg-cheese text-ink" aria-label="Hours, address and phone">
    <div class="${container} grid gap-5 pt-3 pb-8 sm:grid-cols-3 sm:gap-8 sm:pt-4 sm:pb-10">
      <div>
        <h2 class="${label}">Hours</h2>
        ${openStatusStacked(`${big} mt-1`, 'mt-1 text-[0.95rem] text-ink/80')}
        <p class="mt-1 text-[0.95rem]"><a class="link font-semibold" href="#visit">All hours</a></p>
      </div>
      <div>
        <h2 class="${label}">Find us</h2>
        <p class="mt-1"><a class="${big} hover:underline" href="${site.links.directions}" ${external}>${site.address.street}, ${site.address.locality}</a></p>
        <p class="mt-1 text-[0.95rem] text-ink/80">${site.transit}</p>
      </div>
      <div>
        <h2 class="${label}">Call or order</h2>
        <p class="mt-1"><a class="${big} tabular-nums hover:underline" href="${site.phoneHref}">${site.phone}</a></p>
        <p class="mt-1 text-[0.95rem]"><a class="link font-semibold" href="${site.links.order}" ${external}>Pickup and delivery online</a></p>
      </div>
    </div>
  </section>`
}

export function hero(): string {
  const bestSeller = bakery.items.find((item) => item.tag === 'Best seller')
  if (!bestSeller) throw new Error('Tag one item in src/data/menu.ts as "Best seller" for the caption on the first photo.')
  return html`<section class="bg-ube-800 text-milk" style="--focus-ring: var(--color-cheese)" aria-labelledby="hero-title">
    <div class="${container} grid items-center gap-9 pt-9 pb-10 sm:pt-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-16 lg:pt-14 lg:pb-14">
      <div>
        <p class="kicker text-cheese">Filipino bakery &amp; café · Elmhurst, Queens</p>
        <h1 id="hero-title" class="h1 mt-4"><span class="sr-only">Kape’t Torta: </span>Coffee and cake, the Filipino way.</h1>
        <p class="mt-6 max-w-[33rem] text-[1.15rem] leading-relaxed text-ube-100 sm:text-[1.25rem]">
          Ube cheese pandesal, buttery torta, whole cakes and strong barako coffee, baked and brewed on Queens Blvd since ${site.established}.
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <a class="btn btn-cheese" href="${site.links.order}" ${external}>${icon('bag', 'size-5')} <span class="sm:hidden">Order online</span><span class="hidden sm:inline">Order pickup or delivery</span></a>
          <a class="btn btn-ghost" href="#menu">See the menu</a>
        </div>
      </div>

      <!-- Left out on phones, so the hours and address in the yellow bar make the first screen. -->
      <figure class="relative hidden sm:block">
        ${img(photos.ubePandesal, { width: 960, sizes: '(min-width: 1280px) 34rem, (min-width: 1024px) 42vw, 92vw', priority: true, minViewport: '640px', class: 'block aspect-[2/1] w-full object-cover lg:aspect-[5/4]' })}
        <figcaption class="absolute bottom-0 left-0 flex items-baseline gap-3 bg-milk px-4 py-2.5 text-ink">
          <span class="font-display text-[1.2rem]">${bestSeller.name}</span>
          <span class="font-semibold tabular-nums">${money(bestSeller.price)}</span>
          <span class="tag">${bestSeller.tag}</span>
        </figcaption>
      </figure>
    </div>
  </section>
  ${infoBar()}`
}
