const place = "Kape't Torta, 83-13 Queens Blvd, Elmhurst, NY 11373"

const links = {
  directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place)}`,
  appleMaps: `https://maps.apple.com/?q=${encodeURIComponent("Kape't Torta")}&address=${encodeURIComponent('83-13 Queens Blvd, Elmhurst, NY 11373')}`,
  mapEmbed: `https://maps.google.com/maps?q=${encodeURIComponent(place)}&z=17&output=embed`,
  google: 'https://maps.google.com/?cid=14265124322183888017',
  instagram: 'https://www.instagram.com/kapetorta/',
  facebook: 'https://www.facebook.com/KapeTorta/',
  /**
   * "Online Ordering by DoorDash", the order page Google's "Order online" button opens first.
   * Pickup and delivery, about 9:30 AM to 5:40 PM. TODO: confirm with the owners that this is the
   * link they want (DoorDash Storefront orders skip the marketplace commission).
   */
  order: 'https://order.online/store/-1301505/',
  doordash: 'https://www.doordash.com/store/kape%E2%80%99t-torta-elmhurst-1301505/',
  seamless: 'https://www.seamless.com/menu/kapet-torta-83-13-queens-blvd-ny/2592705',
  grubhub: 'https://www.grubhub.com/restaurant/kapet-torta-83-13-queens-blvd-ny/2592705',
  caviar: 'https://www.trycaviar.com/store/kape%E2%80%99t-torta-elmhurst-1301505/',
} as const

/**
 * Business details shared by the sections, the <head> tags and the structured data.
 * Checked Nov 8, 2026 against Google Maps, Instagram, Facebook, DoorDash and Grubhub.
 */
export const site = {
  name: 'Kape’t Torta',
  /** Plain apostrophe, for places that shouldn't get curly quotes (URLs, structured data). */
  plainName: "Kape't Torta",
  // TODO: register before launch. kapettorta.com, kapetorta.com (the Instagram handle) and
  // kapettorta.nyc were all unregistered on Nov 8, 2026.
  url: 'https://www.kapettorta.com',
  description:
    'Filipino bakery and café on Queens Blvd in Elmhurst since 2019. Ube cheese pandesal, torta Cebuana, ensaymada, whole ube, mango and yema cakes, halo-halo and kapeng barako. Open 7 days.',
  phone: '(718) 899-0240',
  phoneHref: 'tel:+17188990240',
  // From the Facebook page. TODO: confirm it's the inbox they want on the site (the name suggests
  // it may belong to another of the owners' businesses).
  email: 'sweetsmarketny@gmail.com',
  address: {
    street: '83-13 Queens Blvd',
    locality: 'Elmhurst',
    region: 'NY',
    postalCode: '11373',
  },
  geo: { latitude: 40.7375757, longitude: -73.8795683 },
  transit: 'Two minutes’ walk from Grand Av–Newtown (M, R)',
  /** Opened in the late summer of 2019 (Culinary Backstreets, Oct 2019). */
  established: 2019,
  instagramHandle: '@kapetorta',
  owners: ['Nora Galleros', 'Jeanette Uy', 'Khaterine “Khaty” Gadingan'],
  links,
} as const
