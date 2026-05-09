import { useEffect, useRef, type ReactNode } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useReducedMotion } from 'framer-motion'
import { SITE } from '@/assets/content'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { ScrollProgress } from '@/components/ScrollProgress'
import { CustomCursor } from '@/components/CustomCursor'
import { getAdjacentProjects, getProjectBySlug, hasScreenshotPreview, type PortfolioProject } from '@/data/projects'
import { publicAssetUrl } from '@/lib/publicAsset'
import { fadeInUp } from '@/lib/motion'

function statusLabel(s: PortfolioProject['status']): string {
  switch (s) {
    case 'flagship':
      return 'Flagship'
    case 'production':
      return 'Production'
    case 'archive':
      return 'Archive'
  }
}

function previewInitials(title: string): string {
  const words = title.split(/\s+/).filter(Boolean)
  if (words.length >= 2) return `${words[0][0] ?? ''}${words[1][0] ?? ''}`.toUpperCase()
  return title.slice(0, 2).toUpperCase()
}

function CaseStudyHeroPreview({ project }: { project: PortfolioProject }) {
  const initials = previewInitials(project.title)
  const isSignature = project.status === 'flagship'
  const reduceMotion = useReducedMotion()

  if (hasScreenshotPreview(project) && project.imageSrc && project.imageAlt) {
    const objectPosition = project.previewImageObjectPosition
    return (
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 26 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-12%' }}
        transition={
          reduceMotion ? { duration: 0 } : { duration: 0.72, ease: [0.16, 1, 0.3, 1], delay: isSignature ? 0.05 : 0 }
        }
        className={
          isSignature
            ? 'case-study-hero-signature rounded-[calc(1rem+3px)] sm:rounded-[calc(1.5rem+3px)] p-[1px] shadow-[0_24px_64px_-30px_rgba(0,0,0,0.48)]'
            : ''
        }
      >
        <div
          className={`case-study-device overflow-hidden ${isSignature ? 'case-study-device--signature' : ''}`}
        >
          {isSignature ? <div className="case-study-device-bar" aria-hidden /> : null}
          <div
            className={`preview-screenshot-frame relative w-full overflow-hidden rounded-xl border bg-[#0b0c12] sm:rounded-2xl ${
              isSignature
                ? 'border-white/[0.1] shadow-[0_14px_40px_-26px_rgba(0,0,0,0.5)] ring-1 ring-inset ring-white/[0.055]'
                : 'border-white/[0.08] shadow-[0_10px_36px_-26px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/[0.04]'
            }`}
          >
            <div className="pointer-events-none absolute inset-0 z-[2] shadow-[inset_0_1px_0_rgba(255,255,255,0.045)]" aria-hidden />
            <div className="relative z-0 flex min-h-[232px] w-full items-start justify-center px-2 pb-2 pt-2 sm:min-h-[292px] sm:px-3.5 sm:pb-2.5 sm:pt-2.5 md:min-h-[312px]">
              <img
                src={publicAssetUrl(project.imageSrc)}
                alt={project.imageAlt}
                className="case-study-preview-img relative z-0 max-h-[min(56vh,30rem)] w-full rounded-md object-contain object-top sm:max-h-[min(64vh,38rem)] sm:rounded-lg"
                style={objectPosition ? { objectPosition } : undefined}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                sizes="(max-width: 768px) 100vw, min(768px, 48rem)"
              />
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] bg-gradient-to-t from-[#06070b]/65 via-[#06070b]/16 to-transparent px-5 pb-4 pt-11 sm:px-8 sm:pb-5 sm:pt-12">
              <p className="preview-screenshot-caption font-display text-[10px] font-medium uppercase tracking-[0.28em] text-gray-300/95">
                {project.previewLabel}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  const accentWash =
    project.themeAccent === 'sky'
      ? 'from-sky-400/[0.055] via-transparent to-cyan-400/[0.028]'
      : project.themeAccent === 'violet'
        ? 'from-accent/[0.06] via-transparent to-violet-500/[0.032]'
        : 'from-accent/[0.035] via-transparent to-transparent'

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border sm:rounded-3xl ${
        isSignature
          ? 'aspect-[21/9] min-h-[200px] border-white/[0.1] bg-gradient-to-b from-[#14151d] to-[#080910] shadow-[0_16px_48px_-32px_rgba(0,0,0,0.45)] ring-1 ring-inset ring-white/[0.05] sm:min-h-[260px]'
          : 'aspect-[21/9] min-h-[200px] border-white/[0.08] bg-gradient-to-b from-[#12131c] to-[#090a10] shadow-[0_12px_40px_-28px_rgba(0,0,0,0.4)] ring-1 ring-inset ring-white/[0.045] sm:min-h-[240px]'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#14151f]/90 via-[#0c0d12] to-[#080910]" aria-hidden />
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accentWash}`} aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '26px 26px',
          maskImage: 'radial-gradient(ellipse 85% 72% at 50% 48%, black 18%, transparent 74%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-10 top-[40%] h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent sm:inset-x-16"
        aria-hidden
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center sm:gap-5">
        <div
          className={`flex items-center justify-center rounded-2xl border ${
            isSignature
              ? 'h-16 w-16 border-white/[0.11] bg-white/[0.055] sm:h-[4.5rem] sm:w-[4.5rem]'
              : 'h-14 w-14 border-white/[0.09] bg-white/[0.045]'
          }`}
          aria-hidden
        >
          <span className="font-display text-base font-semibold tracking-[0.1em] text-gray-300 sm:text-lg">{initials}</span>
        </div>
        <div className="space-y-1.5">
          <p className="font-display text-[10px] font-medium uppercase tracking-[0.28em] text-gray-400">
            {project.previewLabel}
          </p>
          <p className="max-w-md text-xs font-medium leading-relaxed text-gray-500">Screenshot incoming</p>
        </div>
      </div>
    </div>
  )
}

function SectionCard({
  children,
  className = '',
  signature = false,
  rhythm = 'default',
  staggerIndex = 0,
}: {
  children: ReactNode
  className?: string
  /** Stronger depth ring for flagship case studies */
  signature?: boolean
  /** Alternating panel depth for scan rhythm */
  rhythm?: 'default' | 'muted'
  staggerIndex?: number
}) {
  const reduceMotion = useReducedMotion()
  const rhythmCls = rhythm === 'muted' ? 'detail-surface--muted' : ''
  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={
        reduceMotion
          ? undefined
          : { y: -2, transition: { duration: 0.48, ease: [0.16, 1, 0.3, 1] } }
      }
      viewport={{ once: true, margin: '-10%' }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.58, delay: Math.min(staggerIndex * 0.06, 0.22), ease: [0.16, 1, 0.3, 1] }
      }
      className={`detail-surface detail-surface--interactive rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:px-7 sm:py-8 ${signature ? 'detail-surface--signature' : ''} ${rhythmCls} ${className}`}
    >
      {children}
    </motion.section>
  )
}

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = getProjectBySlug(slug)
  const flagship = project?.status === 'flagship'
  const caseStudyPreviewRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useGSAP(
    () => {
      const p = getProjectBySlug(slug)
      if (!p || p.status !== 'flagship' || prefersReducedMotion) return
      const root = caseStudyPreviewRef.current
      if (!root || !hasScreenshotPreview(p)) return
      const img = root.querySelector<HTMLElement>('.case-study-preview-img')
      if (!img) return

      gsap.registerPlugin(ScrollTrigger)
      const ctx = gsap.context(() => {
        gsap.fromTo(
          img,
          { y: 14 },
          {
            y: -16,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.15,
            },
          },
        )
      }, root)
      return () => ctx.revert()
    },
    { scope: caseStudyPreviewRef, dependencies: [slug, prefersReducedMotion] },
  )

  if (!project) {
    return <Navigate to="/" replace />
  }

  const { prev, next } = getAdjacentProjects(project.slug)
  const mailSubject = encodeURIComponent(
    project.slug === 'clinq'
      ? 'Clinq — question or similar product scope'
      : project.slug === 'sarthak-bankar-portfolio'
        ? 'Portfolio / case-study site — question or similar scope'
        : `Question: ${project.title}`,
  )

  return (
    <div className="project-detail relative min-h-[100svh] bg-surface font-body text-gray-300 transition-colors duration-300 ease-out">
      <CustomCursor />
      <ScrollProgress />
      <Navbar activeId="" />
      <main className="relative z-[1] overflow-x-hidden pb-28 pt-10 md:pb-36 md:pt-14">
        <div className={`container-site ${flagship ? 'max-w-[52rem]' : 'max-w-3xl'}`}>
          <motion.div initial={fadeInUp.initial} animate={fadeInUp.animate} transition={fadeInUp.transition}>
            <nav className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-gray-500" aria-label="Breadcrumb">
              <Link
                to="/#work"
                className="focus-ring font-medium text-gray-400 transition duration-200 ease-out hover:text-accent/90"
              >
                Work
              </Link>
              <span className="text-gray-700" aria-hidden>
                /
              </span>
              <span className="max-w-[min(100%,20rem)] truncate text-gray-500">{project.category}</span>
            </nav>

            <div
              className={`detail-hero-panel mt-8 sm:mt-10 ${flagship ? 'detail-hero-panel--signature' : ''}`}
            >
              <header className="space-y-5 sm:space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                    {statusLabel(project.status)}
                  </span>
                  {flagship ? (
                    <span className="rounded-full border border-accent/28 bg-accent/[0.1] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent/95">
                      Signature
                    </span>
                  ) : null}
                </div>
                <h1 className="font-display text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl md:text-[2.65rem] md:leading-[1.06]">
                  {project.title}
                </h1>
                <p className="text-lg font-medium leading-snug text-gray-200/95 sm:text-xl">{project.tagline}</p>
                <div className="max-w-2xl border-t border-white/[0.06] pt-5">
                  <p className="font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-500">
                    Ownership
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-400 sm:text-[15px] sm:leading-relaxed">{project.role}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="chip-project">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring inline-flex min-h-[48px] items-center justify-center rounded-xl bg-gradient-to-r from-accent via-violet-400 to-sky-400 px-6 py-3 text-sm font-semibold text-zinc-950 transition duration-200 ease-out hover:opacity-95 sm:min-h-[44px]"
                  >
                    Open live
                  </a>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.04] px-6 py-3 text-sm font-medium text-gray-100 transition duration-200 ease-out hover:border-white/[0.16] hover:bg-white/[0.07] sm:min-h-[44px]"
                  >
                    Source
                  </a>
                  <a
                    href={`mailto:${SITE.email}?subject=${mailSubject}`}
                    className="focus-ring inline-flex min-h-[44px] items-center justify-center rounded-lg text-sm font-medium text-accent/90 underline-offset-4 transition duration-200 ease-out hover:text-accent hover:underline sm:px-2"
                  >
                    Email about scope
                  </a>
                </div>
              </header>
            </div>

            <div ref={caseStudyPreviewRef} className="mt-10 sm:mt-12">
              <CaseStudyHeroPreview project={project} />
            </div>

            <div className="prose-project mt-16 space-y-9 sm:mt-[4.5rem] sm:space-y-10">
              <SectionCard signature={flagship} staggerIndex={0}>
                <h2 className="font-display text-[10px] font-semibold uppercase tracking-[0.24em] text-gray-500">
                  Product context
                </h2>
                <p className="mt-3.5 text-[15px] leading-[1.75] text-gray-300/95 sm:text-[15.5px]">{project.summary}</p>
              </SectionCard>

              <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                <SectionCard className="h-full" rhythm="muted" staggerIndex={1}>
                  <h2 className="font-display text-[10px] font-semibold uppercase tracking-[0.24em] text-gray-500">
                    Constraints
                  </h2>
                  <p className="mt-3.5 text-[14px] leading-relaxed text-gray-400 sm:text-[15px]">{project.problem}</p>
                </SectionCard>
                <SectionCard className="h-full" signature={flagship} staggerIndex={2}>
                  <h2 className="font-display text-[10px] font-semibold uppercase tracking-[0.24em] text-gray-500">
                    Approach
                  </h2>
                  <p className="mt-3.5 text-[14px] leading-relaxed text-gray-400 sm:text-[15px]">{project.solution}</p>
                </SectionCard>
              </div>

              <SectionCard signature={flagship} staggerIndex={3}>
                <h2 className="font-display text-[10px] font-semibold uppercase tracking-[0.24em] text-gray-500">
                  What shipped
                </h2>
                <ul className="mt-4 space-y-3">
                  {project.keyFeatures.map((f) => (
                    <li key={f} className="flex gap-3 text-[14px] leading-snug text-gray-300/95 sm:text-[15px]">
                      <span className="mt-[0.45em] h-1 w-1 shrink-0 rounded-full bg-accent/55" aria-hidden />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </SectionCard>

              {project.workflowHowItWorks ? (
                <SectionCard rhythm="muted" staggerIndex={4}>
                  <h2 className="font-display text-[10px] font-semibold uppercase tracking-[0.24em] text-gray-500">
                    How it runs
                  </h2>
                  <p className="mt-3.5 text-[14px] leading-[1.75] text-gray-400 sm:text-[15px]">{project.workflowHowItWorks}</p>
                </SectionCard>
              ) : null}

              {project.highlights.length > 0 ? (
                <SectionCard signature={flagship} staggerIndex={5}>
                  <h2 className="font-display text-[10px] font-semibold uppercase tracking-[0.24em] text-gray-500">
                    {project.status === 'archive' ? 'At a glance' : flagship ? 'Standout details' : 'Highlights'}
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-[14px] leading-snug text-gray-400 sm:text-[15px]">
                        <span className="mt-[0.45em] h-1 w-1 shrink-0 rounded-full bg-white/25" aria-hidden />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </SectionCard>
              ) : null}

              {project.detailSections.length > 0 ? (
                <div className="space-y-5 border-t border-white/[0.06] pt-12 sm:space-y-6 sm:pt-14">
                  {project.detailSections.map((block, i) => (
                    <SectionCard key={block.id} rhythm={i % 2 === 0 ? 'default' : 'muted'} staggerIndex={6 + i}>
                      <h2 className="font-display text-[10px] font-semibold uppercase tracking-[0.24em] text-gray-500">
                        {block.title}
                      </h2>
                      <p className="mt-3.5 text-[14px] leading-[1.75] text-gray-400 sm:text-[15px]">{block.body}</p>
                    </SectionCard>
                  ))}
                </div>
              ) : null}
            </div>

            <footer className="detail-footer-cta-panel detail-footer-cta-panel--launch mt-16 sm:mt-20">
              <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-5 sm:flex-row sm:gap-10">
                  {prev ? (
                    <Link
                      to={`/projects/${prev.slug}`}
                      className="focus-ring group block max-w-full rounded-lg text-sm font-medium text-gray-400 transition duration-200 ease-out hover:text-accent/90"
                    >
                      <span className="block text-[11px] uppercase tracking-[0.18em] text-gray-600">Previous</span>
                      <span className="mt-1 block truncate text-gray-100 group-hover:text-accent">{prev.title}</span>
                    </Link>
                  ) : null}
                  {next ? (
                    <Link
                      to={`/projects/${next.slug}`}
                      className="focus-ring group block max-w-full rounded-lg text-sm font-medium text-gray-400 transition duration-200 ease-out hover:text-accent/90"
                    >
                      <span className="block text-[11px] uppercase tracking-[0.18em] text-gray-600">Next</span>
                      <span className="mt-1 block truncate text-gray-100 group-hover:text-accent">{next.title}</span>
                    </Link>
                  ) : null}
                </div>
                <Link
                  to="/#work"
                  className="focus-ring inline-flex min-h-[44px] shrink-0 items-center justify-center self-start rounded-xl border border-white/[0.11] bg-white/[0.05] px-6 py-3 text-sm font-semibold text-gray-100 transition duration-200 ease-out hover:border-accent/35 hover:bg-white/[0.07] sm:self-center"
                >
                  Back to work
                </Link>
              </div>
            </footer>

            <p className="mt-10 text-center text-xs leading-relaxed text-gray-600 sm:mt-12">
              Prefer a form?{' '}
              <Link
                to="/#contact"
                className="focus-ring rounded text-accent/90 underline-offset-4 transition hover:underline"
              >
                Contact
              </Link>{' '}
              on the homepage — same inbox.
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
