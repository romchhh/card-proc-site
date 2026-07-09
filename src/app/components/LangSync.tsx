'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ensureI18nLocale, setI18nLocale } from '@/lib/i18n/client'
import { defaultLocale, getLocaleFromPathname, type Locale } from '@/lib/i18n/config'

type Props = {
  locale?: Locale
}

export default function LangSync({ locale: localeProp }: Props) {
  const pathname = usePathname()
  const locale = localeProp ?? getLocaleFromPathname(pathname) ?? defaultLocale

  ensureI18nLocale(locale)

  useEffect(() => {
    setI18nLocale(locale)
  }, [locale])

  return null
}
