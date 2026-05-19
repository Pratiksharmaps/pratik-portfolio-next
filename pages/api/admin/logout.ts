// pages/api/admin/logout.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'cookie'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Set-Cookie', serialize('admin_token', '', { maxAge: 0, path: '/' }))
  return res.status(200).json({ ok: true })
}
