'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { getAllServices, getServiceView } from '@/lib/services'
import { getAllPosts, localizePost } from '@/lib/blog'
import { INDEX_BLOG_SLUGS } from '@/lib/seo-index'
import { useLocale, useLocalizedPath } from '@/lib/i18n/use-locale'
import styles from './SeoTextSection.module.css'

export default function SeoTextSection() {
  const { t } = useTranslation()
  const locale = useLocale()
  const lp = useLocalizedPath()
  const paragraphs = t('seo.bottomText').split('\n\n').filter(Boolean)
  const services = getAllServices().map((service) => {
    const view = getServiceView(service, locale)
    return { slug: service.slug, title: view.card.title }
  })

  const postsBySlug = new Map(getAllPosts().map((post) => [post.slug, post]))
  // Keep homepage SEO block focused: 6 strongest indexed guides only.
  const blogLinks = INDEX_BLOG_SLUGS.slice(0, 6).map((slug) => {
    const post = postsBySlug.get(slug)
    if (!post) return null
    const view = localizePost(post, locale)
    return { slug, title: view.title }
  }).filter(Boolean) as { slug: string; title: string }[]

  return (
    <section className={styles.section} aria-labelledby="seo-bottom-title">
      <div className={styles.inner}>
        <h2 id="seo-bottom-title" className={styles.title}>
          {t('seo.bottomTitle')}
        </h2>
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className={styles.text}>
            {paragraph}
          </p>
        ))}
        <h3 className={styles.subheading}>{t('seo.hubsHeading')}</h3>
        <ul className={styles.links}>
          <li>
            <Link href={lp('/jurisdictions')}>{t('homeDirectories.countriesTitle')}</Link>
          </li>
          <li>
            <Link href={lp('/niches')}>{t('homeDirectories.nichesTitle')}</Link>
          </li>
          <li>
            <Link href={lp('/solutions')}>{t('homeDirectories.solutionsTitle')}</Link>
          </li>
        </ul>
        <h3 className={styles.subheading}>{t('seo.guidesHeading')}</h3>
        <ul className={styles.links}>
          {blogLinks.map((post) => (
            <li key={post.slug}>
              <Link href={lp(`/blog/${post.slug}`)}>{post.title}</Link>
            </li>
          ))}
        </ul>
        <h3 className={styles.subheading}>{t('seo.servicesHeading')}</h3>
        <ul className={styles.links}>
          {services.map((service) => (
            <li key={service.slug}>
              <Link href={lp(`/services/${service.slug}`)}>{service.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
