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

/** Weaker duplicate posts → stronger canonical articles */
const BLOG_MERGES = [
  ['business-categories-stripe', 'stripe-restricted-business-categories'],
  ['fast-payment-system', 'fast-payment-system-ecommerce'],
  ['stripe-for-your-business', 'what-is-stripe-scaling-business'],
  ['international-payments-for-business', 'stripe-international-payments-integration'],
]

const nextConfig = {
  trailingSlash: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: collectImageHostnames(),
  },
  compress: true,
  poweredByHeader: false,
  async redirects() {
    const blogRedirects = BLOG_MERGES.flatMap(([from, to]) =>
      LOCALES.map((locale) => ({
        source: `/${locale}/blog/${from}`,
        destination: `/${locale}/blog/${to}`,
        permanent: true,
      })),
    )
    return blogRedirects
  },
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
    ]
  },
}

module.exports = nextConfig
