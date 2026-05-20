import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../lib/firebase-admin'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).end()
  }

  // GET to just fetch count
  if (req.method === 'GET') {
    if (!db) return res.status(200).json({ count: 0 })
    try {
      const doc = await db.collection('stats').doc('visitors').get()
      const data = doc.data()
      return res.status(200).json({ count: data?.count || 0 })
    } catch (e) {
      return res.status(500).json({ error: 'Failed to fetch count', count: 0 })
    }
  }

  // POST to increment and save visitor details
  if (req.method === 'POST') {
    const { visitorId, userAgent, language, platform, screenWidth, screenHeight } = req.body

    // Basic count fallback if db is not connected
    if (!db) {
      return res.status(200).json({ count: 0 })
    }

    if (process.env.DISABLE_VISITOR_TRACKING === 'true') {
      try {
        const doc = await db.collection('stats').doc('visitors').get()
        return res.status(200).json({ count: doc.data()?.count || 0 })
      } catch (e) {
        return res.status(500).json({ error: 'Failed to fetch count', count: 0 })
      }
    }

    try {
      // Get IP
      const forwarded = req.headers['x-forwarded-for'] as string
      const ip = forwarded ? forwarded.split(',')[0] : req.socket.remoteAddress || ''
      
      let location = 'Unknown'
      try {
        if (ip && ip !== '::1' && ip !== '127.0.0.1') {
          const ipRes = await fetch(`https://ipapi.co/${ip}/json/`)
          if (ipRes.ok) {
            const ipData = await ipRes.json()
            location = `${ipData.city || ''}, ${ipData.country_name || ''}`.trim()
          }
        }
      } catch (err) {
        console.error('IP lookup failed', err)
      }

      // Increment stats/visitors
      const statsRef = db.collection('stats').doc('visitors')
      const doc = await statsRef.get()
      let newCount = 1

      if (!doc.exists) {
        await statsRef.set({ count: 1 })
      } else {
        const data = doc.data()
        newCount = (data?.count || 0) + 1
        await statsRef.update({ count: newCount })
      }

      // Save visitor specific data
      if (visitorId) {
        await db.collection('visitors').doc(visitorId).set({
          visitorId,
          lastVisit: new Date().toISOString(),
          userAgent: userAgent || '',
          language: language || '',
          platform: platform || '',
          screenWidth: screenWidth || null,
          screenHeight: screenHeight || null,
          ip: ip || null,
          location: location || null,
        }, { merge: true }) // Merge true in case they visit again and we just want to update lastVisit
      }

      return res.status(200).json({ count: newCount })
    } catch (e) {
      console.error('Visitor tracking error:', e)
      return res.status(500).json({ error: 'Failed to track visitor', count: 0 })
    }
  }
}
