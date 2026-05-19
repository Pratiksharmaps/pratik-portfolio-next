// components/sections/Projects.tsx
import { useState } from 'react'
import Link from 'next/link'
import { projects } from '@/data/portfolio'

const categories = ['All', 'Enterprise', 'Consumer', 'Government', 'Internal']

export default function Projects() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <section id="projects" className="py-24" aria-label="Projects section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px" style={{ background: 'var(--accent)' }} />
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
              Portfolio
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            Production Apps
          </h2>
          <p className="text-base max-w-xl" style={{ color: 'var(--text-secondary)' }}>
            Apps I&apos;ve built and shipped — from enterprise platforms to government systems to US startup products.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                background: active === cat ? 'var(--accent)' : 'var(--bg-card)',
                color: active === cat ? '#000' : 'var(--text-secondary)',
                border: `1px solid ${active === cat ? 'var(--accent)' : 'var(--border)'}`,
                fontFamily: 'var(--font-body)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <article
              key={project.id}
              className="group p-6 rounded-2xl flex flex-col transition-all duration-300 cursor-pointer"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${project.color}40`
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = `0 12px 40px ${project.color}15`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Color accent + category */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${project.color}15`, border: `1px solid ${project.color}30` }}
                >
                  <div className="w-3 h-3 rounded-full" style={{ background: project.color }} />
                </div>
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{
                    background: `${project.color}15`,
                    color: project.color,
                    border: `1px solid ${project.color}30`,
                  }}
                >
                  {project.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-bold text-lg mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                {project.name}
              </h3>
              <p className="text-xs mb-3 font-mono" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                {project.subtitle}
              </p>
              <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: 'var(--text-secondary)' }}>
                {project.description}
              </p>

              {/* Highlights */}
              <ul className="flex flex-col gap-1.5 mb-5">
                {project.highlights.slice(0, 2).map((h, i) => (
                  <li key={i} className="text-xs flex items-start gap-2" style={{ color: 'var(--text-secondary)' }}>
                    <span className="mt-1 w-1 h-1 rounded-full shrink-0" style={{ background: project.color }} />
                    {h}
                  </li>
                ))}
              </ul>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tech.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-0.5 rounded-md"
                    style={{
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {t}
                  </span>
                ))}
                {project.tech.length > 4 && (
                  <span className="text-xs px-2 py-0.5 rounded-md" style={{ color: 'var(--text-muted)' }}>
                    +{project.tech.length - 4}
                  </span>
                )}
              </div>

              {/* Period */}
              <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {project.period}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
