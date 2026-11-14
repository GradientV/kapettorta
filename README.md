# Kape’t Torta — official website

Website for [Kape’t Torta](https://www.instagram.com/kapetorta/), a Filipino bakery and café at 83-13 Queens Blvd, Elmhurst, Queens. Built and maintained by [GradientV](https://gradientv.com).

## Pages

- **Home (`/`)**, kept short on purpose: the hours, address and phone number on the first screen; Jordan Clarkson’s words about the shop (The Infatuation, April 2026); the full menu with prices; two lines of the story; and the visit section with a map and the weekly hours.
- **Our story (`/story`)**: the three founders from Gingoog, the former nail salon, Nora’s “not a typical Filipino restaurant,” barako, tablea and the pasalubong shelf, the halo-halo drawn layer by layer, and the press.

## Stack

- **Vite 6 + TypeScript + Tailwind CSS v4**, no UI framework (same setup as our other client sites).
- Both pages are rendered to static HTML at build time: a small plugin in `vite.config.ts` swaps each `<!-- @section name [page] -->` marker in `index.html` and `story.html` for the markup from `src/sections/`. The menu, hours and copy are in the page source, so search engines can read them without running JavaScript. The home page’s `<head>` carries schema.org `Bakery` / `CafeOrCoffeeShop` data with the hours, address, founders and the full menu.
- The browser runs under 2 KB (gzipped) of TypeScript, in `src/ui/`: the mobile menu, the live “Open now” status and today’s row in the hours table (both in New York time), and the notice strip’s end date.
- Fonts are self-hosted through Fontsource: Caprasimo (headings), Figtree (everything else) and Oleo Script (only for the red “Torta” in the logo).
- Photos are Unsplash placeholders served and cropped by Unsplash’s CDN (`src/data/photos.ts`), so there are no image files to commit until we have the shop’s own.

## Design

Ube and cheese: the purple and yellow of an ube cheese pandesal, their best seller, on clean white, with Caprasimo’s round, chunky lettering, like the print on an old bakery box. Nora told Culinary Backstreets they “didn’t want it to look like a typical Filipino restaurant,” and the site follows her lead: no flag colors or woven patterns, just a clean, friendly bakery with the food up front.

- Laid out like the [Swabe Food Truck](https://www.swabefoodtruck.com/) site: a short home page, the hours, address and phone in a bar under the first screen, and the story on its own page.
- A row of scallops, like a cake doily or a fluted torta cup, runs under the first screen and above the footer (`.scallops`). It’s the one decorative motif.
- The logo is rebuilt in type until we have their files: a coffee-brown square with “Kape’t” in white and “Torta” in red script, as on their sign.
- The cake tops beside the cake prices and the halo-halo cut-away are drawn for the site, in `src/lib/art.ts`.
- Square buttons and tags, sentence-case headings, no pill shapes, gradients, glassmorphism, icon grids or scroll animations.
- It deliberately shares nothing visual with the Lahi site on the same corner (cream and ink, red and gold, tall condensed capitals, a centered name with a hanging tab, alternating photo panels).

## Commands

```bash
npm install
```

```bash
npm run dev       # http://localhost:5176 (and /story)
```

```bash
npm run build     # type-checks, then builds both pages to dist/
```

```bash
npm run preview   # serves dist/
```

Vite is pinned to v6 because this machine runs Node 22.9; Vite 7+ needs Node 20.19+ or 22.12+. The dev server restarts on its own when anything in `src/data`, `src/sections` or `src/lib` changes.

## Updating content

| What | Where |
| --- | --- |
| Name, phone, email, address, ordering and social links | `src/data/site.ts` |
| Opening hours, online-ordering hours | `src/data/hours.ts` |
| Holiday pre-orders, closures, specials (the strip at the top) | `src/data/notice.ts` |
| Menu: groups, items, prices, short notes, the “Best seller” tag; the five cakes | `src/data/menu.ts` |
| Press quotes, ratings, the Jordan Clarkson quotes | `src/data/press.ts` |
| Photos | `src/data/photos.ts` |
| The story | `src/sections/story-page.ts` |
| Drawings (cake tops, halo-halo) | `src/lib/art.ts` |
| Other page copy and layout | `src/sections/*.ts` |
| Colors and fonts | `@theme` in `src/styles.css` |

**Posting a notice.** Set `notice` in `src/data/notice.ts`, for example `{ message: 'Closed Thursday, Dec 25. Maligayang Pasko!', until: '2026-12-25' }`, and deploy. It shows in a thin purple strip above the header on both pages, and once the `until` date has passed it disappears by itself, even without a redeploy. Set it to `null` when there’s nothing to say.

**Menu changes.** Each item is one entry in `src/data/menu.ts`; the menu, the best seller under the first photo, the halo-halo price on the story page and the structured data all read from it, so a price only changes in one place. Keep notes to a few words, and only where the name doesn’t explain itself.

**Real photos.** Save each photo in `public/images` as `${name}-${width}.jpg` (e.g. `ube-pandesal-800.jpg`, cropped to the ratio in `photos.ts`), then switch its entry from `unsplash(…)` to `local(…)`. Nothing else changes.

**Link preview.** `public/og-image.png` is rendered from `scripts/og-image.html`; the command is at the top of that file.

## Deploying

Vercel picks up `vercel.json` (build command, output folder, clean URLs so `/story` serves `story.html`, caching and security headers). Push a branch to get a preview deployment, then merge to `main` to go live.

## Before launch

- [ ] **Domain.** `kapettorta.com`, `kapetorta.com` (matches @kapetorta) and `kapettorta.nyc` were all unregistered on Nov 8, 2026. Register `kapettorta.com` in the client’s name (and `kapetorta.com` as a redirect, since that’s the handle people know), then update `site.url`, `public/robots.txt` and `public/sitemap.xml`.
- [ ] **Google Business Profile.** The listing is unclaimed (“Claim this business”) and has no website. Help the owners claim and verify it, then add the site, confirm the hours and add photos. It has 4.5 stars from 175 reviews.
- [ ] **Notice.** The Thanksgiving pre-order strip is a sample written from their 2022 Instagram and 2024 Facebook posts. Confirm they’re taking orders this year (and their Thanksgiving Day hours; in 2022 they closed at 4 PM), or set it to `null`.
- [ ] **Jordan Clarkson.** Both quotes are his words in The Infatuation’s “Jordan Clarkson’s Favorite NYC Spots” (Apr 16, 2026), credited and linked. Keep it presented as press: no photo of him, no Knicks marks, and nothing that reads as an endorsement. Get the owners’ OK, and refresh it if the guide changes.
- [ ] **Photos.** Every photo is a placeholder. Shoot: ube cheese pandesal, a tray of tortas, a slice of ube cake, a cup of barako, the bakery case, the high table under the Edison bulbs, the grocery shelf, the storefront, and Nora, Jeanette and Khaty together for the story.
- [ ] **Prices.** From DoorDash, plus Grubhub for items DoorDash doesn’t list (Nov 8, 2026). App prices can run higher than the counter (coffee is $2.25 on DoorDash and $2.60 on Grubhub). Get the in-store price list.
- [ ] **Items to confirm.** Pork asado buns and ube flan (in the case per QNS and recent Google reviews, on no online menu); tablea hot chocolate (Culinary Backstreets, 2019, mentioned on the story page); the box-of-12 torta price; whole ube custard cake price; whether the coffee is always barako; the halo-halo layers.
- [ ] **Cake orders.** How much notice they need, whether they write dedications (a DoorDash reviewer asked for one), deposits, and whether they take Christmas orders. Add the answers to the note under the cakes in `src/sections/menu.ts`.
- [ ] **Story.** Written from Culinary Backstreets (2019) and I May Roam (2023). Have Nora, Jeanette and Khaty read `/story` and say whether the day jobs are still true.
- [ ] **Press quotes.** Get the owners’ OK to feature the quotes in `src/data/press.ts`.
- [ ] **Cebuano.** Ask the owners to check *Daghang salamat!* in the footer, or swap in what they’d say.
- [ ] **Email.** `sweetsmarketny@gmail.com` is from their Facebook page. Confirm it’s the inbox they want on the site.
- [ ] **Ordering.** “Order” goes to their DoorDash online-ordering page (order.online), which Google already uses. Confirm that’s the link they want; DoorDash, Seamless, Grubhub and Caviar are listed under Visit.
- [ ] **Logo.** The logo and favicon are stand-ins rebuilt from their sign and Instagram logo. Use their logo files once we have them.
- [ ] **Profiles.** Add the new domain to Google, Instagram (last post Nov 2022) and Facebook (last post Nov 2024).
- [ ] Optional: turn on Vercel Web Analytics.

## Photo credits (placeholders)

Miguel Lorenzo, Maria Klichik, Thiccolas Doughbert Holeman, Steve Harvey, Negin H, Jem Sahagun, Yeh Xintong and Jorge Campos, on Unsplash. Links in `src/data/photos.ts`.
