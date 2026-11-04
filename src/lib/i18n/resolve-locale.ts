import { isValidLocale, type Locale } from './config'

/** Normalize i18next / raw language tags to a site Locale. */
export function resolveLocale(value: string | undefined | null): Locale {
  if (!value) return 'ru'
  const base = value.toLowerCase().split('-')[0]
  return isValidLocale(base) ? base : 'ru'
}
