'use client'

import { useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import {
  digitsOnly,
  formatPhoneMask,
  formatTelegramMask,
  isValidEmail,
  isValidTelegram,
  isValidWhatsapp,
} from '@/lib/contact-fields'
import { stripLocalePrefix } from '@/lib/i18n/config'
import { resolveLocale } from '@/lib/i18n/resolve-locale'
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

const DIAL_CODES = [
  { code: '+380', label: '+380' },
  { code: '+48', label: '+48' },
  { code: '+420', label: '+420' },
  { code: '+372', label: '+372' },
  { code: '+357', label: '+357' },
  { code: '+44', label: '+44' },
  { code: '+852', label: '+852' },
  { code: '+1', label: '+1' },
  { code: '+49', label: '+49' },
  { code: '+7', label: '+7' },
] as const

function defaultDialCode(_locale: string): string {
  return '+380'
}

function leadSource(modal: boolean, pathname: string): string {
  if (modal) return `modal${stripLocalePrefix(pathname).replace(/\//g, '_') || '_home'}`
  const path = stripLocalePrefix(pathname)
  if (path === '/' || path === '') return 'home_contact'
  return path.replace(/^\//, '').replace(/\//g, '_') || 'section'
}

function buildPhone(dial: string, national: string): string {
  const digits = digitsOnly(national)
  if (!digits) return dial
  return formatPhoneMask(`${dial}${digits}`)
}

function formatNational(digits: string): string {
  const clean = digits.slice(0, 12)
  const parts: string[] = []
  let i = 0
  while (i < clean.length) {
    const size = i === 0 && clean.length > 2 ? 2 : 3
    parts.push(clean.slice(i, i + size))
    i += size
  }
  return parts.join(' ')
}

export default function ContactForm({ modal = false, onSuccess }: { modal?: boolean; onSuccess?: () => void }) {
  const { t, i18n } = useTranslation()
  const pathname = usePathname() || '/'
  const locale = resolveLocale(i18n.language)
  const initialDial = useMemo(() => defaultDialCode(locale), [locale])

  const [form, setForm] = useState<FormState>(EMPTY)
  const [dialCode, setDialCode] = useState(initialDial)
  const [nationalPhone, setNationalPhone] = useState('')
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

  const syncPhone = (dial: string, national: string) => {
    const phone = buildPhone(dial, national)
    setDialCode(dial)
    setNationalPhone(national)
    setForm((f) => ({ ...f, whatsapp: phone }))
    setErrors((prev) => {
      if (!prev.whatsapp) return prev
      const next = { ...prev }
      delete next.whatsapp
      return next
    })
  }

  const validate = (phoneValue: string): FieldErrors => {
    const next: FieldErrors = {}
    if (!form.name.trim()) next.name = t('contact.errors.name')
    if (!isValidTelegram(form.telegram)) next.telegram = t('contact.errors.telegram')
    if (!isValidWhatsapp(phoneValue)) next.whatsapp = t('contact.errors.whatsapp')
    if (!isValidEmail(form.email)) next.email = t('contact.errors.email')
    return next
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.consent) return

    const phone = modal ? buildPhone(dialCode, nationalPhone) : form.whatsapp
    const nextErrors = validate(phone)
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
          whatsapp: phone.trim(),
          email: form.email.trim() || undefined,
          comment: form.comment,
          source: leadSource(modal, pathname),
        }),
      })

      if (!res.ok) throw new Error('submit failed')

      setStatus('success')
      setForm(EMPTY)
      setNationalPhone('')
      setDialCode(initialDial)
      onSuccess?.()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={`${styles.success} ${modal ? styles.successModal : ''}`}>
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          stroke="var(--stripe-blue)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="24" cy="24" r="20" />
          <path d="M14 24 L21 31 L34 18" />
        </svg>
        <h3>{t('contact.successTitle')}</h3>
        <p>{t('contact.successText')}</p>
      </div>
    )
  }

  if (modal) {
    return (
      <form className={`${styles.form} ${styles.formModal}`} onSubmit={handleSubmit} noValidate>
        <div className={`${styles.floatField} ${errors.name ? styles.floatInvalid : ''}`}>
          <label htmlFor="contact-name">{t('contact.modalNameLabel')}</label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            placeholder={t('contact.modalNamePlaceholder')}
            value={form.name}
            onChange={setText('name')}
            required
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name ? <p className={styles.fieldError}>{errors.name}</p> : null}
        </div>

        <div className={`${styles.floatField} ${errors.whatsapp ? styles.floatInvalid : ''}`}>
          <label htmlFor="contact-phone">{t('contact.modalPhoneLabel')}</label>
          <div className={styles.phoneRow}>
            <label className={styles.dialSelectWrap} aria-label={t('contact.modalPhoneLabel')}>
              <select
                className={styles.dialSelect}
                value={dialCode}
                onChange={(e) => syncPhone(e.target.value, nationalPhone)}
              >
                {DIAL_CODES.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.label}
                  </option>
                ))}
              </select>
              <span className={styles.dialChevron} aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 4.5 L6 7.5 L9 4.5" />
                </svg>
              </span>
            </label>
            <input
              id="contact-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder={t('contact.modalPhonePlaceholder')}
              value={nationalPhone}
              onChange={(e) => syncPhone(dialCode, formatNational(digitsOnly(e.target.value)))}
              required
              aria-invalid={Boolean(errors.whatsapp)}
            />
          </div>
          {errors.whatsapp ? <p className={styles.fieldError}>{errors.whatsapp}</p> : null}
        </div>

        <div className={`${styles.floatField} ${errors.telegram ? styles.floatInvalid : ''}`}>
          <label htmlFor="contact-telegram">{t('contact.telegram')}</label>
          <input
            id="contact-telegram"
            type="text"
            inputMode="text"
            autoComplete="username"
            placeholder={t('contact.modalTelegramPlaceholder')}
            value={form.telegram}
            onChange={setText('telegram')}
            required
            aria-invalid={Boolean(errors.telegram)}
          />
          {errors.telegram ? <p className={styles.fieldError}>{errors.telegram}</p> : null}
        </div>

        <div className={`${styles.floatField} ${errors.email ? styles.floatInvalid : ''}`}>
          <label htmlFor="contact-email">
            {t('contact.email')}
            <span className={styles.floatOptional}>{t('contact.optional')}</span>
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
          {errors.email ? <p className={styles.fieldError}>{errors.email}</p> : null}
        </div>

        <div className={`${styles.floatField} ${styles.floatMessage}`}>
          <label className={styles.srOnly} htmlFor="contact-comment">
            {t('contact.comment')}
          </label>
          <textarea
            id="contact-comment"
            placeholder={t('contact.modalCommentPlaceholder')}
            rows={4}
            value={form.comment}
            onChange={setText('comment')}
          />
        </div>

        <label className={`${styles.consent} ${styles.consentModal}`}>
          <input type="checkbox" checked={form.consent} onChange={setConsent} required />
          <span>{t('contact.consent')}</span>
        </label>

        {status === 'error' && (
          <p className={styles.error} role="alert">
            {t('contact.error')}
          </p>
        )}

        <button type="submit" className={`${styles.submit} ${styles.submitModal}`} disabled={!form.consent || status === 'loading'}>
          {status === 'loading' ? t('contact.submitting') : t('contact.modalSubmit')}
          {status !== 'loading' && (
            <span className={styles.submitArrowModal} aria-hidden="true">
              →
            </span>
          )}
        </button>
      </form>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
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

      <div className={styles.field}>
        <label htmlFor="contact-comment">
          {t('contact.comment')} <span className={styles.optional}>{t('contact.optional')}</span>
        </label>
        <textarea
          id="contact-comment"
          placeholder={t('contact.commentPlaceholder')}
          rows={4}
          value={form.comment}
          onChange={setText('comment')}
        />
      </div>

      <label className={styles.consent}>
        <input type="checkbox" checked={form.consent} onChange={setConsent} required />
        <span>{t('contact.consent')}</span>
      </label>

      {status === 'error' && (
        <p className={styles.error} role="alert">
          {t('contact.error')}
        </p>
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
