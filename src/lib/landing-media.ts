import type { Landing, LandingGroup } from './landings'

/** Hero images for landings — local WebP under /public/images/landings */
export const LANDING_HERO: Record<string, { src: string; altRu: string; altUk: string; altEn: string }> = {
  poland: {
    src: '/images/landings/poland-hero.webp',
    altRu: 'Панорама Варшавы',
    altUk: 'Панорама Варшави',
    altEn: 'Warsaw skyline panorama',
  },
  estonia: {
    src: '/images/landings/estonia-hero.webp',
    altRu: 'Таллинн на закате: башни старого города',
    altUk: 'Таллінн на заході: вежі старого міста',
    altEn: 'Tallinn at sunset: Old Town towers',
  },
  'czech-republic': {
    src: '/images/landings/czech-hero.webp',
    altRu: 'Карлов мост и Прага',
    altUk: 'Карлів міст і Прага',
    altEn: 'Charles Bridge and Prague',
  },
  cyprus: {
    src: '/images/landings/cyprus-hero.webp',
    altRu: 'Марина Лимассола на закате',
    altUk: 'Марина Лімасола на заході',
    altEn: 'Limassol marina at sunset',
  },
  'united-kingdom': {
    src: '/images/landings/uk-hero.webp',
    altRu: 'Тауэрский мост и Темза в Лондоне',
    altUk: 'Тауерський міст і Темза в Лондоні',
    altEn: 'Tower Bridge and the Thames in London',
  },
  'hong-kong': {
    src: '/images/landings/hongkong-hero.webp',
    altRu: 'Скайлайн Гонконга у Victoria Harbour',
    altUk: 'Скайлайн Гонконгу у Victoria Harbour',
    altEn: 'Hong Kong skyline at Victoria Harbour',
  },
  saas: {
    src: '/images/landings/saas-hero.webp',
    altRu: 'Аналитика и дашборд SaaS',
    altUk: 'Аналітика і дашборд SaaS',
    altEn: 'SaaS analytics dashboard',
  },
  subscriptions: {
    src: '/images/landings/niches-hero.webp',
    altRu: 'Оплата картой в онлайн-сервисе',
    altUk: 'Оплата карткою в онлайн-сервісі',
    altEn: 'Card payment in an online service',
  },
  'online-courses': {
    src: '/images/landings/niches-hero.webp',
    altRu: 'Онлайн-оплата цифрового продукта',
    altUk: 'Онлайн-оплата цифрового продукту',
    altEn: 'Online payment for a digital product',
  },
  marketplace: {
    src: '/images/landings/saas-hero.webp',
    altRu: 'Рабочее место с аналитикой продаж',
    altUk: 'Робоче місце з аналітикою продажів',
    altEn: 'Workspace with sales analytics',
  },
  'digital-products': {
    src: '/images/landings/niches-hero.webp',
    altRu: 'Цифровая покупка и checkout',
    altUk: 'Цифрова покупка і checkout',
    altEn: 'Digital purchase checkout',
  },
  gaming: {
    src: '/images/service-processing.webp',
    altRu: 'Процессинг платежей для digital-проектов',
    altUk: 'Процесинг платежів для digital-проєктів',
    altEn: 'Payment processing for digital projects',
  },
  'high-risk': {
    src: '/images/landings/issues-hero.webp',
    altRu: 'Документы и проверка бизнес-модели',
    altUk: 'Документи і перевірка бізнес-моделі',
    altEn: 'Documents and business model review',
  },
  forex: {
    src: '/images/service-legal.webp',
    altRu: 'Юридическая подготовка платёжного контура',
    altUk: 'Юридична підготовка платіжного контуру',
    altEn: 'Legal preparation of a payment stack',
  },
  'stripe-ukraine': {
    src: '/images/landings/ukraine-hero.webp',
    altRu: 'Международные платежи и карты',
    altUk: 'Міжнародні платежі і картки',
    altEn: 'International cards and payments',
  },
  'stripe-account-issues': {
    src: '/images/landings/issues-hero.webp',
    altRu: 'Разбор документов и статусов аккаунта',
    altUk: 'Розбір документів і статусів акаунта',
    altEn: 'Reviewing account documents and statuses',
  },
}

export const HUB_HERO: Record<
  'jurisdictions' | 'niches',
  { src: string; altRu: string; altUk: string; altEn: string }
> = {
  jurisdictions: {
    src: '/images/landings/poland-hero.webp',
    altRu: 'Европейский городской пейзаж для юрисдикций Stripe',
    altUk: 'Європейський міський пейзаж для юрисдикцій Stripe',
    altEn: 'European cityscape for Stripe jurisdictions',
  },
  niches: {
    src: '/images/landings/niches-hero.webp',
    altRu: 'Приём онлайн-платежей для разных ниш',
    altUk: 'Прийом онлайн-платежів для різних ніш',
    altEn: 'Accepting online payments across niches',
  },
}

export function getLandingHero(landing: Landing) {
  return LANDING_HERO[landing.slug] ?? HUB_HERO[landing.group as 'jurisdictions' | 'niches'] ?? HUB_HERO.niches
}

export function getHubHero(group: Extract<LandingGroup, 'jurisdictions' | 'niches'>) {
  return HUB_HERO[group]
}
