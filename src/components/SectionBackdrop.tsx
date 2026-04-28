import type { CSSProperties } from 'react'

type Props = {
  desktop: string
  mobile: string
  /** Photo visibility 0–1 (kept low so type stays readable) */
  imageOpacity?: number
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low' | 'auto'
  /** Intrinsic hint for CLS (decorative; absolute positioned) */
  width?: number
  height?: number
  /** Extra class on the motion wrapper for group-hover zoom */
  className?: string
}

/**
 * Responsive `<picture>`: mobile src under 768px, desktop from 768px up.
 * Soft overlays + optional subtle zoom when parent has `group/section`.
 */
export function SectionBackdrop({
  desktop,
  mobile,
  imageOpacity = 0.16,
  loading = 'lazy',
  fetchPriority = 'auto',
  width = 1920,
  height = 1080,
  className = '',
}: Props) {
  const imgStyle: CSSProperties = { opacity: imageOpacity }

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <picture className="absolute inset-0 block h-full min-h-full w-full">
        <source media="(max-width: 767px)" srcSet={mobile} type="image/jpeg" />
        <source media="(min-width: 768px)" srcSet={desktop} type="image/jpeg" />
        <img
          src={desktop}
          alt=""
          width={width}
          height={height}
          loading={loading}
          fetchPriority={fetchPriority}
          decoding="async"
          sizes="100vw"
          style={imgStyle}
          className="absolute inset-0 h-full min-h-full w-full object-cover object-center transition-[transform,opacity] duration-[1.35s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/section:scale-[1.035]"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-b from-surface/88 via-surface/72 to-surface/90" />
      <div className="absolute inset-0 bg-gradient-to-tr from-accent/[0.04] via-transparent to-vermillion/[0.03]" />
      <div className="absolute inset-0 backdrop-blur-[2px]" />
    </div>
  )
}
