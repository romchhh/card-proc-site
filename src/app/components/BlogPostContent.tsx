'use client'

import Link from 'next/link'
import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { LucideIcon } from 'lucide-react'
import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Circle,
  ClipboardList,
  Flame,
  Globe,
  Lightbulb,
  ListChecks,
  Rocket,
  Settings,
  Target,
  TrendingUp,
  Wrench,
  XCircle,
  Zap,
} from 'lucide-react'
import { useLocalizedPath } from '@/lib/i18n/use-locale'
import styles from './BlogPostPage.module.css'

function isExternalHref(href: string) {
  return href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:')
}

type IconTone = 'ok' | 'bad' | 'warn' | 'accent'

type EmojiIconEntry = { tokens: string[]; Icon: LucideIcon; tone: IconTone }

const EMOJI_ICONS: EmojiIconEntry[] = [
  { tokens: ['📊'], Icon: BarChart3, tone: 'accent' },
  { tokens: ['📈'], Icon: TrendingUp, tone: 'accent' },
  { tokens: ['🛠️', '🛠'], Icon: Wrench, tone: 'accent' },
  { tokens: ['📋'], Icon: ClipboardList, tone: 'accent' },
  { tokens: ['⚙️', '⚙'], Icon: Settings, tone: 'accent' },
  { tokens: ['🚀'], Icon: Rocket, tone: 'accent' },
  { tokens: ['🎯'], Icon: Target, tone: 'accent' },
  { tokens: ['💡'], Icon: Lightbulb, tone: 'warn' },
  { tokens: ['⚠️', '⚠'], Icon: AlertTriangle, tone: 'warn' },
  { tokens: ['🔥'], Icon: Flame, tone: 'warn' },
  { tokens: ['🌐'], Icon: Globe, tone: 'accent' },
  { tokens: ['⚡'], Icon: Zap, tone: 'accent' },
  { tokens: ['✅', '✔️', '✔'], Icon: CheckCircle2, tone: 'ok' },
  { tokens: ['🛑'], Icon: XCircle, tone: 'bad' },
  { tokens: ['🔴'], Icon: Circle, tone: 'bad' },
  { tokens: ['🟢'], Icon: Circle, tone: 'ok' },
  { tokens: ['❌', '✖'], Icon: XCircle, tone: 'bad' },
  { tokens: ['☑️', '☑'], Icon: ListChecks, tone: 'ok' },
]

const EMOJI_TOKEN_MAP = new Map<string, EmojiIconEntry>()
for (const entry of EMOJI_ICONS) {
  for (const token of entry.tokens) {
    EMOJI_TOKEN_MAP.set(token, entry)
  }
}

const EMOJI_TOKENS = Array.from(EMOJI_TOKEN_MAP.keys()).sort((a, b) => b.length - a.length)

function toneClass(tone: IconTone) {
  if (tone === 'ok') return styles.iconOk
  if (tone === 'bad') return styles.iconBad
  if (tone === 'warn') return styles.iconWarn
  return styles.iconAccent
}

function renderEmojiIcon(entry: EmojiIconEntry, key: string) {
  const { Icon, tone } = entry
  return (
    <Icon
      key={key}
      className={`${styles.inlineIcon} ${toneClass(tone)}`}
      size={16}
      strokeWidth={2.25}
      aria-hidden
    />
  )
}

function replaceEmojisInText(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = []
  let i = 0
  let plain = ''
  let key = 0

  const flushPlain = () => {
    if (!plain) return
    nodes.push(<Fragment key={`${keyPrefix}-t-${key++}`}>{plain}</Fragment>)
    plain = ''
  }

  while (i < text.length) {
    let matched: string | null = null
    for (const token of EMOJI_TOKENS) {
      if (text.startsWith(token, i)) {
        matched = token
        break
      }
    }

    if (matched) {
      flushPlain()
      nodes.push(renderEmojiIcon(EMOJI_TOKEN_MAP.get(matched)!, `${keyPrefix}-i-${key++}`))
      i += matched.length
      continue
    }

    const codePoint = text.codePointAt(i)
    if (codePoint === undefined) break
    plain += String.fromCodePoint(codePoint)
    i += codePoint > 0xffff ? 2 : 1
  }

  flushPlain()
  return nodes
}

function withIcons(children: ReactNode, keyPrefix = 'n'): ReactNode {
  return Children.map(children, (child, index) => {
    if (typeof child === 'string') {
      return replaceEmojisInText(child, `${keyPrefix}-${index}`)
    }

    if (isValidElement(child)) {
      const element = child as ReactElement<{ children?: ReactNode }>
      if (element.props.children == null) return child
      return cloneElement(element, {
        children: withIcons(element.props.children, `${keyPrefix}-${index}`),
      })
    }

    return child
  })
}

export default function BlogPostContent({ body }: { body: string }) {
  const lp = useLocalizedPath()

  return (
    <div className={styles.content}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => <h2 className={styles.h2}>{withIcons(children)}</h2>,
          h3: ({ children }) => <h3 className={styles.h3}>{withIcons(children)}</h3>,
          p: ({ children }) => <p className={styles.paragraph}>{withIcons(children)}</p>,
          ul: ({ children }) => <ul className={styles.list}>{children}</ul>,
          ol: ({ children }) => <ol className={styles.list}>{children}</ol>,
          li: ({ children }) => <li>{withIcons(children)}</li>,
          strong: ({ children }) => (
            <strong className={styles.strong}>{withIcons(children)}</strong>
          ),
          code: ({ children }) => <code className={styles.code}>{children}</code>,
          pre: ({ children }) => <pre className={styles.pre}>{children}</pre>,
          hr: () => <hr className={styles.hr} />,
          blockquote: ({ children }) => (
            <blockquote className={styles.blockquote}>{withIcons(children)}</blockquote>
          ),
          table: ({ children }) => (
            <div className={styles.tableWrap}>
              <table className={styles.table}>{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead>{children}</thead>,
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => <tr>{children}</tr>,
          th: ({ children }) => <th>{withIcons(children)}</th>,
          td: ({ children }) => <td>{withIcons(children)}</td>,
          a: ({ href, children }) => {
            if (!href) return <span>{withIcons(children)}</span>

            if (isExternalHref(href)) {
              return (
                <a
                  href={href}
                  className={styles.inlineLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {withIcons(children)}
                </a>
              )
            }

            const localizedHref = href.startsWith('/') ? lp(href) : lp(`/${href}`)

            return (
              <Link href={localizedHref} className={styles.inlineLink}>
                {withIcons(children)}
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
