import { unsplash, type Photo } from '../lib/photo.ts'

/**
 * Every photo is an Unsplash placeholder (free to use under the Unsplash License), served and cropped
 * by Unsplash's CDN, until we have Kape't Torta's own. TODO: shoot the ube cheese pandesal, a tray of
 * tortas, a slice of ube cake, a cup of barako, the bakery case, the high table under the Edison
 * bulbs and the grocery shelf, then switch each entry to `local(…)` (see src/lib/photo.ts).
 */
export const photos = {
  /** Home page, first screen. */
  ubePandesal: unsplash('photo-1599191179068-a4bb11ecd500', {
    alt: 'Purple ube pandesal rolls dusted with crumbs in a wire basket',
    ratio: 5 / 4,
    widths: [640, 960, 1400],
    focus: [0.42, 0.5],
    source: 'Miguel Lorenzo, https://unsplash.com/photos/C6q6Yf-ECmE',
  }),
  /** Above "From the oven" on the menu. */
  torta: unsplash('photo-1718395011458-d0225fad62d5', {
    alt: 'Small golden cakes baked in fluted paper cups',
    ratio: 3 / 2,
    focus: [0.55, 0.42],
    source: 'Maria Klichik, https://unsplash.com/photos/lwWGqMRvsiw',
  }),
  /** Above the cakes on the menu. */
  ubeCake: unsplash('photo-1640839954789-ca0049648b18', {
    alt: 'A slice of purple ube cake on a white plate',
    ratio: 3 / 2,
    // Crops out the coffee-chain logo printed on the paper bag under the plate.
    rect: [1150, 150, 2882, 2162],
    source: 'Thiccolas Doughbert Holeman, https://unsplash.com/photos/vzkgOMkRdm4',
  }),
  /** Above the drinks on the menu. */
  coffee: unsplash('photo-1753572736770-6abc29d123d8', {
    alt: 'A cup of black coffee steaming on a dark table',
    ratio: 3 / 2,
    focus: [0.5, 0.5],
    source: 'Steve Harvey, https://unsplash.com/photos/dT83uJUpjyk',
  }),
  /** The story teaser on the home page, and the room on the story page. */
  bulbs: unsplash('photo-1763852428464-b28da1887319', {
    alt: 'Edison bulbs hanging over the tables of a small café',
    ratio: 3 / 2,
    widths: [600, 1000, 1500],
    focus: [0.5, 0.35],
    source: 'Negin H, https://unsplash.com/photos/7NZzZkx9Eak',
  }),
  /** Story page, first screen. */
  counter: unsplash('photo-1580822642566-5138e95313d3', {
    alt: 'Trays of fresh pandesal and a cup of coffee on a bakery counter',
    ratio: 5 / 4,
    widths: [640, 960, 1400],
    focus: [0.5, 0.55],
    source: 'Jem Sahagun, https://unsplash.com/photos/s5QVs3yfvD0',
  }),
  /** Story page, "Three friends". */
  bakeryCase: unsplash('photo-1568254183919-78a4f43a2877', {
    alt: 'A glass bakery case full of breads and pastries',
    ratio: 3 / 2,
    widths: [600, 1000, 1500],
    source: 'Yeh Xintong, https://unsplash.com/photos/go3DT3PpIw4',
  }),
  /** Story page, "A taste of Gingoog". */
  shelf: unsplash('photo-1762884601729-0eeeafbdfb8a', {
    alt: 'A pile of crisp banana chips',
    ratio: 3 / 2,
    widths: [600, 1000, 1500],
    source: 'Jorge Campos, https://unsplash.com/photos/El7BbLDQ2SY',
  }),
} satisfies Record<string, Photo>
