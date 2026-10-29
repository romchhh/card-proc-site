import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.titleRu,
    short_name: siteConfig.name,
    description: siteConfig.descriptionRu.slice(0, 160),
    start_url: '/ru',
    display: 'standalone',
    background_color: '#0A2540',
    theme_color: siteConfig.themeColor,
    lang: 'ru',
    categories: ['finance', 'business'],
    icons: [
      {
        src: '/icon.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  }
}
