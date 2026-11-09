const TELEGRAM_API = 'https://api.telegram.org'

type LeadPayload = {
  name: string
  telegram: string
  whatsapp: string
  email?: string
  comment?: string
  source?: string
}

function getTelegramConfig() {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    return null
  }

  return { token, chatId }
}

function formatSourceLabel(source?: string): string {
  if (!source || source === 'unknown') return 'не указан'
  if (source === 'modal') return 'Модальное окно'
  if (source === 'section' || source === 'home_contact') return 'Форма на странице'
  return source
}

function formatLeadMessage({ name, telegram, whatsapp, email, comment, source }: LeadPayload): string {
  const lines = [
    '🆕 Новая заявка с сайта WayOfProcessing',
    '',
    `👤 Имя: ${name}`,
    `✈️ Telegram: ${telegram}`,
    `💬 WhatsApp: ${whatsapp}`,
  ]

  if (email?.trim()) {
    lines.push(`📧 Email: ${email.trim()}`)
  }

  if (comment?.trim()) {
    lines.push(`📝 Комментарий: ${comment.trim()}`)
  }

  lines.push(`📍 Источник: ${formatSourceLabel(source)}`)

  return lines.join('\n')
}

export async function sendLeadToTelegram(payload: LeadPayload): Promise<boolean> {
  const config = getTelegramConfig()
  if (!config) {
    console.error('Telegram is not configured: missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID')
    return false
  }

  const response = await fetch(`${TELEGRAM_API}/bot${config.token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: config.chatId,
      text: formatLeadMessage(payload),
      disable_web_page_preview: true,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error('Telegram sendMessage failed:', error)
    return false
  }

  return true
}

export function isTelegramConfigured(): boolean {
  return getTelegramConfig() !== null
}
