import type { Metadata } from 'next'
import { localeOgLocale, localePath, type Locale } from './i18n/config'
import { siteConfig } from './site'

type PageMetaInput = {
  title: string
  description: string
  path: string
  locale: Locale
  keywords?: string[]
  ogTitle?: string
  ogImage?: string
  ogImageAlt?: string
  noIndex?: boolean
}

type ArticleMetaInput = {
  title: string
  description: string
  path: string
  locale: Locale
  image: string
  imageAlt: string
  publishedTime: string
  modifiedTime?: string
  category: string
  keywords?: string[]
  ogTitle?: string
  noIndex?: boolean
}

const googleBot = {
  index: true,
  follow: true,
  'max-image-preview': 'large' as const,
  'max-snippet': -1,
  'max-video-preview': -1,
}

export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`
}

export function buildHreflangLanguages(path: string) {
  const ruUrl = absoluteUrl(localePath(path, 'ru'))
  const ukUrl = absoluteUrl(localePath(path, 'uk'))
  const enUrl = absoluteUrl(localePath(path, 'en'))

  return {
    ru: ruUrl,
    uk: ukUrl,
    en: enUrl,
    'x-default': ruUrl,
  }
}

export function buildPageAlternates(path: string, locale: Locale) {
  return {
    canonical: absoluteUrl(localePath(path, locale)),
    languages: buildHreflangLanguages(path),
  }
}

function buildHreflang(path: string, locale: Locale) {
  return buildPageAlternates(path, locale)
}

function buildSharedMeta({
  title,
  description,
  ogTitle,
  ogImage,
  ogImageAlt,
  path,
  locale,
  noIndex = false,
}: {
  title: string
  description: string
  keywords?: string[]
  ogTitle?: string
  ogImage?: string
  ogImageAlt?: string
  path: string
  locale: Locale
  noIndex?: boolean
}) {
  const localizedPath = localePath(path, locale)
  const url = absoluteUrl(localizedPath)
  const ogLocale = localeOgLocale(locale)
  const alternateOgLocales = (['ru', 'uk', 'en'] as Locale[])
    .filter((item) => item !== locale)
    .map((item) => localeOgLocale(item))
  const imagePath = ogImage ?? siteConfig.ogImage
  const imageUrl = imagePath.startsWith('http') ? imagePath : absoluteUrl(imagePath)
  const defaultOgAlt =
    locale === 'en'
      ? siteConfig.ogImageAltEn
      : locale === 'uk'
        ? siteConfig.ogImageAltUk
        : siteConfig.ogImageAlt

  return {
    title: { absolute: title },
    description,
    // meta keywords ignored by modern search engines; do not emit
    alternates: noIndex ? undefined : buildHreflang(path, locale),
    robots: noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot },
    other: {
      'content-language': localeOgLocale(locale).replace('_', '-'),
    },
    openGraph: {
      locale: ogLocale,
      alternateLocale: alternateOgLocales,
      url,
      siteName: siteConfig.name,
      title: ogTitle ?? title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: ogImageAlt ?? defaultOgAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: ogTitle ?? title,
      description,
      images: [imageUrl],
    },
  }
}

export function buildPageMetadata({
  title,
  description,
  path,
  locale,
  ogTitle,
  ogImage,
  ogImageAlt,
  noIndex = false,
  keywords,
}: PageMetaInput): Metadata {
  const shared = buildSharedMeta({
    title,
    description,
    ogTitle,
    ogImage,
    ogImageAlt,
    path,
    locale,
    noIndex,
    keywords,
  })

  return {
    ...shared,
    openGraph: {
      ...shared.openGraph,
      type: 'website',
    },
  }
}

export function buildArticleMetadata({
  title,
  description,
  path,
  locale,
  image,
  imageAlt,
  publishedTime,
  modifiedTime,
  category,
  keywords,
  ogTitle,
  noIndex = false,
}: ArticleMetaInput): Metadata {
  const pageTitle = `${title} | ${siteConfig.name}`
  const shared = buildSharedMeta({
    title: pageTitle,
    description,
    ogTitle: ogTitle ?? title,
    path,
    locale,
    keywords,
    noIndex,
  })
  const ogImageUrl = image.startsWith('http') ? image : absoluteUrl(image)

  return {
    ...shared,
    openGraph: {
      ...shared.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime: modifiedTime ?? publishedTime,
      section: category,
      authors: [siteConfig.name],
      tags: keywords,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      ...shared.twitter,
      images: [ogImageUrl],
    },
  }
}

export function breadcrumbItemUrl(path: string, locale: Locale) {
  if (path.startsWith('http')) return path
  if (path.startsWith(`/${locale}`)) return absoluteUrl(path)
  return absoluteUrl(localePath(path, locale))
}

export function buildBreadcrumbJsonLd(
  items: { name: string; path: string }[],
  locale: Locale,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: breadcrumbItemUrl(item.path, locale),
    })),
  }
}

export function buildGraphJsonLd(nodes: Record<string, unknown>[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.map((node) => {
      const rest = { ...node }
      delete rest['@context']
      return rest
    }),
  }
}

export function buildWebPageJsonLd({
  title,
  description,
  path,
  locale,
  dateModified,
  pageType = 'WebPage',
  aboutId,
}: {
  title: string
  description: string
  path: string
  locale: Locale
  dateModified?: string
  pageType?: 'WebPage' | 'PrivacyPolicy' | 'CollectionPage' | 'AboutPage'
  aboutId?: string
}) {
  const localizedPath = localePath(path, locale)
  return {
    '@context': 'https://schema.org',
    '@type': pageType,
    '@id': `${absoluteUrl(localizedPath)}#webpage`,
    url: absoluteUrl(localizedPath),
    name: title,
    description,
    isPartOf: { '@id': `${siteConfig.url}/#website` },
    ...(aboutId ? { about: { '@id': aboutId } } : {}),
    inLanguage: locale,
    ...(dateModified ? { dateModified } : {}),
  }
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
