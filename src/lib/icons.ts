const ICONS = {
  phone:
    '<path d="M6.5 3.5h3l1.6 4.4-2.1 1.3a11.5 11.5 0 0 0 5.8 5.8l1.3-2.1 4.4 1.6v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z"/>',
  pin: '<path d="M12 21.5s-6.8-6-6.8-11.6a6.8 6.8 0 0 1 13.6 0C18.8 15.5 12 21.5 12 21.5Z"/><circle cx="12" cy="9.8" r="2.4"/>',
  bag: '<path d="M4.5 8h15l-1.2 13H5.7L4.5 8Z"/><path d="M8.8 8V6.2a3.2 3.2 0 0 1 6.4 0V8"/>',
  arrow: '<path d="M4 12h15.5M13.5 6l6 6-6 6"/>',
  external: '<path d="M13.5 4.5h6v6M19.5 4.5l-8.5 8.5M17.5 13.5v6h-13v-13h6"/>',
  instagram:
    '<rect x="3.5" y="3.5" width="17" height="17" rx="4.6"/><circle cx="12" cy="12" r="3.9"/><circle cx="17.1" cy="6.9" r=".9" fill="currentColor" stroke="none"/>',
  facebook:
    '<path d="M13.6 20.5v-7.3h2.5l.4-2.9h-2.9V8.5c0-.8.2-1.4 1.4-1.4h1.6V4.6c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2H8.2v2.9h2.5v7.3"/>',
  mail: '<rect x="3.5" y="5.5" width="17" height="13"/><path d="m4 6.5 8 6.2 8-6.2"/>',
  play: '<path d="M8 5.5v13l10.5-6.5L8 5.5Z"/>',
  menu: '<path d="M3.5 7h17M3.5 12h17M3.5 17h17"/>',
  close: '<path d="m5.5 5.5 13 13M18.5 5.5l-13 13"/>',
} as const

export type IconName = keyof typeof ICONS

/** A 24×24 line icon in the current text color. Decorative: the link or button around it carries the label. */
export function icon(name: IconName, className = 'size-5'): string {
  return `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`
}
