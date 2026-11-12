'use client'

import { type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { getPostView } from '@/lib/blog'
import {
  getServiceBySlug,
  getServiceView,
  SERVICE_IMAGES,
  type ServiceSlug,
  type ServiceView,
} from '@/lib/services'
import { useLocalizedPath } from '@/lib/i18n/use-locale'
import { resolveLocale } from '@/lib/i18n/resolve-locale'
import { useContactModal } from './ContactModalProvider'
import Breadcrumbs from './seo/Breadcrumbs'
import PriorityLinks from './seo/PriorityLinks'
import BlogCard from './BlogCard'
import ContentTable from './ContentTable'
import ServiceCard from './ServiceCard'
import SpecialistsSection from './SpecialistsSection'
import TestimonialsSlider from './TestimonialsSlider'
import { getChecklistTable, getLandingGuideTables, getSetupPathTable } from '@/lib/guide-tables'
import type { LandingGroup } from '@/lib/landings'
import styles from './ServicePage.module.css'

type BreadcrumbItem = {
  name: string
  path: string
}

type ProcessStep = {
  title: string
  description: string
}

type Props = {
  /** Classic service pages under /services/[slug] */
  slug?: ServiceSlug
  /** Prebuilt view for landings (jurisdictions / niches / solutions) */
  view?: ServiceView
  image?: string
  breadcrumbs?: BreadcrumbItem[]
  /** Show comparison / checklist tables on SEO landings */
  guideGroup?: LandingGroup
}

function sectionId(index: number) {
  return `section-${index + 1}`
}

function renderParagraphs(paragraphs: string[]) {
  const blocks: ReactNode[] = []
  let listBuffer: string[] = []

  const flushList = () => {
    if (!listBuffer.length) return
    blocks.push(
      <ul key={`list-${blocks.length}`} className={styles.bulletList}>
        {listBuffer.map((item) => (
          <li key={item}>{item.replace(/^-+\s*/, '')}</li>
        ))}
      </ul>,
    )
    listBuffer = []
  }

  paragraphs.forEach((paragraph) => {
    if (paragraph.trim().startsWith('- ')) {
      listBuffer.push(paragraph.trim())
      return
    }
    flushList()
    blocks.push(<p key={paragraph.slice(0, 64)}>{paragraph}</p>)
  })
  flushList()
  return blocks
}

export default function ServicePage({ slug, view: viewProp, image, breadcrumbs, guideGroup }: Props) {
  const { t, i18n } = useTranslation()
  const lp = useLocalizedPath()
  const { open: openContactModal } = useContactModal()
  const locale = resolveLocale(i18n.language)

  const service = slug ? getServiceBySlug(slug) : undefined
  const view = viewProp ?? (service ? getServiceView(service, locale) : null)
  const heroImage = image ?? (slug ? SERVICE_IMAGES[slug] : undefined)

  if (!view || !heroImage) return null

  const isLanding = Boolean(viewProp)
  const guideTables = guideGroup
    ? getLandingGuideTables(guideGroup, locale)
    : slug
      ? [getSetupPathTable(locale), getChecklistTable(locale)]
      : []
  const processSteps = isLanding
    ? []
    : ((t('servicePages.process', { returnObjects: true }) as ProcessStep[]) || [])
  const exploreItems = [
    { href: lp('/services'), label: t('servicePages.explore.services') },
    { href: lp('/compare/rent-vs-buy'), label: t('servicePages.explore.compare') },
    { href: lp('/jurisdictions'), label: t('servicePages.explore.jurisdictions') },
    { href: lp('/niches'), label: t('servicePages.explore.niches') },
    { href: lp('/solutions'), label: t('servicePages.explore.solutions') },
    { href: lp('/solutions/stripe-ukraine'), label: t('servicePages.explore.ukraine') },
    { href: lp('/solutions/stripe-account-issues'), label: t('servicePages.explore.issues') },
  ].filter((item) => {
    const current = breadcrumbs?.[breadcrumbs.length - 1]?.path
    return !current || item.href !== current
  })

  const faqHeading = isLanding
    ? t('servicePages.faqHeadingFor', { topic: view.card.title || view.h1 })
    : t('seo.faqHeading')

  const relatedServices = view.relatedServices
    .map((relatedSlug) => {
      const related = getServiceBySlug(relatedSlug)
      if (!related) return null
      const relatedView = getServiceView(related, locale)
      return {
        slug: relatedSlug,
        title: relatedView.card.title,
        description: relatedView.card.desc,
      }
    })
    .filter(Boolean) as { slug: ServiceSlug; title: string; description: string }[]

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src={heroImage}
            alt={view.h1}
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
          />
        </div>
        <div className={styles.heroOverlay} />

        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className={styles.heroBreadcrumbs}>
            <Breadcrumbs items={breadcrumbs} theme="dark" />
          </div>
        )}

        <div className={styles.heroBody}>
          <div className={styles.heroMainRow}>
            <div className={styles.heroTextBlock}>
              <div className={styles.heroCenter}>
                <h1 className={styles.heroTitle}>{view.h1}</h1>
                <p className={styles.heroDesc}>{view.card.desc}</p>
                <p className={styles.heroBadge}>{view.offer.badge}</p>
              </div>
            </div>

            <button type="button" className={styles.heroCard} onClick={openContactModal}>
              <div className={styles.heroCardText}>
                <p className={styles.heroCardLabel}>{t('hero.cardLabel')}</p>
                <p className={styles.heroCardHighlight}>{view.offer.highlight}</p>
                <p className={styles.heroCardSub}>{view.offer.sub}</p>
              </div>
              <div className={styles.heroCardArrow}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2 14 L14 2 M6 2 H14 V10" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </section>

      <section id="about" className={styles.intro} aria-labelledby="service-intro-heading">
        <div className={styles.introInner}>
          <h2 id="service-intro-heading" className={styles.introHeading}>
            {isLanding ? t('servicePages.aboutTopic') : t('servicePages.aboutService')}
          </h2>
          <div className={styles.introCopy}>
            {(view.intro?.length ? view.intro : [view.lead]).map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className={styles.introText}>
                {paragraph}
              </p>
            ))}
          </div>
          <button type="button" className={styles.introButton} onClick={openContactModal}>
            <span>{t('servicePages.introCta')}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2 14 L14 2 M6 2 H14 V10" />
            </svg>
          </button>
          {view.ctas && view.ctas.length > 0 && (
            <nav className={styles.landingCtas} aria-label={view.h1}>
              {view.ctas.map((cta) => (
                <Link key={cta.path} href={lp(cta.path)} className={styles.landingCta}>
                  {cta.label}
                  <span aria-hidden="true">→</span>
                </Link>
              ))}
            </nav>
          )}
        </div>
      </section>

      <div className={styles.layout}>
        <article className={styles.inner}>
          {view.benefits.length > 0 && (
            <div
              id="benefits"
              className={isLanding ? styles.factsBlock : styles.benefitsBlock}
            >
              <h2 className={isLanding ? styles.factsTitle : styles.benefitsTitle}>
                {isLanding ? t('servicePages.factsHeading') : t('servicePages.benefitsHeading')}
              </h2>
              {isLanding ? (
                <dl className={styles.factsGrid}>
                  {view.benefits.map((benefit) => (
                    <div key={benefit.title} className={styles.factCard}>
                      <dt className={styles.factLabel}>{benefit.title}</dt>
                      <dd className={styles.factValue}>{benefit.description}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <ul className={styles.benefits}>
                  {view.benefits.map((benefit) => (
                    <li key={benefit.title} className={styles.benefitItem}>
                      <div className={styles.benefitIcon} aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <div className={styles.benefitCopy}>
                        <strong className={styles.benefitName}>{benefit.title}</strong>
                        <p className={styles.benefitDesc}>{benefit.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {processSteps.length > 0 && (
            <section id="process" className={styles.processBlock} aria-labelledby="service-process-heading">
              <div className={styles.processHeader}>
                <h2 id="service-process-heading" className={styles.processTitle}>
                  {t('servicePages.processHeading')}
                </h2>
                <p className={styles.processLead}>{t('servicePages.processLead')}</p>
              </div>
              <ol className={styles.processList}>
                {processSteps.map((step, index) => (
                  <li key={step.title} className={styles.processItem}>
                    <span className={styles.processNumber}>{String(index + 1).padStart(2, '0')}</span>
                    <div className={styles.processCopy}>
                      <h3 className={styles.processItemTitle}>{step.title}</h3>
                      <p className={styles.processItemDesc}>{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          <div className={styles.sections}>
            {!isLanding && <h2 className={styles.detailsHeading}>{t('servicePages.detailsHeading')}</h2>}
            {view.sections.map((section, idx) => (
              <section key={section.title} id={sectionId(idx)} className={styles.section}>
                <div className={styles.sectionHeader}>
                  {!isLanding && (
                    <span className={styles.sectionNumber}>{String(idx + 1).padStart(2, '0')}</span>
                  )}
                  {isLanding ? (
                    <h2 className={styles.sectionTitle}>{section.title}</h2>
                  ) : (
                    <h3 className={styles.sectionTitle}>{section.title}</h3>
                  )}
                </div>
                <div className={styles.paragraphs}>{renderParagraphs(section.paragraphs)}</div>
              </section>
            ))}
          </div>

          {guideTables.length > 0 && (
            <div className={styles.guideTables}>
              {guideTables.map((table) => (
                <ContentTable key={table.id} table={table} locale={locale} narrow={false} />
              ))}
            </div>
          )}

          {!isLanding && (
            <div className={styles.ctaBlock}>
              <div className={styles.ctaCard}>
                <div className={styles.ctaContent}>
                  <h3 className={styles.ctaTitle}>{t('servicePages.ctaHeading')}</h3>
                  <p className={styles.ctaDescription}>{t('servicePages.ctaDescription')}</p>
                </div>
                <button type="button" className={styles.ctaButton} onClick={openContactModal}>
                  <span>{t('nav.cta')}</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 14 L14 2 M6 2 H14 V10" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          <nav id="explore" className={styles.exploreSection} aria-labelledby="service-explore-heading">
            <h2 id="service-explore-heading" className={styles.relatedTitle}>
              {t('servicePages.exploreHeading')}
            </h2>
            <p className={styles.exploreLead}>{t('servicePages.exploreLead')}</p>
            <ul className={styles.exploreList}>
              {exploreItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.exploreLink}>
                    {item.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {view.relatedLandings && view.relatedLandings.length > 0 && (
            <nav className={styles.relatedSection} aria-label={view.relatedLandingsHeading}>
              <h2 className={styles.relatedTitle}>{view.relatedLandingsHeading}</h2>
              <ul className={styles.exploreList}>
                {view.relatedLandings.map((item) => (
                  <li key={item.path}>
                    <Link href={lp(item.path)} className={styles.exploreLink}>
                      {item.title}
                      <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {relatedServices.length > 0 && (
            <nav className={styles.relatedSection} aria-label={t('servicePages.relatedServices')}>
              <h2 className={styles.relatedTitle}>{t('servicePages.relatedServices')}</h2>
              <div className={styles.serviceCardsGrid}>
                {relatedServices.map((item) => (
                  <ServiceCard
                    key={item.slug}
                    slug={item.slug}
                    title={item.title}
                    description={item.description}
                    href={lp(`/services/${item.slug}`)}
                    titleAs="h3"
                  />
                ))}
              </div>
            </nav>
          )}

          {view.relatedBlogSlugs.length > 0 && (
            <nav className={styles.relatedSection} aria-label={t('servicePages.relatedBlog')}>
              <h2 className={styles.relatedTitle}>{t('servicePages.relatedBlog')}</h2>
              <div className={styles.blogGrid}>
                {view.relatedBlogSlugs.map((blogSlug) => {
                  const post = getPostView(blogSlug, locale)
                  if (!post) return null
                  return (
                    <BlogCard
                      key={blogSlug}
                      post={post}
                      href={lp(`/blog/${blogSlug}`)}
                      titleAs="h3"
                    />
                  )
                })}
              </div>
            </nav>
          )}

          {!isLanding && <TestimonialsSlider />}

          {view.faq.length > 0 && (
            <section id="faq" className={styles.faqSection} aria-labelledby="service-faq-heading">
              <h2 id="service-faq-heading" className={styles.faqSectionTitle}>
                {faqHeading}
              </h2>
              <div className={styles.faqList}>
                {view.faq.map((item, index) => (
                  <details
                    key={item.question}
                    className={styles.faqItem}
                    id={`faq-${index + 1}`}
                    open={index === 0}
                  >
                    <summary className={styles.faqQuestion}>
                      <span>{item.question}</span>
                      <svg className={styles.faqIcon} width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="6 9 10 13 14 9" />
                      </svg>
                    </summary>
                    <div className={styles.faqAnswerWrap} data-open="true">
                      <div className={styles.faqAnswerInner}>
                        <p className={styles.faqAnswer}>{item.answer}</p>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

        </article>
      </div>

      {!isLanding && <SpecialistsSection compact />}
      <PriorityLinks locale={locale} />
    </div>
  )
}
