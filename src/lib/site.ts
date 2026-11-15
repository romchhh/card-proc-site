import type { Locale } from './i18n/config'
import { pickLocaleCopy } from './i18n/config'

export const siteConfig = {
  name: 'WayOfProcessing',
  title: 'WayOfProcessing — Stripe Payment Processing',
  titleRu: 'Подключение Stripe под ключ для бизнеса | WayOfProcessing',
  titleUk: 'Підключення Stripe під ключ для бізнесу | WayOfProcessing',
  titleEn: 'Turnkey Stripe Setup for Business | WayOfProcessing',
  description:
    'Stripe payment processing for business: turnkey account setup, backup payment channel and payouts. Honest limits, no false guarantees.',
  descriptionRu:
    'Подключение Stripe под ключ: юрлицо, банк и приём платежей. Комиссия от 1.5%. Без обещаний обойти правила Stripe — честная оценка ниши до старта.',
  descriptionUk:
    'Підключення Stripe під ключ: юрособа, банк і прийом платежів. Комісія від 1.5%. Без обіцянок обійти правила Stripe — чесна оцінка ніші до старту.',
  descriptionEn:
    'Turnkey Stripe setup: company, bank and payment acceptance. Fees from 1.5%. No promise to bypass Stripe rules — honest niche review before start.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wayofprocessing.com',
  email: 'hello@wayofprocessing.com',
  telegram: '@wayofprocessing',
  telegramChannelUrl: 'https://t.me/wayofprocessing',
  telegramOperatorUrl: 'https://t.me/wayofprocessing',
  locale: 'ru_RU',
  ogImage: '/images/hero-stripe.webp',
  ogImageAlt: 'Подключение Stripe под ключ — WayOfProcessing',
  ogImageAltUk: 'Підключення Stripe під ключ — WayOfProcessing',
  ogImageAltEn: 'Turnkey Stripe setup — WayOfProcessing',
  company: {
    legalName: 'MSM FINANCIAL CONSULTANCY LIMITED',
    number: '04820256',
    address: '45 Avion Gardens, Kings Hill, West Malling, England, ME19 4RH',
    registryUrl: 'https://find-and-update.company-information.service.gov.uk/company/04820256',
  },
  themeColor: '#635BFF',
  keywordsRu: [
    'подключение stripe',
    'подключение stripe под ключ',
    'stripe платежная система',
    'платёжная система stripe',
    'stripe для бизнеса',
    'прием платежей stripe',
    'международные платежи для бизнеса',
    'процессинг stripe',
    'процессинг платежей',
    'payment routing stripe',
    'интеграция stripe',
    'merchant аккаунт stripe',
    'stripe checkout',
    'WayOfProcessing',
  ],
  keywordsUk: [
    'підключення stripe',
    'підключення stripe під ключ',
    'stripe платіжна система',
    'платіжна система stripe',
    'stripe для бізнесу',
    'прийом платежів stripe',
    'міжнародні платежі для бізнесу',
    'процесинг stripe',
    'процесинг платежів',
    'payment routing stripe',
    'інтеграція stripe',
    'merchant акаунт stripe',
    'stripe checkout',
    'WayOfProcessing',
  ],
  keywordsEn: [
    'stripe payment processing',
    'connect stripe business',
    'stripe account setup',
    'stripe payment system',
    'stripe for business',
    'accept payments with stripe',
    'international payments for business',
    'stripe integration',
    'payment routing stripe',
    'stripe merchant account',
    'stripe checkout',
    'WayOfProcessing',
  ],
  keywords: [
    'stripe платежная система',
    'подключение stripe',
    'stripe payment system',
    'stripe payment processing',
    'WayOfProcessing',
  ],
  seo: {
    slogan: 'Подключение Stripe под ключ — от 1.5%',
    sloganUk: 'Підключення Stripe під ключ — від 1.5%',
    disclaimer:
      'WayOfProcessing — независимый сервис, не аффилирован со Stripe, Inc. Аренда или покупка аккаунта не означает обход правил платформы: верификация, лимиты и review остаются у Stripe.',
    disclaimerUk:
      'WayOfProcessing — незалежний сервіс, не афілійований зі Stripe, Inc. Оренда чи купівля акаунта не означає обхід правил платформи: верифікація, ліміти і review залишаються у Stripe.',
    disclaimerEn:
      'WayOfProcessing is an independent service, not affiliated with Stripe, Inc. Renting or buying an account is not a platform-rules bypass: verification, limits and review stay with Stripe.',
    contentLanguages: 'ru, uk, en',
    knowsAbout: [
      'Stripe payment system',
      'International payment acceptance',
      'Stripe payment processing',
      'Payment routing',
      'Stripe API integration',
      'E-commerce checkout',
      'PCI DSS compliance',
      'Chargeback management',
      'Stripe webhooks',
      'Cross-border payments',
      'Stripe merchant account setup',
      'SaaS billing',
    ],
    stats: {
      commissionFrom: '1.5%',
    },
    areaServed: ['Worldwide', 'European Union', 'United Kingdom', 'United States', 'CIS'],
  },
  pages: {
    blog: {
      title: 'Блог о Stripe и международных платежах | WayOfProcessing',
      titleUk: 'Блог про Stripe і міжнародні платежі | WayOfProcessing',
      titleEn: 'Stripe and International Payments Blog | WayOfProcessing',
      description:
        'Практические материалы по Stripe: интеграция, webhooks, подписки, чарджбэки, правила платформы. Обновляем по мере изменений.',
      descriptionUk:
        'Практичні матеріали по Stripe: інтеграція, webhooks, підписки, чарджбеки, правила платформи. Оновлюємо за мірою змін.',
      descriptionEn:
        'Practical Stripe guides: integration, webhooks, subscriptions, chargebacks and platform rules. Updated as things change.',
    },
    privacy: {
      title: 'Политика конфиденциальности WayOfProcessing',
      titleUk: 'Політика конфіденційності WayOfProcessing',
      titleEn: 'WayOfProcessing Privacy Policy',
      description:
        'Как WayOfProcessing собирает, использует и защищает персональные данные при использовании сайта и отправке заявок.',
      descriptionUk:
        'Як WayOfProcessing збирає, використовує та захищає персональні дані під час користування сайтом і надсилання заявок.',
      descriptionEn:
        'How WayOfProcessing collects, uses and protects personal data when you use our website and contact forms.',
    },
  },
}

