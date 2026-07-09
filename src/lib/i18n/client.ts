'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ru from '@/locales/ru.json'
import en from '@/locales/en.json'
import type { Locale } from './config'

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      ru: { translation: ru },
      en: { translation: en },
    },
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  })
}

/** Sync locale before render so SSR HTML matches the URL locale. */
export function ensureI18nLocale(locale: Locale) {
  if (i18n.language !== locale) {
    i18n.language = locale
  }
}

export function setI18nLocale(locale: Locale) {
  ensureI18nLocale(locale)
  if (typeof document !== 'undefined') {
    document.documentElement.lang = locale
  }
}

export default i18n
