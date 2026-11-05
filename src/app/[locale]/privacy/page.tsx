import type { Metadata } from 'next'
import Navbar from '../../components/Navbar'
import PrivacyPage from '../../components/PrivacyPage'
import Footer from '../../components/Footer'
import Breadcrumbs from '../../components/seo/Breadcrumbs'
import JsonLdScript from '../../components/seo/JsonLdScript'
import { isValidLocale, localePath, pickLocaleCopy, type Locale } from '@/lib/i18n/config'
import { labelPrivacy } from '@/lib/i18n/labels'
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageMetadata, buildWebPageJsonLd } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

type Props = { params: Promise<{ locale: string }> }

function privacyCopy(locale: Locale) {
  return {
    title: pickLocaleCopy(locale, {
      ru: siteConfig.pages.privacy.title,
      uk: siteConfig.pages.privacy.titleUk,
      en: siteConfig.pages.privacy.titleEn,
    }),
    description: pickLocaleCopy(locale, {
      ru: siteConfig.pages.privacy.description,
      uk: siteConfig.pages.privacy.descriptionUk,
      en: siteConfig.pages.privacy.descriptionEn,
    }),
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale
  const copy = privacyCopy(locale)

  return buildPageMetadata({
    title: copy.title,
    description: copy.description,
    path: '/privacy',
    locale,
  })
}

export default async function Privacy({ params }: Props) {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale
  const copy = privacyCopy(locale)

  const breadcrumb = buildBreadcrumbJsonLd(
    [
      { name: siteConfig.name, path: '/' },
      { name: labelPrivacy(locale), path: '/privacy' },
    ],
    locale,
  )

  const webPage = buildWebPageJsonLd({
    title: copy.title,
    description: copy.description,
    path: '/privacy',
    locale,
    pageType: 'PrivacyPolicy',
  })

  return (
    <>
      <JsonLdScript data={buildGraphJsonLd([breadcrumb, webPage])} />
      <Navbar />
      <Breadcrumbs
        items={[
          { name: siteConfig.name, path: localePath('/', locale) },
          { name: labelPrivacy(locale), path: localePath('/privacy', locale) },
        ]}
      />
      <main>
        <PrivacyPage />
      </main>
      <Footer />
    </>
  )
}
