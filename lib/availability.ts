// lib/availability.ts — Availability status (NEXT_PUBLIC_* env vars)

function parseBool(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined || value === '') return fallback
  return value === 'true' || value === '1'
}

function parseJoiningDays(value: string | undefined): number | null {
  if (value === undefined || value === '') return 30
  if (value === 'none' || value === '0') return null
  const days = parseInt(value, 10)
  return Number.isFinite(days) && days > 0 ? days : 30
}

const isAvailable = parseBool(process.env.NEXT_PUBLIC_IS_AVAILABLE, true)
const joiningDays = parseJoiningDays(process.env.NEXT_PUBLIC_JOINING_DAYS)

const defaultJoiningNotice =
  joiningDays !== null
    ? `Open to opportunities — can join within ${joiningDays} days`
    : 'Open to opportunities'

export const availability = {
  isAvailable,
  /** Profile card status row, e.g. "Available — Full-time & Contract" */
  status:
    process.env.NEXT_PUBLIC_AVAILABILITY_STATUS ??
    (isAvailable ? 'Available — Full-time & Contract' : 'Not actively looking'),
  /** Hero badge */
  badge:
    process.env.NEXT_PUBLIC_AVAILABILITY_BADGE ??
    (isAvailable ? 'Available for opportunities' : 'Not available right now'),
  /** Navbar pill */
  navbarBadge:
    process.env.NEXT_PUBLIC_AVAILABILITY_NAVBAR ??
    (isAvailable ? 'Currently Available' : 'Not Available'),
  /** Contact section title */
  contactTitle:
    process.env.NEXT_PUBLIC_AVAILABILITY_CONTACT_TITLE ??
    (isAvailable ? '🟢 Currently Available' : '🔴 Not Available'),
  /** Contact section description */
  contactDetail:
    process.env.NEXT_PUBLIC_AVAILABILITY_DETAIL ??
    (isAvailable
      ? 'Open to full-time Flutter Developer roles (on-site Gurgaon / remote), freelance projects, and consulting engagements.'
      : 'Not taking on new roles at the moment. Feel free to reach out for future opportunities.'),
  /** Days until you can join (null = hide joining line) */
  joiningDays,
  /** Footer pill on profile card — override with NEXT_PUBLIC_JOINING_NOTICE */
  joiningNotice: process.env.NEXT_PUBLIC_JOINING_NOTICE ?? defaultJoiningNotice,
  statusIcon: isAvailable ? '🟢' : '🔴',
  accentColor: isAvailable ? '#10B981' : '#6B7280',
  accentBg: isAvailable ? 'rgba(16,185,129,0.07)' : 'rgba(107,114,128,0.08)',
  accentBorder: isAvailable ? 'rgba(16,185,129,0.2)' : 'rgba(107,114,128,0.25)',
} as const
