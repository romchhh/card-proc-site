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
  '/solutions',
  '/compare/rent-vs-buy',
  '/compare/stripe-alternatives',
  '/jurisdictions',
  '/niches',
  '/blog',
  '/site-map',
  '/privacy',
  '/terms',
  '/disclaimer',
] as const

function localizedSitemapEntry(
  path: string,
  locale: Locale,
  lastModified: Date,
) {
  return {
    url: `${siteConfig.url}${localePath(path, locale)}`,
    lastModified,
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
  const homeUpdated = new Date(HOME_UPDATED)
  const privacyUpdated = new Date(PRIVACY_UPDATED)

  const staticEntries = locales.flatMap((locale) =>
    staticPaths.map((path) => {
      const lastModified =
        path === '/blog'
          ? latestPostDate
          : path === '/privacy' || path === '/terms' || path === '/disclaimer'
            ? privacyUpdated
            : path === '/jurisdictions' ||
                path === '/niches' ||
                path === '/solutions' ||
                path === '/site-map'
              ? landingsUpdated
              : path === '/services' || path === '/compare/rent-vs-buy'
                ? servicesUpdated
                : homeUpdated

      return localizedSitemapEntry(path, locale, lastModified)
    }),
  )

  const serviceEntries = locales.flatMap((locale) =>
    SERVICE_SLUGS.map((slug) =>
      localizedSitemapEntry(`/services/${slug}`, locale, servicesUpdated),
    ),
  )

  const landingEntries = locales.flatMap((locale) =>
    getAllLandings().map((landing) =>
      localizedSitemapEntry(landing.path, locale, landingsUpdated),
    ),
  )

  const postEntries = locales.flatMap((locale) =>
    posts
      .filter((post) => isIndexBlogSlug(post.slug))
      .map((post) =>
        localizedSitemapEntry(`/blog/${post.slug}`, locale, new Date(post.date)),
      ),
  )

  return [...staticEntries, ...serviceEntries, ...landingEntries, ...postEntries]
}
