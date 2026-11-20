/** 0 = Sunday … 6 = Saturday, matching `Date#getDay()`. */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface OpeningHours {
  /** Minutes after midnight, e.g. `9 * 60` for 9 AM. */
  opens: number
  /** Minutes after midnight. */
  closes: number
}

type Day = OpeningHours | null

/** One entry per weekday, Sunday first. `null` means closed all day. */
export type WeeklyHours = readonly [Day, Day, Day, Day, Day, Day, Day]

export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const
const SHORT_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const

/** Monday-first order for printed hours. */
export const WEEK_ORDER: readonly Weekday[] = [1, 2, 3, 4, 5, 6, 0]

/** 510 → "8:30 AM", 1230 → "8:30 PM", 540 → "9 AM". */
export function formatTime(minutes: number): string {
  const hour = Math.floor(minutes / 60) % 24
  const minute = minutes % 60
  const suffix = hour < 12 ? 'AM' : 'PM'
  const clock = hour % 12 || 12
  return minute ? `${clock}:${String(minute).padStart(2, '0')} ${suffix}` : `${clock} ${suffix}`
}

export function formatHours(day: Day): string {
  return day ? `${formatTime(day.opens)} – ${formatTime(day.closes)}` : 'Closed'
}

/** 24-hour "HH:MM" for schema.org, e.g. 1230 → "20:30". */
export function toIsoTime(minutes: number): string {
  return `${String(Math.floor(minutes / 60) % 24).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`
}

/** Collapses consecutive days with the same hours: `{ days: 'Mon–Thu', hours: '9 AM – 8:30 PM' }`. */
export function summarizeWeek(week: WeeklyHours, order: readonly Weekday[] = WEEK_ORDER): { days: string; hours: string }[] {
  const groups: { days: Weekday[]; hours: string }[] = []
  for (const day of order) {
    const hours = formatHours(week[day])
    const last = groups.at(-1)
    if (last?.hours === hours) last.days.push(day)
    else groups.push({ days: [day], hours })
  }
  return groups.map(({ days, hours }) => {
    const first = SHORT_DAYS[days[0]]
    const last = SHORT_DAYS[days[days.length - 1]]
    return { days: first === last ? first : `${first}–${last}`, hours }
  })
}

export interface ZonedTime {
  day: Weekday
  /** Minutes after midnight. */
  minutes: number
}

/** The current weekday and time at the shop, whatever the visitor's own time zone. */
export function nowInNewYork(now = new Date()): ZonedTime {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(now)
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? ''
  const day = SHORT_DAYS.indexOf(part('weekday') as (typeof SHORT_DAYS)[number])
  return {
    day: (day === -1 ? now.getDay() : day) as Weekday,
    minutes: Number(part('hour')) * 60 + Number(part('minute')),
  }
}

export interface OpenStatus {
  state: 'open' | 'closing' | 'closed'
  label: string
}

/** "Open now · until 8:30 PM", "Closed · opens tomorrow at 9 AM", and so on. */
export function getOpenStatus(week: WeeklyHours, now: ZonedTime): OpenStatus {
  const today = week[now.day]
  if (today && now.minutes >= today.opens && now.minutes < today.closes) {
    const closingSoon = today.closes - now.minutes <= 45
    return {
      state: closingSoon ? 'closing' : 'open',
      label: `${closingSoon ? 'Closing soon' : 'Open now'} · until ${formatTime(today.closes)}`,
    }
  }
  if (today && now.minutes < today.opens) {
    return { state: 'closed', label: `Closed · opens at ${formatTime(today.opens)}` }
  }
  for (let offset = 1; offset <= 7; offset++) {
    const day = ((now.day + offset) % 7) as Weekday
    const next = week[day]
    if (next) {
      const when = offset === 1 ? 'tomorrow' : DAY_NAMES[day]
      return { state: 'closed', label: `Closed · opens ${when} at ${formatTime(next.opens)}` }
    }
  }
  return { state: 'closed', label: 'Closed' }
}
