/**
 * The menu, from Kape't Torta's DoorDash and Grubhub menus (Nov 8, 2026). Where both list an item,
 * the DoorDash price is used; the matcha drinks, shakes, ensaymadas and a few cold drinks are only on
 * Grubhub. Delivery-app prices can run higher than at the counter.
 * TODO: get the in-store price list from the owners and replace these.
 */

export interface MenuItem {
  name: string
  /** A few words under the name, only where the name doesn't explain itself. */
  note?: string
  price: number
  /** A small label beside the name, e.g. "Best seller". */
  tag?: string
}

export interface MenuGroup {
  id: string
  title: string
  items: readonly MenuItem[]
  /** A line under the list. */
  footnote?: string
}

export interface Cake {
  id: string
  name: string
  /** For search engines (structured data); the page shows the cake drawing instead. */
  description: string
  slice: number
  junior?: number
  whole?: number
}

export const bakery: MenuGroup = {
  id: 'bakery',
  title: 'From the oven',
  items: [
    { name: 'Ube cheese pandesal', note: 'Purple yam roll around melted cheese', price: 1.75, tag: 'Best seller' },
    { name: 'Cheese drizzle pandesal', price: 1.75 },
    { name: 'Spanish bread', note: 'Rolled with a sweet, buttery filling', price: 1.75 },
    { name: 'Pan de coco', note: 'Soft bun with sweet coconut', price: 1.75 },
    { name: 'Cheese ensaymada', note: 'Buttery coil, sugared and heaped with cheese', price: 3.75 },
    { name: 'Ube ensaymada', price: 3.75 },
    { name: 'Torta Cebuana', note: 'The torta in our name, baked in a fluted cup. By the box of 12, too', price: 3.25 },
    { name: 'Pandesal', note: 'The classic breakfast roll, bag of 10', price: 5.95 },
  ],
  // TODO: pork asado buns (QNS, 2025) and ube flan (Google reviews, 2026) are in the case but on
  // no online menu. Confirm and price them, then move them into the list.
  footnote: 'Also in the case most days: pork asado buns and ube flan.',
}

/** Every cake comes by the slice; the whole cakes are what people reserve for birthdays and holidays. */
export const cakes: readonly Cake[] = [
  { id: 'ube', name: 'Ube', description: 'Purple yam (ube) cake, soft and creamy.', slice: 4.25, whole: 47.5 },
  {
    id: 'ube-custard',
    name: 'Ube custard',
    description: 'Ube cake under a layer of golden custard.',
    slice: 4.25,
    // TODO: whole ube custard cakes were on the 2022 pre-order list; get the price.
  },
  { id: 'mango', name: 'Mango', description: 'Mango cake.', slice: 4.25, whole: 47.5 },
  { id: 'yema', name: 'Yema', description: 'Chiffon cake under yema, a sweet egg-custard frosting.', slice: 4.25, whole: 47.5 },
  {
    id: 'chocolate-almond',
    name: 'Chocolate almond',
    description: 'Chocolate cake topped with sliced almonds. Also in a junior size.',
    slice: 4.25,
    junior: 37,
    whole: 47.5,
  },
]

export const coldSweets: MenuGroup = {
  id: 'halo-halo',
  title: 'Halo-halo & shakes',
  items: [
    { name: 'Special halo-halo', note: 'Ube, leche flan, red beans and coconut jelly over shaved ice', price: 8.5 },
    { name: 'Shakes', note: 'Ube, mango, avocado, buko (young coconut), melon or strawberry banana', price: 6.5 },
  ],
}

export const coffee: MenuGroup = {
  id: 'coffee',
  title: 'Coffee & tea',
  items: [
    { name: 'Kapeng barako', note: 'Strong Filipino Liberica coffee', price: 2.25 },
    { name: 'Iced coffee', price: 2.85 },
    { name: 'Hot tea', price: 2.25 },
    { name: 'Matcha green tea', price: 2.6 },
    { name: 'Matcha latte', price: 5.15 },
  ],
}

export const drinks: MenuGroup = {
  id: 'drinks',
  title: 'Cold drinks',
  items: [
    { name: 'Iced green tea', price: 4.8 },
    { name: 'Matcha iced tea', price: 4.9 },
    { name: 'Buko juice', note: 'Young coconut water', price: 4.25 },
    { name: 'Pineapple mango juice', price: 4.25 },
    { name: 'Soda or bottled water', price: 1.75 },
  ],
}

/** Every list, for the structured data in <head>. */
export const menuGroups: readonly MenuGroup[] = [bakery, coffee, drinks, coldSweets]

/** Looks up an item's price by name, so copy elsewhere can't drift from the menu. */
export function priceOf(name: string): number {
  const item = menuGroups.flatMap((group) => group.items).find((entry) => entry.name === name)
  if (!item) throw new Error(`"${name}" isn't on the menu in src/data/menu.ts.`)
  return item.price
}
