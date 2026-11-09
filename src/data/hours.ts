import type { WeeklyHours } from '../lib/hours.ts'

const at = (hour: number, minute = 0) => hour * 60 + minute

/**
 * Weekly hours from Google Maps, Nov 8, 2026 (the same as Culinary Backstreets lists).
 * Sunday first; `null` = closed. Holiday hours go in src/data/notice.ts.
 */
export const hours: WeeklyHours = [
  { opens: at(8), closes: at(20, 30) }, // Sunday
  { opens: at(9), closes: at(20, 30) }, // Monday
  { opens: at(9), closes: at(20, 30) }, // Tuesday
  { opens: at(9), closes: at(20, 30) }, // Wednesday
  { opens: at(9), closes: at(20, 30) }, // Thursday
  { opens: at(8), closes: at(20, 30) }, // Friday
  { opens: at(8), closes: at(20, 30) }, // Saturday
]

/** Online orders (pickup and delivery) run on shorter hours than the shop. From order.online, Nov 8, 2026. */
export const onlineOrderingHours = '9:30 AM – 5:40 PM'
