import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { defaultLocale, isValidLocale } from '@/lib/i18n/config'

const CANONICAL_HOST = 'wayofprocessing.com'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const host = (request.headers.get('host') ?? '').split(':')[0]

  if (host === `www.${CANONICAL_HOST}` || host.startsWith('www.')) {
    const url = request.nextUrl.clone()
    url.protocol = 'https'
    url.hostname = host.replace(/^www\./, '')
    url.port = ''
    return NextResponse.redirect(url, 301)
  }

  if (pathname.includes('.')) {
    return NextResponse.next()
  }

  const segment = pathname.split('/').filter(Boolean)[0]

  if (segment && isValidLocale(segment)) {
    const response = NextResponse.next()
    response.headers.set('x-locale', segment)
    return response
  }

  const url = request.nextUrl.clone()
  url.pathname = pathname === '/' ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`
  const response = NextResponse.redirect(url, 308)
  response.headers.set('x-locale', defaultLocale)
  return response
}

export const config = {
  matcher: ['/((?!api|_next|_vercel).*)'],
}
