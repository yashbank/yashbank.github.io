import { useCallback } from 'react'
import type { PointerEvent } from 'react'

/** Writes --cx/--cy (px) on the element for cursor-follow spotlights, plus optional 3D tilt. No re-renders. */
export function usePointerVars(tilt = 0) {
  const onPointerMove = useCallback(
    (e: PointerEvent<HTMLElement>) => {
      if (e.pointerType !== 'mouse') return
      const el = e.currentTarget
      const r = el.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      el.style.setProperty('--cx', `${x}px`)
      el.style.setProperty('--cy', `${y}px`)
      if (tilt) {
        const rx = (0.5 - y / r.height) * tilt
        const ry = (x / r.width - 0.5) * tilt
        el.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg)`
      }
    },
    [tilt],
  )
  const onPointerLeave = useCallback((e: PointerEvent<HTMLElement>) => {
    if (tilt) e.currentTarget.style.transform = ''
  }, [tilt])
  return { onPointerMove, onPointerLeave }
}
