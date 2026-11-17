import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useGsapSetup } from '@/hooks/useGsapSetup'
import { useLenis, scrollToId } from '@/hooks/useLenis'
import { ObsidianHome } from '@/themes/obsidian/ObsidianHome'
import { IvoryHome } from '@/themes/ivory/IvoryHome'
import { useTheme } from '@/theme/ThemeContext'

export function HomePage() {
  useGsapSetup()
  useLenis()
  const { theme } = useTheme()
  const location = useLocation()

  useEffect(() => {
    const id = location.hash.replace(/^#/, '')
    if (!id) return
    const t = window.setTimeout(() => scrollToId(id), 120)
    return () => window.clearTimeout(t)
  }, [location.hash, location.pathname])

  return theme === 'dark' ? <ObsidianHome key="dark" /> : <IvoryHome key="light" />
}
