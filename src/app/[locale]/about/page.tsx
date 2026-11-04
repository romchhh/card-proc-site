import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Breadcrumbs from '../../components/seo/Breadcrumbs'
import JsonLdScript from '../../components/seo/JsonLdScript'
import PriorityLinks from '../../components/seo/PriorityLinks'
import { isValidLocale, localePath, pickLocaleCopy, type Locale } from '@/lib/i18n/config'
import { labelAbout, labelClients, labelContacts } from '@/lib/i18n/labels'
import { absoluteUrl, buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageMetadata, buildWebPageJsonLd } from '@/lib/seo'
import { SERVICE_IMAGES, SERVICE_SLUGS, getServiceBySlug, getServiceView } from '@/lib/services'
import { siteConfig } from '@/lib/site'
import styles from './page.module.css'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale

  return buildPageMetadata({
    title: pickLocaleCopy(locale, {
      ru: 'О компании | WayOfProcessing',
      uk: 'Про компанію | WayOfProcessing',
      en: 'About the company | WayOfProcessing',
    }),
    description: pickLocaleCopy(locale, {
      ru: 'WayOfProcessing ведёт MSM Financial Consultancy Limited, компания Великобритании 04820256. Аренда, покупка и процессинг Stripe после проверки ниши.',
      uk: 'WayOfProcessing веде MSM Financial Consultancy Limited, компанія Великої Британії 04820256. Оренда, купівля і процесинг Stripe після перевірки ніші.',
      en: 'WayOfProcessing is operated by MSM Financial Consultancy Limited, UK company 04820256. Stripe rental, purchase and processing after a niche review.',
    }),
    path: '/about',
    locale,
    ogImage: '/images/about-hero.webp',
    ogImageAlt: pickLocaleCopy(locale, {
      ru: 'Офис WayOfProcessing',
      uk: 'Офіс WayOfProcessing',
      en: 'WayOfProcessing office',
    }),
  })
}

