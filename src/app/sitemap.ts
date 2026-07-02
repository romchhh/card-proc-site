import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { SERVICE_SLUGS } from '@/lib/services'
import { localePath, locales } from '@/lib/i18n/config'
import { siteConfig } from '@/lib/site'

const staticPaths = ['/', '/blog', '/privacy'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const latestPostDate = posts[0] ? new Date(posts[0].date) : new Date()

  const staticEntries = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${siteConfig.url}${localePath(path, locale)}`,
      lastModified: path === '/blog' ? latestPostDate : new Date(),
      changeFrequency: (path === '/privacy' ? 'yearly' : 'weekly') as 'weekly' | 'yearly',
      priority: path === '/' ? 1 : path === '/blog' ? 0.85 : 0.4,
    })),
  )

  const serviceEntries = locales.flatMap((locale) =>
    SERVICE_SLUGS.map((slug) => ({
      url: `${siteConfig.url}${localePath(`/services/${slug}`, locale)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
  )

  const postEntries = locales.flatMap((locale) =>
    posts.map((post) => ({
      url: `${siteConfig.url}${localePath(`/blog/${post.slug}`, locale)}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
  )

  return [...staticEntries, ...serviceEntries, ...postEntries]
}
