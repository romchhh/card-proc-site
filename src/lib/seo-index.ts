/** Blog posts prioritized for indexing (informational / payment-system intent). */
export const INDEX_BLOG_SLUGS = [
  'stripe-chargeback-prevention',
  'stripe-payment-routing-uptime',
  'stripe-international-payments-integration',
  'what-is-stripe-scaling-business',
  'stripe-platform-rules',
  'how-to-choose-payment-system',
  'fast-payment-system',
  'stripe-restricted-business-categories',
  'stripe-webhooks-guide',
  'stripe-via-php-api',
  'stripe-wordpress-integration',
  'stripe-subscriptions-saas',
  'stripe-account-rental-high-risk',
] as const

export type IndexBlogSlug = (typeof INDEX_BLOG_SLUGS)[number]

export function isIndexBlogSlug(slug: string): slug is IndexBlogSlug {
  return (INDEX_BLOG_SLUGS as readonly string[]).includes(slug)
}

/** Landings removed from index via 301 to hub or sibling (plan 01 §5). */
export const REDIRECTED_LANDING_SLUGS = new Set([
  'czech-republic',
  'cyprus',
  'hong-kong',
  'subscriptions',
  'digital-products',
  'forex',
])

export function isIndexedLandingSlug(slug: string): boolean {
  return !REDIRECTED_LANDING_SLUGS.has(slug)
}
