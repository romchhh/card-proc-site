'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { getAllServices, getServiceView } from '@/lib/services'
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
