// components/layout/Navbar.tsx
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { availability } from '@/lib/availability'
import { siteConfig } from '@/data/portfolio'

const navLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#personal-projects', label: 'Personal Projects' },
  { href: '/built-with-ai', label: 'Built with AI' },
  { href: '/blog', label: 'Blog' },
  { href: '/#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const isExternalResume = siteConfig.resumeUrl.startsWith('http')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-xl border-b'
          : ''
      }`}
      style={{
        background: scrolled ? 'rgba(var(--bg-primary-rgb, 7,7,16), 0.85)' : 'transparent',
        borderColor: 'var(--border)',
      }}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo & Availability Status */}
        <div className="flex items-center gap-3">
          <Link href="/" className="font-display font-bold text-xl tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            <span style={{ color: 'var(--accent)' }}>PS</span>
            <span style={{ color: 'var(--text-primary)' }}>.</span>
          </Link>
          <span
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
            style={{
              background: availability.isAvailable ? 'var(--accent-glow)' : availability.accentBg,
              border: `1px solid ${availability.isAvailable ? 'var(--border)' : availability.accentBorder}`,
              color: availability.isAvailable ? 'var(--accent)' : availability.accentColor,
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span className={`w-1.5 h-1.5 rounded-full bg-current ${availability.isAvailable ? 'animate-pulse' : ''}`} />
            {availability.navbarBadge}
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-100"
              style={{
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-body)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--accent)'
                e.currentTarget.style.background = 'var(--accent-glow)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href={siteConfig.resumeUrl}
            target={isExternalResume ? '_blank' : undefined}
            rel={isExternalResume ? 'noopener noreferrer' : undefined}
            download={isExternalResume ? undefined : true}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              background: 'var(--accent)',
              color: '#000',
              fontFamily: 'var(--font-body)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            Resume
          </a>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: 'var(--text-secondary)' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t px-4 py-4 flex flex-col gap-1"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-3 rounded-lg text-sm font-medium"
              style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={siteConfig.resumeUrl}
            target={isExternalResume ? '_blank' : undefined}
            rel={isExternalResume ? 'noopener noreferrer' : undefined}
            download={isExternalResume ? undefined : true}
            className="mt-2 px-4 py-3 rounded-lg text-sm font-medium text-center"
            style={{ background: 'var(--accent)', color: '#000' }}
          >
            Download Resume
          </a>
        </div>
      )}
    </header>
  )
}
