import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import Breadcrumbs from '../../../components/seo/Breadcrumbs'
import FaqAccordion from '../../../components/seo/FaqAccordion'
import JsonLdScript from '../../../components/seo/JsonLdScript'
import PriorityLinks from '../../../components/seo/PriorityLinks'
import { isValidLocale, localePath, pickLocaleCopy, type Locale } from '@/lib/i18n/config'
import { absoluteUrl, buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageMetadata, buildWebPageJsonLd } from '@/lib/seo'
import { buildFaqPageJsonLd } from '@/lib/service-seo'
import { siteConfig } from '@/lib/site'
import styles from './page.module.css'

type Props = { params: Promise<{ locale: string }> }

const COPY = {
  ru: {
    title: 'Аренда или покупка аккаунта Stripe',
    description:
      'Сравнение аренды, покупки и комплекта юрлицо + банк для Stripe: сроки, контроль доступов и когда какой формат уместен.',
    lead: 'Один запрос «купить или арендовать Stripe» закрывает три разных контура. Ниже — когда какой выбирать. Stripe в любом случае может запросить документы или ограничить приём.',
    rows: [
      {
        label: 'Задача',
        rent: 'Быстрый пилот приёма платежей',
        buy: 'Свой контур доступов при понятном обороте',
        legal: 'Долгосрочный стек: компания, банк и Stripe',
      },
      {
        label: 'Срок старта',
        rent: 'От 3 рабочих дней при готовом сайте',
        buy: 'После подбора аккаунта и передачи документов',
        legal: 'Дольше: регистрация юрлица и счёта',
      },
      {
        label: 'Контроль',
        rent: 'Доступы по регламенту аренды',
        buy: 'Передача рабочего аккаунта с историей',
        legal: 'Юрлицо и банк на вашей стороне связки',
      },
      {
        label: 'Риски Stripe',
        rent: 'Review и лимиты остаются; routing снижает простой',
        buy: 'Те же правила платформы, свой MCC и оборот',
        legal: 'Верификация компании и банка до запуска',
      },
    ],
    faq: [
      {
        question: 'Можно ли начать с аренды и потом купить?',
        answer: 'Да. Если пилот подтвердил экономику, переходим к покупке или комплекту юрлицо + банк. Важно сохранить схему выплат и MCC.',
      },
      {
        question: 'Что не обещаем ни в одном формате?',
        answer: 'Что Stripe одобрит любой проект или никогда не запросит документы. Это решает платформа.',
      },
    ],
    ctaRent: 'Аренда аккаунта Stripe',
    ctaBuy: 'Купить аккаунт Stripe',
    ctaLegal: 'Юрлицо и банк для Stripe',
    colRent: 'Аренда',
    colBuy: 'Покупка',
    colLegal: 'Юрлицо + банк',
  },
  uk: {
    title: 'Оренда чи купівля акаунта Stripe',
    description:
      'Порівняння оренди, купівлі і комплекту юрособа + банк для Stripe: строки, контроль доступів і коли який формат доречний.',
    lead: 'Один запит «купити або орендувати Stripe» закриває три різні контури. Нижче — коли який обирати. Stripe в будь-якому разі може запросити документи або обмежити прийом.',
    rows: [
      {
        label: 'Завдання',
        rent: 'Швидкий пілот прийому платежів',
        buy: 'Свій контур доступів при зрозумілому обігу',
        legal: 'Довгостроковий стек: компанія, банк і Stripe',
      },
      {
        label: 'Строк старту',
        rent: 'Від 3 робочих днів за готового сайту',
        buy: 'Після підбору акаунта і передачі документів',
        legal: 'Довше: реєстрація юрособи і рахунку',
      },
      {
        label: 'Контроль',
        rent: 'Доступи за регламентом оренди',
        buy: 'Передача робочого акаунта з історією',
        legal: 'Юрособа і банк на вашому боці зв’язки',
      },
      {
        label: 'Ризики Stripe',
        rent: 'Review і ліміти лишаються; routing зменшує простій',
        buy: 'Ті самі правила платформи, свій MCC і обіг',
        legal: 'Верифікація компанії і банку до запуску',
      },
    ],
    faq: [
      {
        question: 'Чи можна почати з оренди і потім купити?',
        answer: 'Так. Якщо пілот підтвердив економіку, переходимо до купівлі або комплекту юрособа + банк. Важливо зберегти схему виплат і MCC.',
      },
      {
        question: 'Чого не обіцяємо в жодному форматі?',
        answer: 'Що Stripe схвалить будь-який проєкт або ніколи не запросить документи. Це вирішує платформа.',
      },
    ],
    ctaRent: 'Оренда акаунта Stripe',
    ctaBuy: 'Купити акаунт Stripe',
    ctaLegal: 'Юрособа і банк для Stripe',
    colRent: 'Оренда',
    colBuy: 'Купівля',
    colLegal: 'Юрособа + банк',
  },
  en: {
    title: 'Rent or buy a Stripe account',
    description:
      'Compare Stripe account rental, purchase and a company plus bank package: timing, access control and when each format fits.',
    lead: '“Buy or rent Stripe” covers three different stacks. Below is when to pick each. Stripe may still request documents or restrict acceptance in every format.',
    rows: [
      {
        label: 'Goal',
        rent: 'Fast payment-acceptance pilot',
        buy: 'Own access when volume is predictable',
        legal: 'Long-term stack: company, bank and Stripe',
      },
      {
        label: 'Time to start',
        rent: 'From 3 business days with a ready site',
        buy: 'After account matching and document handoff',
        legal: 'Longer: entity and bank registration',
      },
      {
        label: 'Control',
        rent: 'Access under the rental rules',
        buy: 'Handoff of a working account with history',
        legal: 'Entity and bank on your side of the bundle',
      },
      {
        label: 'Stripe risk',
        rent: 'Reviews and limits remain; routing cuts downtime',
        buy: 'Same platform rules, your MCC and volume',
        legal: 'Company and bank verification before launch',
      },
    ],
    faq: [
      {
        question: 'Can I start with rental and buy later?',
        answer: 'Yes. If the pilot proves the economics, we move to purchase or a company plus bank package. Keep the payout scheme and MCC stable.',
      },
      {
        question: 'What do you never promise?',
        answer: 'That Stripe will approve every project or never ask for documents. That decision stays with the platform.',
      },
    ],
    ctaRent: 'Rent a Stripe account',
    ctaBuy: 'Buy a Stripe account',
    ctaLegal: 'Company and bank for Stripe',
    colRent: 'Rental',
    colBuy: 'Purchase',
    colLegal: 'Entity + bank',
  },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale
  const copy = COPY[locale]

  return buildPageMetadata({
    title: `${copy.title} | WayOfProcessing`,
    description: copy.description,
    path: '/compare/rent-vs-buy',
    locale,
  })
}

