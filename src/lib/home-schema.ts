import en from '@/locales/en.json'
import ru from '@/locales/ru.json'
import uk from '@/locales/uk.json'
import { getAllPosts, localizePost } from './blog'
import { buildFaqPageJsonLd } from './service-seo'
import { INDEX_BLOG_SLUGS } from './seo-index'
import { SERVICE_SLUGS, getServiceBySlug, getServiceView } from './services'
import { localePath, pickLocaleCopy, type Locale } from './i18n/config'
import { absoluteUrl } from './seo'
import { siteConfig, siteDescription, siteTitle } from './site'

const HOW_WE_WORK_STEPS = ['step1', 'step2', 'step3', 'step4'] as const

export function buildHomeJsonLd(locale: Locale) {
  const copy = pickLocaleCopy(locale, { ru, uk, en })
  const faqItems = copy.seo.faq
  const homePath = localePath('/', locale)
  const title = siteTitle(locale)
  const description = siteDescription(locale)

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        legalName: 'MSM FINANCIAL CONSULTANCY LIMITED',
        alternateName: 'WayOfProcessing',
        url: siteConfig.url,
        slogan: pickLocaleCopy(locale, {
          ru: siteConfig.seo.slogan,
          uk: siteConfig.seo.sloganUk,
          en: siteConfig.seo.slogan,
        }),
        email: siteConfig.email,
        description,
        knowsAbout: siteConfig.seo.knowsAbout,
        identifier: {
          '@type': 'PropertyValue',
          name: 'Company Number',
          value: '04820256',
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: '45 Avion Gardens, Kings Hill',
          addressLocality: 'West Malling',
          postalCode: 'ME19 4RH',
          addressCountry: 'GB',
        },
        logo: {
          '@type': 'ImageObject',
          url: absoluteUrl('/icon.svg'),
          width: 512,
          height: 512,
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            email: siteConfig.email,
            url: siteConfig.telegramOperatorUrl,
            availableLanguage: ['Russian', 'Ukrainian', 'English'],
            areaServed: siteConfig.seo.areaServed,
          },
        ],
        sameAs: [
          siteConfig.telegramChannelUrl,
          siteConfig.telegramOperatorUrl,
          'https://find-and-update.company-information.service.gov.uk/company/04820256',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        description,
        publisher: { '@id': `${siteConfig.url}/#organization` },
        inLanguage: ['ru', 'uk', 'en'],
        potentialAction: [
          {
            '@type': 'CommunicateAction',
            target: absoluteUrl(`${homePath}#kontakt`),
            name: pickLocaleCopy(locale, {
              ru: 'Оставить заявку',
              uk: 'Залишити заявку',
              en: 'Submit a request',
            }),
          },
          {
            '@type': 'ReadAction',
            target: absoluteUrl(localePath('/blog', locale)),
            name: pickLocaleCopy(locale, {
              ru: `Читать блог ${siteConfig.name}`,
              uk: `Читати блог ${siteConfig.name}`,
              en: `Read ${siteConfig.name} blog`,
            }),
          },
        ],
      },
      {
        '@type': 'FinancialService',
        '@id': `${siteConfig.url}/#service`,
        name: pickLocaleCopy(locale, {
          ru: `${siteConfig.name} — платёжная система Stripe и процессинг`,
          uk: `${siteConfig.name} — платіжна система Stripe і процесинг`,
          en: `${siteConfig.name} — Stripe payment system & processing`,
        }),
        description,
        url: absoluteUrl(homePath),
        provider: { '@id': `${siteConfig.url}/#organization` },
        areaServed: siteConfig.seo.areaServed.map((name) => ({
          '@type': 'Place',
          name,
        })),
        serviceType: [
          'Stripe payment system',
          'Stripe payment processing',
          'Payment gateway integration',
          'Payment routing',
          'International payment acceptance',
          'Merchant account setup',
        ],
        termsOfService: absoluteUrl(localePath('/terms', locale)),
        offers: {
          '@type': 'Offer',
          name: pickLocaleCopy(locale, {
            ru: 'Процессинг Stripe — комиссия от 1.5%',
            uk: 'Процесинг Stripe — комісія від 1.5%',
            en: 'Stripe processing — commission from 1.5%',
          }),
          description: pickLocaleCopy(locale, {
            ru: 'Ориентир комиссии от 1.5% в зависимости от ниши, оборота и routing. Не фиксированная гарантированная ставка.',
            uk: 'Орієнтир комісії від 1.5% залежно від ніші, обороту й routing. Не фіксована гарантована ставка.',
            en: 'Indicative commission from 1.5% depending on niche, volume and routing. Not a fixed guaranteed rate.',
          }),
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            minPrice: '1.5',
            priceCurrency: 'USD',
            unitText: 'percent commission from',
          },
          availability: 'https://schema.org/InStock',
          url: absoluteUrl(`${homePath}#kontakt`),
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${absoluteUrl(homePath)}#webpage`,
        url: absoluteUrl(homePath),
        name: title,
        description,
        isPartOf: { '@id': `${siteConfig.url}/#website` },
        about: { '@id': `${siteConfig.url}/#service` },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: absoluteUrl(siteConfig.ogImage),
        },
        inLanguage: locale,
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', '#faq-heading'],
        },
      },
      buildFaqPageJsonLd(faqItems, absoluteUrl(homePath), '#faq'),
      {
        '@type': 'ItemList',
        '@id': `${absoluteUrl(homePath)}#guides-list`,
        name: pickLocaleCopy(locale, {
          ru: 'Материалы о Stripe как платёжной системе',
          uk: 'Матеріали про Stripe як платіжну систему',
          en: 'Stripe payment system guides',
        }),
        itemListElement: INDEX_BLOG_SLUGS.map((slug, index) => {
          const post = getAllPosts().find((item) => item.slug === slug)
          if (!post) return null
          const view = localizePost(post, locale)
          return {
            '@type': 'ListItem',
            position: index + 1,
            name: view.title,
            url: absoluteUrl(localePath(`/blog/${slug}`, locale)),
          }
        }).filter(Boolean),
      },
      {
        '@type': 'ItemList',
        '@id': `${absoluteUrl(homePath)}#services-list`,
        name: pickLocaleCopy(locale, {
          ru: `Услуги ${siteConfig.name}`,
          uk: `Послуги ${siteConfig.name}`,
          en: `${siteConfig.name} services`,
        }),
        itemListElement: SERVICE_SLUGS.map((slug, index) => {
          const service = getServiceBySlug(slug)
          if (!service) return null
          const view = getServiceView(service, locale)
          return {
            '@type': 'ListItem',
            position: index + 1,
            name: view.card.title,
            url: absoluteUrl(localePath(`/services/${slug}`, locale)),
          }
        }).filter(Boolean),
      },
      {
        '@type': 'HowTo',
        '@id': `${absoluteUrl(homePath)}#how-to`,
        name: copy.howWeWork.heading,
        description: pickLocaleCopy(locale, {
          ru: `Как ${siteConfig.name} подключает Stripe: юрлицо, банк, аккаунт, отчётность и поддержка экспертов.`,
          uk: `Як ${siteConfig.name} підключає Stripe: юрособа, банк, акаунт, звітність і підтримка експертів.`,
          en: `How ${siteConfig.name} connects Stripe: entity, bank, account, reporting and expert support.`,
        }),
        totalTime: 'P3D',
        step: HOW_WE_WORK_STEPS.map((key, index) => ({
          '@type': 'HowToStep',
          position: index + 1,
          name: copy.howWeWork[key].title,
          text: copy.howWeWork[key].desc,
          url: absoluteUrl(`${homePath}#how-we-work`),
        })),
      },
    ],
  }
}
