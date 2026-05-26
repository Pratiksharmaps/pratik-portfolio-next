'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion'
import Image from 'next/image'
import { siteConfig, stats } from '@/data/portfolio'
import { availability } from '@/lib/availability'

function AnimatedCounter({ count, suffix }: { count: number; suffix: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { stiffness: 60, damping: 18 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (isInView) motionValue.set(count)
  }, [isInView, count, motionValue])

  useEffect(() => {
    return spring.on('change', (v) => setDisplay(Math.round(v)))
  }, [spring])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Hero() {
  const isExternalResume = siteConfig.resumeUrl.startsWith('http')
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
        <div className="grid lg:grid-cols-12 gap-8 items-center">

          {/* Left column — staggered entrance */}
          <motion.div
            className="lg:col-span-7 xl:col-span-8 order-1 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Available badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
              style={{
                background: availability.isAvailable ? 'var(--accent-glow)' : 'rgba(107,114,128,0.12)',
                border: `1px solid ${availability.isAvailable ? 'rgba(0,212,255,0.2)' : availability.accentBorder}`,
                color: availability.isAvailable ? 'var(--accent)' : availability.accentColor,
                fontFamily: 'var(--font-mono)',
              }}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full bg-current ${availability.isAvailable ? 'animate-pulse' : ''}`}
              />
              {availability.badge}
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
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
            </motion.h1>

            {/* Title */}
            <motion.h2
              variants={itemVariants}
              className="text-xl sm:text-2xl font-medium mb-6"
              style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-display)' }}
            >
              {/* Flutter Developer &amp; Mobile App Engineer */}
              Software Developer &amp; Flutter App Engineer
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg leading-relaxed mb-6 max-w-2xl"
              style={{ color: 'var(--text-secondary)' }}
            >
              Building production-grade mobile applications and actively developing AI-driven web apps. Specializing in{' '}
              <span style={{ color: 'var(--accent)' }}>Flutter, Next.js, and AI integrations</span> to build scalable solutions that reach thousands of users.
            </motion.p>

            {/* AI Tools Badge Row */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-2.5 mb-10 text-xs font-mono"
              style={{ color: 'var(--text-muted)' }}
            >
              <span className="mr-1">⚡ Daily workflow copilot:</span>
              <span className="px-2.5 py-1 rounded bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/20 font-semibold">Cursor AI</span>
              <span className="px-2.5 py-1 rounded bg-[#A855F7]/10 text-[#A855F7] border border-[#A855F7]/20 font-semibold">ChatGPT</span>
              <span className="px-2.5 py-1 rounded bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20 font-semibold">Claude 3.5</span>
            </motion.div>

            {/* CTA buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-16">
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
                href={siteConfig.resumeUrl}
                target={isExternalResume ? '_blank' : undefined}
                rel={isExternalResume ? 'noopener noreferrer' : undefined}
                download={isExternalResume ? undefined : true}
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
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                Resume PDF
              </a>
            </motion.div>

            {/* Animated stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
                    <AnimatedCounter count={stat.count} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Avatar — scale + float */}
          <motion.div
            className="lg:col-span-5 xl:col-span-4 order-2 lg:order-2 flex justify-center lg:justify-end mb-8 lg:mb-0 lg:-mt-12 xl:-mt-16"
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full p-1.5"
              style={{
                background: 'linear-gradient(135deg, var(--accent), #A855F7)',
                boxShadow: '0 0 60px rgba(0, 212, 255, 0.25)',
              }}
            >
              <div
                className="w-full h-full rounded-full overflow-hidden border-4"
                style={{ borderColor: 'var(--bg-primary, #070710)' }}
              >
                <Image
                  src="/re.png"
                  alt="Pratik Sharma — Flutter Developer"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Vertical social links */}
        <motion.div
          className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {[
            {
              href: siteConfig.linkedin, label: 'LinkedIn', icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              ),
            },
            {
              href: siteConfig.github, label: 'GitHub', icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                </svg>
              ),
            },
            {
              href: `mailto:${siteConfig.email}`, label: 'Email', icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              ),
            },
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
        </motion.div>
      </div>
    </section>
  )
}
