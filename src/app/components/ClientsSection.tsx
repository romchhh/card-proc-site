'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import styles from './ClientsSection.module.css'

const CLIENTS = [
  'marketplaces',
  'saas',
  'onlineOffline',
  'subscriptions',
  'ecommerce',
  'courses',
] as const

const HIGH_RISK = ['forex', 'gaming', 'vape', 'steroids'] as const

const CLIENT_ICONS: Record<typeof CLIENTS[number] | typeof HIGH_RISK[number], string> = {
  marketplaces: '/images/clients-icons/marketplaces.svg',
  saas: '/images/clients-icons/saas.svg',
  onlineOffline: '/images/clients-icons/online-offline.svg',
  subscriptions: '/images/clients-icons/subscriptions.svg',
  ecommerce: '/images/clients-icons/ecommerce.svg',
  courses: '/images/clients-icons/courses.svg',
  forex: '/images/clients-icons/forex.svg',
  gaming: '/images/clients-icons/gaming.svg',
  vape: '/images/clients-icons/vape.svg',
  steroids: '/images/clients-icons/sports-supplements.svg',
}

function ClientIcon({
  type,
  label,
}: {
  type: typeof CLIENTS[number] | typeof HIGH_RISK[number]
  label: string
}) {
  return (
    <div className={styles.icon}>
      <Image
        src={CLIENT_ICONS[type]}
        alt={label}
        width={80}
        height={80}
        className={styles.iconImg}
      />
    </div>
  )
}

export default function ClientsSection() {
  const { t } = useTranslation()

  return (
    <section id="clients" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{t('clients.heading')}</h2>

        <div className={styles.grid}>
          {CLIENTS.map((key) => (
            <article key={key} className={styles.card}>
              <ClientIcon type={key} label={t(`clients.${key}.title`)} />
              <h3 className={styles.title}>{t(`clients.${key}.title`)}</h3>
              <p className={styles.desc}>{t(`clients.${key}.desc`)}</p>
            </article>
          ))}
        </div>

        <div className={styles.highRisk}>
          <h3 className={styles.subheading}>{t('clients.highRiskHeading')}</h3>
          <p className={styles.subdesc}>{t('clients.highRiskNote')}</p>

          <div className={styles.gridHighRisk}>
            {HIGH_RISK.map((key) => (
              <article key={key} className={styles.card}>
                <ClientIcon type={key} label={t(`clients.highRisk.${key}.title`)} />
                <h3 className={styles.title}>{t(`clients.highRisk.${key}.title`)}</h3>
                <p className={styles.desc}>{t(`clients.highRisk.${key}.desc`)}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
