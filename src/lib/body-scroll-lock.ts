import { useEffect } from 'react'

let lockCount = 0
let scrollY = 0

export function lockBodyScroll() {
  lockCount += 1
  if (lockCount > 1) return

  scrollY = window.scrollY
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
  document.body.style.position = 'fixed'
  document.body.style.top = `-${scrollY}px`
  document.body.style.left = '0'
  document.body.style.right = '0'
  document.body.style.width = '100%'

  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`
  }
}

export function unlockBodyScroll() {
  if (lockCount === 0) return

  lockCount -= 1
  if (lockCount > 0) return

  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.left = ''
  document.body.style.right = ''
  document.body.style.width = ''
  document.body.style.paddingRight = ''

  window.scrollTo(0, scrollY)
}

export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return

    lockBodyScroll()
    return () => unlockBodyScroll()
  }, [locked])
}
