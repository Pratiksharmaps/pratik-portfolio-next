// pages/built-with-ai.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SEOHead from '@/components/ui/SEOHead'

const aiProjects = [
  {
    id: 'relax-stay',
    name: 'Relax Stay',
    subtitle: 'Hotel Presentation Website',
    role: 'Full Stack Developer',
    description: 'A hotel presentation and booking landing page built using Next.js, featuring a clean glassmorphic design and fully responsive grid layout. Designed and optimized using targeted prompt engineering for structural code layouts.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'AI Tools'],
    impact: 'Accelerated development turnaround by 60% using generative AI design iterations.',
    github: 'https://github.com/Pratiksharmaps/relax-stay',
    link: 'https://relax-stay.vercel.app',
    color: '#F59E0B'
  },
  {
    id: 'glide-scape',
    name: 'Glide Scape',
    subtitle: 'Client Portfolio & Biography',
    role: 'Lead Developer',
    description: 'A bespoke biographical storytelling and portfolio website custom-developed for a client using Next.js and smooth Framer Motion page transitions, integrated with AI-driven content generation pipelines.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'AI Tools'],
    impact: 'Leveraged Cursor multi-file code editing workflows to deliver a highly customized client site in record time.',
    github: 'https://github.com/Pratiksharmaps/GlideScape.git',
    link: 'https://glide-scape.vercel.app/',
    color: '#A855F7'
  },
  {
    id: 'portfolio-v2',
    name: 'AI-Augmented Portfolio',
    subtitle: 'My Personal Website',
    role: 'Developer',
    description: 'My personal professional portfolio built with Next.js and styled with vanilla CSS. The entire application structure, SEO optimization, and layouts were built and refactored in cooperation with agentic AI assistants.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'AI Tools'],
    impact: '100% code quality validation and build compliance achieved through AI pair programming.',
    github: 'https://github.com/Pratiksharmaps/pratik-portfolio-next',
    link: 'https://pratik-portfolio-oevs.vercel.app',
    color: '#00D4FF'
  },
  {
    id: 'ai-astrology',
    name: 'AI Astrology App',
    subtitle: 'Horoscope & Predictions',
    role: 'Flutter & Backend Developer',
    description: 'A mobile application under active development that provides users with highly personalized astrological calculations and AI-generated horoscopes. Built with a Flutter frontend and a FastAPI backend.',
    tech: ['Flutter', 'Dart', 'FastAPI', 'AI Tools'],
    impact: 'Integrated FastAPI server hooks with LLM endpoints for real-time horoscope generation.',
    github: '',
    color: '#8B5CF6'
  },
  {
    id: 'linkedin-extractor',
    name: 'AI LinkedIn Extractor',
    subtitle: 'Screenshot to Job Sheet Pipeline',
    role: 'Python Developer',
    description: 'A local desktop utility that monitors and processes screenshotted LinkedIn job advertisements. It uses a local vision model (LLaVA) run via Ollama to parse job title, company, requirements, and apply links directly into an Excel sheet.',
    tech: ['Python', 'Ollama', 'LLaVA LLM', 'AI Tools'],
    impact: 'Eliminates manually copying job details from screenshots; runs completely locally to ensure user privacy.',
    github: 'https://github.com/Pratiksharmaps/LinkedIn_job_extracter',
    color: '#F59E0B'
  },
  {
    id: 'ai-buddy',
    name: 'AI Buddy',
    subtitle: 'Gemini AI Chat Assistant',
    role: 'Flutter Developer',
    description: 'A cross-platform chat assistant mobile app integrating Google\'s Gemini API. Implements real-time, context-aware Q&A with streaming responses and Firebase database persistence.',
    tech: ['Flutter', 'Dart', 'Gemini API', 'Firebase', 'Provider'],
    impact: 'Leveraged generative AI API stream hooks to achieve zero latency streaming layout render in Flutter.',
    github: 'https://github.com/Pratiksharmaps/ai_buddy.git',
    color: '#EF4444'
  }
]

