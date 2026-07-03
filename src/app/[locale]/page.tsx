import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import StatsSection from '../components/StatsSection'
import ServicesSection from '../components/ServicesSection'
import AdvantagesSection from '../components/AdvantagesSection'
import HowWeWorkSection from '../components/HowWeWorkSection'
import Footer from '../components/Footer'
import ScrollReveal from '../components/ScrollReveal'
import JsonLd from '../components/JsonLd'
import { isValidLocale, type Locale } from '@/lib/i18n/config'
import { buildPageMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

const AccountsSection = dynamic(() => import('../components/AccountsSection'))
const SpecialistsSection = dynamic(() => import('../components/SpecialistsSection'))
const ClientsSection = dynamic(() => import('../components/ClientsSection'))
const FaqSection = dynamic(() => import('../components/FaqSection'))
const ContactSection = dynamic(() => import('../components/ContactSection'))
const SeoTextSection = dynamic(() => import('../components/SeoTextSection'))

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = isValidLocale(rawLocale) ? rawLocale : 'ru'

  if (locale === 'en') {
    return buildPageMetadata({
      title: siteConfig.titleEn,
      description: siteConfig.descriptionEn,
      path: '/',
      locale: 'en',
      ogTitle: siteConfig.titleEn,
      keywords: siteConfig.keywordsEn,
    })
  }

  return buildPageMetadata({
    title: siteConfig.titleRu,
    description: siteConfig.descriptionRu,
    path: '/',
    locale: 'ru',
    ogTitle: siteConfig.titleRu,
    keywords: siteConfig.keywordsRu,
  })
}

export default async function Home({ params }: Props) {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'ru') as Locale

  return (
    <>
      <JsonLd locale={locale} />
      <Navbar transparent />
      <main>
        <Hero />
        <StatsSection />
        <ServicesSection />
        <AdvantagesSection />
        <HowWeWorkSection />
        <AccountsSection />
        <ScrollReveal><SpecialistsSection /></ScrollReveal>
        <ScrollReveal delay={40}><ClientsSection /></ScrollReveal>
        <ScrollReveal delay={40}><FaqSection /></ScrollReveal>
        <ScrollReveal delay={40}><ContactSection /></ScrollReveal>
        <SeoTextSection />
      </main>
      <Footer />
    </>
  )
}
