/**
 * Drawings made for the site, as inline SVG: the tops of the five cakes (beside the cake prices on
 * the menu) and a cut-away halo-halo (on the story page).
 */

type Point = readonly [number, number]

const round = (n: number) => Math.round(n * 10) / 10

/** Points around a circle, starting at the top. */
function ring(count: number, radius: number, cx = 60, cy = 60, offset = 0): Point[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = ((i + offset) / count) * Math.PI * 2 - Math.PI / 2
    return [round(cx + Math.cos(angle) * radius), round(cy + Math.sin(angle) * radius)] as const
  })
}

/** Fixed scatter for toppings, so every build draws the same cake. */
const SCATTER: readonly (readonly [number, number, number])[] = [
  [60, 60, 10], [47, 49, 70], [73, 47, 140], [44, 66, 30], [76, 70, 110], [60, 38, 160], [59, 82, 50],
  [36, 55, 95], [84, 56, 15], [50, 76, 125], [70, 80, 75], [40, 42, 175], [80, 40, 60], [64, 50, 100],
  [52, 60, 155], [68, 64, 35],
]

interface CakeLook {
  base: string
  piping: string
  pipingShade: string
  center: string
}

const rosettes = (fill: string, shade: string, count = 18, radius = 45) =>
  ring(count, radius)
    .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5.4" fill="${fill}"/><circle cx="${x}" cy="${y}" r="2.2" fill="none" stroke="${shade}" stroke-width="1.1"/>`)
    .join('')

const CAKES: Record<string, CakeLook> = {
  ube: {
    base: '#8b62ad',
    piping: '#c9acdd',
    pipingShade: '#a582c0',
    center:
      rosettes('#6d4590', '#55346f', 6, 16) +
      SCATTER.slice(0, 12)
        .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6" fill="#e3d2ee"/>`)
        .join(''),
  },
  'ube-custard': {
    base: '#8b62ad',
    piping: '#c9acdd',
    pipingShade: '#a582c0',
    center:
      '<circle cx="60" cy="60" r="35" fill="#efbd52" stroke="#c4802a" stroke-width="3"/>' +
      '<path d="M40 50a24 24 0 0 1 18-13" fill="none" stroke="#f9dc94" stroke-width="3.2" stroke-linecap="round"/>',
  },
  mango: {
    base: '#f6c445',
    piping: '#fff2c8',
    pipingShade: '#f3d77f',
    center: SCATTER.slice(0, 9)
      .map(([x, y, r]) => `<rect x="${x - 4.5}" y="${y - 4.5}" width="9" height="9" rx="1.6" fill="#f39419" stroke="#d97a0d" stroke-width=".8" transform="rotate(${r} ${x} ${y})"/>`)
      .join(''),
  },
  yema: {
    base: '#f3d995',
    piping: '#e7b04c',
    pipingShade: '#c98d2c',
    center: SCATTER.map(
      ([x, y, r], i) =>
        `<path d="M${x - 5} ${y}h10" stroke="${i % 2 ? '#fff4c9' : '#e4a63a'}" stroke-width="2.2" stroke-linecap="round" transform="rotate(${r} ${x} ${y})"/>`,
    ).join(''),
  },
  'chocolate-almond': {
    base: '#4a2a1d',
    piping: '#6f4231',
    pipingShade: '#8a5741',
    center: SCATTER.map(
      ([x, y, r]) =>
        `<ellipse cx="${x}" cy="${y}" rx="6" ry="3" fill="#ecd4a7" stroke="#c9a874" stroke-width=".8" transform="rotate(${r} ${x} ${y})"/>`,
    ).join(''),
  },
}

/** A whole cake seen from above, on its board. */
export function cakeTop(id: string, className = ''): string {
  const look = CAKES[id]
  if (!look) throw new Error(`No drawing for the "${id}" cake. Add one to CAKES in src/lib/art.ts.`)
  return `<svg class="${className}" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
    <circle cx="60" cy="60" r="58.5" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 3" opacity=".55"/>
    <circle cx="60" cy="60" r="52" fill="${look.base}"/>
    ${rosettes(look.piping, look.pipingShade)}
    ${look.center}
  </svg>`
}

/** The layers of the special halo-halo, top to bottom, numbered on the drawing. */
export const haloHaloLayers = [
  'Corn flakes',
  'Ube ice cream',
  'Leche flan',
  'Ube halaya',
  'Shaved ice & coconut milk',
  'Nata de coco (coconut jelly)',
  'Sweet red beans',
] as const

