'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShieldAlert } from 'lucide-react'
import FaqAccordion from './FaqAccordion'
import { RichParagraphs, WarnCallout, sectionIcon } from './LandingBlocks'
import {
  COUNTRY_META,
  NICHE_BADGE,
  NICHE_ICON,
  getLandingView,
  getLandingsByGroup,
  type LandingGroup,
  type LandingView,
} from '@/lib/landings'
import { getHubHero } from '@/lib/landing-media'
import { localePath, pickLocaleCopy, type Locale } from '@/lib/i18n/config'
import Breadcrumbs from './Breadcrumbs'
import { useContactModal } from '../ContactModalProvider'
import styles from './SeoLanding.module.css'

type Props = {
  locale: Locale
  group: Extract<LandingGroup, 'jurisdictions' | 'niches'>
  view: LandingView
  breadcrumbs?: { name: string; path: string }[]
}

export default function LandingHub({ locale, group, view, breadcrumbs }: Props) {
  const { open: openContactModal } = useContactModal()
  const items = getLandingsByGroup(group)
  const hero = getHubHero(group)
  const heroAlt = locale === 'uk' ? hero.altUk : locale === 'en' ? hero.altEn : hero.altRu

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image src={hero.src} alt={heroAlt} fill priority sizes="100vw" className={styles.heroImage} />
        </div>
        <div className={styles.heroOverlay} />
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className={styles.heroBreadcrumbs}>
            <Breadcrumbs items={breadcrumbs} theme="dark" />
          </div>
        )}
        <div className={styles.heroBody}>
          <div className={styles.heroMain}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>
                {group === 'jurisdictions'
                  ? pickLocaleCopy(locale, { ru: 'Юрисдикции', uk: 'Юрисдикції', en: 'Jurisdictions' })
                  : pickLocaleCopy(locale, { ru: 'Ниши бизнеса', uk: 'Ніші бізнесу', en: 'Business niches' })}
              </p>
              <h1 className={styles.heroTitle}>{view.h1}</h1>
              <p className={styles.heroLead}>{view.lead}</p>
              <div className={styles.heroLinks}>
                {view.ctas.slice(0, 2).map((cta) => (
                  <Link key={cta.path + cta.label} href={localePath(cta.path, locale)} className={styles.heroTextLink}>
                    {cta.label}
                  </Link>
                ))}
              </div>
            </div>
            <button type="button" className={styles.heroCard} onClick={openContactModal}>
              <div className={styles.heroCardText}>
                <p className={styles.heroCardLabel}>
                  {pickLocaleCopy(locale, {
                    ru: 'Бесплатная консультация',
                    uk: 'Безкоштовна консультація',
                    en: 'Free consultation',
                  })}
                </p>
                <p className={styles.heroCardHighlight}>
                  {pickLocaleCopy(locale, { ru: 'от 1.5%', uk: 'від 1.5%', en: 'from 1.5%' })}
                </p>
                <p className={styles.heroCardSub}>
                  {pickLocaleCopy(locale, {
                    ru: 'Подберём страну или нишу под модель',
                    uk: 'Підберемо країну або нішу під модель',
                    en: 'We match country or niche to your model',
                  })}
                </p>
              </div>
              <span className={styles.heroCardArrow} aria-hidden>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 14 L14 2 M6 2 H14 V10" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </section>

      <section className={styles.intro}>
        <div className={styles.introInner}>
          <h2 className={styles.introHeading}>
            {pickLocaleCopy(locale, {
              ru: 'Коротко о разделе',
              uk: 'Коротко про розділ',
              en: 'Section overview',
            })}
          </h2>
          <div className={styles.introCopy}>
            {view.intro.map((p) => (
              <p key={p.slice(0, 40)} className={styles.introText}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.inner}>
        <h2 className={styles.blockTitle}>
          {group === 'jurisdictions'
            ? pickLocaleCopy(locale, { ru: 'Страны в обзоре', uk: 'Країни в огляді', en: 'Countries covered' })
            : pickLocaleCopy(locale, { ru: 'Ниши в обзоре', uk: 'Ніші в огляді', en: 'Niches covered' })}
        </h2>
        <ul className={styles.hubList}>
          {items.map((item) => {
            const itemView = getLandingView(item, locale)
            const meta = COUNTRY_META[item.slug]
            const icon = NICHE_ICON[item.slug]
            const badge = NICHE_BADGE[item.slug]
            const badgeClass =
              badge?.tone === 'ok' ? styles.badgeOk : badge?.tone === 'warn' ? styles.badgeWarn : styles.badgeDanger
            return (
              <li key={item.slug}>
                <Link href={localePath(item.path, locale)} className={styles.hubCard}>
                  <div className={styles.hubCardTop}>
                    {group === 'jurisdictions' && meta ? (
                      <span className={styles.hubFlag}>{meta.flag}</span>
                    ) : icon ? (
                      <Image src={icon} alt="" width={40} height={40} className={styles.hubIcon} />
                    ) : (
                      <ShieldAlert size={28} strokeWidth={1.5} color="#635BFF" aria-hidden />
                    )}
                    <span className={styles.hubTitle}>{itemView.h1}</span>
                  </div>
                  {badge && <span className={badgeClass}>{badge[locale]}</span>}
                  <span className={styles.hubLead}>{itemView.lead}</span>
                </Link>
              </li>
            )
          })}
        </ul>

        <div className={styles.sections}>
          {view.sections.map((section, idx) => {
            const Icon = sectionIcon(section.title)
            const isWarn = /не обеща|не обіця|не promise|чего мы не|чого ми не|what we do not/i.test(section.title)
            return (
              <section key={section.title} className={styles.section}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNumber}>{String(idx + 1).padStart(2, '0')}</span>
                  <span className={styles.sectionIcon}>
                    <Icon size={20} strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className={styles.sectionTitle}>{section.title}</h3>
                </div>
                {isWarn ? (
                  <WarnCallout>
                    <RichParagraphs paragraphs={section.paragraphs} />
                  </WarnCallout>
                ) : (
                  <div className={styles.paragraphs}>
                    <RichParagraphs paragraphs={section.paragraphs} />
                  </div>
                )}
              </section>
            )
          })}
        </div>

        <FaqAccordion
          items={view.faq}
          heading={pickLocaleCopy(locale, { ru: 'Частые вопросы', uk: 'Часті запитання', en: 'FAQ' })}
        />
      </div>
    </div>
  )
}
