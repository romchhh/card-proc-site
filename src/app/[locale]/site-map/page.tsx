import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Breadcrumbs from '../../components/seo/Breadcrumbs'
import JsonLdScript from '../../components/seo/JsonLdScript'
import { getAllPosts, localizePost } from '@/lib/blog'
import { isValidLocale, localePath, pickLocaleCopy, type Locale } from '@/lib/i18n/config'
import {
  labelAbout,
  labelBlog,
  labelClients,
  labelContacts,
  labelDisclaimer,
  labelPrivacy,
  labelServices,
  labelSiteMap,
  labelTerms,
} from '@/lib/i18n/labels'
import { absoluteUrl, buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageMetadata, buildWebPageJsonLd } from '@/lib/seo'
import { getAllLandings, getLandingView, getLandingsByGroup } from '@/lib/landings'
import { SERVICE_SLUGS, getServiceBySlug, getServiceView } from '@/lib/services'
import { siteConfig } from '@/lib/site'
import styles from './page.module.css'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale

  return buildPageMetadata({
    title: `${labelSiteMap(locale)} | WayOfProcessing`,
    description: pickLocaleCopy(locale, {
      ru: 'Полная карта сайта WayOfProcessing: услуги Stripe, юрисдикции, ниши, решения и статьи блога.',
      uk: 'Повна карта сайту WayOfProcessing: послуги Stripe, юрисдикції, ніші, рішення і статті блогу.',
      en: 'Full WayOfProcessing site map: Stripe services, jurisdictions, niches, solutions and blog guides.',
    }),
    path: '/site-map',
    locale,
  })
}

