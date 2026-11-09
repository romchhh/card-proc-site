'use client'

import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import ContactForm from './ContactForm'
import { useContactModal } from './ContactModalProvider'
import styles from './ContactModal.module.css'

export default function ContactModal() {
  const { t } = useTranslation()
  const { isOpen, close } = useContactModal()
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }

    document.addEventListener('keydown', onKeyDown)
    dialogRef.current?.focus({ preventScroll: true })

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, close])

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={close} role="presentation">
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.close}
          onClick={close}
          aria-label={t('contact.close')}
        >
          <svg width="18" height="18" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M4 4 L18 18 M18 4 L4 18" />
          </svg>
        </button>

        <div className={styles.header}>
          <h2 id="contact-modal-title" className={styles.title}>
            {t('contact.modalTitle')}
          </h2>
        </div>
        <div className={styles.body}>
          <ContactForm modal />
        </div>
      </div>
    </div>
  )
}
