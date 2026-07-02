import type { ServiceFaqItem, ServiceSlug, ServiceView } from './services'
import { localeHashPath, localePath, type Locale } from './i18n/config'
import { absoluteUrl, buildGraphJsonLd, breadcrumbItemUrl } from './seo'
import { siteConfig } from './site'

export function buildFaqPageJsonLd(
  faqItems: ServiceFaqItem[],
  pageUrl: string,
  id = '#faq',
) {
  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl}${id}`,
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function buildServiceJsonLd({
  view,
  slug,
  locale,
}: {
  view: ServiceView
  slug: ServiceSlug
  locale: Locale
}) {
  const path = `/services/${slug}`
  const localizedPath = localePath(path, locale)
  const pageUrl = absoluteUrl(localizedPath)

  return buildGraphJsonLd([
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: siteConfig.name,
          item: absoluteUrl(localePath('/', locale)),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: locale === 'en' ? 'Services' : 'Услуги',
          item: breadcrumbItemUrl(localeHashPath('services', locale), locale),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: view.h1,
          item: pageUrl,
        },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: view.meta.title,
      description: view.meta.description,
      isPartOf: { '@id': `${siteConfig.url}/#website` },
      about: { '@id': `${pageUrl}#service` },
      inLanguage: locale,
    },
    {
      '@type': 'Service',
      '@id': `${pageUrl}#service`,
      name: view.h1,
      description: view.lead,
      url: pageUrl,
      provider: { '@id': `${siteConfig.url}/#organization` },
      areaServed: siteConfig.seo.areaServed.map((name) => ({
        '@type': 'Place',
        name,
      })),
      offers: {
        '@type': 'Offer',
        url: absoluteUrl(`${localePath('/', locale)}#kontakt`),
        availability: 'https://schema.org/InStock',
      },
    },
    buildFaqPageJsonLd(view.faq, pageUrl),
  ])
}
