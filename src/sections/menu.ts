import { bakery, cakes, coffee, coldSweets, drinks, type MenuGroup } from '../data/menu.ts'
import { photos } from '../data/photos.ts'
import { site } from '../data/site.ts'
import { cakeTop } from '../lib/art.ts'
import { esc, html, money } from '../lib/html.ts'
import { icon } from '../lib/icons.ts'
import { img, type Photo } from '../lib/photo.ts'
import { container, external } from './ui.ts'

const photoSizes = '(min-width: 1280px) 24rem, (min-width: 1024px) 30vw, (min-width: 640px) 80vw, 92vw'

function columnPhoto(photo: Photo): string {
  return img(photo, { width: 800, sizes: photoSizes, class: 'mb-7 aspect-[5/2] w-full object-cover sm:aspect-[3/2]' })
}

function group({ id, title, items, footnote }: MenuGroup): string {
  return html`<div class="menu-group" id="menu-${id}">
    <h3 class="h3 mb-4">${title}</h3>
    <ul class="menu-list">
      ${items.map(
        (item) => html`<li>
          <p class="flex items-baseline justify-between gap-4">
            <span class="font-bold">${esc(item.name)}${item.tag && html` <span class="tag ml-1">${esc(item.tag)}</span>`}</span>
            <span class="menu-price">${money(item.price)}</span>
          </p>
          ${item.note && html`<p class="mt-0.5 text-[0.95rem] leading-snug text-ink/65">${esc(item.note)}</p>`}
        </li>`,
      )}
    </ul>
    ${footnote && html`<p class="mt-3 text-[0.95rem] text-ink/65">${esc(footnote)}</p>`}
  </div>`
}

/** Slice and whole prices side by side, each cake drawn from above. */
function cakeGroup(): string {
  const junior = cakes.find((cake) => cake.junior)
  return html`<div class="menu-group" id="menu-cakes">
    <h3 class="h3 mb-4">Cakes</h3>
    <table class="cake-table">
      <caption class="sr-only">Cakes by the slice and whole</caption>
      <thead>
        <tr><th scope="col">Flavor</th><th scope="col">Slice</th><th scope="col">Whole</th></tr>
      </thead>
      <tbody>
        ${cakes.map(
          (cake) => html`<tr>
            <th scope="row"><span class="flex items-center gap-2.5 sm:gap-3">${cakeTop(cake.id, 'size-8 shrink-0 text-ink/40 sm:size-9 lg:size-8 xl:size-9')}${esc(cake.name)}</span></th>
            <td>${money(cake.slice)}</td>
            <td>${cake.whole ? money(cake.whole) : html`<a class="link font-semibold" href="${site.phoneHref}">Call</a>`}</td>
          </tr>`,
        )}
      </tbody>
    </table>
    <p class="mt-3 text-[0.95rem] text-ink/65">
      Whole cakes for birthdays and holidays: <a class="link font-semibold text-ink" href="${site.phoneHref}">call to reserve one</a>.
      ${junior && html`${junior.name} also comes in a junior size, ${money(junior.junior ?? 0)}.`}
    </p>
  </div>`
}

export function menuSection(): string {
  return html`<section id="menu" class="py-16 sm:py-20 lg:py-24" aria-labelledby="menu-title">
    <div class="${container}">
      <div class="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
        <div>
          <h2 id="menu-title" class="h2">Menu</h2>
          <p class="mt-3 max-w-[34rem] text-ink/70">Everything is baked right here. Prices on the delivery apps can run a little higher.</p>
        </div>
        <div class="flex flex-wrap gap-3">
          <a class="btn btn-ube" href="${site.links.order}" ${external}>${icon('bag', 'size-5')} Order online</a>
          <a class="btn btn-line" href="${site.phoneHref}">${icon('phone', 'size-4')} Call to order</a>
        </div>
      </div>

      <div class="mt-10 grid gap-x-10 gap-y-14 sm:mx-auto sm:max-w-[36rem] lg:mx-0 lg:mt-12 lg:max-w-none lg:grid-cols-3 xl:gap-x-14">
        <div>
          ${columnPhoto(photos.torta)}
          ${group(bakery)}
        </div>
        <div>
          ${columnPhoto(photos.ubeCake)}
          ${cakeGroup()}
          ${group(coldSweets)}
        </div>
        <div>
          ${columnPhoto(photos.coffee)}
          ${group(coffee)}
          ${group(drinks)}
        </div>
      </div>
    </div>
  </section>`
}
