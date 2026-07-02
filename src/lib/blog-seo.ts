import type { BlogLocale, BlogPost } from './blog'
import { localePath } from './i18n/config'
import { absoluteUrl } from './seo'
import { siteConfig } from './site'

const postKeywords: Record<string, { ru: string[]; en: string[] }> = {
  'stripe-for-your-business': {
    ru: ['Stripe для бизнеса', 'приём платежей Stripe', 'Stripe аккаунт в аренду', 'подключение Stripe', 'международные платежи'],
    en: ['Stripe for business', 'Stripe payment acceptance', 'rented Stripe account', 'Stripe integration', 'international payments'],
  },
  'stripe-via-php-api': {
    ru: ['Stripe PHP', 'интеграция Stripe API', 'Stripe Checkout', 'Stripe webhooks PHP', 'платёжный шлюз Stripe'],
    en: ['Stripe PHP', 'Stripe API integration', 'Stripe Checkout', 'Stripe webhooks PHP', 'Stripe payment gateway'],
  },
  'fast-payment-system': {
    ru: ['быстрые платежи', 'checkout интернет-магазин', 'конверсия оплаты', 'Stripe Payment Element', 'payment routing'],
    en: ['fast payments', 'e-commerce checkout', 'payment conversion', 'Stripe Payment Element', 'payment routing'],
  },
  'business-categories-stripe': {
    ru: ['high-risk Stripe', 'ниши Stripe', 'блокировка Stripe', 'прогретый аккаунт', 'процессинг платежей'],
    en: ['high-risk Stripe', 'Stripe niches', 'Stripe account block', 'warmed Stripe account', 'payment processing'],
  },
  'stripe-webhooks-guide': {
    ru: ['Stripe webhooks', 'настройка webhook', 'Stripe-Signature', 'payment_intent.succeeded', 'обработка событий Stripe'],
    en: ['Stripe webhooks', 'webhook setup', 'Stripe-Signature', 'payment_intent.succeeded', 'Stripe event handling'],
  },
  'stripe-subscriptions-saas': {
    ru: ['Stripe подписки', 'рекуррентные платежи', 'Stripe Billing', 'SaaS монетизация', 'trial period Stripe'],
    en: ['Stripe subscriptions', 'recurring payments', 'Stripe Billing', 'SaaS monetisation', 'Stripe trial period'],
  },
  'stripe-chargeback-prevention': {
    ru: ['чарджбек Stripe', 'chargeback rate', 'диспуты Stripe', '3D Secure Stripe', 'защита от возвратов'],
    en: ['Stripe chargeback', 'chargeback rate', 'Stripe disputes', '3D Secure Stripe', 'chargeback protection'],
  },
  'fast-payment-system-ecommerce': {
    ru: ['оплата интернет-магазин', 'Stripe e-commerce', 'Apple Pay Google Pay', 'PCI DSS Stripe', 'онлайн-оплата'],
    en: ['online store payments', 'Stripe e-commerce', 'Apple Pay Google Pay', 'PCI DSS Stripe', 'online checkout'],
  },
  'stripe-restricted-business-categories': {
    ru: ['ограничения Stripe', 'запрещённые ниши Stripe', 'форекс Stripe', 'гейминг Stripe', 'high-risk процессинг'],
    en: ['Stripe restrictions', 'restricted Stripe niches', 'forex Stripe', 'gaming Stripe', 'high-risk processing'],
  },
  'stripe-platform-rules': {
    ru: ['правила Stripe', 'PCI DSS Level 1', 'политика Stripe', 'подключение Stripe СНГ', 'платёжный шлюз'],
    en: ['Stripe rules', 'PCI DSS Level 1', 'Stripe policy', 'Stripe CIS connection', 'payment gateway'],
  },
  'how-to-choose-payment-system': {
    ru: ['выбор платёжной системы', 'Stripe vs PayPal', 'платёжный провайдер', 'Stripe WooCommerce', 'процессинг 2026'],
    en: ['choose payment system', 'Stripe vs PayPal', 'payment provider', 'Stripe WooCommerce', 'payment processing 2026'],
  },
  'stripe-wordpress-integration': {
    ru: ['Stripe WordPress', 'плагин Stripe WooCommerce', 'интеграция Stripe API', 'платежи WordPress', 'Stripe под ключ'],
    en: ['Stripe WordPress', 'Stripe WooCommerce plugin', 'Stripe API integration', 'WordPress payments', 'Stripe turnkey'],
  },
  'what-is-stripe-scaling-business': {
    ru: ['что такое Stripe', 'масштабирование бизнеса', 'международные платежи Stripe', 'Stripe Connect', 'рекуррентные платежи'],
    en: ['what is Stripe', 'scale online business', 'Stripe international payments', 'Stripe Connect', 'recurring payments'],
  },
  'stripe-international-payments-integration': {
    ru: ['международные платежи Stripe', 'интеграция Stripe', 'Stripe СНГ', 'аренда Stripe аккаунта', 'Payoneer вывод'],
    en: ['Stripe international payments', 'Stripe integration', 'Stripe CIS', 'rent Stripe account', 'Payoneer withdrawal'],
  },
  'international-payments-for-business': {
    ru: ['приём международных платежей', 'Stripe для ИП', 'зарубежные рынки', 'международный e-commerce', 'процессинг СНГ'],
    en: ['international payment acceptance', 'Stripe for sole traders', 'foreign markets', 'international e-commerce', 'CIS processing'],
  },
  'stripe-payment-routing-uptime': {
    ru: ['payment routing Stripe', 'аптайм 99.9%', 'резервный Stripe аккаунт', 'отказоустойчивый процессинг', 'маршрутизация платежей'],
    en: ['Stripe payment routing', '99.9% uptime', 'backup Stripe account', 'fault-tolerant processing', 'payment routing'],
  },
}

