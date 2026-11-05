import type { Locale } from './i18n/config'
import { pickLocaleCopy } from './i18n/config'

export const siteConfig = {
  name: 'WayOfProcessing',
  title: 'WayOfProcessing — Stripe Payment Processing',
  titleRu: 'Подключение Stripe для бизнеса | WayOfProcessing',
  titleUk: 'Підключення Stripe для бізнесу | WayOfProcessing',
  titleEn: 'Stripe setup for business | WayOfProcessing',
  description:
    'Stripe payment processing for business: account setup, routing and payouts. Honest limits, no false guarantees.',
  descriptionRu:
    'Подключение Stripe для бизнеса: процессынг, merchant-аккаунт, routing и выплаты. Честные ограничения без ложных гарантий.',
  descriptionUk:
    'Підключення Stripe для бізнесу: процесинг, merchant-акаунт, routing і виплати. Чесні обмеження без хибних гарантій.',
  descriptionEn:
    'Stripe setup for business: processing, merchant account, routing and payouts. Honest limits without false guarantees.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wayofprocessing.com',
  email: 'hello@wayofprocessing.com',
  telegram: '@wayofprocessing',
  telegramChannelUrl: 'https://t.me/wayofprocessing',
  telegramOperatorUrl: 'https://t.me/wayofprocessing',
  locale: 'ru_RU',
  alternateLocale: 'en_US',
  ogImage: '/images/hero-stripe.webp',
  ogImageAlt: 'WayOfProcessing — подключение Stripe для бизнеса',
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
    slogan: 'Аренда или покупка аккаунта Stripe — от 1.5%',
    sloganUk: 'Оренда або купівля акаунта Stripe — від 1.5%',
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
      uptime: '99.9%',
      commissionFrom: '1.5%',
    },
    areaServed: ['Worldwide', 'European Union', 'United Kingdom', 'United States', 'CIS'],
  },
  pages: {
    blog: {
      title: 'Блог о Stripe для бизнеса | WayOfProcessing',
      titleUk: 'Блог про Stripe для бізнесу | WayOfProcessing',
      titleEn: 'Stripe for business blog | WayOfProcessing',
      description:
        'Stripe как платёжная система: подключение, checkout, webhooks, routing и приём платежей из-за рубежа.',
      descriptionUk:
        'Stripe як платіжна система: підключення, checkout, webhooks, routing і прийом платежів з-за кордону.',
      descriptionEn:
        'Stripe as a payment system: setup, checkout, webhooks, routing and accepting payments from abroad.',
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
