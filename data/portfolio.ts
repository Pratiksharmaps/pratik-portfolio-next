// data/portfolio.ts — Single source of truth for all portfolio content

export const siteConfig = {
  name: 'Pratik Sharma',
  title: 'Flutter Developer | Mobile App Engineer',
  description:
    'Flutter Developer with 2.5+ years building production-grade Android & iOS apps for enterprise, government, and US clients. Specializing in Flutter, Firebase, Clean Architecture, Fastlane CI/CD, and AI-augmented development (utilizing ChatGPT, Cursor, and Claude).',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
  email: 'pratik.sde16@gmail.com',
  phone: '+91-7722929886',
  location: 'Gurgaon, Haryana, India',
  linkedin: 'https://www.linkedin.com/in/pratiksharma01',
  github: 'https://github.com/Pratiksharmaps',
  resumeUrl: process.env.NEXT_PUBLIC_RESUME_URL || '/Pratik_Sharma_Resume.pdf',
  ogImage: '/og-image.png',
  keywords: [
    'Flutter Developer',
    'Mobile App Developer',
    'Android Developer',
    'iOS Developer',
    'Firebase',
    'Dart',
    'Riverpod',
    'Bloc',
    'GetX',
    'Flutter Engineer India',
    'Gurgaon Developer',
    'Clean Architecture Flutter',
    'MVVM Flutter',
    'Fastlane CI/CD',
    'Shorebird OTA Updates',
    'Flutter Firebase Developer',
    'Play Store App Store Deployment',
    'Flutter State Management',
    'Flutter Performance Optimization',
    'AES Encryption Flutter',
    'RBAC Flutter',
  ],
}

export const skills = {
  core: [
    { name: 'Flutter', level: 95, icon: '📱' },
    { name: 'Dart', level: 93, icon: '🎯' },
    { name: 'Firebase', level: 90, icon: '🔥' },
    { name: 'REST APIs', level: 88, icon: '🔗' },
    { name: 'Riverpod', level: 87, icon: '⚡' },
    { name: 'Bloc / Cubit', level: 85, icon: '🧱' },
    { name: 'GetX', level: 84, icon: '🚀' },
    { name: 'Clean Architecture', level: 82, icon: '🏗️' },
  ],
  backend: [
    { name: 'Node.js', level: 70, icon: '🟢' },
    { name: 'Express.js',level: 68, icon: '⚙️' },
    // { name: 'AWS EC2', level: 65, icon: '☁️' },
    { name: 'MongoDB', level: 65, icon: '🍃' },
    { name: 'PostgreSQL', level: 62, icon: '🐘' },
    { name: 'SQFlite', level: 80, icon: '💾' },
  ],
  tools: [
    'Git / GitHub', 'Jira', 'Postman', 'Docker',
    'Fastlane', 'Shorebird', 'Android Studio', 'VS Code', 'PgAdmin',
    'Firebase Console', 'Play Console', 'App Store Connect',
  ],
}

export const experience = [
  {
    company: 'Antino Labs',
    role: 'Software Developer',
    period: 'Jun 2024 – Present',
    location: 'Gurgaon, India',
    type: 'Full-time',
    highlights: [
      'Led development across 6+ production apps serving 10,000+ end users with 95% on-time delivery',
      'Owned full lifecycle for 4 live apps (Tranzact, Ubuild, White Tiger, Rastafix) — architecture through App Store/Play Store',
      'Reduced crash frequency by 60% via structured error boundaries and retry logic across shared modules',
      'Automated Android/iOS build, signing, and store submission with Fastlane, cutting release effort by 40%',
      'Integrated Shorebird code push for OTA Flutter updates, reducing critical bug-fix delivery time by 70%',
    ],
  },
  {
    company: 'CMG Maritime',
    role: 'Flutter Developer Intern',
    period: 'Jan 2024 – May 2024',
    location: 'Remote / India',
    type: 'Internship',
    highlights: [
      'Built core learning and assessment modules for an Academy App using Flutter and Firebase',
      'Reduced average task completion time by 70% through UI/UX restructuring',
    ],
  },
]

