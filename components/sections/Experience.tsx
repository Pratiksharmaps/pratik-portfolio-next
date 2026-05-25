'use client'
import { motion } from 'framer-motion'
import { experience, education } from '@/data/portfolio'

export default function Experience() {
  return (
    <section id="experience" className="py-24" aria-label="Experience and education section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px" style={{ background: 'var(--accent)' }} />
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
              Career
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            Experience &amp; Education
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* ── Work Experience ── */}
          <div>
            <motion.h3
              className="font-bold text-lg mb-10 flex items-center gap-2"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--accent)' }}>
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
              </svg>
              Work Experience
            </motion.h3>

            <div className="relative">
              {/* Timeline track — gradient line */}
              <motion.div
                className="absolute left-5 top-2 bottom-2 w-0.5 origin-top"
                style={{
                  background: 'linear-gradient(180deg, var(--accent) 0%, rgba(168,85,247,0.6) 60%, rgba(107,114,128,0.2) 100%)',
                }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />

              <div className="flex flex-col gap-0">
                {experience.map((exp, idx) => {
                  const isCurrent = idx === 0
                  return (
                    <motion.div
                      key={idx}
                      className="pl-16 relative pb-10 last:pb-0"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.55, delay: idx * 0.18, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {/* Timeline dot */}
                      <motion.div
                        className="absolute left-[13px] top-2 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: idx * 0.18 + 0.25, type: 'spring', stiffness: 220 }}
                      >
                        {isCurrent ? (
                          /* Pulsing dot for current role */
                          <span className="relative flex h-5 w-5">
                            <span
                              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50"
                              style={{ background: 'var(--accent)' }}
                            />
                            <span
                              className="relative inline-flex rounded-full h-5 w-5 border-2"
                              style={{ background: 'var(--accent)', borderColor: 'var(--bg-primary)' }}
                            />
                          </span>
                        ) : (
                          <span
                            className="flex h-3.5 w-3.5 rounded-full border-2"
                            style={{ background: 'var(--bg-card)', borderColor: 'rgba(168,85,247,0.7)' }}
                          />
                        )}
                      </motion.div>

                      {/* Card */}
                      <div
                        className="rounded-2xl overflow-hidden transition-all duration-300"
                        style={{
                          background: 'var(--bg-card)',
                          border: `1px solid ${isCurrent ? 'rgba(0,212,255,0.35)' : 'var(--border)'}`,
                          boxShadow: isCurrent ? '0 0 0 1px rgba(0,212,255,0.08), 0 8px 32px rgba(0,212,255,0.06)' : 'none',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = isCurrent ? 'rgba(0,212,255,0.6)' : 'rgba(0,212,255,0.3)'
                          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,212,255,0.1)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = isCurrent ? 'rgba(0,212,255,0.35)' : 'var(--border)'
                          e.currentTarget.style.boxShadow = isCurrent ? '0 0 0 1px rgba(0,212,255,0.08), 0 8px 32px rgba(0,212,255,0.06)' : 'none'
                        }}
                      >
                        {/* Top accent bar — only on current role */}
                        {isCurrent && (
                          <div
                            className="h-0.5 w-full"
                            style={{ background: 'linear-gradient(90deg, var(--accent), #A855F7, transparent)' }}
                          />
                        )}

                        <div className="p-6">
                          {/* Company row */}
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex items-center gap-3">
                              {/* Company initial badge */}
                              <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-base"
                                style={{
                                  background: isCurrent ? 'rgba(0,212,255,0.12)' : 'var(--bg-secondary)',
                                  border: `1px solid ${isCurrent ? 'rgba(0,212,255,0.25)' : 'var(--border)'}`,
                                  color: isCurrent ? 'var(--accent)' : 'var(--text-muted)',
                                  fontFamily: 'var(--font-display)',
                                }}
                              >
                                {exp.company.charAt(0)}
                              </div>
                              <div>
                                <h4
                                  className="font-bold text-base leading-tight"
                                  style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
                                >
                                  {exp.company}
                                </h4>
                                <p
                                  className="text-sm font-medium mt-0.5"
                                  style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)' }}
                                >
                                  {exp.role}
                                </p>
                              </div>
                            </div>

                            {/* Type + Current badge */}
                            <div className="flex flex-col items-end gap-1.5 shrink-0">
                              {isCurrent && (
                                <span
                                  className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                                  style={{
                                    background: 'rgba(0,212,255,0.12)',
                                    color: 'var(--accent)',
                                    border: '1px solid rgba(0,212,255,0.3)',
                                    fontFamily: 'var(--font-mono)',
                                  }}
                                >
                                  ● CURRENT
                                </span>
                              )}
                              <span
                                className="text-xs px-2.5 py-0.5 rounded-full"
                                style={{
                                  background: 'var(--bg-secondary)',
                                  color: 'var(--text-muted)',
                                  border: '1px solid var(--border)',
                                }}
                              >
                                {exp.type}
                              </span>
                            </div>
                          </div>

                          {/* Period & location */}
                          <div
                            className="flex items-center gap-1.5 mb-5 ml-13"
                            style={{ marginLeft: '52px' }}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)', flexShrink: 0 }}>
                              <rect x="3" y="4" width="18" height="18" rx="2" />
                              <line x1="16" y1="2" x2="16" y2="6" />
                              <line x1="8" y1="2" x2="8" y2="6" />
                              <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            <span
                              className="text-xs"
                              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
                            >
                              {exp.period} · {exp.location}
                            </span>
                          </div>

                          {/* Divider */}
                          <div className="h-px mb-4" style={{ background: 'var(--border)' }} />

                          {/* Highlights */}
                          <ul className="flex flex-col gap-2.5">
                            {exp.highlights.map((h, i) => (
                              <li
                                key={i}
                                className="text-sm flex items-start gap-2.5"
                                style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}
                              >
                                <span
                                  className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                                  style={{ background: isCurrent ? 'var(--accent)' : 'rgba(168,85,247,0.7)' }}
                                />
                                {h}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ── Education + What I Bring ── */}
          <div>
            <motion.h3
              className="font-bold text-lg mb-10 flex items-center gap-2"
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--accent)' }}>
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
              Education
            </motion.h3>

            <div className="flex flex-col gap-4 mb-8">
              {education.map((edu, idx) => (
                <motion.div
                  key={idx}
                  className="p-5 rounded-2xl transition-all duration-200"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-base"
                      style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
                    >
                      🎓
                    </div>
                    <div className="flex-1">
                      <h4
                        className="font-bold text-sm mb-0.5"
                        style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
                      >
                        {edu.institution}
                      </h4>
                      <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
                        {edu.degree}
                      </p>
                      <span
                        className="text-xs"
                        style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
                      >
                        {edu.period}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* What I Bring */}
            <motion.div
              className="p-6 rounded-2xl"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <h4
                className="font-bold text-base mb-5"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
              >
                What I Bring
              </h4>
              {[
                { icon: '🚀', title: 'Production Experience', desc: '7+ live apps shipped to real users' },
                { icon: '🏗️', title: 'Architecture Focus', desc: 'Clean Architecture, MVVM & Repository pattern' },
                { icon: '🔒', title: 'Security-First', desc: 'RBAC, AES encryption, token refresh workflows' },
                { icon: '⚙️', title: 'CI/CD Automation', desc: 'Fastlane + Shorebird OTA, zero manual errors' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  className="flex items-start gap-4 mb-4 last:mb-0 p-3 rounded-xl transition-colors duration-150 cursor-default"
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-secondary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <span
                    className="text-lg w-9 h-9 flex items-center justify-center rounded-lg shrink-0"
                    style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
                  >
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                      {item.title}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
