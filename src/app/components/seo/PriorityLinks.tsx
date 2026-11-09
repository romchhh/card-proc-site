import Link from 'next/link'
import { localePath, pickLocaleCopy, type Locale } from '@/lib/i18n/config'
import { labelAbout, labelMainPages, labelSiteMap } from '@/lib/i18n/labels'
import { getLandingView, getLandingsByGroup } from '@/lib/landings'
import { SERVICE_SLUGS, getServiceBySlug, getServiceView } from '@/lib/services'
import styles from './PriorityLinks.module.css'

type Props = {
  locale: Locale
}

export default function PriorityLinks({ locale }: Props) {
  const services = SERVICE_SLUGS.map((slug) => {
    const service = getServiceBySlug(slug)
    if (!service) return null
    const view = getServiceView(service, locale)
    return { slug, title: view.h1 }
  }).filter(Boolean) as { slug: string; title: string }[]

  const jurisdictions = getLandingsByGroup('jurisdictions')
  const niches = getLandingsByGroup('niches')
  const solutions = getLandingsByGroup('solutions')

  const coreLinks = [
    {
      href: localePath('/', locale),
      label: pickLocaleCopy(locale, {
        ru: 'Stripe как платёжная система для бизнеса — главная',
        uk: 'Stripe як платіжна система для бізнесу — головна',
        en: 'Stripe payment system for business — homepage',
      }),
    },
    {
      href: localePath('/services', locale),
      label: pickLocaleCopy(locale, {
        ru: 'Все услуги подключения Stripe',
        uk: 'Усі послуги підключення Stripe',
        en: 'All Stripe setup services',
      }),
    },
    {
      href: localePath('/compare/rent-vs-buy', locale),
      label: pickLocaleCopy(locale, {
        ru: 'Аренда или покупка аккаунта Stripe — сравнение',
        uk: 'Оренда чи купівля акаунта Stripe — порівняння',
        en: 'Rent or buy a Stripe account — compare',
      }),
    },
    {
      href: localePath('/compare/stripe-alternatives', locale),
      label: pickLocaleCopy(locale, {
        ru: 'Альтернативы Stripe — Paddle, Lemon Squeezy, Adyen, Mollie',
        uk: 'Альтернативи Stripe — Paddle, Lemon Squeezy, Adyen, Mollie',
        en: 'Stripe alternatives — Paddle, Lemon Squeezy, Adyen, Mollie',
      }),
    },
    {
      href: localePath('/jurisdictions', locale),
      label: pickLocaleCopy(locale, {
        ru: 'Stripe по странам — юрлицо и банк',
        uk: 'Stripe за країнами — юрособа і банк',
        en: 'Stripe by country — company and bank',
      }),
    },
    {
      href: localePath('/niches', locale),
      label: pickLocaleCopy(locale, {
        ru: 'Stripe для ниш бизнеса',
        uk: 'Stripe для ніш бізнесу',
        en: 'Stripe for business niches',
      }),
    },
    ...services.map((service) => ({
      href: localePath(`/services/${service.slug}`, locale),
      label: service.title,
    })),
  ]

  return (
    <nav className={styles.nav} aria-label={labelMainPages(locale)}>
      <div className={styles.inner}>
        <h2 className={styles.title}>
          {pickLocaleCopy(locale, {
            ru: 'Подключение Stripe и услуги',
            uk: 'Підключення Stripe і послуги',
            en: 'Stripe setup and services',
          })}
        </h2>

        <div className={styles.groups}>
          <div className={styles.group}>
            <h3 className={styles.subtitle}>
              {pickLocaleCopy(locale, {
                ru: 'Услуги',
                uk: 'Послуги',
                en: 'Services',
              })}
            </h3>
            <ul className={styles.list}>
              {coreLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.group}>
            <h3 className={styles.subtitle}>
              {pickLocaleCopy(locale, {
                ru: 'Юрисдикции',
                uk: 'Юрисдикції',
                en: 'Jurisdictions',
              })}
            </h3>
            <ul className={styles.list}>
              {jurisdictions.map((landing) => (
                <li key={landing.path}>
                  <Link href={localePath(landing.path, locale)}>{getLandingView(landing, locale).h1}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.group}>
            <h3 className={styles.subtitle}>
              {pickLocaleCopy(locale, {
                ru: 'Ниши',
                uk: 'Ніші',
                en: 'Niches',
              })}
            </h3>
            <ul className={styles.list}>
              {niches.map((landing) => (
                <li key={landing.path}>
                  <Link href={localePath(landing.path, locale)}>{getLandingView(landing, locale).h1}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.group}>
            <h3 className={styles.subtitle}>
              {pickLocaleCopy(locale, {
                ru: 'Решения',
                uk: 'Рішення',
                en: 'Solutions',
              })}
            </h3>
            <ul className={styles.list}>
              {solutions.map((landing) => (
                <li key={landing.path}>
                  <Link href={localePath(landing.path, locale)}>{getLandingView(landing, locale).h1}</Link>
                </li>
              ))}
              <li>
                <Link href={localePath('/about', locale)}>{labelAbout(locale)}</Link>
              </li>
              <li>
                <Link href={localePath('/contacts', locale)}>
                  {pickLocaleCopy(locale, {
                    ru: 'Контакты',
                    uk: 'Контакти',
                    en: 'Contacts',
                  })}
                </Link>
              </li>
              <li>
                <Link href={localePath('/site-map', locale)}>{labelSiteMap(locale)}</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}
