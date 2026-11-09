import { esc } from './html.ts'

export interface Photo {
  alt: string
  /** Width ÷ height as shown on the page. Every size is cropped to it, so the space is reserved before it loads. */
  ratio: number
  /** URL for the photo at `width` pixels wide. */
  url(width: number): string
  /** Widths for the srcset, smallest first. */
  widths: readonly number[]
  /** Where a placeholder came from, for credits and for knowing what still needs replacing. */
  source?: string
}

interface UnsplashOptions {
  alt: string
  ratio: number
  /** The photo's Unsplash page and photographer, for the credits. */
  source: string
  widths?: readonly number[]
  /** Focal point for the crop, 0–1 from the left and from the top. Default: the middle. */
  focus?: readonly [x: number, y: number]
  /** Crop the original to this rectangle first (x, y, width, height in original pixels). */
  rect?: readonly [number, number, number, number]
}

/**
 * A placeholder from Unsplash, cropped and resized by their image CDN (imgix parameters), so
 * nothing has to be downloaded or committed. Free to use under the Unsplash License.
 */
export function unsplash(file: string, options: UnsplashOptions): Photo {
  const { alt, ratio, source, widths = [480, 800, 1200], focus, rect } = options
  return {
    alt,
    ratio,
    widths,
    source,
    url(width) {
      const params = new URLSearchParams({
        auto: 'format',
        fit: 'crop',
        q: '68',
        w: String(width),
        h: String(Math.round(width / ratio)),
      })
      if (rect) params.set('rect', rect.join(','))
      if (focus) {
        params.set('crop', 'focalpoint')
        params.set('fp-x', String(focus[0]))
        params.set('fp-y', String(focus[1]))
      }
      return `https://images.unsplash.com/${file}?${params}`
    },
  }
}

/**
 * The client's own photos, once we have them: saved in public/images as `${name}-${width}.jpg`
 * for each of `widths` (already cropped to `ratio`). Swap an entry in src/data/photos.ts from
 * `unsplash(…)` to `local(…)` and nothing else changes.
 */
export function local(name: string, widths: readonly number[], ratio: number, alt: string): Photo {
  return {
    alt,
    ratio,
    widths,
    url: (width) => `/images/${name}-${widths.find((w) => w >= width) ?? widths[widths.length - 1]}.jpg`,
  }
}

export interface ImgOptions {
  /** Width of the default `src`. The height follows from the photo's ratio. */
  width: number
  /** The `sizes` attribute, e.g. `(min-width: 1024px) 33vw, 90vw`. */
  sizes: string
  class?: string
  /** Load right away at high priority. Only for the first screen. */
  priority?: boolean
  /** Empty alt, for photos next to text that already says the same thing. */
  decorative?: boolean
}

export function img(photo: Photo, options: ImgOptions): string {
  const { width, sizes, class: className = '', priority = false, decorative = false } = options
  const height = Math.round(width / photo.ratio)
  const srcset = photo.widths.map((w) => `${photo.url(w)} ${w}w`).join(', ')
  const loading = priority ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'
  const alt = decorative ? '' : esc(photo.alt)
  return `<img src="${esc(photo.url(width))}" srcset="${esc(srcset)}" sizes="${sizes}" width="${width}" height="${height}" alt="${alt}" class="${className}" ${loading}>`
}
