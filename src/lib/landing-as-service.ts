import {
  getLandingByGroupSlug,
  getLandingsByGroup,
  getLandingView,
  getRelatedLandings,
  type Landing,
  type LandingView,
} from './landings'
import { getLandingHero } from './landing-media'
import type { Locale } from './i18n/config'
import type { ServiceBenefit, ServiceOffer, ServiceSlug, ServiceView } from './services'

const CORE_RELATED: ServiceSlug[] = [
  'legal-entity-bank',
  'processing-turnkey',
  'stripe-account-rent',
  'stripe-account-buy',
]

const BLOG_BY_GROUP: Record<Landing['group'], string[]> = {
  jurisdictions: ['stripe-for-your-business', 'how-to-choose-payment-system', 'stripe-platform-rules'],
  niches: ['stripe-restricted-business-categories', 'fast-payment-system-ecommerce', 'stripe-international-payments-integration'],
  solutions: ['stripe-platform-rules', 'what-is-stripe-scaling-business', 'stripe-international-payments-integration'],
}

const HIGH_RISK_NICHES = new Set(['forex', 'gaming', 'high-risk', 'vape', 'adult'])

function offerFrom(view: LandingView, locale: Locale, landing: Landing): ServiceOffer {
  if (landing.group === 'jurisdictions') {
    return {
      badge: locale === 'en' ? 'Entity + bank + Stripe' : locale === 'uk' ? 'Юрособа + банк + Stripe' : 'Юрлицо + банк + Stripe',
      highlight: locale === 'en' ? 'free consult' : locale === 'uk' ? 'безкоштовна консультація' : 'бесплатная консультация',
      sub: locale === 'en' ? 'Jurisdiction match after niche review' : locale === 'uk' ? 'Підбір юрисдикції після оцінки ніші' : 'Подбор юрисдикции после оценки ниши',
    }
  }
  if (landing.group === 'niches') {
    if (HIGH_RISK_NICHES.has(landing.slug)) {
      return {
        badge: locale === 'en' ? 'Restricted niche' : locale === 'uk' ? 'Обмежена ніша' : 'Ограниченная ниша',
        highlight: locale === 'en' ? 'screening first' : locale === 'uk' ? 'спочатку скринінг' : 'сначала скрининг',
        sub: locale === 'en' ? 'No connection guarantee' : locale === 'uk' ? 'Без гарантії підключення' : 'Без гарантии подключения',
      }
    }
    return {
      badge: locale === 'en' ? 'Niche processing' : locale === 'uk' ? 'Процесинг під нішу' : 'Процессинг под нишу',
      highlight: locale === 'en' ? 'honest review' : locale === 'uk' ? 'чесна оцінка' : 'честная оценка',
      sub: locale === 'en' ? 'Format after screening' : locale === 'uk' ? 'Формат після скринінгу' : 'Формат после скрининга',
    }
  }
  return {
    badge: locale === 'en' ? 'Practical solution' : locale === 'uk' ? 'Практичне рішення' : 'Практическое решение',
    highlight: locale === 'en' ? 'free consult' : locale === 'uk' ? 'безкоштовна консультація' : 'бесплатная консультация',
    sub: view.ctas[0]?.label ?? (locale === 'en' ? 'Request a review' : locale === 'uk' ? 'Залишити заявку' : 'Оставить заявку'),
  }
}

