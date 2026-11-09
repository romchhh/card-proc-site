const STORAGE_KEY = 'wop-locale-scroll-top'

export function markLocaleSwitchScrollTop() {
  try {
    sessionStorage.setItem(STORAGE_KEY, '1')
  } catch {
    /* ignore */
  }
}

export function consumeLocaleSwitchScrollTop() {
  try {
    if (sessionStorage.getItem(STORAGE_KEY) !== '1') return false
    sessionStorage.removeItem(STORAGE_KEY)
    return true
  } catch {
    return false
  }
}

export function forceWindowScrollTop() {
  const html = document.documentElement
  const body = document.body
  html.scrollTop = 0
  body.scrollTop = 0
  window.scrollTo(0, 0)
}
