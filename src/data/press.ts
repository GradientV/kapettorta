/**
 * Press and ratings, checked Nov 8, 2026. Quotes are kept short and always credited.
 * TODO: get the owners' OK to feature these, and refresh the ratings now and then.
 */

/**
 * Both lines are his words in The Infatuation's guide (Apr 16, 2026), which calls him "the Knicks
 * guard." Shown as press, with a link to the guide: not as an endorsement, and without his photo.
 */
export const spotlight = {
  quote: 'It’s like being invited to an aunt’s house.',
  order: 'I love the ube pandesal with cheese, but really, you can’t go wrong.',
  who: 'Jordan Clarkson',
  role: 'New York Knicks guard',
  outlet: 'The Infatuation',
  title: 'Jordan Clarkson’s Favorite NYC Spots',
  date: 'April 2026',
  href: 'https://www.theinfatuation.com/new-york/guides/jordan-clarkson-nyc-restaurant-guide',
} as const

export interface PressItem {
  outlet: string
  quote: string
  /** What the quote is about, if it isn't the whole shop. */
  about?: string
  author: string
  date: string
  href: string
}

export const press: readonly PressItem[] = [
  {
    outlet: 'The Infatuation',
    quote: 'Our favorite Filipino bakery in Elmhurst.',
    author: 'Nikko Duren',
    date: 'Oct 2020',
    href: 'https://www.theinfatuation.com/new-york/reviews/kapet-torta',
  },
  {
    outlet: 'Culinary Backstreets',
    quote: 'A sticky bun with a Gingoog accent.',
    about: 'the cheese ensaymada',
    author: 'Dave Cook',
    date: 'Oct 2019',
    href: 'https://culinarybackstreets.com/stories/queens/kapet-torta',
  },
  {
    outlet: 'The Infatuation',
    quote: 'My merienda of choice.',
    about: 'torta and kapeng barako',
    author: 'Paolo Española',
    date: 'Apr 2021',
    href: 'https://www.theinfatuation.com/new-york/reviews/kapet-torta-1',
  },
  {
    outlet: 'QNS',
    quote: 'A local gem.',
    author: 'Jessica Militello',
    date: 'Oct 2025',
    href: 'https://qns.com/2025/10/queens-food-tour-filipino-american-history-month/',
  },
]

export interface Rating {
  source: string
  score: string
  count: string
  href: string
}

export const ratings: readonly Rating[] = [
  { source: 'Google', score: '4.5', count: '175 reviews', href: 'https://maps.google.com/?cid=14265124322183888017' },
  { source: 'DoorDash', score: '4.8', count: '200+ ratings', href: 'https://www.doordash.com/store/kape%E2%80%99t-torta-elmhurst-1301505/' },
  { source: 'Grubhub', score: '4.8', count: '63 ratings', href: 'https://www.grubhub.com/restaurant/kapet-torta-83-13-queens-blvd-ny/2592705' },
  { source: 'Facebook', score: '94%', count: 'recommend', href: 'https://www.facebook.com/KapeTorta/' },
]

export const video = {
  title: 'Kape’t Torta is an NYC Filipino bakery on Queens Blvd in Elmhurst',
  channel: 'I May Roam',
  date: 'May 2023',
  href: 'https://www.youtube.com/watch?v=KWVrBZI2Eeo',
} as const
