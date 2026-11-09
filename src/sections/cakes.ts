import { cakes } from '../data/menu.ts'
import { site } from '../data/site.ts'
import { cakeTop } from '../lib/art.ts'
import { esc, html, money } from '../lib/html.ts'
import { icon } from '../lib/icons.ts'
import { container, external, eyebrow } from './ui.ts'

function sizes(): string {
  const whole = cakes.find((cake) => cake.whole)?.whole
  const junior = cakes.find((cake) => cake.junior)
  const slice = cakes[0].slice
  const cell = 'flex flex-col gap-1 px-5 py-5'
  return html`<dl class="grid border border-cream/30 sm:grid-cols-3">
    <div class="${cell}"><dt class="eyebrow text-cream/65">By the slice</dt><dd class="price-line text-[2rem]">${money(slice)}</dd><dd class="text-[0.95rem] text-cream/65">Every flavor</dd></div>
    ${junior?.junior && html`<div class="${cell} border-t border-cream/30 sm:border-t-0 sm:border-l"><dt class="eyebrow text-cream/65">Junior</dt><dd class="price-line text-[2rem]">${money(junior.junior)}</dd><dd class="text-[0.95rem] text-cream/65">${esc(junior.name)}</dd></div>`}
    ${whole && html`<div class="${cell} border-t border-cream/30 sm:border-t-0 sm:border-l"><dt class="eyebrow text-cream/65">Whole</dt><dd class="price-line text-[2rem] text-yema">${money(whole)}</dd><dd class="text-[0.95rem] text-cream/65">Pre-order by phone</dd></div>`}
  </dl>`
}

// Whole-cake pre-orders for Thanksgiving: Instagram (Nov 2022) and Facebook (Nov 2024).
// TODO: ask how much notice they need, whether they write dedications, and the ube custard whole price.
export function cakesSection(): string {
  return html`<section id="cakes" class="edge-y relative bg-ube py-24 text-cream sm:py-28 lg:py-36" style="--focus-ring: var(--color-yema); --tooth: 1.25rem" aria-labelledby="cakes-title">
    <div class="${container}">
      <div class="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-5">
          ${eyebrow('Whole cakes · pre-orders', 'text-yema')}
          <h2 id="cakes-title" class="display-xl mt-4">Cake for the whole table</h2>
          <div class="prose-dark mt-8">
            <p>
              Every cake we sell by the slice also comes whole, baked here and boxed to go. Call to reserve one
              for a birthday or a Sunday visit to Tita’s, and get your order in early for Thanksgiving and Christmas.
            </p>
            <p>
              Feeding a crowd? Tortas come by the box of 12 and pandesal by the bag of 10, and both travel well
              as <i>pasalubong</i>.
            </p>
          </div>
          <div class="mt-9 flex flex-wrap gap-3">
            <a class="btn btn-yema" href="${site.phoneHref}">${icon('phone', 'size-4')} Call to reserve</a>
            <a class="btn btn-ghost" href="${site.links.order}" ${external}>Order a cake online</a>
          </div>
          <p class="mt-4 text-[0.95rem] text-cream/65">${site.phone} · whole cakes are on our online menu too</p>
        </div>

        <div class="lg:col-span-7">
          <ul class="grid gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 xl:grid-cols-3">
            ${cakes.map(
              (cake) => html`<li class="grid grid-cols-[5.75rem_1fr] items-center gap-x-5 sm:flex sm:flex-col sm:items-start" data-reveal>
                ${cakeTop(cake.id, 'size-[5.75rem] text-cream sm:size-32')}
                <div>
                  <h3 class="font-slab text-[1.45rem] leading-tight font-bold sm:mt-5 sm:text-[1.55rem]">${esc(cake.name)}</h3>
                  <p class="mt-1.5 text-cream/75 sm:mt-2">${esc(cake.description)}</p>
                </div>
              </li>`,
            )}
          </ul>
          <div class="mt-12">${sizes()}</div>
        </div>
      </div>
    </div>
  </section>`
}
