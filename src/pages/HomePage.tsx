import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { ScrollProgress } from '@/components/ScrollProgress'
import { CustomCursor } from '@/components/CustomCursor'
import { Footer } from '@/components/Footer'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useGsapSetup } from '@/hooks/useGsapSetup'
import { useLenis, scrollToId } from '@/hooks/useLenis'
import { Preloader } from '@/components/luxe/Preloader'
import { Marquee } from '@/components/luxe/Marquee'
import { Manifesto } from '@/sections/Manifesto'
import { Proof } from '@/sections/Proof'
import { Hero } from '@/sections/Hero'
import { SelectedWork } from '@/sections/SelectedWork'
import { TechStack } from '@/sections/TechStack'
import { Experience } from '@/sections/Experience'
import { Services } from '@/sections/Services'
import { Process } from '@/sections/Process'
import { Contact } from '@/sections/Contact'
import { Archive } from '@/sections/Archive'

const SECTION_IDS = [
  'hero',
  'work',
  'services',
  'proof',
  'process',
  'archive',
  'contact',
] as const

export function HomePage() {
  useGsapSetup()
  useLenis()
  const [ready, setReady] = useState(false)
  const activeId = useActiveSection(SECTION_IDS)
  const location = useLocation()

  useEffect(() => {
    const id = location.hash.replace(/^#/, '')
    if (!id) return
    const t = window.setTimeout(() => {
      scrollToId(id)
    }, 80)
    return () => window.clearTimeout(t)
  }, [location.hash, location.pathname])

  return (
    <div className="min-h-[100svh] bg-surface font-body text-gray-300">
      <Preloader onDone={() => setReady(true)} />
      <CustomCursor />
      <ScrollProgress />
      <Navbar activeId={activeId} />
      <main className="page-main overflow-x-hidden">
        <Hero ready={ready} />
        <Marquee />
        <Manifesto />
        <SelectedWork />
        <Proof />
        <TechStack />
        <Services />
        <Experience />
        <Process />
        <Contact />
        <Archive />
      </main>
      <Footer />
    </div>
  )
}
