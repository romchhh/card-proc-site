import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import Breadcrumbs from '../../../components/seo/Breadcrumbs'
import FaqAccordion from '../../../components/seo/FaqAccordion'
import JsonLdScript from '../../../components/seo/JsonLdScript'
import ContentTable from '../../../components/ContentTable'
import PriorityLinks from '../../../components/seo/PriorityLinks'
import { isValidLocale, localePath, pickLocaleCopy, type Locale } from '@/lib/i18n/config'
import { getChecklistTable, getSetupPathTable } from '@/lib/guide-tables'
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
        label: 'Документы от вас',
        rent: 'Сайт, оферта, описание продукта',
        buy: 'Сайт + пакет для передачи доступов',
        legal: 'Паспорт, структура владения, KYC банка',
      },
      {
        label: 'Выплаты',
        rent: 'По схеме аренды (фиксируем в договоре)',
        buy: 'На ваш банк после передачи',
        legal: 'На счёт компании после верификации',
      },
      {
        label: 'Когда менять формат',
        rent: 'После подтверждения экономики пилота',
        buy: 'Когда нужен свой perimeter и история',
        legal: 'Когда строите постоянный EU/UK/HK контур',
      },
      {
        label: 'Риски Stripe',
        rent: 'Review и лимиты остаются; routing снижает простой',
        buy: 'Те же правила платформы, свой MCC и оборот',
        legal: 'Верификация компании и банка до запуска',
      },
      {
        label: 'Что не обещаем',
        rent: 'Одобрение любой ниши или снятие hold',
        buy: '«Вечный» аккаунт без запросов платформы',
        legal: 'Гарантированное открытие банка или Stripe',
      },
    ],
    scenariosTitle: 'Сценарии выбора',
    scenarios: [
      {
        title: 'Нужно принять первые платежи на этой неделе',
        text: 'Стартуйте с аренды при готовом сайте и понятной нише. После пилота решайте: покупка или свой юрлицо + банк.',
      },
      {
        title: 'Оборот стабильный, нужен свой perimeter',
        text: 'Смотрите покупку аккаунта или сразу комплект компания + банк в нужной юрисдикции.',
      },
      {
        title: 'Multi-geo и пики рекламы',
        text: 'Процессинг под ключ с routing и резервным каналом. Один аккаунт без запаса на review — риск простоя.',
      },
      {
        title: 'Долгий стек без «чужого» кабинета',
        text: 'Юрлицо + банк + ваш Stripe. Дольше по сроку, но прозрачнее для комплаенса и выплат.',
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
    ctaAlt: 'Альтернативы Stripe',
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
        label: 'Документи від вас',
        rent: 'Сайт, оферта, опис продукту',
        buy: 'Сайт + пакет для передачі доступів',
        legal: 'Паспорт, структура власності, KYC банку',
      },
      {
        label: 'Виплати',
        rent: 'За схемою оренди (фіксуємо в договорі)',
        buy: 'На ваш банк після передачі',
        legal: 'На рахунок компанії після верифікації',
      },
      {
        label: 'Коли змінювати формат',
        rent: 'Після підтвердження економіки пілоту',
        buy: 'Коли потрібен свій perimeter і історія',
        legal: 'Коли будуєте постійний EU/UK/HK контур',
      },
      {
        label: 'Ризики Stripe',
        rent: 'Review і ліміти лишаються; routing зменшує простій',
        buy: 'Ті самі правила платформи, свій MCC і обіг',
        legal: 'Верифікація компанії і банку до запуску',
      },
      {
        label: 'Чого не обіцяємо',
        rent: 'Схвалення будь-якої ніші або зняття hold',
        buy: '«Вічний» акаунт без запитів платформи',
        legal: 'Гарантоване відкриття банку або Stripe',
      },
    ],
    scenariosTitle: 'Сценарії вибору',
    scenarios: [
      {
        title: 'Потрібно прийняти перші платежі цього тижня',
        text: 'Стартуйте з оренди за готового сайту і зрозумілої ніші. Після пілоту вирішуйте: купівля або своя юрособа + банк.',
      },
      {
        title: 'Обіг стабільний, потрібен свій perimeter',
        text: 'Дивіться купівлю акаунта або одразу комплект компанія + банк у потрібній юрисдикції.',
      },
      {
        title: 'Multi-geo і піки реклами',
        text: 'Процесинг під ключ із routing і резервним каналом. Один акаунт без запасу на review — ризик простою.',
      },
      {
        title: 'Довгий стек без «чужого» кабінету',
        text: 'Юрособа + банк + ваш Stripe. Довше за строком, але прозоріше для комплаєнсу і виплат.',
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
    ctaAlt: 'Альтернативи Stripe',
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
        label: 'Documents from you',
        rent: 'Site, terms, product description',
        buy: 'Site + handoff document pack',
        legal: 'ID, ownership structure, bank KYC',
      },
      {
        label: 'Payouts',
        rent: 'Per rental scheme (fixed in the agreement)',
        buy: 'To your bank after handoff',
        legal: 'To the company account after verification',
      },
      {
        label: 'When to switch',
        rent: 'After the pilot proves unit economics',
        buy: 'When you need your own perimeter and history',
        legal: 'When you build a lasting EU/UK/HK stack',
      },
      {
        label: 'Stripe risk',
        rent: 'Reviews and limits remain; routing cuts downtime',
        buy: 'Same platform rules, your MCC and volume',
        legal: 'Company and bank verification before launch',
      },
      {
        label: 'What we never promise',
        rent: 'Approval of any niche or lifting a hold',
        buy: 'A “forever” account with no platform requests',
        legal: 'Guaranteed bank or Stripe approval',
      },
    ],
    scenariosTitle: 'Decision scenarios',
    scenarios: [
      {
        title: 'Need first payments this week',
        text: 'Start with rental if the site is ready and the niche is clear. After the pilot, decide: purchase or your own company + bank.',
      },
      {
        title: 'Stable volume, own perimeter',
        text: 'Look at buying an account or go straight to company + bank in the right jurisdiction.',
      },
      {
        title: 'Multi-geo and ad spikes',
        text: 'Turnkey processing with routing and a backup channel. One account with no review headroom risks downtime.',
      },
      {
        title: 'Long-term stack without a shared cabinet',
        text: 'Company + bank + your Stripe. Longer timeline, clearer compliance and payouts.',
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
    ctaAlt: 'Stripe alternatives',
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
    title: pickLocaleCopy(locale, {
      ru: 'Аренда или покупка аккаунта Stripe: сравнение | WayOfProcessing',
      uk: 'Оренда чи купівля акаунта Stripe: порівняння | WayOfProcessing',
      en: 'Rent vs Buy a Stripe Account: Comparison | WayOfProcessing',
    }),
    description: pickLocaleCopy(locale, {
      ru: 'Сравнение аренды и покупки аккаунта Stripe по стоимости, срокам, контролю и рискам. Таблица и рекомендации по типу бизнеса.',
      uk: 'Порівняння оренди та купівлі акаунта Stripe за вартістю, строками, контролем і ризиками. Таблиця та рекомендації за типом бізнесу.',
      en: 'Renting and buying a Stripe account compared by cost, timeline, control and risk. A table and recommendations by business type.',
    }),
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

          <section className={styles.scenarios} aria-labelledby="rent-scenarios-heading">
            <h2 id="rent-scenarios-heading" className={styles.scenariosTitle}>
              {copy.scenariosTitle}
            </h2>
            <ul className={styles.scenarioList}>
              {copy.scenarios.map((item) => (
                <li key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
          </section>

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
            <Link href={localePath('/compare/stripe-alternatives', locale)} className={styles.cta}>
              {copy.ctaAlt}
            </Link>
          </nav>

          <div className={styles.extraTables}>
            <ContentTable table={getSetupPathTable(locale)} locale={locale} narrow={false} />
            <ContentTable table={getChecklistTable(locale)} locale={locale} narrow={false} />
          </div>

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