export const projects = [
  {
    id: 'tranzact',
    name: 'Tranzact',
    subtitle: 'Enterprise Workflow Platform',
    description:
      'A production enterprise app with real-time data sync, role-based access control, and encrypted data workflows. Built for large-scale operations with Firebase and Riverpod state management.',
    longDescription:
      'Tranzact is a major client enterprise platform handling real-time business workflows. I owned the full Flutter architecture, implemented AES-encrypted local storage, RBAC, and optimized API load times from ~8s to under 2s using Riverpod-driven caching.',
    tech: ['Flutter', 'Firebase', 'Riverpod', 'REST APIs', 'Secure Storage', 'Firestore'],
    period: 'Feb 2025 – Present',
    highlights: [
      'Reduced API load times from ~8s to under 2s (80% improvement)',
      'Implemented role-based access control (RBAC) with AES-encrypted storage',
      'Zero critical incidents post-launch across canary + full releases',
    ],
    category: 'Enterprise',
    featured: true,
    color: '#00D4FF',
  },
  {
    id: 'luvia',
    name: 'Luvia Style',
    subtitle: 'AI Hairstyle & Wardrobe App',
    description:
      'Lifestyle app using ARKit/ARCore to analyze face metrics and generate personalized hairstyle recommendations via streaming AI. Built wardrobe manager for daily outfit pairing and style suggestions.',
    longDescription:
      'Luvia Style is a cross-platform AI lifestyle app built from scratch. I integrated ARKit (iOS) and ARCore (Android) for real-time face shape measurement, implemented a streaming API so AI hairstyle results appear instantly, and built a full wardrobe management module. Led a 4-person team through design, development, and App Store + Play Store launch.',
    tech: ['Flutter', 'FastAPI', 'Supabase', 'ARKit', 'ARCore', 'Streaming API', 'Dart'],
    period: 'Active',
    highlights: [
      'ARKit (iOS) + ARCore (Android) for real-time face shape detection and metrics',
      'Auto-capture face scanning with live detection feedback',
      'Streaming API for instant AI results — zero buffering, real-time preview',
      'Server caching to minimize redundant AI inference calls and reduce latency',
      'Wardrobe manager: organize items, daily outfit pairs, smart purchase recommendations',
      'Led 4-person cross-functional team from MVP to App Store + Play Store launch',
    ],
    category: 'Consumer',
    featured: true,
    color: '#00E5FF',
  },
  {
    id: 'ubuild',
    name: 'Ubuild',
    subtitle: 'Construction Management App',
    description:
      'End-to-end construction project management app built from scratch with offline-first SQFlite caching and full Play Store / App Store deployment.',
    longDescription:
      'Ubuild simplifies construction project management. I architected the app from zero using Clean Architecture, implemented offline caching with SQFlite, and reduced crash rate from 15+/day to under 6 within 3 months.',
    tech: ['Flutter', 'Firebase', 'GetX', 'SQFlite', 'REST APIs', 'Clean Architecture'],
    period: 'Jun 2024 – Oct 2024',
    highlights: [
      'Reduced crash rate by 60% (15+/day → under 6/day)',
      'SQFlite offline caching for field-worker usability',
      'Zero rollbacks across 4 Play Store / App Store releases',
    ],
    category: 'Enterprise',
    featured: true,
    color: '#F59E0B',
  },
  {
    id: 'zoretime',
    name: 'ZoreTime',
    subtitle: 'US Fitness Subscription App',
    description:
      'Cross-platform fitness app for a US client integrating Apple HealthKit, Google Maps for gym discovery, and subscription management.',
    longDescription:
      'ZoreTime is a fitness subscription platform for the US market. I built the complete cross-platform app, integrating Apple HealthKit for health data sync, Google Maps SDK for live gym discovery, and handled async collaboration with the US product team.',
    tech: ['Flutter', 'Firebase', 'Google Maps SDK', 'Apple HealthKit', 'Bloc/Cubit'],
    period: 'Dec 2024 – Feb 2025',
    highlights: [
      'Increased weekly active user engagement by 35% post-launch',
      'Apple HealthKit real-time health data sync',
      'Async delivery across US + India time zones, all milestones on schedule',
    ],
    category: 'Consumer',
    featured: true,
    color: '#10B981',
  },
  {
    id: 'calendar-task',
    name: 'Calendar & Task Manager',
    subtitle: 'Internal Productivity Tool',
    description:
      'Full-stack productivity tool with AWS backend, Google Calendar/Meet integration, and automated scheduling via dynamic-link onboarding.',
    longDescription:
      'An internal calendar and task management system built with a Flutter frontend and Node.js + Express.js backend deployed on AWS EC2. Integrated Google Calendar API and Meet SDK for automated scheduling.',
    tech: ['Flutter', 'Node.js', 'Google Calendar API', 'Express.js'],
    period: 'Jan 2025 – Mar 2025',
    highlights: [
      'Improved team scheduling efficiency by 45%',
      // 'AWS EC2 + Node.js backend with real-time sync',
      'Google Calendar + Meet SDK automated scheduling',
    ],
    category: 'Internal',
    featured: false,
    color: '#8B5CF6',
  },
  {
    id: 'white-tiger',
    name: 'White Tiger',
    subtitle: 'Government Criminal Verification',
    description:
      'Government-grade criminal verification system using face-recognition APIs and image processing pipeline for law enforcement.',
    longDescription:
      'White Tiger is a government project for criminal verification built with Flutter, Firebase, and face-recognition APIs. Implemented image-to-base64 processing pipeline and Bloc state management for secure, fast verification workflows.',
    tech: ['Flutter', 'Firebase', 'Bloc', 'Face Recognition APIs', 'REST APIs'],
    period: 'Oct 2024 – Dec 2024',
    highlights: [
      'Cut manual verification time by 60%',
      'Face-recognition API + image-to-base64 pipeline',
      'Government-grade security compliance',
    ],
    category: 'Government',
    featured: false,
    color: '#EF4444',
  },
  {
    id: 'rastafix',
    name: 'Rastafix',
    subtitle: 'Civic Issue Reporting App',
    description:
      'Civic issue reporting app adopted by local government bodies, reducing average issue resolution time from 10 days to 5 days.',
    longDescription:
      'Rastafix is a civic reporting app enabling citizens to report road and infrastructure issues. Adopted by local government, it reduced resolution time significantly using a streamlined Bloc-based Flutter architecture.',
    tech: ['Flutter', 'Firebase', 'GetX', 'Bloc', 'REST APIs', 'Push Notifications'],
    period: 'Oct 2024 – Dec 2024',
    highlights: [
      'Reduced issue resolution from 10 days → 5 days (50% improvement)',
      'Adopted by local government body',
      'Push notification workflow for real-time status updates',
    ],
    category: 'Government',
    featured: false,
    color: '#F97316',
  },
  
]

