import { useEffect, useState } from 'react'
import { CustomCursor } from '@/components/CustomCursor'
import { Marquee } from '@/components/luxe/Marquee'
import { Preloader } from '@/components/luxe/Preloader'
import { ScrollProgress } from '@/components/ScrollProgress'
import { useActiveSection } from '@/hooks/useActiveSection'
import { Manifesto } from '@/sections/Manifesto'
import { ObContact, ObCraft, ObExperience, ObProof } from './ObSections'
import { ObHero } from './ObHero'
import { ObNav } from './ObNav'
import { ObWork } from './ObWork'

const IDS = ['hero', 'work', 'proof', 'services', 'experience', 'contact'] as const

export function ObsidianHome() {
  const [ready, setReady] = useState(false)
  const activeId = useActiveSection(IDS)
  useEffect(() => {
    document.title = 'Yash Bankar — AI-native product engineer'
  }, [])
  return (
    <div className="min-h-[100svh] bg-[#08080a] font-body text-white/80">
      <Preloader onDone={() => setReady(true)} />
      <CustomCursor />
      <ScrollProgress />
      <ObNav activeId={activeId} />
      <main className="overflow-x-clip">
        <ObHero ready={ready} />
        <Marquee />
        <Manifesto />
        <ObWork />
        <ObProof />
        <ObCraft />
        <ObExperience />
        <ObContact />
      </main>
    </div>
  )
}
