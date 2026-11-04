import type { Metadata } from 'next'
import Navbar from '../../components/Navbar'
import BlogPage from '../../components/BlogPage'
import Footer from '../../components/Footer'
import Breadcrumbs from '../../components/seo/Breadcrumbs'
import PriorityLinks from '../../components/seo/PriorityLinks'
import JsonLdScript from '../../components/seo/JsonLdScript'
import { buildBlogItemListJsonLd } from '@/lib/blog-seo'
import { getAllPosts, localizePost } from '@/lib/blog'
import { isValidLocale, localePath, pickLocaleCopy, type Locale } from '@/lib/i18n/config'
import { labelBlog } from '@/lib/i18n/labels'
import { absoluteUrl, buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageAlternates, buildPageMetadata, buildWebPageJsonLd } from '@/lib/seo'
import { siteConfig, siteKeywords } from '@/lib/site'

type Props = { params: Promise<{ locale: string }> }

function blogCopy(locale: Locale) {
  return {
    title: pickLocaleCopy(locale, {
      ru: siteConfig.pages.blog.title,
      uk: siteConfig.pages.blog.titleUk,
      en: siteConfig.pages.blog.titleEn,
    }),
    description: pickLocaleCopy(locale, {
      ru: siteConfig.pages.blog.description,
      uk: siteConfig.pages.blog.descriptionUk,
      en: siteConfig.pages.blog.descriptionEn,
    }),
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale
  const copy = blogCopy(locale)

  return {
    ...buildPageMetadata({
      title: copy.title,
      description: copy.description,
      path: '/blog',
      locale,
      keywords: siteKeywords(locale),
    }),
    alternates: {
      ...buildPageAlternates('/blog', locale),
      types: {
        'application/rss+xml': [
          { url: absoluteUrl(localePath('/blog/feed.xml', 'ru')), title: `${siteConfig.name} Blog RSS (RU)` },
          { url: absoluteUrl(localePath('/blog/feed.xml', 'uk')), title: `${siteConfig.name} Blog RSS (UK)` },
          { url: absoluteUrl(localePath('/blog/feed.xml', 'en')), title: `${siteConfig.name} Blog RSS (EN)` },
        ],
      },
    },
  }
}

export default async function Blog({ params }: Props) {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale
  const posts = getAllPosts()
  const blogPath = localePath('/blog', locale)
  const copy = blogCopy(locale)

  const breadcrumb = buildBreadcrumbJsonLd(
    [
      { name: siteConfig.name, path: '/' },
      { name: labelBlog(locale), path: '/blog' },
    ],
    locale,
  )

  const webPage = buildWebPageJsonLd({
    title: copy.title,
    description: copy.description,
    path: '/blog',
    locale,
  })

  const blogSchema = {
    '@type': 'Blog',
    '@id': `${absoluteUrl(blogPath)}#blog`,
    url: absoluteUrl(blogPath),
    name: copy.title,
    description: copy.description,
    publisher: { '@id': `${siteConfig.url}/#organization` },
    blogPost: posts.map((post) => {
      const view = localizePost(post, locale)
      return {
        '@type': 'BlogPosting',
        '@id': `${absoluteUrl(localePath(`/blog/${post.slug}`, locale))}#article`,
        headline: view.title,
        description: view.excerpt,
        datePublished: post.date,
        url: absoluteUrl(localePath(`/blog/${post.slug}`, locale)),
      }
    }),
    inLanguage: locale,
  }

  const itemList = buildBlogItemListJsonLd(posts, locale)

  return (
    <>
      <JsonLdScript data={buildGraphJsonLd([breadcrumb, webPage, blogSchema, itemList])} />
      <Navbar />
      <Breadcrumbs
        items={[
          { name: siteConfig.name, path: localePath('/', locale) },
          { name: labelBlog(locale), path: blogPath },
        ]}
      />
      <main>
        <BlogPage />
      </main>
      <PriorityLinks locale={locale} />
      <Footer />
    </>
  )
}
