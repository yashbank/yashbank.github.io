import { lazy, Suspense } from 'react'
import { SITE_IMAGES } from '@/assets/siteImages'

const HeroBackground3D = lazy(() =>
  import('@/components/HeroBackground3D').then((m) => ({ default: m.HeroBackground3D })),
)

/**
 * Hero depth stack (bottom → top): soft photo → atmospheric mist → 3D → graded scrims.
 * Keeps structure; reduces flat “panel” read by grading scrims in CSS (`index.css`).
 */
export function HeroBackdrop() {
  const { desktop, mobile } = SITE_IMAGES.hero

  return (
    <div className="hero-backdrop pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <picture className="absolute inset-0 z-0 block h-full min-h-[100svh] w-full">
        <source media="(max-width: 767px)" srcSet={mobile} type="image/jpeg" />
        <source media="(min-width: 768px)" srcSet={desktop} type="image/jpeg" />
        <img
          src={desktop}
          alt=""
          width={1920}
          height={1080}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          sizes="100vw"
          className="hero-backdrop-photo absolute inset-0 h-full min-h-[100svh] w-full scale-[1.02] object-cover object-[center_22%] opacity-[0.17] transition-opacity duration-700 ease-out md:object-center md:opacity-[0.15]"
        />
      </picture>
      <div className="hero-backdrop-atmosphere absolute inset-0 z-[1]" />
      <Suspense fallback={null}>
        <HeroBackground3D />
      </Suspense>
      <div className="hero-backdrop-scrim hero-backdrop-scrim-a absolute inset-0 z-[3]" />
      <div className="hero-backdrop-scrim hero-backdrop-scrim-b absolute inset-0 z-[3]" />
      <div className="hero-backdrop-scrim hero-backdrop-scrim-c absolute inset-0 z-[3]" />
      <div
        className="hero-backdrop-rim pointer-events-none absolute inset-x-0 top-0 z-[3] h-[min(42vh,28rem)] bg-gradient-to-b from-white/[0.055] via-transparent to-transparent opacity-75"
        aria-hidden
      />
      <div
        className="hero-backdrop-floor pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[34%] bg-gradient-to-t from-[#06070d]/72 via-[#06070d]/22 to-transparent"
        aria-hidden
      />
      <div className="hero-backdrop-vignette pointer-events-none absolute inset-0 z-[3]" aria-hidden />
    </div>
  )
}
