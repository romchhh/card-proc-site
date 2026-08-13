import Link from 'next/link'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SiteHtmlShell from './components/SiteHtmlShell'
import { buildPageMetadata } from '@/lib/seo'
import styles from './not-found.module.css'

export const metadata = buildPageMetadata({
  title: 'Страница не найдена',
  description: 'Запрошенная страница не существует. Вернитесь на главную WayOfProcessing или в блог.',
  path: '/404',
  locale: 'ru',
  noIndex: true,
})

export default function NotFound() {
  return (
    <SiteHtmlShell locale="ru">
      <Navbar />
      <main className={styles.main}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Страница не найдена</h1>
        <p className={styles.desc}>
          Возможно, ссылка устарела или страница была перемещена.
        </p>
        <div className={styles.actions}>
          <Link href="/ru" className={styles.primary}>
            На главную
          </Link>
          <Link href="/ru/blog" className={styles.secondary}>
            В блог
          </Link>
        </div>
      </main>
      <Footer />
    </SiteHtmlShell>
  )
}