export const webProjects = [
  {
    id: 'awesome-in',
    name: 'Awesome.in',
    subtitle: 'Lifestyle & Deals Platform',
    description:
      'Freelance WordPress website for an Indian lifestyle and deals platform. Custom theme development with responsive design and SEO-optimized architecture.',
    tech: ['WordPress', 'PHP', 'HTML/CSS', 'JavaScript'],
    link: 'https://aweesome.in',
    category: 'Freelance',
    color: '#3B82F6',
    highlights: [
      'Custom WordPress theme built from scratch',
      'Responsive design optimized for mobile and desktop',
      'SEO-friendly architecture and performance tuning',
    ],
  },
  {
    id: 'cmg-maritime-web',
    name: 'CMG Maritime',
    subtitle: 'Maritime Academy Website',
    description:
      'Corporate website for CMG Maritime — a maritime training and certification academy. Custom WordPress build with course listings and academy information.',
    tech: ['WordPress', 'PHP', 'HTML/CSS'],
    link: 'https://cmgmaritime.com',
    category: 'Freelance',
    color: '#0EA5E9',
    highlights: [
      'Corporate website for maritime training academy',
      'Course catalog, enrollment info, and contact pages',
      'Responsive layout with brand-consistent design',
    ],
  },
  {
    id: 'relax-stay',
    name: 'Relax Stay',
    subtitle: 'Hotel Presentation Website',
    description:
      'A hotel presentation and booking website built in Next.js using AI design tools to craft a modern glassmorphic look.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'AI Tools'],
    link: 'https://relax-stay.vercel.app',
    github: 'https://github.com/Pratiksharmaps/relax-stay',
    category: 'Personal',
    color: '#F59E0B',
    highlights: [
      'Clean room presentations and details layout',
      'Modern aesthetics designed using AI prompts',
      'Optimized loading times and responsive grid layout',
    ],
  },
  {
    id: 'glide-scape',
    name: 'Glide Scape',
    subtitle: 'Client Portfolio & Biography',
    description:
      'A premium biographical presentation and portfolio website built for a client using Next.js and smooth Framer Motion animations.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    link: 'https://glide-scape.vercel.app/',
    github: 'https://github.com/Pratiksharmaps/GlideScape.git',
    category: 'Freelance',
    color: '#A855F7',
    highlights: [
      'Interactive Framer Motion page transitions',
      'Bespoke layout showcasing client biography and work',
      'Fully responsive UI with performance optimization',
    ],
  },
]

export const education = [
  {
    institution: 'Guru Ghasidas Vishwavidyalaya, Bilaspur',
    degree: 'Masters of Computer Application (MCA)',
    period: 'Jul 2022 – Jun 2024',
  },
  {
    institution: 'Atal Bihari Vajpayee Vishwavidyalaya, Bilaspur',
    degree: 'Bachelors of Computer Application (BCA)',
    period: 'Jul 2018 – Jun 2021',
  },
]

export const stats = [
  { label: 'Production Apps', value: '7+', count: 7, suffix: '+' },
  { label: 'On-time Delivery', value: '95%', count: 95, suffix: '%' },
  { label: 'End Users Served', value: '10K+', count: 10, suffix: 'K+' },
  { label: 'Experience', value: '2.5+ Yrs', count: 2, suffix: '.5+ Yrs' },
]
