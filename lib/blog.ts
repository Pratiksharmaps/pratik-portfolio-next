// lib/blog.ts — Blog post management using Firestore
import { db } from '@/lib/firebase-admin'

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  tags: string[]
  published: boolean
  featured: boolean
  createdAt: string
  updatedAt: string
  readTime?: number
  coverImage?: string
}

const COLLECTION = 'blogs'

function docToPost(doc: FirebaseFirestore.DocumentSnapshot): BlogPost {
  const data = doc.data()!
  return {
    id: doc.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    tags: data.tags ?? [],
    published: data.published ?? false,
    featured: data.featured ?? false,
    createdAt: data.createdAt ?? new Date().toISOString(),
    updatedAt: data.updatedAt ?? new Date().toISOString(),
    readTime: data.readTime,
    coverImage: data.coverImage,
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!db) throw new Error('Firestore not initialized')
  const snap = await db
    .collection(COLLECTION)
    .orderBy('createdAt', 'desc')
    .get()
  return snap.docs.map(docToPost)
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  if (!db) throw new Error('Firestore not initialized')
  const snap = await db
    .collection(COLLECTION)
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .get()
  return snap.docs.map(docToPost)
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!db) throw new Error('Firestore not initialized')
  const snap = await db
    .collection(COLLECTION)
    .where('slug', '==', slug)
    .limit(1)
    .get()
  if (snap.empty) return null
  return docToPost(snap.docs[0])
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  if (!db) throw new Error('Firestore not initialized')
  const doc = await db.collection(COLLECTION).doc(id).get()
  if (!doc.exists) return null
  return docToPost(doc)
}

export async function savePost(post: BlogPost): Promise<void> {
  if (!db) throw new Error('Firestore not initialized')
  const now = new Date().toISOString()
  const ref = db.collection(COLLECTION).doc(post.id)
  const existing = await ref.get()

  if (existing.exists) {
    await ref.update({ ...post, updatedAt: now })
  } else {
    await ref.set({ ...post, createdAt: now, updatedAt: now })
  }
}

export async function deletePost(id: string): Promise<void> {
  if (!db) throw new Error('Firestore not initialized')
  await db.collection(COLLECTION).doc(id).delete()
}

export async function togglePublish(id: string): Promise<BlogPost | null> {
  if (!db) throw new Error('Firestore not initialized')
  const ref = db.collection(COLLECTION).doc(id)
  const doc = await ref.get()
  if (!doc.exists) return null

  const current = doc.data()!
  const newPublished = !current.published
  const now = new Date().toISOString()
  await ref.update({ published: newPublished, updatedAt: now })

  return docToPost(await ref.get())
}
