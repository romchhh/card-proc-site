'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useLocalizedPath } from '@/lib/i18n/use-locale'
import styles from './ComplianceNotice.module.css'

type Props = {
  /** Compact variant under intro; default is full notice */
  compact?: boolean
}

export default function ComplianceNotice({ compact = false }: Props) {
  const { t } = useTranslation()
  const lp = useLocalizedPath()

  return (
    <aside
      className={compact ? `${styles.notice} ${styles.compact}` : styles.notice}
      aria-labelledby="compliance-notice-heading"
    >
      <h2 id="compliance-notice-heading" className={styles.heading}>
        {t('complianceNotice.heading')}
      </h2>
      <p className={styles.text}>{t('complianceNotice.body')}</p>
      <ul className={styles.list}>
        <li>{t('complianceNotice.item1')}</li>
        <li>{t('complianceNotice.item2')}</li>
        <li>{t('complianceNotice.item3')}</li>
      </ul>
      <p className={styles.footer}>
        <Link href={lp('/disclaimer')}>{t('complianceNotice.disclaimerLink')}</Link>
        {' · '}
        <Link href={lp('/compare/rent-vs-buy')}>{t('complianceNotice.compareLink')}</Link>
      </p>
    </aside>
  )
}
