import type { ReactNode } from 'react'
import {
  AlertTriangle,
  Building2,
  Check,
  Clock,
  Compass,
  FileText,
  Landmark,
  Receipt,
  ShieldAlert,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import styles from './SeoLanding.module.css'

export function sectionIcon(title: string): LucideIcon {
  const t = title.toLowerCase()
  if (/не обеща|не обіця|не promise|warn|risk|огранич|обмеж|блок/.test(t)) return AlertTriangle
  if (/банк|счет|рахунок|bank|iban|необанк/.test(t)) return Landmark
  if (/налог|подат|tax|отчет|звіт|receipt|учёт|облік/.test(t)) return Receipt
  if (/когда|коли|when|подходит|підходит|choose|выбор|обер/.test(t)) return Compass
  if (/провер|перевір|screen|kyc|вериф|shield/.test(t)) return ShieldCheck
  if (/срок|строк|time|days|дней|днів/.test(t)) return Clock
  if (/документ|регистр|реєстр|компани|компані|форм/.test(t)) return FileText
  if (/high-risk|форекс|forex|gaming/.test(t)) return ShieldAlert
  return Building2
}

export function RichParagraphs({ paragraphs }: { paragraphs: string[] }) {
  const nodes: ReactNode[] = []
  let listBuf: string[] = []

  const flushList = () => {
    if (!listBuf.length) return
    nodes.push(
      <ul key={`list-${nodes.length}`} className={styles.checklist}>
        {listBuf.map((item) => (
          <li key={item}>
            <Check className={styles.checkIcon} size={18} strokeWidth={2} aria-hidden />
            <span>{item.replace(/^-+\s*/, '')}</span>
          </li>
        ))}
      </ul>,
    )
    listBuf = []
  }

  paragraphs.forEach((paragraph, index) => {
    if (paragraph.trim().startsWith('- ')) {
      listBuf.push(paragraph.trim())
      return
    }
    flushList()
    nodes.push(
      <p key={`p-${index}`} className={styles.paragraph}>
        {paragraph}
      </p>,
    )
  })
  flushList()

  return <>{nodes}</>
}

export function WarnCallout({ children }: { children: ReactNode }) {
  return (
    <aside className={styles.warnCallout} role="note">
      <AlertTriangle className={styles.warnIcon} size={22} strokeWidth={1.5} aria-hidden />
      <div>{children}</div>
    </aside>
  )
}