export default async function SiteMapPage({ params }: Props) {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale

  const services = SERVICE_SLUGS.map((slug) => {
    const service = getServiceBySlug(slug)
    if (!service) return null
    return { slug, title: getServiceView(service, locale).h1 }
  }).filter(Boolean) as { slug: string; title: string }[]

  const posts = getAllPosts().map((post) => ({
    slug: post.slug,
    title: localizePost(post, locale).title,
  }))

  const jurisdictions = getLandingsByGroup('jurisdictions').map((landing) => ({
    path: landing.path,
    title: getLandingView(landing, locale).h1,
  }))
  const niches = getLandingsByGroup('niches').map((landing) => ({
    path: landing.path,
    title: getLandingView(landing, locale).h1,
  }))
  const solutions = getLandingsByGroup('solutions').map((landing) => ({
    path: landing.path,
    title: getLandingView(landing, locale).h1,
  }))

  const allLinks = [
    { name: siteConfig.name, path: '/' },
    { name: labelAbout(locale), path: '/about' },
    { name: labelClients(locale), path: '/clients' },
    { name: labelContacts(locale), path: '/contacts' },
    { name: labelServices(locale), path: '/services' },
    {
      name: pickLocaleCopy(locale, {
        ru: 'Аренда или покупка',
        uk: 'Оренда чи купівля',
        en: 'Rent vs buy',
      }),
      path: '/compare/rent-vs-buy',
    },
    {
      name: pickLocaleCopy(locale, {
        ru: 'Stripe по странам',
        uk: 'Stripe за країнами',
        en: 'Stripe by country',
      }),
      path: '/jurisdictions',
    },
    {
      name: pickLocaleCopy(locale, {
        ru: 'Stripe для ниш',
        uk: 'Stripe для ніш',
        en: 'Stripe niches',
      }),
      path: '/niches',
    },
    ...services.map((service) => ({
      name: service.title,
      path: `/services/${service.slug}`,
    })),
    ...getAllLandings().map((landing) => ({
      name: getLandingView(landing, locale).h1,
      path: landing.path,
    })),
    { name: labelBlog(locale), path: '/blog' },
    ...posts.map((post) => ({
      name: post.title,
      path: `/blog/${post.slug}`,
    })),
  ]

  const graph = buildGraphJsonLd([
    buildBreadcrumbJsonLd(
      [
        { name: siteConfig.name, path: '/' },
        { name: labelSiteMap(locale), path: '/site-map' },
      ],
      locale,
    ),
    buildWebPageJsonLd({
      title: labelSiteMap(locale),
      description: pickLocaleCopy(locale, {
        ru: 'Полный список страниц сайта: услуги Stripe, юрисдикции, ниши, решения и блог.',
        uk: 'Повний список сторінок сайту: послуги Stripe, юрисдикції, ніші, рішення і блог.',
        en: 'Full list of site pages: Stripe services, jurisdictions, niches, solutions and blog.',
      }),
      path: '/site-map',
      locale,
      pageType: 'CollectionPage',
    }),
    {
      '@type': 'ItemList',
      name: labelSiteMap(locale),
      numberOfItems: allLinks.length,
      itemListElement: allLinks.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: absoluteUrl(localePath(item.path, locale)),
      })),
    },
  ])

  return (
    <>
      <JsonLdScript data={graph} />
      <Navbar />
      <Breadcrumbs
        items={[
          { name: 'WayOfProcessing', path: localePath('/', locale) },
          { name: labelSiteMap(locale), path: localePath('/site-map', locale) },
        ]}
      />
      <main className={styles.main}>
        <h1>{labelSiteMap(locale)}</h1>
        <p className={styles.lead}>
          {pickLocaleCopy(locale, {
            ru: 'Все индексируемые страницы: услуги подключения Stripe, страны, ниши, решения для Украины и блокировок, а также статьи блога.',
            uk: 'Усі індексовані сторінки: послуги підключення Stripe, країни, ніші, рішення для України та блокувань, а також статті блогу.',
            en: 'All indexable pages: Stripe setup services, countries, niches, Ukraine and account-issue solutions, plus blog guides.',
          })}
        </p>

        <h2>
          {pickLocaleCopy(locale, { ru: 'Основное', uk: 'Основне', en: 'Main' })}
        </h2>
        <ul>
          <li>
            <Link href={localePath('/', locale)}>
              {pickLocaleCopy(locale, {
                ru: 'Главная — Stripe как платёжная система',
                uk: 'Головна — Stripe як платіжна система',
                en: 'Homepage — Stripe payment system',
              })}
            </Link>
          </li>
          <li>
            <Link href={localePath('/about', locale)}>{labelAbout(locale)}</Link>
          </li>
          <li>
            <Link href={localePath('/clients', locale)}>{labelClients(locale)}</Link>
          </li>
          <li>
            <Link href={localePath('/contacts', locale)}>{labelContacts(locale)}</Link>
          </li>
          <li>
            <Link href={localePath('/services', locale)}>{labelServices(locale)}</Link>
          </li>
          <li>
            <Link href={localePath('/compare/rent-vs-buy', locale)}>
              {pickLocaleCopy(locale, {
                ru: 'Аренда или покупка аккаунта Stripe',
                uk: 'Оренда чи купівля акаунта Stripe',
                en: 'Rent or buy a Stripe account',
              })}
            </Link>
          </li>
          <li>
            <Link href={localePath('/jurisdictions', locale)}>
              {pickLocaleCopy(locale, {
                ru: 'Stripe по странам — хаб юрисдикций',
                uk: 'Stripe за країнами — хаб юрисдикцій',
                en: 'Stripe by country — jurisdictions hub',
              })}
            </Link>
          </li>
          <li>
            <Link href={localePath('/niches', locale)}>
              {pickLocaleCopy(locale, {
                ru: 'Stripe для ниш — хаб',
                uk: 'Stripe для ніш — хаб',
                en: 'Stripe niches — hub',
              })}
            </Link>
          </li>
          <li>
            <Link href={localePath('/blog', locale)}>{labelBlog(locale)}</Link>
          </li>
          <li>
            <Link href={localePath('/privacy', locale)}>{labelPrivacy(locale)}</Link>
          </li>
          <li>
            <Link href={localePath('/terms', locale)}>{labelTerms(locale)}</Link>
          </li>
          <li>
            <Link href={localePath('/disclaimer', locale)}>{labelDisclaimer(locale)}</Link>
          </li>
        </ul>

        <h2>{labelServices(locale)}</h2>
        <ul>
          {services.map((service) => (
            <li key={service.slug}>
              <Link href={localePath(`/services/${service.slug}`, locale)}>{service.title}</Link>
            </li>
          ))}
        </ul>

        <h2>
          {pickLocaleCopy(locale, {
            ru: 'Юрисдикции для Stripe',
            uk: 'Юрисдикції для Stripe',
            en: 'Jurisdictions for Stripe',
          })}
        </h2>
        <ul>
          {jurisdictions.map((landing) => (
            <li key={landing.path}>
              <Link href={localePath(landing.path, locale)}>{landing.title}</Link>
            </li>
          ))}
        </ul>

        <h2>
          {pickLocaleCopy(locale, {
            ru: 'Ниши для Stripe',
            uk: 'Ніші для Stripe',
            en: 'Niches for Stripe',
          })}
        </h2>
        <ul>
          {niches.map((landing) => (
            <li key={landing.path}>
              <Link href={localePath(landing.path, locale)}>{landing.title}</Link>
            </li>
          ))}
        </ul>

        <h2>
          {pickLocaleCopy(locale, {
            ru: 'Решения',
            uk: 'Рішення',
            en: 'Solutions',
          })}
        </h2>
        <ul>
          {solutions.map((landing) => (
            <li key={landing.path}>
              <Link href={localePath(landing.path, locale)}>{landing.title}</Link>
            </li>
          ))}
        </ul>

        <h2>
          {pickLocaleCopy(locale, { ru: 'Статьи', uk: 'Статті', en: 'Guides' })}
        </h2>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={localePath(`/blog/${post.slug}`, locale)}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  )
}
