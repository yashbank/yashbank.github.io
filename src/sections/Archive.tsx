import { ARCHIVE_PROJECTS } from '@/data/projects'
import { SectionBackdrop } from '@/components/SectionBackdrop'
import { ProjectCard } from '@/components/ProjectCard'
import { SectionHeading } from '@/components/SectionHeading'

export function Archive() {
  if (ARCHIVE_PROJECTS.length === 0) return null

  return (
    <section
      id="archive"
      className="group/section relative scroll-mt-20 overflow-hidden py-24 sm:py-28 md:py-32 lg:py-36"
    >
      <SectionBackdrop tone="calm" />
      <div className="container-site relative z-10">
        <SectionHeading
          eyebrow="Archive"
          title="Earlier team builds"
          subtitle="Clone-style exercises and early collaborative work — kept for transparency. For client-facing quality, start with selected work above."
        />
        <div className="mt-12 grid w-full gap-6 sm:gap-8 lg:grid-cols-2">
          {ARCHIVE_PROJECTS.map((project, index) => (
            <div key={project.slug} className="w-full min-w-0">
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
