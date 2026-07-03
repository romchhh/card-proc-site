import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { SERVICE_SLUGS } from '@/lib/services'
import { localePath, locales, type Locale } from '@/lib/i18n/config'
import { buildHreflangLanguages } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

const staticPaths = ['/', '/blog', '/privacy'] as const

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

  const staticEntries = locales.flatMap((locale) =>
    staticPaths.map((path) =>
      localizedSitemapEntry(path, locale, {
        lastModified: path === '/blog' ? latestPostDate : new Date(),
        changeFrequency: path === '/privacy' ? 'yearly' : 'weekly',
        priority: path === '/' ? 1 : path === '/blog' ? 0.85 : 0.4,
      }),
    ),
  )

  const serviceEntries = locales.flatMap((locale) =>
    SERVICE_SLUGS.map((slug) =>
      localizedSitemapEntry(`/services/${slug}`, locale, {
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.9,
      }),
    ),
  )

  const postEntries = locales.flatMap((locale) =>
    posts.map((post) =>
      localizedSitemapEntry(`/blog/${post.slug}`, locale, {
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.75,
      }),
    ),
  )

  return [...staticEntries, ...serviceEntries, ...postEntries]
}
