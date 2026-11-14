import { spotlight } from '../data/press.ts'
import { esc, html } from '../lib/html.ts'
import { icon } from '../lib/icons.ts'
import { container, external } from './ui.ts'

/** Jordan Clarkson's words about the shop, from The Infatuation's guide to his favorite NYC spots. */
export function spotlightSection(): string {
  const [before] = spotlight.quote.split(spotlight.highlight)
  return html`<section class="bg-ube-50 py-14 sm:py-16 lg:py-20" aria-labelledby="spotlight-title">
    <figure class="${container} grid gap-7 lg:grid-cols-12 lg:items-end lg:gap-12">
      <div class="lg:col-span-8">
        <h2 id="spotlight-title" class="kicker text-ube-600">
          In The Infatuation’s “${esc(spotlight.title)},” ${spotlight.date}
        </h2>
        <blockquote class="mt-4">
          <p class="display text-[clamp(2.2rem,4.8vw,4rem)] leading-[1.02] text-ube-800">
            “${esc(before)}<span class="highlight">${esc(spotlight.highlight)}</span>”
          </p>
        </blockquote>
      </div>
      <figcaption class="lg:col-span-4 lg:pb-2">
        <p class="text-[1.15rem] leading-snug"><strong>${spotlight.who}</strong>, ${spotlight.role}</p>
        <p class="mt-2 text-ink/75">“${esc(spotlight.order)}”</p>
        <a class="link-arrow mt-4 text-ube-800" href="${spotlight.href}" ${external}>Read the guide ${icon('arrow', 'size-4')}</a>
      </figcaption>
    </figure>
  </section>`
}
