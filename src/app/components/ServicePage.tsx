'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { getPostView } from '@/lib/blog'
import {
  getServiceBySlug,
  getServiceView,
  SERVICE_IMAGES,
  type ServiceSlug,
} from '@/lib/services'
import { useLocalizedPath } from '@/lib/i18n/use-locale'
import { useContactModal } from './ContactModalProvider'
import Breadcrumbs from './seo/Breadcrumbs'
import BlogCard from './BlogCard'
import ServiceCard from './ServiceCard'
import styles from './ServicePage.module.css'

type BreadcrumbItem = {
  name: string
  path: string
}

type Props = {
  slug: ServiceSlug
  breadcrumbs?: BreadcrumbItem[]
}

export default function ServicePage({ slug, breadcrumbs }: Props) {
  const { t, i18n } = useTranslation()
  const lp = useLocalizedPath()
  const { open: openContactModal } = useContactModal()
  const locale = i18n.language === 'en' ? 'en' : 'ru'
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const service = getServiceBySlug(slug)

  if (!service) return null

  const view = getServiceView(service, locale)
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
            src={SERVICE_IMAGES[slug]}
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

      <section className={styles.intro} aria-labelledby="service-intro-heading">
        <div className={styles.introInner}>
          <h2 id="service-intro-heading" className={styles.introHeading}>
            {t('servicePages.aboutService')}
          </h2>
          <p className={styles.introText}>{view.lead}</p>
          <button type="button" className={styles.introButton} onClick={openContactModal}>
            <span>{t('servicePages.introCta')}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2 14 L14 2 M6 2 H14 V10" />
            </svg>
          </button>
        </div>
      </section>

      <article className={styles.inner}>
        <div className={styles.benefitsBlock}>
          <h2 className={styles.benefitsTitle}>{t('servicePages.benefitsHeading') || 'Ключевые преимущества'}</h2>
          <ul className={styles.benefits}>
            {view.benefits.map((benefit, i) => (
              <li key={benefit} className={styles.benefitItem}>
                <div className={styles.benefitIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.sections}>
          {view.sections.map((section, idx) => (
            <section key={section.title} className={styles.section}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>0{idx + 1}</span>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
              </div>
              <div className={styles.paragraphs}>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className={styles.ctaBlock}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaContent}>
              <h3 className={styles.ctaTitle}>{t('servicePages.ctaHeading') || 'Готовы начать?'}</h3>
              <p className={styles.ctaDescription}>{t('servicePages.ctaDescription') || 'Получите бесплатную консультацию и персональное предложение для вашего бизнеса'}</p>
            </div>
            <button type="button" className={styles.ctaButton} onClick={openContactModal}>
              <span>{t('nav.cta')}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 14 L14 2 M6 2 H14 V10" />
              </svg>
            </button>
          </div>
        </div>

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
          <section className={styles.faqSection} aria-labelledby="service-faq-heading">
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
  )
}
