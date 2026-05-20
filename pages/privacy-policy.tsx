// pages/privacy-policy.tsx
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SEOHead from '@/components/ui/SEOHead'

export default function PrivacyPolicy() {
  return (
    <>
      <SEOHead
        title="Privacy Policy"
        description="Privacy policy for Pratik Sharma's portfolio website."
        canonical="/privacy-policy"
      />
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            Privacy Policy
          </h1>
          <p className="text-sm mb-10" style={{ color: 'var(--text-muted)' }}>
            Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="flex flex-col gap-8" style={{ color: 'var(--text-secondary)' }}>
            <section>
              <div className="text-base leading-relaxed space-y-6" style={{ whiteSpace: 'pre-line' }}>
                <p>
                  This site collects basic visitor information (such as IP address, location, 
                  and browser type) to analyze traffic and improve performance.
                </p>
                <p>
                  No personally identifiable information like name or email is collected 
                  unless you provide it voluntarily (for example, through a contact form).
                </p>
                <p>
                  All data is stored securely and is not shared with third parties.
                </p>
                <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  By using this site, you agree to this Privacy Policy.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
