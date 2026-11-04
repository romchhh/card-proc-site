import { pickLocaleCopy, type Locale } from './config'

export function labelServices(locale: Locale) {
  return pickLocaleCopy(locale, { ru: 'Услуги', uk: 'Послуги', en: 'Services' })
}

export function labelAbout(locale: Locale) {
  return pickLocaleCopy(locale, { ru: 'О компании', uk: 'Про компанію', en: 'About the company' })
}

export function labelClients(locale: Locale) {
  return pickLocaleCopy(locale, {
    ru: 'Клиенты по сферам',
    uk: 'Клієнти за сферами',
    en: 'Clients by sector',
  })
}

export function labelContacts(locale: Locale) {
  return pickLocaleCopy(locale, { ru: 'Контакты', uk: 'Контакти', en: 'Contacts' })
}

export function labelBlog(locale: Locale) {
  return pickLocaleCopy(locale, { ru: 'Блог', uk: 'Блог', en: 'Blog' })
}

export function labelPrivacy(locale: Locale) {
  return pickLocaleCopy(locale, {
    ru: 'Политика конфиденциальности',
    uk: 'Політика конфіденційності',
    en: 'Privacy policy',
  })
}

export function labelTerms(locale: Locale) {
  return pickLocaleCopy(locale, { ru: 'Условия', uk: 'Умови', en: 'Terms' })
}

export function labelDisclaimer(locale: Locale) {
  return pickLocaleCopy(locale, {
    ru: 'Отказ от ответственности',
    uk: 'Відмова від відповідальності',
    en: 'Disclaimer',
  })
}

export function labelSiteMap(locale: Locale) {
  return pickLocaleCopy(locale, { ru: 'Карта сайта', uk: 'Карта сайту', en: 'Site map' })
}

export function labelReadAlso(locale: Locale) {
  return pickLocaleCopy(locale, { ru: 'Читайте также', uk: 'Читайте також', en: 'Read also' })
}

export function labelAnd(locale: Locale) {
  return pickLocaleCopy(locale, { ru: ' и ', uk: ' і ', en: ' and ' })
}

export function labelMainPages(locale: Locale) {
  return pickLocaleCopy(locale, {
    ru: 'Основные страницы',
    uk: 'Основні сторінки',
    en: 'Main pages',
  })
}
