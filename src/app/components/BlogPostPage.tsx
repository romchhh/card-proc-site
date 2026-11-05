'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import type { BlogPost } from '@/lib/blog'
import { formatBlogDate, getRelatedServiceSlugs, localizePost, SERVICE_LINK_ANCHORS } from '@/lib/blog'
import { getServiceBySlug, getServiceView } from '@/lib/services'
import { labelAnd } from '@/lib/i18n/labels'
import { useLocale, useLocalizedPath } from '@/lib/i18n/use-locale'
import { useContactModal } from './ContactModalProvider'
import BlogPostContent from './BlogPostContent'
import styles from './BlogPostPage.module.css'

export default function BlogPostPage({
  post,
  related,
}: {
  post: BlogPost
  related: BlogPost[]
}) {
  const { t } = useTranslation()
  const { open: openContactModal } = useContactModal()
  const locale = useLocale()
  const lp = useLocalizedPath()
  const view = localizePost(post, locale)
  const relatedServices = getRelatedServiceSlugs(post.slug)
    .map((slug) => {
      const service = getServiceBySlug(slug)
      if (!service) return null
      const serviceView = getServiceView(service, locale)
      return {
        slug,
        title: serviceView.card.title,
        description: serviceView.card.desc,
      }
    })
    .filter(Boolean) as { slug: string; title: string; description: string }[]

  return (
    <article className={styles.page}>
      <div className={styles.inner}>
        <Link href={lp('/blog')} className={styles.back}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10 3 L5 8 L10 13 M5 8 H14" />
          </svg>
          {t('blog.backToBlog')}
        </Link>

        <div className={styles.cover}>
          <Image
            src={view.image}
            alt={view.imageAlt}
            fill
            sizes="(max-width: 900px) 100vw, 760px"
            className={styles.coverImg}
            priority
          />
        </div>

        <header className={styles.header}>
          <div className={styles.meta}>
            <div className={styles.metaLeft}>
              <span className={styles.metaIcon} aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2.5" y="3.5" width="13" height="12" rx="1.5" />
                  <path d="M2.5 7.5 H15.5 M6 2 V5 M12 2 V5" />
                </svg>
              </span>
              <time dateTime={view.date}>{formatBlogDate(view.date, locale)}</time>
              <span className={styles.metaDot} aria-hidden="true">·</span>
              <Link href={lp('/blog')} className={styles.metaCategory}>
                {view.category}
              </Link>
            </div>
            <div className={styles.metaRight}>
              <span className={styles.metaIcon} aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="9" r="6.5" />
                  <path d="M9 5.5 V9 L11.5 11" />
                </svg>
              </span>
              <span>{view.readTime}</span>
            </div>
          </div>
          <h1 className={styles.title}>{view.title}</h1>
          <p className={styles.byline}>
            {t('blog.authorByline', {
              published: formatBlogDate(view.date, locale),
              updated: formatBlogDate(view.date, locale),
              reviewed: formatBlogDate(view.date, locale),
            })}{' '}
            <Link href={lp('/about')} className={styles.inlineLink}>
              {t('blog.authorPolicy')}
            </Link>
          </p>
          <p className={styles.lead}>{view.excerpt}</p>
        </header>

        <BlogPostContent body={view.body} />

        {relatedServices.length > 0 && (
          <p className={styles.paragraph}>
            {t('blog.inlineServicesLead')}{' '}
            {relatedServices.map((item, index) => (
              <span key={item.slug}>
                {index > 0 ? (index === relatedServices.length - 1 ? labelAnd(locale) : ', ') : null}
                <Link href={lp(`/services/${item.slug}`)} className={styles.inlineLink}>
                  {SERVICE_LINK_ANCHORS[locale][item.slug as keyof (typeof SERVICE_LINK_ANCHORS)['ru']]}
                </Link>
              </span>
            ))}
            .
          </p>
        )}

        {relatedServices.length > 0 && (
          <nav className={styles.serviceLinks} aria-label={t('blog.relatedServices')}>
            <h2 className={styles.serviceLinksTitle}>{t('blog.relatedServices')}</h2>
            <ul className={styles.serviceLinksList}>
              {relatedServices.map((item) => (
                <li key={item.slug}>
                  <Link href={lp(`/services/${item.slug}`)} className={styles.serviceLink}>
                    <span className={styles.serviceLinkTitle}>{item.title}</span>
                    <span className={styles.serviceLinkDesc}>{item.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <section className={styles.cta}>
          <h2 className={styles.ctaTitle}>{t('blog.ctaTitle')}</h2>
          <p className={styles.ctaText}>{t('blog.ctaText')}</p>
          <button type="button" className={styles.ctaBtn} onClick={openContactModal}>
            {t('blog.ctaButton')}
            <span className={styles.ctaArrow} aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12 L12 2 M5 2 H12 V9" />
              </svg>
            </span>
          </button>
        </section>

        {related.length > 0 && (
          <section className={styles.related} aria-labelledby="related-heading">
            <div className={styles.relatedHead}>
              <h2 id="related-heading" className={styles.relatedTitle}>
                {t('blog.readAlso')}
              </h2>
              <Link href={lp('/blog')} className={styles.viewAll}>
                {t('blog.viewAll')}
              </Link>
            </div>

            <div className={styles.relatedGrid}>
              {related.map((item) => {
                const itemView = localizePost(item, locale)
                return (
                  <Link key={item.slug} href={lp(`/blog/${item.slug}`)} className={styles.relatedCard}>
                    <div className={styles.relatedImgWrap}>
                      <Image
                        src={itemView.image}
                        alt={itemView.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className={styles.relatedImg}
                      />
                    </div>
                    <div className={styles.relatedBody}>
                      <p className={styles.relatedMeta}>
                        {formatBlogDate(itemView.date, locale)} · {itemView.category}
                      </p>
                      <h3 className={styles.relatedCardTitle}>{itemView.title}</h3>
                      <span className={styles.readMore}>
                        {t('blog.readMore')}
                        <span className={styles.readMoreArrow} aria-hidden="true">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 12 L12 2 M5 2 H12 V9" />
                          </svg>
                        </span>
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        <div className={styles.footerNav}>
          <Link href={lp('/blog')} className={styles.footerLink}>
            {t('blog.backToBlog')}
          </Link>
          <Link href={lp('/')} className={styles.footerLink}>
            {t('blog.backHome')}
          </Link>
        </div>
      </div>
    </article>
  )
}
