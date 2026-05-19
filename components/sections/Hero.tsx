// components/sections/Hero.tsx
import { siteConfig, stats } from '@/data/portfolio'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center grid-bg overflow-hidden"
      aria-label="Hero section"
    >
      {/* Glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'glowPulse 4s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'glowPulse 5s ease-in-out infinite 1s',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16 w-full">
        <div className="max-w-3xl">
          {/* Tag */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
            style={{
              background: 'var(--accent-glow)',
              border: '1px solid rgba(0,212,255,0.2)',
              color: 'var(--accent)',
              fontFamily: 'var(--font-mono)',
              animationDelay: '0.1s',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            Available for opportunities
          </div>

          {/* Name */}
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 leading-none tracking-tight"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            Pratik{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, var(--accent), #A855F7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Sharma
            </span>
          </h1>

          {/* Title */}
          <h2
            className="text-xl sm:text-2xl font-medium mb-6"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-display)' }}
          >
            Flutter Developer &amp; Mobile App Engineer
          </h2>

          {/* Description */}
          <p
            className="text-base sm:text-lg leading-relaxed mb-10 max-w-2xl"
            style={{ color: 'var(--text-secondary)' }}
          >
            Building production-grade Android &amp; iOS apps for enterprise, government, and US-based clients.
            Specializing in{' '}
            <span style={{ color: 'var(--accent)' }}>Flutter, Firebase, Clean Architecture</span>,
            and scalable mobile solutions that reach 10,000+ users.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 mb-16">
            <a
              href="#projects"
              className="px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
              style={{
                background: 'var(--accent)',
                color: '#000',
                fontFamily: 'var(--font-display)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 30px var(--accent-glow)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
              style={{
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-display)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.color = 'var(--accent)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.color = 'var(--text-primary)'
              }}
            >
              Get In Touch
            </a>
            <a
              href="/Pratik_Sharma_Resume.pdf"
              download
              className="px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center gap-2"
              style={{
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-display)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.color = 'var(--text-primary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)'
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              Resume PDF
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-xl"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              >
                <div
                  className="text-2xl font-bold mb-1"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}
                >
                  {stat.value}
                </div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social links */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-3">
          {[
            { href: siteConfig.linkedin, label: 'LinkedIn', icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            )},
            { href: siteConfig.github, label: 'GitHub', icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
              </svg>
            )},
            { href: `mailto:${siteConfig.email}`, label: 'Email', icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            )},
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={link.label}
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{ color: 'var(--text-muted)', border: '1px solid var(--border)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--accent)'
                e.currentTarget.style.borderColor = 'var(--accent)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-muted)'
                e.currentTarget.style.borderColor = 'var(--border)'
              }}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
