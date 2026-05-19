// pages/404.tsx
import Link from 'next/link'
import SEOHead from '@/components/ui/SEOHead'

export default function NotFound() {
  return (
    <>
      <SEOHead title="404 — Page Not Found" noIndex />
      <div className="min-h-screen grid-bg flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="text-center px-4">
          <p className="text-8xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)', opacity: 0.3 }}>404</p>
          <h1 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            Page not found
          </h1>
          <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
            This page doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl font-semibold text-sm text-black"
            style={{ background: 'var(--accent)' }}
          >
            Back to Portfolio
          </Link>
        </div>
      </div>
    </>
  )
}
