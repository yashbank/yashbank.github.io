/** Site copy — Yash Bankar portfolio */

export const SITE = {
  name: 'Yash Bankar',
  title: 'AI-native product engineer',
  tagline:
    'Factory platforms, marketplaces, SaaS and practical AI workflows, built end to end with the finish of fine craft.',
  email: 'yashbank2002@gmail.com',
  phone: '+91 93566 23153',
  phoneTel: '+919356623153',
  whatsapp: '+91 93566 23153',
  whatsappLink: 'https://wa.me/919356623153',
  location: 'Maharashtra, India',
  /** When set, Navbar shows Resume (file must exist under `public/`). Omit until the PDF is added. */
  resumePath: null as string | null,
  portfolioUrl: 'https://yashbank.github.io/',
  social: {
    github: 'https://github.com/yashbank',
    linkedin: 'https://www.linkedin.com/in/yash-bankar-9249531aa/',
  },
} as const

export const HERO = {
  headline: 'Full-stack product work you can stand behind with customers.',
  subhead:
    'Websites, SaaS MVPs, internal tools, and measured AI — clear UI, solid engineering, and delivery that holds up in review.',
  trustLine:
    'Full-stack at Iauro (finance); earlier Accenture on a UK telecom programme. 30+ freelance engagements across India, the GCC, and the US — remote-first.',
  availabilityPill: 'Taking select freelance work',
} as const

/** Hero right panel — capability card copy (not a dashboard). */
export const HERO_FOCAL = {
  label: 'Engagement model',
  title: 'Design through build — one owner end to end.',
  micro:
    'One thread from UI to APIs to deploy so the shipped product matches the pitch and the real user path.',
  proof: 'Finance · UK telecom programme · Cross-region freelance',
  chips: ['Websites', 'SaaS MVPs', 'Internal tools', 'AI workflows'] as const,
} as const

/** Short positioning used in proof section intro */
export const PROOF_INTRO =
  'Full-stack engineer with product judgement: tight scoping, steady delivery, UI that respects the brand. Today: Yes Bank Securities at Iauro. Earlier: packaged delivery for Virgin Media O2 with Accenture.'

/** Footer & nav — only list links you use */
export const SOCIAL_LINKS = [
  { label: 'GitHub', href: SITE.social.github },
  { label: 'LinkedIn', href: SITE.social.linkedin },
] as const

export const TECH_STACK_SECTION = {
  eyebrow: 'Stack',
  title: 'Tools behind the work',
  subtitle: 'One edge-to-edge strip — proximity lifts what matters; the rest stays quiet.',
} as const

export type ExperienceItem = {
  role: string
  company: string
  label: string
  summary: string
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'Founder & Lead Developer',
    company: 'Crestline Technologies',
    label: 'Product studio · independent',
    summary:
      'A small product studio that builds and sells its own software. I architect and ship the platforms: CodeKraft, a studio marketplace with a finance engine, and PlantPulse, a factory operations platform with an offline-first Android kiosk.',
  },
  {
    role: 'Software Engineer · Full Stack',
    company: 'Iauro Systems',
    label: 'Finance · delivery',
    summary:
      'Building and maintaining features for Yes Bank Securities — reliable APIs, careful UI work alongside product stakeholders, and ownership through release.',
  },
  {
    role: 'Packaged Application Development Associate',
    company: 'Accenture',
    label: 'Telecom · scale',
    summary:
      'Virgin Media O2 programme: internal tools in React with Node/Express services, GCP validation workflows, and Airflow monitoring. Work tied to roughly 20% faster validation cycles, 99% data accuracy on supported pipelines, and about 25% less manual effort on the flows I owned.',
  },
  {
    role: 'Full Stack Web Development (certification)',
    company: 'Masai School, Bangalore',
    label: 'Intensive MERN foundation',
    summary:
      'Structured full-stack training with sustained delivery cadence — solo and team projects, code review habits, and communication practice that still shapes how I work with clients.',
  },
]

export const SERVICES = [
  {
    title: 'Premium websites',
    description:
      'Marketing and portfolio experiences with restrained motion, sharp typography, and performance budgets that stay fast on real devices.',
  },
  {
    title: 'SaaS MVPs & dashboards',
    description:
      'Auth, data models, admin consoles, and customer-facing flows — scoped so you can validate the market without rebuilding from scratch.',
  },
  {
    title: 'Internal tools & admin systems',
    description:
      'Operator-friendly interfaces on top of your existing data and APIs — fewer spreadsheets, clearer permissions, safer workflows.',
  },
  {
    title: 'AI-assisted workflows',
    description:
      'Practical integrations: drafting, classification, retrieval, and automation behind review — designed so teams stay in control.',
  },
] as const

export const PROCESS = [
  {
    title: 'Clarity before code',
    body: 'Short discovery on goals, constraints, and success criteria — so estimates reflect reality and the UI matches how you sell.',
  },
  {
    title: 'Ship in visible slices',
    body: 'Incremental delivery you can review in the browser — less risk than big-bang handovers, easier to align with stakeholders.',
  },
  {
    title: 'Enterprise-grade habits',
    body: 'Finance and telecom backgrounds mean I default to sensible error handling, logging discipline, and communication that survives audits and launches.',
  },
  {
    title: 'Global freelance execution',
    body: '30+ delivered engagements across Asia, the GCC, and the US — async-friendly, direct updates, and scope you can trust.',
  },
] as const
