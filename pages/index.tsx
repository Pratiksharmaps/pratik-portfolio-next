// pages/index.tsx
import { motion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SEOHead from '@/components/ui/SEOHead'
import Hero from '@/components/sections/Hero'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import FeaturedWorks from '@/components/sections/FeaturedWorks'
import WorksByStack from '@/components/sections/WorksByStack'
import MiniGame from '@/components/sections/MiniGame'
import Contact from '@/components/sections/Contact'
import { generatePersonSchema } from '@/lib/seo'
import { availability } from '@/lib/availability'

export default function Home() {
  return (
    <>
      <SEOHead
        schema={generatePersonSchema()}
        canonical="/"
      />
      <Navbar />
      <main>
        <Hero />
        <section id="about" aria-label="About Pratik Sharma" className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px" style={{ background: 'var(--accent)' }} />
                  <span className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                    About Me
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                  Building apps that scale to real users
                </h2>
                <div className="flex flex-col gap-4 text-base" style={{ color: 'var(--text-secondary)' }}>
                  <p>
                    I&apos;m a Flutter developer based in Gurgaon, India, with hands-on experience shipping production Android and iOS apps used by thousands of real users — including enterprise clients, government organizations, and US-based startups.
                  </p>
                  <p>
                    At <span style={{ color: 'var(--accent)' }}>Antino Labs</span>, I lead development across multiple simultaneous projects, owning architecture decisions, Fastlane CI/CD pipelines, Shorebird OTA updates, and post-launch monitoring. I care about clean code, measurable performance gains, and apps that don&apos;t crash.
                  </p>
                  <p>
                    When I&apos;m not building apps, I write about Flutter on my blog — state management patterns, Firebase optimizations, and lessons from the production trenches.
                  </p>
                  <p className="leading-relaxed">
                    To maintain high execution speeds, I leverage an AI-augmented developer workflow using <span className="px-1.5 py-0.5 rounded bg-[#A855F7]/15 text-[#A855F7] font-semibold font-mono text-xs">ChatGPT</span>, <span className="px-1.5 py-0.5 rounded bg-[#00D4FF]/15 text-[#00D4FF] font-semibold font-mono text-xs">Cursor</span>, and <span className="px-1.5 py-0.5 rounded bg-[#EF4444]/15 text-[#EF4444] font-semibold font-mono text-xs">Claude</span>. I rely on ChatGPT for conceptual learning and Cursor when navigating tight timelines, having logged over <span style={{ color: 'var(--accent)' }} className="font-semibold">30 million tokens</span> in Cursor to supercharge my development pace. I am <span className="border-b border-dashed border-[#00D4FF]/60 text-white font-semibold">actively building AI-driven applications</span> and integrating vision and chat LLM APIs to create smart, next-generation web and mobile platforms.
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="rounded-2xl overflow-hidden"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                initial={{ opacity: 0, x: 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Card header — styled like a terminal tab */}
                <div
                  className="flex items-center gap-2 px-5 py-3 border-b"
                  style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#EF4444' }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#F59E0B' }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#10B981' }} />
                  <span
                    className="ml-2 text-xs"
                    style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
                  >
                    developer.profile
                  </span>
                </div>

                {/* Facts list */}
                <div className="p-6 flex flex-col gap-1">
                  {[
                    { icon: availability.statusIcon, label: 'Status', value: availability.status },
                    { icon: '💼', label: 'Current Role',  value: 'SDE @ Antino Labs · Gurgaon' },
                    { icon: '📱', label: 'Specialization',value: 'Flutter · Android + iOS' },
                    { icon: '⚡', label: 'Experience',     value: '2.5+ years · 7 production apps' },
                    { icon: '🌍', label: 'Clients',        value: 'Enterprise · Government · US Startups' },
                    { icon: '🎓', label: 'Education',      value: 'MCA — GGV Bilaspur' },
                  ].map((fact, i) => (
                    <motion.div
                      key={fact.label}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors duration-150 group cursor-default"
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: 0.2 + i * 0.07 }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-secondary)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <span className="text-base w-6 text-center shrink-0">{fact.icon}</span>
                      <span
                        className="text-xs w-24 shrink-0"
                        style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
                      >
                        {fact.label}
                      </span>
                      <span
                        className="w-px h-3 shrink-0"
                        style={{ background: 'var(--border)' }}
                      />
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {fact.value}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Footer availability pill */}
                {availability.isAvailable && availability.joiningNotice && (
                <div className="px-6 pb-5">
                  <div
                    className="flex items-center gap-2 px-3 py-2 rounded-lg"
                    style={{ background: availability.accentBg, border: `1px solid ${availability.accentBorder}` }}
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: availability.accentColor }} />
                      <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: availability.accentColor }} />
                    </span>
                    <span className="text-xs font-medium" style={{ color: availability.accentColor }}>
                      {availability.joiningNotice}
                    </span>
                  </div>
                </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
        <Skills />
        <Experience />
        <FeaturedWorks />
        <Projects />
        <WorksByStack />
        <MiniGame />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
