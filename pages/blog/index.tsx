// pages/blog/index.tsx
import { GetStaticProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SEOHead from '@/components/ui/SEOHead'
import { getPublishedPosts, BlogPost } from '@/lib/blog'
import { formatDistanceToNow } from 'date-fns'

interface Props {
  posts: BlogPost[]
}

export default function Blog({ posts }: Props) {
  const featured = posts.find((p) => p.featured)
  const rest = posts.filter((p) => !p.featured)

  return (
    <>
      <SEOHead
        title="Blog — Flutter Learnings & Dev Notes"
        description="Practical Flutter tutorials, state management patterns, Firebase tips, and mobile development insights from real production experience."
        canonical="/blog"
      />
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px" style={{ background: 'var(--accent)' }} />
              <span className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                Writing
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              Flutter Blog
            </h1>
            <p className="text-base max-w-xl" style={{ color: 'var(--text-secondary)' }}>
              Real-world Flutter learnings from production apps — state management, performance, Firebase, and architecture patterns.
            </p>
          </div>

          {posts.length === 0 && (
            <div
              className="text-center py-20 rounded-2xl"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              <p className="text-4xl mb-4">✍️</p>
              <p className="font-semibold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                Posts coming soon
              </p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Flutter tutorials and dev notes will appear here.
              </p>
            </div>
          )}

          {/* Featured post */}
          {featured && (
            <Link href={`/blog/${featured.slug}`}>
              <article
                className="rounded-2xl mb-8 transition-all duration-300 cursor-pointer overflow-hidden"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {/* Cover image */}
                {featured.coverImage && (
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/7' }}>
                    <Image
                      src={featured.coverImage}
                      alt={featured.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 896px"
                    />
                    {/* Gradient overlay at bottom */}
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to bottom, transparent 40%, var(--bg-card) 100%)' }}
                    />
                  </div>
                )}

                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{ background: 'var(--accent-glow)', color: 'var(--accent)', border: '1px solid rgba(0,212,255,0.2)' }}
                    >
                      ⭐ Featured
                    </span>
                    <span className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {featured.readTime} min read
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                    {featured.title}
                  </h2>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {featured.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-md"
                          style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {formatDistanceToNow(new Date(featured.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          )}

          {/* Rest of posts */}
          <div className="flex flex-col gap-4">
            {rest.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <article
                  className="rounded-2xl transition-all duration-200 cursor-pointer overflow-hidden"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)'
                    e.currentTarget.style.transform = 'translateX(4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.transform = 'translateX(0)'
                  }}
                >
                  <div className="flex items-stretch gap-0">
                    {/* Thumbnail */}
                    {post.coverImage && (
                      <div className="relative shrink-0 overflow-hidden rounded-l-2xl" style={{ width: '140px' }}>
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="140px"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h2 className="font-bold text-lg mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                            {post.title}
                          </h2>
                          <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                            {post.excerpt}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-0.5 rounded-md"
                                style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs mb-1" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                            {post.readTime} min
                          </p>
                          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPublishedPosts()
  return { props: { posts }, revalidate: 60 }
}
