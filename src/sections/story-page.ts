import { priceOf } from '../data/menu.ts'
import { photos } from '../data/photos.ts'
import { press, ratings, spotlight, video } from '../data/press.ts'
import { site } from '../data/site.ts'
import { haloHalo, haloHaloLayers } from '../lib/art.ts'
import { esc, html, money } from '../lib/html.ts'
import { icon } from '../lib/icons.ts'
import { img, type Photo } from '../lib/photo.ts'
import { container, external, weekSummary } from './ui.ts'

interface Chapter {
  id: string
  label: string
  title: string
  body: string
  photo: Photo
}

// From Culinary Backstreets (Dave Cook, Oct 2019) and I May Roam (May 2023).
// TODO: have Nora, Jeanette and Khaty read this, and update the day jobs if they've changed.
const chapters: readonly Chapter[] = [
  {
    id: 'friends',
    label: 'Gingoog, Mindanao',
    title: 'Three friends',
    photo: photos.bakeryCase,
    body: `<p>Nora Galleros, Jeanette Uy and Khaterine “Khaty” Gadingan all grew up in Gingoog (say
      <i>hee-NGO-og</i>), a farming city on the northern coast of Mindanao.</p>
      <p>Nora came to New York in 1990. When her high school friend Jeanette followed in 2004, her first stop was
      Nora’s place, and she brought tortas for the morning <i>kape</i>. Jeanette loves baking so much she loses
      track of time in the kitchen.</p>`,
  },
  {
    id: 'shop',
    label: '2018 – 2019',
    title: 'A nail salon on Queens Blvd',
    photo: photos.bulbs,
    body: `<p>In 2018 the three met over a meal at a mall in Elmhurst to talk about going into business together.
      They thought about selling online. Then Khaty spotted a for-rent sign on a former nail salon on Queens Blvd,
      with a bus stop out front and the subway two minutes away.</p>
      <p>The space had no ventilation for a full kitchen, but it had room for coffee and cake. Kape’t Torta opened
      in the late summer of 2019, and all three kept their day jobs: Nora runs an accounting firm, Jeanette teaches
      special education and Khaty is a physical therapist.</p>`,
  },
  {
    id: 'gingoog',
    label: 'From home',
    title: 'A taste of Gingoog',
    photo: photos.shelf,
    // TODO: tablea hot chocolate is from the 2019 article and on no online menu; confirm it's still served.
    body: `<p>The coffee is <i>kapeng barako</i>, the Philippines’ own Liberica: bold, with less of the sour bite of
      everyday beans. Take it the way they do back home, with a spoonful of buko (coconut) sugar from Gingoog,
      which sweetens the baking too.</p>
      <p>The tablea for the hot chocolate comes from Gingoog as well: cacao roasted, ground and pressed into tablets.
      Khaty says she can taste Gingoog’s from any other.</p>
      <p>Along one wall is a little Filipino grocery: banana chips from all over the islands, juices and sago in the
      fridge, the snacks you’d bring home as <i>pasalubong</i>. Gingoog’s farmers grow plenty but can’t sell enough
      at home, and Nora hopes a café in Queens can help build a market for them.</p>`,
  },
]

function storyHero(): string {
  return html`<section class="bg-ube-800 text-milk" style="--focus-ring: var(--color-cheese)" aria-labelledby="story-title">
    <div class="${container} grid items-center gap-9 pt-9 pb-12 sm:pt-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-16 lg:pt-14 lg:pb-16">
      <div>
        <p class="kicker text-cheese">Our story</p>
        <h1 id="story-title" class="h1 mt-4">From Gingoog to Queens Blvd</h1>
        <p class="mt-6 max-w-[33rem] text-[1.15rem] leading-relaxed text-ube-100 sm:text-[1.25rem]">
          Kape’t Torta is short for <i>kape at torta</i>: coffee and cake. Three friends from Gingoog, Mindanao,
          opened it in a former nail salon in Elmhurst in ${site.established}.
        </p>
      </div>
      ${img(photos.counter, { width: 960, sizes: '(min-width: 1280px) 34rem, (min-width: 1024px) 42vw, 92vw', priority: true, class: 'aspect-[16/10] w-full object-cover sm:aspect-[2/1] lg:aspect-[5/4]' })}
    </div>
  </section>
  <div class="scallops bg-milk" style="--scallop-color: var(--color-ube-800)" aria-hidden="true"></div>`
}

function chapter({ id, label, title, body, photo }: Chapter): string {
  return html`<section id="${id}" class="grid gap-x-12 gap-y-6 border-t-2 border-ink pt-7 lg:grid-cols-12" aria-labelledby="${id}-title">
    <header class="lg:col-span-4">
      <p class="kicker text-ube-600">${label}</p>
      <h2 id="${id}-title" class="h2 mt-2 lg:text-[2.75rem]">${title}</h2>
    </header>
    <div class="grid gap-7 sm:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] sm:gap-9 lg:col-span-8">
      <div class="prose-story text-[1.08rem]">${body}</div>
      ${img(photo, { width: 700, sizes: '(min-width: 1280px) 20rem, (min-width: 640px) 36vw, 92vw', class: 'aspect-[3/2] w-full object-cover sm:aspect-square' })}
    </div>
  </section>`
}

