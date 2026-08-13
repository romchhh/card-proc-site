import { Montserrat } from 'next/font/google'
import Providers from './Providers'
import type { Locale } from '@/lib/i18n/config'

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-montserrat',
})

type Props = {
  locale: Locale
  children: React.ReactNode
}

export default function SiteHtmlShell({ locale, children }: Props) {
  return (
    <html lang={locale} className={montserrat.variable} suppressHydrationWarning>
      <head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="alternate" type="text/plain" href="/ai.txt" title="AI information" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM information" />
      </head>
      <body className={montserrat.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
