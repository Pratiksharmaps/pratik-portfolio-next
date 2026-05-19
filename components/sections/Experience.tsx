// components/sections/Experience.tsx
import { experience, education } from '@/data/portfolio'

export default function Experience() {
  return (
    <section id="experience" className="py-24" aria-label="Experience and education section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px" style={{ background: 'var(--accent)' }} />
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
              Career
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            Experience & Education
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Experience */}
          <div>
            <h3 className="font-bold text-lg mb-8 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--accent)' }}>
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
              </svg>
              Work Experience
            </h3>
            <div className="relative">
              {/* Timeline line */}
              <div
                className="absolute left-4 top-0 bottom-0 w-px"
                style={{ background: 'var(--border)' }}
              />
              <div className="flex flex-col gap-8">
                {experience.map((exp, idx) => (
                  <div key={idx} className="pl-12 relative">
                    {/* Dot */}
                    <div
                      className="absolute left-[11px] top-1 w-3 h-3 rounded-full border-2"
                      style={{ background: 'var(--accent)', borderColor: 'var(--bg-primary)' }}
                    />
                    {/* Card */}
                    <div
                      className="p-5 rounded-2xl transition-all duration-200"
                      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-bold text-base" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                          {exp.company}
                        </h4>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full shrink-0"
                          style={{
                            background: idx === 0 ? 'var(--accent-glow)' : 'var(--bg-secondary)',
                            color: idx === 0 ? 'var(--accent)' : 'var(--text-muted)',
                            border: `1px solid ${idx === 0 ? 'rgba(0,212,255,0.2)' : 'var(--border)'}`,
                          }}
                        >
                          {exp.type}
                        </span>
                      </div>
                      <p className="text-sm font-medium mb-1" style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>
                        {exp.role}
                      </p>
                      <p className="text-xs mb-4" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {exp.period} · {exp.location}
                      </p>
                      <ul className="flex flex-col gap-2">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="text-sm flex items-start gap-2" style={{ color: 'var(--text-secondary)' }}>
                            <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: 'var(--accent)' }} />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="font-bold text-lg mb-8 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--accent)' }}>
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
              Education
            </h3>
            <div className="flex flex-col gap-4 mb-8">
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl transition-all duration-200"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <h4 className="font-bold text-sm mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                    {edu.institution}
                  </h4>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{edu.degree}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs font-mono" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                      {edu.grade}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{edu.period}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* What I bring */}
            <div
              className="p-5 rounded-2xl"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              <h4 className="font-bold text-base mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                What I Bring
              </h4>
              {[
                { icon: '🚀', title: 'Production Experience', desc: '6+ live apps shipped to real users' },
                { icon: '🏗️', title: 'Architecture Focus', desc: 'Clean Architecture & MVVM patterns' },
                { icon: '🔒', title: 'Security-First', desc: 'RBAC, AES encryption, secure storage' },
                { icon: '🌐', title: 'Cross-functional', desc: 'Worked with US, enterprise & govt teams' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 mb-4 last:mb-0">
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{item.title}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
