/**
 * Structured portfolio projects — single source for cards, archive, and /projects/:slug pages.
 */

export type ProjectStatus = 'flagship' | 'production' | 'archive'

export type PreviewMode = 'placeholder' | 'image'

export type ProjectDetailSection = {
  id: string
  title: string
  body: string
}

export type PortfolioProject = {
  slug: string
  title: string
  category: string
  tagline: string
  /** Short line on the card front; full story is `summary` on the case study page */
  cardLead: string
  summary: string
  role: string
  problem: string
  solution: string
  keyFeatures: readonly string[]
  highlights: readonly string[]
  tech: readonly string[]
  liveUrl: string
  repoUrl: string
  status: ProjectStatus
  previewLabel: string
  /** Path under `public/` when `previewMode` is `image`, e.g. `projects/clinq-cover.png` */
  imageSrc?: string
  imageAlt?: string
  /** CSS `object-position` for card `object-cover` and detail `object-contain` previews */
  previewImageObjectPosition?: string
  detailSections: readonly ProjectDetailSection[]
  workflowHowItWorks?: string
  featured: boolean
  archive: boolean
  themeAccent: 'violet' | 'sky' | 'emerald' | 'rose' | 'neutral'
  previewMode: PreviewMode
}

const clinq: PortfolioProject = {
  slug: 'clinq',
  title: 'Clinq',
  category: 'SaaS / AI workflow platform',
  tagline: 'AI operating system for freelancers',
  cardLead:
    'Lead scoring, proposals, pipeline, analytics, and client context — one workspace built for solo operators.',
  summary:
    'Clinq consolidates triage, drafting, pipeline, analytics, and client memory so freelancers stop context-switching across tabs. AI assists behind explicit approval — nothing client-facing ships without a human check.',
  role: 'Product direction, UI/UX, full-stack implementation, workflow and data model',
  problem:
    'Leads and drafts live in separate tools — weak signal at triage, slow proposal turnaround, follow-ups drop when the queue spikes.',
  solution:
    'A single surface for triage → draft → pipeline → review, with Supabase-backed state and guarded LLM steps so automation never bypasses approval.',
  keyFeatures: [
    'Lead scoring and enrichment',
    'Proposal studio with client-aware drafts',
    'Pipeline stages and reminders',
    'Lightweight analytics',
    'Persistent client context',
    'Explicit approval on outbound AI',
  ],
  highlights: [
    'Production UI with disciplined motion',
    'End-to-end freelancer workflow in one app',
    'Next.js, Supabase, OpenAI with guardrails',
  ],
  tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'OpenAI API', 'Vercel'],
  liveUrl: 'https://clinq-delta.vercel.app/',
  repoUrl: 'https://github.com/yashbank/Clinq',
  status: 'flagship',
  previewLabel: 'Live product preview',
  imageSrc: 'projects/clinq-cover.png',
  imageAlt: 'Clinq site — hero, navigation, and primary call to action',
  previewImageObjectPosition: 'center 6%',
  themeAccent: 'violet',
  previewMode: 'image',
  featured: true,
  archive: false,
  workflowHowItWorks:
    'Triage enriches leads, the proposal studio pulls client context, pipeline keeps next actions visible, and any outbound AI requires an explicit approve step.',
  detailSections: [
    {
      id: 'positioning',
      title: 'Go-to-market alignment',
      body: 'Marketing and product UI share one visual system so the live app matches what prospects see before signup.',
    },
    {
      id: 'delivery',
      title: 'Stack and delivery model',
      body: 'Strictly typed Next.js, Supabase for auth and data, OpenAI only behind gated actions, Vercel for deploy — sized for iterative shipping with a small surface area.',
    },
  ],
}

