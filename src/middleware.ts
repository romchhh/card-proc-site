import { NextResponse, type NextRequest } from 'next/server'
import {
  HOME_PATHS,
  agentLinkHeader,
  prefersMarkdown,
  robotsTxtBody,
} from '@/lib/agent-discovery'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/robots.txt') {
    return new NextResponse(robotsTxtBody(), {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  }

  if (!HOME_PATHS.has(pathname)) {
    return NextResponse.next()
  }

  const accept = request.headers.get('accept')
  if (prefersMarkdown(accept)) {
    const url = request.nextUrl.clone()
    url.pathname = '/api/agent-markdown'
    url.search = ''
    const response = NextResponse.rewrite(url)
    response.headers.set('Vary', 'Accept')
    response.headers.set('Link', agentLinkHeader())
    return response
  }

  const response = NextResponse.next()
  response.headers.set('Link', agentLinkHeader())
  response.headers.set('Vary', 'Accept')
  return response
}

export const config = {
  matcher: ['/', '/ru', '/uk', '/en', '/robots.txt'],
}
