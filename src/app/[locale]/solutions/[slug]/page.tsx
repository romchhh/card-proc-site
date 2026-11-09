import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import ServicePage from '../../../components/ServicePage'
import JsonLdScript from '../../../components/seo/JsonLdScript'
import { isValidLocale, localePath, locales, pickLocaleCopy, type Locale } from '@/lib/i18n/config'
import {
  getLandingByGroupSlug,
  getLandingsByGroup,
  isValidLandingSlug,
} from '@/lib/landings'
import { getLandingServiceImage, landingToServiceView } from '@/lib/landing-as-service'
import { buildServiceJsonLd } from '@/lib/service-seo'
import { buildPageMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

type Props = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return getLandingsByGroup('solutions').flatMap((item) =>
    locales.map((locale) => ({ locale, slug: item.slug })),
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale
  const landing = getLandingByGroupSlug('solutions', slug)
  if (!landing) return {}
  const view = landingToServiceView(landing, locale)

  return buildPageMetadata({
    title: view.meta.title,
    description: view.meta.description,
    path: landing.path,
    locale,
    ogTitle: view.h1,
    ogImage: getLandingServiceImage(landing),
    ogImageAlt: view.h1,
  })
}

export default async function SolutionPage({ params }: Props) {
  const { locale: rawLocale, slug } = await params
  if (!isValidLandingSlug('solutions', slug)) notFound()

  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale
  const landing = getLandingByGroupSlug('solutions', slug)
  if (!landing) notFound()

  const view = landingToServiceView(landing, locale)
  const hubTitle = pickLocaleCopy(locale, {
    ru: 'Решения для Stripe',
    uk: 'Рішення для Stripe',
    en: 'Stripe solutions',
  })

  return (
    <>
      <JsonLdScript
        data={buildServiceJsonLd({
          view,
          slug: landing.slug,
          locale,
          path: landing.path,
          parent: { name: hubTitle, path: '/solutions' },
        })}

      />

      <Navbar transparent />
      <main>
        <ServicePage
          view={view}
          image={getLandingServiceImage(landing)}
          guideGroup="solutions"
          breadcrumbs={[
            { name: siteConfig.name, path: localePath('/', locale) },
            { name: hubTitle, path: localePath('/solutions', locale) },
            { name: view.card.title, path: localePath(landing.path, locale) },
          ]}
        />
      </main>
      <Footer />
    </>
  )
}
