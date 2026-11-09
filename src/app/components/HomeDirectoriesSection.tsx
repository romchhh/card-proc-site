'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { getLandingsByGroup, getLandingView } from '@/lib/landings'
import { useLocale, useLocalizedPath } from '@/lib/i18n/use-locale'
import styles from './HomeDirectoriesSection.module.css'

const COUNTRY_SHORT: Record<string, { ru: string; uk: string; en: string }> = {
  poland: { ru: 'Польша', uk: 'Польща', en: 'Poland' },
  estonia: { ru: 'Эстония', uk: 'Естонія', en: 'Estonia' },
  'czech-republic': { ru: 'Чехия', uk: 'Чехія', en: 'Czechia' },
  cyprus: { ru: 'Кипр', uk: 'Кіпр', en: 'Cyprus' },
  'united-kingdom': { ru: 'Великобритания', uk: 'Велика Британія', en: 'United Kingdom' },
  'hong-kong': { ru: 'Гонконг', uk: 'Гонконг', en: 'Hong Kong' },
}

const NICHE_SHORT: Record<string, { ru: string; uk: string; en: string }> = {
  saas: { ru: 'SaaS', uk: 'SaaS', en: 'SaaS' },
  subscriptions: { ru: 'Подписки', uk: 'Підписки', en: 'Subscriptions' },
  'online-courses': { ru: 'Онлайн-курсы', uk: 'Онлайн-курси', en: 'Online courses' },
  marketplace: { ru: 'Маркетплейсы', uk: 'Маркетплейси', en: 'Marketplaces' },
  'digital-products': { ru: 'Digital products', uk: 'Digital products', en: 'Digital products' },
  gaming: { ru: 'Gaming', uk: 'Gaming', en: 'Gaming' },
  'high-risk': { ru: 'High-risk', uk: 'High-risk', en: 'High-risk' },
  forex: { ru: 'Forex', uk: 'Forex', en: 'Forex' },
}

const SOLUTION_SHORT: Record<string, { ru: string; uk: string; en: string }> = {
  'stripe-ukraine': { ru: 'Stripe для Украины', uk: 'Stripe для України', en: 'Stripe for Ukraine' },
  'stripe-account-issues': {
    ru: 'Блокировки и hold',
    uk: 'Блокування і hold',
    en: 'Blocks and holds',
  },
}

export default function HomeDirectoriesSection() {
  const { t } = useTranslation()
  const locale = useLocale()
  const lp = useLocalizedPath()
  const countries = getLandingsByGroup('jurisdictions')
  const niches = getLandingsByGroup('niches')
  const solutions = getLandingsByGroup('solutions')

  return (
    <section className={styles.section} aria-labelledby="home-directories-heading">
      <div className={styles.inner}>
        <h2 id="home-directories-heading" className={styles.heading}>
          {t('homeDirectories.heading')}
        </h2>
        <p className={styles.lead}>{t('homeDirectories.lead')}</p>

        <div className={styles.grid}>
          <div className={styles.block}>
            <div className={styles.blockHead}>
              <h3 className={styles.blockTitle}>{t('homeDirectories.countriesTitle')}</h3>
              <Link href={lp('/jurisdictions')} className={styles.blockAll}>
                {t('homeDirectories.seeAll')}
              </Link>
            </div>
            <ul className={styles.list}>
              {countries.map((item) => {
                const view = getLandingView(item, locale)
                const short = COUNTRY_SHORT[item.slug]?.[locale] ?? view.h1
                return (
                  <li key={item.path}>
                    <Link href={lp(item.path)}>{short}</Link>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className={styles.block}>
            <div className={styles.blockHead}>
              <h3 className={styles.blockTitle}>{t('homeDirectories.nichesTitle')}</h3>
              <Link href={lp('/niches')} className={styles.blockAll}>
                {t('homeDirectories.seeAll')}
              </Link>
            </div>
            <ul className={styles.list}>
              {niches.map((item) => {
                const view = getLandingView(item, locale)
                const short = NICHE_SHORT[item.slug]?.[locale] ?? view.h1
                return (
                  <li key={item.path}>
                    <Link href={lp(item.path)}>{short}</Link>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className={styles.block}>
            <div className={styles.blockHead}>
              <h3 className={styles.blockTitle}>{t('homeDirectories.solutionsTitle')}</h3>
              <Link href={lp('/solutions')} className={styles.blockAll}>
                {t('homeDirectories.seeAll')}
              </Link>
            </div>
            <ul className={styles.list}>
              {solutions.map((item) => {
                const view = getLandingView(item, locale)
                const short = SOLUTION_SHORT[item.slug]?.[locale] ?? view.h1
                return (
                  <li key={item.path}>
                    <Link href={lp(item.path)}>{short}</Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
