import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navbar from '../../../components/Navbar'
import BlogPostPage from '../../../components/BlogPostPage'
import Footer from '../../../components/Footer'
import ScrollReveal from '../../../components/ScrollReveal'
import Breadcrumbs from '../../../components/seo/Breadcrumbs'
import JsonLdScript from '../../../components/seo/JsonLdScript'
import { buildBlogPostingJsonLd, getPostKeywords } from '@/lib/blog-seo'
import { getAllSlugs, getPostBySlug, getRelatedPosts } from '@/lib/blog'
import { isValidLocale, localePath, locales, type Locale } from '@/lib/i18n/config'
import { absoluteUrl, buildArticleMetadata, buildBreadcrumbJsonLd, buildGraphJsonLd, buildWebPageJsonLd } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

type Props = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return getAllSlugs().flatMap((slug) =>
    locales.map((locale) => ({ locale, slug })),
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale
  const view = post[locale]

  return buildArticleMetadata({
    title: view.title,
    description: view.excerpt,
    path: `/blog/${post.slug}`,
    locale,
    image: post.image,
    imageAlt: view.imageAlt,
    publishedTime: post.date,
    category: view.category,
    keywords: getPostKeywords(post, locale),
    ogTitle: view.title,
  })
}

export default async function BlogPost({ params }: Props) {
  const { locale: rawLocale, slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale
  const view = post[locale]
  const related = getRelatedPosts(slug)
  const postPath = localePath(`/blog/${post.slug}`, locale)
  const isEn = locale === 'en'

  const breadcrumb = buildBreadcrumbJsonLd(
    [
      { name: siteConfig.name, path: '/' },
      { name: isEn ? 'Blog' : 'Блог', path: '/blog' },
      { name: view.title, path: `/blog/${post.slug}` },
    ],
    locale,
  )

  const webPage = buildWebPageJsonLd({
    title: view.title,
    description: view.excerpt,
    path: `/blog/${post.slug}`,
    locale,
  })

  const articleSchema = buildBlogPostingJsonLd(post, locale)

  const relatedList = related.length > 0
    ? {
        '@type': 'ItemList',
        name: isEn ? 'Read also' : 'Читайте также',
        itemListElement: related.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item[locale].title,
          url: absoluteUrl(localePath(`/blog/${item.slug}`, locale)),
        })),
      }
    : null

  const graph = relatedList
    ? buildGraphJsonLd([breadcrumb, webPage, articleSchema, relatedList])
    : buildGraphJsonLd([breadcrumb, webPage, articleSchema])

  return (
    <>
      <JsonLdScript data={graph} />
      <Navbar />
      <Breadcrumbs
        items={[
          { name: siteConfig.name, path: localePath('/', locale) },
          { name: isEn ? 'Blog' : 'Блог', path: localePath('/blog', locale) },
          { name: view.title, path: postPath },
        ]}
      />
      <main>
        <ScrollReveal>
          <BlogPostPage post={post} related={related} />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  )
}
