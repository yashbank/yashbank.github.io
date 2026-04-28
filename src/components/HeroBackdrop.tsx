import { SITE_IMAGES } from '@/assets/siteImages'

/** LCP-friendly hero photo: wide on md+, portrait crop on small screens. */
export function HeroBackdrop() {
  const { desktop, mobile } = SITE_IMAGES.hero

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <picture className="absolute inset-0 block h-full min-h-[100svh] w-full">
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
          className="absolute inset-0 h-full min-h-[100svh] w-full object-cover object-[center_22%] opacity-[0.22] transition-[transform,opacity] duration-[1.6s] ease-[cubic-bezier(0.22,1,0.36,1)] md:object-center md:opacity-[0.18] group-hover/hero:scale-[1.028]"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/85 to-surface" />
      <div className="absolute inset-0 bg-gradient-to-tr from-accent/[0.07] via-transparent to-vermillion/[0.05]" />
      <div className="absolute inset-0 backdrop-blur-[1px] md:backdrop-blur-0" />
    </div>
  )
}
