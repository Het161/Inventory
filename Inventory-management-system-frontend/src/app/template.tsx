'use client'

import { useEffect } from 'react'

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Prevent scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    
    // Store and restore scroll position
    const handleRouteChange = () => {
      const scrollPos = window.scrollY
      sessionStorage.setItem('scrollPosition', scrollPos.toString())
    }

    window.addEventListener('beforeunload', handleRouteChange)
    
    return () => {
      window.removeEventListener('beforeunload', handleRouteChange)
    }
  }, [])

  return <>{children}</>
}
