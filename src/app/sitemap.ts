import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { HOME_UPDATED, LANDINGS_UPDATED, PRIVACY_UPDATED, SERVICES_UPDATED } from '@/lib/content-dates'
import { isIndexBlogSlug } from '@/lib/seo-index'
import { getAllLandings } from '@/lib/landings'
import { SERVICE_SLUGS } from '@/lib/services'
import { localePath, locales, type Locale } from '@/lib/i18n/config'
import { buildHreflangLanguages } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

const staticPaths = [
  '/',
  '/about',
  '/clients',
  '/contacts',
  '/services',
  '/compare/rent-vs-buy',
  '/jurisdictions',
  '/niches',
  '/blog',
  '/site-map',
  '/privacy',
  '/terms',
  '/disclaimer',
] as const

const STATIC_PRIORITY: Record<(typeof staticPaths)[number], number> = {
  '/': 1,
  '/about': 0.7,
  '/clients': 0.66,
  '/contacts': 0.6,
  '/services': 0.9,
  '/compare/rent-vs-buy': 0.85,
  '/jurisdictions': 0.86,
  '/niches': 0.83,
  '/blog': 0.65,
  '/site-map': 0.45,
  '/privacy': 0.3,
  '/terms': 0.3,
  '/disclaimer': 0.3,
}

function localizedSitemapEntry(
  path: string,
  locale: Locale,
  options: {
    lastModified: Date
    changeFrequency: 'weekly' | 'monthly' | 'yearly'
    priority: number
  },
) {
  return {
    url: `${siteConfig.url}${localePath(path, locale)}`,
    lastModified: options.lastModified,
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates: {
      languages: buildHreflangLanguages(path),
    },
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const latestPostDate = posts[0] ? new Date(posts[0].date) : new Date()
  const landingsUpdated = new Date(LANDINGS_UPDATED)
  const servicesUpdated = new Date(SERVICES_UPDATED)

  const staticEntries = locales.flatMap((locale) =>
    staticPaths.map((path) =>
      localizedSitemapEntry(path, locale, {
        lastModified:
          path === '/blog'
            ? latestPostDate
            : path === '/privacy' || path === '/terms' || path === '/disclaimer'
              ? new Date(PRIVACY_UPDATED)
              : path === '/jurisdictions' || path === '/niches' || path === '/site-map'
                ? landingsUpdated
                : path === '/services' || path === '/compare/rent-vs-buy'
                  ? servicesUpdated
                  : new Date(HOME_UPDATED),
        changeFrequency:
          path === '/privacy' || path === '/terms' || path === '/disclaimer' ? 'yearly' : 'weekly',
        priority: STATIC_PRIORITY[path],
      }),
    ),
  )

  const serviceEntries = locales.flatMap((locale) =>
    SERVICE_SLUGS.map((slug) =>
      localizedSitemapEntry(`/services/${slug}`, locale, {
        lastModified: servicesUpdated,
        changeFrequency: 'weekly',
        priority: slug === 'processing-turnkey' ? 0.92 : 0.88,
      }),
    ),
  )

  const landingEntries = locales.flatMap((locale) =>
    getAllLandings().map((landing) =>
      localizedSitemapEntry(landing.path, locale, {
        lastModified: landingsUpdated,
        changeFrequency: 'weekly',
        priority: landing.priority,
      }),
    ),
  )

  const postEntries = locales.flatMap((locale) =>
    posts
      .filter((post) => isIndexBlogSlug(post.slug))
      .map((post) =>
        localizedSitemapEntry(`/blog/${post.slug}`, locale, {
          lastModified: new Date(post.date),
          changeFrequency: 'monthly',
          priority: 0.62,
        }),
      ),
  )

  return [...staticEntries, ...serviceEntries, ...landingEntries, ...postEntries]
}
