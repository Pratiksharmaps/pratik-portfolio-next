// lib/blog.ts — Blog post management using JSON file-based storage

import fs from 'fs'
import path from 'path'

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

const BLOG_FILE = path.join(process.cwd(), 'data', 'blogs.json')

function ensureBlogFile() {
  if (!fs.existsSync(BLOG_FILE)) {
    const samplePosts: BlogPost[] = [
      {
        id: '1',
        title: 'Getting Started with Riverpod in Flutter',
        slug: 'getting-started-with-riverpod-flutter',
        excerpt: 'A practical guide to state management with Riverpod — from basic providers to async notifiers and dependency injection.',
        content: `# Getting Started with Riverpod in Flutter\n\nRiverpod is my go-to state management solution for Flutter apps. After working with Provider, GetX, and Bloc, I find Riverpod strikes the best balance between power and simplicity.\n\n## Why Riverpod?\n\nRiverpod compiles-safe, meaning you can't accidentally access a provider that doesn't exist. It also supports auto-dispose, which is crucial for memory management in production apps.\n\n## Basic Setup\n\n\`\`\`dart\nfinal counterProvider = StateProvider<int>((ref) => 0);\n\nclass CounterWidget extends ConsumerWidget {\n  @override\n  Widget build(BuildContext context, WidgetRef ref) {\n    final count = ref.watch(counterProvider);\n    return Text('$count');\n  }\n}\n\`\`\`\n\n## AsyncNotifier for API Calls\n\nFor real-world apps, AsyncNotifier is where Riverpod really shines.\n\n\`\`\`dart\n@riverpod\nclass UserNotifier extends _$UserNotifier {\n  @override\n  Future<User> build() async {\n    return fetchUser();\n  }\n}\n\`\`\`\n\n## Conclusion\n\nRiverpod is production-ready and I've used it in multiple enterprise apps at Antino Labs. The compile-time safety alone is worth switching from Provider.`,
        tags: ['Flutter', 'Riverpod', 'State Management', 'Dart'],
        published: true,
        featured: true,
        createdAt: '2025-01-15T10:00:00.000Z',
        updatedAt: '2025-01-15T10:00:00.000Z',
        readTime: 5,
      },
      {
        id: '2',
        title: 'Firebase Firestore Optimization Tips for Flutter',
        slug: 'firebase-firestore-optimization-flutter',
        excerpt: 'Real-world tricks I learned optimizing Firestore in production apps — pagination, offline caching, and query structuring.',
        content: `# Firebase Firestore Optimization Tips for Flutter\n\nAfter using Firestore in 6+ production apps, I've learned some hard lessons about performance optimization.\n\n## 1. Always Paginate\n\nNever load all documents at once. Use \`limit()\` and \`startAfterDocument()\`.\n\n\`\`\`dart\nfinal query = firestore\n    .collection('orders')\n    .orderBy('createdAt', descending: true)\n    .limit(20);\n\`\`\`\n\n## 2. Enable Offline Persistence\n\n\`\`\`dart\nawait FirebaseFirestore.instance.settings = const Settings(\n  persistenceEnabled: true,\n  cacheSizeBytes: Settings.CACHE_SIZE_UNLIMITED,\n);\n\`\`\`\n\n## 3. Structure for Queries, Not Just Reads\n\nDesign your data model with your most common queries in mind. Firestore charges per document read, so flat structures often cost more.\n\n## Conclusion\n\nFirestore is powerful but expensive if misused. These patterns have saved significant costs in the Tranzact project.`,
        tags: ['Flutter', 'Firebase', 'Firestore', 'Performance'],
        published: true,
        featured: false,
        createdAt: '2025-02-10T10:00:00.000Z',
        updatedAt: '2025-02-10T10:00:00.000Z',
        readTime: 7,
      },
    ]
    fs.writeFileSync(BLOG_FILE, JSON.stringify(samplePosts, null, 2))
  }
}

export function getAllPosts(): BlogPost[] {
  ensureBlogFile()
  const data = fs.readFileSync(BLOG_FILE, 'utf-8')
  const posts: BlogPost[] = JSON.parse(data)
  return posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getPublishedPosts(): BlogPost[] {
  return getAllPosts().filter((p) => p.published)
}

export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts()
  return posts.find((p) => p.slug === slug) || null
}

export function getPostById(id: string): BlogPost | null {
  const posts = getAllPosts()
  return posts.find((p) => p.id === id) || null
}

export function savePost(post: BlogPost): void {
  ensureBlogFile()
  const posts = getAllPosts()
  const idx = posts.findIndex((p) => p.id === post.id)
  if (idx >= 0) {
    posts[idx] = { ...post, updatedAt: new Date().toISOString() }
  } else {
    posts.unshift({ ...post, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
  }
  fs.writeFileSync(BLOG_FILE, JSON.stringify(posts, null, 2))
}

export function deletePost(id: string): void {
  ensureBlogFile()
  const posts = getAllPosts().filter((p) => p.id !== id)
  fs.writeFileSync(BLOG_FILE, JSON.stringify(posts, null, 2))
}

export function togglePublish(id: string): BlogPost | null {
  ensureBlogFile()
  const posts = getAllPosts()
  const idx = posts.findIndex((p) => p.id === id)
  if (idx < 0) return null
  posts[idx].published = !posts[idx].published
  posts[idx].updatedAt = new Date().toISOString()
  fs.writeFileSync(BLOG_FILE, JSON.stringify(posts, null, 2))
  return posts[idx]
}
