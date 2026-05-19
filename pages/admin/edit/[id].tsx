// pages/admin/edit/[id].tsx — Edit existing blog post
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'
import SEOHead from '@/components/ui/SEOHead'
import { isAuthenticated } from '@/lib/auth'
import { getPostById, BlogPost } from '@/lib/blog'
import { generateSlug, calculateReadTime } from '@/lib/utils'

interface Props { post: BlogPost }

export default function EditPost({ post }: Props) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    tags: post.tags.join(', '),
    published: post.published,
    featured: post.featured,
  })

  const handleSave = async (published?: boolean) => {
    setSaving(true)
    const updated = {
      ...post,
      title: form.title.trim(),
      slug: generateSlug(form.title),
      excerpt: form.excerpt.trim(),
      content: form.content,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      published: published ?? form.published,
      featured: form.featured,
      readTime: calculateReadTime(form.content),
    }
    const res = await fetch('/api/blog/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    })
    setSaving(false)
    if (res.ok) router.push('/admin/dashboard')
    else alert('Failed to save.')
  }

  return (
    <>
      <SEOHead title={`Edit: ${post.title}`} noIndex />
      <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
        <header className="sticky top-0 z-10 border-b" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <Link href="/admin/dashboard" className="text-sm flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Dashboard
            </Link>
            <div className="flex items-center gap-2">
              <button onClick={() => handleSave(false)} disabled={saving} className="text-xs px-4 py-2 rounded-lg" style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)', cursor: saving ? 'not-allowed' : 'pointer' }}>
                Save Draft
              </button>
              <button onClick={() => handleSave(true)} disabled={saving} className="text-xs px-4 py-2 rounded-lg font-medium text-black" style={{ background: saving ? 'var(--text-muted)' : 'var(--accent)', cursor: saving ? 'not-allowed' : 'pointer' }}>
                {saving ? 'Saving...' : form.published ? 'Update' : 'Publish'}
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-xs px-2 py-1 rounded" style={{ background: form.published ? 'rgba(16,185,129,0.1)' : 'rgba(107,114,128,0.1)', color: form.published ? '#10B981' : 'var(--text-muted)' }}>
              {form.published ? 'Published' : 'Draft'}
            </span>
            <span className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              Editing: {post.slug}
            </span>
          </div>
          <div className="flex flex-col gap-5">
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="text-3xl font-bold bg-transparent outline-none w-full"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }} />
            <div>
              <label className="block text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>Excerpt</label>
              <textarea rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border)'} />
            </div>
            <div>
              <label className="block text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>Tags (comma separated)</label>
              <input type="text" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border)'} />
            </div>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4" style={{ accentColor: 'var(--accent)' }} />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Featured</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="w-4 h-4" style={{ accentColor: 'var(--accent)' }} />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Published</span>
              </label>
            </div>
            <div>
              <label className="block text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>Content (Markdown)</label>
              <textarea rows={28} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-y"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', lineHeight: '1.7', minHeight: '500px' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border)'} />
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                ~{calculateReadTime(form.content)} min read · {form.content.split(/\s+/).filter(Boolean).length} words
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  if (!isAuthenticated(req)) return { redirect: { destination: '/admin', permanent: false } }
  const post = getPostById(params?.id as string)
  if (!post) return { notFound: true }
  return { props: { post } }
}
