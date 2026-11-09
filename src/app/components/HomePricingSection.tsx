'use client'

import ContentTable from './ContentTable'
import { getFormatsPricingTable } from '@/lib/guide-tables'
import { useLocale } from '@/lib/i18n/use-locale'
import styles from './HomePricingSection.module.css'

export default function HomePricingSection() {
  const locale = useLocale()
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <ContentTable table={getFormatsPricingTable(locale)} locale={locale} narrow={false} />
      </div>
    </section>
  )
}
