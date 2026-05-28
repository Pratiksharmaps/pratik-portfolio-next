// pages/api/sitemap.xml.ts — Dynamic sitemap for SEO
import type { NextApiRequest, NextApiResponse } from 'next'
import { getPublishedPosts } from '@/lib/blog'
import { siteConfig } from '@/data/portfolio'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts = await getPublishedPosts()
  const base = siteConfig.url

  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'monthly' },
    { url: '/blog', priority: '0.9', changefreq: 'weekly' },
    { url: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map((p) => `  <url>
    <loc>${base}${p.url}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
${posts.map((p) => `  <url>
    <loc>${base}/blog/${p.slug}</loc>
    <lastmod>${new Date(p.updatedAt).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
</urlset>`

  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate')
  res.status(200).send(xml)
}
