import { priceOf } from '../data/menu.ts'
import { photos } from '../data/photos.ts'
import { site } from '../data/site.ts'
import { html, money } from '../lib/html.ts'
import { img } from '../lib/photo.ts'
import { container, external, openStatusStacked } from './ui.ts'

function infoBar(): string {
  return html`<section class="shop-details" aria-label="Bakery hours, address and phone">
    <div class="${container} details-grid">
      <div>
        <h2 class="detail-heading">Bakery hours</h2>
        ${openStatusStacked('detail-value', 'detail-note')}
        <a class="link detail-link" href="#visit">Weekly hours</a>
      </div>
      <div>
        <h2 class="detail-heading">Visit the bakery</h2>
        <p class="detail-value"><a href="${site.links.directions}" ${external}>${site.address.street}, ${site.address.locality}</a></p>
        <p class="detail-note">${site.transit}</p>
      </div>
      <div>
        <h2 class="detail-heading">Call the shop</h2>
        <p class="detail-value tabular-nums"><a href="${site.phoneHref}">${site.phone}</a></p>
        <p class="detail-note">Call to reserve a whole cake.</p>
      </div>
    </div>
  </section>`
}

export function hero(): string {
  const featured = 'Ube cheese pandesal'
  return html`<section aria-labelledby="hero-title">
    <div class="${container} bakery-hero">
      <div>
        <p class="hero-location">Elmhurst, Queens <span aria-hidden="true">·</span> Est. ${site.established}</p>
        <h1 id="hero-title" class="hero-title">Filipino breads<br />&amp; barako coffee.</h1>
        <p class="hero-intro">Stop in for ube cheese pandesal, buttery torta Cebuana, or a slice of ube cake. Whole cakes are available to order.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="${site.links.order}" ${external}>Order pickup or delivery</a>
          <a class="menu-link" href="#menu">View menu</a>
        </div>
      </div>
      <figure class="hero-feature">
        ${img(photos.ubePandesal, { width: 960, sizes: '(min-width: 1280px) 38rem, (min-width: 768px) 48vw, (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2.5rem)', priority: true, class: 'hero-photo' })}
        <figcaption><span>${featured}</span><span class="tabular-nums">${money(priceOf(featured))} each</span></figcaption>
      </figure>
    </div>
  </section>
  ${infoBar()}`
}
