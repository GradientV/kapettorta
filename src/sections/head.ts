import { hours } from '../data/hours.ts'
import { cakes, menuGroups } from '../data/menu.ts'
import { site } from '../data/site.ts'
import { DAY_NAMES, toIsoTime, WEEK_ORDER } from '../lib/hours.ts'
import { esc, html } from '../lib/html.ts'
import type { Page } from './ui.ts'

const image = `${site.url}/og-image.png`

const pages: Record<Page, { title: string; description: string; path: string }> = {
  home: {
    title: `${site.name} | Filipino Bakery & Café in Elmhurst, Queens`,
    description: site.description,
    path: '/',
  },
  story: {
    title: `Our Story | ${site.name}, Filipino Bakery in Elmhurst, Queens`,
    description:
      'Three friends from Gingoog, Mindanao, opened Kape’t Torta in a former nail salon on Queens Blvd in 2019. Their story, the coffee and cake from home, and what the press has said.',
    path: '/story',
  },
}

const offer = (price: number) => ({ '@type': 'Offer', price: price.toFixed(2), priceCurrency: 'USD' })

/** schema.org data, so search engines show the official hours, address, phone number and menu. */
function structuredData(): string {
  const cakeSection = {
    '@type': 'MenuSection',
    name: 'Cakes',
    hasMenuItem: cakes.map((cake) => ({
      '@type': 'MenuItem',
      name: `${cake.name} cake`,
      description: cake.description,
      offers: [
        { ...offer(cake.slice), name: 'Slice' },
        ...(cake.junior ? [{ ...offer(cake.junior), name: 'Junior' }] : []),
        ...(cake.whole ? [{ ...offer(cake.whole), name: 'Whole' }] : []),
      ],
    })),
  }
  const data = {
    '@context': 'https://schema.org',
    '@type': ['Bakery', 'CafeOrCoffeeShop'],
    name: site.plainName,
    url: `${site.url}/`,
    image,
    description: site.description,
    servesCuisine: ['Filipino', 'Bakery', 'Coffee'],
    priceRange: '$',
    telephone: site.phoneHref.replace('tel:', ''),
    email: site.email,
    foundingDate: String(site.established),
    founder: site.owners.map((name) => ({ '@type': 'Person', name: name.replace(/ “Khaty”/, '') })),
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: 'US',
    },
    geo: { '@type': 'GeoCoordinates', ...site.geo },
    hasMap: site.links.google,
    acceptsReservations: false,
    openingHoursSpecification: WEEK_ORDER.flatMap((day) => {
      const open = hours[day]
      return open
        ? [{ '@type': 'OpeningHoursSpecification', dayOfWeek: `https://schema.org/${DAY_NAMES[day]}`, opens: toIsoTime(open.opens), closes: toIsoTime(open.closes) }]
        : []
    }),
    hasMenu: {
      '@type': 'Menu',
      url: `${site.url}/#menu`,
      hasMenuSection: [
        ...menuGroups.map((group) => ({
          '@type': 'MenuSection',
          name: group.title,
          hasMenuItem: group.items.map((item) => ({
            '@type': 'MenuItem',
            name: item.name,
            ...(item.note ? { description: item.note } : {}),
            offers: offer(item.price),
          })),
        })),
        cakeSection,
      ],
    },
    potentialAction: { '@type': 'OrderAction', target: site.links.order },
    sameAs: [site.links.instagram, site.links.facebook],
  }
  // Escape "<" so nothing in the data can close the <script> tag early.
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export function head(page: Page): string {
  const { title, description, path } = pages[page]
  const url = `${site.url}${path}`
  return html`<title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <link rel="canonical" href="${url}" />
    <meta name="theme-color" content="#3f2459" />
    <meta name="format-detection" content="telephone=no" />
    <meta property="og:type" content="${page === 'home' ? 'restaurant' : 'article'}" />
    <meta property="og:site_name" content="${esc(site.name)}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Kape’t Torta, Filipino bakery and café at 83-13 Queens Blvd, Elmhurst, Queens" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="preconnect" href="https://images.unsplash.com" crossorigin />
    ${page === 'home' && html`<script type="application/ld+json">${structuredData()}</script>`}`
}
