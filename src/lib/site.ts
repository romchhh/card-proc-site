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
    'Подключение Stripe под ключ: аккаунт для приёма платежей, юрлицо и банк, выплаты в EUR, USD и USDT. Комиссия от 1.5%.',
  descriptionUk:
    'Підключення Stripe під ключ: акаунт для прийому платежів, юрособа і банк, виплати в EUR, USD і USDT. Комісія від 1.5%.',
  descriptionEn:
    'Turnkey Stripe setup: payment account, company and bank, payouts in EUR, USD and USDT. Fees from 1.5%.',
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
    'купить stripe аккаунт',
    'арендовать аккаунт stripe',
    'stripe платежная система',
    'платёжная система stripe',
    'stripe для бизнеса',
    'что такое stripe',
    'прием платежей stripe',
    'прием карт онлайн',
    'международные платежи для бизнеса',
    'как работает stripe',
    'stripe checkout',
    'подключение stripe',
    'процессинг stripe',
    'процессинг платежей',
    'payment routing stripe',
    'интеграция stripe',
    'merchant аккаунт stripe',
    'аренда stripe аккаунта',
    'подключение stripe под ключ',
    'WayOfProcessing',
  ],
  keywordsUk: [
    'купити stripe акаунт',
    'орендувати акаунт stripe',
    'stripe платіжна система',
    'платіжна система stripe',
    'stripe для бізнесу',
    'що таке stripe',
    'прийом платежів stripe',
    'приймання карток онлайн',
    'міжнародні платежі для бізнесу',
    'як працює stripe',
    'stripe checkout',
    'підключення stripe',
    'процесинг stripe',
    'процесинг платежів',
    'payment routing stripe',
    'інтеграція stripe',
    'merchant акаунт stripe',
    'оренда stripe акаунта',
    'підключення stripe під ключ',
    'WayOfProcessing',
  ],
  keywordsEn: [
    'buy stripe account',
    'rent stripe account',
    'stripe payment system',
    'stripe for business',
    'what is stripe',
    'accept payments with stripe',
    'online card payments',
    'international payments for business',
    'how does stripe work',
    'stripe checkout',
    'stripe payment processing',
    'stripe integration',
    'payment routing stripe',
    'stripe merchant account',
    'connect stripe business',
    'stripe account setup',
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
      'WayOfProcessing — независимый сервис и не является аффилированным лицом, партнёром или дочерней компанией Stripe, Inc.',
    disclaimerUk:
      'WayOfProcessing — незалежний сервіс і не є афілійованою особою, партнером чи дочірньою компанією Stripe, Inc.',
    disclaimerEn:
      'WayOfProcessing is an independent service and is not affiliated with, endorsed by, or a subsidiary of Stripe, Inc.',
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
