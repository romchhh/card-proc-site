import { getAllPosts } from '@/lib/blog'
import { isValidLocale, localePath } from '@/lib/i18n/config'
import { absoluteUrl, escapeXml } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

type RouteContext = { params: Promise<{ locale: string }> }

export function generateStaticParams() {
  return [{ locale: 'ru' }, { locale: 'en' }]
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { locale: rawLocale } = await params
  const locale = isValidLocale(rawLocale) ? rawLocale : 'ru'
  const isEn = locale === 'en'
  const posts = getAllPosts()
  const channelTitle = escapeXml(isEn ? siteConfig.pages.blog.titleEn : siteConfig.pages.blog.title)
  const channelDescription = escapeXml(
    isEn ? siteConfig.pages.blog.descriptionEn : siteConfig.pages.blog.description,
  )
  const blogPath = localePath('/blog', locale)
  const feedPath = localePath('/blog/feed.xml', locale)
  const feedUrl = absoluteUrl(feedPath)
  const blogUrl = absoluteUrl(blogPath)

  const items = posts
    .map((post) => {
      const view = post[locale]
      const url = absoluteUrl(localePath(`/blog/${post.slug}`, locale))
      const title = escapeXml(view.title)
      const description = escapeXml(view.excerpt)
      const category = escapeXml(view.category)
      const image = escapeXml(absoluteUrl(post.image))

      return `<item>
  <title>${title}</title>
  <link>${url}</link>
  <guid isPermaLink="true">${url}</guid>
  <description>${description}</description>
  <pubDate>${new Date(post.date).toUTCString()}</pubDate>
  <category>${category}</category>
  <enclosure url="${image}" type="image/png" />
</item>`
    })
    .join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${channelTitle}</title>
    <link>${blogUrl}</link>
    <description>${channelDescription}</description>
    <language>${locale}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
