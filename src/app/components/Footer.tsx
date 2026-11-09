'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { siteConfig, telegramChannelDeepLink, telegramDeepLink } from '@/lib/site'
import { useLocalizedPath } from '@/lib/i18n/use-locale'
import { TelegramIcon, SupportIcon } from './icons/SocialIcons'
import { useContactModal } from './ContactModalProvider'
import LangSwitcher from './LangSwitcher'
import styles from './Footer.module.css'

const NAV_LINKS = [
  { key: 'services', path: '/services' },
  { key: 'niches', path: '/niches' },
  { key: 'jurisdictions', path: '/jurisdictions' },
  { key: 'solutions', path: '/solutions' },
  { key: 'compare', path: '/compare/rent-vs-buy' },
  { key: 'blog', path: '/blog' },
  { key: 'about', path: '/about' },
  { key: 'clients', path: '/clients' },
  { key: 'contacts', path: '/contacts' },
] as const

export default function Footer() {
  const { t } = useTranslation()
  const { open: openContactModal } = useContactModal()
  const lp = useLocalizedPath()
  const year = new Date().getFullYear()

  const contactItems = [
    {
      key: 'telegramChannel' as const,
      href: telegramChannelDeepLink('footer_channel'),
      icon: <TelegramIcon size={20} />,
      iconClass: styles.contactIconTelegram,
    },
    {
      key: 'telegramOperator' as const,
      href: telegramDeepLink('footer'),
      icon: <TelegramIcon size={20} />,
      iconClass: styles.contactIconTelegram,
    },
    {
      key: 'support247' as const,
      icon: <SupportIcon size={20} />,
      iconClass: styles.contactIconSupport,
      onClick: openContactModal,
    },
  ]

  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.col}>
          <a href={lp('/')} className={styles.brand}>
            <span className={styles.brandBold}>{t('footer.brandBold')}</span>
            <span className={styles.brandRegular}>{t('footer.brandRegular')}</span>
          </a>
          <p className={styles.copyright}>{t('footer.copyright', { year })}</p>
          <address className={styles.company}>
            <span className={styles.companyName}>{siteConfig.company.legalName}</span>
            <a
              href={siteConfig.company.registryUrl}
              className={styles.companyLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('footer.companiesHouse', { number: siteConfig.company.number })}
            </a>
            <span>{siteConfig.company.address}</span>
          </address>
          <p className={styles.legal}>{t('footer.legal')}</p>
          <div className={styles.langWrap}>
            <LangSwitcher variant="drawer" />
          </div>
        </div>

        <div className={styles.col}>
          <h3 className={styles.heading}>{t('footer.infoHeading')}</h3>
          <nav className={styles.nav} aria-label={t('footer.navLabel')}>
            {NAV_LINKS.map((item) => (
              <Link key={item.key} href={lp(item.path)}>
                {t(`footer.${item.key}`)}
              </Link>
            ))}
          </nav>
        </div>

        <div className={styles.col}>
          <h3 className={styles.heading}>{t('footer.contactHeading')}</h3>
          <ul className={styles.contacts}>
            {contactItems.map(({ key, icon, iconClass, ...item }) => (
              <li key={key}>
                <span className={`${styles.contactIcon} ${iconClass}`}>{icon}</span>
                {'onClick' in item && item.onClick ? (
                  <button type="button" className={styles.contactLink} onClick={item.onClick}>
                    {t(`footer.${key}`)}
                  </button>
                ) : (
                  <a
                    href={'href' in item ? item.href : '#'}
                    className={styles.contactLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t(`footer.${key}`)}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className={`${styles.col} ${styles.colAbout}`}>
          <h3 className={styles.heading}>{t('footer.aboutHeading')}</h3>
          <p className={styles.aboutText}>{t('footer.aboutText')}</p>
        </div>
      </div>

      <div className={styles.bottom}>
        <a href={lp('/site-map')}>{t('footer.siteMap')}</a>
        <a href={lp('/privacy')}>{t('footer.privacy')}</a>
        <a href={lp('/terms')}>{t('footer.terms')}</a>
        <a href={lp('/disclaimer')}>{t('footer.disclaimer')}</a>
        <span className={styles.credit}>
          {t('footer.developedBy')}{' '}
          <a href="https://telebots.site/en" target="_blank" rel="noopener noreferrer nofollow">
            TeleBots
          </a>
        </span>
      </div>
    </footer>
  )
}
