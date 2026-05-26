import { useEffect, useState } from 'react'

export function useVisitorTracking() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null)

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // visitorId persists across sessions (localStorage) to identify the same browser
        let visitorId = localStorage.getItem('visitor_id')
        const isNewVisitor = !visitorId

        if (!visitorId) {
          // Generate a unique ID for this browser
          visitorId = Date.now().toString() + Math.floor(1000 + Math.random() * 9000).toString()
          localStorage.setItem('visitor_id', visitorId)
        }

        // Use sessionStorage to avoid double-tracking within the same tab session
        // but always POST on a new session so the server gets the latest IP
        const sessionTracked = sessionStorage.getItem('session_tracked')
        if (sessionTracked) {
          // Already tracked this session — just fetch the latest count quietly
          const res = await fetch('/api/visitor', { method: 'GET' })
          if (res.ok) {
            const data = await res.json()
            setVisitorCount(data.count)
          }
          return
        }

        // Mark this session as tracked
        sessionStorage.setItem('session_tracked', '1')

        // Always POST — server uses { merge: true } so it safely updates IP/location
        // Pass isNewVisitor flag so server only increments count for brand-new browsers
        const res = await fetch('/api/visitor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            visitorId,
            isNewVisitor,
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
          }),
        })

        if (res.ok) {
          const data = await res.json()
          setVisitorCount(data.count)
        }
      } catch (err) {
        console.error('Failed to track visitor:', err)
      }
    }

    trackVisitor()
  }, [])

  return { visitorCount }
}
