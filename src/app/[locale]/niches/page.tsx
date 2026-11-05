import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ServiceCard from '../../components/ServiceCard'
import Breadcrumbs from '../../components/seo/Breadcrumbs'
import FaqAccordion from '../../components/seo/FaqAccordion'
import HubRichBody from '../../components/seo/HubRichBody'
import JsonLdScript from '../../components/seo/JsonLdScript'
import ContentTable from '../../components/ContentTable'
import PriorityLinks from '../../components/seo/PriorityLinks'
import { isValidLocale, localePath, pickLocaleCopy, type Locale } from '@/lib/i18n/config'
import { getHubTables } from '@/lib/guide-tables'
import { getHubView, getLandingView, getLandingsByGroup } from '@/lib/landings'
import { getLandingServiceImage } from '@/lib/landing-as-service'
import { buildFaqPageJsonLd } from '@/lib/service-seo'
import { absoluteUrl, buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageMetadata, buildWebPageJsonLd } from '@/lib/seo'
import { siteConfig } from '@/lib/site'
import styles from '../services/hub.module.css'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale
  const view = getHubView('niches', locale)

  return buildPageMetadata({
    title: view.meta.title,
    description: view.meta.description,
    path: '/niches',
    locale,
    ogTitle: view.h1,
    ogImage: '/images/landings/niches-hero.webp',
    ogImageAlt: view.h1,
  })
}

export default async function NichesHubPage({ params }: Props) {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale
  const view = getHubView('niches', locale)
  const items = getLandingsByGroup('niches').map((landing) => {
    const itemView = getLandingView(landing, locale)
    return {
      slug: landing.slug,
      path: landing.path,
      title: itemView.h1,
      description: itemView.lead,
      image: getLandingServiceImage(landing),
    }
  })
  const pageUrl = absoluteUrl(localePath('/niches', locale))

  const graph = buildGraphJsonLd([
    buildBreadcrumbJsonLd(
      [
        { name: siteConfig.name, path: '/' },
        { name: view.h1, path: '/niches' },
      ],
      locale,
    ),
    buildWebPageJsonLd({
      title: view.h1,
      description: view.meta.description,
      path: '/niches',
      locale,
      pageType: 'CollectionPage',
    }),
    {
      '@type': 'ItemList',
      name: view.h1,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.title,
        url: absoluteUrl(localePath(item.path, locale)),
      })),
    },
    buildFaqPageJsonLd(view.faq, pageUrl),
  ])

  return (
    <>
      <JsonLdScript data={graph} />
      <Navbar />
      <Breadcrumbs
        items={[
          { name: siteConfig.name, path: localePath('/', locale) },
          { name: view.h1, path: localePath('/niches', locale) },
        ]}
      />
      <main className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>{view.h1}</h1>
          <p className={styles.lead}>{view.lead}</p>
          <ul className={styles.links}>
            <li>
              <Link href={localePath('/services', locale)}>
                {pickLocaleCopy(locale, {
                  ru: 'Все услуги Stripe',
                  uk: 'Усі послуги Stripe',
                  en: 'All Stripe services',
                })}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
            <li>
              <Link href={localePath('/jurisdictions', locale)}>
                {pickLocaleCopy(locale, {
                  ru: 'Stripe по странам',
                  uk: 'Stripe за країнами',
                  en: 'Stripe by country',
                })}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
            <li>
              <Link href={localePath('/solutions', locale)}>
                {pickLocaleCopy(locale, {
                  ru: 'Решения для Stripe',
                  uk: 'Рішення для Stripe',
                  en: 'Stripe solutions',
                })}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          </ul>
        </header>

        <HubRichBody intro={view.intro} sections={view.sections} />

        <div className={styles.guideTables}>
          {getHubTables('niches', locale).map((table) => (
            <ContentTable key={table.id} table={table} locale={locale} />
          ))}
        </div>

        <div className={styles.grid}>
          {items.map((item) => (
            <ServiceCard
              key={item.slug}
              image={item.image}
              title={item.title}
              description={item.description}
              href={localePath(item.path, locale)}
              titleAs="h2"
            />
          ))}
        </div>

        {view.faq.length > 0 && (
          <div className={styles.faq}>
            <FaqAccordion
              items={view.faq}
              heading={pickLocaleCopy(locale, {
                ru: 'Вопросы о нишах для Stripe',
                uk: 'Питання про ніші для Stripe',
                en: 'Questions about Stripe niches',
              })}
            />
          </div>
        )}
      </main>
      <PriorityLinks locale={locale} />
      <Footer />
    </>
  )
}
