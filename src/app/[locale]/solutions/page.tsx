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
import { getLandingView, getLandingsByGroup } from '@/lib/landings'
import { getLandingServiceImage } from '@/lib/landing-as-service'
import { buildFaqPageJsonLd } from '@/lib/service-seo'
import { absoluteUrl, buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageMetadata, buildWebPageJsonLd } from '@/lib/seo'
import { siteConfig } from '@/lib/site'
import styles from '../services/hub.module.css'

type Props = { params: Promise<{ locale: string }> }

const HUB = {
  ru: {
    h1: 'Решения для Stripe',
    title: 'Решения для Stripe: Украина и проблемы с аккаунтом | WayOfProcessing',
    description:
      'Практические решения вокруг Stripe: приём оплаты для бизнеса из Украины и разбор блокировок, review, hold и KYC без ложных гарантий.',
    lead: 'Два отдельных сценария: как принимать оплату, если бизнес связан с Украиной, и что делать, если Stripe ограничил или запросил документы по аккаунту.',
    intro: [
      'Эти страницы не дублируют услуги аренды или покупки. Они отвечают на конкретные запросы: «как принимать оплату из-за границы для украинского проекта» и «аккаунт на review / hold / KYC».',
      'Формат подключения зависит от ниши, юрлица и схемы выплат. Stripe может отказать или запросить дополнительные документы — это фиксируем до старта.',
    ],
    faq: [
      {
        question: 'Чем решения отличаются от услуг?',
        answer:
          'Услуги описывают формат работы (аренда, покупка, процессинг, юрлицо). Решения разбирают ситуацию: Украина или проблемы с уже существующим аккаунтом.',
      },
      {
        question: 'Можно ли гарантировать снятие блокировки?',
        answer:
          'Нет. Мы помогаем собрать ответы и документы под запрос Stripe, но решение принимает Stripe. Если шансов мало, скажем об этом на консультации.',
      },
    ],
    faqHeading: 'Вопросы о решениях для Stripe',
  },
  uk: {
    h1: 'Рішення для Stripe',
    title: 'Рішення для Stripe: Україна та проблеми з акаунтом | WayOfProcessing',
    description:
      'Практичні рішення навколо Stripe: прийом оплати для бізнесу з України та розбір блокувань, review, hold і KYC без хибних гарантій.',
    lead: 'Два окремі сценарії: як приймати оплату, якщо бізнес пов’язаний з Україною, і що робити, якщо Stripe обмежив акаунт або запросив документи.',
    intro: [
      'Ці сторінки не дублюють послуги оренди чи купівлі. Вони відповідають на конкретні запити: «як приймати оплату з-за кордону для українського проєкту» і «акаунт на review / hold / KYC».',
      'Формат підключення залежить від ніші, юрособи та схеми виплат. Stripe може відмовити або запросити додаткові документи — це фіксуємо до старту.',
    ],
    faq: [
      {
        question: 'Чим рішення відрізняються від послуг?',
        answer:
          'Послуги описують формат роботи (оренда, купівля, процесинг, юрособа). Рішення розбирають ситуацію: Україна або проблеми з уже наявним акаунтом.',
      },
      {
        question: 'Чи можна гарантувати зняття блокування?',
        answer:
          'Ні. Ми допомагаємо зібрати відповіді й документи під запит Stripe, але рішення ухвалює Stripe. Якщо шансів мало, скажемо про це на консультації.',
      },
    ],
    faqHeading: 'Питання про рішення для Stripe',
  },
  en: {
    h1: 'Stripe solutions',
    title: 'Stripe solutions: Ukraine and account issues | WayOfProcessing',
    description:
      'Practical Stripe solutions: accepting payments for Ukraine-linked businesses and handling account review, holds and KYC without false guarantees.',
    lead: 'Two separate scenarios: how to accept payments when the business is linked to Ukraine, and what to do if Stripe restricted an account or requested documents.',
    intro: [
      'These pages do not duplicate rental or purchase services. They answer concrete requests: “how to accept payments abroad for a Ukraine-linked project” and “account under review / hold / KYC”.',
      'The setup format depends on niche, legal entity and payout scheme. Stripe may refuse or ask for more documents — we state that before launch.',
    ],
    faq: [
      {
        question: 'How do solutions differ from services?',
        answer:
          'Services describe the working format (rent, buy, processing, entity). Solutions address a situation: Ukraine or problems with an existing account.',
      },
      {
        question: 'Can you guarantee lifting a restriction?',
        answer:
          'No. We help prepare answers and documents for Stripe’s request, but Stripe decides. If chances are low, we say so on the consultation.',
      },
    ],
    faqHeading: 'Questions about Stripe solutions',
  },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale
  const copy = HUB[locale]

  return buildPageMetadata({
    title: copy.title,
    description: copy.description,
    path: '/solutions',
    locale,
    ogTitle: copy.h1,
    ogImage: '/images/landings/issues-hero.webp',
    ogImageAlt: copy.h1,
  })
}

export default async function SolutionsHubPage({ params }: Props) {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale
  const copy = HUB[locale]
  const items = getLandingsByGroup('solutions').map((landing) => {
    const itemView = getLandingView(landing, locale)
    return {
      slug: landing.slug,
      path: landing.path,
      title: itemView.h1,
      description: itemView.lead,
      image: getLandingServiceImage(landing),
    }
  })
  const pageUrl = absoluteUrl(localePath('/solutions', locale))

  const graph = buildGraphJsonLd([
    buildBreadcrumbJsonLd(
      [
        { name: siteConfig.name, path: '/' },
        { name: copy.h1, path: '/solutions' },
      ],
      locale,
    ),
    buildWebPageJsonLd({
      title: copy.h1,
      description: copy.description,
      path: '/solutions',
      locale,
      pageType: 'CollectionPage',
    }),
    {
      '@type': 'ItemList',
      name: copy.h1,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.title,
        url: absoluteUrl(localePath(item.path, locale)),
      })),
    },
    buildFaqPageJsonLd([...copy.faq], pageUrl),
  ])

  return (
    <>
      <JsonLdScript data={graph} />
      <Navbar />
      <Breadcrumbs
        items={[
          { name: siteConfig.name, path: localePath('/', locale) },
          { name: copy.h1, path: localePath('/solutions', locale) },
        ]}
      />
      <main className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>{copy.h1}</h1>
          <p className={styles.lead}>{copy.lead}</p>
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
              <Link href={localePath('/niches', locale)}>
                {pickLocaleCopy(locale, {
                  ru: 'Stripe для ниш',
                  uk: 'Stripe для ніш',
                  en: 'Stripe niches',
                })}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          </ul>
        </header>

        <div className={styles.intro}>
          {copy.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>

        <div className={styles.guideTables}>
          {getHubTables('solutions', locale).map((table) => (
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

        <div className={styles.faq}>
          <FaqAccordion items={[...copy.faq]} heading={copy.faqHeading} />
        </div>
      </main>
      <PriorityLinks locale={locale} />
      <Footer />
    </>
  )
}
