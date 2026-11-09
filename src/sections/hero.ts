import { photos } from '../data/photos.ts'
import { site } from '../data/site.ts'
import { html } from '../lib/html.ts'
import { icon } from '../lib/icons.ts'
import { img } from '../lib/photo.ts'
import { badge, container, external, openStatus } from './ui.ts'

/** One word of the name, with its English underneath like a dictionary gloss. */
function word(text: string, gloss: string, className = ''): string {
  return html`<span class="hero-word ${className}"><span class="hero-big">${text}</span><span class="hero-gloss">${gloss}</span></span>`
}

export function hero(): string {
  return html`<section id="top" class="relative isolate overflow-hidden bg-roast text-cream" style="--focus-ring: var(--color-yema)">
    ${img(photos.hero, { width: 1440, sizes: '100vw', priority: true, class: 'absolute inset-0 -z-20 size-full object-cover' })}
    <div class="absolute inset-0 -z-10 bg-roast/60"></div>

    <div class="${container} flex min-h-[min(calc(100svh-6.25rem),50rem)] flex-col justify-end pt-28 pb-14 sm:pb-16 lg:min-h-[min(calc(100svh-7.5rem),58rem)] lg:pb-20">
      <h1>
        <span class="eyebrow block text-yema">Filipino bakery &amp; café<span class="hidden sm:inline"> · Elmhurst, Queens</span></span>
        <span class="sr-only">Kape’t Torta: kape at torta, coffee and cake.</span>
        <span class="hero-name" aria-hidden="true">
          ${word('Kape', 'coffee')}
          ${word('at', 'and', 'hero-word-at')}
          ${word('Torta', 'cake')}
        </span>
      </h1>

      <p class="mt-7 max-w-[38rem] font-slab text-[1.2rem] leading-snug text-cream/90 sm:text-[1.35rem]">
        That’s our name, give or take an apostrophe. Ube cheese pandesal fresh from the oven, buttery
        tortas, whole cakes, halo-halo and strong kapeng barako, on Queens Blvd since 2019.
      </p>

      <div class="mt-9 flex flex-wrap items-center gap-3">
        <a class="btn btn-torta" href="${site.links.order}" ${external}>${icon('bag', 'size-[1.1rem]')} Order pickup or delivery</a>
        <a class="btn btn-ghost" href="#menu">See the menu</a>
      </div>

      <div class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-cream/20 pt-5 text-cream/80">
        ${openStatus()}
        <a class="hover:text-cream" href="${site.links.directions}" ${external}>${site.address.street}, ${site.address.locality}</a>
        <span class="hidden sm:inline">${site.transit}</span>
      </div>
    </div>

    ${badge('hero-badge', 'absolute top-12 right-10 hidden size-40 -rotate-[8deg] text-cream/85 lg:block xl:right-16 xl:size-44')}
  </section>`
}
