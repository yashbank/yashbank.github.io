/** Resolve a path under `/public` for Vite `base` (e.g. GitHub Pages subpath). */
export function publicAssetUrl(pathFromPublicRoot: string): string {
  const base = import.meta.env.BASE_URL || '/'
  const rel = pathFromPublicRoot.replace(/^\/+/, '')
  if (base === '/') return `/${rel}`
  return `${base.replace(/\/$/, '')}/${rel}`
}
