/** Blog posts prioritized for indexing (informational / payment-system intent). */
export const INDEX_BLOG_SLUGS = [
  'what-is-stripe-scaling-business',
  'stripe-platform-rules',
  'how-to-choose-payment-system',
  'stripe-international-payments-integration',
  'fast-payment-system-ecommerce',
  'stripe-restricted-business-categories',
  'stripe-payment-routing-uptime',
] as const

export type IndexBlogSlug = (typeof INDEX_BLOG_SLUGS)[number]

export function isIndexBlogSlug(slug: string): slug is IndexBlogSlug {
  return (INDEX_BLOG_SLUGS as readonly string[]).includes(slug)
}
