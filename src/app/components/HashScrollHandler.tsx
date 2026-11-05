'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { scrollToSection } from '@/lib/section-link'

export default function HashScrollHandler() {
  const pathname = usePathname()
  const lastHandled = useRef<string | null>(null)

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, '')
    if (!hash) {
      lastHandled.current = null
      return
    }

    const key = `${pathname}#${hash}`
    if (lastHandled.current === key) return

    const frame = window.requestAnimationFrame(() => {
      if (scrollToSection(hash)) {
        lastHandled.current = key
      }
    })

    return () => window.cancelAnimationFrame(frame)
  }, [pathname])

  return null
}
