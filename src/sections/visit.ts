import { hours, onlineOrderingHours } from '../data/hours.ts'
import { site } from '../data/site.ts'
import { DAY_NAMES, formatHours, WEEK_ORDER } from '../lib/hours.ts'
import { html } from '../lib/html.ts'
import { icon } from '../lib/icons.ts'
import { container, external, eyebrow, openStatus, statusFallback } from './ui.ts'

const goodToKnow = [
  { title: 'Come early', text: 'Ube cheese pandesal usually sells out by late afternoon.' },
  { title: 'Stay a while', text: 'A long high table under the Edison bulbs, and outlets all along the wall.' },
  { title: 'Order ahead', text: `Online pickup and delivery run ${onlineOrderingHours}. Curbside pickup, too.` },
  { title: 'Getting here', text: `${site.transit}. There’s a bus stop right out front.` },
]

const apps = [
  { label: 'DoorDash', href: site.links.doordash },
  { label: 'Seamless', href: site.links.seamless },
  { label: 'Grubhub', href: site.links.grubhub },
  { label: 'Caviar', href: site.links.caviar },
]

export function visit(): string {
  const { street, locality, region, postalCode } = site.address
  return html`<section id="visit" class="bg-kraft py-20 sm:py-24 lg:py-32" aria-labelledby="visit-title">
    <div class="${container}">
      <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-5">
          ${eyebrow('Visit', 'text-torta')}
          <h2 id="visit-title" class="display-xl mt-4">Come by</h2>
          <p class="mt-3 font-slab text-[1.15rem] italic text-roast/70"><span class="font-bold text-torta">Dayon!</span> That’s Cebuano for “come on in.”</p>
          <address class="mt-8 font-slab text-[1.9rem] leading-tight font-semibold not-italic">
            <a class="hover:text-torta" href="${site.links.directions}" ${external}>${street}<br />${locality}, ${region} ${postalCode}</a>
          </address>
          ${openStatus(statusFallback(), 'mt-5 text-roast/80')}

          <table class="hours-table mt-8 w-full">
            <caption class="sr-only">Opening hours</caption>
            <tbody>
              ${WEEK_ORDER.map(
                (day) => html`<tr data-hours-day="${day}">
                  <th scope="row">${DAY_NAMES[day]}</th>
                  <td>${formatHours(hours[day])}</td>
                </tr>`,
              )}
            </tbody>
          </table>

          <div class="mt-8 flex flex-wrap gap-3">
            <a class="btn btn-roast" href="${site.links.directions}" ${external}>${icon('pin', 'size-4')} Directions</a>
            <a class="btn btn-line" href="${site.phoneHref}">${icon('phone', 'size-4')} ${site.phone}</a>
          </div>
          <p class="mt-4 text-[0.95rem] text-roast/70">
            Or open it in <a class="link-inline" href="${site.links.appleMaps}" ${external}>Apple Maps</a>.
          </p>
        </div>

        <div class="flex flex-col gap-10 lg:col-span-7">
          <div class="frame frame-paper p-2.5">
            <iframe class="map chamfer-sm block aspect-[4/3] w-full lg:aspect-[16/11]" src="${site.links.mapEmbed}" title="Map: Kape’t Torta at 83-13 Queens Blvd, Elmhurst" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>

          <ul class="grid gap-x-10 gap-y-7 sm:grid-cols-2">
            ${goodToKnow.map(
              (item) => html`<li class="border-t-2 border-roast pt-4">
                <h3 class="eyebrow text-roast">${item.title}</h3>
                <p class="mt-2 text-roast/80">${item.text}</p>
              </li>`,
            )}
          </ul>

          <div class="border-t border-roast/20 pt-6">
            <p class="eyebrow text-roast/70">Also on</p>
            <ul class="mt-3 flex flex-wrap gap-x-7 gap-y-3">
              ${apps.map((app) => html`<li><a class="link-caps" href="${app.href}" ${external}>${app.label}</a></li>`)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>`
}
