import type { Locale } from './i18n/config'
import { pickLocaleCopy } from './i18n/config'

export const siteConfig = {
  name: 'WayOfProcessing',
  title: 'WayOfProcessing — Stripe Payment Processing',
  titleRu: 'Процессинг Stripe для бизнеса | WayOfProcessing',
  titleUk: 'Процесинг Stripe для бізнесу | WayOfProcessing',
  titleEn: 'Stripe Processing for Business | WayOfProcessing',
  description:
    'Stripe processing setup and support: backup payment channel, payouts in EUR, USD and USDT. Fees from 1.5%. Niche review before launch, no approval guarantees.',
  descriptionRu:
    'Подключение и сопровождение процессинга Stripe: резервный канал, выплаты в EUR, USD и USDT. Комиссия от 1.5%. Оценка ниши до старта, без гарантий одобрения.',
  descriptionUk:
    'Підключення і супровід процесингу Stripe: резервний канал, виплати в EUR, USD і USDT. Комісія від 1.5%. Оцінка ніші до старту, без гарантій схвалення.',
  descriptionEn:
    'Stripe processing setup and support: backup payment channel, payouts in EUR, USD and USDT. Fees from 1.5%. Niche review before launch, no approval guarantees.',
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
      'WayOfProcessing — независимый сервис и не аффилирован со Stripe, Inc. Верификация, лимиты и review остаются у Stripe.',
    disclaimerUk:
      'WayOfProcessing — незалежний сервіс і не афілійований зі Stripe, Inc. Верифікація, ліміти і review залишаються у Stripe.',
    disclaimerEn:
      'WayOfProcessing is an independent service and is not affiliated with Stripe, Inc. Verification, limits and review stay with Stripe.',
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
