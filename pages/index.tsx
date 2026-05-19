// pages/index.tsx
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SEOHead from '@/components/ui/SEOHead'
import Hero from '@/components/sections/Hero'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'
import { generatePersonSchema } from '@/lib/seo'

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
              <div>
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
                    At <span style={{ color: 'var(--accent)' }}>Antino Labs</span>, I lead development across multiple simultaneous projects, owning architecture decisions, CI/CD pipelines, and post-launch monitoring. I care about clean code, measurable performance gains, and apps that don&apos;t crash.
                  </p>
                  <p>
                    When I&apos;m not building apps, I write about Flutter on my blog — state management patterns, Firebase optimizations, and lessons from the production trenches.
                  </p>
                </div>
              </div>
              <div
                className="p-8 rounded-2xl"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              >
                <h3 className="font-bold text-lg mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                  Quick Facts
                </h3>
                {[
                  { label: 'Location', value: '📍 Gurgaon, Haryana, India' },
                  { label: 'Current Role', value: '💼 Software Developer @ Antino Labs' },
                  { label: 'Education', value: '🎓 MCA — GGV Bilaspur (8.01 CGPA)' },
                  { label: 'Specialization', value: '📱 Flutter (Android + iOS)' },
                  { label: 'Experience', value: '⚡ 1+ year, 6 production apps' },
                  { label: 'Open To', value: '🟢 Full-time & Contract roles' },
                ].map((fact) => (
                  <div key={fact.label} className="flex items-start gap-3 mb-4 last:mb-0">
                    <span className="text-xs pt-0.5 w-20 shrink-0" style={{ color: 'var(--text-muted)' }}>
                      {fact.label}
                    </span>
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{fact.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
