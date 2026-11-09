import { cakes, menu, type MenuItem, type MenuSection } from '../data/menu.ts'
import { site } from '../data/site.ts'
import { esc, html, money } from '../lib/html.ts'
import { icon } from '../lib/icons.ts'
import { container, external, eyebrow } from './ui.ts'

function menuItem(item: MenuItem): string {
  return html`<li class="menu-item">
    <div class="flex items-baseline justify-between gap-5">
      <h4 class="menu-name">${esc(item.name)}</h4>
      ${item.price !== undefined && html`<p class="menu-price">${money(item.price)}</p>`}
    </div>
    ${item.say && html`<p class="say mt-0.5">${esc(item.say)}</p>`}
    ${item.description && html`<p class="menu-desc">${esc(item.description)}</p>`}
    ${item.unit && html`<p class="menu-unit">${esc(item.unit)}</p>`}
  </li>`
}

function block(section: MenuSection): string {
  return html`<section id="menu-${section.id}" class="menu-block" aria-labelledby="menu-${section.id}-title">
    <h3 id="menu-${section.id}-title" class="menu-title">${esc(section.title)}${section.local && html` <span class="menu-local">${esc(section.local)}</span>`}</h3>
    <ul>${section.items.map(menuItem)}</ul>
    ${section.note && html`<p class="menu-note">${esc(section.note)}</p>`}
  </section>`
}

function cakeBlock(): string {
  const junior = cakes.find((cake) => cake.junior)
  return html`<section id="menu-cakes" class="menu-block" aria-labelledby="menu-cakes-title">
    <h3 id="menu-cakes-title" class="menu-title">Cakes</h3>
    <table class="menu-table">
      <thead><tr><th scope="col">Flavor</th><th scope="col">Slice</th><th scope="col">Whole</th></tr></thead>
      <tbody>
        ${cakes.map(
          (cake) => html`<tr>
            <th scope="row">${esc(cake.name)}</th>
            <td>${money(cake.slice)}</td>
            <td>${cake.whole ? money(cake.whole) : html`<a class="link-inline" href="${site.phoneHref}">Call</a>`}</td>
          </tr>`,
        )}
      </tbody>
    </table>
    ${junior?.junior && html`<p class="menu-note">${esc(junior.name)} also comes in a junior size, ${money(junior.junior)}. Whole cakes: <a class="link-inline" href="#cakes">pre-order</a>.</p>`}
  </section>`
}

export function menuSection(): string {
  const byId = (id: string) => {
    const section = menu.find((entry) => entry.id === id)
    if (!section) throw new Error(`The menu layout expects a "${id}" section in src/data/menu.ts.`)
    return section
  }
  const nav = [...menu.slice(0, 2), { id: 'cakes', title: 'Cakes' }, ...menu.slice(2)]

  return html`<section id="menu" class="bg-paper py-20 sm:py-24 lg:py-32" aria-labelledby="menu-title">
    <div class="${container}">
      <div class="flex flex-col gap-8 border-b-2 border-roast pb-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          ${eyebrow('Baked on the premises', 'text-torta')}
          <h2 id="menu-title" class="display-xl mt-4">The menu</h2>
        </div>
        <div class="max-w-md">
          <p class="text-roast/80">The case changes through the day, and the best sellers go early. For big orders, call ahead.</p>
          <div class="mt-5 flex flex-wrap gap-3">
            <a class="btn btn-roast" href="${site.links.order}" ${external}>${icon('bag', 'size-4')} Order online</a>
            <a class="btn btn-line" href="${site.phoneHref}">${icon('phone', 'size-4')} ${site.phone}</a>
          </div>
        </div>
      </div>

      <nav aria-label="Menu sections" class="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <ul class="flex gap-7 py-5 whitespace-nowrap">
          ${nav.map((section) => html`<li><a class="link-caps" href="#menu-${section.id}">${esc(section.title)}</a></li>`)}
        </ul>
      </nav>

      <div class="grid gap-x-14 gap-y-4 border-t border-roast/15 pt-6 md:grid-cols-2 lg:grid-cols-3">
        <div>${block(byId('bread'))}${block(byId('torta'))}</div>
        <div>${cakeBlock()}${block(byId('shakes'))}</div>
        <div>${block(byId('hot'))}${block(byId('cold'))}</div>
      </div>

      <p class="mt-12 border-t border-roast/15 pt-6 text-[0.95rem] text-roast/65">
        Prices and availability can change, and prices on the delivery apps can differ from the counter.
      </p>
    </div>
  </section>`
}
