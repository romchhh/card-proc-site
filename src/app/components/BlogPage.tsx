'use client'

import { useTranslation } from 'react-i18next'
import { getAllPostViews } from '@/lib/blog'
import { useLocale, useLocalizedPath } from '@/lib/i18n/use-locale'
import BlogCard from './BlogCard'
import ScrollReveal from './ScrollReveal'
import styles from './BlogPage.module.css'

export default function BlogPage() {
  const { t } = useTranslation()
  const locale = useLocale()
  const lp = useLocalizedPath()
  const posts = getAllPostViews(locale)

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <ScrollReveal>
          <header className={styles.header}>
            <h1 className={styles.title}>{t('blog.title')}</h1>
            <p className={styles.description}>{t('blog.description')}</p>
          </header>
        </ScrollReveal>

        <div className={styles.grid}>
          {posts.map((post, index) => (
            <ScrollReveal key={post.slug} delay={(index % 2) * 100}>
              <BlogCard post={post} href={lp(`/blog/${post.slug}`)} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  )
}
