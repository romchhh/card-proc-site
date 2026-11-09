'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { consumeLocaleSwitchScrollTop, forceWindowScrollTop } from '@/lib/locale-navigation'

/**
 * Locale swaps share the layout shell, so Next may keep the old scrollY.
 * Shorter UK copy then lands the viewport on the footer — reset after path change.
 */
export default function LocaleScrollReset() {
  const pathname = usePathname()

  useEffect(() => {
    if (!consumeLocaleSwitchScrollTop()) return

    forceWindowScrollTop()

    const frame = window.requestAnimationFrame(() => {
      forceWindowScrollTop()
    })
    const t1 = window.setTimeout(forceWindowScrollTop, 0)
    const t2 = window.setTimeout(forceWindowScrollTop, 50)
    const t3 = window.setTimeout(forceWindowScrollTop, 150)

    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.clearTimeout(t3)
    }
  }, [pathname])

  return null
}
