'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { scrollToSection } from '@/lib/section-link'

export default function HashScrollHandler() {
  const pathname = usePathname()

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, '')
    if (!hash) return

    const frame = window.requestAnimationFrame(() => {
      scrollToSection(hash)
    })

    return () => window.cancelAnimationFrame(frame)
  }, [pathname])

  return null
}
