// components/sections/FeaturedWorks.tsx
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

const featuredProjects = [
  {
    id: 'tranzact',
    name: 'Tranzact Lite',
    subtitle: 'Document, Inventory & Business Management',
    tagline: 'A cross-platform enterprise platform built for real users at scale.',
    description:
      'Built a lightweight business management app for small and medium enterprises. Supports document handling, inventory tracking, and marketing notifications. Powered by Firebase for real-time data sync and Riverpod for efficient state management.',
    color: '#00D4FF',
    accentGlow: 'rgba(0,212,255,0.15)',
    icon: 'https://cdn.simpleicons.org/flutter/54C5F8',
    category: 'Enterprise · Live on Stores',
    metrics: [
      { label: 'API Speed', value: '−80%', desc: '8s → <2s load time' },
      { label: 'Crash Rate', value: '−60%', desc: 'Post-launch stability' },
      { label: 'Users', value: '10K+', desc: 'Active end users' },
    ],
    highlights: [
      'Real-time inventory and order updates using Firebase Firestore',
      'Clean, scalable architecture powered by Riverpod state management',
      'Push notifications and marketing notification system',
      'AES-encrypted local storage with role-based access control',
      'Deployed to both App Store & Play Store with zero rollbacks',
    ],
    tech: ['Flutter', 'Firebase', 'Riverpod', 'Firestore', 'FCM', 'Crashlytics'],
    techIcons: [
      { name: 'Flutter', icon: 'https://cdn.simpleicons.org/flutter/54C5F8' },
      { name: 'Firebase', icon: 'https://cdn.simpleicons.org/firebase/FFCA28' },
      { name: 'Dart', icon: 'https://cdn.simpleicons.org/dart/00B4AB' },
    ],
    links: {
      play: 'https://play.google.com/store/apps/details?id=com.letstranzact.app&pcampaignid=web_share',
      appstore: 'https://apps.apple.com/in/app/tranzact-lite/id1624875596',
    },
    status: 'Live',
    statusColor: '#10B981',
  },
  {
    id: 'ubuild',
    name: 'Ubuild',
    subtitle: 'Simplify Construction',
    tagline: 'Marketplace connecting suppliers, contractors and customers.',
    description:
      'End-to-end construction project management app built from scratch using Clean Architecture. Connects suppliers, contractors, and customers in a unified ecosystem with real-time updates and push notifications.',
    color: '#F59E0B',
    accentGlow: 'rgba(245,158,11,0.15)',
    icon: 'https://cdn.simpleicons.org/android/3DDC84',
    category: 'Enterprise · Construction Tech',
    metrics: [
      { label: 'Crash Rate', value: '−60%', desc: '15+/day → under 6/day' },
      { label: 'Releases', value: '4', desc: 'Zero Play Store rollbacks' },
      { label: 'Platform', value: '2', desc: 'iOS + Android stores' },
    ],
    highlights: [
      'Material listings, service provider profiles, and customer review system',
      'Real-time inventory updates and push notifications via FCM',
      'SQFlite offline caching for field-worker usability without internet',
      'Firebase integration for database, auth, and real-time data syncing',
      'Deployed successfully on both Play Store and App Store',
    ],
    tech: ['Flutter', 'Firebase', 'GetX', 'SQFlite', 'FCM', 'Crashlytics'],
    techIcons: [
      { name: 'Flutter', icon: 'https://cdn.simpleicons.org/flutter/54C5F8' },
      { name: 'Firebase', icon: 'https://cdn.simpleicons.org/firebase/FFCA28' },
      { name: 'SQLite', icon: 'https://cdn.simpleicons.org/sqlite/003B57' },
    ],
    links: {
      play: 'https://play.google.com/store/apps/details?id=com.alstore.ubuild&pcampaignid=web_share',
    },
    status: 'Live',
    statusColor: '#10B981',
  },
  {
    id: 'zoretime',
    name: 'ZoreTime',
    subtitle: 'US Fitness Subscription App',
    tagline: 'Health & fitness app to discover gyms and services.',
    description:
      'Cross-platform fitness app for a US client. Users find nearby gyms, explore services, check amenities, and sync health data. Integrated Google Maps for location-based features and secure login with Google & Apple authentication.',
    color: '#10B981',
    accentGlow: 'rgba(16,185,129,0.15)',
    icon: 'https://cdn.simpleicons.org/apple/ffffff',
    category: 'Consumer · US Market',
    metrics: [
      { label: 'Engagement', value: '+35%', desc: 'Weekly active users post-launch' },
      { label: 'Delivery', value: '100%', desc: 'All milestones on schedule' },
      { label: 'Health APIs', value: '2', desc: 'Apple + Google HealthKit' },
    ],
    highlights: [
      'Integrated Google Maps SDK for real-time gym discovery by location',
      'Apple HealthKit + Google Health real-time health data sync',
      'Secure login via Google & Apple authentication',
      'Bloc/Cubit state management for predictable UI flows',
      'Async delivery across US + India time zones, all milestones on schedule',
    ],
    tech: ['Flutter', 'Firebase', 'Google Maps SDK', 'Apple HealthKit', 'Bloc/Cubit'],
    techIcons: [
      { name: 'Flutter', icon: 'https://cdn.simpleicons.org/flutter/54C5F8' },
      { name: 'Google Maps', icon: 'https://cdn.simpleicons.org/googlemaps/4285F4' },
      { name: 'Apple', icon: 'https://cdn.simpleicons.org/apple/9CA3AF' },
    ],
    links: {},
    status: 'Live',
    statusColor: '#10B981',
  },
  {
    id: 'luvia',
    name: 'Luvia Style',
    subtitle: 'AI Hairstyle & Wardrobe App',
    tagline: 'Discover the best version of yourself with AR-powered style AI.',
    description:
      'Lifestyle app using ARKit (iOS) + ARCore (Android) to measure face shape metrics and generate personalized hairstyle recommendations via streaming AI. Also features a smart wardrobe manager for daily outfit pairing and purchase guidance.',
    color: '#00E5FF',
    accentGlow: 'rgba(0,229,255,0.12)',
    icon: 'https://cdn.simpleicons.org/apple/00E5FF',
    category: 'Consumer · Lifestyle',
    metrics: [
      { label: 'Platform', value: '2', desc: 'App Store + Play Store' },
      { label: 'Team', value: '4', desc: 'People managed end-to-end' },
      { label: 'AR SDKs', value: '2', desc: 'ARKit iOS + ARCore Android' },
    ],
    highlights: [
      'ARKit (iOS) + ARCore (Android) for real-time face shape detection and metric extraction',
      'Auto-capture face scanning with live detection feedback — no manual tapping',
      'Streaming API integration for instant AI hairstyle generation with zero buffering',
      'Caching layer to minimize redundant AI inference calls and reduce server load',
      'Wardrobe manager: organize closet, generate daily outfit pairs, smart purchase recommendations',
      'FastAPI backend + Supabase for auth, storage, and real-time data',
      'Led 4-person cross-functional team from MVP through App Store + Play Store launch',
    ],
    tech: ['Flutter', 'FastAPI', 'Supabase', 'ARKit', 'ARCore', 'Streaming API'],
    techIcons: [
      { name: 'Flutter', icon: 'https://cdn.simpleicons.org/flutter/54C5F8' },
      { name: 'FastAPI', icon: 'https://cdn.simpleicons.org/fastapi/009688' },
      { name: 'Supabase', icon: 'https://cdn.simpleicons.org/supabase/3ECF8E' },
    ],
    links: {
      appstore: 'https://apps.apple.com/us/app/luvia-style/id6761775149',
      play: 'https://play.google.com/store',
    },
    gradientBar: 'linear-gradient(90deg, #00E5FF 0%, #FFEAC0 60%, transparent 100%)',
    status: 'Live',
    statusColor: '#10B981',
  },
  {
    id: 'viewer-app',
    name: 'Mac File Viewer & Editor',
    subtitle: 'macOS Native Document Utility',
    tagline: 'Fast, native macOS desktop utility to view and edit files without bloat.',
    description:
      'A native macOS application built with Flutter Desktop enabling users to open, view, and perform basic edits on PDF, Excel (XLS), and Word (DOC) formats quickly without launching heavy office suites.',
    color: '#38BDF8',
    accentGlow: 'rgba(56,189,248,0.15)',
    icon: 'https://cdn.simpleicons.org/apple/f0f0f0',
    category: 'macOS Utility · Open Source',
    metrics: [
      { label: 'File Formats', value: '4+', desc: 'PDF, XLS, DOC, TXT' },
      { label: 'Load Time', value: '<0.5s', desc: 'Instant file parsing' },
      { label: 'Platform', value: 'macOS', desc: 'Native desktop app' },
    ],
    highlights: [
      'Native file system integration for quick document previews',
      'Supports reading and basic editing of DOC and XLS files',
      'Integrated PDF rendering engine with custom zoom controls',
      'Lightweight execution and responsive layout built for macOS desktop',
    ],
    tech: ['Flutter', 'Dart', 'macOS Desktop', 'File I/O'],
    techIcons: [
      { name: 'Flutter', icon: 'https://cdn.simpleicons.org/flutter/54C5F8' },
      { name: 'Apple', icon: 'https://cdn.simpleicons.org/apple/9CA3AF' },
    ],
    links: {
      github: 'https://github.com/Pratiksharmaps/viewerApp.git',
    },
    status: 'Open Source',
    statusColor: '#3B82F6',
  },
]

