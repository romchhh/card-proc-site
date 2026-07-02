import servicesData from '@/data/services.json'
import type { Locale } from './i18n/config'

export const SERVICE_SLUGS = [
  'stripe-account-rent',
  'stripe-account-buy',
  'processing-turnkey',
  'legal-entity-bank',
] as const

export const SERVICE_IMAGES: Record<ServiceSlug, string> = {
  'stripe-account-rent': '/images/service-rent.png',
  'stripe-account-buy': '/images/service-buy.png',
  'processing-turnkey': '/images/service-processing.png',
  'legal-entity-bank': '/images/service-legal.png',
}

export type ServiceSlug = (typeof SERVICE_SLUGS)[number]

export type ServiceFaqItem = {
  question: string
  answer: string
}

export type ServiceStat = {
  value: string
  label: string
}

export type ServiceStep = {
  title: string
  description: string
}

export type ServiceFeature = {
  title: string
  description: string
}

export type ServiceSection = {
  title: string
  paragraphs: string[]
}

export type ServiceOffer = {
  badge: string
  highlight: string
  sub: string
}

export type ServiceView = {
  meta: {
    title: string
    description: string
    keywords: string[]
  }
  h1: string
  lead: string
  offer: ServiceOffer
  sections: ServiceSection[]
  benefits: string[]
  faq: ServiceFaqItem[]
  card: {
    title: string
    desc: string
  }
  relatedServices: ServiceSlug[]
  relatedBlogSlugs: string[]
}

export type Service = {
  slug: ServiceSlug
  ru: ServiceView
  en: ServiceView
}

const services = servicesData.services as Service[]

export function isValidServiceSlug(slug: string): slug is ServiceSlug {
  return (SERVICE_SLUGS as readonly string[]).includes(slug)
}

export function getAllServices(): Service[] {
  return services
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug)
}

export function getServiceView(service: Service, locale: Locale): ServiceView {
  return service[locale]
}

export function servicePath(slug: ServiceSlug): string {
  return `/services/${slug}`
}
