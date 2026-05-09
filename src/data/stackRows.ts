/**
 * Stack metadata: grouped rows for copy/IA; `DOCK_TOOLS` is the flat unique list for the dock UI.
 * Brand hex values (official / recognizable on dark UI).
 */

export type StackToolId =
  | 'react'
  | 'nextjs'
  | 'typescript'
  | 'tailwind'
  | 'framer'
  | 'gsap'
  | 'node'
  | 'express'
  | 'supabase'
  | 'firebase'
  | 'postman'
  | 'mongodb'
  | 'postgresql'
  | 'docker'
  | 'github'
  | 'vercel'
  | 'gcp'
  | 'openai'
  | 'figma'
  | 'git'
  | 'cursor'

export type StackTool = {
  id: StackToolId
  label: string
  color: string
}

export type StackRowConfig = {
  title: string
  tools: readonly StackTool[]
}

export const STACK_ROWS: readonly StackRowConfig[] = [
  {
    title: 'Frontend',
    tools: [
      { id: 'react', label: 'React', color: '#61DAFB' },
      { id: 'nextjs', label: 'Next.js', color: '#FFFFFF' },
      { id: 'typescript', label: 'TypeScript', color: '#3178C6' },
      { id: 'tailwind', label: 'Tailwind CSS', color: '#38BDF8' },
      { id: 'framer', label: 'Framer Motion', color: '#BB4BF7' },
      { id: 'gsap', label: 'GSAP', color: '#88CE02' },
    ],
  },
  {
    title: 'Backend · product',
    tools: [
      { id: 'node', label: 'Node.js', color: '#339933' },
      { id: 'express', label: 'Express', color: '#B8B8B8' },
      { id: 'supabase', label: 'Supabase', color: '#3ECF8E' },
      { id: 'firebase', label: 'Firebase', color: '#FFCA28' },
      { id: 'postman', label: 'Postman', color: '#FF6C37' },
    ],
  },
  {
    title: 'Infra · AI · workflow',
    tools: [
      { id: 'mongodb', label: 'MongoDB', color: '#47A248' },
      { id: 'postgresql', label: 'PostgreSQL', color: '#6999E6' },
      { id: 'docker', label: 'Docker', color: '#2496ED' },
      { id: 'github', label: 'GitHub', color: '#E6EDF3' },
      { id: 'vercel', label: 'Vercel', color: '#FFFFFF' },
      { id: 'gcp', label: 'GCP', color: '#4285F4' },
      { id: 'openai', label: 'OpenAI', color: '#74AA9C' },
      { id: 'figma', label: 'Figma', color: '#F24E1E' },
      { id: 'git', label: 'Git', color: '#F05032' },
      { id: 'cursor', label: 'Cursor', color: '#A8B1FF' },
    ],
  },
] as const

/** Flat unique tool list for dock UI (same data as `STACK_ROWS`, row order preserved). */
export const DOCK_TOOLS: readonly StackTool[] = (() => {
  const out: StackTool[] = []
  const seen = new Set<StackToolId>()
  for (const row of STACK_ROWS) {
    for (const t of row.tools) {
      if (seen.has(t.id)) continue
      seen.add(t.id)
      out.push(t)
    }
  }
  return out
})()