const sarthak: PortfolioProject = {
  slug: 'sarthak-bankar-portfolio',
  title: 'Sarthak Bankar Portfolio',
  category: 'Premium portfolio / case-study website',
  tagline: 'Interactive portfolio for a level designer',
  cardLead:
    'Spatial work, process, and case studies in a motion-led layout — hierarchy first, not decoration.',
  summary:
    'Custom portfolio for a level designer: hero and featured work up front, case studies with enough depth for reviewers, motion used only to clarify reading order.',
  role: 'Creative direction, front-end architecture, IA, motion, case-study layout',
  problem:
    'Generic templates bury process — art-direction and level design need to read fast for recruiters and deep for reviewers.',
  solution:
    'A fixed IA (about → work → contact) with case-study pages that pair type, spacing, and restrained motion so diagrams and process stay legible.',
  keyFeatures: [
    'Hero and featured-work entry',
    'Dedicated case-study routes',
    'Typography-led longform',
    'Stack section with refined tool emphasis',
    'Framer Motion for hierarchy only',
    'GitHub Pages–friendly static deploy',
  ],
  highlights: [
    'Creative brief executed end to end',
    'Motion tied to scan path, not spectacle',
    'Shows premium portfolio delivery for peers',
  ],
  tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GitHub Pages'],
  liveUrl: 'https://sarthakbank.github.io/',
  repoUrl: 'https://github.com/Sarthakbank/sarthakbank.github.io',
  status: 'flagship',
  previewLabel: 'Case-study preview',
  imageSrc: 'projects/sarthak-portfolio-cover.png',
  imageAlt: 'Sarthak Bankar portfolio site — hero, featured work, and layout',
  previewImageObjectPosition: '42% 14%',
  themeAccent: 'sky',
  previewMode: 'image',
  featured: true,
  archive: false,
  workflowHowItWorks:
    'Landing prioritizes identity and featured pieces; case studies load detail on demand. Motion marks section changes, not every paragraph.',
  detailSections: [
    {
      id: 'craft',
      title: 'Craft and narrative',
      body: 'Type scale and rhythm are tuned so screenshots, diagrams, and process copy feel authored — not bolted onto a template.',
    },
    {
      id: 'outcome',
      title: 'Dual audience',
      body: 'Shallow path for quick recruiter scans; deeper path for reviewers who care about process — both stay intentional.',
    },
  ],
}

const starHealth: PortfolioProject = {
  slug: 'star-health-insurance-crm',
  title: 'Star Health Insurance CRM',
  category: 'Internal tool / CRM',
  tagline: 'Full-stack CRM for insurance operations',
  cardLead:
    'React, Express, and PostgreSQL: leads through claims with role-scoped dashboards in one internal app.',
  summary:
    'Internal CRM wiring lead intake through customer records, policy lifecycle, renewals, and claims with JWT-scoped views and Recharts-backed operational summaries.',
  role: 'Full-stack implementation (React, Express, PostgreSQL, auth)',
  problem:
    'Ops teams lose time when leads, customer files, policy state, renewals, and claims live in disconnected spreadsheets and inboxes.',
  solution:
    'One authenticated app with shared models and dashboards so daily reviews happen against a single system of record.',
  keyFeatures: ['Lead pipeline', 'Customer profiles', 'Policies / renewals / claims', 'Role-based dashboards'],
  highlights: [
    'Operational workflow design',
    'Business-use internal dashboard structure',
  ],
  tech: ['React', 'Vite', 'Tailwind CSS', 'Express', 'PostgreSQL', 'JWT', 'Recharts'],
  liveUrl: 'https://frontend-red-omega-34.vercel.app/',
  repoUrl: 'https://github.com/yashbank/Star_Health_Insurance_CRM',
  status: 'production',
  previewLabel: 'CRM preview',
  imageSrc: 'projects/star-health-insurance-crm.png',
  imageAlt: 'Star Health Insurance CRM — dashboard and operational views',
  previewImageObjectPosition: '50% 8%',
  themeAccent: 'emerald',
  previewMode: 'image',
  featured: false,
  archive: false,
  workflowHowItWorks:
    'Users move from role-aware dashboards into customer and policy records, then through claims stages with reporting suited to weekly operational reviews.',
  detailSections: [
    {
      id: 'stack',
      title: 'Technical approach',
      body: 'React with Vite on the client, Express with JWT for access control, PostgreSQL as the system of record, Recharts for operational metrics.',
    },
  ],
}

const hiredLens: PortfolioProject = {
  slug: 'hiredlens',
  title: 'HiredLens',
  category: 'AI career workspace',
  tagline: 'Resume analysis and interview-prep workspace',
  cardLead:
    'ATS-style scoring, gap analysis, rewrites, roadmap, and interview prep in one Next.js workspace.',
  summary:
    'Guided career workspace: structured resume scoring, keyword coverage vs job descriptions, rewrite prompts, skill roadmap, and prep modules with shadcn/ui for dense, accessible UI.',
  role: 'Product UI, client implementation, prompt and flow wiring',
  problem:
    'Feedback is fragmented across free tools, docs, and chat — hard to see what to fix first or how it maps to interviews.',
  solution:
    'One interface that moves from score → gaps → edits → prep with a single next action per step.',
  keyFeatures: [
    'Resume scoring',
    'Keyword gap detection',
    'Rewrite suggestions',
    'Skill roadmap',
    'Q&A prep',
    'Mock interview flow',
  ],
  highlights: [
    'AI-assisted workflow product thinking',
    'Career-tool UX with guided improvement flow',
  ],
  tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Vercel'],
  liveUrl: 'https://hiredlens.vercel.app/',
  repoUrl: 'https://github.com/yashbank/HiredLens',
  status: 'production',
  previewLabel: 'Workspace preview',
  imageSrc: 'projects/hiredlens-career-workspace.png',
  imageAlt: 'HiredLens — career workspace with resume and prep modules',
  previewImageObjectPosition: '50% 6%',
  themeAccent: 'violet',
  previewMode: 'image',
  featured: false,
  archive: false,
  workflowHowItWorks:
    'Upload a resume, review structured scoring and gaps, then step through rewrites and prep modules with one clear next action at a time.',
  detailSections: [
    {
      id: 'product',
      title: 'Product shape',
      body: 'shadcn/ui primitives keep density and accessibility consistent; secondary analysis stays behind disclosure where it helps.',
    },
  ],
}

