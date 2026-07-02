'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { siteConfig } from '@/lib/site'
import { stripLocalePrefix } from '@/lib/i18n/config'
import { useLocalizedPath } from '@/lib/i18n/use-locale'
import { useBodyScrollLock } from '@/lib/body-scroll-lock'
import { useContactModal } from './ContactModalProvider'
import { TelegramIcon } from './icons/SocialIcons'
import LangSwitcher from './LangSwitcher'
import SectionLink from './SectionLink'
import styles from './Navbar.module.css'

export default function Navbar({ transparent = false }: { transparent?: boolean }) {
  const { t } = useTranslation()
  const { open: openContactModal } = useContactModal()
  const pathname = usePathname()
  const lp = useLocalizedPath()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const blogPath = lp('/blog')

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
  const isBlogActive = stripLocalePrefix(pathname) === '/blog' || pathname.includes('/blog/')

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
          >
            <span/><span/><span/>
          </button>

          <div className={styles.center}>
            <SectionLink sectionId="specialists">{t('nav.about')}</SectionLink>
            <SectionLink sectionId="services">{t('nav.services')}</SectionLink>
            <SectionLink sectionId="clients">{t('nav.clients')}</SectionLink>
            <a href={blogPath} className={isBlogActive ? styles.activeLink : ''}>{t('nav.blog')}</a>
          </div>
        </div>

        <a href={lp('/')} className={styles.brand}>
          <span className={styles.brandBold}>{t('footer.brandBold')}</span>
          <span className={styles.brandRegular}>{t('footer.brandRegular')}</span>
        </a>

        <div className={styles.actions}>
          <a
            href={siteConfig.telegramOperatorUrl}
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

      <div className={`${styles.drawer} ${menuOpen ? styles.open : ''}`} role="dialog" aria-modal="true">
        <button className={styles.drawerClose} onClick={() => setMenuOpen(false)} aria-label={t('nav.closeMenu')}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M4 4 L24 24 M24 4 L4 24"/>
          </svg>
        </button>

        <SectionLink sectionId="specialists" onNavigate={() => setMenuOpen(false)}>
          {t('nav.about')}
        </SectionLink>
        <SectionLink sectionId="services" onNavigate={() => setMenuOpen(false)}>
          {t('nav.services')}
        </SectionLink>
        <SectionLink sectionId="clients" onNavigate={() => setMenuOpen(false)}>
          {t('nav.clients')}
        </SectionLink>
        <a href={blogPath} onClick={() => setMenuOpen(false)}>{t('nav.blog')}</a>
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
