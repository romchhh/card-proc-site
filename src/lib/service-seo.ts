import type { ServiceFaqItem, ServiceSlug, ServiceView } from './services'
import { localeHashPath, localePath, pickLocaleCopy, type Locale } from './i18n/config'
import { labelServices } from './i18n/labels'
import { absoluteUrl, buildGraphJsonLd, breadcrumbItemUrl } from './seo'
import { siteConfig } from './site'

export function getDefaultServiceProcess(locale: Locale): { title: string; description: string }[] {
  if (locale === 'en') {
    return [
      {
        title: 'Niche and site review',
        description: 'We map the model, customer geo and public offer before any paperwork.',
      },
      {
        title: 'Choose the format',
        description: 'Rent, buy, turnkey processing, or company + bank — matched to timeline and risk.',
      },
      {
        title: 'Documents and launch',
        description: 'We prepare the stack, bank/account and checkout. Timelines depend on Stripe and bank review.',
      },
      {
        title: 'Ongoing support',
        description: 'Help with payouts, review requests and next steps after go-live.',
      },
    ]
  }
  if (locale === 'uk') {
    return [
      {
        title: 'Оцінка ніші та сайту',
        description: 'Звіряємо модель, гео клієнтів і публічний опис — до подання документів.',
      },
      {
        title: 'Вибір формату',
        description: 'Оренда, купівля, процесинг під ключ або юрособа + банк — під ваш строк і ризик.',
      },
      {
        title: 'Документи і запуск',
        description: 'Готуємо контур, банк/акаунт і checkout. Строки залежать від перевірки Stripe і банку.',
      },
      {
        title: 'Супровід',
        description: 'Допомагаємо з виплатами, review і наступними кроками після старту.',
      },
    ]
  }
  return [
    {
      title: 'Оценка ниши и сайта',
      description: 'Сверяем модель, гео клиентов и публичное описание — до подачи документов.',
    },
    {
      title: 'Выбор формата',
      description: 'Аренда, покупка, процессинг под ключ или юрлицо + банк — под ваш срок и риск.',
    },
    {
      title: 'Документы и запуск',
      description: 'Готовим контур, банк/аккаунт и checkout. Сроки зависят от проверки Stripe и банка.',
    },
    {
      title: 'Сопровождение',
      description: 'Помогаем с выплатами, review и следующими шагами после старта.',
    },
  ]
}


export function buildFaqPageJsonLd(
  faqItems: ServiceFaqItem[],
  pageUrl: string,
  id = '#faq',
) {
  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl}${id}`,
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function buildHowToJsonLd({
  view,
  pageUrl,
  locale,
  steps,
}: {
  view: ServiceView
  pageUrl: string
  locale: Locale
  steps: { title: string; description: string }[]
}) {
  return {
    '@type': 'HowTo',
    '@id': `${pageUrl}#howto`,
    name: pickLocaleCopy(locale, {
      ru: `Как подключить: ${view.h1}`,
      uk: `Як підключити: ${view.h1}`,
      en: `How to set up: ${view.h1}`,
    }),
    description: view.lead,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title,
      text: step.description,
      url: `${pageUrl}#process`,
    })),
  }
}

export function buildServiceJsonLd({
  view,
  slug,
  locale,
  path: pathOverride,
  parent,
  processSteps,
}: {
  view: ServiceView
  slug: string
  locale: Locale
  path?: string
  parent?: { name: string; path: string }
  processSteps?: { title: string; description: string }[]
}) {
  const path = pathOverride ?? `/services/${slug as ServiceSlug}`
  const localizedPath = localePath(path, locale)
  const pageUrl = absoluteUrl(localizedPath)
  const parentName = parent?.name ?? labelServices(locale)
  const parentPath = parent?.path ?? localeHashPath('services', locale)
  const steps =
    processSteps?.length
      ? processSteps
      : view.sections.slice(0, 4).map((section) => ({
          title: section.title,
          description: section.paragraphs[0] ?? view.lead,
        }))

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: siteConfig.name,
          item: absoluteUrl(localePath('/', locale)),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: parentName,
          item: breadcrumbItemUrl(parentPath, locale),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: view.h1,
          item: pageUrl,
        },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: view.meta.title,
      description: view.meta.description,
      isPartOf: { '@id': `${siteConfig.url}/#website` },
      about: { '@id': `${pageUrl}#service` },
      inLanguage: locale,
      hasPart: view.sections.map((section, index) => ({
        '@type': 'WebPageElement',
        name: section.title,
        position: index + 1,
        cssSelector: `#section-${index + 1}`,
      })),
    },
    {
      '@type': 'Service',
      '@id': `${pageUrl}#service`,
      name: view.h1,
      description: [view.lead, ...(view.intro ?? [])].join(' '),
      url: pageUrl,
      provider: { '@id': `${siteConfig.url}/#organization` },
      areaServed: siteConfig.seo.areaServed.map((name) => ({
        '@type': 'Place',
        name,
      })),
      serviceType: pickLocaleCopy(locale, {
        ru: 'Подключение платёжной системы Stripe',
        uk: 'Підключення платіжної системи Stripe',
        en: 'Stripe payment system setup',
      }),
      offers: {
        '@type': 'Offer',
        url: absoluteUrl(`${localePath('/', locale)}#kontakt`),
        availability: 'https://schema.org/InStock',
        priceCurrency: 'EUR',
        description: view.offer.highlight,
      },
    },
  ]

  if (steps.length > 0) {
    graph.push(buildHowToJsonLd({ view, pageUrl, locale, steps }))
  }

  if (view.faq.length > 0) {
    graph.push(buildFaqPageJsonLd(view.faq, pageUrl))
  }

  if (view.relatedServices.length > 0) {
    graph.push({
      '@type': 'ItemList',
      '@id': `${pageUrl}#related-services`,
      name: pickLocaleCopy(locale, {
        ru: 'Связанные услуги Stripe',
        uk: 'Повʼязані послуги Stripe',
        en: 'Related Stripe services',
      }),
      itemListElement: view.relatedServices.map((relatedSlug, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: absoluteUrl(localePath(`/services/${relatedSlug}`, locale)),
        name: relatedSlug,
      })),
    })
  }

  return buildGraphJsonLd(graph)
}
