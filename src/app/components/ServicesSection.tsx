'use client'

import { useTranslation } from 'react-i18next'
import { SERVICE_SLUGS, getServiceBySlug, getServiceView } from '@/lib/services'
import { useLocalizedPath } from '@/lib/i18n/use-locale'
import ServiceCard from './ServiceCard'
import styles from './ServicesSection.module.css'

export default function ServicesSection() {
  const { t, i18n } = useTranslation()
  const lp = useLocalizedPath()
  const locale = i18n.language === 'en' ? 'en' : 'ru'

  return (
    <section id="services" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{t('services.heading')}</h2>

        <div className={styles.grid}>
          {SERVICE_SLUGS.map((slug) => {
            const service = getServiceBySlug(slug)
            if (!service) return null
            const view = getServiceView(service, locale)

            return (
              <ServiceCard
                key={slug}
                slug={slug}
                title={view.card.title}
                description={view.card.desc}
                href={lp(`/services/${slug}`)}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
