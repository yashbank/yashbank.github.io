import { Navbar } from '@/components/Navbar'
import { ScrollProgress } from '@/components/ScrollProgress'
import { CustomCursor } from '@/components/CustomCursor'
import { Footer } from '@/components/Footer'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useGsapSetup } from '@/hooks/useGsapSetup'
import { Hero } from '@/sections/Hero'
import { About } from '@/sections/About'
import { Skills } from '@/sections/Skills'
import { Projects } from '@/sections/Projects'
import { Experience } from '@/sections/Experience'
import { Services } from '@/sections/Services'
import { WhyHire } from '@/sections/WhyHire'
import { Contact } from '@/sections/Contact'

const SECTION_IDS = [
  'hero',
  'about',
  'skills',
  'projects',
  'experience',
  'services',
  'why-hire',
  'contact',
] as const

export function HomePage() {
  useGsapSetup()
  const activeId = useActiveSection(SECTION_IDS)

  return (
    <div className="min-h-[100svh] bg-surface font-body text-gray-300">
      <CustomCursor />
      <ScrollProgress />
      <Navbar activeId={activeId} />
      <main className="overflow-x-hidden">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Services />
        <WhyHire />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
