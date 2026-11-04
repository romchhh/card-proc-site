'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { siteConfig } from '@/lib/site'
import { SERVICE_SLUGS, getServiceBySlug, getServiceView } from '@/lib/services'
import { getAllPosts, localizePost } from '@/lib/blog'
import { INDEX_BLOG_SLUGS } from '@/lib/seo-index'
import { useLocalizedPath } from '@/lib/i18n/use-locale'
import { resolveLocale } from '@/lib/i18n/resolve-locale'
import { TelegramIcon, SupportIcon } from './icons/SocialIcons'
import { useContactModal } from './ContactModalProvider'
import styles from './Footer.module.css'

const NAV_LINKS = [
  { key: 'about', path: '/about' },
  { key: 'clients', path: '/clients' },
  { key: 'contacts', path: '/contacts' },
  { key: 'services', path: '/services' },
  { key: 'compare', path: '/compare/rent-vs-buy' },
  { key: 'jurisdictions', path: '/jurisdictions' },
  { key: 'niches', path: '/niches' },
  { key: 'ukraine', path: '/solutions/stripe-ukraine' },
  { key: 'issues', path: '/solutions/stripe-account-issues' },
  { key: 'siteMap', path: '/site-map' },
  { key: 'blog', path: '/blog' },
] as const

const FOOTER_GUIDE_SLUGS = INDEX_BLOG_SLUGS.slice(0, 4)

export default function Footer() {
  const { t, i18n } = useTranslation()
  const { open: openContactModal } = useContactModal()
  const lp = useLocalizedPath()
  const locale = resolveLocale(i18n.language)
  const year = new Date().getFullYear()

  const postsBySlug = new Map(getAllPosts().map((post) => [post.slug, post]))
  const guideLinks = FOOTER_GUIDE_SLUGS.map((slug) => {
    const post = postsBySlug.get(slug)
    if (!post) return null
    return { slug, title: localizePost(post, locale).title }
  }).filter(Boolean) as { slug: string; title: string }[]

  const contactItems = [
    {
      key: 'telegramChannel' as const,
      href: siteConfig.telegramChannelUrl,
      icon: <TelegramIcon size={20} />,
      iconClass: styles.contactIconTelegram,
    },
    {
      key: 'telegramOperator' as const,
      href: siteConfig.telegramOperatorUrl,
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
            <span className={styles.companyName}>{t('footer.companyName')}</span>
            <span>{t('footer.companyMeta')}</span>
            <span>{t('footer.companyAddress')}</span>
          </address>
          <p className={styles.legal}>{t('footer.legal')}</p>
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
          <h3 className={styles.heading}>{t('footer.servicesHeading')}</h3>
          <nav className={styles.nav} aria-label={t('footer.servicesHeading')}>
            {SERVICE_SLUGS.map((slug) => {
              const service = getServiceBySlug(slug)
              if (!service) return null
              const view = getServiceView(service, locale)

              return (
                <Link key={slug} href={lp(`/services/${slug}`)}>
                  {view.card.title}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className={styles.col}>
          <h3 className={styles.heading}>{t('footer.guidesHeading')}</h3>
          <nav className={styles.nav} aria-label={t('footer.guidesHeading')}>
            {guideLinks.map((post) => (
              <Link key={post.slug} href={lp(`/blog/${post.slug}`)}>
                {post.title}
              </Link>
            ))}
            <Link href={lp('/blog')}>{t('footer.allGuides')}</Link>
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
          <a href="https://telebots.site/en" target="_blank" rel="noopener noreferrer">
            TeleBots
          </a>
        </span>
      </div>
    </footer>
  )
}
