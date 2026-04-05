/** Site copy — Yash Bankar portfolio */

export const SITE = {
  name: 'Yash Bankar',
  title: 'Full Stack Developer',
  tagline:
    'MERN-focused engineer with product experience at Accenture and Iauro — shipping for telecom, finance, and clients across Asia, the UAE, and the US.',
  email: 'yashbank2002@gmail.com',
  phone: '+91 93566 2313',
  phoneTel: '+91935662313',
  whatsapp: '+91 93566 2313',
  whatsappLink: 'https://wa.me/91935662313',
  location: 'Maharashtra, India',
  birthYear: 2002,
  resumePath: '/Yash_Bankar_Resume.pdf',
  portfolioUrl: 'https://yashbank.github.io/',
  social: {
    github: 'https://github.com/yashbank',
    linkedin: 'https://www.linkedin.com/in/yash-bankar-9249531aa/',
  },
} as const

/** Footer & nav — only list links you use */
export const SOCIAL_LINKS = [
  { label: 'GitHub', href: SITE.social.github },
  { label: 'LinkedIn', href: SITE.social.linkedin },
] as const

export const ABOUT = {
  paragraphs: [
    'I’m Yash Bankar — born in 2002, with a strong academic record since school. I completed 12th from Deogiri College, Aurangabad, and graduated with a BSc in Information Technology in 2023 (distinction, zero backlogs). I then earned my Full Stack Web Developer certification from Masai School, Bangalore: an intensive programme (11-hour days, six days a week) covering the MERN stack in depth, plus behavioural and communication skills.',
    'I’ve built multiple solo and team projects, thrive in high-pressure and remote settings, and enjoy collaborating as much as owning problems end-to-end. I’m dedicated, a practical problem-solver, and I care about clear communication and solid fundamentals. Alongside full-time roles, I’ve freelanced across stacks — delivering 30+ successful projects for clients in Asia, the UAE, and the US.',
  ],
}

export type SkillItem = {
  /** Key for `TechIcon` — see `src/components/TechIcon.tsx` */
  icon: string
  label: string
}

export const SKILL_CATEGORIES: readonly { title: string; skills: readonly SkillItem[] }[] = [
  {
    title: 'MERN & web',
    skills: [
      { icon: 'mongodb', label: 'MongoDB' },
      { icon: 'express', label: 'Express' },
      { icon: 'react', label: 'React' },
      { icon: 'nodedotjs', label: 'Node.js' },
      { icon: 'javascript', label: 'JavaScript' },
      { icon: 'html5', label: 'HTML5' },
      { icon: 'css3', label: 'CSS3' },
      { icon: 'openapi', label: 'REST APIs' },
      { icon: 'postgresql', label: 'SQL' },
      { icon: 'git', label: 'Git' },
      { icon: 'github', label: 'GitHub' },
    ],
  },
  {
    title: 'Languages & more',
    skills: [
      { icon: 'python', label: 'Python' },
      { icon: 'java', label: 'Java' },
      { icon: 'typescript', label: 'TypeScript' },
      { icon: 'githubactions', label: 'Automation & CI' },
      { icon: 'openai', label: 'ChatGPT & AI APIs' },
      { icon: 'anthropic', label: 'Claude' },
      { icon: 'vscodium', label: 'Cursor / VS Code' },
    ],
  },
  {
    title: 'Cloud · DevOps · tools',
    skills: [
      { icon: 'aws', label: 'AWS' },
      { icon: 'gcp', label: 'GCP' },
      { icon: 'netlify', label: 'Netlify' },
      { icon: 'vercel', label: 'Vercel' },
      { icon: 'postman', label: 'Postman' },
      { icon: 'docker', label: 'Docker' },
      { icon: 'slack', label: 'Team collaboration' },
    ],
  },
] as const

export type ProjectTier = 'production' | 'build'

export type ProjectItem = {
  id: string
  title: string
  description: string
  image: string
  tech: string[]
  liveUrl: string
  repoUrl: string
  /** production = live Vercel products; build = strong clone / team work */
  tier: ProjectTier
}