export default async function AboutPage({ params }: Props) {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale
  const title = labelAbout(locale)

  const services = SERVICE_SLUGS.map((slug) => {
    const service = getServiceBySlug(slug)
    if (!service) return null
    const view = getServiceView(service, locale)
    return {
      slug,
      title: view.card.title,
      image: SERVICE_IMAGES[slug],
    }
  }).filter(Boolean) as { slug: (typeof SERVICE_SLUGS)[number]; title: string; image: string }[]

  const extraLinks = [
    {
      href: '/jurisdictions',
      title: pickLocaleCopy(locale, {
        ru: 'Stripe по странам',
        uk: 'Stripe за країнами',
        en: 'Stripe by country',
      }),
      image: '/images/landings/uk-hero.webp',
    },
    {
      href: '/niches',
      title: pickLocaleCopy(locale, {
        ru: 'Stripe для ниш',
        uk: 'Stripe для ніш',
        en: 'Stripe niches',
      }),
      image: '/images/landings/saas-hero.webp',
    },
    {
      href: '/solutions/stripe-ukraine',
      title: pickLocaleCopy(locale, {
        ru: 'Stripe для Украины',
        uk: 'Stripe для України',
        en: 'Stripe for Ukraine',
      }),
      image: '/images/landings/ukraine-hero.webp',
    },
    {
      href: '/clients',
      title: labelClients(locale),
      image: '/images/landings/ecommerce-hero.webp',
    },
  ]

  return (
    <>
      <JsonLdScript
        data={buildGraphJsonLd([
          buildBreadcrumbJsonLd(
            [
              { name: siteConfig.name, path: '/' },
              { name: title, path: '/about' },
            ],
            locale,
          ),
          buildWebPageJsonLd({
            title,
            description: pickLocaleCopy(locale, {
              ru: 'WayOfProcessing — MSM Financial Consultancy Limited, Великобритания.',
              uk: 'WayOfProcessing — MSM Financial Consultancy Limited, Велика Британія.',
              en: 'WayOfProcessing is MSM Financial Consultancy Limited, United Kingdom.',
            }),
            path: '/about',
            locale,
            pageType: 'AboutPage',
          }),
          {
            '@type': 'Organization',
            '@id': `${absoluteUrl(localePath('/about', locale))}#org`,
            name: 'MSM FINANCIAL CONSULTANCY LIMITED',
            legalName: 'MSM FINANCIAL CONSULTANCY LIMITED',
            url: siteConfig.url,
            email: 'hello@wayofprocessing.com',
            identifier: '04820256',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '45 Avion Gardens, Kings Hill',
              addressLocality: 'West Malling',
              addressCountry: 'GB',
              postalCode: 'ME19 4RH',
            },
          },
        ])}
      />
      <Navbar transparent />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroBg}>
            <Image
              src="/images/about-hero.webp"
              alt={pickLocaleCopy(locale, {
                ru: 'Офисное пространство WayOfProcessing',
                uk: 'Офісний простір WayOfProcessing',
                en: 'WayOfProcessing office space',
              })}
              fill
              priority
              sizes="100vw"
              className={styles.heroImage}
            />
          </div>
          <div className={styles.heroOverlay} />
          <div className={styles.heroInner}>
            <Breadcrumbs
              items={[
                { name: 'WayOfProcessing', path: localePath('/', locale) },
                { name: title, path: localePath('/about', locale) },
              ]}
              theme="dark"
            />
            <h1 className={styles.heroTitle}>{title}</h1>
            <p className={styles.heroLead}>
              {pickLocaleCopy(locale, {
                ru: 'WayOfProcessing подключает бизнес к Stripe: аренда или покупка аккаунта, процессинг под ключ и комплект «юрлицо + банк». Сервис оказывает компания, зарегистрированная в Великобритании.',
                uk: 'WayOfProcessing підключає бізнес до Stripe: оренда або купівля акаунта, процесинг під ключ і комплект «юрособа + банк». Сервіс надає компанія, зареєстрована у Великій Британії.',
                en: 'WayOfProcessing connects businesses to Stripe: account rental or purchase, turnkey processing, and a company plus bank package. The service is provided by a UK-registered company.',
              })}
            </p>
          </div>
        </section>

        <div className={styles.inner}>
          <section className={styles.legalCard} aria-labelledby="about-legal-heading">
            <div className={styles.legalMedia}>
              <Image
                src="/images/about-legal.webp"
                alt={pickLocaleCopy(locale, {
                  ru: 'Документы и юридическое оформление',
                  uk: 'Документи і юридичне оформлення',
                  en: 'Documents and legal paperwork',
                })}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className={styles.legalImage}
              />
            </div>
            <div className={styles.legalBody}>
              <p className={styles.legalEyebrow}>
                {pickLocaleCopy(locale, {
                  ru: 'Юридическое лицо',
                  uk: 'Юридична особа',
                  en: 'Legal entity',
                })}
              </p>
              <h2 id="about-legal-heading" className={styles.legalTitle}>
                MSM FINANCIAL CONSULTANCY LIMITED
              </h2>
              <div className={styles.legalMeta}>
                <p>
                  <strong>
                    {pickLocaleCopy(locale, {
                      ru: 'Страна регистрации: ',
                      uk: 'Країна реєстрації: ',
                      en: 'Country of registration: ',
                    })}
                  </strong>
                  {pickLocaleCopy(locale, {
                    ru: 'Великобритания',
                    uk: 'Велика Британія',
                    en: 'United Kingdom',
                  })}
                </p>
                <p>
                  <strong>Company number: </strong>04820256
                </p>
                <p>
                  <strong>
                    {pickLocaleCopy(locale, {
                      ru: 'Юридический адрес: ',
                      uk: 'Юридична адреса: ',
                      en: 'Registered office: ',
                    })}
                  </strong>
                  45 Avion Gardens, Kings Hill, West Malling, England, ME19 4RH
                </p>
                <p className={styles.registry}>
                  <a
                    href="https://find-and-update.company-information.service.gov.uk/company/04820256"
                    className={styles.contactLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {pickLocaleCopy(locale, {
                      ru: 'Запись Companies House 04820256 →',
                      uk: 'Запис Companies House 04820256 →',
                      en: 'Companies House record 04820256 →',
                    })}
                  </a>
                </p>
              </div>
            </div>
          </section>

          <section className={styles.section} aria-labelledby="about-services-heading">
            <h2 id="about-services-heading" className={styles.sectionTitle}>
              {pickLocaleCopy(locale, {
                ru: 'Чем занимаемся',
                uk: 'Чим займаємося',
                en: 'What we do',
              })}
            </h2>
            <div className={styles.serviceGrid}>
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={localePath(`/services/${service.slug}`, locale)}
                  className={styles.serviceCard}
                >
                  <div className={styles.serviceMedia}>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="112px"
                      className={styles.serviceImage}
                    />
                  </div>
                  <div className={styles.serviceCopy}>
                    <h3 className={styles.serviceName}>{service.title}</h3>
                    <p className={styles.serviceHint}>
                      {pickLocaleCopy(locale, {
                        ru: 'Подробнее →',
                        uk: 'Детальніше →',
                        en: 'Learn more →',
                      })}
                    </p>
                  </div>
                </Link>
              ))}
              {extraLinks.map((item) => (
                <Link key={item.href} href={localePath(item.href, locale)} className={styles.serviceCard}>
                  <div className={styles.serviceMedia}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="112px"
                      className={styles.serviceImage}
                    />
                  </div>
                  <div className={styles.serviceCopy}>
                    <h3 className={styles.serviceName}>{item.title}</h3>
                    <p className={styles.serviceHint}>
                      {pickLocaleCopy(locale, {
                        ru: 'Открыть →',
                        uk: 'Відкрити →',
                        en: 'Open →',
                      })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <div className={styles.split}>
            <section className={styles.panel} aria-labelledby="about-process-heading">
              <h2 id="about-process-heading" className={styles.panelTitle}>
                {pickLocaleCopy(locale, {
                  ru: 'Как устроена работа',
                  uk: 'Як влаштована робота',
                  en: 'How requests are handled',
                })}
              </h2>
              <p className={styles.panelText}>
                {pickLocaleCopy(locale, {
                  ru: 'Заявка приходит в компанию, а не к именованному продавцу. Мы смотрим нишу, сайт и схему выплат, затем предлагаем аренду, покупку или комплект «компания и банк». Stripe может отказать или позже ограничить аккаунт. Фото и биографии сотрудников мы не публикуем.',
                  uk: 'Заявка надходить до компанії, а не до іменованого продавця. Ми дивимося нішу, сайт і схему виплат, потім пропонуємо оренду, купівлю або комплект «компанія і банк». Stripe може відмовити або пізніше обмежити акаунт. Фото й біографії співробітників ми не публікуємо.',
                  en: 'A request goes to the company, not to a named salesperson. We review the niche, the site and the payout scheme, then propose rental, purchase or a company-and-bank package. Stripe can still decline or later restrict an account. We do not publish staff photos or biographies.',
                })}
              </p>
            </section>

            <section className={`${styles.panel} ${styles.panelWarn}`} aria-labelledby="about-limits-heading">
              <h2 id="about-limits-heading" className={styles.panelTitle}>
                {pickLocaleCopy(locale, {
                  ru: 'Чего мы не обещаем',
                  uk: 'Чого ми не обіцяємо',
                  en: 'What we do not promise',
                })}
              </h2>
              <ul className={styles.panelList}>
                <li>
                  {pickLocaleCopy(locale, {
                    ru: 'Что Stripe одобрит любой проект или никогда не запросит документы.',
                    uk: 'Що Stripe схвалить будь-який проєкт або ніколи не запросить документи.',
                    en: 'That Stripe will approve every project or never ask for documents.',
                  })}
                </li>
                <li>
                  {pickLocaleCopy(locale, {
                    ru: 'Безналоговую юрисдикцию. Налог задаёт закон страны регистрации и консультация на вашей стороне.',
                    uk: 'Безподаткову юрисдикцію. Податок задає закон країни реєстрації і консультація з вашого боку.',
                    en: 'A tax-free jurisdiction. Tax follows the law of the country of registration and your own advice.',
                  })}
                </li>
                <li>
                  {pickLocaleCopy(locale, {
                    ru: 'Сводные цифры вроде «1100 аккаунтов» или «$53 млн». Их нет на сайте: независимого источника мы не публикуем.',
                    uk: 'Зведені цифри на кшталт «1100 акаунтів» чи «$53 млн». Їх немає на сайті: незалежного джерела ми не публікуємо.',
                    en: 'Audited totals such as “1,100 accounts” or “$53 million”. Those figures are not published without an independent source.',
                  })}
                </li>
              </ul>
            </section>
          </div>

          <section className={styles.section} aria-labelledby="about-contacts-heading">
            <h2 id="about-contacts-heading" className={styles.sectionTitle}>
              {labelContacts(locale)}
            </h2>
            <div className={styles.contacts}>
              <div className={styles.contactCard}>
                <p className={styles.contactLabel}>Email</p>
                <p className={styles.contactValue}>
                  <a href="mailto:hello@wayofprocessing.com" className={styles.contactLink}>
                    hello@wayofprocessing.com
                  </a>
                </p>
              </div>
              <div className={styles.contactCard}>
                <p className={styles.contactLabel}>Telegram</p>
                <p className={styles.contactValue}>
                  <a href="https://t.me/wayofprocessing" className={styles.contactLink}>
                    @wayofprocessing
                  </a>
                </p>
              </div>
              <div className={styles.contactCard}>
                <p className={styles.contactLabel}>
                  {pickLocaleCopy(locale, { ru: 'Страница', uk: 'Сторінка', en: 'Page' })}
                </p>
                <p className={styles.contactValue}>
                  <Link href={localePath('/contacts', locale)} className={styles.contactLink}>
                    {pickLocaleCopy(locale, {
                      ru: 'Контакты →',
                      uk: 'Контакти →',
                      en: 'Contacts →',
                    })}
                  </Link>
                </p>
              </div>
              <div className={styles.contactCard}>
                <p className={styles.contactLabel}>
                  {pickLocaleCopy(locale, { ru: 'Кейсы', uk: 'Кейси', en: 'Cases' })}
                </p>
                <p className={styles.contactValue}>
                  <Link href={localePath('/clients', locale)} className={styles.contactLink}>
                    {labelClients(locale)} →
                  </Link>
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <PriorityLinks locale={locale} />
      <Footer />
    </>
  )
}
