import { useEffect, useState } from 'react'

const DEFAULT_IDS = [
  'hero',
  'about',
  'skills',
  'projects',
  'experience',
  'services',
  'why-hire',
  'contact',
] as const

/** Tracks which section is most visible for navbar highlighting. */
export function useActiveSection(sectionIds: readonly string[] = DEFAULT_IDS) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? 'hero')

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0]
        if (visible?.target?.id) setActiveId(visible.target.id)
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    )

    for (const el of elements) observer.observe(el)
    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}
