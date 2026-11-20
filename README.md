# Kape’t Torta — official website

Website for [Kape’t Torta](https://www.instagram.com/kapetorta/), a Filipino bakery and café at 83-13 Queens Blvd, Elmhurst, Queens. Built and maintained by [GradientV](https://gradientv.com).

## Pages

- **Home (`/`)** features the pandesal, hours and address, followed by the full menu, press quote, founders’ story and a map.
- **Our story (`/story`)**: the three founders from Gingoog, the former nail salon, Nora’s “not a typical Filipino restaurant,” barako, tablea and the pasalubong shelf, the halo-halo drawn layer by layer, and the press.

## Stack

- **Vite 6 + TypeScript + Tailwind CSS v4**, no UI framework (same setup as our other client sites).
- Both pages are rendered to static HTML at build time: a small plugin in `vite.config.ts` swaps each `<!-- @section name [page] -->` marker in `index.html` and `story.html` for the markup from `src/sections/`. The menu, hours and copy are in the page source, so search engines can read them without running JavaScript. The home page’s `<head>` carries schema.org `Bakery` / `CafeOrCoffeeShop` data with the hours, address, founders and the full menu.
- The browser handles the mobile navigation, the live “Open now” status and today’s row in the hours table (both in New York time) in `src/ui/`.
- Source Serif 4 is used for the wordmark and headings. Figtree is used for navigation, prices and body copy. Both are self-hosted through Fontsource.
- Photos are Unsplash placeholders served and cropped by Unsplash’s CDN (`src/data/photos.ts`), so there are no image files to commit until we have the shop’s own.

## Design

The header and footer share a serif wordmark. Warm ivory backgrounds, espresso text and a terracotta order button frame the food photography. The featured pandesal and its price appear on both phones and larger screens. The cake illustrations and halo-halo diagram live in `src/lib/art.ts`.

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
| Menu groups, items, prices, short notes and cakes | `src/data/menu.ts` |
| Press quotes, ratings, the Jordan Clarkson quotes | `src/data/press.ts` |
| Photos | `src/data/photos.ts` |
| The story | `src/sections/story-page.ts` |
| Drawings (cake tops, halo-halo) | `src/lib/art.ts` |
| Other page copy and layout | `src/sections/*.ts` |
| Colors and fonts | `@theme` in `src/styles.css` |

**Menu changes.** The menu, featured pandesal price, halo-halo price on the story page and structured data all read from `src/data/menu.ts`. Update a price there once to change it everywhere.

**Real photos.** Save each photo in `public/images` as `${name}-${width}.jpg` (e.g. `ube-pandesal-800.jpg`, cropped to the ratio in `photos.ts`), then switch its entry from `unsplash(…)` to `local(…)`. Nothing else changes.

**Link preview.** `public/og-image.png` is rendered from `scripts/og-image.html`; the command is at the top of that file.

## Deploying

Vercel picks up `vercel.json` (build command, output folder, clean URLs so `/story` serves `story.html`, caching and security headers). Push a branch to get a preview deployment, then merge to `main` to go live.

## Before launch

- [ ] **Domain.** `kapettorta.com`, `kapetorta.com` (matches @kapetorta) and `kapettorta.nyc` were all unregistered on Nov 8, 2026. Register `kapettorta.com` in the client’s name (and `kapetorta.com` as a redirect, since that’s the handle people know), then update `site.url`, `public/robots.txt` and `public/sitemap.xml`.
- [ ] **Google Business Profile.** The listing is unclaimed (“Claim this business”) and has no website. Help the owners claim and verify it, then add the site, confirm the hours and add photos. It has 4.5 stars from 175 reviews.
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
- [ ] **Logo.** Confirm the website wordmark and favicon with the owners when their original artwork is available.
- [ ] **Profiles.** Add the new domain to Google, Instagram (last post Nov 2022) and Facebook (last post Nov 2024).
- [ ] Optional: turn on Vercel Web Analytics.

## Photo credits (placeholders)

Miguel Lorenzo, Maria Klichik, Thiccolas Doughbert Holeman, Steve Harvey, Negin H, Jem Sahagun, Yeh Xintong and Jorge Campos, on Unsplash. Links in `src/data/photos.ts`.
