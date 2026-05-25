'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, webProjects } from '@/data/portfolio'

const tabs = [
  { id: 'flutter', label: 'Flutter & Mobile', icon: '📱', count: projects.length },
  { id: 'web', label: 'WordPress & Web', icon: '🌐', count: webProjects.length },
]

const categoryColors: Record<string, string> = {
  Enterprise: '#00D4FF',
  Consumer: '#10B981',
  Government: '#EF4444',
  Internal: '#8B5CF6',
  Personal: '#38BDF8',
}

const techIconMap: Record<string, string> = {
  Flutter: 'https://cdn.simpleicons.org/flutter/54C5F8',
  Dart: 'https://cdn.simpleicons.org/dart/00B4AB',
  Firebase: 'https://cdn.simpleicons.org/firebase/FFCA28',
  Riverpod: 'https://cdn.simpleicons.org/flutter/54C5F8',
  GetX: 'https://cdn.simpleicons.org/flutter/54C5F8',
  Bloc: 'https://cdn.simpleicons.org/flutter/54C5F8',
  FastAPI: 'https://cdn.simpleicons.org/fastapi/009688',
  Supabase: 'https://cdn.simpleicons.org/supabase/3ECF8E',
  ARKit: 'https://cdn.simpleicons.org/apple/9CA3AF',
  ARCore: 'https://cdn.simpleicons.org/android/3DDC84',
  'Node.js': 'https://cdn.simpleicons.org/nodedotjs/339933',
  'AWS EC2': 'https://cdn.simpleicons.org/amazonaws/FF9900',
  WordPress: 'https://cdn.simpleicons.org/wordpress/21759B',
  PHP: 'https://cdn.simpleicons.org/php/777BB4',
}

const storeLinksMap: Record<string, { play?: string; appstore?: string }> = {
  tranzact: {
    play: 'https://play.google.com/store/apps/details?id=com.letstranzact.app',
    appstore: 'https://apps.apple.com/in/app/tranzact-lite/id1624875596',
  },
  ubuild: {
    play: 'https://play.google.com/store/apps/details?id=com.alstore.ubuild',
  },
  luvia: {
    appstore: 'https://apps.apple.com/us/app/luvia-style/id6761775149',
    play: 'https://play.google.com/store',
  },
}

