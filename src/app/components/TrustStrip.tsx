'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { siteConfig } from '@/lib/site'
import { useLocalizedPath } from '@/lib/i18n/use-locale'
import styles from './TrustStrip.module.css'

export default function TrustStrip() {
  const { t } = useTranslation()
  const lp = useLocalizedPath()

  return (
    <section className={styles.section} aria-labelledby="trust-strip-heading">
      <div className={styles.inner}>
        <h2 id="trust-strip-heading" className={styles.heading}>
          {t('trustStrip.heading')}
        </h2>
        <p className={styles.lead}>{t('trustStrip.lead')}</p>
        <ul className={styles.list}>
          <li>
            <span className={styles.label}>{t('trustStrip.legal')}</span>
            <strong>{siteConfig.company.legalName}</strong>
          </li>
          <li>
            <span className={styles.label}>{t('trustStrip.registry')}</span>
            <a href={siteConfig.company.registryUrl} target="_blank" rel="noopener noreferrer">
              {t('trustStrip.companiesHouse', { number: siteConfig.company.number })}
            </a>
          </li>
          <li>
            <span className={styles.label}>{t('trustStrip.address')}</span>
            <span>{siteConfig.company.address}</span>
          </li>
          <li>
            <span className={styles.label}>{t('trustStrip.team')}</span>
            <Link href={lp('/about')}>{t('trustStrip.aboutLink')}</Link>
          </li>
        </ul>
      </div>
    </section>
  )
}
