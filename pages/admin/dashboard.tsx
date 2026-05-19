// pages/admin/dashboard.tsx — Full admin dashboard
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import SEOHead from '@/components/ui/SEOHead'
import { isAuthenticated } from '@/lib/auth'
import { getAllPosts, BlogPost } from '@/lib/blog'
import { formatDistanceToNow } from 'date-fns'

interface Props { posts: BlogPost[] }

export default function Dashboard({ posts: initialPosts }: Props) {
  const [posts, setPosts] = useState(initialPosts)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [toggling, setToggling] = useState<string | null>(null)
  const router = useRouter()

  const handleToggle = async (id: string) => {
    setToggling(id)
    const res = await fetch('/api/blog/toggle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    if (res.ok) {
      const updated = await res.json()
      setPosts((prev) => prev.map((p) => (p.id === id ? updated : p)))
    }
    setToggling(null)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post permanently?')) return
    setDeleting(id)
    const res = await fetch('/api/blog/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    if (res.ok) setPosts((prev) => prev.filter((p) => p.id !== id))
    setDeleting(null)
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin')
  }

  const published = posts.filter((p) => p.published).length

  return (
    <>
      <SEOHead title="Admin Dashboard" noIndex />
      <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
        {/* Top bar */}
        <header
          className="sticky top-0 z-10 border-b"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-black font-bold text-xs"
                style={{ background: 'var(--accent)' }}
              >
                PS
              </div>
              <span className="font-bold text-sm" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                Admin Dashboard
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-xs px-3 py-1.5 rounded-lg"
                style={{ color: 'var(--text-muted)', border: '1px solid var(--border)' }}
              >
                ← Portfolio
              </Link>
              <Link
                href="/admin/new"
                className="text-xs px-3 py-1.5 rounded-lg font-medium text-black"
                style={{ background: 'var(--accent)' }}
              >
                + New Post
              </Link>
              <button
                onClick={handleLogout}
                className="text-xs px-3 py-1.5 rounded-lg"
                style={{ color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)' }}
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Total Posts', value: posts.length },
              { label: 'Published', value: published },
              { label: 'Drafts', value: posts.length - published },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-xl"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              >
                <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
                  {stat.value}
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Posts table */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid var(--border)' }}
          >
            <div
              className="px-6 py-4 flex items-center justify-between"
              style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border)' }}
            >
              <h2 className="font-bold text-base" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                All Posts
              </h2>
            </div>

            {posts.length === 0 ? (
              <div className="p-12 text-center" style={{ background: 'var(--bg-secondary)' }}>
                <p className="text-3xl mb-3">✍️</p>
                <p className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>No posts yet</p>
                <Link href="/admin/new" className="text-sm" style={{ color: 'var(--accent)' }}>
                  Create your first post →
                </Link>
              </div>
            ) : (
              <div style={{ background: 'var(--bg-secondary)' }}>
                {posts.map((post, idx) => (
                  <div
                    key={post.id}
                    className="px-6 py-5 flex items-start gap-4"
                    style={{
                      borderBottom: idx < posts.length - 1 ? '1px solid var(--border)' : 'none',
                    }}
                  >
                    {/* Status indicator */}
                    <div className="pt-1">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: post.published ? '#10B981' : 'var(--text-muted)' }}
                        title={post.published ? 'Published' : 'Draft'}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-1">
                        <h3 className="font-semibold text-sm truncate" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                          {post.title}
                        </h3>
                        {post.featured && (
                          <span className="text-xs px-1.5 py-0.5 rounded shrink-0" style={{ background: 'var(--accent-glow)', color: 'var(--accent)' }}>
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-xs mb-2 line-clamp-1" style={{ color: 'var(--text-muted)' }}>
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        <span
                          className="px-2 py-0.5 rounded-full"
                          style={{
                            background: post.published ? 'rgba(16,185,129,0.1)' : 'rgba(107,114,128,0.1)',
                            color: post.published ? '#10B981' : 'var(--text-muted)',
                          }}
                        >
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                        <span>{post.readTime} min read</span>
                        <span>{formatDistanceToNow(new Date(post.updatedAt), { addSuffix: true })}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      {post.published && (
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="text-xs px-3 py-1.5 rounded-lg"
                          style={{ color: 'var(--text-muted)', border: '1px solid var(--border)' }}
                        >
                          View
                        </Link>
                      )}
                      <Link
                        href={`/admin/edit/${post.id}`}
                        className="text-xs px-3 py-1.5 rounded-lg"
                        style={{ color: 'var(--accent)', border: '1px solid rgba(0,212,255,0.2)' }}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleToggle(post.id)}
                        disabled={toggling === post.id}
                        className="text-xs px-3 py-1.5 rounded-lg"
                        style={{
                          color: post.published ? '#F59E0B' : '#10B981',
                          border: `1px solid ${post.published ? 'rgba(245,158,11,0.2)' : 'rgba(16,185,129,0.2)'}`,
                          cursor: toggling === post.id ? 'not-allowed' : 'pointer',
                        }}
                      >
                        {toggling === post.id ? '...' : post.published ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        disabled={deleting === post.id}
                        className="text-xs px-3 py-1.5 rounded-lg"
                        style={{ color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)', cursor: deleting === post.id ? 'not-allowed' : 'pointer' }}
                      >
                        {deleting === post.id ? '...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (!isAuthenticated(req)) {
    return { redirect: { destination: '/admin', permanent: false } }
  }
  const posts = getAllPosts()
  return { props: { posts } }
}
