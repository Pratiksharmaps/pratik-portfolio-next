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
    const { visitorId, isNewVisitor, userAgent, language, platform, screenWidth, screenHeight } = req.body

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
      // Get IP checking Cloudflare, Vercel, and Standard forwarded headers
      const cfConnectingIp = req.headers['cf-connecting-ip'] as string
      const xRealIp = req.headers['x-real-ip'] as string
      const xForwardedFor = req.headers['x-forwarded-for'] as string
      
      let ip = cfConnectingIp || xRealIp || ''
      if (!ip && xForwardedFor) {
        ip = xForwardedFor.split(',')[0].trim()
      }
      if (!ip) {
        ip = req.socket.remoteAddress || ''
      }
      
      let resolvedIp = ip
      let location = 'Unknown'
      try {
        const isLocal = !resolvedIp || resolvedIp === '::1' || resolvedIp === '127.0.0.1' || resolvedIp.startsWith('192.168.') || resolvedIp.startsWith('10.')
        const url = isLocal ? 'https://ipapi.co/json/' : `https://ipapi.co/${resolvedIp}/json/`
        
        const ipRes = await fetch(url)
        if (ipRes.ok) {
          const ipData = await ipRes.json()
          if (isLocal && ipData.ip) {
            resolvedIp = ipData.ip
          }
          location = `${ipData.city || ''}, ${ipData.country_name || ''}`.trim()
        }
      } catch (err) {
        console.error('IP lookup failed', err)
      }

      // Increment stats/visitors ONLY for first-time browsers
      let newCount = 0
      if (isNewVisitor) {
        const statsRef = db.collection('stats').doc('visitors')
        const doc = await statsRef.get()

        if (!doc.exists) {
          newCount = 1
          await statsRef.set({ count: 1 })
        } else {
          const data = doc.data()
          newCount = (data?.count || 0) + 1
          await statsRef.update({ count: newCount })
        }
      } else {
        // Returning visitor — just fetch the current count without incrementing
        const doc = await db.collection('stats').doc('visitors').get()
        newCount = doc.data()?.count || 0
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
          ip: resolvedIp || null,
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