/** A cut-away glass of halo-halo with numbered layers (the list sits beside it in the page). */
export function haloHalo(className = ''): string {
  const glass = '42,108 198,108 178,344 62,344'
  const marker = (n: number, y: number, x = 214) =>
    `<path d="M${x - 22} ${y}h14" stroke="currentColor" stroke-width="1" opacity=".6"/><circle cx="${x}" cy="${y}" r="10" fill="none" stroke="currentColor" stroke-width="1.2"/><text x="${x}" y="${y + 4.5}" text-anchor="middle" class="halo-num">${n}</text>`
  const beans = [[78, 330], [96, 334], [114, 328], [132, 335], [150, 330], [166, 334], [88, 318], [124, 318], [158, 318], [106, 322], [140, 322]]
  const jelly = [[80, 290], [104, 298], [130, 288], [154, 296], [92, 278], [142, 278], [118, 302], [166, 284]]
  return `<svg class="${className}" viewBox="0 0 240 360" aria-hidden="true" focusable="false">
    <defs><clipPath id="halo-glass"><polygon points="${glass}"/></clipPath></defs>
    <g clip-path="url(#halo-glass)">
      <rect x="0" y="100" width="240" height="260" fill="#f7f2e8"/>
      <rect x="0" y="306" width="240" height="40" fill="#8b3328"/>
      ${beans.map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="4.2" fill="#5f1d17"/><ellipse cx="${x - 1.8}" cy="${y - 1.4}" rx="1.8" ry="1" fill="#b4574a"/>`).join('')}
      <rect x="0" y="268" width="240" height="38" fill="#ece3cb"/>
      ${jelly.map(([x, y]) => `<rect x="${x - 6}" y="${y - 6}" width="12" height="12" fill="#fbf7ea" stroke="#cdbf98" stroke-width="1.2"/>`).join('')}
      <path d="M0 172 C40 182 70 164 110 174 S180 166 240 176 V268 H0Z" fill="#f7f2e8"/>
      <path d="M58 200c10 18 2 34 12 52M120 192c-8 22 6 38-4 62M168 196c10 16 0 34 8 50" fill="none" stroke="#8d64ad" stroke-width="5" stroke-linecap="round" opacity=".55"/>
      <path d="M0 150 C40 160 72 142 112 152 S184 144 240 154 V178 C180 168 150 182 110 174 S40 186 0 176Z" fill="#6f4290"/>
      <rect x="0" y="108" width="240" height="44" fill="#eab14b"/>
      <rect x="0" y="108" width="240" height="8" fill="#b9701f"/>
      ${[[60, 236], [92, 214], [138, 244], [176, 222], [110, 258], [74, 262], [156, 206], [130, 220]].map(([x, y]) => `<path d="M${x - 3} ${y}h6M${x} ${y - 3}v6" stroke="#d8d0c0" stroke-width="1.2"/>`).join('')}
    </g>
    <path d="M156 78 196 10" stroke="#ddd6c9" stroke-width="6" stroke-linecap="round"/>
    <path d="M157 76 196 10" stroke="#fffaf0" stroke-width="1.5" stroke-linecap="round" opacity=".8"/>
    <path d="M58 110C50 38 190 38 182 110Z" fill="#9b76c0"/>
    <path d="M68 103c24 8 80 8 104 0" fill="none" stroke="#7a52a0" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M86 70c6-10 16-15 26-16" fill="none" stroke="#b998d6" stroke-width="3" stroke-linecap="round"/>
    ${[[88, 76, 20], [106, 60, -15], [128, 54, 35], [150, 62, 10], [166, 80, -20], [98, 92, 40], [140, 78, 70], [118, 74, -30], [156, 96, 15], [76, 96, -10]].map(([x, y, r]) => `<path d="M${x - 7} ${y + 2}l4-5 6 1 4 4-3 4-7 1z" fill="#e8b65b" stroke="#bf8a2c" stroke-width="1" stroke-linejoin="round" transform="rotate(${r} ${x} ${y})"/>`).join('')}
    <polygon points="${glass}" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M36 108h168" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M56 128 72 330" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".35"/>
    ${marker(1, 50, 222)}${marker(2, 86, 222)}${marker(3, 130, 222)}${marker(4, 164, 222)}${marker(5, 220, 222)}${marker(6, 287, 222)}${marker(7, 325, 222)}
  </svg>`
}
