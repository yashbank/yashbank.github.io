import { useEffect, useState } from 'react'

const fmt = () =>
  new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' }).format(new Date())

export function useIstClock() {
  const [t, setT] = useState(fmt)
  useEffect(() => {
    const id = window.setInterval(() => setT(fmt()), 20000)
    return () => window.clearInterval(id)
  }, [])
  return t
}
