// components/sections/Skills.tsx
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

const skillCategories = [
  {
    label: 'Flutter & Mobile',
    emoji: '📱',
    key: 'mobile',
    skills: [
      {
        name: 'Flutter',
        level: 95,
        icon: 'https://cdn.simpleicons.org/flutter/54C5F8',
        desc: 'Primary framework',
        usage: 'Primary framework for all mobile apps — Tranzact, Ubuild, ZoreTime, White Tiger',
        proficiency: 5,
      },
      {
        name: 'Dart',
        level: 93,
        icon: 'https://cdn.simpleicons.org/dart/00B4AB',
        desc: 'Core language',
        usage: 'Primary language for all Flutter applications across 6+ production apps',
        proficiency: 5,
      },
      {
        name: 'Riverpod',
        level: 87,
        icon: 'https://cdn.simpleicons.org/flutter/54C5F8',
        desc: 'Reactive state mgmt',
        usage: 'Primary state management in Tranzact and Ubuild for efficient data flow and caching',
        proficiency: 5,
      },
      {
        name: 'Bloc / Cubit',
        level: 85,
        icon: 'https://cdn.simpleicons.org/flutter/54C5F8',
        desc: 'Event-driven state',
        usage: 'Used in ZoreTime and Task Management for predictable state transitions',
        proficiency: 4,
      },
      {
        name: 'GetX',
        level: 84,
        icon: 'https://cdn.simpleicons.org/flutter/54C5F8',
        desc: 'Rapid development',
        usage: 'Used in White Tiger and Rastafix for rapid development and efficient state management',
        proficiency: 4,
      },
      {
        name: 'Clean Architecture',
        level: 82,
        icon: 'https://cdn.simpleicons.org/android/3DDC84',
        desc: 'App architecture',
        usage: 'Implemented in Ubuild and Tranzact for scalable, testable app structure',
        proficiency: 4,
      },
    ],
  },
  {
    label: 'Backend & Cloud',
    emoji: '☁️',
    key: 'backend',
    skills: [
      {
        name: 'Firebase',
        level: 90,
        icon: 'https://cdn.simpleicons.org/firebase/FFCA28',
        desc: 'BaaS platform',
        usage: 'Extensive use across all projects — Auth, Firestore, Realtime DB, Functions, FCM, Crashlytics, Analytics, Remote Config',
        proficiency: 5,
      },
      {
        name: 'Node.js',
        level: 70,
        icon: 'https://cdn.simpleicons.org/nodedotjs/339933',
        desc: 'Server runtime',
        usage: 'Developing RESTful APIs for SplitEase and Task Manager — expense tracking, user groups, real-time data sync',
        proficiency: 4,
      },
      {
        name: 'MongoDB',
        level: 65,
        icon: 'https://cdn.simpleicons.org/mongodb/47A248',
        desc: 'NoSQL database',
        usage: 'Database management for applications requiring flexible schema and scalability',
        proficiency: 3,
      },
      {
        name: 'PostgreSQL',
        level: 62,
        icon: 'https://cdn.simpleicons.org/postgresql/4169E1',
        desc: 'Relational DB',
        usage: 'Structured data storage for enterprise apps requiring ACID compliance',
        proficiency: 3,
      },
      {
        name: 'AWS EC2',
        level: 65,
        icon: 'https://cdn.simpleicons.org/amazonwebservices/FF9900',
        desc: 'Cloud infra',
        usage: 'Cloud infrastructure and deployment for Calendar & Task Manager backend',
        proficiency: 3,
      },
      {
        name: 'SQFlite',
        level: 80,
        icon: 'https://cdn.simpleicons.org/sqlite/003B57',
        desc: 'Local storage',
        usage: 'Offline-first caching in Ubuild for field-worker usability without internet',
        proficiency: 4,
      },
    ],
  },
  {
    label: 'Tools & Platforms',
    emoji: '🛠️',
    key: 'tools',
    skills: [
      {
        name: 'Git / GitHub',
        level: 92,
        icon: 'https://cdn.simpleicons.org/github/ffffff',
        desc: 'Version control',
        usage: 'Version control for all projects — collaboration, code review, and management',
        proficiency: 5,
      },
      {
        name: 'Postman',
        level: 88,
        icon: 'https://cdn.simpleicons.org/postman/FF6C37',
        desc: 'API testing',
        usage: 'API testing, debugging, and documentation for all backend integrations',
        proficiency: 4,
      },
      {
        name: 'Docker',
        level: 60,
        icon: 'https://cdn.simpleicons.org/docker/2496ED',
        desc: 'Containerization',
        usage: 'Containerization of backend services for consistent deployment across environments',
        proficiency: 3,
      },
      {
        name: 'Jenkins',
        level: 65,
        icon: 'https://cdn.simpleicons.org/jenkins/D24939',
        desc: 'CI/CD pipelines',
        usage: 'Established CI/CD pipelines cutting manual release effort by ~40% at Antino Labs',
        proficiency: 3,
      },
      {
        name: 'Figma',
        level: 72,
        icon: 'https://cdn.simpleicons.org/figma/F24E1E',
        desc: 'UI/UX design',
        usage: 'UI/UX design, prototyping, and collaboration with design teams across projects',
        proficiency: 3,
      },
      {
        name: 'Google Maps SDK',
        level: 85,
        icon: 'https://cdn.simpleicons.org/googlemaps/4285F4',
        desc: 'Location services',
        usage: 'Real-time gym discovery and location-based features in ZoreTime app',
        proficiency: 4,
      },
    ],
  },
]

