import { photos } from '../data/photos.ts'
import { html } from '../lib/html.ts'
import { img, type Photo } from '../lib/photo.ts'
import { container, eyebrow } from './ui.ts'

interface Panel {
  photo: Photo
  label: string
  title: string
  body: string
  /** Photo on the right instead of the left, for the alternating rhythm. */
  flip?: boolean
}

// From Culinary Backstreets (Dave Cook, Oct 2019) and I May Roam (May 2023).
// TODO: have Nora, Jeanette and Khaty read this, and update the day jobs if they've changed.
const panels: Panel[] = [
  {
    photo: photos.morning,
    label: 'Gingoog, Mindanao',
    title: 'Three friends from Gingoog',
    body: `<p>Nora Galleros, Jeanette Uy and Khaterine “Khaty” Gadingan all grew up in Gingoog (say
      <i>hee-NGO-og</i>), a farming city on the northern coast of Mindanao, and all three still think fondly of its food.</p>
      <p>Nora came to New York in 1990. When her high school friend Jeanette followed in 2004, her first stop
      was Nora’s place, and she didn’t come empty-handed: she brought tortas for the morning kape. Jeanette
      loves baking so much she loses track of time in the kitchen.</p>`,
  },
  {
    photo: photos.bulbs,
    label: '2018 – 2019',
    title: 'A nail salon on Queens Blvd',
    flip: true,
    body: `<p>In 2018 the three sat down for a meal at a mall in Elmhurst to talk about going into business
      together. They thought about selling online. Then Khaty spotted a for-rent sign on a former nail salon on
      Queens Blvd: a bus stop out front, the subway two minutes away.</p>
      <p>There wasn’t room for a full kitchen, but there was room for coffee and cake. Kape’t Torta opened in the
      late summer of 2019, and the three kept their day jobs: Nora runs an accounting firm, Jeanette teaches
      special education and Khaty is a physical therapist.</p>`,
  },
  {
    photo: photos.shelf,
    label: 'Pasalubong',
    title: 'A shelf of home',
    body: `<p>Along one wall is a little Filipino grocery: banana chips from all over the islands, a fridge of
      juices and sago, the snacks you’d bring home as <i>pasalubong</i>.</p>
      <p>Some of what we bake with comes from Gingoog on purpose, like the tablea and the buko (coconut) sugar.
      Its farmers grow plenty but can’t sell enough at home, and Nora hopes a café in Queens can help, in a
      small way, by building a market for them here.</p>`,
  },
]

function panel({ photo, label, title, body, flip }: Panel): string {
  return html`<div class="grid items-center gap-8 lg:grid-cols-2 lg:gap-16" data-reveal>
    <div class="${flip ? 'lg:order-2' : ''}">
      ${img(photo, { width: 1000, sizes: '(min-width: 1024px) 44vw, 92vw', class: 'chamfer aspect-[4/3] w-full object-cover' })}
    </div>
    <div class="max-w-[34rem]">
      ${eyebrow(label, 'text-torta')}
      <h3 class="display-lg mt-4">${title}</h3>
      <div class="prose-story mt-6">${body}</div>
    </div>
  </div>`
}

export function story(): string {
  const [first, second, third] = panels
  return html`<section id="story" class="bg-paper py-20 sm:py-24 lg:py-32" aria-labelledby="story-title">
    <div class="${container}">
      <div class="max-w-3xl">
        ${eyebrow('Our story', 'text-torta')}
        <h2 id="story-title" class="display-xl mt-4">From Gingoog to Queens Blvd</h2>
      </div>

      <div class="mt-14 space-y-20 lg:mt-20 lg:space-y-28">
        ${panel(first)}
        ${panel(second)}

        <figure class="mx-auto max-w-4xl border-y-2 border-roast py-10 text-center sm:py-14" data-reveal>
          <blockquote class="font-slab text-[1.9rem] leading-tight font-semibold text-balance sm:text-[2.6rem]">
            “We didn’t want it to look like a typical Filipino restaurant.”
          </blockquote>
          <figcaption class="mt-5 text-roast/70">
            <span class="eyebrow inline text-roast">Nora Galleros</span>, on the clean, slightly industrial room
            they designed with their architect: Edison bulbs over a long high table, and outlets all along the wall.
          </figcaption>
        </figure>

        ${panel(third)}
      </div>
    </div>
  </section>`
}
