// pages/admin/new.tsx — Create new blog post
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'
import SEOHead from '@/components/ui/SEOHead'
import { isAuthenticated } from '@/lib/auth'
import { generateSlug, calculateReadTime } from '@/lib/utils'

export default function NewPost() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: '',
    published: false,
    featured: false,
  })

  const handleSave = async (publishNow?: boolean) => {
    if (!form.title.trim() || !form.content.trim()) {
      alert('Title and content are required.')
      return
    }
    setSaving(true)
    const slug = generateSlug(form.title)
    const readTime = calculateReadTime(form.content)
    const post = {
      id: Date.now().toString(),
      title: form.title.trim(),
      slug,
      excerpt: form.excerpt.trim() || form.content.slice(0, 160).replace(/[#*`]/g, '').trim() + '...',
      content: form.content,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      published: publishNow ?? form.published,
      featured: form.featured,
      readTime,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    const res = await fetch('/api/blog/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    })
    setSaving(false)
    if (res.ok) router.push('/admin/dashboard')
    else alert('Failed to save. Try again.')
  }

  return (
    <>
      <SEOHead title="New Post — Admin" noIndex />
      <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
        {/* Header */}
        <header
          className="sticky top-0 z-10 border-b"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <Link href="/admin/dashboard" className="text-sm flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Dashboard
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSave(false)}
                disabled={saving}
                className="text-xs px-4 py-2 rounded-lg"
                style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)', cursor: saving ? 'not-allowed' : 'pointer' }}
              >
                Save Draft
              </button>
              <button
                onClick={() => handleSave(true)}
                disabled={saving}
                className="text-xs px-4 py-2 rounded-lg font-medium text-black"
                style={{ background: saving ? 'var(--text-muted)' : 'var(--accent)', cursor: saving ? 'not-allowed' : 'pointer' }}
              >
                {saving ? 'Saving...' : 'Publish'}
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col gap-5">
            {/* Title */}
            <input
              type="text"
              placeholder="Post title..."
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="text-3xl font-bold bg-transparent outline-none w-full"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}
            />

            {/* Excerpt */}
            <div>
              <label className="block text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>
                Excerpt (shown in blog listing)
              </label>
              <textarea
                rows={2}
                placeholder="Brief description of this post..."
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-body)',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>
                Tags (comma separated, e.g. Flutter, Riverpod, Firebase)
              </label>
              <input
                type="text"
                placeholder="Flutter, Riverpod, State Management"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-mono)',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
              />
            </div>

            {/* Options */}
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="w-4 h-4 rounded"
                  style={{ accentColor: 'var(--accent)' }}
                />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Mark as Featured</span>
              </label>
            </div>

            {/* Content editor */}
            <div>
              <label className="block text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>
                Content (Markdown supported — use # for headings, **bold**, `code`, ```codeblock```)
              </label>
              <textarea
                rows={28}
                placeholder={`# Your Post Title\n\nWrite your Flutter learnings here using Markdown...\n\n## Section Heading\n\nSome paragraph text.\n\n\`\`\`dart\n// Code example\nvoid main() {}\n\`\`\``}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-y"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                  lineHeight: '1.7',
                  minHeight: '500px',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
              />
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (!isAuthenticated(req)) return { redirect: { destination: '/admin', permanent: false } }
  return { props: {} }
}
