import { unsplash, type Photo } from '../lib/photo.ts'

/**
 * Every photo is an Unsplash placeholder (free to use under the Unsplash License), served and cropped
 * by Unsplash's CDN, until we have Kape't Torta's own. TODO: shoot the case in the morning, the ube
 * cheese pandesal, tortas, ensaymada, the five cakes whole and sliced, a cup of barako, the high
 * table under the Edison bulbs, the grocery shelf and the storefront, then switch each entry to
 * `local(…)` (see src/lib/photo.ts).
 */
export const photos = {
  hero: unsplash('photo-1580822642566-5138e95313d3', {
    alt: 'Trays of fresh pandesal and a cup of coffee on a bakery counter',
    ratio: 3 / 2,
    widths: [960, 1440, 2200],
    focus: [0.5, 0.55],
    source: 'Jem Sahagun, https://unsplash.com/photos/s5QVs3yfvD0',
  }),
  ubePandesal: unsplash('photo-1599191179068-a4bb11ecd500', {
    alt: 'Purple ube pandesal rolls dusted with crumbs in a wire basket',
    ratio: 4 / 5,
    widths: [480, 800, 1100],
    focus: [0.45, 0.45],
    source: 'Miguel Lorenzo, https://unsplash.com/photos/C6q6Yf-ECmE',
  }),
  torta: unsplash('photo-1718395011458-d0225fad62d5', {
    alt: 'Small golden cakes baked in fluted paper cups',
    ratio: 4 / 3,
    focus: [0.55, 0.42],
    source: 'Maria Klichik, https://unsplash.com/photos/lwWGqMRvsiw',
  }),
  ensaymada: unsplash('photo-1688084436286-8f0ca14e9390', {
    alt: 'A cheese ensaymada on a plate, piled with grated cheese',
    ratio: 4 / 3,
    source: 'Christian Dala, https://unsplash.com/photos/onPKU1LvAhE',
  }),
  ubeCake: unsplash('photo-1640839954789-ca0049648b18', {
    alt: 'A slice of purple ube cake on a white plate',
    ratio: 4 / 3,
    // Crops out the coffee-chain logo printed on the paper bag under the plate.
    rect: [1150, 150, 2882, 2162],
    source: 'Thiccolas Doughbert Holeman, https://unsplash.com/photos/vzkgOMkRdm4',
  }),
  pandesal: unsplash('photo-1682988903390-73669d8ab16e', {
    alt: 'A plate of golden pandesal next to a cup of coffee',
    ratio: 4 / 3,
    focus: [0.5, 0.5],
    source: 'Joyce Romero, https://unsplash.com/photos/Eibqzp2HZJA',
  }),
  coffee: unsplash('photo-1753572736770-6abc29d123d8', {
    alt: 'A cup of black coffee steaming on a dark table',
    ratio: 4 / 5,
    widths: [480, 800, 1100],
    focus: [0.5, 0.5],
    source: 'Steve Harvey, https://unsplash.com/photos/dT83uJUpjyk',
  }),
  chocolate: unsplash('photo-1542990253-0d0f5be5f0ed', {
    alt: 'Hot chocolate being poured into a white mug',
    ratio: 1,
    widths: [400, 700, 1000],
    focus: [0.5, 0.6],
    source: 'Maddi Bazzocco, https://unsplash.com/photos/MjZq7A2RJxQ',
  }),
  morning: unsplash('photo-1568254183919-78a4f43a2877', {
    alt: 'A glass bakery case full of breads and pastries',
    ratio: 4 / 3,
    widths: [600, 1000, 1500],
    source: 'Yeh Xintong, https://unsplash.com/photos/go3DT3PpIw4',
  }),
  bulbs: unsplash('photo-1763852428464-b28da1887319', {
    alt: 'Edison bulbs hanging over the tables of a small café',
    ratio: 4 / 3,
    widths: [600, 1000, 1500],
    focus: [0.5, 0.35],
    source: 'Negin H, https://unsplash.com/photos/7NZzZkx9Eak',
  }),
  shelf: unsplash('photo-1762884601729-0eeeafbdfb8a', {
    alt: 'A pile of crisp banana chips',
    ratio: 4 / 3,
    widths: [600, 1000, 1500],
    source: 'Jorge Campos, https://unsplash.com/photos/El7BbLDQ2SY',
  }),
} satisfies Record<string, Photo>
