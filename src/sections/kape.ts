import { menu } from '../data/menu.ts'
import { photos } from '../data/photos.ts'
import { haloHalo, haloHaloLayers } from '../lib/art.ts'
import { html, money } from '../lib/html.ts'
import { img } from '../lib/photo.ts'
import { container, eyebrow } from './ui.ts'

const price = (name: string): string => {
  const found = menu.flatMap((section) => section.items).find((entry) => entry.name === name)
  if (!found?.price) throw new Error(`The Kape section needs a price for "${name}" in src/data/menu.ts.`)
  return money(found.price)
}

// Barako and buko sugar: Culinary Backstreets (2019) and The Infatuation (2020, 2021).
// Tablea: Culinary Backstreets (2019). TODO: confirm tablea hot chocolate is still on, and its price.
// Halo-halo layers: I May Roam (2023) and their DoorDash listing. TODO: confirm with the owners.
export function kape(): string {
  return html`<section id="kape" class="relative bg-roast py-20 text-cream sm:py-24 lg:py-32" style="--focus-ring: var(--color-yema)" aria-labelledby="kape-title">
    <div class="${container}">
      <div class="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-5" data-reveal>
          ${img(photos.coffee, { width: 800, sizes: '(min-width: 1024px) 36vw, 92vw', class: 'chamfer aspect-[4/5] w-full object-cover' })}
        </div>

        <div class="flex flex-col justify-center lg:col-span-7" data-reveal>
          ${eyebrow('Kape · coffee', 'text-yema')}
          <h2 id="kape-title" class="display-xl mt-4">The coffee is barako</h2>
          <div class="prose-dark mt-8 max-w-[38rem]">
            <p>
              <i>Kapeng barako</i> (KAH-peng bah-RAH-koh) is the Philippines’ own Liberica coffee, grown around Batangas.
              It’s big and bold, with less of the sour bite of everyday beans, and <i>barako</i> means “stud,” which tells you
              how strong it is. Only a few cafés in New York pour it. We have since day one.
            </p>
            <p>
              Take it the way they do back home, with a spoonful of buko sugar (coconut sugar from Gingoog) from the
              jar on the counter. And with a torta, obviously.
            </p>
          </div>
          <dl class="mt-9 grid max-w-[38rem] grid-cols-2 border-y border-cream/20 sm:grid-cols-3">
            <div class="py-4 pr-4"><dt class="eyebrow text-cream/60">Hot</dt><dd class="price-line mt-1.5 text-[1.6rem]">${price('Kapeng barako')}</dd></div>
            <div class="border-l border-cream/20 py-4 pl-4"><dt class="eyebrow text-cream/60">Iced</dt><dd class="price-line mt-1.5 text-[1.6rem]">${price('Iced coffee')}</dd></div>
            <div class="col-span-2 border-t border-cream/20 py-4 sm:col-span-1 sm:border-t-0 sm:border-l sm:pl-4"><dt class="eyebrow text-cream/60">With a torta</dt><dd class="price-line mt-1.5 text-[1.6rem]">${price('Torta Cebuana')}</dd></div>
          </dl>
        </div>
      </div>

      <div class="mt-20 grid gap-10 border-t border-cream/15 pt-16 lg:mt-28 lg:grid-cols-12 lg:gap-16 lg:pt-24">
        <div class="lg:col-span-5" data-reveal>
          <div class="frame frame-roast-2 p-3.5">
            ${img(photos.chocolate, { width: 700, sizes: '(min-width: 1024px) 34vw, 92vw', class: 'chamfer-sm aspect-square w-full object-cover' })}
            <div class="px-3 pt-6 pb-4 sm:px-4">
              <h3 class="font-slab text-[1.75rem] leading-tight font-bold">Tablea hot chocolate</h3>
              <p class="say mt-1 text-cream/55">tah-BLEH-ah</p>
              <p class="mt-4 text-cream/80">
                Tablea is cacao from Gingoog, roasted, ground and pressed into tablets. At home it’s whisked by hand
                with a wooden <i>batirol</i>. On a busy day here an electric whisk does the work, but the tablea is
                the real thing, and Khaty says she can taste Gingoog’s from any other.
              </p>
            </div>
          </div>
        </div>

        <div class="lg:col-span-7" data-reveal>
          ${eyebrow('Merienda, the cold way', 'text-yema')}
          <h3 class="display-lg mt-4">Halo-halo, layer by layer</h3>
          <p class="mt-5 max-w-[34rem] text-[1.1rem] text-cream/80">
            <i>Halo-halo</i> means “mix-mix.” Dig a spoon all the way to the bottom, stir, and keep going.
            Our special halo-halo is ${price('Special halo-halo')}.
          </p>
          <div class="mt-8 grid items-center gap-8 sm:grid-cols-[minmax(0,18rem)_1fr] sm:gap-10">
            ${haloHalo('mx-auto w-full max-w-[18rem] text-cream')}
            <ol class="halo-list">
              ${haloHaloLayers.map((layer, i) => html`<li><span class="halo-list-num">${i + 1}</span>${layer}</li>`)}
            </ol>
          </div>
        </div>
      </div>
    </div>
  </section>`
}
