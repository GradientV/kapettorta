import { press, ratings, spotlight, video } from '../data/press.ts'
import { esc, html } from '../lib/html.ts'
import { icon } from '../lib/icons.ts'
import { container, external, eyebrow } from './ui.ts'

export function pressSection(): string {
  return html`<section id="press" class="bg-cream py-20 sm:py-24 lg:py-32" aria-labelledby="press-title">
    <div class="${container}">
      <h2 id="press-title" class="sr-only">What people say</h2>

      <figure class="mx-auto max-w-5xl text-center" data-reveal>
        ${eyebrow('Good company', 'justify-center text-torta')}
        <blockquote class="mt-6 font-display text-[3.4rem] leading-[0.9] font-extrabold tracking-[0.005em] text-balance uppercase sm:text-[5rem] lg:text-[6.6rem]">
          “${esc(spotlight.quote.replace(/\.$/, ''))}.”
        </blockquote>
        <figcaption class="mx-auto mt-8 max-w-2xl text-[1.1rem] text-roast/75">
          <span class="font-slab text-[1.3rem] font-bold text-roast">${esc(spotlight.who)}</span>, ${esc(spotlight.role)},
          on Kape’t Torta in The Infatuation’s
          <a class="link-inline" href="${spotlight.href}" ${external}>${esc(spotlight.title)}</a> (${esc(spotlight.date)})
        </figcaption>
      </figure>

      <ul class="mt-16 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
        ${press.map(
          (item) => html`<li class="frame frame-paper flex flex-col p-6 sm:p-7" data-reveal>
            <p class="eyebrow text-torta">${esc(item.outlet)}</p>
            <blockquote class="mt-4 font-slab text-[1.45rem] leading-snug font-semibold">“${esc(item.quote)}”</blockquote>
            ${item.about && html`<p class="mt-2 text-[0.95rem] text-roast/60">On ${esc(item.about)}</p>`}
            <p class="mt-auto pt-6 text-[0.95rem] text-roast/65">${esc(item.author)} · ${esc(item.date)}</p>
            <a class="link-caps mt-3 self-start" href="${item.href}" ${external}>Read it ${icon('external', 'size-3.5')}</a>
          </li>`,
        )}
      </ul>

      <div class="mt-14 flex flex-col gap-6 border-t-2 border-roast pt-8 lg:flex-row lg:items-center lg:justify-between">
        <ul class="grid grid-cols-2 gap-x-10 gap-y-5 sm:flex sm:flex-wrap">
          ${ratings.map(
            (rating) => html`<li>
              <a class="group flex items-baseline gap-2.5" href="${rating.href}" ${external}>
                <span class="font-display text-[2.4rem] leading-none font-extrabold">${esc(rating.score)}</span>
                <span class="text-[0.95rem] leading-tight text-roast/70"><span class="font-semibold text-roast group-hover:underline">${esc(rating.source)}</span><br />${esc(rating.count)}</span>
              </a>
            </li>`,
          )}
        </ul>
        <a class="link-caps self-start lg:self-auto" href="${video.href}" ${external}>${icon('play', 'size-4')} Watch a visit: ${esc(video.channel)}, ${esc(video.date)}</a>
      </div>
    </div>
  </section>`
}
