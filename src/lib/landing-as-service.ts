import {
  getLandingByGroupSlug,
  getLandingsByGroup,
  getLandingView,
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
  niches: ['stripe-for-your-business', 'fast-payment-system', 'stripe-international-payments-integration'],
  solutions: ['stripe-platform-rules', 'what-is-stripe-scaling-business', 'international-payments-for-business'],
}

function offerFrom(view: LandingView, locale: Locale, group: Landing['group']): ServiceOffer {
  if (group === 'jurisdictions') {
    return {
      badge: locale === 'en' ? 'Entity + bank + Stripe' : locale === 'uk' ? 'Юрособа + банк + Stripe' : 'Юрлицо + банк + Stripe',
      highlight: locale === 'en' ? 'from 1.5%' : locale === 'uk' ? 'від 1.5%' : 'от 1.5%',
      sub: locale === 'en' ? 'Jurisdiction match after niche review' : locale === 'uk' ? 'Підбір юрисдикції після оцінки ніші' : 'Подбор юрисдикции после оценки ниши',
    }
  }
  if (group === 'niches') {
    return {
      badge: locale === 'en' ? 'Niche processing' : locale === 'uk' ? 'Процесинг під нішу' : 'Процессинг под нишу',
      highlight: locale === 'en' ? 'from 1.5%' : locale === 'uk' ? 'від 1.5%' : 'от 1.5%',
      sub: locale === 'en' ? 'Honest screening before setup' : locale === 'uk' ? 'Чесний скринінг до підключення' : 'Честный скрининг до подключения',
    }
  }
  return {
    badge: locale === 'en' ? 'Practical solution' : locale === 'uk' ? 'Практичне рішення' : 'Практическое решение',
    highlight: locale === 'en' ? 'free consult' : locale === 'uk' ? 'безкоштовна консультація' : 'бесплатная консультация',
    sub: view.ctas[0]?.label ?? (locale === 'en' ? 'Request a review' : locale === 'uk' ? 'Залишити заявку' : 'Оставить заявку'),
  }
}

function benefitsFrom(view: LandingView, locale: Locale): ServiceBenefit[] {
  if (view.facts?.length) {
    return view.facts.map((fact) => ({
      title: fact.label,
      description: fact.value,
    }))
  }

  const defaults =
    locale === 'en'
      ? [
          { title: 'Clear scope', description: 'We map the stack to your niche before any paperwork.' },
          { title: 'Honest limits', description: 'No promise to bypass Stripe rules or guarantee approval.' },
          { title: 'Working formats', description: 'Entity + bank, turnkey processing, rental or purchase.' },
          { title: 'Support after launch', description: 'Help with payouts, review requests and next steps.' },
        ]
      : locale === 'uk'
        ? [
            { title: 'Зрозумілий обсяг', description: 'Спочатку звіряємо стек із нішею, потім документи.' },
            { title: 'Чесні обмеження', description: 'Без обіцянок обійти правила Stripe чи гарантувати схвалення.' },
            { title: 'Робочі формати', description: 'Юрособа + банк, процесинг під ключ, оренда або купівля.' },
            { title: 'Супровід після старту', description: 'Допомога з виплатами, review і наступними кроками.' },
          ]
        : [
            { title: 'Понятный объём', description: 'Сначала сверяем стек с нишей, потом документы.' },
            { title: 'Честные ограничения', description: 'Без обещаний обойти правила Stripe или гарантировать одобрение.' },
            { title: 'Рабочие форматы', description: 'Юрлицо + банк, процессинг под ключ, аренда или покупка.' },
            { title: 'Сопровождение после старта', description: 'Помощь с выплатами, review и следующими шагами.' },
          ]

  // Prefer first section bullets as benefits when present
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
      return { title: text.slice(0, 48), description: text }
    })

  return listItems.length >= 3 ? listItems : defaults
}

function relatedCore(group: Landing['group']): ServiceSlug[] {
  if (group === 'jurisdictions') return ['legal-entity-bank', 'processing-turnkey', 'stripe-account-buy']
  if (group === 'niches') return ['processing-turnkey', 'stripe-account-rent', 'legal-entity-bank']
  return ['legal-entity-bank', 'processing-turnkey', 'stripe-account-rent']
}

export function landingToServiceView(landing: Landing, locale: Locale): ServiceView {
  const view = getLandingView(landing, locale)
  return {
    meta: view.meta,
    h1: view.h1,
    lead: view.lead,
    intro: view.intro,
    offer: offerFrom(view, locale, landing.group),
    sections: view.sections,
    benefits: benefitsFrom(view, locale),
    faq: view.faq,
    card: {
      title: view.h1,
      desc: view.lead,
    },
    relatedServices: relatedCore(landing.group).filter((slug) => CORE_RELATED.includes(slug)),
    relatedBlogSlugs: BLOG_BY_GROUP[landing.group],
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
