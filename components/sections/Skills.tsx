// components/sections/Skills.tsx
import { skills } from '@/data/portfolio'

function SkillBar({ name, level, icon }: { name: string; level: number; icon: string }) {
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span>{icon}</span>
          <span className="text-sm font-medium" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>
            {name}
          </span>
        </div>
        <span className="text-xs font-mono" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
          {level}%
        </span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: `${level}%`,
            background: `linear-gradient(90deg, var(--accent), #A855F7)`,
          }}
        />
      </div>
    </div>
  )
}

function Tag({ label }: { label: string }) {
  return (
    <span
      className="px-3 py-1.5 rounded-lg text-xs font-medium"
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        color: 'var(--text-secondary)',
        fontFamily: 'var(--font-mono)',
      }}
    >
      {label}
    </span>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-24" aria-label="Skills section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px" style={{ background: 'var(--accent)' }} />
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
              Technical Skills
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            Tech Stack
          </h2>
          <p className="mt-3 text-base max-w-xl" style={{ color: 'var(--text-secondary)' }}>
            Technologies I use to build fast, reliable, and scalable mobile applications.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Core Flutter Skills */}
          <div
            className="p-6 rounded-2xl"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              <span style={{ color: 'var(--accent)' }}>📱</span> Core & Flutter
            </h3>
            <div className="flex flex-col gap-4">
              {skills.core.map((skill) => (
                <SkillBar key={skill.name} {...skill} />
              ))}
            </div>
          </div>

          {/* Backend & Cloud */}
          <div
            className="p-6 rounded-2xl"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              <span style={{ color: 'var(--accent)' }}>☁️</span> Backend & Cloud
            </h3>
            <div className="flex flex-col gap-4">
              {skills.backend.map((skill) => (
                <SkillBar key={skill.name} {...skill} />
              ))}
            </div>
          </div>
        </div>

        {/* Tools */}
        <div
          className="mt-8 p-6 rounded-2xl"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <h3 className="font-bold text-lg mb-5 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            <span style={{ color: 'var(--accent)' }}>🛠️</span> Tools & Platforms
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.tools.map((tool) => (
              <Tag key={tool} label={tool} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
