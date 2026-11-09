import { cakes, menu, type MenuItem } from '../data/menu.ts'
import { photos } from '../data/photos.ts'
import { esc, html, money } from '../lib/html.ts'
import { img, type Photo } from '../lib/photo.ts'
import { container, eyebrow } from './ui.ts'

/** Prices come from the menu, so a change there shows up here too. A renamed dish fails the build on purpose. */
function item(name: string): MenuItem {
  const found = menu.flatMap((section) => section.items).find((entry) => entry.name === name)
  if (!found) throw new Error(`"From the case" lists "${name}", which isn't in src/data/menu.ts.`)
  return found
}

interface Pick {
  photo: Photo
  name: string
  say?: string
  text: string
  price: string
}

const torta = item('Torta Cebuana')
const ensaymada = item('Cheese ensaymada')
const pandesalBag = item('Pandesal')
const ube = cakes.find((cake) => cake.id === 'ube')

const picks: Pick[] = [
  {
    photo: photos.torta,
    name: 'Torta Cebuana',
    say: torta.say,
    text: 'The cake in our name. A golden sponge baked in a fluted cup, buttery, with a hint of anise. Made for dunking in coffee.',
    price: `${money(torta.price ?? 0)} each · box of 12`,
  },
  {
    photo: photos.ensaymada,
    name: 'Cheese ensaymada',
    say: ensaymada.say,
    text: 'A soft, buttery coil, sugared and heaped with grated cheese. Sweet and salty all the way through.',
    price: money(ensaymada.price ?? 0),
  },
  {
    photo: photos.ubeCake,
    name: 'Ube cake',
    say: 'OO-beh',
    text: 'Purple yam cake, soft and creamy, and the cake our regulars mention most. By the slice, or whole for the table.',
    price: `${money(ube?.slice ?? 0)} a slice · ${money(ube?.whole ?? 0)} whole`,
  },
  {
    photo: photos.pandesal,
    name: 'Pandesal by the bag',
    say: 'pan-deh-SAHL',
    text: 'The classic Filipino breakfast roll, soft and a little sweet. Ten to a bag, for the house or for Tita.',
    price: `${money(pandesalBag.price ?? 0)} for 10`,
  },
]

function card(pick: Pick): string {
  return html`<article class="frame frame-paper flex flex-col p-3 sm:p-3.5" data-reveal>
    ${img(pick.photo, { width: 800, sizes: '(min-width: 1280px) 26vw, (min-width: 640px) 45vw, 90vw', class: 'chamfer-sm aspect-[4/3] w-full object-cover' })}
    <div class="flex flex-1 flex-col px-3 pt-5 pb-4 sm:px-4">
      <h3 class="font-slab text-[1.6rem] leading-tight font-bold">${esc(pick.name)}</h3>
      ${pick.say && html`<p class="say mt-1">${esc(pick.say)}</p>`}
      <p class="mt-3 text-roast/80">${esc(pick.text)}</p>
      <p class="price-line mt-auto pt-5">${esc(pick.price)}</p>
    </div>
  </article>`
}

export function caseSection(): string {
  const ubeCheese = item('Ube cheese pandesal')
  return html`<section id="case" class="bg-cream py-20 sm:py-24 lg:py-32" aria-labelledby="case-title">
    <div class="${container}">
      <div class="grid items-end gap-6 lg:grid-cols-12 lg:gap-10">
        <div class="lg:col-span-7">
          ${eyebrow('Baked right here, every day', 'text-torta')}
          <h2 id="case-title" class="display-xl mt-4">From the case</h2>
        </div>
        <p class="max-w-xl text-[1.15rem] text-roast/80 lg:col-span-5 lg:pb-3">
          Every bread and cake in the case is baked on the premises. Here’s where to start; the
          <a class="link-inline" href="#menu">full menu</a> has the rest.
        </p>
      </div>

      <div class="mt-12 grid gap-6 lg:mt-16 xl:grid-cols-12">
        <article class="frame frame-roast relative flex flex-col p-3.5 text-cream sm:grid sm:grid-cols-2 sm:gap-2 xl:col-span-5 xl:flex" style="--focus-ring: var(--color-yema)" data-reveal>
          <div class="relative">
            ${img(photos.ubePandesal, { width: 800, sizes: '(min-width: 1280px) 36vw, (min-width: 640px) 45vw, 90vw', class: 'chamfer-sm aspect-[4/5] w-full object-cover sm:aspect-square xl:aspect-[4/5]' })}
            <p class="stamp absolute top-5 left-5">Best seller</p>
          </div>
          <div class="flex flex-1 flex-col px-3 pt-6 pb-5 sm:justify-center sm:px-5 xl:justify-start xl:pt-6">
            <h3 class="font-slab text-[2.1rem] leading-[1.05] font-bold">Ube cheese pandesal</h3>
            <p class="say mt-1.5 text-cream/60">${esc(ubeCheese.say ?? '')}</p>
            <p class="mt-4 text-[1.08rem] text-cream/85">
              Purple yam dough baked around a pocket of melted cheese. It usually sells out by late
              afternoon, so come early or call ahead.
            </p>
            <figure class="mt-6 border-l-2 border-yema pl-4">
              <blockquote class="font-slab text-[1.15rem] italic">“I love the ube pandesal with cheese.”</blockquote>
              <figcaption class="mt-1 text-[0.9rem] text-cream/60">Jordan Clarkson, to The Infatuation</figcaption>
            </figure>
            <p class="price-line mt-auto pt-6 text-yema sm:mt-0 xl:mt-auto">${money(ubeCheese.price ?? 0)} each</p>
          </div>
        </article>

        <div class="grid gap-6 sm:grid-cols-2 xl:col-span-7">
          ${picks.map(card)}
        </div>
      </div>
    </div>
  </section>`
}
