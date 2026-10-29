import type { BlogLocale, BlogPost } from './blog'
import { localePath } from './i18n/config'
import { absoluteUrl } from './seo'
import { siteConfig } from './site'

const postKeywords: Record<string, { ru: string[]; en: string[] }> = {
  'stripe-for-your-business': {
    ru: ['stripe платежная система', 'платёжная система stripe', 'stripe для бизнеса', 'подключение stripe', 'приём платежей stripe', 'международные платежи'],
    en: ['stripe payment system', 'stripe for business', 'accept stripe payments', 'stripe integration', 'international payments'],
  },
  'stripe-via-php-api': {
    ru: ['интеграция stripe php', 'платёжная система stripe', 'stripe api', 'stripe checkout', 'подключение stripe'],
    en: ['stripe php integration', 'stripe payment system', 'stripe api', 'stripe checkout', 'connect stripe'],
  },
  'fast-payment-system': {
    ru: ['платёжная система интернет-магазин', 'stripe платежная система', 'быстрые платежи', 'checkout интернет-магазин', 'приём платежей stripe'],
    en: ['payment system online store', 'stripe payment system', 'fast payments', 'e-commerce checkout', 'accept stripe payments'],
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
    ru: ['checkout интернет-магазин', 'платёжная система stripe', 'конверсия оплаты', 'apple pay google pay', 'онлайн-оплата'],
    en: ['e-commerce checkout', 'stripe payment system', 'payment conversion', 'apple pay google pay', 'online checkout'],
  },
  'stripe-restricted-business-categories': {
    ru: ['ограничения Stripe', 'запрещённые ниши Stripe', 'форекс Stripe', 'гейминг Stripe', 'high-risk процессинг'],
    en: ['Stripe restrictions', 'restricted Stripe niches', 'forex Stripe', 'gaming Stripe', 'high-risk processing'],
  },
  'stripe-platform-rules': {
    ru: ['stripe платежная система', 'платёжная система stripe', 'правила stripe', 'PCI DSS Level 1', 'подключение stripe'],
    en: ['stripe payment system', 'stripe rules', 'PCI DSS Level 1', 'connect stripe business', 'payment gateway'],
  },
  'how-to-choose-payment-system': {
    ru: ['выбор платёжной системы', 'платёжная система для интернет-магазина', 'stripe vs PayPal', 'платёжный провайдер', 'процессинг 2026'],
    en: ['choose payment system', 'payment system e-commerce', 'Stripe vs PayPal', 'payment provider', 'payment processing 2026'],
  },
  'stripe-wordpress-integration': {
    ru: ['подключение stripe wordpress', 'stripe woocommerce', 'платёжная система wordpress', 'интеграция stripe', 'приём платежей'],
    en: ['connect stripe wordpress', 'stripe woocommerce', 'wordpress payment system', 'stripe integration', 'accept payments'],
  },
  'what-is-stripe-scaling-business': {
    ru: ['что такое stripe', 'stripe платежная система', 'платёжная система stripe', 'международные платежи', 'масштабирование бизнеса'],
    en: ['what is stripe', 'stripe payment system', 'international payments', 'scale online business', 'stripe connect'],
  },
  'stripe-international-payments-integration': {
    ru: ['подключение stripe', 'международные платежи stripe', 'stripe платежная система', 'интеграция stripe', 'приём платежей'],
    en: ['connect stripe', 'stripe international payments', 'stripe payment system', 'stripe integration', 'accept payments'],
  },
  'international-payments-for-business': {
    ru: ['международные платежи', 'stripe для бизнеса', 'платёжная система stripe', 'приём платежей из-за рубежа', 'процессинг'],
    en: ['international payments', 'stripe for business', 'stripe payment system', 'cross-border payments', 'payment processing'],
  },
  'stripe-payment-routing-uptime': {
    ru: ['payment routing stripe', 'платёжная система stripe', 'аптайм 99.9%', 'резервный канал платежей', 'приём платежей без простоев'],
    en: ['stripe payment routing', 'stripe payment system', '99.9% uptime', 'payment failover', 'checkout without downtime'],
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