export default function BuiltWithAI() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <>
      <SEOHead
        title="Built with AI"
        description="Explore how Pratik Sharma integrates AI workflows, generative prompts, and local LLMs (Ollama, Gemini) into modern web and mobile applications."
        canonical="/built-with-ai"
      />
      <Navbar />

      <main className="min-h-screen pt-24 pb-20 bg-[#070710] text-[#f0f0f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 text-center sm:text-left"
          >
            <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
              <span className="w-8 h-px bg-[#00D4FF]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#00D4FF] font-semibold">
                AI & Agentic Workflows
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 tracking-tight font-display" style={{ fontFamily: 'var(--font-display)' }}>
              Built with{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #00D4FF, #A855F7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                AI
              </span>
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
              I actively integrate Large Language Models (LLMs) and actively use <span className="text-[#00D4FF] font-semibold">Cursor</span> and <span className="text-[#EF4444] font-semibold">Claude</span> tools in daily development alongside prompt engineering, local vision models (LLaVA), and custom API scripting to deliver highly optimized web and mobile platforms at extreme velocity.
            </p>
          </motion.div>

          {/* Active Research Alert / Spotlight */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="p-6 rounded-2xl mb-10 border border-[#00D4FF]/30 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(168,85,247,0.06) 100%)',
            }}
          >
            {/* Ambient glow inside card */}
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-[#00D4FF]/10 blur-xl pointer-events-none" />
            
            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D4FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00D4FF]"></span>
              </span>
              <p className="text-xs font-bold font-mono text-[#00D4FF] uppercase tracking-wider">Active R&D Focus</p>
            </div>
            <h3 className="text-lg font-bold text-gray-200 mt-2 font-display">
              Smart Flutter Personal Coder
            </h3>
            <p className="text-sm text-gray-400 mt-2 leading-relaxed max-w-4xl">
              Currently engineering an offline, local development assistant tailored for Flutter mobile engineering. Utilizing <strong className="text-white">Ollama</strong> and custom lightweight LLM parsers running locally, the project aims to automate boilerplate rendering, state management injections, and clean architecture folder scaffolding directly on my Mac development environment.
            </p>
          </motion.div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { value: '30M+', label: 'Cursor Tokens Logged', color: '#00D4FF' },
              { value: 'Tools Used', label: 'Antigravity, Cursor, ChatGPT', color: '#10B981' },
              { value: 'Fav Models', label: 'ChatGPT 5.5, Sonnet 4.6 (Active)', color: '#A855F7' },
              { value: '2x', label: 'Development Velocity', color: '#F59E0B' }
            ].map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-5 rounded-2xl bg-[#0f0f20] border border-gray-800 text-center flex flex-col justify-center h-28"
              >
                <div className="text-lg sm:text-xl font-bold mb-1.5 font-display truncate" style={{ color: metric.color }}>
                  {metric.value}
                </div>
                <div className="text-xs text-gray-400 font-mono leading-tight">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* AI-Augmented Projects Showcase */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 font-display text-gray-200">
              AI-Involved Projects
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiProjects.map((project, i) => (
                <article
                  key={project.id}
                  className="flex flex-col rounded-2xl overflow-hidden transition-all duration-300 bg-[#0b0b1a] border border-gray-800"
                  style={{
                    borderColor: hoveredIndex === i ? `${project.color}50` : 'rgba(31,41,55,1)',
                    transform: hoveredIndex === i ? 'translateY(-5px)' : 'translateY(0)',
                    boxShadow: hoveredIndex === i ? `0 16px 40px ${project.color}10` : 'none'
                  }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Accent Header */}
                  <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}60)` }} />
                  
                  <div className="p-6 flex flex-col flex-1">
                    {/* Category Chip */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="text-[10px] px-2.5 py-0.5 rounded-full font-semibold font-mono"
                        style={{
                          background: `${project.color}15`,
                          color: project.color,
                          border: `1px solid ${project.color}25`
                        }}
                      >
                        {project.tech.includes('Flutter') ? 'Mobile App' : 'Web / Utility'}
                      </span>
                    </div>

                    <h3 className="font-bold text-xl mb-1 text-gray-100 font-display">
                      {project.name}
                    </h3>
                    <p className="text-xs mb-3 font-mono" style={{ color: project.color }}>
                      {project.subtitle}
                    </p>
                    <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-1">
                      {project.description}
                    </p>

                    {/* Impact Statement */}
                    <div className="mb-4 p-3 rounded-xl bg-[#0f0f20]/60 border border-gray-800/80">
                      <p className="text-xs font-semibold text-gray-300 font-mono mb-1">🔥 AI Workflow Impact</p>
                      <p className="text-xs text-gray-400">{project.impact}</p>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-[#14142b] border border-gray-800 text-gray-400 font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    {(project.github || project.link) && (
                      <div className="flex gap-2.5 mt-auto pt-4 border-t border-gray-800">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 flex-1 py-2 rounded-xl text-xs font-semibold transition-all duration-200 bg-gray-900 border border-gray-800 text-gray-300 hover:bg-gray-800"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            Code
                          </a>
                        )}
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 flex-1 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
                            style={{
                              background: `${project.color}15`,
                              color: project.color,
                              border: `1px solid ${project.color}25`
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = `${project.color}28` }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = `${project.color}15` }}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}
