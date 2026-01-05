'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function LoadingBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Reset on route change complete
    setIsLoading(false)
    setProgress(0)
  }, [pathname, searchParams])

  useEffect(() => {
    let progressInterval: NodeJS.Timeout

    const handleStart = () => {
      setIsLoading(true)
      setProgress(0)

      // Simulate progress
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 100)
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a')

      if (anchor) {
        const href = anchor.getAttribute('href')
        // Only trigger for internal navigation links
        if (href && href.startsWith('/') && !href.startsWith('/#')) {
          const currentPath = window.location.pathname + window.location.search
          if (href !== currentPath) {
            handleStart()
          }
        }
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
      if (progressInterval) clearInterval(progressInterval)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-bg-secondary">
      <div
        className="h-full bg-text-primary transition-all duration-300 ease-out shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
