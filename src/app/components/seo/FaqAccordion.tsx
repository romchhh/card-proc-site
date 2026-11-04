'use client'

import { useEffect, useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import styles from './FaqAccordion.module.css'

type Item = { question: string; answer: string }

type Props = {
  items: readonly Item[]
  heading: string
}

export default function FaqAccordion({ items, heading }: Props) {
  const baseId = useId()
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: true })

  useEffect(() => {
    const applyHash = () => {
      const match = window.location.hash.match(/^#faq-(\d+)$/)
      if (!match) return
      const index = Number(match[1]) - 1
      if (index >= 0 && index < items.length) {
        setOpen((prev) => ({ ...prev, [index]: true }))
        document.getElementById(`faq-${index + 1}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
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
        {items.map((item, index) => {
          const panelId = `${baseId}-panel-${index}`
          const buttonId = `${baseId}-btn-${index}`
          const isOpen = Boolean(open[index])
          return (
            <div key={item.question} className={styles.item} id={`faq-${index + 1}`}>
              <h3 className={styles.question}>
                <button
                  type="button"
                  id={buttonId}
                  className={styles.trigger}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen((prev) => ({ ...prev, [index]: !prev[index] }))}
                >
                  <span>{item.question}</span>
                  <ChevronDown className={isOpen ? styles.chevronOpen : styles.chevron} aria-hidden size={20} strokeWidth={1.5} />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={isOpen ? styles.panelOpen : styles.panel}
                hidden={!isOpen}
              >
                <p className={styles.answer}>{item.answer}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