function FlutterProjectRow({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  const [hovered, setHovered] = useState(false)
  const catColor = categoryColors[project.category] || 'var(--accent)'
  const links = storeLinksMap[project.id] || {}

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-2xl transition-all duration-200 group"
      style={{
        background: hovered ? 'var(--bg-secondary)' : 'var(--bg-card)',
        border: `1px solid ${hovered ? catColor + '40' : 'var(--border)'}`,
        boxShadow: hovered ? `0 8px 24px ${catColor}12` : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left accent bar */}
      <div
        className="hidden sm:block w-1 h-10 rounded-full shrink-0 transition-all duration-200"
        style={{ background: hovered ? catColor : 'var(--border)' }}
      />

      {/* Name + subtitle */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
          <p
            className="font-semibold text-sm"
            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
          >
            {project.name}
          </p>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{
              background: catColor + '18',
              color: catColor,
              border: `1px solid ${catColor}30`,
              fontFamily: 'var(--font-mono)',
            }}
          >
            {project.category}
          </span>
        </div>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {project.subtitle}
        </p>
      </div>

      {/* Tech stack pills */}
      <div className="flex flex-wrap gap-1.5 sm:justify-end">
        {project.tech.slice(0, 4).map((t) => (
          <span
            key={t}
            className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs"
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {techIconMap[t] && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={techIconMap[t]} alt={t} width={10} height={10} className="object-contain" />
            )}
            {t}
          </span>
        ))}
        {project.tech.length > 4 && (
          <span className="text-xs px-2 py-0.5" style={{ color: 'var(--text-muted)' }}>
            +{project.tech.length - 4}
          </span>
        )}
      </div>

      {/* Store links */}
      <div className="flex gap-2 shrink-0">
        {links.play && (
          <a
            href={links.play}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
            style={{
              background: 'rgba(61,220,132,0.1)',
              color: '#3DDC84',
              border: '1px solid rgba(61,220,132,0.2)',
              textDecoration: 'none',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://cdn.simpleicons.org/googleplay/3DDC84" alt="Play" width={12} height={12} />
            <span className="hidden sm:inline">Play</span>
          </a>
        )}
        {links.appstore && (
          <a
            href={links.appstore}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
            style={{
              background: 'rgba(255,255,255,0.06)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border)',
              textDecoration: 'none',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://cdn.simpleicons.org/apple/9CA3AF" alt="App Store" width={12} height={12} />
            <span className="hidden sm:inline">iOS</span>
          </a>
        )}
        {/* Period */}
        <span
          className="hidden lg:flex items-center text-xs px-2 py-1 rounded-lg"
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', background: 'var(--bg-secondary)' }}
        >
          {project.period}
        </span>
      </div>
    </motion.div>
  )
}

function WebProjectCard({
  project,
  index,
}: {
  project: (typeof webProjects)[0]
  index: number
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <article
        className="p-6 rounded-2xl h-full flex flex-col transition-all duration-300"
        style={{
          background: 'var(--bg-card)',
          border: `1px solid ${hovered ? project.color + '50' : 'var(--border)'}`,
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: hovered ? `0 20px 50px ${project.color}14` : 'none',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Top accent */}
        <div
          className="h-1 -mx-6 -mt-6 mb-6 rounded-t-2xl"
          style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}40)` }}
        />

        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-xl font-bold"
            style={{
              background: project.color + '18',
              border: `1px solid ${project.color}30`,
              color: project.color,
              fontFamily: 'var(--font-display)',
            }}
          >
            W
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className="font-bold text-lg leading-tight"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            >
              {project.name}
            </h3>
            <p className="text-xs mt-0.5" style={{ color: project.color, fontFamily: 'var(--font-mono)' }}>
              {project.subtitle}
            </p>
          </div>
          <span
            className="text-xs px-2.5 py-1 rounded-full font-medium shrink-0"
            style={{
              background: project.color + '15',
              color: project.color,
              border: `1px solid ${project.color}30`,
              fontFamily: 'var(--font-mono)',
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: 'var(--text-secondary)' }}>
          {project.description}
        </p>

        {/* Highlights */}
        <ul className="flex flex-col gap-2 mb-5">
          {project.highlights.map((h, i) => (
            <li key={i} className="text-xs flex items-start gap-2" style={{ color: 'var(--text-secondary)' }}>
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: project.color }} />
              {h}
            </li>
          ))}
        </ul>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {techIconMap[t] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={techIconMap[t]} alt={t} width={11} height={11} className="object-contain" />
              )}
              {t}
            </span>
          ))}
        </div>

        {/* Visit site button */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 mt-auto"
          style={{
            background: project.color + '15',
            color: project.color,
            border: `1px solid ${project.color}30`,
            textDecoration: 'none',
            fontFamily: 'var(--font-display)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = project.color + '28')}
          onMouseLeave={(e) => (e.currentTarget.style.background = project.color + '15')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
          </svg>
          Visit Live Site
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </article>
    </motion.div>
  )
}

export default function WorksByStack() {
  const [activeTab, setActiveTab] = useState('flutter')

  return (
    <section id="works" className="py-24" aria-label="Works by technology stack">
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
            <span
              className="text-xs font-mono uppercase tracking-widest"
              style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
            >
              All Work
            </span>
          </div>
          <h2
            className="text-3xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            Work By Stack
          </h2>
          <p className="text-base max-w-xl" style={{ color: 'var(--text-secondary)' }}>
            I work across multiple technology stacks — from Flutter mobile apps to WordPress websites.
            Here&apos;s everything, organised by tech.
          </p>
        </motion.div>

        {/* Tech stack summary chips */}
        <motion.div
          className="flex flex-wrap gap-3 mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          {[
            { label: 'Flutter / Dart', color: '#54C5F8', icon: 'https://cdn.simpleicons.org/flutter/54C5F8', count: `${projects.length} apps` },
            { label: 'Firebase', color: '#FFCA28', icon: 'https://cdn.simpleicons.org/firebase/FFCA28', count: '6+ integrations' },
            { label: 'WordPress / PHP', color: '#21759B', icon: 'https://cdn.simpleicons.org/wordpress/21759B', count: `${webProjects.length} sites` },
            { label: 'FastAPI / Supabase', color: '#009688', icon: 'https://cdn.simpleicons.org/fastapi/009688', count: '1 project' },
            { label: 'ARKit / ARCore', color: '#00E5FF', icon: 'https://cdn.simpleicons.org/apple/00E5FF', count: 'Luvia Style' },
            { label: 'Node.js / AWS', color: '#339933', icon: 'https://cdn.simpleicons.org/nodedotjs/339933', count: '1 project' },
          ].map((stack) => (
            <div
              key={stack.label}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium"
              style={{
                background: stack.color + '12',
                border: `1px solid ${stack.color}25`,
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={stack.icon} alt={stack.label} width={14} height={14} className="object-contain" />
              <span style={{ color: 'var(--text-primary)' }}>{stack.label}</span>
              <span style={{ color: stack.color }}>{stack.count}</span>
            </div>
          ))}
        </motion.div>

        {/* Tab bar */}
        <motion.div
          className="flex gap-2 mb-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                background: activeTab === tab.id ? 'var(--accent)' : 'var(--bg-card)',
                color: activeTab === tab.id ? '#000' : 'var(--text-secondary)',
                border: `1px solid ${activeTab === tab.id ? 'var(--accent)' : 'var(--border)'}`,
                fontFamily: 'var(--font-display)',
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
              <span
                className="text-xs px-1.5 py-0.5 rounded-md font-mono"
                style={{
                  background: activeTab === tab.id ? 'rgba(0,0,0,0.15)' : 'var(--bg-secondary)',
                  color: activeTab === tab.id ? '#000' : 'var(--text-muted)',
                }}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeTab === 'flutter' && (
            <motion.div
              key="flutter"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {/* Flutter projects compact list */}
              <div className="flex flex-col gap-3">
                {projects.map((project, i) => (
                  <FlutterProjectRow key={project.id} project={project} index={i} />
                ))}
              </div>

              {/* View details CTA */}
              <div className="mt-8 flex items-center gap-4">
                <a
                  href="#featured"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{
                    background: 'var(--accent)',
                    color: '#000',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-display)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  View Featured Apps
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{
                    background: 'var(--bg-card)',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-display)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent)'
                    e.currentTarget.style.color = 'var(--accent)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.color = 'var(--text-secondary)'
                  }}
                >
                  Detailed Project View
                </a>
              </div>
            </motion.div>
          )}

          {activeTab === 'web' && (
            <motion.div
              key="web"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {/* WordPress info banner */}
              <div
                className="flex items-center gap-4 p-4 rounded-2xl mb-6"
                style={{
                  background: 'linear-gradient(135deg, rgba(33,117,155,0.08) 0%, rgba(119,107,180,0.08) 100%)',
                  border: '1px solid rgba(33,117,155,0.2)',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://cdn.simpleicons.org/wordpress/21759B" alt="WordPress" width={36} height={36} />
                <div>
                  <p className="font-semibold text-sm" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                    WordPress — Freelance Work
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                    Custom theme development, responsive design, SEO — delivered for real clients.
                  </p>
                </div>
              </div>

              {/* Web project cards */}
              <div className="grid sm:grid-cols-2 gap-6">
                {webProjects.map((project, i) => (
                  <WebProjectCard key={project.id} project={project} index={i} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
