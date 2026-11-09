import { NextResponse } from 'next/server'
import { isValidEmail, isValidTelegram, isValidWhatsapp } from '@/lib/contact-fields'
import { isTelegramConfigured, sendLeadToTelegram } from '@/lib/telegram'

const MAX_NAME = 120
const MAX_CONTACT = 80
const MAX_EMAIL = 120
const MAX_COMMENT = 2000
const MAX_SOURCE = 120

type ContactBody = {
  name?: string
  telegram?: string
  whatsapp?: string
  email?: string
  /** @deprecated legacy single contact field */
  phone?: string
  comment?: string
  source?: string
}

function trimField(value: unknown, max: number): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

function normalizeSource(raw: string): string {
  const cleaned = raw.replace(/[^a-zA-Z0-9/_-]/g, '').slice(0, MAX_SOURCE)
  return cleaned || 'unknown'
}

export async function POST(request: Request) {
  if (!isTelegramConfigured()) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
  }

  let body: ContactBody

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const name = trimField(body.name, MAX_NAME)
  const telegram = trimField(body.telegram ?? body.phone, MAX_CONTACT)
  const whatsapp = trimField(body.whatsapp, MAX_CONTACT)
  const email = trimField(body.email, MAX_EMAIL)
  const comment = trimField(body.comment, MAX_COMMENT)
  const source = normalizeSource(trimField(body.source, MAX_SOURCE))

  if (!name || !isValidTelegram(telegram) || !isValidWhatsapp(whatsapp)) {
    return NextResponse.json(
      { error: 'Name, Telegram and WhatsApp are required' },
      { status: 400 },
    )
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const sent = await sendLeadToTelegram({
    name,
    telegram,
    whatsapp,
    email: email || undefined,
    comment,
    source,
  })

  if (!sent) {
    return NextResponse.json({ error: 'Failed to send' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
