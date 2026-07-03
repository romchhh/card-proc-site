'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { useContactModal } from './ContactModalProvider'
import styles from './Hero.module.css'

export default function Hero() {
  const { t } = useTranslation()
  const { open: openContactModal } = useContactModal()

  return (
    <section className={styles.hero}>
      <div className={styles.bg}>
        <Image
          src="/images/hero-stripe.webp"
          alt={t('seo.heroImageAlt')}
          fill
          priority
          sizes="100vw"
          className={styles.bgImage}
        />
      </div>
      <div className={styles.overlay} />

      <div className={styles.body}>
        <div className={styles.mainRow}>
          <div className={styles.textBlock}>
            <div className={styles.heroCenter}>
              <h1 className={styles.headline}>
                {t('hero.headline')}
                {t('hero.stripe') ? (
                  <>
                    {' '}
                    <em className={styles.stripe}>{t('hero.stripe')}</em>
                  </>
                ) : null}
              </h1>

              <p className={styles.badge}>{t('hero.badge')}</p>
            </div>

            <p className={styles.description}>{t('hero.description')}</p>
          </div>

          <button type="button" className={styles.card} onClick={openContactModal}>
            <div className={styles.cardText}>
              <p className={styles.cardLabel}>{t('hero.cardLabel')}</p>
              <p className={styles.cardHighlight}>{t('hero.cardHighlight')}</p>
              <p className={styles.cardSub}>{t('hero.cardSub')}</p>
            </div>
            <div className={styles.cardArrow}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 14 L14 2 M6 2 H14 V10" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}
