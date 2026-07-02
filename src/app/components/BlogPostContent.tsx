'use client'

import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { useLocalizedPath } from '@/lib/i18n/use-locale'
import styles from './BlogPostPage.module.css'

function isExternalHref(href: string) {
  return href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:')
}

export default function BlogPostContent({ body }: { body: string }) {
  const lp = useLocalizedPath()

  return (
    <div className={styles.content}>
      <ReactMarkdown
        components={{
          h2: ({ children }) => <h2 className={styles.h2}>{children}</h2>,
          h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
          p: ({ children }) => <p className={styles.paragraph}>{children}</p>,
          ul: ({ children }) => <ul className={styles.list}>{children}</ul>,
          ol: ({ children }) => <ol className={styles.list}>{children}</ol>,
          li: ({ children }) => <li>{children}</li>,
          strong: ({ children }) => <strong className={styles.strong}>{children}</strong>,
          code: ({ children }) => <code className={styles.code}>{children}</code>,
          pre: ({ children }) => <pre className={styles.pre}>{children}</pre>,
          a: ({ href, children }) => {
            if (!href) return <span>{children}</span>

            if (isExternalHref(href)) {
              return (
                <a
                  href={href}
                  className={styles.inlineLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              )
            }

            const localizedHref = href.startsWith('/') ? lp(href) : lp(`/${href}`)

            return (
              <Link href={localizedHref} className={styles.inlineLink}>
                {children}
              </Link>
            )
          },
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  )
}
