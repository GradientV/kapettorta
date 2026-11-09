# Kape’t Torta — official website

Website for [Kape’t Torta](https://www.instagram.com/kapetorta/), a Filipino bakery and café at 83-13 Queens Blvd, Elmhurst, Queens. Built and maintained by [GradientV](https://gradientv.com).

## Stack

- **Vite 6 + TypeScript + Tailwind CSS v4**, no UI framework (same setup as Lahi, The Alcove and Chat TCG).
- Every section is rendered to static HTML at build time: a small plugin in `vite.config.ts` swaps each `<!-- @section name -->` marker in `index.html` for the markup from `src/sections/`. The menu, hours and copy are in the page source, so search engines can read them without running JavaScript. The `<head>` carries schema.org `Bakery` / `CafeOrCoffeeShop` data with the hours, address, founders and the full menu.
- The browser runs about 2 KB (gzipped) of TypeScript, in `src/ui/`: the mobile menu, the live “Open now” status and today’s row in the hours table (both in New York time), the notice strip’s end date, and scroll reveals (off for people who prefer reduced motion).
- Fonts are self-hosted through Fontsource: Sofia Sans Extra Condensed (headlines, nav, buttons, prices), Sofia Sans (text), Zilla Slab (dish names and the “Kape’t” of the wordmark) and Oleo Script (the red “Torta”).
- Photos are Unsplash placeholders served and cropped by Unsplash’s CDN (`src/data/photos.ts`), so there are no image files to commit until we have the shop’s own.

## Design

After [The Smith](https://thesmithrestaurant.com/) and [Carnegie Diner](https://www.carnegiediner.com/):

- **From The Smith:** the dark header with the name in the middle and links either side; the red tab hanging from it (here “Order”, with the pleated edge of a torta cup instead of a V); tall condensed capitals; cards with cut corners and a thin inner rule that follows them (`.frame`); underlined capital links; the round stamp with the address number (`badge()` in `src/sections/ui.ts`); the huge pull quote.
- **From Carnegie Diner:** alternating photo-and-text panels for the story, square buttons, and a line drawing above the footer. Theirs is a skyline; ours is a pastry counter under the café’s Edison bulbs.
- **Kape’t Torta’s own:** coffee brown and the red of the “Torta” in their logo, with ube purple and yema yellow from their two best-known cakes. The wordmark is set like their sign (slab “Kape’t”, red script “Torta” with a cream outline). The zigzag edges (`.edge-b`, `.edge-y`) are the fluted paper cups tortas bake in. The hero spells out the name: *kape at torta*, coffee and cake. Dish names carry a pronunciation (“OO-beh · pan-deh-SAHL”), because Nora wanted the shop to feel open to everyone in Elmhurst, not only Filipinos. The cake tops, the halo-halo cut-away and the pastry counter are drawn for the site in `src/lib/art.ts`. Two Cebuano phrases (*Dayon!*, *Daghang salamat!*) nod to Gingoog, always with the English.
- No pill shapes, gradients, glassmorphism or icon grids. It also deliberately shares nothing visual with the Lahi site, which is on the same corner.

## Commands

```bash
npm install
```

```bash
npm run dev       # http://localhost:5176
```

```bash
npm run build     # type-checks, then builds to dist/
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
| Menu: sections, items, prices, descriptions, pronunciations; the five cakes | `src/data/menu.ts` |
| “From the case” picks | `src/sections/case.ts` (prices come from the menu) |
| Press quotes, ratings, the Jordan Clarkson quote | `src/data/press.ts` |
| Photos | `src/data/photos.ts` |
| Drawings (cake tops, halo-halo, pastry counter) | `src/lib/art.ts` |
| Page copy and layout | `src/sections/*.ts` |
| Colors and fonts | `@theme` in `src/styles.css` |

**Posting a notice.** Set `notice` in `src/data/notice.ts`, for example `{ message: 'Closed Thursday, Dec 25. Maligayang Pasko!', until: '2026-12-25' }`, and deploy. It replaces the hours-and-address strip at the top of every page, and once the `until` date has passed it disappears by itself, even without a redeploy. Set it to `null` when there’s nothing to say.

**Menu changes.** Each item is one entry in `src/data/menu.ts`. The “From the case” cards, the coffee prices in the Kape section, the cake section and the structured data all read from it, so a price only changes in one place. Renaming an item that one of those uses fails the build until the section matches, on purpose.

**Real photos.** Save each photo in `public/images` as `${name}-${width}.jpg` (e.g. `ube-pandesal-800.jpg`, cropped to the ratio in `photos.ts`), then switch its entry from `unsplash(…)` to `local(…)`. Nothing else changes.

**Link preview.** `public/og-image.png` is rendered from `scripts/og-image.html`; the command is at the top of that file.

## Deploying

Vercel picks up `vercel.json` (build command, output folder, caching and security headers). Push a branch to get a preview deployment, then merge to `main` to go live.

## Before launch

- [ ] **Domain.** `kapettorta.com`, `kapetorta.com` (matches @kapetorta) and `kapettorta.nyc` were all unregistered on Nov 8, 2026. Register `kapettorta.com` in the client’s name (and `kapetorta.com` as a redirect, since that’s the handle people know), then update `site.url`, `public/robots.txt` and `public/sitemap.xml`.
- [ ] **Google Business Profile.** The listing is unclaimed (“Claim this business”) and has no website. Help the owners claim and verify it, then add the site, confirm the hours and add photos. It has 4.5 stars from 175 reviews.
- [ ] **Notice.** The Thanksgiving pre-order strip is a sample written from their 2022 Instagram and 2024 Facebook posts. Confirm they’re taking orders this year (and their Thanksgiving Day hours; in 2022 they closed at 4 PM), or set it to `null`.
- [ ] **Photos.** Every photo is a placeholder. Shoot: the case in the morning, ube cheese pandesal, tortas, ensaymada, each cake whole and sliced, a cup of barako, tablea, halo-halo, the high table under the Edison bulbs, the grocery shelf, the storefront, and Nora, Jeanette and Khaty together for the story.
- [ ] **Prices.** From DoorDash, plus Grubhub for items DoorDash doesn’t list (Nov 8, 2026). App prices can run higher than the counter (coffee is $2.25 on DoorDash and $2.60 on Grubhub). Get the in-store price list.
- [ ] **Items to confirm.** Pork asado buns and ube flan (in the case per QNS and recent Google reviews, on no online menu); tablea hot chocolate (Culinary Backstreets, 2019); the box-of-12 torta price; whole ube custard cake price; whether the coffee is always barako; Grubhub’s separate “Cheese Drizzle” vs “Cheese Drizzle Pandesal”; the halo-halo layers.
- [ ] **Cake orders.** How much notice they need, whether they write dedications (a DoorDash reviewer asked for one), deposits, and whether they take Christmas orders. Add the answers to `src/sections/cakes.ts`.
- [ ] **Story.** Written from Culinary Backstreets (2019) and I May Roam (2023). Have Nora, Jeanette and Khaty read it and say whether the day jobs are still true.
- [ ] **Quotes.** Get the owners’ OK to feature the press quotes in `src/data/press.ts`, including Jordan Clarkson’s from The Infatuation (April 2026).
- [ ] **Cebuano.** Ask the owners to check *Dayon!* and *Daghang salamat!*, or swap in what they’d say.
- [ ] **Email.** `sweetsmarketny@gmail.com` is from their Facebook page. Confirm it’s the inbox they want on the site.
- [ ] **Ordering.** “Order” goes to their DoorDash online-ordering page (order.online), which Google already uses. Confirm that’s the link they want; DoorDash, Seamless, Grubhub and Caviar are listed under Visit.
- [ ] **Logo.** The wordmark and favicon are stand-ins drawn from their sign and Instagram logo. Use their logo files once we have them.
- [ ] **Profiles.** Add the new domain to Google, Instagram (last post Nov 2022) and Facebook (last post Nov 2024).
- [ ] Optional: turn on Vercel Web Analytics.

## Photo credits (placeholders)

Jem Sahagun, Miguel Lorenzo, Maria Klichik, Christian Dala, Thiccolas Doughbert Holeman, Joyce Romero, Steve Harvey, Maddi Bazzocco, Yeh Xintong, Negin H and Jorge Campos, on Unsplash. Links in `src/data/photos.ts`.
