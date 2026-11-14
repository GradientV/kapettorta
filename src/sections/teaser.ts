import { photos } from '../data/photos.ts'
import { site } from '../data/site.ts'
import { html } from '../lib/html.ts'
import { icon } from '../lib/icons.ts'
import { img } from '../lib/photo.ts'
import { container } from './ui.ts'

/** Two lines of the story on the home page; the rest is on /story. */
export function teaser(): string {
  return html`<section class="border-y border-ink/10 bg-ube-50 py-12 sm:py-14" aria-labelledby="teaser-title">
    <div class="${container} grid items-center gap-7 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-14">
      ${img(photos.bulbs, { width: 800, sizes: '(min-width: 1280px) 30rem, (min-width: 640px) 38vw, 92vw', class: 'aspect-[3/2] w-full object-cover' })}
      <div>
        <h2 id="teaser-title" class="h3 text-ube-800">Three friends from Gingoog</h2>
        <p class="mt-3 max-w-[36rem] text-[1.1rem]">
          Nora, Jeanette and Khaty grew up in Gingoog, Mindanao. In ${site.established} they opened Kape’t Torta in a former nail salon on Queens Blvd.
        </p>
        <a class="link-arrow mt-5 text-ube-800" href="/story">Read our story ${icon('arrow', 'size-4')}</a>
      </div>
    </div>
  </section>`
}