const toolTags = [
  { name: 'Android Studio', icon: 'https://cdn.simpleicons.org/androidstudio/3DDC84' },
  { name: 'VS Code', icon: 'https://cdn.simpleicons.org/visualstudiocode/007ACC' },
  { name: 'Xcode', icon: 'https://cdn.simpleicons.org/xcode/147EFB' },
  { name: 'Fastlane', icon: 'https://cdn.simpleicons.org/fastlane/00F200' },
  { name: 'Shorebird', icon: 'https://cdn.simpleicons.org/flutter/54C5F8' },
  { name: 'Firebase Console', icon: 'https://cdn.simpleicons.org/firebase/FFCA28' },
  { name: 'Play Console', icon: 'https://cdn.simpleicons.org/googleplay/3DDC84' },
  { name: 'App Store Connect', icon: 'https://cdn.simpleicons.org/apple/f0f0f0' },
  { name: 'Jira', icon: 'https://cdn.simpleicons.org/jira/0052CC' },
  { name: 'GitHub Actions', icon: 'https://cdn.simpleicons.org/githubactions/2088FF' },
  { name: 'Postman', icon: 'https://cdn.simpleicons.org/postman/FF6C37' },
  { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED' },
]

function ProficiencyStars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill={i < count ? '#FBBF24' : 'none'}
          stroke="#FBBF24"
          strokeWidth="2"
          style={{ opacity: i < count ? 1 : 0.3 }}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

function SkillCard({
  skill,
  index,
}: {
  skill: (typeof skillCategories)[0]['skills'][0]
  index: number
}) {
  const [hovered, setHovered] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="group relative p-4 rounded-2xl transition-all duration-300 cursor-default"
        style={{
          background: hovered ? 'var(--bg-secondary)' : 'var(--bg-card)',
          border: `1px solid ${hovered ? 'rgba(0,212,255,0.35)' : 'var(--border)'}`,
          transform: hovered ? 'translateY(-5px) scale(1.01)' : 'translateY(0) scale(1)',
          boxShadow: hovered ? '0 16px 40px rgba(0,212,255,0.12)' : 'none',
        }}
        onMouseEnter={() => { setHovered(true); setShowTooltip(true) }}
        onMouseLeave={() => { setHovered(false); setShowTooltip(false) }}
      >
        {/* Icon + Name row */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 relative overflow-hidden"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={skill.icon}
              alt={skill.name}
              width={22}
              height={22}
              className="object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                const fb = e.currentTarget.nextElementSibling as HTMLElement
                if (fb) fb.style.display = 'flex'
              }}
            />
            <span
              className="absolute inset-0 items-center justify-center text-xs font-bold hidden"
              style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
            >
              {skill.name.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
              {skill.name}
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {skill.desc}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <span className="text-xs font-mono font-bold" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
              {skill.level}%
            </span>
            <ProficiencyStars count={skill.proficiency} />
          </div>
        </div>

        {/* Animated progress bar */}
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: index * 0.07 + 0.2, ease: 'easeOut' }}
            style={{ background: 'linear-gradient(90deg, var(--accent), #A855F7)' }}
          />
        </div>

        {/* Usage tooltip on hover */}
        {showTooltip && (
          <div
            className="absolute bottom-full left-0 right-0 mb-2 p-3 rounded-xl z-10 text-xs leading-relaxed"
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              fontFamily: 'var(--font-body)',
            }}
          >
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Where I used it: </span>
            {skill.usage}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState('mobile')
  const active = skillCategories.find((c) => c.key === activeTab)!

  return (
    <section id="skills" className="py-24" aria-label="Skills section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px" style={{ background: 'var(--accent)' }} />
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
              Technical Skills
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            Tech Stack
          </h2>
          <p className="text-base max-w-xl" style={{ color: 'var(--text-secondary)' }}>
            Technologies I use daily to build fast, reliable, and scalable cross-platform apps.{' '}
            <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.8em' }}>
              Hover a card to see where I&apos;ve used it →
            </span>
          </p>
        </motion.div>

        {/* Flutter focus spotlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-6 rounded-2xl mb-10"
          style={{
            background: 'linear-gradient(135deg, rgba(84,197,248,0.08) 0%, rgba(168,85,247,0.08) 100%)',
            border: '1px solid rgba(84,197,248,0.2)',
          }}
        >
          <div className="flex flex-wrap items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://cdn.simpleicons.org/flutter/54C5F8" alt="Flutter" width={48} height={48} />
            <div className="flex-1">
              <p className="font-bold text-lg" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                Flutter — Primary Expertise
              </p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                6 production apps shipped · Riverpod, Bloc &amp; GetX · Clean Architecture · CI/CD · 10K+ users
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {['iOS', 'Android', 'macOS', 'Web'].map((p) => (
                <span
                  key={p}
                  className="px-3 py-1 rounded-lg text-xs font-medium"
                  style={{ background: 'rgba(84,197,248,0.12)', color: '#54C5F8', border: '1px solid rgba(84,197,248,0.25)', fontFamily: 'var(--font-mono)' }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tab row */}
        <div className="flex flex-wrap gap-2 mb-8">
          {skillCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                background: activeTab === cat.key ? 'var(--accent)' : 'var(--bg-card)',
                color: activeTab === cat.key ? '#000' : 'var(--text-secondary)',
                border: `1px solid ${activeTab === cat.key ? 'var(--accent)' : 'var(--border)'}`,
                fontFamily: 'var(--font-body)',
              }}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {active.skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>

        {/* Tools row */}
        <div
          className="p-6 rounded-2xl"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <h3 className="font-bold text-base mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            <span style={{ color: 'var(--accent)' }}>⚙️</span> Tools &amp; Platforms
          </h3>
          <div className="flex flex-wrap gap-2">
            {toolTags.map((tool) => (
              <span
                key={tool.name}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={tool.icon} alt={tool.name} width={12} height={12} className="object-contain" />
                {tool.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