/** Four projects: two shipped products + two best earlier builds */
export const PROJECTS: ProjectItem[] = [
  {
    id: 'ai-task-workflow',
    title: 'AI Task & Workflow Manager',
    description:
      'Full-stack productivity app: dashboard insights, task CRUD, drag-and-drop Kanban, and optional AI-assisted suggestions. Next.js 14, Prisma, PostgreSQL, NextAuth, OpenAI — production-ready; public demo is UI-forward for portfolio hosting.',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80',
    tech: ['Next.js 14', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind', 'OpenAI'],
    liveUrl: 'https://ai-task-workflow-manager-gamma.vercel.app/',
    repoUrl: 'https://github.com/yashbank/ai-task-workflow-manager',
    tier: 'production',
  },
  {
    id: 'saas-admin-dashboard',
    title: 'SaaS Admin Dashboard',
    description:
      'Admin-style dashboard for SaaS metrics, users, and configuration — polished tables, charts, and layout patterns suited to real product work. Deployed on Vercel with a clean, responsive UI.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'Vercel', 'React', 'Charts'],
    liveUrl: 'https://saas-admin-dashboard-sepia.vercel.app/',
    repoUrl: 'https://github.com/yashbank/saas-admin-dashboard',
    tier: 'production',
  },
  {
    id: 'wishkart',
    title: 'Wishkart (Meesho-style clone)',
    description:
      'Team project cloning core Meesho flows — lifestyle products, cart, and checkout — strong UI parity, collaboration, and JavaScript fundamentals.',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80',
    tech: ['React', 'JavaScript', 'Node', 'MongoDB', 'Team'],
    liveUrl: 'https://github.com/yashbank/Wishkart--CLONE',
    repoUrl: 'https://github.com/yashbank/Wishkart--CLONE',
    tier: 'build',
  },
  {
    id: 'licious',
    title: 'Licious-style experience',
    description:
      'Ordering and delivery UX for fresh products — fast flows, clear CTAs, and a smooth customer journey built with the MERN mindset.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
    tech: ['JavaScript', 'MERN', 'E-commerce', 'REST'],
    liveUrl: 'https://github.com/yashbank/Licious---CLONE',
    repoUrl: 'https://github.com/yashbank/Licious---CLONE',
    tier: 'build',
  },
]

export type ExperienceItem = {
  role: string
  company: string
  period: string
  summary: string
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'Software Engineer · Full Stack Developer',
    company: 'Iauro Systems',
    period: '2024 — Present',
    summary:
      'Building and maintaining features for the Yes Bank Securities domain (finance, stocks). Working across the stack with a focus on reliable delivery, clear APIs, and collaboration with product and stakeholders.',
  },
  {
    role: 'Packaged Application Development Associate',
    company: 'Accenture',
    period: '2023 — 2024',
    summary:
      'Joined right after college. Delivered work for a UK telecom client (Virgin Media): packaged applications, integration touchpoints, and disciplined engineering in a large delivery environment.',
  },
  {
    role: 'Full Stack Web Development (certification)',
    company: 'Masai School, Bangalore',
    period: '2023',
    summary:
      'Intensive MERN training (long hours, six days a week) with in-depth stack knowledge plus structured training on communication and professional behaviour — solo and team projects throughout.',
  },
]

export const SERVICES = [
  {
    title: 'Full stack web development',
    description:
      'MERN and Node/Express backends, React frontends, MongoDB/SQL data layers — from MVPs to production fixes.',
  },
  {
    title: 'Bug fixes, refactors & delivery',
    description:
      'Stabilise code under pressure, clear blockers, and ship without drama — remote-friendly and async-first when needed.',
  },
  {
    title: 'APIs, integrations & cloud',
    description:
      'REST integrations, Postman-tested flows, and pragmatic use of AWS, GCP, Netlify, and Vercel for hosting and automation.',
  },
] as const

export const WHY_HIRE = [
  {
    title: 'Proven in demanding environments',
    body: 'Masai-style intensity, Accenture-scale delivery, and current finance-domain work — I stay effective when timelines and stakes are high.',
  },
  {
    title: 'Team player who also ships solo',
    body: 'Multiple team projects and solo builds; comfortable owning a stream end-to-end or pairing with design and QA.',
  },
  {
    title: 'Global freelance track record',
    body: '30+ delivered projects across Asia, the UAE, and the US — clear communication, scoping, and follow-through.',
  },
  {
    title: 'Strong fundamentals & curiosity',
    body: 'From core web stacks to Python, Java, cloud, and modern AI-assisted development — I learn what the problem needs.',
  },
] as const
