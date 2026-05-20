import { useEffect, useState } from 'react'

export function useVisitorTracking() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null)
  
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Check if visitor has been tracked in this session/browser
        let visitorId = localStorage.getItem('visitor_id')
        const isNewVisit = !visitorId

        if (!visitorId) {
          // Generate a unique ID similar to the Flutter implementation
          visitorId = Date.now().toString() + Math.floor(1000 + Math.random() * 9000).toString()
          localStorage.setItem('visitor_id', visitorId)
        }

        // Get count initially if it's not a new visit, or track new visit
        const res = await fetch('/api/visitor', {
          method: isNewVisit ? 'POST' : 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          body: isNewVisit ? JSON.stringify({
            visitorId,
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
          }) : undefined,
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
