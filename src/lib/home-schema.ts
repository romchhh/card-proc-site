import en from '@/locales/en.json'
import ru from '@/locales/ru.json'
import { buildFaqPageJsonLd } from './service-seo'
import { localePath, type Locale } from './i18n/config'
import { absoluteUrl } from './seo'
import { siteConfig } from './site'

const HOW_WE_WORK_STEPS = ['step1', 'step2', 'step3', 'step4'] as const

export function buildHomeJsonLd(locale: Locale) {
  const copy = locale === 'en' ? en : ru
  const faqItems = copy.seo.faq
  const homePath = localePath('/', locale)
  const title = locale === 'en' ? siteConfig.titleEn : siteConfig.titleRu
  const description = locale === 'en' ? siteConfig.descriptionEn : siteConfig.descriptionRu

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        legalName: siteConfig.name,
        url: siteConfig.url,
        slogan: siteConfig.seo.slogan,
        email: siteConfig.email,
        description,
        knowsAbout: siteConfig.seo.knowsAbout,
        logo: {
          '@type': 'ImageObject',
          url: absoluteUrl(siteConfig.ogImage),
          width: 1200,
          height: 630,
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            email: siteConfig.email,
            url: siteConfig.telegramOperatorUrl,
            availableLanguage: ['Russian', 'English'],
            areaServed: siteConfig.seo.areaServed,
          },
        ],
        sameAs: [siteConfig.telegramChannelUrl, siteConfig.telegramOperatorUrl],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        description,
        publisher: { '@id': `${siteConfig.url}/#organization` },
        inLanguage: ['ru', 'en'],
        potentialAction: [
          {
            '@type': 'CommunicateAction',
            target: absoluteUrl(`${homePath}#kontakt`),
            name: locale === 'en' ? 'Submit a request' : 'Оставить заявку',
          },
          {
            '@type': 'ReadAction',
            target: absoluteUrl(localePath('/blog', locale)),
            name: locale === 'en' ? `Read ${siteConfig.name} blog` : `Читать блог ${siteConfig.name}`,
          },
        ],
      },
      {
        '@type': 'FinancialService',
        '@id': `${siteConfig.url}/#service`,
        name: `${siteConfig.name} — ${locale === 'en' ? 'Stripe processing' : 'процессинг Stripe'}`,
        description,
        url: absoluteUrl(homePath),
        provider: { '@id': `${siteConfig.url}/#organization` },
        areaServed: siteConfig.seo.areaServed.map((name) => ({
          '@type': 'Place',
          name,
        })),
        serviceType: [
          'Stripe payment processing',
          'Stripe account setup',
          'Payment routing',
          'International payment acceptance',
          'High-risk payment processing',
        ],
        termsOfService: absoluteUrl(localePath('/privacy', locale)),
        offers: {
          '@type': 'Offer',
          name: locale === 'en' ? 'Stripe processing from 1.5%' : 'Процессинг Stripe от 1.5%',
          description,
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '1.5',
            priceCurrency: 'USD',
            unitText: 'percent commission',
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
        '@type': 'HowTo',
        '@id': `${absoluteUrl(homePath)}#how-to`,
        name: copy.howWeWork.heading,
        description:
          locale === 'en'
            ? `How ${siteConfig.name} connects Stripe: entity, bank, account, reporting and expert support.`
            : `Как ${siteConfig.name} подключает Stripe: юрлицо, банк, аккаунт, отчётность и поддержка экспертов.`,
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
