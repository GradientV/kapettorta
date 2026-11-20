import { spotlight } from '../data/press.ts'
import { esc, html } from '../lib/html.ts'
import { container, external } from './ui.ts'

/** Jordan Clarkson's words about the shop, from The Infatuation's guide to his favorite NYC spots. */
export function spotlightSection(): string {
  return html`<section class="bg-paper py-12 sm:py-16" aria-labelledby="spotlight-title">
    <figure class="${container} grid gap-7 lg:grid-cols-12 lg:items-end lg:gap-12">
      <div class="lg:col-span-8">
        <h2 id="spotlight-title" class="kicker text-accent">
          ${spotlight.outlet} · ${spotlight.date}
        </h2>
        <blockquote class="mt-4">
          <p class="display text-[clamp(2.2rem,4.8vw,3.5rem)] leading-[1.08]">
            “${esc(spotlight.quote)}”
          </p>
        </blockquote>
      </div>
      <figcaption class="lg:col-span-4 lg:pb-2">
        <p class="text-[1.15rem] leading-snug"><strong>${spotlight.who}</strong>, ${spotlight.role}</p>
        <p class="mt-2 text-ink/75">“${esc(spotlight.order)}”</p>
        <a class="link mt-4 inline-block font-semibold text-accent" href="${spotlight.href}" ${external}>Read the guide</a>
      </figcaption>
    </figure>
  </section>`
}
