import type { CategoryScores, Club, ComplianceStatus, Region } from '@/types'

// ── Weighted compliance model ─────────────────────────────────────────────
// Category importance weights (sum = 1). Cleanliness + equipment carry the most
// brand risk; safety is a hard floor; member experience rounds it out.
export const WEIGHTS: Record<keyof CategoryScores, number> = {
  cleanliness: 0.3,
  equipment: 0.3,
  safety: 0.25,
  member: 0.15,
}

export const CATEGORY_LABEL: Record<keyof CategoryScores, string> = {
  cleanliness: 'Cleanliness',
  equipment: 'Equipment readiness',
  safety: 'Safety compliance',
  member: 'Member experience',
}

// SLA thresholds — green / amber / red traffic-light status
export const THRESHOLD = { green: 90, amber: 80 } as const

export function weightedOverall(s: CategoryScores): number {
  return Math.round(
    s.cleanliness * WEIGHTS.cleanliness +
      s.equipment * WEIGHTS.equipment +
      s.safety * WEIGHTS.safety +
      s.member * WEIGHTS.member,
  )
}

export function statusOf(overall: number): ComplianceStatus {
  if (overall >= THRESHOLD.green) return 'green'
  if (overall >= THRESHOLD.amber) return 'amber'
  return 'red'
}

export const STATUS_META: Record<ComplianceStatus, { label: string; tone: 'positive' | 'warning' | 'risk'; hex: string }> = {
  green: { label: 'Compliant', tone: 'positive', hex: '#16A34A' },
  amber: { label: 'At risk', tone: 'warning', hex: '#D97706' },
  red: { label: 'Breach', tone: 'risk', hex: '#DC2626' },
}

// ── Seed clubs (representative of the 250-club portfolio) ──────────────────
type Seed = Omit<Club, 'overall' | 'status'>

