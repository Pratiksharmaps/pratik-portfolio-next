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
            {[
              {
                title: 'Overview',
                content: `This privacy policy describes how Pratik Sharma ("I", "me", or "my") collects, uses, and protects your information when you visit pratik-portfolio.vercel.app (the "Site"). I am committed to protecting your privacy and handling your data in a transparent manner.`,
              },
              {
                title: 'Information I Collect',
                content: `Contact Form: When you submit the contact form, I collect your name, email address, company name (optional), and message. This information is used solely to respond to your inquiry and is not sold or shared with third parties.\n\nAnalytics: This site uses Google Analytics to understand how visitors interact with the site. Google Analytics collects anonymized data such as pages visited, time spent, device type, and geographic location (country/city level). No personally identifiable information is collected by analytics. You can opt out by using the Google Analytics Opt-out Browser Add-on.`,
              },
              {
                title: 'Cookies',
                content: `This site uses the following cookies:\n\n• Google Analytics cookies (_ga, _gid, _gat) — track site usage anonymously.\n• Theme preference cookie — stores your light/dark mode preference locally.\n• Admin session cookie (admin_token) — only set when the site admin logs in; httpOnly and secure.\n\nYou can disable cookies in your browser settings. Note that some site features may not function correctly without cookies.`,
              },
              {
                title: 'How I Use Your Information',
                content: `Contact form submissions are used only to respond to your inquiry. I do not send marketing emails, add you to mailing lists, or share your information with any third parties. Analytics data is used only to improve the site experience.`,
              },
              {
                title: 'Data Storage & Security',
                content: `Contact form submissions are delivered via email and not stored on any server. Analytics data is stored by Google in accordance with their privacy policy. I implement reasonable technical measures to protect your information, including HTTPS encryption and secure cookie handling.`,
              },
              {
                title: 'Third-Party Services',
                content: `This site uses the following third-party services:\n\n• Google Analytics (analytics.google.com) — privacy policy at policies.google.com/privacy\n• Google Fonts (fonts.googleapis.com) — for typography\n• Vercel (vercel.com) — site hosting\n\nEach service has its own privacy policy. I am not responsible for the privacy practices of third-party services.`,
              },
              {
                title: 'Your Rights',
                content: `You have the right to:\n\n• Request information about what personal data I hold about you\n• Request deletion of your personal data\n• Opt out of Google Analytics via browser settings or Google's opt-out tool\n\nTo exercise these rights, contact me at pratik.sde16@gmail.com.`,
              },
              {
                title: 'Children\'s Privacy',
                content: `This site is not directed at children under 13. I do not knowingly collect personal information from children under 13.`,
              },
              {
                title: 'Changes to This Policy',
                content: `I may update this privacy policy from time to time. The "Last updated" date at the top of this page reflects the most recent revision. Continued use of the site after changes constitutes your acceptance of the updated policy.`,
              },
              {
                title: 'Contact',
                content: `If you have any questions about this privacy policy or how I handle your data, please contact me:\n\nEmail: pratik.sde16@gmail.com\nLocation: Gurgaon, Haryana, India`,
              },
            ].map((section) => (
              <section key={section.title}>
                <h2 className="text-lg font-bold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                  {section.title}
                </h2>
                <div className="text-sm leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
