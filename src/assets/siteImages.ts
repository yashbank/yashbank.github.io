/**
 * Local photography in `/images` (repo root). Served at `/images/*` via Vite dev + build copy.
 * Naming: hero + section pairs (desktop = wide, mobile = portrait / tighter crop).
 */
export const SITE_IMAGES = {
  hero: {
    desktop: '/images/hero-desktop.jpg',
    mobile: '/images/hero-mobile.jpg',
  },
  about: {
    desktop: '/images/section-1-desktop.jpg',
    mobile: '/images/section-1-mobile.jpg',
  },
  skills: {
    desktop: '/images/section-2-desktop.jpg',
    mobile: '/images/section-2-mobile.jpg',
  },
  projects: {
    desktop: '/images/section-3-desktop.jpg',
    mobile: '/images/section-3-mobile.jpg',
  },
  experience: {
    desktop: '/images/section-4-desktop.jpg',
    mobile: '/images/section-4-mobile.jpg',
  },
  services: {
    desktop: '/images/section-5-desktop.jpg',
    mobile: '/images/section-1-mobile.jpg',
  },
  whyHire: {
    desktop: '/images/section-4-desktop.jpg',
    mobile: '/images/section-2-mobile.jpg',
  },
  contact: {
    desktop: '/images/section-2-desktop.jpg',
    mobile: '/images/hero-mobile.jpg',
  },
} as const
