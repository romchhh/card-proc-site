import Link from 'next/link'
import styles from './Breadcrumbs.module.css'

type BreadcrumbItem = {
  name: string
  path: string
}

type Props = {
  items: BreadcrumbItem[]
  theme?: 'light' | 'dark'
}

export default function Breadcrumbs({ items, theme = 'light' }: Props) {
  return (
    <nav
      className={`${styles.nav} ${theme === 'dark' ? styles.navDark : ''}`}
      aria-label="Breadcrumb"
    >
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={item.path} className={styles.item}>
              {index > 0 && <span className={styles.sep} aria-hidden="true">/</span>}
              {isLast ? (
                <span className={styles.current} aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className={styles.link}>
                  {item.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
