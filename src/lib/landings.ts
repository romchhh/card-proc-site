import landingsData from '@/data/landings.json'
import type { Locale } from './i18n/config'

export type LandingGroup = 'jurisdictions' | 'niches' | 'solutions'

export type LandingCta = {
  label: string
  path: string
}

export type LandingFact = {
  label: string
  value: string
}

export type LandingView = {
  meta: {
    title: string
    description: string
    keywords: string[]
  }
  h1: string
  lead: string
  intro: string[]
  sections: { title: string; paragraphs: string[] }[]
  faq: { question: string; answer: string }[]
  ctas: LandingCta[]
  facts?: LandingFact[]
}

export type Landing = {
  slug: string
  group: LandingGroup
  path: string
  priority: number
  ru: LandingView
  uk: LandingView
  en: LandingView
}

type HubKey = 'jurisdictions' | 'niches'

const data = landingsData as {
  hubs: Record<HubKey, Record<Locale, LandingView>>
  landings: Landing[]
}

const landings = data.landings

export const COUNTRY_META: Record<
  string,
  { flag: string; city: string; accent: string }
> = {
  poland: { flag: '🇵🇱', city: 'Warsaw', accent: '#DC143C' },
  estonia: { flag: '🇪🇪', city: 'Tallinn', accent: '#0072CE' },
  'czech-republic': { flag: '🇨🇿', city: 'Prague', accent: '#D7141A' },
  cyprus: { flag: '🇨🇾', city: 'Limassol', accent: '#D4762C' },
  'united-kingdom': { flag: '🇬🇧', city: 'London', accent: '#012169' },
  'hong-kong': { flag: '🇭🇰', city: 'Hong Kong', accent: '#DE2910' },
}

export const NICHE_ICON: Record<string, string> = {
  saas: '/images/clients-icons/saas.svg',
  subscriptions: '/images/clients-icons/subscriptions.svg',
  'online-courses': '/images/clients-icons/courses.svg',
  marketplace: '/images/clients-icons/marketplaces.svg',
  'digital-products': '/images/clients-icons/ecommerce.svg',
  gaming: '/images/clients-icons/gaming.svg',
  forex: '/images/clients-icons/forex.svg',
}

export const NICHE_BADGE: Record<
  string,
  { tone: 'ok' | 'warn' | 'danger'; ru: string; uk: string; en: string }
> = {
  saas: { tone: 'ok', ru: 'Проще оценивается', uk: 'Простіше оцінюється', en: 'Easier to assess' },
  subscriptions: { tone: 'ok', ru: 'Проще оценивается', uk: 'Простіше оцінюється', en: 'Easier to assess' },
  'online-courses': { tone: 'ok', ru: 'Проще оценивается', uk: 'Простіше оцінюється', en: 'Easier to assess' },
  marketplace: { tone: 'ok', ru: 'Проще оценивается', uk: 'Простіше оцінюється', en: 'Easier to assess' },
  'digital-products': { tone: 'ok', ru: 'Проще оценивается', uk: 'Простіше оцінюється', en: 'Easier to assess' },
  gaming: { tone: 'warn', ru: 'Нужна проверка', uk: 'Потрібна перевірка', en: 'Needs review' },
  'high-risk': { tone: 'danger', ru: 'Жёсткий скрининг', uk: 'Жорсткий скринінг', en: 'Strict screening' },
  forex: { tone: 'danger', ru: 'Жёсткий скрининг', uk: 'Жорсткий скринінг', en: 'Strict screening' },
}

export function getAllLandings(): Landing[] {
  return landings
}

export function getLandingsByGroup(group: LandingGroup): Landing[] {
  return landings.filter((item) => item.group === group)
}

export function getLandingByPath(path: string): Landing | undefined {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return landings.find((item) => item.path === normalized)
}

export function getLandingByGroupSlug(group: LandingGroup, slug: string): Landing | undefined {
  return landings.find((item) => item.group === group && item.slug === slug)
}

export function getLandingView(landing: Landing, locale: Locale): LandingView {
  return landing[locale] ?? landing.ru
}