const wishKart: PortfolioProject = {
  slug: 'wishkart',
  title: 'WishKart',
  category: 'E-commerce / social commerce',
  tagline: 'Social-commerce team project',
  cardLead:
    'MERN social-commerce build: authentication, product management, and real-time style interactions—archive entry for team collaboration.',
  summary:
    'A MERN-based social commerce project featuring authentication, product management, and real-time interactions.',
  role: 'Team project contribution',
  problem:
    'Early team builds need clear scope and ownership so reviewers can see what shipped and how integration was handled.',
  solution:
    'Focused slices on auth, catalogue, and client–server boundaries with a predictable Git rhythm for the shared codebase.',
  keyFeatures: ['Authentication', 'Product management', 'Social commerce interaction'],
  highlights: ['Team collaboration on a shared MERN codebase', 'Transparent archive entry beside production work'],
  tech: ['React', 'Node.js', 'MongoDB'],
  liveUrl: 'https://wishkart.vercel.app/',
  repoUrl: 'https://github.com/Rajendra3049/Wishkart_Social-Commerce-Enterprise-/tree/main/wish-kart',
  status: 'archive',
  previewLabel: 'Product preview',
  imageSrc: 'projects/Wishkart.png',
  imageAlt: 'WishKart social-commerce interface',
  previewImageObjectPosition: '50% 12%',
  themeAccent: 'neutral',
  previewMode: 'image',
  featured: false,
  archive: true,
  detailSections: [
    {
      id: 'context',
      title: 'Context',
      body: 'Archive project documenting fundamentals and collaboration—not positioned as a consumer launch.',
    },
  ],
}

const liciousClone: PortfolioProject = {
  slug: 'licious-clone',
  title: 'Licious Clone',
  category: 'E-commerce UI build',
  tagline: 'Responsive ordering experience',
  cardLead:
    'Responsive listing, cart, and ordering UX in HTML, CSS, and JavaScript—archive exercise for layout fundamentals.',
  summary:
    'A responsive e-commerce build focused on product listing, cart flow, and ordering UX.',
  role: 'Frontend implementation',
  problem:
    'Ordering flows need clear hierarchy and tap-friendly layouts before framework abstractions hide structure.',
  solution:
    'Modular markup and restrained styling so cart and checkout-style steps stay readable on small screens.',
  keyFeatures: ['Product listing', 'Cart flow', 'Responsive UI'],
  highlights: ['Fundamentals-first archive entry', 'Honest scope next to production builds'],
  tech: ['HTML', 'CSS', 'JavaScript'],
  liveUrl: 'https://spectacular-licorice-cea5d3.netlify.app/',
  repoUrl: 'https://github.com/yashbank/Licious---CLONE/tree/main/licious',
  status: 'archive',
  previewLabel: 'UI preview',
  imageSrc: 'projects/Licious.png',
  imageAlt: 'Licious clone — product listing and ordering experience',
  previewImageObjectPosition: '50% 10%',
  themeAccent: 'neutral',
  previewMode: 'image',
  featured: false,
  archive: true,
  detailSections: [
    {
      id: 'context',
      title: 'Context',
      body: 'Archive UI exercise kept for transparency alongside production-grade work.',
    },
  ],
}


