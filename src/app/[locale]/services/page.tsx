import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ServiceCard from '../../components/ServiceCard'
import Breadcrumbs from '../../components/seo/Breadcrumbs'
import FaqAccordion from '../../components/seo/FaqAccordion'
import JsonLdScript from '../../components/seo/JsonLdScript'
import ContentTable from '../../components/ContentTable'
import PriorityLinks from '../../components/seo/PriorityLinks'
import { isValidLocale, localePath, pickLocaleCopy, type Locale } from '@/lib/i18n/config'
import { getHubTables } from '@/lib/guide-tables'
import { labelServices } from '@/lib/i18n/labels'
import { absoluteUrl, buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageMetadata, buildWebPageJsonLd } from '@/lib/seo'
import { buildFaqPageJsonLd } from '@/lib/service-seo'
import { SERVICE_SLUGS, getServiceBySlug, getServiceView } from '@/lib/services'
import { siteConfig } from '@/lib/site'
import styles from './hub.module.css'

type Props = { params: Promise<{ locale: string }> }

const HUB_FAQ: Record<Locale, { question: string; answer: string }[]> = {
  ru: [
    {
      question: 'С какой услуги начать?',
      answer: 'Пилот — аренда аккаунта. Свой контур — покупка. Сразу checkout и routing — процессинг под ключ. Долгосрочный стек — юрлицо и банк.',
    },
    {
      question: 'Сколько стоит подключение?',
      answer: 'Комиссия процессинга от 1.5%. Точную ставку и срок называем после проверки ниши и сайта.',
    },
  ],
  uk: [
    {
      question: 'З якої послуги почати?',
      answer: 'Пілот — оренда акаунта. Свій контур — купівля. Одразу checkout і routing — процесинг під ключ. Довгостроковий стек — юрособа і банк.',
    },
    {
      question: 'Скільки коштує підключення?',
      answer: 'Комісія процесингу від 1.5%. Точну ставку і строк називаємо після перевірки ніші та сайту.',
    },
  ],
  en: [
    {
      question: 'Which service should I start with?',
      answer: 'Pilot — account rental. Own access — purchase. Checkout and routing from day one — turnkey processing. Long-term stack — company and bank.',
    },
    {
      question: 'How much does setup cost?',
      answer: 'Processing fees from 1.5%. We quote the exact rate and timeline after reviewing the niche and site.',
    },
  ],
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale

  return buildPageMetadata({
    title: pickLocaleCopy(locale, {
      ru: 'Услуги подключения Stripe | WayOfProcessing',
      uk: 'Послуги підключення Stripe | WayOfProcessing',
      en: 'Stripe setup services | WayOfProcessing',
    }),
    description: pickLocaleCopy(locale, {
      ru: 'Аренда и покупка аккаунта Stripe, процессинг под ключ, юрлицо и банк. Комиссия от 1.5%, запуск от 3 дней.',
      uk: 'Оренда і купівля акаунта Stripe, процесинг під ключ, юрособа і банк. Комісія від 1.5%, запуск від 3 днів.',
      en: 'Rent or buy a Stripe account, turnkey processing, company and bank. Fees from 1.5%, launch from 3 days.',
    }),
    path: '/services',
    locale,
  })
}

export default async function ServicesHubPage({ params }: Props) {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale
  const title = labelServices(locale)
  const description = pickLocaleCopy(locale, {
    ru: 'Четыре формата подключения Stripe: аренда, покупка, процессинг под ключ и комплект юрлицо + банк.',
    uk: 'Чотири формати підключення Stripe: оренда, купівля, процесинг під ключ і комплект юрособа + банк.',
    en: 'Four Stripe setup formats: rental, purchase, turnkey processing, and a company plus bank package.',
  })
  const faq = HUB_FAQ[locale]
  const services = SERVICE_SLUGS.map((slug) => {
    const service = getServiceBySlug(slug)
    if (!service) return null
    const view = getServiceView(service, locale)
    return { slug, title: view.card.title, description: view.card.desc }
  }).filter(Boolean) as { slug: (typeof SERVICE_SLUGS)[number]; title: string; description: string }[]

  const pageUrl = absoluteUrl(localePath('/services', locale))
  const graph = buildGraphJsonLd([
    buildBreadcrumbJsonLd(
      [
        { name: siteConfig.name, path: '/' },
        { name: title, path: '/services' },
      ],
      locale,
    ),
    buildWebPageJsonLd({ title, description, path: '/services', locale, pageType: 'CollectionPage' }),
    {
      '@type': 'ItemList',
      name: title,
      itemListElement: services.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.title,
        url: absoluteUrl(localePath(`/services/${item.slug}`, locale)),
      })),
    },
    buildFaqPageJsonLd(faq, pageUrl),
  ])

  return (
    <>
      <JsonLdScript data={graph} />
      <Navbar />
      <Breadcrumbs
        items={[
          { name: siteConfig.name, path: localePath('/', locale) },
          { name: title, path: localePath('/services', locale) },
        ]}
      />
      <main className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            {pickLocaleCopy(locale, {
              ru: 'Услуги подключения Stripe',
              uk: 'Послуги підключення Stripe',
              en: 'Stripe setup services',
            })}
          </h1>
          <p className={styles.lead}>{description}</p>
          <ul className={styles.links}>
            <li>
              <Link href={localePath('/compare/rent-vs-buy', locale)}>
                {pickLocaleCopy(locale, {
                  ru: 'Сравнить аренду и покупку',
                  uk: 'Порівняти оренду і купівлю',
                  en: 'Compare rent vs buy',
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
              <Link href={localePath('/niches', locale)}>
                {pickLocaleCopy(locale, {
                  ru: 'Stripe для ниш',
                  uk: 'Stripe для ніш',
                  en: 'Stripe niches',
                })}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
            <li>
              <Link href={localePath('/solutions/stripe-ukraine', locale)}>
                {pickLocaleCopy(locale, {
                  ru: 'Stripe для Украины / ФОП',
                  uk: 'Stripe для України / ФОП',
                  en: 'Stripe for Ukraine',
                })}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
            <li>
              <Link href={localePath('/solutions/stripe-account-issues', locale)}>
                {pickLocaleCopy(locale, {
                  ru: 'Блокировки и review Stripe',
                  uk: 'Блокування і review Stripe',
                  en: 'Stripe blocks and review',
                })}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          </ul>
        </header>

        <div className={styles.grid}>
          {services.map((item) => (
            <ServiceCard
              key={item.slug}
              slug={item.slug}
              title={item.title}
              description={item.description}
              href={localePath(`/services/${item.slug}`, locale)}
              titleAs="h2"
            />
          ))}
        </div>

        <div className={styles.guideTables}>
          {getHubTables('services', locale).map((table) => (
            <ContentTable key={table.id} table={table} locale={locale} />
          ))}
        </div>

        <div className={styles.faq}>
          <FaqAccordion
            items={faq}
            heading={pickLocaleCopy(locale, { ru: 'Короткий FAQ', uk: 'Короткий FAQ', en: 'Quick FAQ' })}
          />
        </div>
      </main>
      <PriorityLinks locale={locale} />
      <Footer />
    </>
  )
}
