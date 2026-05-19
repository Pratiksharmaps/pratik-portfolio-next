// pages/blog/[slug].tsx
import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SEOHead from '@/components/ui/SEOHead'
import { getPublishedPosts, getPostBySlug } from '@/lib/blog'
import type { BlogPost } from '@/lib/blog'
import { generateBlogPostSchema } from '@/lib/seo'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import { formatDistanceToNow, format } from 'date-fns'

interface Props {
  post: BlogPost
  contentHtml: string
}

export default function BlogPost({ post, contentHtml }: Props) {
  return (
    <>
      <SEOHead
        title={post.title}
        description={post.excerpt}
        canonical={`/blog/${post.slug}`}
        schema={generateBlogPostSchema(post)}
      />
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm mb-10 transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-10">
            {post.featured && (
              <span
                className="inline-block text-xs px-2.5 py-1 rounded-full font-medium mb-4"
                style={{ background: 'var(--accent-glow)', color: 'var(--accent)', border: '1px solid rgba(0,212,255,0.2)' }}
              >
                ⭐ Featured
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              {post.title}
            </h1>
            <p className="text-base mb-6" style={{ color: 'var(--text-secondary)' }}>{post.excerpt}</p>
            <div className="flex flex-wrap items-center gap-4 pb-6" style={{ borderBottom: '1px solid var(--border)' }}>
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: 'var(--accent)', color: '#000' }}
                >
                  PS
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>Pratik Sharma</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Flutter Developer</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                <span>{format(new Date(post.createdAt), 'MMM d, yyyy')}</span>
                <span>·</span>
                <span>{post.readTime} min read</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-md"
                  style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', border: '1px solid var(--border)' }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </header>

          {/* Content */}
          <article
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Footer */}
          <div
            className="mt-16 p-6 rounded-2xl"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <p className="text-sm font-semibold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              Written by Pratik Sharma
            </p>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              Flutter Developer building production apps at Antino Labs, Gurgaon.
            </p>
            <div className="flex gap-3">
              <Link
                href="/"
                className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                style={{ background: 'var(--accent)', color: '#000' }}
              >
                View Portfolio
              </Link>
              <Link
                href="/blog"
                className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
              >
                More Posts
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getPublishedPosts()
  return {
    paths: posts.map((p) => ({ params: { slug: p.slug } })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = getPostBySlug(params?.slug as string)
  if (!post || !post.published) return { notFound: true }

  const processed = await remark().use(remarkHtml).process(post.content)
  const contentHtml = processed.toString()

  return { props: { post, contentHtml }, revalidate: 60 }
}
