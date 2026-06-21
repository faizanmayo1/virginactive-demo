// Virgin Active — Brand Standards Intelligence · shared domain types

export type ComplianceStatus = 'green' | 'amber' | 'red'
export type Tone = 'positive' | 'warning' | 'risk' | 'info' | 'neutral'
export type ClubTier = 'Collection' | 'Classic' | 'Health Club'
export type RegionName = 'London' | 'South' | 'Midlands' | 'North' | 'Scotland & Wales'

export interface CategoryScores {
  cleanliness: number
  equipment: number
  safety: number
  member: number
}

export interface Club {
  id: string
  name: string
  city: string
  region: RegionName
  tier: ClubTier
  scores: CategoryScores
  overall: number
  status: ComplianceStatus
  trend7d: number // points change over 7 days
  openActions: number
  lastAudit: string
  members: number
  usageIndex: number // 0–100 traffic intensity
  // map placement (abstract UK coordinates, 0–100 viewport space)
  x: number
  y: number
}

export interface Region {
  name: RegionName
  clubs: number
  compliance: number
  trend7d: number
  redClubs: number
  weakest: keyof CategoryScores
}

export type AuditItemState = 'pass' | 'fail' | 'flag' | 'pending'

export interface AuditItem {
  id: string
  label: string
  state: AuditItemState
  weight: number
  note?: string
  photo?: boolean
  aiFlag?: string
}

export interface AuditZone {
  id: string
  name: string
  icon: string
  score: number
  items: AuditItem[]
  photos: number
}

export interface VisionDetection {
  id: string
  label: string
  severity: Tone
  confidence: number
  // bounding box in % of image
  x: number
  y: number
  w: number
  h: number
}

export interface ActionTask {
  id: string
  title: string
  club: string
  category: keyof CategoryScores
  severity: 'critical' | 'high' | 'medium' | 'low'
  status: 'open' | 'in_progress' | 'resolved' | 'verified'
  assignee: string
  role: string
  slaHours: number
  ageHours: number
  source: string
  escalated?: boolean
}
