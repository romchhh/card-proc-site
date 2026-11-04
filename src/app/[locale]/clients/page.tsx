import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Breadcrumbs from '../../components/seo/Breadcrumbs'
import JsonLdScript from '../../components/seo/JsonLdScript'
import PriorityLinks from '../../components/seo/PriorityLinks'
import { isValidLocale, localePath, pickLocaleCopy, type Locale } from '@/lib/i18n/config'
import { labelAbout, labelClients, labelServices } from '@/lib/i18n/labels'
import { absoluteUrl, buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageMetadata, buildWebPageJsonLd } from '@/lib/seo'
import { siteConfig } from '@/lib/site'
import styles from './page.module.css'

type Props = { params: Promise<{ locale: string }> }

type CaseLink = {
  href: string
  label: Record<Locale, string>
}

type CaseItem = {
  id: string
  sphere: Record<Locale, string>
  task: Record<Locale, string>
  stack: Record<Locale, string>
  time: Record<Locale, string>
  payout: Record<Locale, string>
  image: string
  imageAlt: Record<Locale, string>
  links: CaseLink[]
}

const CASES: CaseItem[] = [
  {
    id: 'ecommerce',
    sphere: {
      ru: 'Интернет-магазин',
      uk: 'Інтернет-магазин',
      en: 'Online store',
    },
    task: {
      ru: 'Приём карт от покупателей за рубежом.',
      uk: 'Прийом карток від покупців з-за кордону.',
      en: 'Card payments from buyers abroad.',
    },
    stack: {
      ru: 'Процессинг Stripe под ключ или аренда аккаунта, checkout на сайте.',
      uk: 'Процесинг Stripe під ключ або оренда акаунта, checkout на сайті.',
      en: 'Turnkey Stripe processing or account rental, with checkout on the site.',
    },
    time: {
      ru: 'Базовый запуск от 3 рабочих дней, если готовы сайт и описание товаров.',
      uk: 'Базовий запуск від 3 робочих днів, якщо готові сайт і опис товарів.',
      en: 'A basic launch is from 3 business days when the site and product descriptions are ready.',
    },
    payout: {
      ru: 'EUR, USD или USDT. Обычный цикл выплат — около 3 дней, схему фиксируем до старта.',
      uk: 'EUR, USD або USDT. Звичайний цикл виплат — близько 3 днів, схему фіксуємо до старту.',
      en: 'EUR, USD or USDT. The usual payout cycle is about 3 days. We lock the scheme before launch.',
    },
    image: '/images/landings/ecommerce-hero.webp',
    imageAlt: {
      ru: 'Оплата картой в ритейле и интернет-магазине',
      uk: 'Оплата карткою в ритейлі та інтернет-магазині',
      en: 'Card payment in retail and online store',
    },

    links: [
      {
        href: '/niches/digital-products',
        label: {
          ru: 'Цифровые товары',
          uk: 'Цифрові товари',
          en: 'Digital products',
        },
      },
      {
        href: '/services/processing-turnkey',
        label: {
          ru: 'Процессинг под ключ',
          uk: 'Процесинг під ключ',
          en: 'Turnkey processing',
        },
      },
      {
        href: '/services/stripe-account-rent',
        label: {
          ru: 'Аренда аккаунта',
          uk: 'Оренда акаунта',
          en: 'Account rental',
        },
      },
    ],
  },
  {
    id: 'saas',
    sphere: {
      ru: 'SaaS и подписки',
      uk: 'SaaS і підписки',
      en: 'SaaS and subscriptions',
    },
    task: {
      ru: 'Повторные списания без ручных счетов.',
      uk: 'Повторні списання без ручних рахунків.',
      en: 'Repeat charges without manual invoices.',
    },
    stack: {
      ru: 'Процессинг и, при пилоте, аренда аккаунта. Подписки через Stripe Billing или Payment Link.',
      uk: 'Процесинг і, для пілоту, оренда акаунта. Підписки через Stripe Billing або Payment Link.',
      en: 'Processing and, for a pilot, account rental. Subscriptions via Stripe Billing or Payment Link.',
    },
    time: {
      ru: 'Тот же ориентир «от 3 дней» для базового доступа. Срок растёт, если нужны свой MCC и routing.',
      uk: 'Той самий орієнтир «від 3 днів» для базового доступу. Строк зростає, якщо потрібні свій MCC і routing.',
      en: 'The same “from 3 days” guide applies to basic access. A custom MCC and routing take longer.',
    },
    payout: {
      ru: 'Вывод в EUR, USD или USDT на согласованный счёт.',
      uk: 'Вивід у EUR, USD або USDT на узгоджений рахунок.',
      en: 'Payouts in EUR, USD or USDT to the agreed account.',
    },
    image: '/images/landings/saas-hero.webp',
    imageAlt: {
      ru: 'Дашборд SaaS и аналитика подписок',
      uk: 'Дашборд SaaS і аналітика підписок',
      en: 'SaaS dashboard and subscription analytics',
    },
    links: [
      {
        href: '/niches/saas',
        label: { ru: 'Stripe для SaaS', uk: 'Stripe для SaaS', en: 'Stripe for SaaS' },
      },
      {
        href: '/niches/subscriptions',
        label: {
          ru: 'Подписки',
          uk: 'Підписки',
          en: 'Subscriptions',
        },
      },
      {
        href: '/services/processing-turnkey',
        label: {
          ru: 'Процессинг под ключ',
          uk: 'Процесинг під ключ',
          en: 'Turnkey processing',
        },
      },
    ],
  },
  {
    id: 'courses',
    sphere: {
      ru: 'Онлайн-курсы',
      uk: 'Онлайн-курси',
      en: 'Online courses',
    },
    task: {
      ru: 'Оплата без отдельной разработки checkout.',
      uk: 'Оплата без окремої розробки checkout.',
      en: 'Payment without a custom checkout build.',
    },
    stack: {
      ru: 'Payment Link или Invoice. Программист на стороне клиента не обязателен.',
      uk: 'Payment Link або Invoice. Програміст на боці клієнта не обовʼязковий.',
      en: 'Payment Link or Invoice. A developer on the client side is not required.',
    },
    time: {
      ru: 'Ссылка на оплату появляется после проверки ниши и передачи доступа.',
      uk: 'Посилання на оплату зʼявляється після перевірки ніші і передачі доступу.',
      en: 'The payment link follows the niche review and access handoff.',
    },
    payout: {
      ru: 'Валюта или USDT — как в договоре на запуск.',
      uk: 'Валюта або USDT — як у договорі на запуск.',
      en: 'Currency or USDT, as agreed before launch.',
    },
    image: '/images/landings/courses-hero.webp',
    imageAlt: {
      ru: 'Команда за ноутбуками — онлайн-обучение',
      uk: 'Команда за ноутбуками — онлайн-навчання',
      en: 'Team with laptops for online learning',
    },

    links: [
      {
        href: '/niches/online-courses',
        label: {
          ru: 'Stripe для курсов',
          uk: 'Stripe для курсів',
          en: 'Stripe for courses',
        },
      },
      {
        href: '/services/stripe-account-rent',
        label: {
          ru: 'Аренда аккаунта',
          uk: 'Оренда акаунта',
          en: 'Account rental',
        },
      },
      {
        href: '/services/processing-turnkey',
        label: {
          ru: 'Процессинг под ключ',
          uk: 'Процесинг під ключ',
          en: 'Turnkey processing',
        },
      },
    ],
  },
  {
    id: 'marketplace',
    sphere: {
      ru: 'Маркетплейс оператора',
      uk: 'Маркетплейс оператора',
      en: 'Operator marketplace',
    },
    task: {
      ru: 'Один контур приёма для каталога, выплаты оператору, а не дробление на продавцов внутри Stripe.',
      uk: 'Один контур прийому для каталогу, виплати оператору, а не дроблення на продавців усередині Stripe.',
      en: 'One acceptance stack for a catalogue, with payouts to the operator rather than a split inside Stripe.',
    },
    stack: {
      ru: 'Аренда или покупка аккаунта плюс CRM по транзакциям. Это не обещание Stripe Connect.',
      uk: 'Оренда або купівля акаунта плюс CRM за транзакціями. Це не обіцянка Stripe Connect.',
      en: 'Account rental or purchase plus a transaction CRM. This is not a promise of Stripe Connect.',
    },
    time: {
      ru: 'Срок называем после проверки модели споров: у маркетплейса chargeback чаще выше, чем у одного магазина.',
      uk: 'Строк називаємо після перевірки моделі спорів: у маркетплейса chargeback частіше вищий, ніж в одного магазину.',
      en: 'We quote timing after reviewing the dispute model. Marketplaces often see a higher chargeback rate than a single store.',
    },
    payout: {
      ru: 'Схема выплат оператору фиксируется до запуска.',
      uk: 'Схему виплат оператору фіксуємо до запуску.',
      en: 'The operator payout scheme is fixed before launch.',
    },
    image: '/images/landings/marketplace-hero.webp',
    imageAlt: {
      ru: 'Оплата смартфоном на кассе маркетплейса',
      uk: 'Оплата смартфоном на касі маркетплейса',
      en: 'Phone payment at a marketplace checkout',
    },

    links: [
      {
        href: '/niches/marketplace',
        label: {
          ru: 'Stripe для маркетплейса',
          uk: 'Stripe для маркетплейса',
          en: 'Stripe for marketplaces',
        },
      },
      {
        href: '/services/stripe-account-buy',
        label: {
          ru: 'Покупка аккаунта',
          uk: 'Купівля акаунта',
          en: 'Buy an account',
        },
      },
      {
        href: '/services/stripe-account-rent',
        label: {
          ru: 'Аренда аккаунта',
          uk: 'Оренда акаунта',
          en: 'Account rental',
        },
      },
    ],
  },
]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale

  return buildPageMetadata({
    title: `${labelClients(locale)} | WayOfProcessing`,
    description: pickLocaleCopy(locale, {
      ru: 'Типовые подключения Stripe для магазина, SaaS, курсов и маркетплейса: набор, срок и выплаты. Без выдуманных названий клиентов.',
      uk: 'Типові підключення Stripe для магазину, SaaS, курсів і маркетплейса: набір, строк і виплати. Без вигаданих назв клієнтів.',
      en: 'Typical Stripe setups for stores, SaaS, courses and marketplaces: stack, timeline and payouts. No invented client names.',
    }),
    path: '/clients',
    locale,
  })
}

