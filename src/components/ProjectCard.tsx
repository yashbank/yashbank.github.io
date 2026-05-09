import { useEffect, useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { PortfolioProject, ProjectStatus } from '@/data/projects'
import { getCardFlipBack, hasScreenshotPreview } from '@/data/projects'
import { publicAssetUrl } from '@/lib/publicAsset'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { fadeInUp } from '@/lib/motion'

type Props = {
  project: PortfolioProject
  index: number
  featured?: boolean
}

function statusBadge(status: ProjectStatus): { label: string; className: string } {
  switch (status) {
    case 'flagship':
      return {
        label: 'Flagship',
        className: 'border border-accent/28 bg-surface/95 text-accent/95',
      }
    case 'production':
      return {
        label: 'Live',
        className: 'border border-emerald-500/35 bg-surface/88 text-emerald-200/95',
      }
    case 'archive':
      return {
        label: 'Archive',
        className: 'border border-white/12 bg-surface/85 text-gray-500',
      }
  }
}

function briefSummary(text: string, max = 142): string {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > 100 ? cut.slice(0, lastSpace) : cut).trim()}…`
}

function briefProblem(text: string, max = 132): string {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > 90 ? cut.slice(0, lastSpace) : cut).trim()}…`
}

function previewInitials(title: string): string {
  const words = title.split(/\s+/).filter(Boolean)
  if (words.length >= 2) return `${words[0][0] ?? ''}${words[1][0] ?? ''}`.toUpperCase()
  return title.slice(0, 2).toUpperCase()
}

