'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { telegramDeepLink } from '@/lib/site'
import { stripLocalePrefix } from '@/lib/i18n/config'
import { useLocalizedPath } from '@/lib/i18n/use-locale'
import { useBodyScrollLock } from '@/lib/body-scroll-lock'
import { useContactModal } from './ContactModalProvider'
import { TelegramIcon } from './icons/SocialIcons'
import LangSwitcher from './LangSwitcher'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { key: 'about', path: '/about' },
  { key: 'services', path: '/services' },
  { key: 'niches', path: '/niches' },
  { key: 'jurisdictions', path: '/jurisdictions' },
  { key: 'solutions', path: '/solutions' },
  { key: 'compare', path: '/compare/rent-vs-buy' },
  { key: 'clients', path: '/clients' },
  { key: 'blog', path: '/blog' },
] as const

export default function Navbar({ transparent = false }: { transparent?: boolean }) {
  const { t } = useTranslation()
  const { open: openContactModal } = useContactModal()
  const pathname = usePathname()
  const lp = useLocalizedPath()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathOnly = stripLocalePrefix(pathname)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 60)
        frame = 0
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  useBodyScrollLock(menuOpen)

  const isDark = !transparent || scrolled

  const isActive = (path: string) => {
    if (path === '/blog') return pathOnly === '/blog' || pathOnly.startsWith('/blog/')
    if (path === '/services') return pathOnly === '/services' || pathOnly.startsWith('/services/')
    if (path === '/niches') return pathOnly === '/niches' || pathOnly.startsWith('/niches/')
    if (path === '/jurisdictions') {
      return pathOnly === '/jurisdictions' || pathOnly.startsWith('/jurisdictions/')
    }
    if (path === '/solutions') return pathOnly === '/solutions' || pathOnly.startsWith('/solutions/')
    if (path === '/compare/rent-vs-buy') return pathOnly.startsWith('/compare/')
    return pathOnly === path
  }

  return (
    <>
      <nav className={`${styles.nav} ${menuOpen ? styles.navMenuOpen : ''} ${isDark || menuOpen ? styles.solid : styles.transparent} ${isDark || menuOpen ? styles.navDark : styles.navLight}`}>
        <div className={styles.navStart}>
          <button
            type="button"
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={menuOpen}
            aria-controls="site-nav-drawer"
          >
            <span /><span /><span />
          </button>

          <div className={styles.center}>
            {NAV_LINKS.map((item) => (
              <a
                key={item.key}
                href={lp(item.path)}
                className={isActive(item.path) ? styles.activeLink : undefined}
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
          </div>
        </div>

        <a href={lp('/')} className={styles.brand}>
          <span className={styles.brandBold}>{t('footer.brandBold')}</span>
          <span className={styles.brandRegular}>{t('footer.brandRegular')}</span>
        </a>

        <div className={styles.actions}>
          <a
            href={telegramDeepLink('nav')}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.telegramBtn}
            aria-label={t('nav.telegram')}
          >
            <TelegramIcon />
          </a>

          <button
            type="button"
            className={styles.contactIconBtn}
            onClick={openContactModal}
            aria-label={t('nav.openContact')}
          >
            <span className={styles.contactIconArrow} aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12 L12 2 M5 2 H12 V9" />
              </svg>
            </span>
          </button>

          <div className={styles.desktopRight}>
            <LangSwitcher light={!isDark} />
            <button type="button" className={styles.cta} onClick={openContactModal}>
              {t('nav.cta')}
              <span className={styles.ctaArrow} aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12 L12 2 M5 2 H12 V9" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </nav>

      <div
        id="site-nav-drawer"
        className={`${styles.drawer} ${menuOpen ? styles.open : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={t('nav.menuDialog')}
      >
        <button className={styles.drawerClose} onClick={() => setMenuOpen(false)} aria-label={t('nav.closeMenu')}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M4 4 L24 24 M24 4 L4 24" />
          </svg>
        </button>

        {NAV_LINKS.map((item) => (
          <a key={item.key} href={lp(item.path)} onClick={() => setMenuOpen(false)}>
            {t(`nav.${item.key}`)}
          </a>
        ))}
        <button
          type="button"
          className={styles.drawerCta}
          onClick={() => { setMenuOpen(false); openContactModal() }}
        >
          {t('nav.cta')}
          <span className={styles.ctaArrow} aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12 L12 2 M5 2 H12 V9" />
            </svg>
          </span>
        </button>
        <LangSwitcher variant="drawer" />
      </div>
    </>
  )
}
