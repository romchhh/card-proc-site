'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useLocalizedPath } from '@/lib/i18n/use-locale'
import styles from './CookieConsent.module.css'

const STORAGE_KEY = 'wop-cookie-consent'

type ConsentValue = 'accepted' | 'necessary'

export default function CookieConsent() {
  const { t } = useTranslation()
  const lp = useLocalizedPath()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (!saved) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  const save = (value: ConsentValue) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value)
    } catch {
      /* ignore quota / private mode */
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className={styles.banner} role="dialog" aria-labelledby="cookie-consent-title" aria-live="polite">
      <div className={styles.copy}>
        <p id="cookie-consent-title" className={styles.title}>
          {t('cookieConsent.title')}
        </p>
        <p className={styles.text}>
          {t('cookieConsent.text')}{' '}
          <Link href={lp('/privacy')} className={styles.link}>
            {t('cookieConsent.policy')}
          </Link>
        </p>
      </div>
      <div className={styles.actions}>
        <button type="button" className={styles.buttonGhost} onClick={() => save('necessary')}>
          {t('cookieConsent.necessary')}
        </button>
        <button type="button" className={styles.button} onClick={() => save('accepted')}>
          {t('cookieConsent.accept')}
        </button>
      </div>
    </div>
  )
}
