// pages/api/admin/upload-image.ts — Upload cover image to Cloudinary (admin only)
import type { NextApiRequest, NextApiResponse } from 'next'
import { isAuthenticated } from '@/lib/auth'
import { v2 as cloudinary } from 'cloudinary'

// Allow larger payloads for image base64 data
export const config = { api: { bodyParser: { sizeLimit: '10mb' } } }

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  if (!isAuthenticated(req)) return res.status(401).json({ error: 'Unauthorized' })

  const missingVars = !process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET
  if (missingVars) {
    return res.status(503).json({
      error: 'Cloudinary not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to your environment.',
    })
  }

  const { mimeType, base64Data } = req.body as {
    mimeType?: string
    base64Data?: string
  }

  if (!mimeType || !base64Data) {
    return res.status(400).json({ error: 'Missing mimeType or base64Data' })
  }

  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  if (!allowed.includes(mimeType)) {
    return res.status(400).json({ error: 'Only JPEG, PNG, WebP or GIF images are allowed' })
  }

  try {
    const dataUri = `data:${mimeType};base64,${base64Data}`

    // const result = await cloudinary.uploader.upload(dataUri, {
    //   folder: 'blog-covers',
    //   resource_type: 'image',
    //   // Auto quality + format for best performance
    //   transformation: [{ quality: 'auto', fetch_format: 'auto' }],
    // })
    const result = await cloudinary.uploader.upload(dataUri, {
  folder: 'blog-covers',
  resource_type: 'image',
})

    return res.status(200).json({ url: result.secure_url })
  } catch (err) {
    console.error('Cloudinary upload error:', err)
    return res.status(500).json({ error: 'Upload failed. Check Cloudinary credentials.' })
  }
}
