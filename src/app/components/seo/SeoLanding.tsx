'use client'

import Image from 'next/image'
import Link from 'next/link'
import FaqAccordion from './FaqAccordion'
import { RichParagraphs, WarnCallout, sectionIcon } from './LandingBlocks'
import {
  COUNTRY_META,
  NICHE_ICON,
  groupEyebrow,
  getRelatedLandings,
  type Landing,
  type LandingView,
} from '@/lib/landings'
import { getLandingHero } from '@/lib/landing-media'
import { localePath, pickLocaleCopy, type Locale } from '@/lib/i18n/config'
import Breadcrumbs from './Breadcrumbs'
import { useContactModal } from '../ContactModalProvider'
import styles from './SeoLanding.module.css'

type Props = {
  locale: Locale
  landing: Landing
  view: LandingView
  breadcrumbs?: { name: string; path: string }[]
}

export default function SeoLanding({ locale, landing, view, breadcrumbs }: Props) {
  const { open: openContactModal } = useContactModal()
  const primary = view.ctas[0]
  const secondary = view.ctas[1]
  const related = getRelatedLandings(landing, locale)
  const hero = getLandingHero(landing)
  const country = landing.group === 'jurisdictions' ? COUNTRY_META[landing.slug] : null
  const nicheIcon = landing.group === 'niches' ? NICHE_ICON[landing.slug] : null
  const heroAlt = locale === 'uk' ? hero.altUk : locale === 'en' ? hero.altEn : hero.altRu

  const aboutHeading = pickLocaleCopy(locale, {
    ru: 'Коротко о странице',
    uk: 'Коротко про сторінку',
    en: 'Page overview',
  })
  const factsHeading = pickLocaleCopy(locale, {
    ru: 'Ключевые факты',
    uk: 'Ключові факти',
    en: 'Key facts',
  })
  const guideHeading = pickLocaleCopy(locale, {
    ru: 'Практический разбор',
    uk: 'Практичний розбір',
    en: 'Practical guide',
  })
  const relatedLabel = pickLocaleCopy(locale, {
    ru: 'Смежные страницы',
    uk: 'Суміжні сторінки',
    en: 'Related pages',
  })
  const ctaHeading = pickLocaleCopy(locale, {
    ru: 'Нужна оценка ниши и схемы под Stripe?',
    uk: 'Потрібна оцінка ніші і схеми під Stripe?',
    en: 'Need a niche and Stripe-stack review?',
  })
  const ctaDesc = pickLocaleCopy(locale, {
    ru: 'Опишите сайт, страны клиентов и оборот — предложим юрисдикцию или формат подключения без обещаний обойти правила Stripe.',
    uk: 'Опишіть сайт, країни клієнтів і оборот — запропонуємо юрисдикцію або формат підключення без обіцянок обійти правила Stripe.',
    en: 'Share the site, customer countries and volume — we will propose a jurisdiction or setup format without promising to bypass Stripe rules.',
  })
  const disclaimer = pickLocaleCopy(locale, {
    ru: 'WayOfProcessing не аффилирован со Stripe, Inc. Материал информационный и не заменяет налоговую или юридическую консультацию.',
    uk: 'WayOfProcessing не афілійований зі Stripe, Inc. Матеріал інформаційний і не замінює податкову чи юридичну консультацію.',
    en: 'WayOfProcessing is not affiliated with Stripe, Inc. This material is informational and is not a substitute for tax or legal advice.',
  })

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src={hero.src}
            alt={heroAlt}
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
          />
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
                {country ? (
                  <>
                    <span className={styles.flag} aria-hidden>
                      {country.flag}
                    </span>
                    {groupEyebrow(landing.group, locale)} · {country.city}
                  </>
                ) : (
                  groupEyebrow(landing.group, locale)
                )}
              </p>
              <h1 className={styles.heroTitle}>{view.h1}</h1>
              <p className={styles.heroLead}>{view.lead}</p>
              <div className={styles.heroLinks}>
                {primary && (
                  <Link href={localePath(primary.path, locale)} className={styles.heroTextLink}>
                    {primary.label}
                  </Link>
                )}
                {secondary && (
                  <Link href={localePath(secondary.path, locale)} className={styles.heroTextLink}>
                    {secondary.label}
                  </Link>
                )}
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
                  {pickLocaleCopy(locale, {
                    ru: 'от 1.5%',
                    uk: 'від 1.5%',
                    en: 'from 1.5%',
                  })}
                </p>
                <p className={styles.heroCardSub}>
                  {pickLocaleCopy(locale, {
                    ru: 'Оценка ниши и схемы до старта работ',
                    uk: 'Оцінка ніші і схеми до старту робіт',
                    en: 'Niche and stack review before work starts',
                  })}
                </p>
              </div>
              {nicheIcon ? (
                <Image src={nicheIcon} alt="" width={48} height={48} className={styles.heroCardIcon} />
              ) : (
                <span className={styles.heroCardArrow} aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 14 L14 2 M6 2 H14 V10" />
                  </svg>
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      <section className={styles.intro} aria-labelledby="landing-intro-heading">
        <div className={styles.introInner}>
          <h2 id="landing-intro-heading" className={styles.introHeading}>
            {aboutHeading}
          </h2>
          <div className={styles.introCopy}>
            {view.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className={styles.introText}>
                {paragraph}
              </p>
            ))}
          </div>
          <button type="button" className={styles.introButton} onClick={openContactModal}>
            <span>
              {pickLocaleCopy(locale, {
                ru: 'Оставить заявку',
                uk: 'Залишити заявку',
                en: 'Submit a request',
              })}
            </span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M2 14 L14 2 M6 2 H14 V10" />
            </svg>
          </button>
        </div>
      </section>

      <article className={styles.inner}>
        {view.facts && view.facts.length > 0 && (
          <section className={styles.factsBlock} aria-labelledby="landing-facts">
            <h2 id="landing-facts" className={styles.blockTitle}>
              {factsHeading}
            </h2>
            <dl className={styles.factsGrid}>
              {view.facts.map((fact) => (
                <div key={fact.label} className={styles.factItem}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <div className={styles.sections}>
          <h2 className={styles.blockTitle}>{guideHeading}</h2>
          {view.sections.map((section, idx) => {
            const Icon = sectionIcon(section.title)
            const isWarn = /не обеща|не обіця|не promise|чего мы не|чого ми не|what we do not/i.test(section.title)
            return (
              <section key={section.title} id={`section-${idx + 1}`} className={styles.section}>
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

        {landing.group === 'jurisdictions' && (
          <figure className={styles.breakFigure}>
            <Image
              src={hero.src}
              alt={heroAlt}
              width={1200}
              height={560}
              className={styles.breakImage}
              sizes="(max-width: 900px) 100vw, 900px"
            />
            <figcaption>
              {pickLocaleCopy(locale, {
                ru: `${country?.city ?? ''} — ориентир для юрлица, банка и Stripe, а не «гарантия одобрения».`,
                uk: `${country?.city ?? ''} — орієнтир для юрособи, банку і Stripe, а не «гарантія схвалення».`,
                en: `${country?.city ?? ''} — a jurisdiction cue for entity, bank and Stripe, not an approval guarantee.`,
              })}
            </figcaption>
          </figure>
        )}

        <div className={styles.ctaBlock}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>{ctaHeading}</h2>
              <p className={styles.ctaDescription}>{ctaDesc}</p>
            </div>
            <button type="button" className={styles.ctaButton} onClick={openContactModal}>
              <span>
                {pickLocaleCopy(locale, {
                  ru: 'Связаться',
                  uk: 'Зв’язатися',
                  en: 'Contact us',
                })}
              </span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M2 14 L14 2 M6 2 H14 V10" />
              </svg>
            </button>
          </div>
        </div>

        <FaqAccordion
          items={view.faq}
          heading={pickLocaleCopy(locale, { ru: 'Частые вопросы', uk: 'Часті запитання', en: 'FAQ' })}
        />

        {related.length > 0 && (
          <nav className={styles.related} aria-labelledby="related-heading">
            <h2 id="related-heading" className={styles.blockTitle}>
              {relatedLabel}
            </h2>
            <div className={styles.relatedGrid}>
              {related.map((item) => (
                <Link key={item.path} href={localePath(item.path, locale)} className={styles.relatedCard}>
                  <span className={styles.relatedTitle}>{item.title}</span>
                  {item.lead ? <span className={styles.relatedLead}>{item.lead}</span> : null}
                </Link>
              ))}
            </div>
          </nav>
        )}

        <p className={styles.disclaimer}>{disclaimer}</p>
      </article>
    </div>
  )
}
