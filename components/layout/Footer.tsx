// components/layout/Footer.tsx
import Link from 'next/link'
import { siteConfig } from '@/data/portfolio'
import { useVisitorTracking } from '@/lib/hooks/useVisitorTracking'
import { useState, useEffect } from 'react'
export default function Footer() {
  const year = new Date().getFullYear()
  const { visitorCount } = useVisitorTracking()
  const [currentDateTime, setCurrentDateTime] = useState<string>('')

  useEffect(() => {
    const updateTime = () => {
      setCurrentDateTime(new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short',
      }))
    }
    updateTime()
    const timer = setInterval(updateTime, 60000)
    return () => clearInterval(timer)
  }, [])

  return (
    <footer
      className="border-t mt-20"
      style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="font-bold text-2xl mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
              Pratik Sharma
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Flutter Developer building production-grade mobile apps for enterprise, government, and US clients.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-sm mb-3" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.7rem' }}>
              Navigation
            </h3>
            <div className="flex flex-col gap-2">
              {['About', 'Skills', 'Projects', 'Blog', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={item === 'Blog' ? '/blog' : `/#${item.toLowerCase()}`}
                  className="text-sm transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm mb-3" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.7rem' }}>
              Connect
            </h3>
            <div className="flex flex-col gap-2">
              <a href={`mailto:${siteConfig.email}`} className="text-sm transition-colors" style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
                {siteConfig.email}
              </a>
              <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm transition-colors" style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
                LinkedIn
              </a>
              <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="text-sm transition-colors" style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
                GitHub
              </a>
              <Link href="/privacy-policy" className="text-sm transition-colors" style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderColor: 'var(--border)' }}>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © {year} Pratik Sharma. All rights reserved.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs" style={{ color: 'var(--text-muted)' }}>
            {visitorCount !== null && (
              <span className="flex items-center gap-1.5" title="Total Visitors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                {visitorCount.toLocaleString()} visitors
              </span>
            )}
            {currentDateTime && (
              <span className="flex items-center gap-1.5" title="Current Time (IST)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {currentDateTime}
              </span>
            )}
            <span className="hidden sm:inline">Flutter Developer · Gurgaon, India</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