function MetricBadge({ metric }: { metric: { label: string; value: string; desc: string } }) {
  return (
    <div
      className="flex flex-col items-center p-3 rounded-xl text-center"
      style={{ background: 'var(--proj-glow)', border: '1px solid var(--proj-border)' }}
    >
      <span className="text-xl font-bold" style={{ color: 'var(--proj-color)', fontFamily: 'var(--font-display)' }}>
        {metric.value}
      </span>
      <span className="text-xs font-semibold mt-0.5" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
        {metric.label}
      </span>
      <span className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
        {metric.desc}
      </span>
    </div>
  )
}

function FeaturedCard({ project, index }: { project: typeof featuredProjects[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const isEven = index % 2 === 0

  return (
    <article
      className={`relative flex flex-col h-full rounded-3xl overflow-hidden transition-all duration-500 card-${project.id}`}
      style={{
        background: 'var(--bg-card)',
        border: hovered ? '1px solid var(--proj-hover-border)' : '1px solid var(--border)',
        boxShadow: hovered ? '0 32px 80px var(--proj-hover-shadow), 0 0 0 1px var(--proj-hover-border)' : 'none',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top gradient bar */}
      <div
        className="h-1.5 w-full"
        style={{
          background: (project as any).gradientBar
            ?? 'linear-gradient(90deg, var(--proj-color), var(--proj-glow), transparent)',
        }}
      />

      {/* Glassmorphic background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at ${isEven ? '0% 0%' : '100% 0%'}, var(--proj-glow) 0%, transparent 60%)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      />

      <div className="relative p-7 sm:p-8 flex flex-col flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-4">
            {/* App icon circle */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
              style={{
                background: 'var(--proj-glow)',
                border: '1px solid var(--proj-border)',
              }}
            >
              {project.id === 'zoretime' ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--text-primary)' }}>
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.103 1.51 12.06 1.005 1.45 2.187 3.068 3.76 3.007 1.514-.06 2.09-.974 3.916-.974 1.815 0 2.342.974 3.931.943 1.62-.03 2.66-1.463 3.647-2.902 1.144-1.673 1.616-3.292 1.643-3.38-.037-.016-3.155-1.21-3.188-4.78-.028-2.983 2.447-4.417 2.56-4.48-1.396-2.042-3.553-2.274-4.312-2.327-1.996-.163-3.905 1.215-4.967 1.215-.948 0-2.415-1.078-3.96-1.04zm2.148-3.805c.828-1.003 1.384-2.4 1.23-3.791-1.196.049-2.646.797-3.504 1.802-.746.865-1.399 2.28-1.22 3.65 1.332.104 2.667-.658 3.494-1.661z"/>
                </svg>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={project.icon} alt={project.name} width={32} height={32} className="object-contain" />
              )}
            </div>
            <div>
              <h3
                className="text-2xl font-bold leading-tight"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
              >
                {project.name}
              </h3>
              <p className="text-sm font-medium mt-0.5" style={{ color: 'var(--proj-color)', fontFamily: 'var(--font-mono)' }}>
                {project.subtitle}
              </p>
            </div>
          </div>

          {/* Status + Category */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            <span
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                background: 'var(--proj-glow)',
                color: 'var(--proj-color)',
                border: '1px solid var(--proj-border)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: 'var(--proj-color)' }}
              />
              {project.status}
            </span>
            <span className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {project.category}
            </span>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-base italic mb-4" style={{ color: 'var(--text-secondary)' }}>
          &quot;{project.tagline}&quot;
        </p>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
          {project.description}
        </p>

        {/* Key Highlights */}
        <div className="mb-6">
          <h4
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
          >
            Key Highlights
          </h4>
          <ul className="flex flex-col gap-2">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: 'var(--proj-color)' }}
                />
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {project.metrics.map((m) => (
            <MetricBadge key={m.label} metric={m} />
          ))}
        </div>

        {/* Tech stack with icons */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {project.techIcons.map((t) => (
            <div
              key={t.name}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.icon} alt={t.name} width={14} height={14} className="object-contain" />
              <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                {t.name}
              </span>
            </div>
          ))}
          {project.tech.slice(project.techIcons.length).map((t) => (
            <span
              key={t}
              className="text-xs px-2.5 py-1.5 rounded-lg"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 pt-5 border-t mt-auto" style={{ borderColor: 'var(--border)' }}>
          {project.links.play && (
            <a
              href={project.links.play}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                background: 'rgba(61,220,132,0.1)',
                color: '#3DDC84',
                border: '1px solid rgba(61,220,132,0.25)',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(61,220,132,0.2)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(61,220,132,0.1)')}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://cdn.simpleicons.org/googleplay/3DDC84" alt="Play Store" width={16} height={16} />
              Play Store
            </a>
          )}
          {project.links.appstore && (
            <a
              href={project.links.appstore}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.06)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://cdn.simpleicons.org/apple/9CA3AF" alt="App Store" width={16} height={16} />
              App Store
            </a>
          )}
          {(project.links as any).github && (
            <a
              href={(project.links as any).github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.06)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://cdn.simpleicons.org/github/f0f0f0" alt="GitHub" width={16} height={16} />
              GitHub
            </a>
          )}
          {/* Scroll-to-projects link */}
          <a
            href="#projects"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ml-auto"
            style={{
              background: 'var(--proj-glow)',
              color: 'var(--proj-color)',
              border: '1px solid var(--proj-border)',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--proj-hover-border)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--proj-glow)')}
          >
            View Details
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  )
}

export default function FeaturedWorks() {
  return (
    <section id="featured" className="py-24" aria-label="Featured works section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          className="mb-14"
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
              Featured Work
            </span>
          </div>
          <h2
            className="text-3xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            Apps I&apos;m Proud Of
          </h2>
          <p className="text-base max-w-xl" style={{ color: 'var(--text-secondary)' }}>
            Production-grade mobile applications shipped to real users — with measurable impact and clean engineering.
          </p>
        </motion.div>

        {/* Flutter badge */}
        <motion.div
          className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl mb-10"
          style={{
            background: 'linear-gradient(135deg, rgba(84,197,248,0.1) 0%, rgba(168,85,247,0.1) 100%)',
            border: '1px solid rgba(84,197,248,0.2)',
          }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://cdn.simpleicons.org/flutter/54C5F8" alt="Flutter" width={20} height={20} />
          <span className="text-sm font-medium" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
            Built with Flutter — cross-platform iOS & Android
          </span>
          <div className="flex gap-1.5 ml-2">
            {['iOS', 'Android'].map((p) => (
              <span
                key={p}
                className="px-2 py-0.5 rounded-md text-xs font-medium"
                style={{ background: 'rgba(84,197,248,0.12)', color: '#54C5F8', border: '1px solid rgba(84,197,248,0.2)', fontFamily: 'var(--font-mono)' }}
              >
                {p}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Featured cards grid — stagger */}
        <div className="grid md:grid-cols-2 gap-6">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <FeaturedCard project={project} index={i} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-200"
            style={{
              background: 'var(--accent)',
              color: '#000',
              textDecoration: 'none',
              fontFamily: 'var(--font-display)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            View All Projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
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
            <img src="https://cdn.simpleicons.org/github/f0f0f0" alt="GitHub" width={18} height={18} />
            GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  )
}
