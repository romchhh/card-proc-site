import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Breadcrumbs from '../../components/seo/Breadcrumbs'
import JsonLdScript from '../../components/seo/JsonLdScript'
import { isValidLocale, localePath, pickLocaleCopy, type Locale } from '@/lib/i18n/config'
import { labelAbout, labelContacts, labelPrivacy, labelTerms } from '@/lib/i18n/labels'
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageMetadata, buildWebPageJsonLd } from '@/lib/seo'
import { siteConfig } from '@/lib/site'
import styles from '../../components/PrivacyPage.module.css'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale

  return buildPageMetadata({
    title: `${labelContacts(locale)} | WayOfProcessing`,
    description: pickLocaleCopy(locale, {
      ru: 'Контакты WayOfProcessing: заявка на подключение Stripe, аренду или покупку аккаунта. Email, Telegram, юрадрес UK 04820256.',
      uk: 'Контакти WayOfProcessing: заявка на підключення Stripe, оренду або купівлю акаунта. Email, Telegram, юрадреса UK 04820256.',
      en: 'Contact WayOfProcessing for Stripe setup, account rental or purchase. Email, Telegram, UK registered office 04820256.',
    }),
    path: '/contacts',
    locale,
    keywords: pickLocaleCopy(locale, {
      ru: ['контакты wayofprocessing', 'подключение stripe', 'заявка stripe'],
      uk: ['контакти wayofprocessing', 'підключення stripe', 'заявка stripe'],
      en: ['wayofprocessing contacts', 'connect stripe', 'stripe setup request'],
    }),
  })
}

export default async function ContactsPage({ params }: Props) {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale
  const title = labelContacts(locale)
  const description = pickLocaleCopy(locale, {
    ru: 'Почта, Telegram и юридический адрес MSM Financial Consultancy Limited.',
    uk: 'Пошта, Telegram і юридична адреса MSM Financial Consultancy Limited.',
    en: 'Email, Telegram and the UK registered office of MSM Financial Consultancy Limited.',
  })

  return (
    <>
      <JsonLdScript
        data={buildGraphJsonLd([
          buildBreadcrumbJsonLd(
            [
              { name: siteConfig.name, path: '/' },
              { name: title, path: '/contacts' },
            ],
            locale,
          ),
          buildWebPageJsonLd({ title, description, path: '/contacts', locale }),
        ])}
      />
      <Navbar />
      <Breadcrumbs
        items={[
          { name: siteConfig.name, path: localePath('/', locale) },
          { name: title, path: localePath('/contacts', locale) },
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
              <h2 className={styles.sectionTitle}>
                {pickLocaleCopy(locale, { ru: 'Написать', uk: 'Написати', en: 'Write to us' })}
              </h2>
              <div className={styles.paragraphs}>
                <p>
                  Email:{' '}
                  <a href="mailto:hello@wayofprocessing.com" className={styles.contactLink}>
                    hello@wayofprocessing.com
                  </a>
                </p>
                <p>
                  Telegram:{' '}
                  <a href="https://t.me/wayofprocessing" className={styles.contactLink}>
                    @wayofprocessing
                  </a>
                </p>
                <p>
                  {pickLocaleCopy(locale, {
                    ru: 'Форма заявки также в шапке сайта. Отвечает человек. Ставку и срок называем после проверки ниши, не до неё.',
                    uk: 'Форма заявки також у шапці сайту. Відповідає людина. Ставку і строк називаємо після перевірки ніші, не до неї.',
                    en: 'A request form is also in the header. A person replies. We do not quote a fee or a timeline before the niche is reviewed.',
                  })}
                </p>
              </div>
            </section>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                {pickLocaleCopy(locale, {
                  ru: 'Юридический адрес',
                  uk: 'Юридична адреса',
                  en: 'Registered office',
                })}
              </h2>
              <div className={styles.paragraphs}>
                <p>MSM FINANCIAL CONSULTANCY LIMITED</p>
                <p>Company number: 04820256</p>
                <p>45 Avion Gardens, Kings Hill, West Malling, England, ME19 4RH</p>
                <p>
                  <a
                    href="https://find-and-update.company-information.service.gov.uk/company/04820256"
                    className={styles.contactLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Companies House
                  </a>
                </p>
              </div>
            </section>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                {pickLocaleCopy(locale, {
                  ru: 'Связанные страницы',
                  uk: 'Повʼязані сторінки',
                  en: 'Related pages',
                })}
              </h2>
              <ul className={styles.list}>
                <li>
                  <Link href={localePath('/about', locale)} className={styles.contactLink}>
                    {labelAbout(locale)}
                  </Link>
                </li>
                <li>
                  <Link href={localePath('/terms', locale)} className={styles.contactLink}>
                    {labelTerms(locale)}
                  </Link>
                </li>
                <li>
                  <Link href={localePath('/privacy', locale)} className={styles.contactLink}>
                    {labelPrivacy(locale)}
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
