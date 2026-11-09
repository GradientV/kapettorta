/**
 * The menu, from Kape't Torta's DoorDash and Grubhub menus (Nov 8, 2026). Where both list an item,
 * the DoorDash price is used; the matcha drinks, shakes, ensaymadas and a few cold drinks are only on
 * Grubhub. Delivery-app prices can run higher than at the counter.
 * TODO: get the in-store price list from the owners and replace these.
 */

export interface MenuItem {
  name: string
  /** How to say it, shown small and italic: "OO-beh". */
  say?: string
  description?: string
  price?: number
  /** Shown after the price, e.g. "each" or "box of 12 available". */
  unit?: string
}

export interface MenuSection {
  id: string
  title: string
  /** The Filipino word, shown in script beside the title. */
  local?: string
  items: readonly MenuItem[]
  /** A line under the list. */
  note?: string
}

export interface Cake {
  id: string
  name: string
  description: string
  slice: number
  junior?: number
  whole?: number
}

/** Every cake comes by the slice; the whole cakes are what people pre-order for holidays. */
export const cakes: readonly Cake[] = [
  {
    id: 'ube',
    name: 'Ube',
    description: 'Purple yam cake, soft and creamy. The one people come back for.',
    slice: 4.25,
    whole: 47.5,
  },
  {
    id: 'ube-custard',
    name: 'Ube custard',
    description: 'Ube cake under a smooth layer of golden custard.',
    slice: 4.25,
    // TODO: whole ube custard cakes were on the 2022 pre-order list; get the price.
  },
  {
    id: 'mango',
    name: 'Mango',
    description: 'Bright mango cake, big enough to share, with a frosting that wins over people who skip frosting.',
    slice: 4.25,
    whole: 47.5,
  },
  {
    id: 'yema',
    name: 'Yema',
    description: 'Soft chiffon under yema, a sweet egg-custard frosting, the classic Filipino party cake.',
    slice: 4.25,
    whole: 47.5,
  },
  {
    id: 'chocolate-almond',
    name: 'Chocolate almond',
    description: 'Rich chocolate cake topped with sliced almonds. Also comes in a junior size.',
    slice: 4.25,
    junior: 37,
    whole: 47.5,
  },
]

export const menu: readonly MenuSection[] = [
  {
    id: 'bread',
    title: 'Bread',
    local: 'Tinapay',
    items: [
      {
        name: 'Ube cheese pandesal',
        say: 'OO-beh · pan-deh-SAHL',
        description: 'Purple yam dough around a pocket of melted cheese. Our best seller.',
        price: 1.75,
      },
      {
        name: 'Cheese drizzle pandesal',
        description: 'Filled with creamy cheese and finished with a cheese drizzle.',
        price: 1.75,
      },
      { name: 'Spanish bread', description: 'A rolled bun with a sweet, buttery filling.', price: 1.75 },
      { name: 'Pan de coco', description: 'A soft round bun with sweet coconut.', price: 1.75 },
      {
        name: 'Cheese ensaymada',
        say: 'en-sigh-MAH-dah',
        description: 'A soft, buttery coil, sugared and heaped with grated cheese.',
        price: 3.75,
      },
      { name: 'Ube ensaymada', description: 'The same coil, with ube.', price: 3.75 },
      { name: 'Pandesal', description: 'The classic breakfast roll, by the bag.', price: 5.95, unit: 'bag of 10' },
    ],
    // TODO: pork asado buns (QNS, 2025) and ube flan (Google reviews, 2026) are in the case but on
    // no online menu. Confirm and price them, then move them into the list.
    note: 'Also in the case most days: pork asado buns, ube flan and whatever else came out of the oven.',
  },
  {
    id: 'torta',
    title: 'Torta',
    items: [
      {
        name: 'Torta Cebuana',
        say: 'TOR-tah seh-BWAH-nah',
        description:
          'The cake in our name: a golden sponge baked in a fluted cup, buttery, with a hint of anise and coconut sugar from Gingoog.',
        price: 3.25,
        unit: 'each · box of 12 available',
      },
    ],
  },
  {
    id: 'hot',
    title: 'Hot drinks',
    local: 'Kape',
    items: [
      {
        name: 'Kapeng barako',
        say: 'KAH-peng bah-RAH-koh',
        description: 'Strong Filipino Liberica coffee, brewed fresh all day.',
        price: 2.25,
      },
      { name: 'Hot tea', price: 2.25 },
      { name: 'Matcha green tea', price: 2.6 },
      { name: 'Matcha latte', price: 5.15 },
    ],
  },
  {
    id: 'cold',
    title: 'Cold drinks',
    items: [
      { name: 'Iced coffee', price: 2.85 },
      { name: 'Iced green tea', price: 4.8 },
      { name: 'Matcha iced tea', price: 4.9 },
      { name: 'Buko juice', say: 'BOO-koh', description: 'Young coconut water.', price: 4.25 },
      { name: 'Pineapple mango juice', price: 4.25 },
      { name: 'Soda', description: 'Cola, diet cola or lemon-lime.', price: 1.75 },
      { name: 'Bottled water', price: 1.75 },
    ],
  },
  {
    id: 'shakes',
    title: 'Shakes & halo-halo',
    items: [
      {
        name: 'Special halo-halo',
        say: 'HAH-loh HAH-loh',
        description: 'Shaved ice and coconut milk over red beans and coconut jelly, with ube, leche flan, ube ice cream and corn flakes.',
        price: 8.5,
      },
      { name: 'Ube shake', price: 6.5 },
      { name: 'Mango shake', price: 6.5 },
      { name: 'Avocado shake', price: 6.5 },
      { name: 'Buko shake', description: 'Young coconut.', price: 6.5 },
      { name: 'Melon shake', price: 6.5 },
      { name: 'Strawberry banana shake', price: 6.5 },
    ],
  },
]
