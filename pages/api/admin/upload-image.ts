// pages/api/admin/upload-image.ts — Upload cover image to Firebase Storage (admin only)
import type { NextApiRequest, NextApiResponse } from 'next'
import { isAuthenticated } from '@/lib/auth'
import { storage } from '@/lib/firebase-admin'

// Allow larger payloads for image base64 data
export const config = { api: { bodyParser: { sizeLimit: '8mb' } } }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  if (!isAuthenticated(req)) return res.status(401).json({ error: 'Unauthorized' })

  if (!storage) {
    return res.status(503).json({
      error: 'Firebase Storage not configured. Set FIREBASE_STORAGE_BUCKET in your environment.',
    })
  }

  const { fileName, mimeType, base64Data } = req.body as {
    fileName?: string
    mimeType?: string
    base64Data?: string
  }

  if (!fileName || !mimeType || !base64Data) {
    return res.status(400).json({ error: 'Missing fileName, mimeType, or base64Data' })
  }

  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  if (!allowed.includes(mimeType)) {
    return res.status(400).json({ error: 'Only JPEG, PNG, WebP or GIF images are allowed' })
  }

  try {
    const buffer = Buffer.from(base64Data, 'base64')
    const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_').toLowerCase()
    const filePath = `blog-images/${Date.now()}-${safeName}`

    const file = storage.file(filePath)
    await file.save(buffer, {
      metadata: { contentType: mimeType },
      public: true,
    })

    const bucketName = process.env.FIREBASE_STORAGE_BUCKET
    const downloadURL = `https://storage.googleapis.com/${bucketName}/${filePath}`

    return res.status(200).json({ url: downloadURL })
  } catch (err) {
    console.error('Storage upload error:', err)
    return res.status(500).json({ error: 'Upload failed. Check Firebase Storage rules.' })
  }
}