export default async function ClientsPage({ params }: Props) {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale
  const title = labelClients(locale)

  const labels = {
    task: pickLocaleCopy(locale, { ru: 'Задача. ', uk: 'Завдання. ', en: 'Task. ' }),
    stack: pickLocaleCopy(locale, { ru: 'Набор. ', uk: 'Набір. ', en: 'Stack. ' }),
    time: pickLocaleCopy(locale, { ru: 'Срок. ', uk: 'Строк. ', en: 'Time. ' }),
    payout: pickLocaleCopy(locale, { ru: 'Выплаты. ', uk: 'Виплати. ', en: 'Payout. ' }),
  }

  return (
    <>
      <JsonLdScript
        data={buildGraphJsonLd([
          buildBreadcrumbJsonLd(
            [
              { name: siteConfig.name, path: '/' },
              { name: title, path: '/clients' },
            ],
            locale,
          ),
          buildWebPageJsonLd({
            title,
            description: pickLocaleCopy(locale, {
              ru: 'Типовые подключения по сферам, не именные кейсы.',
              uk: 'Типові підключення за сферами, не іменні кейси.',
              en: 'Typical setups by sector, not named case studies.',
            }),
            path: '/clients',
            locale,
          }),
          {
            '@type': 'ItemList',
            name: title,
            itemListElement: CASES.map((item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: item.sphere[locale],
              url: absoluteUrl(localePath(item.links[0].href, locale)),
            })),
          },
        ])}
      />
      <Navbar />
      <Breadcrumbs
        items={[
          { name: siteConfig.name, path: localePath('/', locale) },
          { name: title, path: localePath('/clients', locale) },
        ]}
      />
      <main className={styles.page}>
        <div className={styles.inner}>
          <header className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
          </header>
          <p className={styles.intro}>
            {pickLocaleCopy(locale, {
              ru: 'Названия компаний и цитаты клиентов мы не публикуем: письменного согласия на это нет, а выдуманный отзыв хуже, чем его отсутствие. Ниже — типовые подключения по сферам: что ставим, за какой срок идёт базовый запуск и куда уходят выплаты. Это не проверенная выручка конкретных клиентов.',
              uk: 'Назви компаній і цитати клієнтів ми не публікуємо: письмової згоди на це немає, а вигаданий відгук гірший за його відсутність. Нижче — типові підключення за сферами: що ставимо, за який строк іде базовий запуск і куди йдуть виплати. Це не перевірена виручка конкретних клієнтів.',
              en: 'We do not publish client brand names or quotes. There is no written consent for that, and a fake review would be worse than none. Below are typical setups by sector: what is connected, how long a basic launch takes, and how money is paid out. These are not audited revenue results.',
            })}
          </p>

          <div className={styles.grid}>
            {CASES.map((item) => (
              <article key={item.id} className={styles.card}>
                <div className={styles.media}>
                  <Image
                    src={item.image}
                    alt={item.imageAlt[locale]}
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    className={styles.mediaImage}
                  />
                </div>
                <div className={styles.body}>
                  <h2 className={styles.sphere}>{item.sphere[locale]}</h2>
                  <dl className={styles.meta}>
                    <div className={styles.metaRow}>
                      <dt>{labels.task}</dt>
                      <dd>{item.task[locale]}</dd>
                    </div>
                    <div className={styles.metaRow}>
                      <dt>{labels.stack}</dt>
                      <dd>{item.stack[locale]}</dd>
                    </div>
                    <div className={styles.metaRow}>
                      <dt>{labels.time}</dt>
                      <dd>{item.time[locale]}</dd>
                    </div>
                    <div className={styles.metaRow}>
                      <dt>{labels.payout}</dt>
                      <dd>{item.payout[locale]}</dd>
                    </div>
                  </dl>
                  <ul className={styles.links}>
                    {item.links.map((link) => (
                      <li key={link.href}>
                        <Link href={localePath(link.href, locale)}>
                          {link.label[locale]}
                          <span aria-hidden="true">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <section className={styles.noteCard} aria-labelledby="clients-restricted-heading">
            <h2 id="clients-restricted-heading" className={styles.noteTitle}>
              {pickLocaleCopy(locale, {
                ru: 'Ограниченные ниши',
                uk: 'Обмежені ніші',
                en: 'Restricted niches',
              })}
            </h2>
            <p className={styles.noteText}>
              {pickLocaleCopy(locale, {
                ru: 'Forex, gaming, adult и похожие категории здесь не стоят как истории успеха. Stripe многие из них ограничивает. Сначала смотрим сайт и можем отказать в заявке.',
                uk: 'Forex, gaming, adult і схожі категорії тут не стоять як історії успіху. Stripe багато з них обмежує. Спочатку дивимося сайт і можемо відмовити в заявці.',
                en: 'Forex, gaming, adult and similar categories are not listed here as success stories. Stripe restricts many of them. We review the site first and may decline the request.',
              })}
            </p>
            <ul className={styles.links}>
              <li>
                <Link href={localePath('/niches/high-risk', locale)}>
                  {pickLocaleCopy(locale, {
                    ru: 'High-risk ниши',
                    uk: 'High-risk ніші',
                    en: 'High-risk niches',
                  })}
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
              <li>
                <Link href={localePath('/niches/forex', locale)}>
                  {pickLocaleCopy(locale, { ru: 'Forex', uk: 'Forex', en: 'Forex' })}
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
              <li>
                <Link href={localePath('/niches/gaming', locale)}>
                  {pickLocaleCopy(locale, { ru: 'Gaming', uk: 'Gaming', en: 'Gaming' })}
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            </ul>
          </section>

          <section className={styles.services} aria-labelledby="clients-services-heading">
            <h2 id="clients-services-heading" className={styles.servicesTitle}>
              {labelServices(locale)}
            </h2>
            <ul className={styles.servicesList}>
              <li>
                <Link href={localePath('/services/processing-turnkey', locale)}>
                  {pickLocaleCopy(locale, {
                    ru: 'Процессинг Stripe под ключ',
                    uk: 'Процесинг Stripe під ключ',
                    en: 'Turnkey Stripe processing',
                  })}
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
              <li>
                <Link href={localePath('/services/stripe-account-rent', locale)}>
                  {pickLocaleCopy(locale, {
                    ru: 'Аренда аккаунта Stripe',
                    uk: 'Оренда акаунта Stripe',
                    en: 'Rent a Stripe account',
                  })}
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
              <li>
                <Link href={localePath('/services/stripe-account-buy', locale)}>
                  {pickLocaleCopy(locale, {
                    ru: 'Покупка аккаунта Stripe',
                    uk: 'Купівля акаунта Stripe',
                    en: 'Buy a Stripe account',
                  })}
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
              <li>
                <Link href={localePath('/niches', locale)}>
                  {pickLocaleCopy(locale, {
                    ru: 'Все ниши для Stripe',
                    uk: 'Усі ніші для Stripe',
                    en: 'All Stripe niches',
                  })}
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
              <li>
                <Link href={localePath('/about', locale)}>
                  {labelAbout(locale)}
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <PriorityLinks locale={locale} />
      <Footer />
    </>
  )
}
