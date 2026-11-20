/** @type {import('next').NextConfig} */
const blogData = require('./src/data/blog.json')

const EXTRA_IMAGE_HOSTS = ['images.unsplash.com']

function collectImageHostnames() {
  const hostnames = new Set(EXTRA_IMAGE_HOSTS)

  for (const post of blogData.posts) {
    const image = post.image
    if (typeof image !== 'string' || !image.startsWith('http')) continue

    try {
      hostnames.add(new URL(image).hostname)
    } catch {
      // skip invalid URLs
    }
  }

  return [...hostnames].sort().map((hostname) => ({
    protocol: 'https',
    hostname,
  }))
}

const LOCALES = ['ru', 'uk', 'en']

/** Paths consolidated per SEO plan 01 (301). */
const SEO_REDIRECTS = [
  ['/jurisdictions/czech-republic', '/jurisdictions#czech-republic'],
  ['/jurisdictions/cyprus', '/jurisdictions#cyprus'],
  ['/jurisdictions/hong-kong', '/jurisdictions#hong-kong'],
  ['/niches/subscriptions', '/niches/saas'],
  ['/niches/digital-products', '/niches/online-courses'],
  ['/niches/forex', '/niches/high-risk'],
  // Blog slug aliases → canonical
  ['/blog/stripe-chargeback-dispute-prevention', '/blog/stripe-chargeback-prevention'],
  ['/blog/smart-payment-routing-stripe-uptime', '/blog/stripe-payment-routing-uptime'],
  ['/blog/stripe-international-payment-integration', '/blog/stripe-international-payments-integration'],
  ['/blog/fast-payment-system-ecommerce', '/blog/fast-payment-system'],
  ['/blog/international-payments-for-business', '/blog/stripe-international-payments-integration'],
]

const nextConfig = {
  trailingSlash: false,
  async redirects() {
    const entries = []
    for (const locale of LOCALES) {
      for (const [from, to] of SEO_REDIRECTS) {
        entries.push({
          source: `/${locale}${from}`,
          destination: `/${locale}${to}`,
          permanent: true,
        })
      }
    }
    return entries
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: collectImageHostnames(),
  },
  compress: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
          },
        ],
      },
      {
        source: '/llms.txt',
        headers: [{ key: 'Content-Type', value: 'text/markdown; charset=utf-8' }],
      },
      {
        source: '/.well-known/api-catalog',
        headers: [{ key: 'Content-Type', value: 'application/linkset+json; charset=utf-8' }],
      },
    ]
  },
}

module.exports = nextConfig
