// data/portfolio.ts — Single source of truth for all portfolio content

export const siteConfig = {
  name: 'Pratik Sharma',
  title: 'Flutter Developer | Mobile App Engineer',
  description:
    'Mid-level Flutter Developer with 1+ year building production-grade Android & iOS apps for enterprise, government, and US clients. Specializing in Flutter, Firebase, Clean Architecture, and scalable mobile solutions.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
  email: 'pratik.sde16@gmail.com',
  phone: '+91-7722929886',
  location: 'Gurgaon, Haryana, India',
  linkedin: 'https://www.linkedin.com/in/pratiksharma01',
  github: 'https://github.com/Pratiksharmaps',
  resumeUrl: '/Pratik_Sharma_Resume.pdf',
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
    'React Native Alternative',
    'Flutter Engineer India',
    'Gurgaon Developer',
    'Clean Architecture Flutter',
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
    { name: 'Express.js', level: 68, icon: '⚙️' },
    { name: 'AWS EC2', level: 65, icon: '☁️' },
    { name: 'MongoDB', level: 65, icon: '🍃' },
    { name: 'PostgreSQL', level: 62, icon: '🐘' },
    { name: 'SQFlite', level: 80, icon: '💾' },
  ],
  tools: [
    'Git / GitHub', 'Jira', 'Postman', 'Docker',
    'Jenkins', 'Android Studio', 'VS Code', 'PgAdmin',
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
      'Led Flutter development across 6+ production apps in a team of 8+ engineers with 95% on-time delivery',
      'Owned full lifecycle for 4 live apps (Tranzact, Ubuild, White Tiger, Rastafix) serving 10,000+ end users',
      'Reduced average crash frequency by 60% by implementing structured error boundaries and retry logic',
      'Established CI/CD pipelines using Jenkins and GitHub Actions, cutting manual release effort by ~40%',
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
    tech: ['Flutter', 'Node.js', 'AWS EC2', 'Google Calendar API', 'Express.js'],
    period: 'Jan 2025 – Mar 2025',
    highlights: [
      'Improved team scheduling efficiency by 45%',
      'AWS EC2 + Node.js backend with real-time sync',
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

export const education = [
  {
    institution: 'Guru Ghasidas Vishwavidyalaya, Bilaspur',
    degree: 'Masters of Computer Application (MCA)',
    grade: 'CGPA: 8.01 / 10',
    period: 'Jul 2022 – Jun 2024',
  },
  {
    institution: 'Atal Bihari Vajpayee Vishwavidyalaya, Bilaspur',
    degree: 'Bachelors of Computer Application (BCA)',
    grade: '75%',
    period: 'Jul 2018 – Jun 2021',
  },
]

export const stats = [
  { label: 'Production Apps', value: '6+' },
  { label: 'On-time Delivery', value: '95%' },
  { label: 'End Users Served', value: '10K+' },
  { label: 'Experience', value: '1+ Yr' },
]
