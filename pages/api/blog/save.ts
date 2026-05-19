// pages/api/blog/save.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { isAuthenticated } from '@/lib/auth'
import { savePost } from '@/lib/blog'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  if (!isAuthenticated(req)) return res.status(401).json({ error: 'Unauthorized' })

  try {
    const post = req.body
    if (!post.id || !post.title || !post.content) {
      return res.status(400).json({ error: 'Missing required fields' })
    }
    savePost(post)
    return res.status(200).json({ ok: true, post })
  } catch (err) {
    return res.status(500).json({ error: 'Failed to save post' })
  }
}