const seeds: Seed[] = [
  // London — strongest region
  { id: 'va-mayfair', name: 'Mayfair', city: 'London', region: 'London', tier: 'Collection', scores: { cleanliness: 97, equipment: 96, safety: 98, member: 95 }, trend7d: 0.4, openActions: 1, lastAudit: '2 days ago', members: 4180, usageIndex: 71, x: 58, y: 63 },
  { id: 'va-chelsea', name: 'Chelsea', city: 'London', region: 'London', tier: 'Collection', scores: { cleanliness: 95, equipment: 94, safety: 97, member: 96 }, trend7d: 0.8, openActions: 2, lastAudit: '1 day ago', members: 3920, usageIndex: 78, x: 57, y: 64 },
  { id: 'va-kensington', name: 'Kensington', city: 'London', region: 'London', tier: 'Classic', scores: { cleanliness: 93, equipment: 92, safety: 96, member: 93 }, trend7d: -0.3, openActions: 3, lastAudit: '3 days ago', members: 3460, usageIndex: 74, x: 56, y: 63 },
  { id: 'va-islington', name: 'Islington', city: 'London', region: 'London', tier: 'Classic', scores: { cleanliness: 91, equipment: 90, safety: 94, member: 92 }, trend7d: 1.1, openActions: 4, lastAudit: '4 days ago', members: 3110, usageIndex: 81, x: 59, y: 62 },
  { id: 'va-canary', name: 'Canary Wharf', city: 'London', region: 'London', tier: 'Collection', scores: { cleanliness: 94, equipment: 95, safety: 97, member: 94 }, trend7d: 0.6, openActions: 2, lastAudit: '1 day ago', members: 4520, usageIndex: 88, x: 60, y: 63 },
  { id: 'va-barbican', name: 'Barbican', city: 'London', region: 'London', tier: 'Classic', scores: { cleanliness: 90, equipment: 88, safety: 93, member: 91 }, trend7d: -1.2, openActions: 6, lastAudit: '5 days ago', members: 2980, usageIndex: 76, x: 58, y: 64 },
  { id: 'va-wimbledon', name: 'Wimbledon', city: 'London', region: 'London', tier: 'Health Club', scores: { cleanliness: 92, equipment: 93, safety: 95, member: 92 }, trend7d: 0.2, openActions: 3, lastAudit: '2 days ago', members: 3340, usageIndex: 69, x: 57, y: 66 },

  // South
  { id: 'va-brighton', name: 'Brighton', city: 'Brighton', region: 'South', tier: 'Classic', scores: { cleanliness: 91, equipment: 92, safety: 94, member: 91 }, trend7d: 0.5, openActions: 4, lastAudit: '3 days ago', members: 2870, usageIndex: 72, x: 56, y: 67 },
  { id: 'va-reading', name: 'Reading', city: 'Reading', region: 'South', tier: 'Health Club', scores: { cleanliness: 86, equipment: 88, safety: 91, member: 89 }, trend7d: -1.6, openActions: 8, lastAudit: '6 days ago', members: 2540, usageIndex: 83, x: 54, y: 62 },
  { id: 'va-southampton', name: 'Southampton', city: 'Southampton', region: 'South', tier: 'Classic', scores: { cleanliness: 90, equipment: 91, safety: 93, member: 90 }, trend7d: 0.3, openActions: 5, lastAudit: '2 days ago', members: 2760, usageIndex: 70, x: 50, y: 66 },
  { id: 'va-oxford', name: 'Oxford', city: 'Oxford', region: 'South', tier: 'Collection', scores: { cleanliness: 93, equipment: 92, safety: 95, member: 93 }, trend7d: 0.9, openActions: 2, lastAudit: '1 day ago', members: 3050, usageIndex: 75, x: 51, y: 60 },

  // Midlands — mixed, drifting amber
  { id: 'va-birmingham', name: 'Birmingham Central', city: 'Birmingham', region: 'Midlands', tier: 'Collection', scores: { cleanliness: 90, equipment: 89, safety: 93, member: 90 }, trend7d: -0.7, openActions: 6, lastAudit: '3 days ago', members: 3680, usageIndex: 84, x: 47, y: 53 },
  { id: 'va-nottingham', name: 'Nottingham', city: 'Nottingham', region: 'Midlands', tier: 'Classic', scores: { cleanliness: 86, equipment: 85, safety: 91, member: 89 }, trend7d: -2.1, openActions: 9, lastAudit: '7 days ago', members: 2630, usageIndex: 79, x: 53, y: 49 },
  { id: 'va-leicester', name: 'Leicester', city: 'Leicester', region: 'Midlands', tier: 'Health Club', scores: { cleanliness: 84, equipment: 83, safety: 89, member: 88 }, trend7d: -1.4, openActions: 11, lastAudit: '8 days ago', members: 2410, usageIndex: 77, x: 52, y: 52 },
  { id: 'va-coventry', name: 'Coventry', city: 'Coventry', region: 'Midlands', tier: 'Classic', scores: { cleanliness: 85, equipment: 84, safety: 90, member: 88 }, trend7d: -0.9, openActions: 7, lastAudit: '5 days ago', members: 2290, usageIndex: 73, x: 50, y: 53 },

  // North — the equipment-compliance cluster; Leeds breaches
  { id: 'va-manchester', name: 'Manchester Deansgate', city: 'Manchester', region: 'North', tier: 'Collection', scores: { cleanliness: 90, equipment: 88, safety: 93, member: 90 }, trend7d: -1.0, openActions: 7, lastAudit: '3 days ago', members: 4040, usageIndex: 86, x: 46, y: 44 },
  { id: 'va-leeds', name: 'Leeds', city: 'Leeds', region: 'North', tier: 'Classic', scores: { cleanliness: 68, equipment: 74, safety: 86, member: 82 }, trend7d: -8.4, openActions: 14, lastAudit: '2 hours ago', members: 3220, usageIndex: 92, x: 51, y: 43 },
  { id: 'va-liverpool', name: 'Liverpool', city: 'Liverpool', region: 'North', tier: 'Classic', scores: { cleanliness: 82, equipment: 79, safety: 89, member: 87 }, trend7d: -3.2, openActions: 12, lastAudit: '4 days ago', members: 2880, usageIndex: 85, x: 43, y: 45 },
  { id: 'va-sheffield', name: 'Sheffield', city: 'Sheffield', region: 'North', tier: 'Health Club', scores: { cleanliness: 83, equipment: 80, safety: 88, member: 86 }, trend7d: -2.4, openActions: 10, lastAudit: '6 days ago', members: 2520, usageIndex: 80, x: 51, y: 46 },
  { id: 'va-newcastle', name: 'Newcastle', city: 'Newcastle', region: 'North', tier: 'Classic', scores: { cleanliness: 85, equipment: 84, safety: 90, member: 88 }, trend7d: -0.6, openActions: 6, lastAudit: '3 days ago', members: 2410, usageIndex: 74, x: 52, y: 35 },

  // Scotland & Wales
  { id: 'va-edinburgh', name: 'Edinburgh', city: 'Edinburgh', region: 'Scotland & Wales', tier: 'Collection', scores: { cleanliness: 92, equipment: 91, safety: 95, member: 92 }, trend7d: 0.7, openActions: 3, lastAudit: '2 days ago', members: 3160, usageIndex: 72, x: 46, y: 25 },
  { id: 'va-glasgow', name: 'Glasgow', city: 'Glasgow', region: 'Scotland & Wales', tier: 'Classic', scores: { cleanliness: 89, equipment: 90, safety: 93, member: 90 }, trend7d: 0.4, openActions: 5, lastAudit: '3 days ago', members: 2940, usageIndex: 76, x: 41, y: 27 },
  { id: 'va-cardiff', name: 'Cardiff', city: 'Cardiff', region: 'Scotland & Wales', tier: 'Health Club', scores: { cleanliness: 86, equipment: 87, safety: 91, member: 89 }, trend7d: -1.1, openActions: 7, lastAudit: '5 days ago', members: 2380, usageIndex: 71, x: 40, y: 62 },
]