export function getPostKeywords(post: BlogPost, locale: BlogLocale): string[] {
  const custom = postKeywords[post.slug]?.[locale]
  if (custom) return custom
  const view = post[locale]
  return [view.title, view.category, 'Stripe', siteConfig.name]
}

export function getPostImageUrl(image: string): string {
  return image.startsWith('http') ? image : absoluteUrl(image)
}

export function estimateWordCount(body: string): number {
  return body.split(/\s+/).filter(Boolean).length
}

function excerptArticleBody(body: string, maxLength = 500): string {
  const plain = body.replace(/[#*_`[\]]/g, '').replace(/\n+/g, ' ').trim()
  return plain.length <= maxLength ? plain : `${plain.slice(0, maxLength).trim()}…`
}

export function buildBlogPostingJsonLd(post: BlogPost, locale: BlogLocale = 'ru') {
  const view = post[locale]
  const path = `/blog/${post.slug}`
  const localizedPath = localePath(path, locale)
  const url = absoluteUrl(localizedPath)
  const blogPath = localePath('/blog', locale)

  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: view.title,
    description: view.excerpt,
    image: [getPostImageUrl(post.image)],
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: { '@id': `${siteConfig.url}/#organization` },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
    },
    articleSection: view.category,
    keywords: getPostKeywords(post, locale).join(', '),
    wordCount: estimateWordCount(view.body),
    articleBody: excerptArticleBody(view.body),
    about: getPostKeywords(post, locale).slice(0, 4).map((name) => ({
      '@type': 'Thing',
      name,
    })),
    inLanguage: locale === 'en' ? 'en-US' : 'ru-RU',
    isAccessibleForFree: true,
    isPartOf: { '@id': `${absoluteUrl(blogPath)}#blog` },
    url,
  }
}

export function buildBlogItemListJsonLd(posts: BlogPost[], locale: BlogLocale = 'ru') {
  const blogPath = localePath('/blog', locale)
  return {
    '@type': 'ItemList',
    '@id': `${absoluteUrl(blogPath)}#itemlist`,
    name: locale === 'en' ? `${siteConfig.name} Blog Articles` : `Статьи блога ${siteConfig.name}`,
    numberOfItems: posts.length,
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: post[locale].title,
      url: absoluteUrl(localePath(`/blog/${post.slug}`, locale)),
    })),
  }
}
