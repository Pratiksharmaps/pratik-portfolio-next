// components/sections/Projects.tsx
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '@/data/portfolio'

const categories = ['All', 'Enterprise', 'Consumer', 'Government', 'Internal']

// Full store links extracted from works_section.dart
const storeLinks: Record<string, { play?: string; appstore?: string; github?: string }> = {
  tranzact: {
    play: 'https://play.google.com/store/apps/details?id=com.letstranzact.app&pcampaignid=web_share',
    appstore: 'https://apps.apple.com/in/app/tranzact-lite/id1624875596',
  },
  ubuild: {
    play: 'https://play.google.com/store/apps/details?id=com.alstore.ubuild&pcampaignid=web_share',
  },
  zoretime: {},
  'calendar-task': {},
  'white-tiger': {},
  rastafix: {},
  luvia: {
    appstore: 'https://apps.apple.com/us/app/luvia-style/id6761775149',
    play: 'https://play.google.com/store',
  },
}

// All personal projects from personal_projects_section.dart
const personalProjects = [
  {
    id: 'splitease',
    name: 'SplitEase',
    subtitle: 'Group Expense Sharing Platform',
    description: 'A comprehensive expense sharing mobile application built with Flutter, integrated with a robust Node.js and Express backend.',
    highlights: [
      'Split bills and track group expenses in real-time',
      'Clean MVVM architecture with secure state management',
      'Node.js / Express backend repository: splitEase_backend',
    ],
    tech: ['Flutter', 'Dart', 'Node.js', 'Express.js', 'REST APIs'],
    period: 'Personal Project',
    category: 'Personal',
    color: '#10B981',
    github: 'https://github.com/Pratiksharmaps/SplitEase_flutter',
  },
  {
    id: 'ai-astrology',
    name: 'AI Astrology App',
    subtitle: 'Personalized Readings & Horoscope',
    description: 'An AI-powered astrology and horoscope application using Flutter and a FastAPI backend.',
    highlights: [
      'Currently under active development',
      'Personalized charts and astrological calculations',
      'Built using Cursor AI editor with FastAPI server backend',
    ],
    tech: ['Flutter', 'Dart', 'FastAPI', 'AI Tools'],
    period: 'Under Development',
    category: 'Personal',
    color: '#8B5CF6',
  },
  {
    id: 'linkedin-extractor',
    name: 'AI LinkedIn Extractor',
    subtitle: 'Screenshot to Job Sheet Pipeline',
    description: 'An AI-powered Python tool that processes LinkedIn screenshots using local LLMs to extract job details and populate tracking sheets automatically.',
    highlights: [
      'Local LLaVA vision model via Ollama for privacy',
      'Extracts Role, Company, URL, and description',
      'Prevents forgetting to apply to screenshotted jobs',
    ],
    tech: ['Python', 'Ollama', 'LLaVA LLM', 'AI Tools'],
    period: 'Personal Project',
    category: 'Personal',
    color: '#F59E0B',
    github: 'https://github.com/Pratiksharmaps/LinkedIn_job_extracter',
  },
  {
    id: 'relax-stay',
    name: 'Relax Stay',
    subtitle: 'Hotel Presentation Website',
    description: 'A hotel presentation and booking website built in Next.js using AI design tools to craft a modern glassmorphic look.',
    highlights: [
      'Clean room presentations and details layout',
      'Modern aesthetics designed using AI prompts',
      'Optimized loading times and responsive grid layout',
    ],
    tech: ['Next.js', 'React', 'Tailwind CSS', 'AI Tools'],
    period: 'Personal Project',
    category: 'Built with AI',
    color: '#F59E0B',
    github: 'https://github.com/Pratiksharmaps/relax-stay',
    link: 'https://relax-stay.vercel.app',
  },
  {
    id: 'glide-scape',
    name: 'Glide Scape',
    subtitle: 'Client Portfolio & Biography',
    description: 'A premium biographical presentation and portfolio website built for a client using Next.js and smooth Framer Motion animations.',
    highlights: [
      'Interactive Framer Motion page transitions',
      'Bespoke layout showcasing client biography and work',
      'Fully responsive UI with performance optimization',
    ],
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'AI Tools'],
    period: 'Client Project',
    category: 'Built with AI',
    color: '#A855F7',
    github: 'https://github.com/Pratiksharmaps/GlideScape.git',
    link: 'https://glide-scape.vercel.app/',
  },
  {
    id: 'portfolio-v2',
    name: 'AI-Augmented Portfolio',
    subtitle: 'My Personal Website',
    description: 'My professional portfolio website built in Next.js and styled with custom CSS, built cooperatively with advanced agentic AI coding assistants.',
    highlights: [
      'Next.js SSR & ISR architecture',
      'Responsive design system',
      '100% built and iterated using Cursor & ChatGPT',
    ],
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'AI Tools'],
    period: 'Active',
    category: 'Built with AI',
    color: '#00D4FF',
    github: 'https://github.com/Pratiksharmaps/pratik-portfolio-next',
    link: 'https://pratik-portfolio-oevs.vercel.app',
  },
  {
    id: 'weather',
    name: 'Weather App',
    subtitle: 'Real-time Weather',
    description: 'Provides current conditions, animated weather icons, detailed forecasts, and location search using OpenWeather API.',
    highlights: [
      'Real-time weather info with location services',
      'Animated weather icons and detailed forecasts',
      'Location-based weather data with search',
    ],
    tech: ['Flutter', 'Dart', 'OpenWeather API', 'Provider'],
    period: 'Personal Project',
    category: 'Personal',
    color: '#38BDF8',
    github: 'https://github.com/Pratiksharmaps/weather_report.git',
  },
  {
    id: 'ai-buddy',
    name: 'AI Buddy',
    subtitle: 'Gemini AI Chat Assistant',
    description: 'AI-powered chat assistant integrated using Google\'s Gemini API. Real-time, context-aware answers with streaming responses.',
    highlights: [
      'Gemini API integration with streaming responses',
      'Intuitive chat UI for real-time Q&A',
      'Firebase backend for user data persistence',
    ],
    tech: ['Flutter', 'Dart', 'Gemini API', 'Firebase', 'Provider'],
    period: 'Personal Project',
    category: 'Personal',
    color: '#A855F7',
    github: 'https://github.com/Pratiksharmaps/ai_buddy.git',
  },
]

