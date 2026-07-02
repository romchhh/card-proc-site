import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navbar from '../../../components/Navbar'
import ServicePage from '../../../components/ServicePage'
import Footer from '../../../components/Footer'
import JsonLdScript from '../../../components/seo/JsonLdScript'
import {
  getAllServices,
  getServiceBySlug,
  getServiceView,
  isValidServiceSlug,
  SERVICE_IMAGES,
  type ServiceSlug,
} from '@/lib/services'
import { buildServiceJsonLd } from '@/lib/service-seo'
import { isValidLocale, localeHashPath, localePath, locales, type Locale } from '@/lib/i18n/config'
import { buildPageMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

type Props = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return getAllServices().flatMap((service) =>
    locales.map((locale) => ({ locale, slug: service.slug })),
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale
  const service = getServiceBySlug(slug)
  if (!service) return {}

  const view = getServiceView(service, locale)

  return buildPageMetadata({
    title: view.meta.title,
    description: view.meta.description,
    path: `/services/${service.slug}`,
    locale,
    keywords: view.meta.keywords,
    ogTitle: view.h1,
    ogImage: SERVICE_IMAGES[service.slug as ServiceSlug],
    ogImageAlt: view.h1,
  })
}

export default async function ServiceRoute({ params }: Props) {
  const { locale: rawLocale, slug } = await params
  if (!isValidServiceSlug(slug)) notFound()

  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  const view = getServiceView(service, locale)
  const isEn = locale === 'en'
  const servicePath = localePath(`/services/${slug}`, locale)
  const servicesLabel = isEn ? 'Services' : 'Услуги'

  return (
    <>
      <JsonLdScript data={buildServiceJsonLd({ view, slug, locale })} />
      <Navbar transparent />
      <main>
        <ServicePage
          slug={slug}
          breadcrumbs={[
            { name: siteConfig.name, path: localePath('/', locale) },
            { name: servicesLabel, path: localeHashPath('services', locale) },
            { name: view.card.title, path: servicePath },
          ]}
        />
      </main>
      <Footer />
    </>
  )
}
