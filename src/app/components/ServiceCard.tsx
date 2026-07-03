'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { SERVICE_IMAGES, type ServiceSlug } from '@/lib/services'
import styles from './ServiceCard.module.css'

type Props = {
  slug: ServiceSlug
  title: string
  description: string
  href: string
  titleAs?: 'h2' | 'h3'
}

export default function ServiceCard({ slug, title, description, href, titleAs: TitleTag = 'h3' }: Props) {
  const { t } = useTranslation()

  return (
    <article className={styles.card}>
      <Link href={href} className={styles.cardLink}>
        <div className={styles.cardMedia}>
          <Image
            src={SERVICE_IMAGES[slug]}
            alt={title}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className={styles.cardImage}
            loading="lazy"
          />
          <div className={styles.cardOverlay} aria-hidden="true" />
          <div className={styles.cardContent}>
            <TitleTag className={styles.title}>{title}</TitleTag>
            <p className={styles.desc}>{description}</p>
            <span className={styles.more}>
              {t('services.more')}
              <span className={styles.moreArrow} aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 6 H10 M7 3 L10 6 L7 9" />
                </svg>
              </span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
