import { useState } from 'react'

type Props = {
  src: string
  alt: string
  className?: string
  /** Hint dimensions to reduce CLS when known */
  width?: number
  height?: number
  sizes?: string
}

/** Lazy-loaded image with opacity fade-in (below-the-fold). */
export function LazyImage({ src, alt, className = '', width, height, sizes }: Props) {
  const [loaded, setLoaded] = useState(false)

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      loading="lazy"
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
    />
  )
}
