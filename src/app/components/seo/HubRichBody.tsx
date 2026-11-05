import styles from '../../[locale]/services/hub.module.css'

type Section = {
  title: string
  paragraphs: string[]
}

type Props = {
  intro: string[]
  sections: Section[]
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

export default function HubRichBody({ intro, sections }: Props) {
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
    </>
  )
}
