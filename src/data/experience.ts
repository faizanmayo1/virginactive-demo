// Member Experience & Service Quality data

export interface ExperiencePoint {
  club: string
  region: string
  auditScore: number
  satisfaction: number // 0–100 member satisfaction
  nps: number
}

// Correlation: audit compliance vs member satisfaction (clear positive trend)
export const experiencePoints: ExperiencePoint[] = [
  { club: 'Mayfair', region: 'London', auditScore: 96, satisfaction: 94, nps: 72 },
  { club: 'Chelsea', region: 'London', auditScore: 95, satisfaction: 93, nps: 70 },
  { club: 'Canary Wharf', region: 'London', auditScore: 95, satisfaction: 91, nps: 66 },
  { club: 'Oxford', region: 'South', auditScore: 93, satisfaction: 90, nps: 64 },
  { club: 'Edinburgh', region: 'Scotland & Wales', auditScore: 92, satisfaction: 89, nps: 61 },
  { club: 'Brighton', region: 'South', auditScore: 91, satisfaction: 87, nps: 58 },
  { club: 'Birmingham Central', region: 'Midlands', auditScore: 90, satisfaction: 84, nps: 52 },
  { club: 'Newcastle', region: 'North', auditScore: 86, satisfaction: 80, nps: 44 },
  { club: 'Sheffield', region: 'North', auditScore: 83, satisfaction: 74, nps: 33 },
  { club: 'Liverpool', region: 'North', auditScore: 84, satisfaction: 72, nps: 28 },
  { club: 'Leeds', region: 'North', auditScore: 76, satisfaction: 61, nps: 12 },
]

export const experienceStats = {
  avgSatisfaction: 83,
  satisfactionTrend: -1.4,
  responsesAnalysed: 48230,
  correlation: 0.91, // audit vs satisfaction
  openComplaints: 312,
}

export const sentiment = { positive: 64, neutral: 22, negative: 14 }

export interface ComplaintCluster {
  theme: string
  count: number
  trend7d: number
  linkedFailure: string
  topClub: string
}

export const complaintClusters: ComplaintCluster[] = [
  { theme: 'Equipment unavailable / out of order', count: 148, trend7d: 18, linkedFailure: 'Equipment readiness', topClub: 'Leeds' },
  { theme: 'Cleanliness — changing rooms', count: 96, trend7d: 12, linkedFailure: 'Cleanliness', topClub: 'Leeds' },
  { theme: 'Showers & hygiene', count: 61, trend7d: 7, linkedFailure: 'Cleanliness', topClub: 'Nottingham' },
  { theme: 'Class availability & quality', count: 34, trend7d: -3, linkedFailure: 'Member experience', topClub: 'Liverpool' },
]

// The hero correlation: equipment downtime ↔ satisfaction at Leeds
export const downtimeHero = {
  club: 'Leeds',
  downtimeHours: 184,
  downtimeTrend: 41,
  satisfaction: 61,
  satisfactionTrend: -18,
  equipmentSatisfaction: 48,
  weeks: [
    { week: 'W1', downtime: 36, satisfaction: 79 },
    { week: 'W2', downtime: 52, satisfaction: 74 },
    { week: 'W3', downtime: 88, satisfaction: 69 },
    { week: 'W4', downtime: 121, satisfaction: 65 },
    { week: 'W5', downtime: 156, satisfaction: 63 },
    { week: 'W6', downtime: 184, satisfaction: 61 },
  ],
}

export const experienceScores = [
  { key: 'Cleanliness perception', value: 81 },
  { key: 'Equipment availability', value: 76 },
  { key: 'Class quality', value: 88 },
  { key: 'Staff & welcome', value: 90 },
]
