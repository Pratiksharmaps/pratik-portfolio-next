// components/layout/Footer.tsx
import Link from 'next/link'
import { siteConfig } from '@/data/portfolio'

export default function Footer() {
  const year = new Date().getFullYear()
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

        <div className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-2" style={{ borderColor: 'var(--border)' }}>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © {year} Pratik Sharma. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Flutter Developer · Gurgaon, India
          </p>
        </div>
      </div>
    </footer>
  )
}