export function siteTitle(locale: Locale) {
  return pickLocaleCopy(locale, {
    ru: siteConfig.titleRu,
    uk: siteConfig.titleUk,
    en: siteConfig.titleEn,
  })
}

export function siteDescription(locale: Locale) {
  return pickLocaleCopy(locale, {
    ru: siteConfig.descriptionRu,
    uk: siteConfig.descriptionUk,
    en: siteConfig.descriptionEn,
  })
}

export function siteKeywords(locale: Locale) {
  return pickLocaleCopy(locale, {
    ru: siteConfig.keywordsRu,
    uk: siteConfig.keywordsUk,
    en: siteConfig.keywordsEn,
  })
}

export function companyMetaLine(locale: Locale) {
  return pickLocaleCopy(locale, {
    ru: `Компания зарегистрирована в Англии и Уэльсе, № ${siteConfig.company.number}. Адрес: ${siteConfig.company.address}.`,
    uk: `Компанія зареєстрована в Англії та Вельсі, № ${siteConfig.company.number}. Адреса: ${siteConfig.company.address}.`,
    en: `Registered in England and Wales, company no. ${siteConfig.company.number}. Address: ${siteConfig.company.address}.`,
  })
}

/** Deep-link into Telegram with a trackable start payload (A–Z, 0–9, _). */
export function telegramDeepLink(start?: string): string {
  const base = siteConfig.telegramOperatorUrl
  if (!start) return base
  const payload = start.replace(/[^a-zA-Z0-9_]/g, '_').slice(0, 64)
  return `${base}?start=${encodeURIComponent(payload)}`
}

export function telegramChannelDeepLink(start?: string): string {
  const base = siteConfig.telegramChannelUrl
  if (!start) return base
  const payload = start.replace(/[^a-zA-Z0-9_]/g, '_').slice(0, 64)
  return `${base}?start=${encodeURIComponent(payload)}`
}
