import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  HOME_PATHS,
  agentLinkHeader,
  prefersMarkdown,
  robotsTxtBody,
} from '@/lib/agent-discovery'
import { defaultLocale, isValidLocale } from '@/lib/i18n/config'

const CANONICAL_HOST = 'wayofprocessing.com'

function withAgentHeaders(response: NextResponse) {
  response.headers.set('Link', agentLinkHeader())
  response.headers.set('Vary', 'Accept')
  return response
}

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

  if (pathname === '/robots.txt') {
    return new NextResponse(robotsTxtBody(), {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  }

  // Locale homes only — bare `/` still redirects to defaultLocale below.
  if (pathname !== '/' && HOME_PATHS.has(pathname)) {
    const accept = request.headers.get('accept')
    if (prefersMarkdown(accept)) {
      const url = request.nextUrl.clone()
      url.pathname = '/api/agent-markdown'
      url.search = ''
      return withAgentHeaders(NextResponse.rewrite(url))
    }
    return withAgentHeaders(NextResponse.next())
  }

  if (pathname.includes('.')) {
    return NextResponse.next()
  }

  const segment = pathname.split('/').filter(Boolean)[0]

  if (segment && isValidLocale(segment)) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = pathname === '/' ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`
  return NextResponse.redirect(url, 308)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel).*)'],
}
