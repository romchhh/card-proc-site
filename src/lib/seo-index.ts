/** Blog posts prioritized for indexing (informational / payment-system intent). */
export const INDEX_BLOG_SLUGS = [
  'stripe-account-rental-high-risk',
  'stripe-chargeback-dispute-prevention',
  'smart-payment-routing-stripe-uptime',
  'stripe-international-payment-integration',
  'what-is-stripe-scaling-business',
  'stripe-platform-rules',
  'how-to-choose-payment-system',
  'stripe-international-payments-integration',
  'fast-payment-system',
  'stripe-restricted-business-categories',
  'stripe-payment-routing-uptime',
  'stripe-webhooks-guide',
  'stripe-via-php-api',
  'stripe-wordpress-integration',
  'stripe-subscriptions-saas',
  'stripe-chargeback-prevention',
] as const

export type IndexBlogSlug = (typeof INDEX_BLOG_SLUGS)[number]

export function isIndexBlogSlug(slug: string): slug is IndexBlogSlug {
  return (INDEX_BLOG_SLUGS as readonly string[]).includes(slug)
}
