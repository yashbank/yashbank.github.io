import { useEffect, useRef, useState } from 'react'

/**
 * Dual-layer cursor: crisp dot + soft trailing ring. Desktop / fine pointer only.
 * Respects prefers-reduced-motion.
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const hoveringRef = useRef(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const narrow = window.matchMedia('(max-width: 1023px)').matches
    if (reduceMotion || !finePointer || narrow) {
      return
    }

    document.documentElement.classList.add('cursor-custom-active')

    const mouse = { x: 0, y: 0 }
    const ring = { x: 0, y: 0 }
    const dot = { x: 0, y: 0 }

    const isInteractive = (el: EventTarget | null) => {
      if (!el || !(el instanceof Element)) return false
      return Boolean(
        el.closest(
          'a, button, input, textarea, select, label[for], [role="button"], [data-cursor-hover]',
        ),
      )
    }

    let rafId = 0

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      hoveringRef.current = isInteractive(e.target)
      setVisible(true)
    }

    const onLeave = () => setVisible(false)

    const loop = () => {
      ring.x += (mouse.x - ring.x) * 0.13
      ring.y += (mouse.y - ring.y) * 0.13
      dot.x += (mouse.x - dot.x) * 0.36
      dot.y += (mouse.y - dot.y) * 0.36

      const ringEl = ringRef.current
      const dotEl = dotRef.current
      const hov = hoveringRef.current
      if (ringEl) {
        const scale = hov ? 1.55 : 1
        ringEl.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%, -50%) scale(${scale})`
        ringEl.style.borderColor = hov ? 'rgba(61, 212, 200, 0.75)' : 'rgba(61, 212, 200, 0.28)'
      }
      if (dotEl) {
        dotEl.style.transform = `translate(${dot.x}px, ${dot.y}px) translate(-50%, -50%) scale(${hov ? 0.85 : 1})`
      }
      rafId = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    rafId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.classList.remove('cursor-custom-active')
    }
  }, [])

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] ${visible ? 'opacity-100' : 'opacity-0'} max-lg:hidden`}
      aria-hidden
    >
      <div
        ref={ringRef}
        className="pointer-events-none absolute left-0 top-0 h-10 w-10 rounded-full border border-accent/30 bg-transparent shadow-glow transition-[border-color] duration-300 will-change-transform"
        style={{ transform: 'translate(-100px, -100px)' }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-accent shadow-glow-sm will-change-transform"
        style={{ transform: 'translate(-100px, -100px)' }}
      />
    </div>
  )
}
