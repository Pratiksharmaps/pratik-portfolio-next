// components/sections/Contact.tsx
import { useState } from 'react'
import { siteConfig } from '@/data/portfolio'
import { availability } from '@/lib/availability'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', company: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = {
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border)',
    borderRadius: '10px',
    color: 'var(--text-primary)',
    padding: '12px 16px',
    width: '100%',
    fontSize: '0.9rem',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <section id="contact" className="py-24" aria-label="Contact section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px" style={{ background: 'var(--accent)' }} />
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
              Contact
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            Get In Touch
          </h2>
          <p className="text-base max-w-xl" style={{ color: 'var(--text-secondary)' }}>
            Looking for a Flutter developer? I&apos;m open to full-time roles, contract work, and interesting projects.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div>
            <div className="flex flex-col gap-4 mb-8">
              {[
                { icon: '📧', label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
                { icon: '📱', label: 'Phone', value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
                { icon: '📍', label: 'Location', value: siteConfig.location, href: null },
                { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/pratiksharma01', href: siteConfig.linkedin },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 p-4 rounded-xl"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                >
                  <span className="text-xl w-10 h-10 flex items-center justify-center rounded-lg"
                    style={{ background: 'var(--accent-glow)' }}>
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="text-sm font-medium transition-colors"
                        style={{ color: 'var(--text-primary)' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div
              className="p-5 rounded-2xl"
              style={{
                background: 'var(--bg-card)',
                border: `1px solid ${availability.isAvailable ? 'rgba(0,212,255,0.2)' : availability.accentBorder}`,
              }}
            >
              <p className="text-sm font-semibold mb-2" style={{ color: availability.isAvailable ? 'var(--accent)' : availability.accentColor, fontFamily: 'var(--font-display)' }}>
                {availability.contactTitle}
              </p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {availability.contactDetail}
              </p>
              {availability.isAvailable && availability.joiningNotice && (
                <p className="text-xs mt-3 pt-3 border-t" style={{ color: availability.accentColor, borderColor: 'var(--border)', fontFamily: 'var(--font-mono)' }}>
                  {availability.joiningNotice}
                </p>
              )}
            </div>
          </div>

          {/* Form */}
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Jane Smith"
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jane@company.com"
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs mb-1.5" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                  Company / Organization
                </label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="Acme Corp (optional)"
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              <div>
                <label className="block text-xs mb-1.5" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Hi Pratik, I'm looking for a Flutter developer to..."
                  style={{ ...inputStyle, resize: 'vertical' }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="py-3 rounded-xl font-semibold text-sm transition-all duration-200"
                style={{
                  background: status === 'sending' ? 'var(--text-muted)' : 'var(--accent)',
                  color: '#000',
                  fontFamily: 'var(--font-display)',
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                }}
              >
                {status === 'sending' ? 'Sending...' : 'Send Message →'}
              </button>

              {status === 'success' && (
                <div
                  className="p-4 rounded-xl text-sm text-center"
                  style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981', border: '1px solid rgba(16,185,129,0.2)' }}
                >
                  ✅ Message sent! I&apos;ll get back to you within 24 hours.
                </div>
              )}
              {status === 'error' && (
                <div
                  className="p-4 rounded-xl text-sm text-center"
                  style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)' }}
                >
                  ❌ Something went wrong. Please email me directly at {siteConfig.email}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
