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
import styles from '../rent-vs-buy/page.module.css'

type Props = { params: Promise<{ locale: string }> }

const COPY = {
  ru: {
    title: 'Альтернативы Stripe для приёма платежей',
    description:
      'Когда смотреть Paddle, Lemon Squeezy, Adyen и Mollie вместо или вместе со Stripe: MoR, EU-фокус, enterprise и честные ограничения.',
    lead: 'Stripe — не единственный путь. Ниже сравнение коммерческих альтернатив для команд, которым нужен другой контур комплаенса, MoR или банк. Это ориентиры, а не рейтинг «лучше/хуже».',
    rows: [
      {
        label: 'Модель',
        stripe: 'Прямой merchant + ваш оффер',
        paddle: 'Merchant of Record',
        lemon: 'Merchant of Record (digital)',
        adyen: 'Глобальный эквайринг / платформа',
        mollie: 'EU payment service provider',
      },
      {
        label: 'Кому чаще подходит',
        stripe: 'Product-led, SaaS, e-com с контролем checkout',
        paddle: 'SaaS / digital с налогами «из коробки»',
        lemon: 'Инди / digital products, быстрый запуск',
        adyen: 'Крупный оборот, омниканал, сложное гео',
        mollie: 'EU-бизнес, локальные методы оплаты',
      },
      {
        label: 'Сильная сторона',
        stripe: 'DX, Billing, Connect, экосистема',
        paddle: 'НДС/sales tax, подписки, глобальные продажи',
        lemon: 'Простота, лицензии, affiliate',
        adyen: 'Единый стек, offline+online, масштаб',
        mollie: 'Прозрачные EU-методы, быстрый онбординг в ЕС',
      },
      {
        label: 'Ограничение',
        stripe: 'Страновой список, risk review, high-risk ниши',
        paddle: 'Меньше контроля checkout/бренда платежей',
        lemon: 'Фокус на digital, не любой физический e-com',
        adyen: 'Выше порог входа и сложность внедрения',
        mollie: 'В первую очередь Европа, не глобальный US-first',
      },
      {
        label: 'Когда звать WayOfProcessing',
        stripe: 'Нужен Stripe-контур: аренда, покупка, юрлицо+банк, routing',
        paddle: 'Нужна консультация «Stripe vs MoR» под нишу',
        lemon: 'Сравнить digital MoR и Stripe Billing',
        adyen: 'Оценка, нужен ли enterprise-стек вместо Stripe',
        mollie: 'EU-локальные методы vs Stripe Payment Element',
      },
    ],
    scenariosTitle: 'Сценарии выбора',
    scenarios: [
      {
        title: 'Нужен свой checkout и API',
        text: 'Чаще Stripe (или Adyen на крупном обороте). MoR удобнее, если хотите отдать налоги и инвойсинг провайдеру.',
      },
      {
        title: 'Digital / SaaS без своей налоговой команды',
        text: 'Paddle или Lemon Squeezy как MoR. Stripe остаётся вариантом, если готовы сами закрывать tax и комплаенс.',
      },
      {
        title: 'Клиенты в ЕС и локальные методы',
        text: 'Mollie или Stripe с локальными methods. Выбор зависит от юрисдикции компании и банка.',
      },
      {
        title: 'СНГ-команда без своей UK/EU компании',
        text: 'Сначала честно сравните аренду/юрлицо для Stripe и MoR. Нет универсального «обхода» без рисков.',
      },
    ],
    faq: [
      {
        question: 'Можно ли заменить Stripe альтернативой один-в-один?',
        answer: 'Редко. Меняются модель ответственности, payouts, методы оплаты и требования к сайту. Сравнивайте под нишу и гео, а не по одному логотипу.',
      },
      {
        question: 'Вы подключаете Paddle или Adyen?',
        answer: 'Основной фокус — Stripe-контур (аккаунт, юрлицо, банк, routing). По альтернативам даём сравнительную консультацию, чтобы не выбрать инструмент вслепую.',
      },
    ],
    ctaCompare: 'Аренда или покупка Stripe',
    ctaServices: 'Услуги подключения Stripe',
    colStripe: 'Stripe',
    colPaddle: 'Paddle',
    colLemon: 'Lemon Squeezy',
    colAdyen: 'Adyen',
    colMollie: 'Mollie',
  },
  uk: {
    title: 'Альтернативи Stripe для прийому платежів',
    description:
      'Коли дивитися Paddle, Lemon Squeezy, Adyen і Mollie замість або разом зі Stripe: MoR, EU-фокус, enterprise і чесні обмеження.',
    lead: 'Stripe — не єдиний шлях. Нижче порівняння комерційних альтернатив для команд, яким потрібен інший контур комплаєнсу, MoR або банк. Це орієнтири, а не рейтинг «краще/гірше».',
    rows: [
      {
        label: 'Модель',
        stripe: 'Прямий merchant + ваш офер',
        paddle: 'Merchant of Record',
        lemon: 'Merchant of Record (digital)',
        adyen: 'Глобальний еквайринг / платформа',
        mollie: 'EU payment service provider',
      },
      {
        label: 'Кому частіше підходить',
        stripe: 'Product-led, SaaS, e-com з контролем checkout',
        paddle: 'SaaS / digital з податками «з коробки»',
        lemon: 'Інді / digital products, швидкий запуск',
        adyen: 'Великий оборот, омніканал, складне гео',
        mollie: 'EU-бізнес, локальні методи оплати',
      },
      {
        label: 'Сильна сторона',
        stripe: 'DX, Billing, Connect, екосистема',
        paddle: 'ПДВ/sales tax, підписки, глобальні продажі',
        lemon: 'Простота, ліцензії, affiliate',
        adyen: 'Єдиний стек, offline+online, масштаб',
        mollie: 'Прозорі EU-методи, швидкий онбординг у ЄС',
      },
      {
        label: 'Обмеження',
        stripe: 'Країновий список, risk review, high-risk ніші',
        paddle: 'Менше контролю checkout/бренду платежів',
        lemon: 'Фокус на digital, не будь-який фізичний e-com',
        adyen: 'Вищий поріг входу і складність впровадження',
        mollie: 'Насамперед Європа, не глобальний US-first',
      },
      {
        label: 'Коли кликати WayOfProcessing',
        stripe: 'Потрібен Stripe-контур: оренда, купівля, юрособа+банк, routing',
        paddle: 'Потрібна консультація «Stripe vs MoR» під нішу',
        lemon: 'Порівняти digital MoR і Stripe Billing',
        adyen: 'Оцінка, чи потрібен enterprise-стек замість Stripe',
        mollie: 'EU-локальні методи vs Stripe Payment Element',
      },
    ],
    scenariosTitle: 'Сценарії вибору',
    scenarios: [
      {
        title: 'Потрібен свій checkout і API',
        text: 'Частіше Stripe (або Adyen на великому обороті). MoR зручніший, якщо хочете віддати податки й інвойсинг провайдеру.',
      },
      {
        title: 'Digital / SaaS без своєї податкової команди',
        text: 'Paddle або Lemon Squeezy як MoR. Stripe лишається варіантом, якщо готові самі закривати tax і комплаєнс.',
      },
      {
        title: 'Клієнти в ЄС і локальні методи',
        text: 'Mollie або Stripe з локальними methods. Вибір залежить від юрисдикції компанії і банку.',
      },
      {
        title: 'Команда з СНД без своєї UK/EU компанії',
        text: 'Спочатку чесно порівняйте оренду/юрособу для Stripe і MoR. Немає універсального «обходу» без ризиків.',
      },
    ],
    faq: [
      {
        question: 'Чи можна замінити Stripe альтернативою один-в-один?',
        answer: 'Рідко. Змінюються модель відповідальності, payouts, методи оплати і вимоги до сайту. Порівнюйте під нішу і гео, а не за одним логотипом.',
      },
      {
        question: 'Ви підключаєте Paddle чи Adyen?',
        answer: 'Основний фокус — Stripe-контур (акаунт, юрособа, банк, routing). По альтернативах даємо порівняльну консультацію, щоб не обрати інструмент наосліп.',
      },
    ],
    ctaCompare: 'Оренда чи купівля Stripe',
    ctaServices: 'Послуги підключення Stripe',
    colStripe: 'Stripe',
    colPaddle: 'Paddle',
    colLemon: 'Lemon Squeezy',
    colAdyen: 'Adyen',
    colMollie: 'Mollie',
  },
  en: {
    title: 'Stripe alternatives for accepting payments',
    description:
      'When to consider Paddle, Lemon Squeezy, Adyen and Mollie instead of or alongside Stripe: MoR, EU focus, enterprise and honest limits.',
    lead: 'Stripe is not the only path. Below is a commercial comparison for teams that need a different compliance model, MoR or banking stack. Guidance — not a better/worse ranking.',
    rows: [
      {
        label: 'Model',
        stripe: 'Direct merchant + your offer',
        paddle: 'Merchant of Record',
        lemon: 'Merchant of Record (digital)',
        adyen: 'Global acquiring / platform',
        mollie: 'EU payment service provider',
      },
      {
        label: 'Best fit',
        stripe: 'Product-led, SaaS, e-com with checkout control',
        paddle: 'SaaS / digital with taxes handled',
        lemon: 'Indie / digital products, fast launch',
        adyen: 'Large volume, omnichannel, complex geos',
        mollie: 'EU business, local payment methods',
      },
      {
        label: 'Strength',
        stripe: 'DX, Billing, Connect, ecosystem',
        paddle: 'VAT/sales tax, subscriptions, global sales',
        lemon: 'Simplicity, licensing, affiliate',
        adyen: 'Unified stack, offline+online, scale',
        mollie: 'Clear EU methods, fast EU onboarding',
      },
      {
        label: 'Constraint',
        stripe: 'Country list, risk review, high-risk niches',
        paddle: 'Less checkout/brand control',
        lemon: 'Digital-first, not every physical e-com',
        adyen: 'Higher entry bar and integration cost',
        mollie: 'Europe-first, not a global US-first stack',
      },
      {
        label: 'When to talk to WayOfProcessing',
        stripe: 'You need a Stripe stack: rental, purchase, company+bank, routing',
        paddle: 'You need a Stripe vs MoR consult for your niche',
        lemon: 'Compare digital MoR and Stripe Billing',
        adyen: 'Assess whether enterprise beats Stripe for you',
        mollie: 'EU local methods vs Stripe Payment Element',
      },
    ],
    scenariosTitle: 'Decision scenarios',
    scenarios: [
      {
        title: 'You need your own checkout and API',
        text: 'Usually Stripe (or Adyen at large volume). MoR is better if you want the provider to own tax and invoicing.',
      },
      {
        title: 'Digital / SaaS without an in-house tax team',
        text: 'Paddle or Lemon Squeezy as MoR. Stripe still works if you can own tax and compliance.',
      },
      {
        title: 'EU customers and local methods',
        text: 'Mollie or Stripe with local methods. Choice depends on company jurisdiction and banking.',
      },
      {
        title: 'CIS team without a UK/EU company',
        text: 'Honestly compare Stripe rental/entity setup vs MoR. There is no risk-free universal bypass.',
      },
    ],
    faq: [
      {
        question: 'Can an alternative replace Stripe one-to-one?',
        answer: 'Rarely. Liability model, payouts, methods and site requirements change. Compare for niche and geo — not a logo.',
      },
      {
        question: 'Do you connect Paddle or Adyen?',
        answer: 'Our core focus is the Stripe stack (account, company, bank, routing). For alternatives we provide comparative advice so you do not pick blindly.',
      },
    ],
    ctaCompare: 'Rent or buy Stripe',
    ctaServices: 'Stripe setup services',
    colStripe: 'Stripe',
    colPaddle: 'Paddle',
    colLemon: 'Lemon Squeezy',
    colAdyen: 'Adyen',
    colMollie: 'Mollie',
  },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale
  const copy = COPY[locale]

  return buildPageMetadata({
    title: pickLocaleCopy(locale, {
      ru: 'Альтернативы Stripe: Paddle, Lemon Squeezy, Adyen, Mollie | WayOfProcessing',
      uk: 'Альтернативи Stripe: Paddle, Lemon Squeezy, Adyen, Mollie | WayOfProcessing',
      en: 'Stripe Alternatives: Paddle, Lemon Squeezy, Adyen, Mollie | WayOfProcessing',
    }),
    description: copy.description,
    path: '/compare/stripe-alternatives',
    locale,
  })
}

