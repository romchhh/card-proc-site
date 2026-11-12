'use client'

import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { getTestimonials, getTestimonialsHeading } from '@/lib/testimonials'
import { resolveLocale } from '@/lib/i18n/resolve-locale'
import styles from './TestimonialsSlider.module.css'

export default function TestimonialsSlider() {
  const { i18n, t } = useTranslation()
  const locale = resolveLocale(i18n.language)
  const items = getTestimonials(locale)
  const heading = getTestimonialsHeading(locale)
  const trackRef = useRef<HTMLUListElement>(null)

  const scrollBy = (dir: -1 | 1) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>(`.${styles.card}`)
    const step = card ? card.offsetWidth + 16 : 320
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  if (!items.length) return null

  return (
    <section className={styles.section} aria-labelledby="testimonials-heading">
      <div className={styles.head}>
        <h2 id="testimonials-heading" className={styles.heading}>
          {heading}
        </h2>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => scrollBy(-1)}
            aria-label={t('accounts.prev')}
          >
            ←
          </button>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => scrollBy(1)}
            aria-label={t('accounts.next')}
          >
            →
          </button>
        </div>
      </div>

      <ul ref={trackRef} className={styles.track}>
        {items.map((item) => (
          <li key={item.id} className={styles.card}>
            <p className={styles.text}>{item.text}</p>
            <div className={styles.meta}>
              <span className={styles.name}>{item.name}</span>
              <span className={styles.niche}>{item.niche}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