const plantpulse: PortfolioProject = {
  slug: 'plantpulse',
  title: 'PlantPulse',
  category: 'Factory operations platform',
  tagline: 'One pulse for your whole plant',
  cardLead:
    'QR-kiosk attendance on an offline-first Android tablet, plus payroll, shifts, inventory, production and QC, built for a 300+ employee paper plant.',
  summary:
    'PlantPulse replaces paper registers and scattered spreadsheets with one role-aware system: punch in at the gate, payroll at month end, stock and production in between, and quality problems visible the same day.',
  role: 'Solo developer: web platform, database design, auth and roles, Android kiosk, testing and go-live',
  problem:
    'Attendance was hand-marked, payroll recomputed monthly, and stock, production and quality lived in different files, so problems surfaced late.',
  solution:
    'A Next.js platform with a thin API over permission-gated, audit-logged server modules, and a Kotlin kiosk that queues punches offline and syncs them with idempotency keys.',
  keyFeatures: [
    'QR-badge attendance on a paired kiosk, with offline queue',
    'Payroll periods, payslips, wage types, overtime and advances',
    'Shifts, rosters, leave and handover',
    'Inventory: purchase orders, goods receipt, pick lists, stock ledger',
    'Production logs, bill of materials and QC checks',
    '8 roles, with wages visible to the owner only',
    'Full audit log, TOTP MFA and owner-only backup-then-reset',
  ],
  highlights: [
    '74 data models and 107 pages',
    '534 test files, including a per-role permission matrix',
    'Offline punches replay safely: idempotent, never double-counted',
    'Money computed on the server, never in the browser',
  ],
  tech: ['Next.js', 'React', 'TypeScript', 'Prisma', 'Supabase', 'Kotlin', 'Jetpack Compose', 'Room'],
  liveUrl: 'https://github.com/yashbank/plantpulse',
  repoUrl: 'https://github.com/yashbank/plantpulse',
  status: 'flagship',
  previewLabel: 'Owner dashboard design',
  imageSrc: 'projects/plantpulse-dashboard.png',
  imageAlt: 'PlantPulse owner dashboard: output against plan, wastage by phase, orders in flight',
  previewImageObjectPosition: 'center 0%',
  themeAccent: 'sky',
  previewMode: 'image',
  featured: true,
  archive: false,
  workflowHowItWorks:
    'A worker taps a QR badge at the kiosk. The punch is stored locally, synced with an idempotency key, and feeds attendance, then payroll and reports on the web platform.',
  detailSections: [
    {
      id: 'reliability',
      title: 'Built for a flaky factory network',
      body: 'Kiosk punches are queued in a local database and replayed with idempotency keys, so a dropped connection never loses or duplicates a punch. Tablets pair once with a hashed, one-time device token.',
    },
    {
      id: 'governance',
      title: 'Access and audit',
      body: 'Every server function starts with a permission gate and logs mutations. Eight roles see exactly what their job needs; wage data never reaches non-owner surfaces.',
    },
  ],
}

const codekraft: PortfolioProject = {
  slug: 'codekraft',
  title: 'CodeKraft',
  category: 'Studio site and product marketplace',
  tagline: 'A software studio with a real finance engine',
  cardLead:
    'Storefront, customer portal and an admin command centre: payments, an append-only ledger, approvals and an AI assistant.',
  summary:
    'CodeKraft, a product by Crestline Technologies, is a white-label studio website and digital-product marketplace. It replaces spreadsheets, chat threads and manual payment checks with one system, specified end to end and then hardened for production.',
  role: 'Product, architecture, full-stack build with AI agents, production hardening and deployment',
  problem:
    'Small studios run sales, delivery and finance across disconnected tools, so payments, licences and approvals depend on people remembering.',
  solution:
    'A modular Next.js application with a domain layer for finance, payments, orders, entitlements and approvals, plus a customer portal and an admin command centre.',
  keyFeatures: [
    'Product catalog, blog, SEO and a live theme studio',
    'Customer portal: orders, downloads, licences and invoices',
    'Razorpay checkout and webhooks, coupons, quotes and multi-currency',
    'Append-only finance ledger and partner allocations',
    '22-widget admin dashboard, leads and follow-ups',
    'Second-approval on sensitive actions, audit log and feature flags',
    'Built-in AI assistant',
  ],
  highlights: [
    '147 pages, 26 API routes, 540+ test files',
    'CI with lint, typecheck, unit, integration, Playwright and Lighthouse',
    'Coverage thresholds enforced per module',
    'Spec-first: 61 diagrams and a decision log',
  ],
  tech: ['Next.js', 'React', 'TypeScript', 'Drizzle', 'Neon Postgres', 'Better Auth', 'Razorpay', 'Sentry'],
  liveUrl: 'https://crestlinetechnologies.in',
  repoUrl: 'https://github.com/yashbank/CodeKraft',
  status: 'flagship',
  previewLabel: 'Live product preview',
  imageSrc: 'projects/codekraft-cover.png',
  imageAlt: 'CodeKraft by Crestline Technologies: studio homepage',
  previewImageObjectPosition: 'center 0%',
  themeAccent: 'violet',
  previewMode: 'image',
  featured: true,
  archive: false,
  workflowHowItWorks:
    'Customers browse and pay through the storefront; orders, entitlements and invoices flow into the portal, while money-moving actions pass through approvals into an append-only ledger.',
  detailSections: [
    {
      id: 'method',
      title: 'Spec first, agents second',
      body: 'Every decision is logged and every screen has a specification. Work ran in dependency-ordered phases with tests gating each one, using AI agents under human-owned architecture and review.',
    },
  ],
}

