'use client'

import { useEffect, useId } from 'react'
import { ChevronDown } from 'lucide-react'
import styles from './FaqAccordion.module.css'

type Item = { question: string; answer: string }

type Props = {
  items: readonly Item[]
  heading: string
}

export default function FaqAccordion({ items, heading }: Props) {
  const baseId = useId()

  useEffect(() => {
    const applyHash = (shouldScroll: boolean) => {
      const match = window.location.hash.match(/^#faq-(\d+)$/)
      if (!match) return
      const index = Number(match[1]) - 1
      if (index < 0 || index >= items.length) return
      const el = document.getElementById(`faq-${index + 1}`) as HTMLDetailsElement | null
      if (!el) return
      el.open = true
      // Only scroll on real hashchange — not on remount after locale switch.
      if (shouldScroll) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    applyHash(false)
    const onHashChange = () => applyHash(true)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [items.length])

  return (
    <section className={styles.section} aria-labelledby={`${baseId}-heading`}>
      <h2 id={`${baseId}-heading`} className={styles.heading}>
        {heading}
      </h2>
      <div className={styles.list}>
        {items.map((item, index) => (
          <details
            key={item.question}
            className={styles.item}
            id={`faq-${index + 1}`}
            open={index === 0}
          >
            <summary className={styles.trigger}>
              <span>{item.question}</span>
              <ChevronDown className={styles.chevron} aria-hidden size={20} strokeWidth={1.5} />
            </summary>
            <div className={styles.panelOpen}>
              <p className={styles.answer}>{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
