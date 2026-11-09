'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import {
  formatPhoneMask,
  formatTelegramMask,
  isValidEmail,
  isValidTelegram,
  isValidWhatsapp,
} from '@/lib/contact-fields'
import { stripLocalePrefix } from '@/lib/i18n/config'
import styles from './ContactForm.module.css'

type FormState = {
  name: string
  telegram: string
  whatsapp: string
  email: string
  comment: string
  consent: boolean
}

type FieldErrors = Partial<Record<'name' | 'telegram' | 'whatsapp' | 'email', string>>

type Status = 'idle' | 'loading' | 'success' | 'error'

const EMPTY: FormState = {
  name: '',
  telegram: '',
  whatsapp: '',
  email: '',
  comment: '',
  consent: false,
}

function leadSource(modal: boolean, pathname: string): string {
  if (modal) return `modal${stripLocalePrefix(pathname).replace(/\//g, '_') || '_home'}`
  const path = stripLocalePrefix(pathname)
  if (path === '/' || path === '') return 'home_contact'
  return path.replace(/^\//, '').replace(/\//g, '_') || 'section'
}

export default function ContactForm({ modal = false, onSuccess }: { modal?: boolean; onSuccess?: () => void }) {
  const { t } = useTranslation()
  const pathname = usePathname() || '/'
  const [form, setForm] = useState<FormState>(EMPTY)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')

  const setText =
    (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      let value: string | boolean = e.target.value
      if (key === 'telegram') value = formatTelegramMask(e.target.value)
      if (key === 'whatsapp') value = formatPhoneMask(e.target.value)
      setForm((f) => ({ ...f, [key]: value }))
      setErrors((prev) => {
        if (!(key in prev)) return prev
        const next = { ...prev }
        delete next[key as keyof FieldErrors]
        return next
      })
    }

  const setConsent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, consent: e.target.checked }))
  }

  const validate = (): FieldErrors => {
    const next: FieldErrors = {}
    if (!form.name.trim()) next.name = t('contact.errors.name')
    if (!isValidTelegram(form.telegram)) next.telegram = t('contact.errors.telegram')
    if (!isValidWhatsapp(form.whatsapp)) next.whatsapp = t('contact.errors.whatsapp')
    if (!isValidEmail(form.email)) next.email = t('contact.errors.email')
    return next
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.consent) return

    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          telegram: form.telegram.trim(),
          whatsapp: form.whatsapp.trim(),
          email: form.email.trim() || undefined,
          comment: form.comment,
          source: leadSource(modal, pathname),
        }),
      })

      if (!res.ok) throw new Error('submit failed')

      setStatus('success')
      setForm(EMPTY)
      onSuccess?.()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={`${styles.success} ${modal ? styles.successModal : ''}`}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="var(--stripe-blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="24" cy="24" r="20" />
          <path d="M14 24 L21 31 L34 18" />
        </svg>
        <h3>{t('contact.successTitle')}</h3>
        <p>{t('contact.successText')}</p>
      </div>
    )
  }

  return (
    <form
      className={`${styles.form} ${modal ? styles.formModal : ''}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className={styles.field}>
        <label htmlFor="contact-name">
          {t('contact.name')} <span className={styles.req}>*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          placeholder={t('contact.namePlaceholder')}
          value={form.name}
          onChange={setText('name')}
          required
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name ? <p className={styles.fieldError}>{errors.name}</p> : null}
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-telegram">
          {t('contact.telegram')} <span className={styles.req}>*</span>
        </label>
        <input
          id="contact-telegram"
          type="text"
          inputMode="text"
          autoComplete="username"
          placeholder={t('contact.telegramPlaceholder')}
          value={form.telegram}
          onChange={setText('telegram')}
          required
          aria-invalid={Boolean(errors.telegram)}
        />
        <p className={styles.hint}>{t('contact.telegramHint')}</p>
        {errors.telegram ? <p className={styles.fieldError}>{errors.telegram}</p> : null}
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-whatsapp">
          {t('contact.whatsapp')} <span className={styles.req}>*</span>
        </label>
        <input
          id="contact-whatsapp"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder={t('contact.whatsappPlaceholder')}
          value={form.whatsapp}
          onChange={setText('whatsapp')}
          required
          aria-invalid={Boolean(errors.whatsapp)}
        />
        <p className={styles.hint}>{t('contact.whatsappHint')}</p>
        {errors.whatsapp ? <p className={styles.fieldError}>{errors.whatsapp}</p> : null}
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-email">
          {t('contact.email')} <span className={styles.optional}>{t('contact.optional')}</span>
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          placeholder={t('contact.emailPlaceholder')}
          value={form.email}
          onChange={setText('email')}
          aria-invalid={Boolean(errors.email)}
        />
        <p className={styles.hint}>{t('contact.emailHint')}</p>
        {errors.email ? <p className={styles.fieldError}>{errors.email}</p> : null}
      </div>

      <div className={`${styles.field} ${modal ? styles.fieldGrow : ''}`}>
        <label htmlFor="contact-comment">
          {t('contact.comment')} <span className={styles.optional}>{t('contact.optional')}</span>
        </label>
        <textarea
          id="contact-comment"
          placeholder={t('contact.commentPlaceholder')}
          rows={modal ? 3 : 4}
          value={form.comment}
          onChange={setText('comment')}
        />
      </div>

      <label className={styles.consent}>
        <input type="checkbox" checked={form.consent} onChange={setConsent} required />
        <span>{t('contact.consent')}</span>
      </label>

      {status === 'error' && (
        <p className={styles.error} role="alert">{t('contact.error')}</p>
      )}

      <button type="submit" className={styles.submit} disabled={!form.consent || status === 'loading'}>
        {status === 'loading' ? t('contact.submitting') : t('contact.submit')}
        {status !== 'loading' && (
          <span className={styles.submitArrow} aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12 L12 2 M5 2 H12 V9" />
            </svg>
          </span>
        )}
      </button>
    </form>
  )
}
