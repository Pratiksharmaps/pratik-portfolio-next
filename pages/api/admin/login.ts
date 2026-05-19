// pages/api/admin/login.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'cookie'
import { checkPassword, generateToken } from '@/lib/auth'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { password } = req.body
  if (!password || !checkPassword(password)) {
    return res.status(401).json({ error: 'Invalid password' })
  }

  const token = generateToken()
  const cookie = serialize('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })
  res.setHeader('Set-Cookie', cookie)
  return res.status(200).json({ ok: true })
}