export const clubs: Club[] = seeds
  .map((s) => {
    const overall = weightedOverall(s.scores)
    return { ...s, overall, status: statusOf(overall) }
  })
  .sort((a, b) => b.overall - a.overall)

export const clubById = (id: string) => clubs.find((c) => c.id === id)

// Hero club threaded through the demo narrative
export const HERO_CLUB_ID = 'va-leeds'
export const heroClub = clubById(HERO_CLUB_ID)!

// ── Region rollups (representative numbers stand in for the full 250) ──────
export const regions: Region[] = [
  { name: 'London', clubs: 62, compliance: 93.8, trend7d: 0.5, redClubs: 0, weakest: 'equipment' },
  { name: 'South', clubs: 44, compliance: 91.2, trend7d: 0.2, redClubs: 0, weakest: 'cleanliness' },
  { name: 'Scotland & Wales', clubs: 40, compliance: 90.4, trend7d: 0.3, redClubs: 0, weakest: 'cleanliness' },
  { name: 'Midlands', clubs: 46, compliance: 88.1, trend7d: -1.1, redClubs: 1, weakest: 'equipment' },
  { name: 'North', clubs: 58, compliance: 85.6, trend7d: -2.3, redClubs: 3, weakest: 'equipment' },
]

// ── Portfolio KPIs ────────────────────────────────────────────────────────
export const portfolio = {
  totalClubs: 250,
  compliance: 90.7,
  complianceTrend: -0.6,
  redClubs: 4,
  amberClubs: 31,
  auditsThisWeek: 184,
  auditCompletion: 96.2,
  openActions: 412,
  overdueActions: 23,
  avgResolutionHours: 41,
  aiInspections: 20418,
}

// 6-week portfolio compliance trend (for the command-center sparkline)
export const complianceTrend = [
  { week: 'W1', value: 92.1 },
  { week: 'W2', value: 92.0 },
  { week: 'W3', value: 91.6 },
  { week: 'W4', value: 91.4 },
  { week: 'W5', value: 91.0 },
  { week: 'W6', value: 90.7 },
]

export const categoryAverages: { key: keyof CategoryScores; value: number }[] = [
  { key: 'cleanliness', value: 89.4 },
  { key: 'equipment', value: 88.1 },
  { key: 'safety', value: 93.2 },
  { key: 'member', value: 90.6 },
]
