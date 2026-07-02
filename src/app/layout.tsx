import type { Metadata, Viewport } from 'next'
import { headers } from 'next/headers'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Providers from './components/Providers'
import { siteConfig } from '@/lib/site'
import { defaultLocale, isValidLocale } from '@/lib/i18n/config'

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-montserrat',
})

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.titleRu,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.descriptionRu,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  applicationName: siteConfig.name,
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'finance',
  icons: {
    icon: siteConfig.ogImage,
    apple: siteConfig.ogImage,
  },
  ...(googleVerification
    ? { verification: { google: googleVerification } }
    : {}),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const localeHeader = headers().get('x-locale')
  const htmlLang = localeHeader && isValidLocale(localeHeader) ? localeHeader : defaultLocale

  return (
    <html lang={htmlLang} className={montserrat.variable} suppressHydrationWarning>
      <head>
        <link rel="alternate" type="text/plain" href="/ai.txt" title="AI information" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM information" />
      </head>
      <body className={montserrat.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
