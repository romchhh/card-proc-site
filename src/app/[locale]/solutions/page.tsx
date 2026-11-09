import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ServiceCard from '../../components/ServiceCard'
import Breadcrumbs from '../../components/seo/Breadcrumbs'
import FaqAccordion from '../../components/seo/FaqAccordion'
import JsonLdScript from '../../components/seo/JsonLdScript'
import ContentTable from '../../components/ContentTable'
import HubRichBody from '../../components/seo/HubRichBody'
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
    sections: [
      {
        title: 'Когда открывать страницу «Stripe для Украины»',
        paragraphs: [
          'Если команда или клиенты связаны с Украиной, а прямое подключение Stripe на ФОП недоступно — нужен foreign entity, банк и понятная схема выплат.',
          'На пилоте допустимы аренда или routing, пока готовится юрлицо. После стабильного оборота переходим на свой perimeter.',
        ],
      },
      {
        title: 'Когда разбирать проблемы с аккаунтом',
        paragraphs: [
          'Review, hold, reserve, Restricted или повторный KYC — сначала документы и Evidence за 48 часов, без хаотичной смены оффера.',
          'Если категория запрещена или сайт не соответствует платежам, апелляции редко помогают: честнее план B (другой контур или модель).',
        ],
      },
      {
        title: 'Как это стыкуется с услугами',
        paragraphs: [
          'Решения отвечают на ситуацию; услуги — на формат: аренда, покупка, процессинг под ключ, юрлицо + банк.',
          'Сравнение аренды и покупки и альтернативы Stripe (Paddle, Lemon, Adyen, Mollie) — на отдельных страницах compare.',
        ],
      },
      {
        title: 'Что принести на консультацию',
        paragraphs: [
          'Ссылку на сайт, страны клиентов, оборот, текущий способ оплаты и переписку со Stripe или банком при отказе.',
          'Без этого нельзя честно сказать, какой формат уместен и где высок риск отказа.',
        ],
      },
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
      {
        question: 'Нужна ли сразу иностранная компания для Украины?',
        answer:
          'Не всегда в первый день. Часто начинают с аренды или routing, параллельно готовят Ltd + банк. Долгий стек без «чужого» кабинета — это юрлицо + свой Stripe.',
      },
      {
        question: 'Что делать в первые 48 часов при hold?',
        answer:
          'Сохранить письма Stripe, скрины Dashboard, выписки, оферту и reason codes по спорам. Не менять продукт и рекламу хаотично до разбора причины.',
      },
    ],
    faqHeading: 'Вопросы о решениях для Stripe',
    ctas: [
      { label: 'Stripe для Украины', path: '/solutions/stripe-ukraine' },
      { label: 'Проблемы с аккаунтом', path: '/solutions/stripe-account-issues' },
      { label: 'Все услуги', path: '/services' },
    ],
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
    sections: [
      {
        title: 'Коли відкривати сторінку «Stripe для України»',
        paragraphs: [
          'Якщо команда або клієнти пов’язані з Україною, а пряме підключення Stripe на ФОП недоступне — потрібен foreign entity, банк і зрозуміла схема виплат.',
          'На пілоті допустимі оренда або routing, поки готується юрособа. Після стабільного обігу переходимо на свій perimeter.',
        ],
      },
      {
        title: 'Коли розбирати проблеми з акаунтом',
        paragraphs: [
          'Review, hold, reserve, Restricted або повторний KYC — спочатку документи й Evidence за 48 годин, без хаотичної зміни оферу.',
          'Якщо категорія заборонена або сайт не відповідає платежам, апеляції рідко допомагають: чесніше план B (інший контур або модель).',
        ],
      },
      {
        title: 'Як це стикується з послугами',
        paragraphs: [
          'Рішення відповідають на ситуацію; послуги — на формат: оренда, купівля, процесинг під ключ, юрособа + банк.',
          'Порівняння оренди й купівлі та альтернативи Stripe (Paddle, Lemon, Adyen, Mollie) — на окремих сторінках compare.',
        ],
      },
      {
        title: 'Що принести на консультацію',
        paragraphs: [
          'Посилання на сайт, країни клієнтів, обіг, поточний спосіб оплати й листування зі Stripe або банком за відмови.',
          'Без цього не можна чесно сказати, який формат доречний і де високий ризик відмови.',
        ],
      },
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
      {
        question: 'Чи потрібна одразу іноземна компанія для України?',
        answer:
          'Не завжди в перший день. Часто починають з оренди або routing, паралельно готують Ltd + банк. Довгий стек без «чужого» кабінету — це юрособа + свій Stripe.',
      },
      {
        question: 'Що робити в перші 48 годин при hold?',
        answer:
          'Зберегти листи Stripe, скріни Dashboard, виписки, оферту й reason codes за спорами. Не міняти продукт і рекламу хаотично до розбору причини.',
      },
    ],
    faqHeading: 'Питання про рішення для Stripe',
    ctas: [
      { label: 'Stripe для України', path: '/solutions/stripe-ukraine' },
      { label: 'Проблеми з акаунтом', path: '/solutions/stripe-account-issues' },
      { label: 'Усі послуги', path: '/services' },
    ],
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
    sections: [
      {
        title: 'When to open “Stripe for Ukraine”',
        paragraphs: [
          'If the team or customers are linked to Ukraine and a sole trader cannot connect Stripe directly, you need a foreign entity, a bank and a clear payout scheme.',
          'Rental or routing can cover the pilot while the company is prepared. After stable volume, move to your own perimeter.',
        ],
      },
      {
        title: 'When to work through account issues',
        paragraphs: [
          'Review, hold, reserve, Restricted or repeat KYC — gather documents and Evidence in 48 hours first; do not change the offer chaotically.',
          'If the category is prohibited or the site mismatches payments, appeals rarely help: plan B (another stack or model) is more honest.',
        ],
      },
      {
        title: 'How this maps to services',
        paragraphs: [
          'Solutions answer a situation; services answer a format: rent, buy, turnkey processing, entity + bank.',
          'Rent vs buy and Stripe alternatives (Paddle, Lemon, Adyen, Mollie) live on separate compare pages.',
        ],
      },
      {
        title: 'What to bring to a consultation',
        paragraphs: [
          'Site URL, customer countries, volume, current payment method and any Stripe or bank decline emails.',
          'Without that we cannot honestly say which format fits and where refusal risk is high.',
        ],
      },
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
      {
        question: 'Do Ukraine projects need a foreign company on day one?',
        answer:
          'Not always. Teams often start with rental or routing while Ltd + bank are prepared. A lasting stack without a shared cabinet is entity + your own Stripe.',
      },
      {
        question: 'What should I do in the first 48 hours of a hold?',
        answer:
          'Keep Stripe emails, Dashboard screenshots, statements, terms and dispute reason codes. Do not change product or ads chaotically before the root cause is clear.',
      },
    ],
    faqHeading: 'Questions about Stripe solutions',
    ctas: [
      { label: 'Stripe for Ukraine', path: '/solutions/stripe-ukraine' },
      { label: 'Account issues', path: '/solutions/stripe-account-issues' },
      { label: 'All services', path: '/services' },
    ],
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

        <HubRichBody
          intro={[...copy.intro]}
          sections={copy.sections.map((section) => ({
            title: section.title,
            paragraphs: [...section.paragraphs],
          }))}
          ctas={[...copy.ctas]}
          locale={locale}
        />

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
