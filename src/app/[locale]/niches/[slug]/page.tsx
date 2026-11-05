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
import { buildServiceJsonLd, getDefaultServiceProcess } from '@/lib/service-seo'
import { buildPageMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

type Props = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return getLandingsByGroup('niches').flatMap((item) =>
    locales.map((locale) => ({ locale, slug: item.slug })),
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale
  const landing = getLandingByGroupSlug('niches', slug)
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

export default async function NichePage({ params }: Props) {
  const { locale: rawLocale, slug } = await params
  if (!isValidLandingSlug('niches', slug)) notFound()

  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale
  const landing = getLandingByGroupSlug('niches', slug)
  if (!landing) notFound()

  const view = landingToServiceView(landing, locale)
  const hubTitle = pickLocaleCopy(locale, {
    ru: 'Ниши для Stripe',
    uk: 'Ніші для Stripe',
    en: 'Niches for Stripe',
  })

  return (
    <>
      <JsonLdScript
        data={buildServiceJsonLd({
          view,
          slug: landing.slug,
          locale,
          path: landing.path,
          parent: { name: hubTitle, path: '/niches' },
          processSteps: getDefaultServiceProcess(locale),
        })}

      />

      <Navbar transparent />
      <main>
        <ServicePage
          view={view}
          image={getLandingServiceImage(landing)}
          guideGroup="niches"
          breadcrumbs={[
            { name: siteConfig.name, path: localePath('/', locale) },
            { name: hubTitle, path: localePath('/niches', locale) },
            { name: view.card.title, path: localePath(landing.path, locale) },
          ]}
        />
      </main>
      <Footer />
    </>
  )
}
