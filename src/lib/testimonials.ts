import data from '@/data/testimonials.json'
import type { Locale } from './i18n/config'

export type TestimonialItem = {
  id: string
  name: string
  niche: string
  text: string
}

type Localized = { ru: string; uk: string; en: string }

function pick(loc: Localized, locale: Locale): string {
  return loc[locale] ?? loc.ru
}

export function getTestimonialsHeading(locale: Locale): string {
  return pick(data.heading as Localized, locale)
}

export function getTestimonials(locale: Locale): TestimonialItem[] {
  return (data.items as { id: string; name: Localized; niche: Localized; text: Localized }[]).map(
    (item) => ({
      id: item.id,
      name: pick(item.name, locale),
      niche: pick(item.niche, locale),
      text: pick(item.text, locale),
    }),
  )
}