export default async function RentVsBuyPage({ params }: Props) {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale
  const copy = COPY[locale]
  const pageUrl = absoluteUrl(localePath('/compare/rent-vs-buy', locale))

  const graph = buildGraphJsonLd([
    buildBreadcrumbJsonLd(
      [
        { name: siteConfig.name, path: '/' },
        { name: labelServicesBreadcrumb(locale), path: '/services' },
        { name: copy.title, path: '/compare/rent-vs-buy' },
      ],
      locale,
    ),
    buildWebPageJsonLd({
      title: copy.title,
      description: copy.description,
      path: '/compare/rent-vs-buy',
      locale,
    }),
    buildFaqPageJsonLd([...copy.faq], pageUrl),
  ])

  return (
    <>
      <JsonLdScript data={graph} />
      <Navbar />
      <Breadcrumbs
        items={[
          { name: siteConfig.name, path: localePath('/', locale) },
          { name: labelServicesBreadcrumb(locale), path: localePath('/services', locale) },
          { name: copy.title, path: localePath('/compare/rent-vs-buy', locale) },
        ]}
      />
      <main className={styles.page}>
        <article className={styles.inner}>
          <header className={styles.header}>
            <h1 className={styles.title}>{copy.title}</h1>
            <p className={styles.lead}>{copy.lead}</p>
          </header>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col" />
                  <th scope="col">{copy.colRent}</th>
                  <th scope="col">{copy.colBuy}</th>
                  <th scope="col">{copy.colLegal}</th>
                </tr>
              </thead>
              <tbody>
                {copy.rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{row.rent}</td>
                    <td>{row.buy}</td>
                    <td>{row.legal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <nav className={styles.ctas} aria-label={copy.title}>
            <Link href={localePath('/services/stripe-account-rent', locale)} className={styles.cta}>
              {copy.ctaRent}
            </Link>
            <Link href={localePath('/services/stripe-account-buy', locale)} className={styles.cta}>
              {copy.ctaBuy}
            </Link>
            <Link href={localePath('/services/legal-entity-bank', locale)} className={styles.cta}>
              {copy.ctaLegal}
            </Link>
          </nav>

          <div className={styles.faq}>
            <FaqAccordion
              items={copy.faq}
              heading={pickLocaleCopy(locale, { ru: 'FAQ', uk: 'FAQ', en: 'FAQ' })}
            />
          </div>
        </article>
      </main>
      <PriorityLinks locale={locale} />
      <Footer />
    </>
  )
}

function labelServicesBreadcrumb(locale: Locale) {
  return pickLocaleCopy(locale, { ru: 'Услуги', uk: 'Послуги', en: 'Services' })
}
