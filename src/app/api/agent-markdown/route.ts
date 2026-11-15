import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { agentLinkHeader } from '@/lib/agent-discovery'

export const runtime = 'nodejs'

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'llms.txt')
  const body = await readFile(filePath, 'utf8')

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      Vary: 'Accept',
      Link: agentLinkHeader(),
    },
  })
}
