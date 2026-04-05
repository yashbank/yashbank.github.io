import type { IconType } from 'react-icons'
import { FaAws } from 'react-icons/fa6'
import {
  SiAnthropic,
  SiCss,
  SiDocker,
  SiExpress,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGooglecloud,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNetlify,
  SiNodedotjs,
  SiOpenai,
  SiOpenapiinitiative,
  SiOpenjdk,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiSlack,
  SiTypescript,
  SiVercel,
  SiVscodium,
} from 'react-icons/si'

/** Minimal monochrome brand marks — keys match `SKILL_CATEGORIES` in content. */
const ICONS: Record<string, IconType> = {
  mongodb: SiMongodb,
  express: SiExpress,
  react: SiReact,
  nodedotjs: SiNodedotjs,
  javascript: SiJavascript,
  html5: SiHtml5,
  css3: SiCss,
  openapi: SiOpenapiinitiative,
  postgresql: SiPostgresql,
  git: SiGit,
  github: SiGithub,
  python: SiPython,
  java: SiOpenjdk,
  typescript: SiTypescript,
  githubactions: SiGithubactions,
  openai: SiOpenai,
  anthropic: SiAnthropic,
  vscodium: SiVscodium,
  aws: FaAws,
  gcp: SiGooglecloud,
  netlify: SiNetlify,
  vercel: SiVercel,
  postman: SiPostman,
  docker: SiDocker,
  slack: SiSlack,
}

type Props = {
  name: string
  className?: string
}

export function TechIcon({ name, className = 'h-5 w-5' }: Props) {
  const Icon = ICONS[name]
  if (!Icon) {
    return (
      <span
        className={`inline-block rounded border border-white/15 ${className}`}
        aria-hidden
      />
    )
  }
  return <Icon className={className} aria-hidden />
}
