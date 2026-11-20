import { hours, onlineOrderingHours } from '../data/hours.ts'
import { site } from '../data/site.ts'
import { DAY_NAMES, formatHours, WEEK_ORDER } from '../lib/hours.ts'
import { html } from '../lib/html.ts'
import { icon } from '../lib/icons.ts'
import { container, external, openStatus } from './ui.ts'

const apps = [
  { label: 'Order online', href: site.links.order },
  { label: 'DoorDash', href: site.links.doordash },
  { label: 'Seamless', href: site.links.seamless },
  { label: 'Grubhub', href: site.links.grubhub },
  { label: 'Caviar', href: site.links.caviar },
]

export function visit(): string {
  const { street, locality, region, postalCode } = site.address
  return html`<section id="visit" class="py-16 sm:py-20 lg:py-24" aria-labelledby="visit-title">
    <div class="${container} grid gap-10 lg:grid-cols-12 lg:gap-14">
      <div class="lg:col-span-5">
        <h2 id="visit-title" class="h2">Visit</h2>
        <address class="mt-5 font-display text-[1.75rem] leading-tight not-italic">
          <a class="hover:text-accent" href="${site.links.directions}" ${external}>${street}<br />${locality}, ${region} ${postalCode}</a>
        </address>
        <p class="mt-2 text-ink/70">${site.transit}, with a bus stop out front.</p>

        ${openStatus('mt-6 font-bold')}
        <table class="hours-table mt-3">
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

        <div class="mt-7 flex flex-wrap gap-3">
          <a class="btn btn-primary" href="${site.links.directions}" ${external}>${icon('pin', 'size-4')} Directions</a>
          <a class="btn btn-line tabular-nums" href="${site.phoneHref}">${icon('phone', 'size-4')} ${site.phone}</a>
        </div>
      </div>

      <div class="flex flex-col gap-7 lg:col-span-7">
        <iframe class="map block aspect-[4/3] w-full border border-rule" src="${site.links.mapEmbed}" title="Map showing Kape’t Torta at 83-13 Queens Blvd, Elmhurst" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        <div class="grid gap-6 sm:grid-cols-2">
          <div>
            <h3 class="font-bold">Pickup and delivery</h3>
            <p class="mt-1 text-ink/70">Online orders run ${onlineOrderingHours}, with curbside pickup.</p>
            <ul class="mt-2 flex flex-wrap gap-x-5 gap-y-1">
              ${apps.map((app) => html`<li><a class="link font-semibold" href="${app.href}" ${external}>${app.label}</a></li>`)}
            </ul>
          </div>
          <div>
            <h3 class="font-bold">Come early</h3>
            <p class="mt-1 text-ink/70">The ube cheese pandesal often sells out by late afternoon.</p>
          </div>
        </div>
      </div>
    </div>
  </section>`
}
