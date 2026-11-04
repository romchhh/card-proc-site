import blogData from '@/data/blog.json'
import { isValidServiceSlug, type ServiceSlug } from './services'

export type BlogLocalePost = {
  title: string
  excerpt: string
  category: string
  readTime: string
  imageAlt: string
  body: string
}

export type BlogPost = {
  slug: string
  date: string
  image: string
  ru: BlogLocalePost
  uk?: BlogLocalePost
  en: BlogLocalePost
}

export type BlogPostView = BlogLocalePost & {
  slug: string
  date: string
  image: string
}

export type BlogLocale = 'ru' | 'uk' | 'en'

const posts = blogData.posts as BlogPost[]

export function localizePost(post: BlogPost, locale: BlogLocale): BlogPostView {
  const copy = post[locale] ?? post.ru
  return {
    slug: post.slug,
    date: post.date,
    image: post.image,
    ...copy,
  }
}

export function getAllPosts(): BlogPost[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date))
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug)
}

export function getAllPostViews(locale: BlogLocale): BlogPostView[] {
  return getAllPosts().map((post) => localizePost(post, locale))
}

export function getPostView(slug: string, locale: BlogLocale): BlogPostView | undefined {
  const post = getPostBySlug(slug)
  return post ? localizePost(post, locale) : undefined
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  return getAllPosts().filter((post) => post.slug !== slug).slice(0, limit)
}

const POST_RELATED_SERVICES: Record<string, ServiceSlug[]> = {
  'stripe-for-your-business': ['stripe-account-rent', 'stripe-account-buy', 'processing-turnkey'],
  'stripe-via-php-api': ['processing-turnkey'],
  'fast-payment-system': ['processing-turnkey', 'stripe-account-rent'],
  'business-categories-stripe': ['stripe-account-buy', 'legal-entity-bank'],
  'stripe-webhooks-guide': ['processing-turnkey'],
  'stripe-subscriptions-saas': ['processing-turnkey', 'stripe-account-rent'],
  'stripe-chargeback-prevention': ['processing-turnkey', 'stripe-account-buy'],
  'fast-payment-system-ecommerce': ['processing-turnkey', 'stripe-account-rent'],
  'stripe-restricted-business-categories': ['legal-entity-bank', 'stripe-account-buy'],
  'stripe-platform-rules': ['legal-entity-bank', 'stripe-account-buy'],
  'how-to-choose-payment-system': ['processing-turnkey', 'legal-entity-bank'],
  'stripe-wordpress-integration': ['processing-turnkey'],
  'what-is-stripe-scaling-business': ['stripe-account-buy', 'processing-turnkey'],
  'stripe-international-payments-integration': ['processing-turnkey', 'legal-entity-bank'],
  'international-payments-for-business': ['processing-turnkey', 'legal-entity-bank'],
  'stripe-payment-routing-uptime': ['processing-turnkey', 'stripe-account-rent'],
}

export function getRelatedServiceSlugs(postSlug: string): ServiceSlug[] {
  return (POST_RELATED_SERVICES[postSlug] ?? []).filter(isValidServiceSlug)
}

export const SERVICE_LINK_ANCHORS: Record<BlogLocale, Record<ServiceSlug, string>> = {
  ru: {
    'stripe-account-rent': 'аренда аккаунта Stripe',
    'stripe-account-buy': 'покупка аккаунта Stripe',
    'processing-turnkey': 'процессинг Stripe под ключ',
    'legal-entity-bank': 'юрлицо и банк для Stripe',
  },
  uk: {
    'stripe-account-rent': 'оренда акаунта Stripe',
    'stripe-account-buy': 'купівля акаунта Stripe',
    'processing-turnkey': 'процесинг Stripe під ключ',
    'legal-entity-bank': 'юрособа і банк для Stripe',
  },
  en: {
    'stripe-account-rent': 'rent a Stripe account',
    'stripe-account-buy': 'buy a Stripe account',
    'processing-turnkey': 'turnkey Stripe processing',
    'legal-entity-bank': 'a company and bank for Stripe',
  },
}

export function getAllSlugs(): string[] {
  return posts.map((post) => post.slug)
}

export function formatBlogDate(date: string, locale: string): string {
  const [year, month, day] = date.split('-').map(Number)
  const parsed = new Date(year, month - 1, day)
  const tag = locale === 'en' ? 'en-GB' : locale === 'uk' ? 'uk-UA' : 'ru-RU'
  return parsed.toLocaleDateString(tag, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