const techIcons: Record<string, string> = {
  Flutter: 'https://cdn.simpleicons.org/flutter/54C5F8',
  Dart: 'https://cdn.simpleicons.org/dart/00B4AB',
  Firebase: 'https://cdn.simpleicons.org/firebase/FFCA28',
  Riverpod: 'https://cdn.simpleicons.org/flutter/54C5F8',
  'REST APIs': 'https://cdn.simpleicons.org/fastapi/009688',
  'Secure Storage': 'https://cdn.simpleicons.org/letsencrypt/003A70',
  Firestore: 'https://cdn.simpleicons.org/firebase/FFCA28',
  GetX: 'https://cdn.simpleicons.org/flutter/54C5F8',
  SQFlite: 'https://cdn.simpleicons.org/sqlite/003B57',
  'Clean Architecture': 'https://cdn.simpleicons.org/android/3DDC84',
  'Google Maps SDK': 'https://cdn.simpleicons.org/googlemaps/4285F4',
  'Apple HealthKit': 'https://cdn.simpleicons.org/apple/9CA3AF',
  'Bloc/Cubit': 'https://cdn.simpleicons.org/flutter/54C5F8',
  Bloc: 'https://cdn.simpleicons.org/flutter/54C5F8',
  'Node.js': 'https://cdn.simpleicons.org/nodedotjs/339933',
  'AWS EC2': 'https://zenn.dev/pyteyon/scraps/c64c1529a2218e',
  'Google Calendar API': 'https://cdn.simpleicons.org/googlecalendar/4285F4',
  'Express.js': 'https://cdn.simpleicons.org/express/9CA3AF',
  'Face Recognition APIs': 'https://cdn.simpleicons.org/opencv/5C3EE8',
  'Push Notifications': 'https://cdn.simpleicons.org/firebase/FFCA28',
  'Gemini API': 'https://cdn.simpleicons.org/googlegemini/8E75B2',
  Provider: 'https://cdn.simpleicons.org/flutter/54C5F8',
  'OpenWeather API': 'https://cdn.simpleicons.org/openweathermap/EB6E4B',
  FastAPI: 'https://cdn.simpleicons.org/fastapi/009688',
  Supabase: 'https://cdn.simpleicons.org/supabase/3ECF8E',
  ARKit: 'https://cdn.simpleicons.org/apple/9CA3AF',
  ARCore: 'https://cdn.simpleicons.org/android/3DDC84',
  'Streaming API': 'https://cdn.simpleicons.org/fastapi/009688',
  Python: 'https://cdn.simpleicons.org/python/3776AB',
  Ollama: 'https://cdn.simpleicons.org/ollama/ffffff',
  'LLaVA LLM': 'https://cdn.simpleicons.org/openai/412991',
  'AI Tools': 'https://cdn.simpleicons.org/openai/00A67E',
  'Next.js': 'https://cdn.simpleicons.org/nextdotjs/ffffff',
  React: 'https://cdn.simpleicons.org/react/61DAFB',
  'Tailwind CSS': 'https://cdn.simpleicons.org/tailwindcss/06B6D4',
  'Framer Motion': 'https://cdn.simpleicons.org/framer/0055FF',
}

