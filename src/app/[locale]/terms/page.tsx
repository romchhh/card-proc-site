import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Breadcrumbs from '../../components/seo/Breadcrumbs'
import JsonLdScript from '../../components/seo/JsonLdScript'
import { isValidLocale, localePath, pickLocaleCopy, type Locale } from '@/lib/i18n/config'
import { labelContacts, labelDisclaimer, labelPrivacy } from '@/lib/i18n/labels'
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageMetadata, buildWebPageJsonLd } from '@/lib/seo'
import { siteConfig } from '@/lib/site'
import styles from '../../components/PrivacyPage.module.css'

type Props = { params: Promise<{ locale: string }> }

type Section = { title: string; paragraphs: string[] }

const SECTIONS: Record<Locale, Section[]> = {
  ru: [
    {
      title: 'Кто оказывает сервис',
      paragraphs: [
        'WayOfProcessing ведёт MSM FINANCIAL CONSULTANCY LIMITED, Великобритания, company number 04820256, адрес 45 Avion Gardens, Kings Hill, West Malling, England, ME19 4RH.',
        'Сервис независимый и не аффилирован со Stripe, Inc.',
      ],
    },
    {
      title: 'Что можно заказать',
      paragraphs: [
        'После проверки ниши мы можем предложить аренду аккаунта, покупку, процессинг под ключ или комплект «компания и банк». Заявка сама по себе не является заказом.',
        'Комиссия процессинга начинается от 1.5%. Ставку, срок и схему выплат фиксируем до запуска. Базовое подключение часто занимает от 3 рабочих дней, если готовы сайт и описание деятельности.',
      ],
    },
    {
      title: 'Что от нас не зависит',
      paragraphs: [
        'Верификацию, лимиты, review и блокировки решает Stripe. Мы не гарантируем, что аккаунт одобрят или что он останется открытым.',
        'Товар, политики сайта, качество трафика и chargeback rate остаются на стороне клиента.',
      ],
    },
    {
      title: 'Данные',
      paragraphs: ['Персональные данные из формы заявки обрабатываются так, как описано в политике конфиденциальности.'],
    },
  ],
  uk: [
    {
      title: 'Хто надає сервіс',
      paragraphs: [
        'WayOfProcessing веде MSM FINANCIAL CONSULTANCY LIMITED, Велика Британія, company number 04820256, адреса 45 Avion Gardens, Kings Hill, West Malling, England, ME19 4RH.',
        'Сервіс незалежний і не афілійований зі Stripe, Inc.',
      ],
    },
    {
      title: 'Що можна замовити',
      paragraphs: [
        'Після перевірки ніші ми можемо запропонувати оренду акаунта, купівлю, процесинг під ключ або комплект «компанія і банк». Заявка сама по собі не є замовленням.',
        'Комісія процесингу починається від 1.5%. Ставку, строк і схему виплат фіксуємо до запуску. Базове підключення часто займає від 3 робочих днів, якщо готові сайт і опис діяльності.',
      ],
    },
    {
      title: 'Що від нас не залежить',
      paragraphs: [
        'Верифікацію, ліміти, review і блокування вирішує Stripe. Ми не гарантуємо, що акаунт схвалить або що він залишиться відкритим.',
        'Товар, політики сайту, якість трафіку і chargeback rate залишаються на боці клієнта.',
      ],
    },
    {
      title: 'Дані',
      paragraphs: ['Персональні дані з форми заявки обробляються так, як описано в політиці конфіденційності.'],
    },
  ],
  en: [
    {
      title: 'Who provides the service',
      paragraphs: [
        'WayOfProcessing is operated by MSM FINANCIAL CONSULTANCY LIMITED, United Kingdom, company number 04820256, registered office 45 Avion Gardens, Kings Hill, West Malling, England, ME19 4RH.',
        'The service is independent and is not affiliated with Stripe, Inc.',
      ],
    },
    {
      title: 'What you can order',
      paragraphs: [
        'After a niche review we may offer account rental, an account purchase, turnkey processing, or a company plus bank package. A request is not an automatic order.',
        'Processing fees start from 1.5%. The rate, timeline and payout scheme are confirmed in writing before launch. A basic setup is often from 3 business days when the site and activity description are ready.',
      ],
    },
    {
      title: 'What stays outside our control',
      paragraphs: [
        'Stripe decides verification, limits, reviews and suspensions. We do not guarantee that an account will be approved or that it will stay open.',
        'You remain responsible for the product, the website policies, traffic quality and the chargeback rate.',
      ],
    },
    {
      title: 'Data',
      paragraphs: ['Personal data from the request form is handled as described in the privacy policy.'],
    },
  ],
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale

  return buildPageMetadata({
    title: pickLocaleCopy(locale, {
      ru: 'Условия сервиса | WayOfProcessing',
      uk: 'Умови сервісу | WayOfProcessing',
      en: 'Terms of service | WayOfProcessing',
    }),
    description: pickLocaleCopy(locale, {
      ru: 'Что делает WayOfProcessing, как считается комиссия и что Stripe может отказать или ограничить аккаунт.',
      uk: 'Що робить WayOfProcessing, як рахується комісія і що Stripe може відмовити або обмежити акаунт.',
      en: 'What WayOfProcessing provides, how fees are quoted, and that Stripe may still decline or restrict an account.',
    }),
    path: '/terms',
    locale,
  })
}

export default async function TermsPage({ params }: Props) {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale
  const title = pickLocaleCopy(locale, {
    ru: 'Условия сервиса',
    uk: 'Умови сервісу',
    en: 'Terms of service',
  })
  const description = pickLocaleCopy(locale, {
    ru: 'Сервис — подключение Stripe для бизнеса. Это не обещание, что Stripe одобрит аккаунт.',
    uk: 'Сервіс — підключення Stripe для бізнесу. Це не обіцянка, що Stripe схвалить акаунт.',
    en: 'The service is a Stripe setup for a business. It is not a promise that Stripe will approve the account.',
  })
  const sections = SECTIONS[locale]

  return (
    <>
      <JsonLdScript
        data={buildGraphJsonLd([
          buildBreadcrumbJsonLd(
            [
              { name: siteConfig.name, path: '/' },
              { name: title, path: '/terms' },
            ],
            locale,
          ),
          buildWebPageJsonLd({ title, description, path: '/terms', locale }),
        ])}
      />
      <Navbar />
      <Breadcrumbs
        items={[
          { name: siteConfig.name, path: localePath('/', locale) },
          { name: title, path: localePath('/terms', locale) },
        ]}
      />
      <main className={styles.page}>
        <article className={styles.inner}>
          <header className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
          </header>
          <p className={styles.intro}>{description}</p>
          <div className={styles.sections}>
            {sections.map((section) => (
              <section key={section.title} className={styles.section}>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
                <div className={styles.paragraphs}>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                {pickLocaleCopy(locale, { ru: 'Документы', uk: 'Документи', en: 'Documents' })}
              </h2>
              <ul className={styles.list}>
                <li>
                  <Link href={localePath('/privacy', locale)} className={styles.contactLink}>
                    {labelPrivacy(locale)}
                  </Link>
                </li>
                <li>
                  <Link href={localePath('/disclaimer', locale)} className={styles.contactLink}>
                    {labelDisclaimer(locale)}
                  </Link>
                </li>
                <li>
                  <Link href={localePath('/contacts', locale)} className={styles.contactLink}>
                    {labelContacts(locale)}
                  </Link>
                </li>
              </ul>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
