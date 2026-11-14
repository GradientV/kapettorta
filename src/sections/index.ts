import { footer } from './footer.ts'
import { head } from './head.ts'
import { header } from './header.ts'
import { hero } from './hero.ts'
import { menuSection } from './menu.ts'
import { spotlightSection } from './spotlight.ts'
import { storyPage } from './story-page.ts'
import { teaser } from './teaser.ts'
import { isPage, type Page } from './ui.ts'
import { visit } from './visit.ts'

/** Sections that differ by page take the page name: `<!-- @section head story -->`. */
const SECTIONS: Record<string, (page: Page) => string> = {
  head,
  header,
  hero,
  spotlight: spotlightSection,
  menu: menuSection,
  teaser,
  visit,
  story: storyPage,
  footer,
}

const MARKER = /<!--\s*@section\s+([\w-]+)(?:\s+([\w-]+))?\s*-->/g

/** Replaces every `<!-- @section name [page] -->` in an HTML page with that section's markup. */
export function renderSections(html: string): string {
  return html.replace(MARKER, (_marker, name: string, arg: string | undefined) => {
    const render = SECTIONS[name]
    if (!render) throw new Error(`An HTML page references an unknown section: "${name}"`)
    const page = arg ?? 'home'
    if (!isPage(page)) throw new Error(`Unknown page "${page}" in the "${name}" section marker`)
    return render(page)
  })
}
