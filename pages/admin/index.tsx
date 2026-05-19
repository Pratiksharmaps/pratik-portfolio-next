// pages/admin/index.tsx — Admin Login
import { useState } from 'react'
import { useRouter } from 'next/router'
import SEOHead from '@/components/ui/SEOHead'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        router.push('/admin/dashboard')
      } else {
        setError('Incorrect password. Try again.')
      }
    } catch {
      setError('Connection error. Please try again.')
    }
    setLoading(false)
  }

  return (
    <>
      <SEOHead title="Admin Login" noIndex />
      <div
        className="min-h-screen flex items-center justify-center grid-bg"
        style={{ background: 'var(--bg-primary)' }}
      >
        <div
          className="w-full max-w-sm p-8 rounded-2xl"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-black font-bold text-lg mx-auto mb-4"
              style={{ background: 'var(--accent)' }}
            >
              PS
            </div>
            <h1 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              Admin Panel
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
              Manage blog posts and content
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
              />
            </div>

            {error && (
              <p className="text-xs text-center" style={{ color: '#EF4444' }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="py-3 rounded-xl font-semibold text-sm text-black transition-all"
              style={{
                background: loading ? 'var(--text-muted)' : 'var(--accent)',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'var(--font-display)',
              }}
            >
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
