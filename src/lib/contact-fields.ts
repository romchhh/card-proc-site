/** Shared contact-form masks and validators (Telegram / WhatsApp / email). */

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, '')
}

/** Format international phone as +XX XXX XXX XXX… while typing. */
export function formatPhoneMask(raw: string): string {
  let digits = digitsOnly(raw)
  if (!digits) return raw.trim().startsWith('+') ? '+' : ''

  // Keep a leading + in the output whenever the user typed one or started with digits.
  const withPlus = true
  digits = digits.slice(0, 15)

  const groups: string[] = []
  let i = 0
  // country code: 1–3 digits
  const ccLen = digits.length > 10 ? Math.min(3, digits.length - 7) : Math.min(3, digits.length)
  if (ccLen > 0) {
    groups.push(digits.slice(0, ccLen))
    i = ccLen
  }
  while (i < digits.length) {
    const rest = digits.length - i
    const size = rest > 4 ? 3 : rest
    groups.push(digits.slice(i, i + size))
    i += size
  }

  return `${withPlus ? '+' : ''}${groups.join(' ')}`
}

/** Telegram: @username or phone number with mask. */
export function formatTelegramMask(raw: string): string {
  const trimmed = raw.trimStart()
  if (trimmed.startsWith('@') || (/^[a-zA-Z_]/.test(trimmed) && !trimmed.startsWith('+'))) {
    const body = trimmed.replace(/^@/, '').replace(/[^a-zA-Z0-9_]/g, '').slice(0, 32)
    return body ? `@${body}` : '@'
  }
  return formatPhoneMask(raw)
}

export function isValidTelegram(value: string): boolean {
  const v = value.trim()
  if (/^@[a-zA-Z0-9_]{5,32}$/.test(v)) return true
  const digits = digitsOnly(v)
  return digits.length >= 10 && digits.length <= 15
}

export function isValidWhatsapp(value: string): boolean {
  const digits = digitsOnly(value)
  return digits.length >= 10 && digits.length <= 15
}

export function isValidEmail(value: string): boolean {
  const v = value.trim()
  if (!v) return true // optional
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) && v.length <= 120
}
