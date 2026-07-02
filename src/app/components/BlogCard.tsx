'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { formatBlogDate, type BlogPostView } from '@/lib/blog'
import { useLocale } from '@/lib/i18n/use-locale'
import styles from './BlogCard.module.css'

type Props = {
  post: BlogPostView
  href: string
  titleAs?: 'h2' | 'h3'
}

export default function BlogCard({ post, href, titleAs: TitleTag = 'h2' }: Props) {
  const { t } = useTranslation()
  const locale = useLocale()

  return (
    <Link href={href} className={styles.card}>
      <div className={styles.cardImgWrap}>
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={styles.cardImg}
        />
      </div>
      <div className={styles.cardBody}>
        <p className={styles.cardMeta}>
          <time dateTime={post.date}>{formatBlogDate(post.date, locale)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.category}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readTime}</span>
        </p>
        <TitleTag className={styles.cardTitle}>{post.title}</TitleTag>
        <p className={styles.cardExcerpt}>{post.excerpt}</p>
        <span className={styles.readMore}>
          {t('blog.readMore')}
          <span className={styles.readMoreArrow} aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12 L12 2 M5 2 H12 V9" />
            </svg>
          </span>
        </span>
      </div>
    </Link>
  )
}