export default async function StripeAlternativesPage({ params }: Props) {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale
  const copy = COPY[locale]
  const pageUrl = absoluteUrl(localePath('/compare/stripe-alternatives', locale))

  const graph = buildGraphJsonLd([
    buildBreadcrumbJsonLd(
      [
        { name: siteConfig.name, path: '/' },
        { name: labelServicesBreadcrumb(locale), path: '/services' },
        { name: copy.title, path: '/compare/stripe-alternatives' },
      ],
      locale,
    ),
    buildWebPageJsonLd({
      title: copy.title,
      description: copy.description,
      path: '/compare/stripe-alternatives',
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
          { name: copy.title, path: localePath('/compare/stripe-alternatives', locale) },
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
                  <th scope="col">{copy.colStripe}</th>
                  <th scope="col">{copy.colPaddle}</th>
                  <th scope="col">{copy.colLemon}</th>
                  <th scope="col">{copy.colAdyen}</th>
                  <th scope="col">{copy.colMollie}</th>
                </tr>
              </thead>
              <tbody>
                {copy.rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{row.stripe}</td>
                    <td>{row.paddle}</td>
                    <td>{row.lemon}</td>
                    <td>{row.adyen}</td>
                    <td>{row.mollie}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <section className={styles.scenarios} aria-labelledby="alt-scenarios-heading">
            <h2 id="alt-scenarios-heading" className={styles.scenariosTitle}>
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
            <Link href={localePath('/compare/rent-vs-buy', locale)} className={styles.cta}>
              {copy.ctaCompare}
            </Link>
            <Link href={localePath('/services', locale)} className={styles.cta}>
              {copy.ctaServices}
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
