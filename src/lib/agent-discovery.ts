import { siteConfig } from './site'

/** Homepage locale roots that negotiate markdown and advertise Link headers. */
export const HOME_PATHS = new Set(['/', '/ru', '/uk', '/en'])

export function absoluteSiteUrl(path: string): string {
  const base = siteConfig.url.replace(/\/$/, '')
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${base}${normalized}`
}

/** RFC 8288 Link header for machine-readable site descriptions. */
export function agentLinkHeader(): string {
  return [
    `<${absoluteSiteUrl('/llms.txt')}>; rel="alternate"; type="text/markdown"`,
    `<${absoluteSiteUrl('/ai.txt')}>; rel="alternate"; type="text/plain"`,
    `<${absoluteSiteUrl('/.well-known/api-catalog')}>; rel="api-catalog"`,
  ].join(', ')
}

export function prefersMarkdown(accept: string | null): boolean {
  if (!accept) return false

  const parts = accept.split(',').map((raw) => {
    const [typePart, ...params] = raw.trim().split(';')
    const type = typePart.trim().toLowerCase()
    const qParam = params.find((p) => p.trim().startsWith('q='))
    const q = qParam ? Number.parseFloat(qParam.split('=')[1] ?? '1') : 1
    return { type, q: Number.isFinite(q) ? q : 1 }
  })

  const markdown = parts.find((p) => p.type === 'text/markdown')
  if (!markdown || markdown.q <= 0) return false

  const html = parts.find((p) => p.type === 'text/html')
  const htmlQ = html && html.q > 0 ? html.q : 0
  return markdown.q >= htmlQ
}

export function robotsTxtBody(): string {
  const host = siteConfig.url.replace(/^https?:\/\//, '').replace(/\/$/, '')
  return [
    'User-agent: *',
    'Content-Signal: search=yes, ai-input=yes, ai-train=no',
    'Allow: /',
    '',
    `Host: ${host}`,
    `Sitemap: ${absoluteSiteUrl('/sitemap.xml')}`,
    '',
  ].join('\n')
}