function PreviewFrame({
  badge,
  project,
  featured,
}: {
  badge: { label: string; className: string }
  project: PortfolioProject
  featured: boolean
}) {
  const initials = previewInitials(project.title)
  const isFlagshipHero = featured && project.status === 'flagship'
  const shellRing =
    isFlagshipHero
      ? 'aspect-[16/10] ring-1 ring-inset ring-white/[0.11]'
      : 'aspect-[16/10] ring-1 ring-inset ring-white/[0.06]'

  if (hasScreenshotPreview(project) && project.imageSrc && project.imageAlt) {
    const src = publicAssetUrl(project.imageSrc)
    const objectPosition = project.previewImageObjectPosition
    return (
      <div
        className={`preview-screenshot-frame relative shrink-0 overflow-hidden border-b border-white/[0.055] bg-[#0b0c12] ${shellRing} ${isFlagshipHero ? 'preview-screenshot-frame--showcase' : ''}`}
      >
        <div className="absolute inset-[2px] z-0 overflow-hidden rounded-md sm:inset-[3px] sm:rounded-lg">
          <img
            src={src}
            alt={project.imageAlt}
            className="absolute inset-0 z-0 h-full w-full object-cover object-top"
            style={objectPosition ? { objectPosition } : undefined}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 1024px) 100vw, min(896px, 70vw)"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/[0.08] via-transparent to-[#06070b]/36"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[2] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_0_0_1px_rgba(0,0,0,0.16)]"
          aria-hidden
        />
        <span
          className={`absolute left-3 top-3 z-[3] rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${badge.className}`}
        >
          {badge.label}
        </span>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] bg-gradient-to-t from-[#06070b]/70 via-[#06070b]/22 to-transparent px-3 pb-3 pt-9 sm:px-4 sm:pb-3.5 sm:pt-11">
          <p className="font-display text-[10px] font-medium uppercase tracking-[0.26em] text-gray-100/92">
            {project.previewLabel}
          </p>
        </div>
      </div>
    )
  }

  const accentWash =
    project.themeAccent === 'sky'
      ? 'from-sky-400/[0.055] via-transparent to-cyan-400/[0.025]'
      : project.themeAccent === 'violet'
        ? 'from-accent/[0.06] via-transparent to-violet-500/[0.03]'
        : 'from-accent/[0.035] via-transparent to-transparent'

  return (
    <div className={`relative shrink-0 overflow-hidden ${shellRing}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#14151f] via-[#0c0d12] to-[#08090e]" aria-hidden />
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accentWash}`}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)`,
          backgroundSize: '22px 22px',
          maskImage: 'radial-gradient(ellipse 92% 82% at 50% 45%, black 16%, transparent 74%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-8 top-[42%] h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#06070b]/85"
        aria-hidden
      />
      <span
        className={`absolute left-3 top-3 z-[1] rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${badge.className}`}
      >
        {badge.label}
      </span>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8 text-center">
        <div
          className={`flex items-center justify-center rounded-2xl border ${
            isFlagshipHero
              ? 'h-14 w-14 border-white/[0.1] bg-white/[0.05]'
              : 'h-12 w-12 border-white/[0.08] bg-white/[0.04]'
          }`}
          aria-hidden
        >
          <span
            className={`font-display font-semibold tracking-[0.08em] text-gray-300 ${
              isFlagshipHero ? 'text-[15px]' : 'text-[13px]'
            }`}
          >
            {initials}
          </span>
        </div>
        <div className="space-y-1">
          <p className="font-display text-[10px] font-medium uppercase tracking-[0.28em] text-gray-400">
            {project.previewLabel}
          </p>
          <p className="text-[11px] font-medium leading-snug text-gray-500">Screenshot incoming</p>
        </div>
      </div>
    </div>
  )
}

function BackFaceContent({
  project,
  showFooterLinks = true,
  compact = false,
}: {
  project: PortfolioProject
  showFooterLinks?: boolean
  compact?: boolean
}) {
  const fb = getCardFlipBack(project)
  const featureCap = compact ? 3 : 4
  const features = fb.keyFeatures.slice(0, featureCap)
  const moreCount = fb.keyFeatures.length - features.length
  const techShow = project.tech.slice(0, compact ? 4 : 6)
  const pad = compact ? 'p-4 sm:p-5' : 'p-5 sm:p-6'
  const panelGap = compact ? 'gap-2.5' : 'gap-3'

  return (
    <div className={`flex h-full min-h-[inherit] flex-col ${panelGap} overflow-y-auto overscroll-contain ${pad}`}>
      <div className="project-brief-panel">
        <p className="project-brief-kicker">Outcome</p>
        <p className={`project-brief-body mt-1.5 ${compact ? 'text-[12px]' : 'text-[12.5px] sm:text-[13px]'}`}>{fb.solution}</p>
      </div>

      <div className="project-brief-panel">
        <p className="project-brief-kicker">Constraint</p>
        <p className={`project-brief-body mt-1.5 text-gray-400 ${compact ? 'text-[11.5px]' : 'text-[12px] sm:text-[12.5px]'}`}>
          {briefProblem(fb.problemAudience)}
        </p>
      </div>

      <div className="project-brief-panel project-brief-panel--compound">
        <div>
          <p className="project-brief-kicker">Shipped</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {features.map((h) => (
              <span key={h} className="project-brief-chip max-w-full break-words text-left">
                {h}
              </span>
            ))}
          </div>
          {moreCount > 0 ? (
            <p className="mt-2 text-[10px] text-gray-600">+{moreCount} in full write-up</p>
          ) : null}
        </div>
        <div className="project-brief-divider my-3" aria-hidden />
        <div>
          <p className="project-brief-kicker">Stack</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {techShow.map((t) => (
              <span key={t} className="project-brief-chip">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {showFooterLinks ? (
        <div className="project-brief-cta mt-auto space-y-2.5">
          <Link
            to={`/projects/${project.slug}`}
            data-cursor-hover
            title="Full case study"
            className="focus-ring inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-gradient-to-r from-accent via-violet-400 to-sky-400 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition duration-200 ease-out hover:opacity-95"
          >
            Case study
          </Link>
          <div className="flex flex-col gap-2 min-[420px]:flex-row min-[420px]:flex-wrap">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="focus-ring inline-flex min-h-[44px] min-w-0 flex-1 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-2.5 text-[12.5px] font-medium text-gray-100 transition duration-200 ease-out hover:border-white/[0.14] hover:bg-white/[0.07]"
            >
              Open live
            </a>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="focus-ring inline-flex min-h-[44px] min-w-0 flex-1 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-2.5 text-[12.5px] font-medium text-gray-100 transition duration-200 ease-out hover:border-white/[0.14] hover:bg-white/[0.07]"
            >
              Source
            </a>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export function ProjectCard({ project, index, featured = false }: Props) {
  const badge = statusBadge(project.status)
  const reduced = usePrefersReducedMotion()
  const id = useId()
  const [pointerFine, setPointerFine] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches
  })
  const [hoverFlip, setHoverFlip] = useState(false)
  const [tapFlip, setTapFlip] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const sync = () => setPointerFine(mq.matches)
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (reduced || pointerFine || !tapFlip) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setTapFlip(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [tapFlip, reduced, pointerFine])

  const showBack = !reduced && (pointerFine ? hoverFlip : tapFlip)
  const isHeroFlagship = featured && project.status === 'flagship'
  const isShowcase = isHeroFlagship

  const shellClass =
    project.status === 'flagship'
      ? `ring-1 ${isHeroFlagship ? 'ring-white/[0.14]' : 'ring-white/[0.08]'} ${
          isHeroFlagship
            ? 'shadow-[0_32px_88px_-38px_rgba(0,0,0,0.62),0_0_0_1px_rgba(124,58,237,0.06),inset_0_1px_0_rgba(255,255,255,0.05)]'
            : 'shadow-[0_20px_56px_-36px_rgba(0,0,0,0.48)]'
        }`
      : project.status === 'archive'
        ? 'ring-1 ring-white/[0.05]'
        : 'ring-1 ring-white/[0.07]'

  const cardMin = isShowcase ? 'min-h-[540px] sm:min-h-[580px]' : featured ? 'min-h-[520px] sm:min-h-[540px]' : 'min-h-[480px] sm:min-h-[500px]'

  const flipContent = (
    <div className={`relative isolate w-full [perspective:2000px] ${cardMin}`}>
      <motion.div
        className={`relative w-full ${cardMin}`}
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: showBack ? 180 : 0 }}
        transition={{ duration: 0.78, ease: [0.22, 0.94, 0.22, 1] }}
      >
        <div
          className={`project-card-face backface-hidden absolute inset-0 flex min-h-0 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] sm:rounded-[1.35rem] ${shellClass}`}
          style={{ transform: 'rotateY(0deg) translateZ(1px)', WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
          inert={showBack ? true : undefined}
          aria-hidden={showBack}
        >
          <PreviewFrame badge={badge} project={project} featured={featured} />
          <div className={`flex flex-1 flex-col px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6 ${featured ? 'lg:px-8 lg:pb-7 lg:pt-7' : ''}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
              <p className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                {project.category}
              </p>
              {project.status === 'flagship' ? (
                <span className="rounded-full border border-accent/25 bg-accent/[0.09] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-accent/95">
                  Signature
                </span>
              ) : null}
            </div>
            <h3
              id={`${id}-title`}
              className={`mt-2.5 font-display font-semibold leading-[1.15] tracking-[-0.025em] text-white ${
                featured ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
              }`}
            >
              {project.title}
            </h3>
            <p className="mt-2 text-[13px] font-medium leading-snug text-gray-300 sm:text-sm">{project.tagline}</p>
            <p className="mt-3 text-[12.5px] leading-relaxed text-gray-500 sm:text-[13px]">{briefSummary(project.cardLead)}</p>
            <p className="mt-3 font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">Role</p>
            <p className="mt-1 text-[11px] font-medium leading-snug text-accent/85 sm:text-[12px]">{project.role}</p>
            <ul className="mt-3.5 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <li key={t} className="chip-project">
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-2.5 border-t border-white/[0.06] pt-4">
              <Link
                to={`/projects/${project.slug}`}
                data-cursor-hover
                title="Context, stack, workflow, and outbound links"
                className="focus-ring inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-gradient-to-r from-accent via-violet-400 to-sky-400 px-4 py-3 text-[13px] font-semibold text-zinc-950 transition duration-200 ease-out hover:opacity-95"
              >
                Case study
              </Link>
              <div className="flex flex-col gap-2 min-[420px]:flex-row">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="focus-ring inline-flex min-h-[44px] min-w-0 flex-1 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.035] px-3 py-2.5 text-[13px] font-medium text-gray-100 transition duration-200 ease-out hover:border-white/[0.14] hover:bg-white/[0.06]"
                >
                  Open live
                </a>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="focus-ring inline-flex min-h-[44px] min-w-0 flex-1 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.035] px-3 py-2.5 text-[13px] font-medium text-gray-100 transition duration-200 ease-out hover:border-white/[0.14] hover:bg-white/[0.06]"
                >
                  Source
                </a>
              </div>
              {!pointerFine && !reduced ? (
                <button
                  type="button"
                  onClick={() => setTapFlip(true)}
                  className="focus-ring inline-flex min-h-[44px] w-full items-center justify-center rounded-xl border border-white/[0.08] bg-transparent px-4 py-2.5 text-[13px] font-medium text-gray-400 transition duration-200 ease-out hover:border-white/[0.12] hover:bg-white/[0.04] hover:text-gray-300"
                  aria-label="Show solution and capabilities on the back of this card"
                >
                  Solution & capabilities
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <div
          className={`project-card-face project-card-face--back backface-hidden absolute inset-0 flex min-h-0 flex-col overflow-hidden rounded-2xl border border-white/[0.08] sm:rounded-[1.35rem] ${shellClass}`}
          style={{
            transform: 'rotateY(180deg) translateZ(1px)',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
          }}
          inert={!showBack ? true : undefined}
          aria-hidden={!showBack}
        >
          {!pointerFine && !reduced ? (
            <div className="project-card-back-strip relative z-10 flex shrink-0 items-center justify-between gap-2 border-b border-white/[0.06] px-3 py-2.5">
              <p className="pl-1 text-[11px] font-medium text-gray-500">More on this build</p>
              <button
                type="button"
                onClick={() => setTapFlip(false)}
                className="focus-ring min-h-[44px] rounded-lg border border-white/[0.1] bg-white/[0.05] px-4 text-[13px] font-medium text-gray-200 transition duration-200 ease-out hover:border-white/[0.14] hover:bg-white/[0.08]"
              >
                Close
              </button>
            </div>
          ) : null}
          <div className="min-h-0 flex-1">
            <BackFaceContent project={project} />
          </div>
        </div>
      </motion.div>
    </div>
  )

  return (
    <motion.article
      initial={fadeInUp.initial}
      whileInView={fadeInUp.animate}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ ...fadeInUp.transition, delay: index * 0.04 }}
      className={`group/card relative flex w-full min-w-0 flex-col outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${featured ? 'max-w-none' : ''} ${isShowcase ? 'project-card-showcase rounded-2xl sm:rounded-[1.35rem]' : ''}`}
      tabIndex={reduced || pointerFine ? undefined : 0}
      aria-expanded={reduced ? undefined : !pointerFine ? showBack : undefined}
      onKeyDown={(e) => {
        if (reduced || pointerFine) return
        if (e.key === 'Escape') {
          e.preventDefault()
          setTapFlip(false)
          return
        }
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setTapFlip((v) => !v)
        }
      }}
      onMouseEnter={() => {
        if (!reduced && pointerFine) setHoverFlip(true)
      }}
      onMouseLeave={() => {
        if (!reduced && pointerFine) setHoverFlip(false)
      }}
      aria-labelledby={`${id}-title`}
    >
      {reduced ? (
        <div
          className={`glass-card flex w-full min-w-0 flex-col overflow-hidden rounded-2xl sm:rounded-[1.35rem] ${shellClass} ${cardMin}`}
        >
          <PreviewFrame badge={badge} project={project} featured={featured} />
          <div className={`flex flex-1 flex-col px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6 ${featured ? 'lg:px-8' : ''}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">{project.category}</p>
              {project.status === 'flagship' ? (
                <span className="rounded-full border border-accent/25 bg-accent/[0.09] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-accent/95">
                  Signature
                </span>
              ) : null}
            </div>
            <h3
              id={`${id}-title`}
              className={`mt-2.5 font-display font-semibold leading-[1.15] tracking-[-0.025em] text-white ${
                featured ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
              }`}
            >
              {project.title}
            </h3>
            <p className="mt-2 text-[13px] font-medium leading-snug text-gray-300 sm:text-sm">{project.tagline}</p>
            <p className="mt-3 text-[12.5px] leading-relaxed text-gray-500 sm:text-[13px]">{briefSummary(project.cardLead)}</p>
            <p className="mt-3 font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">Role</p>
            <p className="mt-1 text-[11px] font-medium text-accent/85 sm:text-[12px]">{project.role}</p>
            <ul className="mt-3.5 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <li key={t} className="chip-project">
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-col gap-2.5 border-t border-white/[0.06] pt-4">
              <Link
                to={`/projects/${project.slug}`}
                data-cursor-hover
                title="Context, stack, workflow, and outbound links"
                className="focus-ring inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-gradient-to-r from-accent via-violet-400 to-sky-400 px-4 py-3 text-[13px] font-semibold text-zinc-950 transition duration-200 ease-out hover:opacity-95"
              >
                Case study
              </Link>
              <div className="flex flex-col gap-2 min-[420px]:flex-row">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="focus-ring inline-flex min-h-[44px] min-w-0 flex-1 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.035] px-3 py-2.5 text-[13px] font-medium text-gray-100 transition duration-200 ease-out hover:border-white/[0.14] hover:bg-white/[0.06]"
                >
                  Open live
                </a>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="focus-ring inline-flex min-h-[44px] min-w-0 flex-1 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.035] px-3 py-2.5 text-[13px] font-medium text-gray-100 transition duration-200 ease-out hover:border-white/[0.14] hover:bg-white/[0.06]"
                >
                  Source
                </a>
              </div>
            </div>
            <details className="group/details mt-5 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.025]">
              <summary className="cursor-pointer list-none px-4 py-3.5 text-[13px] font-medium text-gray-200 outline-none transition hover:bg-white/[0.04] marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex w-full items-center justify-between gap-3">
                  <span>Context · capabilities</span>
                  <span className="font-normal tabular-nums text-[11px] text-gray-500 group-open/details:text-gray-400">
                    <span className="group-open/details:hidden">Expand</span>
                    <span className="hidden group-open/details:inline">Collapse</span>
                  </span>
                </span>
              </summary>
              <div className="border-t border-white/[0.06] px-3 pb-3 pt-1">
                <BackFaceContent project={project} showFooterLinks={false} compact />
              </div>
            </details>
          </div>
        </div>
      ) : (
        <div className="w-full">{flipContent}</div>
      )}
    </motion.article>
  )
}
