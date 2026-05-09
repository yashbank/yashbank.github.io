/**
 * Section atmosphere — layered gradients only (no photo textures).
 * Keeps sections in one visual world: graphite + cool indigo pools, warm mist in light.
 */
type SectionBackdropTone = 'default' | 'stack' | 'calm'

type Props = {
  /** Slightly different radial weight for stack / calmer sections */
  tone?: SectionBackdropTone
  className?: string
}

export function SectionBackdrop({ tone = 'default', className = '' }: Props) {
  return (
    <div
      className={`section-backdrop section-backdrop--gradient section-backdrop--tone-${tone} pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <div className="section-backdrop__base absolute inset-0" />
      <div className="section-backdrop__pool absolute inset-0" />
      <div className="section-backdrop__vignette absolute inset-0" />
    </div>
  )
}