function pullQuote(): string {
  return html`<figure class="mx-auto max-w-[56rem] py-4 text-center sm:py-8">
    <blockquote>
      <p class="display text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.04] text-ube-800">“We didn’t want it to look like a <span class="highlight">typical Filipino restaurant.</span>”</p>
    </blockquote>
    <figcaption class="mx-auto mt-5 max-w-[34rem] text-ink/70">
      <strong class="text-ink">Nora Galleros</strong>, on the room: clean and a little industrial, with Edison bulbs
      over a long high table and outlets all along the wall.
    </figcaption>
  </figure>`
}

// Layers: I May Roam (2023) and their DoorDash listing. TODO: confirm with the owners.
function haloHaloPanel(): string {
  return html`<section class="grid items-center gap-8 bg-ube-50 p-6 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-10 sm:p-10 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_minmax(0,1fr)]" aria-labelledby="halo-title">
    ${haloHalo('mx-auto w-full max-w-[13rem] text-ube-800 sm:max-w-none')}
    <div>
      <h2 id="halo-title" class="h3 text-ube-800">Halo-halo, layer by layer</h2>
      <p class="mt-3 text-ink/75"><i>Halo-halo</i> means “mix-mix.” Dig all the way down, stir, and keep going. The special halo-halo is ${money(priceOf('Special halo-halo'))}.</p>
    </div>
    <ol class="halo-list text-[0.98rem] sm:col-span-2 lg:col-span-1">
      ${haloHaloLayers.map((layer, i) => html`<li><span class="halo-list-num">${i + 1}</span>${layer}</li>`)}
    </ol>
  </section>`
}

function pressSection(): string {
  return html`<section id="press" class="${container} py-16 sm:py-20" aria-labelledby="press-title">
    <h2 id="press-title" class="h2">In the press</h2>

    <figure class="mt-9 grid gap-6 bg-ube-800 p-7 text-milk sm:p-10 lg:grid-cols-12 lg:items-end lg:gap-10" style="--focus-ring: var(--color-cheese)">
      <div class="lg:col-span-8">
        <p class="kicker text-cheese">${spotlight.outlet}, ${spotlight.date}</p>
        <blockquote class="mt-3">
          <p class="display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05]">“${esc(spotlight.quote)}”</p>
        </blockquote>
      </div>
      <figcaption class="text-ube-100 lg:col-span-4">
        <p><strong class="text-milk">${spotlight.who}</strong>, ${spotlight.role}, in “${esc(spotlight.title)}”</p>
        <a class="link-arrow mt-4 text-milk" href="${spotlight.href}" ${external}>Read the guide ${icon('arrow', 'size-4')}</a>
      </figcaption>
    </figure>

    <ul class="mt-6 grid gap-6 sm:grid-cols-2">
      ${press.map(
        (item) => html`<li class="flex flex-col border-t-2 border-ink pt-5">
          <p class="text-[0.95rem]"><strong>${item.outlet}</strong> · ${item.date}</p>
          <blockquote class="mt-2"><p class="display text-[1.6rem] leading-tight text-ube-800">“${esc(item.quote)}”</p></blockquote>
          <p class="mt-2 text-ink/70">${item.author}${item.about ? `, on ${item.about}` : ''}</p>
          <a class="link-arrow mt-3 self-start text-[0.95rem]" href="${item.href}" ${external}>Read it ${icon('external', 'size-4')}</a>
        </li>`,
      )}
    </ul>

    <div class="mt-12 grid grid-cols-2 gap-px border-2 border-ink bg-ink sm:grid-cols-4">
      ${ratings.map(
        (rating) => html`<a class="bg-milk p-5 transition-colors hover:bg-ube-50" href="${rating.href}" ${external}>
          <span class="block font-display text-[2.2rem] leading-none text-ube-800">${rating.score}</span>
          <span class="mt-2 block font-bold">${rating.source}</span>
          <span class="block text-[0.95rem] text-ink/65">${rating.count}</span>
        </a>`,
      )}
    </div>

    <p class="mt-8">
      <a class="link-arrow" href="${video.href}" ${external}>${icon('play', 'size-4')} Watch a visit: ${video.channel}, ${video.date}</a>
    </p>
  </section>`
}

function comeBy(): string {
  const { street, locality } = site.address
  return html`<section class="border-t border-ink/10" aria-labelledby="come-by-title">
    <div class="${container} flex flex-wrap items-end justify-between gap-x-10 gap-y-6 py-14 sm:py-16">
      <div>
        <h2 id="come-by-title" class="h3 max-w-[30rem]">Come by for a torta and a cup of barako</h2>
        <p class="mt-3 text-ink/70">${street}, ${locality} · ${weekSummary().map((group) => `${group.days} ${group.hours}`).join(' · ')}</p>
      </div>
      <div class="flex flex-wrap gap-3">
        <a class="btn btn-ube" href="${site.links.directions}" ${external}>${icon('pin', 'size-4')} Directions</a>
        <a class="btn btn-line" href="/#menu">See the menu</a>
      </div>
    </div>
  </section>`
}

export function storyPage(): string {
  const [friends, shop, gingoog] = chapters
  return html`${storyHero()}
  <div class="${container} space-y-14 py-14 sm:space-y-16 sm:py-16 lg:space-y-20">
    ${chapter(friends)}
    ${chapter(shop)}
    ${pullQuote()}
    ${chapter(gingoog)}
    ${haloHaloPanel()}
  </div>
  ${pressSection()}
  ${comeBy()}`
}
