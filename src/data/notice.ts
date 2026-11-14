export interface Notice {
  /** One or two short sentences. */
  message: string
  /** Optional link or phone number after the message. */
  link?: { label: string; href: string }
  /**
   * Last day to show it, as YYYY-MM-DD (New York time). After that the strip takes itself down,
   * even if nobody redeploys.
   */
  until?: string
}

/**
 * Shown in a thin purple strip above the header on every page, for holiday pre-orders, closures
 * and specials. Set it to `null` when there's nothing to say, and the strip goes away.
 *
 * TODO: this one is a sample, written from their Thanksgiving pre-order posts (Instagram, Nov 2022;
 * Facebook, Nov 2024). Confirm with the owners before launch, or set it to null.
 */
export const notice: Notice | null = {
  message: 'Thanksgiving is Nov 26: reserve a whole ube, ube custard, mango, yema or chocolate almond cake.',
  link: { label: 'Call (718) 899-0240', href: 'tel:+17188990240' },
  until: '2026-11-26',
}