export function getHubView(hub: HubKey, locale: Locale): LandingView {
  return data.hubs[hub][locale] ?? data.hubs[hub].ru
}

export function isValidLandingSlug(group: LandingGroup, slug: string): boolean {
  return landings.some((item) => item.group === group && item.slug === slug)
}

/** Related cards for internal linking (spec §6). */
export function getRelatedLandings(landing: Landing, locale: Locale): { path: string; title: string; lead: string }[] {
  const view = getLandingView(landing, locale)
  const related: { path: string; title: string; lead: string }[] = []

  if (landing.group === 'jurisdictions') {
    const peers = getLandingsByGroup('jurisdictions').filter((item) => item.slug !== landing.slug).slice(0, 2)
    for (const peer of peers) {
      const peerView = getLandingView(peer, locale)
      related.push({ path: peer.path, title: peerView.h1, lead: peerView.lead })
    }
    related.push({
      path: '/services/legal-entity-bank',
      title: locale === 'uk' ? 'Юрособа, банк і Stripe' : locale === 'en' ? 'Entity, bank and Stripe' : 'Юрлицо, банк и Stripe',
      lead: view.ctas[0]?.label ?? '',
    })
    related.push({
      path: '/solutions/stripe-ukraine',
      title: locale === 'uk' ? 'Stripe для України' : locale === 'en' ? 'Stripe for Ukraine' : 'Stripe для Украины',
      lead: getLandingByGroupSlug('solutions', 'stripe-ukraine')
        ? getLandingView(getLandingByGroupSlug('solutions', 'stripe-ukraine')!, locale).lead
        : '',
    })
  }

  if (landing.group === 'niches') {
    const peers = getLandingsByGroup('niches').filter((item) => item.slug !== landing.slug).slice(0, 2)
    for (const peer of peers) {
      const peerView = getLandingView(peer, locale)
      related.push({ path: peer.path, title: peerView.h1, lead: peerView.lead })
    }
    related.push({
      path: '/services/processing-turnkey',
      title: locale === 'uk' ? 'Процесинг під ключ' : locale === 'en' ? 'Turnkey processing' : 'Процессинг под ключ',
      lead: '',
    })
    related.push({
      path: '/solutions/stripe-account-issues',
      title: locale === 'uk' ? 'Блокування Stripe' : locale === 'en' ? 'Stripe account issues' : 'Блокировки Stripe',
      lead: getLandingByGroupSlug('solutions', 'stripe-account-issues')
        ? getLandingView(getLandingByGroupSlug('solutions', 'stripe-account-issues')!, locale).lead
        : '',
    })
  }

  if (landing.group === 'solutions') {
    if (landing.slug === 'stripe-ukraine') {
      related.push({
        path: '/services/legal-entity-bank',
        title: locale === 'uk' ? 'Юрособа, банк і Stripe' : locale === 'en' ? 'Entity, bank and Stripe' : 'Юрлицо, банк и Stripe',
        lead: '',
      })
      related.push({
        path: '/jurisdictions',
        title: locale === 'uk' ? 'Stripe за країнами' : locale === 'en' ? 'Stripe by country' : 'Stripe по странам',
        lead: '',
      })
    } else {
      related.push({
        path: '/services/processing-turnkey',
        title: locale === 'uk' ? 'Процесинг під ключ' : locale === 'en' ? 'Turnkey processing' : 'Процессинг под ключ',
        lead: '',
      })
      related.push({
        path: '/niches',
        title: locale === 'uk' ? 'Stripe для ніш' : locale === 'en' ? 'Stripe niches' : 'Stripe для ниш',
        lead: '',
      })
    }
  }

  return related.slice(0, 4)
}

export function groupEyebrow(group: LandingGroup, locale: Locale): string {
  if (group === 'jurisdictions') {
    return locale === 'uk' ? 'Юрисдикція' : locale === 'en' ? 'Jurisdiction' : 'Юрисдикция'
  }
  if (group === 'niches') {
    return locale === 'uk' ? 'Ніша' : locale === 'en' ? 'Niche' : 'Ниша'
  }
  return locale === 'uk' ? 'Рішення' : locale === 'en' ? 'Solution' : 'Решение'
}
