import Link from 'next/link'
import { localePath, type Locale } from '@/lib/i18n/config'
import styles from './ContentTable.module.css'

export type ContentTableCell = string | { label: string; href: string }

export type ContentTableModel = {
  id: string
  heading: string
  lead?: string
  columns: string[]
  rows: ContentTableCell[][]
  note?: string
  /** first column is a row header */
  rowHeaders?: boolean
}

type Props = {
  table: ContentTableModel
  locale?: Locale
  narrow?: boolean
}

function CellValue({ cell, locale }: { cell: ContentTableCell; locale?: Locale }) {
  if (typeof cell === 'string') return <>{cell}</>
  if (!locale) return <>{cell.label}</>
  return (
    <Link href={localePath(cell.href, locale)} className={styles.cellLink}>
      {cell.label}
    </Link>
  )
}

export default function ContentTable({ table, locale, narrow = true }: Props) {
  return (
    <section className={`${styles.block} ${narrow ? styles.blockNarrow : ''}`} aria-labelledby={table.id}>
      <h2 id={table.id} className={styles.heading}>
        {table.heading}
      </h2>
      {table.lead ? <p className={styles.lead}>{table.lead}</p> : null}
      <div className={styles.wrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              {table.columns.map((column) => (
                <th key={column} scope="col">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => {
              const key = row
                .map((cell) => (typeof cell === 'string' ? cell : cell.href))
                .join('|')
                .slice(0, 96)
              return (
                <tr key={key}>
                  {row.map((cell, index) =>
                    table.rowHeaders && index === 0 ? (
                      <th key={`${key}-${index}`} scope="row">
                        <CellValue cell={cell} locale={locale} />
                      </th>
                    ) : (
                      <td key={`${key}-${index}`}>
                        <CellValue cell={cell} locale={locale} />
                      </td>
                    ),
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {table.note ? <p className={styles.note}>{table.note}</p> : null}
    </section>
  )
}
