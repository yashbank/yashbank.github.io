import { PROJECTS } from '@/assets/content'
import { SITE_IMAGES } from '@/assets/siteImages'
import { SectionBackdrop } from '@/components/SectionBackdrop'
import { ProjectCard } from '@/components/ProjectCard'
import { SectionHeading } from '@/components/SectionHeading'

/** Bento-style grid: two shipped products on top, two builds below — no horizontal pin (stable alignment). */
export function Projects() {
  const shipped = PROJECTS.filter((p) => p.tier === 'production')
  const builds = PROJECTS.filter((p) => p.tier === 'build')

  return (
    <section
      id="projects"
      className="group/section relative scroll-mt-20 overflow-hidden py-32 md:py-40"
    >
      <SectionBackdrop
        desktop={SITE_IMAGES.projects.desktop}
        mobile={SITE_IMAGES.projects.mobile}
        imageOpacity={0.11}
      />
      {/* Ambient accents */}
      <div
        className="pointer-events-none absolute -left-24 top-20 z-[1] h-72 w-72 rounded-full bg-accent/[0.07] blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-20 right-0 z-[1] h-72 w-72 rounded-full bg-gradient-to-tl from-vermillion/[0.07] via-violet-600/[0.05] to-transparent blur-[110px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-40 z-[1] h-px w-[min(90%,48rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/15 to-transparent"
        aria-hidden
      />

      <div className="container-site relative z-10">
        <SectionHeading
          eyebrow="Work"
          title="Selected projects"
          subtitle="Insurance CRM and AI career tooling live on Vercel — plus dashboards, workflow tools, and standout team builds. Full stack, polished UI, and shippable quality."
        />

        {/* Shipped row — slightly larger visual weight */}
        <div className="mt-14 space-y-4">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-accent/90">
            Production
          </p>
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:items-stretch">
            {shipped.map((project, index) => (
              <div key={project.id} className="flex min-h-0">
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Builds row */}
        <div className="mt-20 space-y-4 border-t border-white/[0.05] pt-20">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500/90">
            Team builds
          </p>
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:items-stretch">
            {builds.map((project, index) => (
              <div key={project.id} className="flex min-h-0">
                <ProjectCard project={project} index={index + shipped.length} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
