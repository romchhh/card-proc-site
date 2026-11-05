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
    const applyHash = () => {
      const match = window.location.hash.match(/^#faq-(\d+)$/)
      if (!match) return
      const index = Number(match[1]) - 1
      if (index < 0 || index >= items.length) return
      const el = document.getElementById(`faq-${index + 1}`) as HTMLDetailsElement | null
      if (!el) return
      el.open = true
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
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
