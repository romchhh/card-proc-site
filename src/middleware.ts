import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { defaultLocale, isValidLocale } from '@/lib/i18n/config'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const segment = pathname.split('/').filter(Boolean)[0]

  if (segment && isValidLocale(segment)) {
    const response = NextResponse.next()
    response.headers.set('x-locale', segment)
    return response
  }

  const url = request.nextUrl.clone()
  url.pathname = pathname === '/' ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`
  const response = NextResponse.redirect(url)
  response.headers.set('x-locale', defaultLocale)
  return response
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
