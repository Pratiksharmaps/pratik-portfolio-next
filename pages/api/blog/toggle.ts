// pages/api/blog/toggle.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { isAuthenticated } from '@/lib/auth'
import { togglePublish } from '@/lib/blog'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  if (!isAuthenticated(req)) return res.status(401).json({ error: 'Unauthorized' })

  const { id } = req.body
  if (!id) return res.status(400).json({ error: 'Missing id' })

  const updated = togglePublish(id)
  if (!updated) return res.status(404).json({ error: 'Post not found' })

  return res.status(200).json(updated)
}
