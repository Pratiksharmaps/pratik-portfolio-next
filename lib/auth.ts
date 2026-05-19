// lib/auth.ts — Simple password-based admin auth with JWT

import jwt from 'jsonwebtoken'
import { NextApiRequest } from 'next'
import { parse } from 'cookie'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-in-production'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

export function checkPassword(password: string): boolean {
  return password === ADMIN_PASSWORD
}

export function generateToken(): string {
  return jwt.sign({ role: 'admin', ts: Date.now() }, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): boolean {
  try {
    jwt.verify(token, JWT_SECRET)
    return true
  } catch {
    return false
  }
}

export function getTokenFromRequest(req: any): string | null {
  // Check cookie first
  const cookies = parse(req.headers.cookie || '')
  if (cookies.admin_token) return cookies.admin_token

  // Check Authorization header
  const auth = req.headers.authorization
  if (auth?.startsWith('Bearer ')) return auth.slice(7)

  return null
}

export function isAuthenticated(req: any): boolean {
  const token = getTokenFromRequest(req)
  if (!token) return false
  return verifyToken(token)
}
