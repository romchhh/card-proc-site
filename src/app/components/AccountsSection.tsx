'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import styles from './AccountsSection.module.css'

const ACCOUNT_IMAGES = [
  { src: '/images/accounts/account-1.webp', width: 2360, height: 1006 },
  { src: '/images/accounts/account-2.webp', width: 2258, height: 964 },
  { src: '/images/accounts/account-3.webp', width: 2372, height: 986 },
  { src: '/images/accounts/account-4.webp', width: 2372, height: 1030 },
] as const

export default function AccountsSection() {
  const { t } = useTranslation()
  const [active, setActive] = useState(0)
  const total = ACCOUNT_IMAGES.length

  const goTo = useCallback((index: number) => {
    setActive((index + total) % total)
  }, [total])

  const next = useCallback(() => goTo(active + 1), [active, goTo])
  const prev = useCallback(() => goTo(active - 1), [active, goTo])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section id="accounts" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.heading}>{t('accounts.heading')}</h2>
          <p className={styles.lead}>{t('accounts.lead')}</p>
          <p className={styles.desc}>{t('accounts.desc')}</p>
        </div>

        <h3 className={styles.galleryHeading}>{t('accounts.galleryHeading')}</h3>

        <div className={styles.slider}>
          <button
            type="button"
            className={`${styles.navBtn} ${styles.navPrev}`}
            onClick={prev}
            aria-label={t('accounts.prev')}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M11 3 L5 9 L11 15" />
            </svg>
          </button>

          <div className={styles.viewport}>
            <div
              className={styles.track}
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {ACCOUNT_IMAGES.map(({ src, width, height }, index) => (
                <div key={src} className={styles.slide}>
                  <Image
                    src={src}
                    alt={t('accounts.imageAlt', { number: index + 1 })}
                    width={width}
                    height={height}
                    sizes="(max-width: 768px) 100vw, 920px"
                    className={styles.image}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className={`${styles.navBtn} ${styles.navNext}`}
            onClick={next}
            aria-label={t('accounts.next')}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 3 L13 9 L7 15" />
            </svg>
          </button>

          <div className={styles.dots} role="tablist" aria-label={t('accounts.dotsLabel')}>
            {ACCOUNT_IMAGES.map(({ src }, index) => (
              <button
                key={src}
                type="button"
                role="tab"
                className={`${styles.dot} ${index === active ? styles.dotActive : ''}`}
                onClick={() => goTo(index)}
                aria-selected={index === active}
                aria-label={t('accounts.goTo', { number: index + 1 })}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
