import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Breadcrumbs from '../../components/seo/Breadcrumbs'
import JsonLdScript from '../../components/seo/JsonLdScript'
import { isValidLocale, localePath, pickLocaleCopy, type Locale } from '@/lib/i18n/config'
import { labelDisclaimer, labelTerms } from '@/lib/i18n/labels'
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageMetadata, buildWebPageJsonLd } from '@/lib/seo'
import { siteConfig } from '@/lib/site'
import styles from '../../components/PrivacyPage.module.css'

type Props = { params: Promise<{ locale: string }> }

const ITEMS: Record<Locale, string[]> = {
  ru: [
    'WayOfProcessing — не Stripe, Inc. и не говорит от имени Stripe.',
    'Тексты сайта не являются налоговой, юридической или инвестиционной консультацией. Налог зависит от страны регистрации и от совета, который вы берёте сами.',
    'Безналоговые юрисдикции мы не предлагаем. Более простая отчётность в одной стране — не обещание нулевого налога.',
    'Stripe может отказать на входе, запросить документы, задержать выплаты или закрыть аккаунт. Routing снижает простой. Он не снимает этот риск.',
    'Примеры на странице клиентов описывают типовой набор и срок. Это не результаты названных компаний и не прогноз вашей выручки.',
    'Цифры, которые нельзя подтвердить независимым источником, — в том числе прежние формулировки «1100 аккаунтов» и «$53 млн оборота» — мы не используем как доказательство.',
  ],
  uk: [
    'WayOfProcessing — не Stripe, Inc. і не говорить від імені Stripe.',
    'Тексти сайту не є податковою, юридичною чи інвестиційною консультацією. Податок залежить від країни реєстрації і від поради, яку ви берете самі.',
    'Безподаткові юрисдикції ми не пропонуємо. Простіша звітність в одній країні — не обіцянка нульового податку.',
    'Stripe може відмовити на вході, запросити документи, затримати виплати або закрити акаунт. Routing зменшує простій. Він не знімає цей ризик.',
    'Приклади на сторінці клієнтів описують типовий набір і строк. Це не результати названих компаній і не прогноз вашої виручки.',
    'Цифри, які не можна підтвердити незалежним джерелом, — зокрема попередні формулювання «1100 акаунтів» і «$53 млн обігу» — ми не використовуємо як доказ.',
  ],
  en: [
    'WayOfProcessing is not Stripe, Inc. and does not speak for Stripe.',
    'Nothing on this site is tax, legal or investment advice. Tax depends on the country of registration and on advice you take yourself.',
    'We do not offer tax-free jurisdictions. A lower reporting burden in one country is not a promise of zero tax.',
    'Stripe can refuse onboarding, request documents, hold payouts or close an account. Routing reduces downtime. It does not remove that risk.',
    'Sector examples on the clients page describe a typical stack and timeline. They are not named client results and they are not a forecast of your revenue.',
    'Figures we cannot document independently — including old claims of 1,100 accounts and $53 million of volume — are not used as proof.',
  ],
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale

  return buildPageMetadata({
    title: `${labelDisclaimer(locale)} | WayOfProcessing`,
    description: pickLocaleCopy(locale, {
      ru: 'WayOfProcessing — не Stripe и не налоговый консультант. Одобрение аккаунта и «нулевые налоги» мы не обещаем.',
      uk: 'WayOfProcessing — не Stripe і не податковий консультант. Схвалення акаунта і «нульові податки» ми не обіцяємо.',
      en: 'WayOfProcessing is not Stripe, not a tax adviser, and does not promise account approval or a tax-free setup.',
    }),
    path: '/disclaimer',
    locale,
  })
}

export default async function DisclaimerPage({ params }: Props) {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale
  const title = labelDisclaimer(locale)
  const description = pickLocaleCopy(locale, {
    ru: 'Прочитайте это, прежде чем считать текст на сайте обещанием результата.',
    uk: 'Прочитайте це, перш ніж вважати текст на сайті обіцянкою результату.',
    en: 'Read this before you treat marketing copy on the site as a promise.',
  })
  const items = ITEMS[locale]

  return (
    <>
      <JsonLdScript
        data={buildGraphJsonLd([
          buildBreadcrumbJsonLd(
            [
              { name: siteConfig.name, path: '/' },
              { name: title, path: '/disclaimer' },
            ],
            locale,
          ),
          buildWebPageJsonLd({ title, description, path: '/disclaimer', locale }),
        ])}
      />
      <Navbar />
      <Breadcrumbs
        items={[
          { name: siteConfig.name, path: localePath('/', locale) },
          { name: title, path: localePath('/disclaimer', locale) },
        ]}
      />
      <main className={styles.page}>
        <article className={styles.inner}>
          <header className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
          </header>
          <p className={styles.intro}>{description}</p>
          <div className={styles.sections}>
            <section className={styles.section}>
              <ul className={styles.list}>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section className={styles.section}>
              <p>
                <Link href={localePath('/terms', locale)} className={styles.contactLink}>
                  {labelTerms(locale)}
                </Link>
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
