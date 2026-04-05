import { useState } from 'react'

type Props = {
  src: string
  alt: string
  className?: string
}

/** Lazy-loaded image with blur-up placeholder. */
export function LazyImage({ src, alt, className = '' }: Props) {
  const [loaded, setLoaded] = useState(false)

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
    />
  )
}