function TechBadge({ tech }: { tech: string }) {
  const icon = techIcons[tech]
  return (
    <span
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium"
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-mono)',
      }}
    >
      {icon && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={icon}
          alt={tech}
          width={12}
          height={12}
          className="object-contain"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
      )}
      {tech}
    </span>
  )
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [hovered, setHovered] = useState(false)
  const links = storeLinks[project.id] || {}

  return (
    <article
      className="flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${hovered ? project.color + '50' : 'var(--border)'}`,
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? `0 20px 60px ${project.color}18` : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent bar */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}60)` }} />

      <div className="p-6 flex flex-col flex-1">
        {/* Category chip + featured */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{
              background: `${project.color}15`,
              color: project.color,
              border: `1px solid ${project.color}30`,
              fontFamily: 'var(--font-mono)',
            }}
          >
            {project.category}
          </span>
          {(project as any).featured && (
            <span
              className="text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1"
              style={{ background: 'rgba(251,191,36,0.12)', color: '#FBBF24', border: '1px solid rgba(251,191,36,0.25)', fontFamily: 'var(--font-mono)' }}
            >
              ⭐ Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-bold text-xl mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
          {project.name}
        </h3>
        <p className="text-xs mb-3 font-mono" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
          {project.subtitle}
        </p>
        <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: 'var(--text-secondary)' }}>
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

        {/* Tech stack with icons */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.slice(0, 5).map((t) => (
            <TechBadge key={t} tech={t} />
          ))}
          {project.tech.length > 5 && (
            <span className="text-xs px-2 py-1 rounded-md" style={{ color: 'var(--text-muted)' }}>
              +{project.tech.length - 5}
            </span>
          )}
        </div>

        {/* Period */}
        <p className="text-xs mb-4" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          📅 {project.period}
        </p>

        {/* Store links */}
        {(links.play || links.appstore || links.github) && (
          <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
            {links.play && (
              <a
                href={links.play}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
                style={{
                  background: 'rgba(61,220,132,0.1)',
                  color: '#3DDC84',
                  border: '1px solid rgba(61,220,132,0.25)',
                  fontFamily: 'var(--font-body)',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(61,220,132,0.2)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(61,220,132,0.1)')}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://cdn.simpleicons.org/googleplay/3DDC84" alt="Play Store" width={14} height={14} />
                Play Store
              </a>
            )}
            {links.appstore && (
              <a
                href={links.appstore}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border)',
                  fontFamily: 'var(--font-body)',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://cdn.simpleicons.org/apple/f0f0f0" alt="App Store" width={14} height={14} />
                App Store
              </a>
            )}
            {links.github && (
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border)',
                  fontFamily: 'var(--font-body)',
                  textDecoration: 'none',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://cdn.simpleicons.org/github/f0f0f0" alt="GitHub" width={14} height={14} />
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

function PersonalProjectCard({ project }: { project: typeof personalProjects[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <article
      className="flex flex-col rounded-2xl overflow-hidden transition-all duration-300 h-full"
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${hovered ? project.color + '50' : 'var(--border)'}`,
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hovered ? `0 16px 40px ${project.color}15` : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}60)` }} />
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{
              background: `${project.color}15`,
              color: project.color,
              border: `1px solid ${project.color}30`,
              fontFamily: 'var(--font-mono)',
            }}
          >
            {project.category}
          </span>
        </div>
        <h3 className="font-bold text-lg mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
          {project.name}
        </h3>
        <p className="text-xs mb-3" style={{ color: project.color, fontFamily: 'var(--font-mono)' }}>
          {project.subtitle}
        </p>
        <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: 'var(--text-secondary)' }}>
          {project.description}
        </p>
        <ul className="flex flex-col gap-1.5 mb-4">
          {project.highlights.map((h, i) => (
            <li key={i} className="text-xs flex items-start gap-2" style={{ color: 'var(--text-secondary)' }}>
              <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: project.color }} />
              {h}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <TechBadge key={t} tech={t} />
          ))}
        </div>

        {/* Action buttons */}
        {(project.github || (project as any).link) && (
          <div className="flex gap-2.5 mt-auto pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-display)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://cdn.simpleicons.org/github/f0f0f0" alt="GitHub" width={12} height={12} />
                Code
              </a>
            )}
            {(project as any).link && (
              <a
                href={(project as any).link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
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
                Live Site
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export default function Projects() {
  const [active, setActive] = useState('All')
  const [showPersonal, setShowPersonal] = useState(true)
  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <section id="projects" className="py-24" aria-label="Projects section">
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
              Portfolio
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            Production Apps
          </h2>
          <p className="text-base max-w-xl" style={{ color: 'var(--text-secondary)' }}>
            Apps I&apos;ve built and shipped — from enterprise platforms to government systems to US startup products.
          </p>
        </motion.div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
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

        {/* Production Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                layout
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Personal Projects toggle */}
        <div id="personal-projects" className="mt-14 pt-8">
          <button
            onClick={() => setShowPersonal(!showPersonal)}
            className="flex items-center gap-3 mb-8 group"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-px" style={{ background: 'var(--accent)' }} />
                <span className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                  Personal Projects
                </span>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{
                  color: 'var(--accent)',
                  transform: showPersonal ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                }}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          <AnimatePresence>
            {showPersonal && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
                  Open source experiments, AI-assisted web platforms, and native utility tools.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {personalProjects.map((project, i) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                    >
                      <PersonalProjectCard project={project} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* GitHub CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/Pratiksharmaps"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-200"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontFamily: 'var(--font-display)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.boxShadow = '0 0 20px var(--accent-glow)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://cdn.simpleicons.org/github/f0f0f0" alt="GitHub" width={20} height={20} />
            View All on GitHub
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
