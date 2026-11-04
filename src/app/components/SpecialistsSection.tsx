'use client'

import { useTranslation } from 'react-i18next'
import { useContactModal } from './ContactModalProvider'
import styles from './SpecialistsSection.module.css'

const ITEMS = ['item1', 'item2', 'item3'] as const

function ItemIcon({ type }: { type: typeof ITEMS[number] }) {
  const icons = {
    item1: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2 H6 A2 2 0 0 0 4 4 V20 A2 2 0 0 0 6 22 H18 A2 2 0 0 0 20 20 V8 Z" />
        <path d="M14 2 V8 H20 M8 13 H16 M8 17 H13" />
      </svg>
    ),
    item2: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 L20 6 V12 C20 16.4 16.8 20.2 12 21 C7.2 20.2 4 16.4 4 12 V6 Z" />
        <path d="M9 12 L11 14 L15 10" />
      </svg>
    ),
    item3: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7 V12 M12 12 H15" />
      </svg>
    ),
  }

  return <span className={styles.iconBox} aria-hidden="true">{icons[type]}</span>
}

type Props = {
  /** Slightly smaller heading — for service pages */
  compact?: boolean
}

export default function SpecialistsSection({ compact = false }: Props) {
  const { t } = useTranslation()
  const { open: openContactModal } = useContactModal()

  return (
    <section
      id="specialists"
      className={`${styles.section} ${compact ? styles.sectionCompact : ''}`}
    >
      <div className={styles.inner}>
        <h2 className={`${styles.heading} ${compact ? styles.headingCompact : ''}`}>
          {t('specialists.heading')}
        </h2>


        <p className={styles.description}>
          {t('specialists.descriptionPrefix')}
          <strong>{t('specialists.descriptionBold')}</strong>
          {t('specialists.descriptionSuffix')}
        </p>

        <p className={styles.lead}>{t('specialists.lead')}</p>

        <div className={styles.cards}>
          {ITEMS.map((key) => (
            <article key={key} className={styles.card}>
              <ItemIcon type={key} />
              <p className={styles.cardText}>
                {key === 'item2' ? (
                  <>
                    {t('specialists.item2Prefix')}
                    <strong>{t('specialists.item2Bold')}</strong>
                  </>
                ) : (
                  t(`specialists.${key}`)
                )}
              </p>
            </article>
          ))}
        </div>

        <button type="button" className={styles.cta} onClick={openContactModal}>
          {t('specialists.cta')}
          <span className={styles.ctaArrow} aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12 L12 2 M5 2 H12 V9" />
            </svg>
          </span>
        </button>
      </div>
    </section>
  )
}
