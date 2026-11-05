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

const EMOJI_ICONS: Array<{ match: RegExp; Icon: LucideIcon; tone: IconTone }> = [
  { match: /📊/u, Icon: BarChart3, tone: 'accent' },
  { match: /📈/u, Icon: TrendingUp, tone: 'accent' },
  { match: /🛠\uFE0F?/u, Icon: Wrench, tone: 'accent' },
  { match: /📋/u, Icon: ClipboardList, tone: 'accent' },
  { match: /⚙\uFE0F?/u, Icon: Settings, tone: 'accent' },
  { match: /🚀/u, Icon: Rocket, tone: 'accent' },
  { match: /🎯/u, Icon: Target, tone: 'accent' },
  { match: /💡/u, Icon: Lightbulb, tone: 'warn' },
  { match: /⚠\uFE0F?/u, Icon: AlertTriangle, tone: 'warn' },
  { match: /🔥/u, Icon: Flame, tone: 'warn' },
  { match: /🌐/u, Icon: Globe, tone: 'accent' },
  { match: /⚡/u, Icon: Zap, tone: 'accent' },
  { match: /✅|✔\uFE0F?/u, Icon: CheckCircle2, tone: 'ok' },
  { match: /🛑/u, Icon: XCircle, tone: 'bad' },
  { match: /🔴/u, Icon: Circle, tone: 'bad' },
  { match: /🟢/u, Icon: Circle, tone: 'ok' },
  { match: /❌|✖/u, Icon: XCircle, tone: 'bad' },
  { match: /☑\uFE0F?/u, Icon: ListChecks, tone: 'ok' },
]

const EMOJI_SPLIT = new RegExp(
  `(${EMOJI_ICONS.map(({ match }) => match.source).join('|')})`,
  'u',
)

function toneClass(tone: IconTone) {
  if (tone === 'ok') return styles.iconOk
  if (tone === 'bad') return styles.iconBad
  if (tone === 'warn') return styles.iconWarn
  return styles.iconAccent
}

function renderEmojiIcon(emoji: string, key: string) {
  const entry = EMOJI_ICONS.find(({ match }) => match.test(emoji))
  if (!entry) return <Fragment key={key}>{emoji}</Fragment>

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
  return text.split(EMOJI_SPLIT).flatMap((part, index) => {
    if (!part) return []
    if (EMOJI_ICONS.some(({ match }) => match.test(part))) {
      return [renderEmojiIcon(part, `${keyPrefix}-${index}`)]
    }
    return [<Fragment key={`${keyPrefix}-t-${index}`}>{part}</Fragment>]
  })
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
