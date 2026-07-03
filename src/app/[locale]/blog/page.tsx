import type { Metadata } from 'next'
import Navbar from '../../components/Navbar'
import BlogPage from '../../components/BlogPage'
import Footer from '../../components/Footer'
import Breadcrumbs from '../../components/seo/Breadcrumbs'
import JsonLdScript from '../../components/seo/JsonLdScript'
import { buildBlogItemListJsonLd } from '@/lib/blog-seo'
import { getAllPosts } from '@/lib/blog'
import { isValidLocale, localePath, type Locale } from '@/lib/i18n/config'
import { absoluteUrl, buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageAlternates, buildPageMetadata, buildWebPageJsonLd } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale
  const isEn = locale === 'en'

  return {
    ...buildPageMetadata({
      title: isEn ? siteConfig.pages.blog.titleEn : siteConfig.pages.blog.title,
      description: isEn ? siteConfig.pages.blog.descriptionEn : siteConfig.pages.blog.description,
      path: '/blog',
      locale,
      keywords: isEn
        ? [`${siteConfig.name} blog`, 'Stripe articles', 'payment processing', 'Stripe integration', 'payment routing']
        : [`блог ${siteConfig.name}`, 'статьи Stripe', 'процессинг платежей', 'интеграция Stripe', 'payment routing'],
    }),
    alternates: {
      ...buildPageAlternates('/blog', locale),
      types: {
        'application/rss+xml': [
          { url: absoluteUrl(localePath('/blog/feed.xml', 'ru')), title: `${siteConfig.name} Blog RSS (RU)` },
          { url: absoluteUrl(localePath('/blog/feed.xml', 'en')), title: `${siteConfig.name} Blog RSS (EN)` },
        ],
      },
    },
  }
}

export default async function Blog({ params }: Props) {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale
  const isEn = locale === 'en'
  const posts = getAllPosts()
  const blogPath = localePath('/blog', locale)

  const breadcrumb = buildBreadcrumbJsonLd(
    [
      { name: siteConfig.name, path: '/' },
      { name: isEn ? 'Blog' : 'Блог', path: '/blog' },
    ],
    locale,
  )

  const webPage = buildWebPageJsonLd({
    title: isEn ? siteConfig.pages.blog.titleEn : siteConfig.pages.blog.title,
    description: isEn ? siteConfig.pages.blog.descriptionEn : siteConfig.pages.blog.description,
    path: '/blog',
    locale,
  })

  const blogSchema = {
    '@type': 'Blog',
    '@id': `${absoluteUrl(blogPath)}#blog`,
    url: absoluteUrl(blogPath),
    name: isEn ? siteConfig.pages.blog.titleEn : siteConfig.pages.blog.title,
    description: isEn ? siteConfig.pages.blog.descriptionEn : siteConfig.pages.blog.description,
    publisher: { '@id': `${siteConfig.url}/#organization` },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      '@id': `${absoluteUrl(localePath(`/blog/${post.slug}`, locale))}#article`,
      headline: post[locale].title,
      description: post[locale].excerpt,
      datePublished: post.date,
      url: absoluteUrl(localePath(`/blog/${post.slug}`, locale)),
    })),
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
          { name: isEn ? 'Blog' : 'Блог', path: blogPath },
        ]}
      />
      <main>
        <BlogPage />
      </main>
      <Footer />
    </>
  )
}
