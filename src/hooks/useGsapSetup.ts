import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/** Register GSAP plugins once and refresh ScrollTrigger on resize. */
export function useGsapSetup() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const onResize = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])
}
