import { notFound } from 'next/navigation'
import LangSync from '../components/LangSync'
import { isValidLocale, locales, type Locale } from '@/lib/i18n/config'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: rawLocale } = await params

  if (!isValidLocale(rawLocale)) {
    notFound()
  }

  const locale = rawLocale as Locale

  return (
    <>
      <LangSync locale={locale} />
      {children}
    </>
  )
}
