export const locales = ['ru', 'uk', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'ru'

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export function localePath(path: string, locale: Locale): string {
  const [pathname, hash = ''] = path.split('#')
  const normalized =
    !pathname || pathname === '/' ? '' : pathname.startsWith('/') ? pathname : `/${pathname}`
  const localized = normalized === '' ? `/${locale}` : `/${locale}${normalized}`
  return hash ? `${localized}#${hash}` : localized
}

export function localeHashPath(hash: string, locale: Locale): string {
  const id = hash.startsWith('#') ? hash.slice(1) : hash
  return `${localePath('/', locale)}#${id}`
}

export function stripLocalePrefix(pathname: string): string {
  for (const locale of locales) {
    if (pathname === `/${locale}`) return '/'
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1)
    }
  }
  return pathname
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const segment = pathname.split('/').filter(Boolean)[0]
  return segment && isValidLocale(segment) ? segment : null
}

export function switchLocalePath(pathname: string, locale: Locale): string {
  return localePath(stripLocalePrefix(pathname), locale)
}

export function localeOgLocale(locale: Locale): string {
  if (locale === 'en') return 'en_US'
  if (locale === 'uk') return 'uk_UA'
  return 'ru_RU'
}

export function localeHtmlLang(locale: Locale): string {
  return locale
}

export function localeDateTag(locale: Locale): string {
  if (locale === 'en') return 'en-GB'
  if (locale === 'uk') return 'uk-UA'
  return 'ru-RU'
}

/** Prefer explicit locale copy; fall back RU → UK → EN. */
export function pickLocaleCopy<T>(
  locale: Locale,
  copies: { ru: T; uk?: T; en: T },
): T {
  if (locale === 'en') return copies.en
  if (locale === 'uk') return copies.uk ?? copies.ru
  return copies.ru
}
