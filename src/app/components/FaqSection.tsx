'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './FaqSection.module.css'

type FaqItem = {
  question: string
  answer: string
}

export default function FaqSection() {
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const items = t('seo.faq', { returnObjects: true }) as FaqItem[]

  return (
    <section id="faq" className={styles.section} aria-labelledby="faq-heading">
      <div className={styles.inner}>
        <h2 id="faq-heading" className={styles.heading}>
          {t('seo.faqHeading')}
        </h2>

        <div className={styles.panel}>
          {items.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <article
                key={item.question}
                className={`${styles.row} ${isOpen ? styles.rowOpen : ''}`}
              >
                <h3>
                  <button
                    type="button"
                    className={styles.question}
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    {item.question}
                    <span className={styles.icon} aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                        <path d="M7 2 V12 M2 7 H12" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div
                  className={styles.answerWrap}
                  aria-hidden={!isOpen}
                  data-open={isOpen}
                >
                  <div className={styles.answerInner}>
                    <p className={styles.answer}>{item.answer}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
