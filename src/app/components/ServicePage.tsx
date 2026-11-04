'use client'

import { useState, type ReactNode } from 'react'
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
import ServiceCard from './ServiceCard'
import SpecialistsSection from './SpecialistsSection'
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

export default function ServicePage({ slug, view: viewProp, image, breadcrumbs }: Props) {
  const { t, i18n } = useTranslation()
  const lp = useLocalizedPath()
  const { open: openContactModal } = useContactModal()
  const locale = resolveLocale(i18n.language)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const service = slug ? getServiceBySlug(slug) : undefined
  const view = viewProp ?? (service ? getServiceView(service, locale) : null)
  const heroImage = image ?? (slug ? SERVICE_IMAGES[slug] : undefined)

  if (!view || !heroImage) return null

  const processSteps = (t('servicePages.process', { returnObjects: true }) as ProcessStep[]) || []
  const explore = {
    services: { href: lp('/services'), label: t('servicePages.explore.services') },
    compare: { href: lp('/compare/rent-vs-buy'), label: t('servicePages.explore.compare') },
    jurisdictions: { href: lp('/jurisdictions'), label: t('servicePages.explore.jurisdictions') },
    niches: { href: lp('/niches'), label: t('servicePages.explore.niches') },
    ukraine: { href: lp('/solutions/stripe-ukraine'), label: t('servicePages.explore.ukraine') },
    issues: { href: lp('/solutions/stripe-account-issues'), label: t('servicePages.explore.issues') },
  }

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
            {t('servicePages.aboutService')}
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
        </div>
      </section>

      <div className={styles.layout}>
        <article className={styles.inner}>
          <div id="benefits" className={styles.benefitsBlock}>
            <h2 className={styles.benefitsTitle}>{t('servicePages.benefitsHeading')}</h2>
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
          </div>

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
            <h2 className={styles.detailsHeading}>{t('servicePages.detailsHeading')}</h2>
            {view.sections.map((section, idx) => (
              <section key={section.title} id={sectionId(idx)} className={styles.section}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNumber}>{String(idx + 1).padStart(2, '0')}</span>
                  <h3 className={styles.sectionTitle}>{section.title}</h3>
                </div>
                <div className={styles.paragraphs}>{renderParagraphs(section.paragraphs)}</div>
              </section>
            ))}
          </div>

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

          <nav id="explore" className={styles.exploreSection} aria-labelledby="service-explore-heading">
            <h2 id="service-explore-heading" className={styles.relatedTitle}>
              {t('servicePages.exploreHeading')}
            </h2>
            <p className={styles.exploreLead}>{t('servicePages.exploreLead')}</p>
            <ul className={styles.exploreList}>
              {Object.values(explore).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.exploreLink}>
                    {item.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

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

          {view.faq.length > 0 && (
            <section id="faq" className={styles.faqSection} aria-labelledby="service-faq-heading">
              <h2 id="service-faq-heading" className={styles.faqSectionTitle}>
                {t('seo.faqHeading')}
              </h2>
              <div className={styles.faqList}>
                {view.faq.map((item, index) => {
                  const isOpen = openFaqIndex === index

                  return (
                    <article
                      key={item.question}
                      className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}
                    >
                      <h3>
                        <button
                          type="button"
                          className={styles.faqQuestion}
                          aria-expanded={isOpen}
                          onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        >
                          <span>{item.question}</span>
                          <svg className={styles.faqIcon} width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <polyline points="6 9 10 13 14 9" />
                          </svg>
                        </button>
                      </h3>
                      <div
                        className={styles.faqAnswerWrap}
                        aria-hidden={!isOpen}
                        data-open={isOpen}
                      >
                        <div className={styles.faqAnswerInner}>
                          <p className={styles.faqAnswer}>{item.answer}</p>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </section>
          )}

        </article>
      </div>

      <SpecialistsSection compact />
      <PriorityLinks locale={locale} />
    </div>
  )
}
