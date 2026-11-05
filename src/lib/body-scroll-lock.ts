import { useEffect } from 'react'

let lockCount = 0
let scrollbarCompensation = ''

export function lockBodyScroll() {
  lockCount += 1
  if (lockCount > 1) return

  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
  scrollbarCompensation = scrollbarWidth > 0 ? `${scrollbarWidth}px` : ''

  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
  document.body.style.touchAction = 'none'
  document.documentElement.style.overscrollBehavior = 'none'

  if (scrollbarCompensation) {
    document.body.style.paddingRight = scrollbarCompensation
  }
}

export function unlockBodyScroll() {
  if (lockCount === 0) return

  lockCount -= 1
  if (lockCount > 0) return

  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
  document.body.style.touchAction = ''
  document.documentElement.style.overscrollBehavior = ''
  document.body.style.paddingRight = ''
  scrollbarCompensation = ''
}

export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return

    lockBodyScroll()
    return () => unlockBodyScroll()
  }, [locked])
}