const tradeflow: PortfolioProject = {
  slug: 'tradeflow',
  title: 'TradeFlow',
  category: 'Field-service SaaS',
  tagline: 'Quote to paid invoice, without retyping',
  cardLead:
    'Operating system for skilled-trade businesses: smart quotes, dispatch, a technician hub and one-click invoicing with online payment.',
  summary:
    'TradeFlow takes a customer from the first call to a paid invoice on any device, with presets for plumbing, HVAC, electrical, roofing and general contracting.',
  role: 'Product direction and full-stack implementation',
  problem:
    'Trade businesses retype the same details into quotes, job sheets and invoices, and chase payments for weeks.',
  solution:
    'One pipeline with live status across quote, job and invoice, an AI estimator, a field technician hub, and Stripe-powered online payment on an exact, integer-based money engine.',
  keyFeatures: [
    'Smart quotes: trade presets and an AI estimator',
    'Technician hub: photos, signature pad, parts on the fly',
    'One-click invoicing with Stripe payment links',
    'Five trade presets in one app',
    'Bring-your-own OpenAI, Resend and Stripe keys',
  ],
  highlights: ['Integer-based money engine', 'Supabase with row-level security', 'Full product docs: PRD, SRS, schema, security'],
  tech: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Stripe', 'OpenAI', 'Tailwind CSS'],
  liveUrl: 'https://tradeflow-cyan-nu.vercel.app',
  repoUrl: 'https://github.com/yashbank/TradeFlow',
  status: 'production',
  previewLabel: 'Live product preview',
  imageSrc: 'projects/tradeflow-cover.png',
  imageAlt: 'TradeFlow landing page: dispatch and invoicing for trade businesses',
  previewImageObjectPosition: 'center 0%',
  themeAccent: 'rose',
  previewMode: 'image',
  featured: true,
  archive: false,
  workflowHowItWorks:
    'A call becomes a quote, the quote becomes a dispatched job, field work adds photos and parts, and the finished job becomes an invoice the customer can pay online.',
  detailSections: [
    {
      id: 'money',
      title: 'Exact money',
      body: 'Taxes, discounts, line items and partial payments run on an integer-based calculation engine, so totals never drift by a cent.',
    },
  ],
}

/** Canonical order for navigation and prev/next */
export const ALL_PROJECTS: readonly PortfolioProject[] = [
  plantpulse,
  codekraft,
  tradeflow,
  clinq,
  sarthak,
  starHealth,
  hiredLens,
  wishKart,
  liciousClone,
]

export const SELECTED_PROJECTS = ALL_PROJECTS.filter((p) => !p.archive)

export const ARCHIVE_PROJECTS = ALL_PROJECTS.filter((p) => p.archive)

export function getProjectBySlug(slug: string | undefined): PortfolioProject | undefined {
  if (!slug) return undefined
  return ALL_PROJECTS.find((p) => p.slug === slug)
}

export function getAdjacentProjects(slug: string): {
  prev: PortfolioProject | undefined
  next: PortfolioProject | undefined
} {
  const i = ALL_PROJECTS.findIndex((p) => p.slug === slug)
  if (i < 0) return { prev: undefined, next: undefined }
  return {
    prev: i > 0 ? ALL_PROJECTS[i - 1] : undefined,
    next: i < ALL_PROJECTS.length - 1 ? ALL_PROJECTS[i + 1] : undefined,
  }
}

/** Card flip back — avoids repeating the front `cardLead` / `summary` */
export function getCardFlipBack(project: PortfolioProject) {
  return {
    solution: project.solution,
    keyFeatures: project.keyFeatures,
    problemAudience: project.problem,
  }
}

export type CardFlipBack = ReturnType<typeof getCardFlipBack>

export function hasScreenshotPreview(project: PortfolioProject): boolean {
  return (
    project.previewMode === 'image' &&
    Boolean(project.imageSrc?.trim()) &&
    Boolean(project.imageAlt?.trim())
  )
}
