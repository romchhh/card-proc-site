'use client'

import { usePathname } from 'next/navigation'
import { stripLocalePrefix } from '@/lib/i18n/config'
import { useLocalizedPath } from '@/lib/i18n/use-locale'
import { scrollToSection, sectionHref } from '@/lib/section-link'

type Props = {
  sectionId: string
  children: React.ReactNode
  className?: string
  onNavigate?: () => void
}

export default function SectionLink({ sectionId, children, className, onNavigate }: Props) {
  const pathname = usePathname()
  const lp = useLocalizedPath()
  const isHome = stripLocalePrefix(pathname) === '/'
  const href = sectionHref(lp('/'), sectionId, isHome)

  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        onNavigate?.()

        if (!isHome) return

        event.preventDefault()
        scrollToSection(sectionId)
        window.history.replaceState(null, '', href)
      }}
    >
      {children}
    </a>
  )
}
