// lib/seo.ts — SEO and structured data helpers

import { siteConfig } from '@/data/portfolio'

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Pratik Sharma',
    jobTitle: 'Flutter Developer',
    email: 'pratik.sde16@gmail.com',
    telephone: '+91-7722929886',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Gurgaon',
      addressRegion: 'Haryana',
      addressCountry: 'IN',
    },
    url: siteConfig.url,
    sameAs: [siteConfig.linkedin, siteConfig.github],
    knowsAbout: [
      'Flutter', 'Dart', 'Firebase', 'Mobile App Development',
      'Android Development', 'iOS Development', 'REST APIs',
      'State Management', 'Clean Architecture', 'MVVM', 'Riverpod', 'Bloc',
      'GetX', 'Fastlane', 'Shorebird', 'OTA Updates', 'CI/CD',
      'AES Encryption', 'RBAC', 'App Performance Optimization',
      'Play Store Deployment', 'App Store Connect', 'Firebase Crashlytics',
      'Node.js', 'AWS EC2', 'SQFlite', 'Hive', 'Google Maps SDK', 'Apple HealthKit',
    ],
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Guru Ghasidas Vishwavidyalaya',
      },
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Antino Labs',
    },
  }
}

export function generateBlogPostSchema(post: {
  title: string
  excerpt: string
  createdAt: string
  updatedAt: string
  slug: string
  tags: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: 'Pratik Sharma',
      url: siteConfig.url,
    },
    url: `${siteConfig.url}/blog/${post.slug}`,
    keywords: post.tags.join(', '),
    publisher: {
      '@type': 'Person',
      name: 'Pratik Sharma',
    },
  }
}
