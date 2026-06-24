import type { Metadata } from 'next'
import Navbar from '../../components/Navbar'
import PrivacyPage from '../../components/PrivacyPage'
import Footer from '../../components/Footer'
import JsonLdScript from '../../components/seo/JsonLdScript'
import { isValidLocale, type Locale } from '@/lib/i18n/config'
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageMetadata, buildWebPageJsonLd } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale
  const isEn = locale === 'en'

  return buildPageMetadata({
    title: isEn ? siteConfig.pages.privacy.titleEn : siteConfig.pages.privacy.title,
    description: isEn ? siteConfig.pages.privacy.descriptionEn : siteConfig.pages.privacy.description,
    path: '/privacy',
    locale,
    keywords: isEn
      ? [`${siteConfig.name} privacy policy`, 'personal data', 'Stripe processing privacy']
      : [`политика конфиденциальности ${siteConfig.name}`, 'обработка персональных данных', 'privacy policy'],
  })
}

export default async function Privacy({ params }: Props) {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale
  const isEn = locale === 'en'

  const breadcrumb = buildBreadcrumbJsonLd(
    [
      { name: siteConfig.name, path: '/' },
      { name: isEn ? 'Privacy Policy' : 'Политика конфиденциальности', path: '/privacy' },
    ],
    locale,
  )

  const webPage = buildWebPageJsonLd({
    title: isEn ? siteConfig.pages.privacy.titleEn : siteConfig.pages.privacy.title,
    description: isEn ? siteConfig.pages.privacy.descriptionEn : siteConfig.pages.privacy.description,
    path: '/privacy',
    locale,
  })

  return (
    <>
      <JsonLdScript data={buildGraphJsonLd([breadcrumb, webPage])} />
      <Navbar />
      <main>
        <PrivacyPage />
      </main>
      <Footer />
    </>
  )
}
