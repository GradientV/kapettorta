/**
 * Drawings made for the site, as inline SVG: the tops of the five cakes, a cut-away halo-halo
 * and the line-drawn pastry counter above the footer (in place of Carnegie Diner's skyline).
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

/**
 * The pastry counter: a basket of pandesal, two tortas in their fluted cups, an ensaymada, a cup
 * of barako, a whole cake on a stand, halo-halo, a slice, a pastry box and the coconut-sugar jar,
 * under the café's Edison bulbs. Single-weight line drawing in the current text color.
 */
export function pastryCounter(className = ''): string {
  const dome = (x1: number, x2: number, base: number, rise: number) => {
    const c = round(base - rise / 0.75)
    return `M${x1} ${base}C${x1} ${c} ${x2} ${c} ${x2} ${base}`
  }
  const bulb = (x: number, drop: number) =>
    `<path d="M${x} 0V${drop}"/><path d="M${x - 5} ${drop}h10v8h-10z"/>` +
    `<path d="M${x - 4} ${drop + 8}C${x - 4} ${drop + 13} ${x - 13} ${drop + 17} ${x - 13} ${drop + 27}A13 13 0 0 0 ${x + 13} ${drop + 27}C${x + 13} ${drop + 17} ${x + 4} ${drop + 13} ${x + 4} ${drop + 8}"/>` +
    `<path d="M${x - 3} ${drop + 9}v13a3 3 0 0 0 6 0V${drop + 9}" stroke-width="1.1"/>`
  const cup = (x: number) => {
    const pleats = [1, 2, 3, 4].map((k) => `M${x + k * 8} 128L${round(x + 6 + k * 5.6)} 158`).join('')
    return `<path d="M${x} 128h40l-6 30h-28z"/><path d="${pleats}" stroke-width="1.2"/><path d="${dome(x - 3, x + 43, 128, 17)}"/>` +
      `<path d="M${x + 9} 118h.01M${x + 20} 114h.01M${x + 31} 118h.01M${x + 15} 122h.01M${x + 26} 122h.01" stroke-width="2.4"/>`
  }

  return `<svg class="${className}" viewBox="0 0 1200 170" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke">
    <path d="M0 158H1200"/><path d="M0 165H1200" stroke-width="1"/>

    <path d="M30 118h120l-12 40H42z"/>
    <path d="M34 131h112M38 144h104" stroke-width="1.2"/>
    <path d="M58 118l-3 40M82 118l-1 40M106 118l1 40M128 118l3 40" stroke-width="1.2"/>
    <path d="${dome(31, 70, 118, 17)}"/><path d="${dome(70, 110, 118, 22)}"/><path d="${dome(110, 149, 118, 17)}"/>
    <path d="M44 108h.01M56 104h.01M84 99h.01M96 96h.01M90 106h.01M122 104h.01M136 108h.01" stroke-width="2.4"/>

    ${bulb(176, 18)}

    ${cup(203)}${cup(255)}

    <path d="M322 151h124"/><path d="M322 151Q384 163 446 151"/>
    <path d="${dome(334, 434, 151, 28)}"/>
    <path d="${dome(350, 418, 147, 16)}" stroke-width="1.5"/>
    <path d="M370 136c6-8 22-8 28 0" stroke-width="1.5"/>
    <path d="M362 128l7-3M380 123l6 2M394 127l6-3M372 133l-6 3M404 134l5 3M386 118l4-4M352 138l-4 2M414 126l4 2" stroke-width="1.4"/>

    <path d="M464 152h112"/><path d="M464 152Q520 161 576 152"/>
    <path d="M486 110h70l-6 34c-2 6-8 8-29 8s-27-2-29-8z"/>
    <path d="M555 118c14-2 19 4 18 11s-8 12-21 12"/>
    <path d="M508 98c-6-7 6-12 0-20s6-12 0-19M528 96c-6-7 6-12 0-20s6-12 0-19" stroke-width="1.5"/>

    ${bulb(604, 26)}

    <path d="M628 112h128"/>
    <path d="M684 112l-4 38M700 112l4 38"/><path d="M664 158c4-10 52-10 56 0"/>
    <path d="M636 112V72h112v40"/><path d="M636 92h112" stroke-width="1.2"/>
    <path d="M636 72${Array.from({ length: 8 }, () => 'q7-9 14 0').join('')}"/>
    <path d="M664 82h.01M692 80h.01M720 82h.01M678 100h.01M706 102h.01M734 100h.01M650 101h.01" stroke-width="2.4"/>

    <path d="M786 92h60"/><path d="M790 92l6 66h40l6-66"/>
    <path d="${dome(794, 838, 92, 17)}"/>
    <path d="M794 118h44" stroke-width="1.2"/>
    <path d="M794 130c8-4 14 4 22 0s14-4 22 0" stroke-width="1.2"/>
    <path d="M806 148h.01M815 151h.01M824 147h.01M832 151h.01M811 142h.01M827 141h.01" stroke-width="3"/>
    <path d="M826 84l26-50"/><ellipse cx="855" cy="28" rx="4.5" ry="7.5" transform="rotate(28 855 28)"/>
    <path d="M802 82l4-3 4 3M816 77l4-3 4 3M828 83l3-3 3 3" stroke-width="1.4"/>

    ${bulb(890, 14)}

    <path d="M912 152h104"/><path d="M912 152Q964 161 1016 152"/>
    <path d="M922 132L1002 118V150H922Z"/><path d="M922 132l66-24 14 10" />
    <path d="M922 142l80-12" stroke-width="1.2"/>
    <circle cx="990" cy="108" r="5"/>

    <path d="M1036 158V112h68v46z"/><path d="M1036 112l16-12h68l-16 12"/><path d="M1104 158l16-12v-46"/>
    <path d="M1070 112v46M1070 112l16-12" stroke-width="1.4"/>
    <path d="M1078 106c-9-9-17-4-10 2M1078 106c9-9 18-4 9 3" stroke-width="1.4"/>

    <path d="M1144 158v-38c0-6 4-9 9-9h24c5 0 9 3 9 9v38z"/>
    <path d="M1148 111v-7h34v7"/><path d="M1160 104v-5h10v5"/>
    <path d="M1144 128h42M1144 146h42" stroke-width="1.2"/>
  </g>
</svg>`
}

/** The fluted paper cup of a torta, for small marks (favicon, list bullets). */
export function tortaMark(className = ''): string {
  return `<svg class="${className}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M3.5 11.5C3.5 6 20.5 6 20.5 11.5z" fill="currentColor" opacity=".55"/>
    <path d="M4.5 11.5h15l-2 9h-11z" fill="currentColor"/>
  </svg>`
}
