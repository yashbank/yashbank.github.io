import { SELECTED_PROJECTS } from '@/data/projects'
import { SectionBackdrop } from '@/components/SectionBackdrop'
import { ProjectCard } from '@/components/ProjectCard'
import { SectionHeading } from '@/components/SectionHeading'

export function SelectedWork() {
  const flagship = SELECTED_PROJECTS.filter((p) => p.status === 'flagship')
  const shipped = SELECTED_PROJECTS.filter((p) => p.status === 'production')

  return (
    <section
      id="work"
      className="group/section relative scroll-mt-20 overflow-hidden py-24 sm:py-28 md:py-36 lg:py-40"
    >
      <SectionBackdrop tone="calm" />

      <div className="container-site relative z-10">
        <SectionHeading
          eyebrow="Selected work"
          title="Built to ship and hold up in review"
          subtitle="Signature work first, then production builds. Flip for a tight brief; open the case study for full context and links."
        />

        {flagship.length > 0 ? (
          <div className="work-flagship-stage relative z-[1] mt-16 sm:mt-[4.5rem]">
            <p className="relative z-[1] font-display text-[10.5px] font-semibold uppercase tracking-[0.22em] text-accent/90">
              Signature
            </p>
            <div className="relative z-[1] mt-5 grid w-full gap-7 sm:gap-9 lg:grid-cols-1">
              {flagship.map((project, index) => (
                <div key={project.slug} className="w-full min-w-0">
                  <ProjectCard project={project} index={index} featured />
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div
          className={`relative z-[1] space-y-4 ${flagship.length > 0 ? 'mt-16 border-t border-white/[0.06] pt-16 sm:mt-[4.5rem] sm:pt-[4.5rem]' : 'mt-12'}`}
        >
          <p className="work-section-subcap font-display text-[10.5px] font-semibold uppercase tracking-[0.22em] text-gray-500">
            In production
          </p>
          <div className="grid w-full gap-6 sm:gap-8 lg:grid-cols-2 lg:items-stretch">
            {shipped.map((project, index) => (
              <div key={project.slug} className="w-full min-w-0">
                <ProjectCard project={project} index={index + flagship.length} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
