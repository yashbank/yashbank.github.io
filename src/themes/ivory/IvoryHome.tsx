import { useEffect } from 'react'
import { CustomCursor } from '@/components/CustomCursor'
import { ScrollProgress } from '@/components/ScrollProgress'
import { useActiveSection } from '@/hooks/useActiveSection'
import { IvHero } from './IvHero'
import { IvNav } from './IvNav'
import { IvWork } from './IvWork'
import { IvContact, IvCraft, IvExperience, IvProof, IvStatement } from './IvSections'

const IDS = ['hero', 'work', 'proof', 'services', 'experience', 'contact'] as const

export function IvoryHome() {
  const activeId = useActiveSection(IDS)
  useEffect(() => {
    document.title = 'Yash Bankar — AI-native product engineer'
  }, [])
  return (
    <div className="min-h-[100svh] bg-[#f1ebdf] font-body text-[#15120e]">
      <CustomCursor />
      <ScrollProgress />
      <IvNav activeId={activeId} />
      <main className="overflow-x-clip">
        <IvHero />
        <IvStatement />
        <IvWork />
        <IvProof />
        <IvCraft />
        <IvExperience />
        <IvContact />
      </main>
    </div>
  )
}
