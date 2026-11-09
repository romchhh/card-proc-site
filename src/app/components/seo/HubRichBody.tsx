import Link from 'next/link'
import { localePath, type Locale } from '@/lib/i18n/config'
import styles from '../../[locale]/services/hub.module.css'

type Section = {
  title: string
  paragraphs: string[]
}

type Cta = {
  label: string
  path: string
}

type Props = {
  intro: string[]
  sections: Section[]
  ctas?: Cta[]
  locale?: Locale
}

function renderParagraphs(paragraphs: string[]) {
  const blocks: React.ReactNode[] = []
  let list: string[] = []

  const flush = () => {
    if (!list.length) return
    blocks.push(
      <ul key={`list-${blocks.length}`}>
        {list.map((item) => (
          <li key={item}>{item.replace(/^-+\s*/, '')}</li>
        ))}
      </ul>,
    )
    list = []
  }

  for (const paragraph of paragraphs) {
    if (paragraph.trim().startsWith('- ')) {
      list.push(paragraph.trim())
      continue
    }
    flush()
    blocks.push(<p key={paragraph.slice(0, 64)}>{paragraph}</p>)
  }
  flush()
  return blocks
}

export default function HubRichBody({ intro, sections, ctas, locale = 'ru' }: Props) {
  return (
    <>
      {intro.length > 0 && (
        <div className={styles.intro}>
          {intro.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      )}

      {sections.length > 0 && (
        <div className={styles.sections}>
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className={styles.sectionTitle}>{section.title}</h2>
              <div className={styles.sectionBody}>{renderParagraphs(section.paragraphs)}</div>
            </section>
          ))}
        </div>
      )}

      {ctas && ctas.length > 0 && (
        <ul className={styles.links}>
          {ctas.slice(0, 3).map((cta) => (
            <li key={cta.path}>
              <Link href={localePath(cta.path, locale)}>
                {cta.label}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