function benefitsFrom(view: LandingView, locale: Locale, landing: Landing): ServiceBenefit[] {
  if (view.facts?.length) {
    return view.facts.map((fact) => ({
      title: fact.label,
      description: fact.value,
    }))
  }

  // Prefer titled bullets from content
  const listItems = view.sections
    .flatMap((section) => section.paragraphs)
    .filter((p) => p.trim().startsWith('- '))
    .slice(0, 4)
    .map((p) => {
      const text = p.replace(/^-+\s*/, '')
      const [title, ...rest] = text.split(':')
      if (rest.length) {
        return { title: title.trim(), description: rest.join(':').trim() }
      }
      return { title: text.slice(0, 56), description: text }
    })

  if (listItems.length >= 3) return listItems

  // Use section titles + first prose paragraph as page-specific facts
  const fromSections = view.sections.slice(0, 4).map((section) => {
    const prose = section.paragraphs.find((p) => !p.trim().startsWith('- ')) ?? section.paragraphs[0] ?? ''
    return {
      title: section.title,
      description: prose.length > 160 ? `${prose.slice(0, 157)}…` : prose,
    }
  })
  if (fromSections.length >= 2) return fromSections

  if (landing.group === 'niches' && HIGH_RISK_NICHES.has(landing.slug)) {
    return locale === 'en'
      ? [
          { title: 'Honest screening', description: 'We check the site and model before promising any format.' },
          { title: 'Stripe may refuse', description: 'Restricted niches often fail standard onboarding — we say so upfront.' },
          { title: 'No fake guarantees', description: 'No promise of approval, rent or purchase until the review is done.' },
        ]
      : locale === 'uk'
        ? [
            { title: 'Чесний скринінг', description: 'Перевіряємо сайт і модель до будь-якої обіцянки формату.' },
            { title: 'Stripe може відмовити', description: 'Обмежені ніші часто не проходять стандартне підключення — кажемо це одразу.' },
            { title: 'Без фейкових гарантій', description: 'Без обіцянок схвалення, оренди чи купівлі до завершення оцінки.' },
          ]
        : [
            { title: 'Честный скрининг', description: 'Проверяем сайт и модель до любых обещаний по формату.' },
            { title: 'Stripe может отказать', description: 'Ограниченные ниши часто не проходят стандартное подключение — говорим об этом сразу.' },
            { title: 'Без фейковых гарантий', description: 'Без обещаний одобрения, аренды или покупки до завершения оценки.' },
          ]
  }

  return []
}

function relatedCore(group: Landing['group']): ServiceSlug[] {
  if (group === 'jurisdictions') return ['legal-entity-bank', 'processing-turnkey', 'stripe-account-buy']
  if (group === 'niches') return ['processing-turnkey', 'legal-entity-bank', 'stripe-account-buy']
  return ['legal-entity-bank', 'processing-turnkey', 'stripe-account-rent']
}

export function landingToServiceView(landing: Landing, locale: Locale): ServiceView {
  const view = getLandingView(landing, locale)
  const relatedLandings = getRelatedLandings(landing, locale)

  return {
    meta: view.meta,
    h1: view.h1,
    lead: view.lead,
    intro: view.intro,
    offer: offerFrom(view, locale, landing),
    sections: view.sections,
    benefits: benefitsFrom(view, locale, landing),
    faq: view.faq,
    card: {
      title: view.h1,
      desc: view.lead,
    },
    relatedServices: relatedCore(landing.group).filter((slug) => CORE_RELATED.includes(slug)),
    relatedBlogSlugs: BLOG_BY_GROUP[landing.group],
    relatedLandings,
    relatedLandingsHeading:
      landing.group === 'jurisdictions'
        ? locale === 'en'
          ? 'Other countries'
          : locale === 'uk'
            ? 'Інші країни'
            : 'Другие страны'
        : landing.group === 'niches'
          ? locale === 'en'
            ? 'Other niches'
            : locale === 'uk'
              ? 'Інші ніші'
              : 'Другие ниши'
          : locale === 'en'
            ? 'Related pages'
            : locale === 'uk'
              ? 'Схожі сторінки'
              : 'Похожие страницы',
    ctas: view.ctas?.slice(0, 3),
  }
}

export function getLandingServiceImage(landing: Landing): string {
  return getLandingHero(landing).src
}

export function getAllLandingServices(): Landing[] {
  return [...getLandingsByGroup('jurisdictions'), ...getLandingsByGroup('niches'), ...getLandingsByGroup('solutions')]
}

export function getLandingService(group: Landing['group'], slug: string) {
  return getLandingByGroupSlug(group, slug)
}
