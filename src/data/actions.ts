import type { ActionTask } from '@/types'

// SLA windows by severity (hours)
export const SLA_HOURS = { critical: 4, high: 24, medium: 72, low: 168 } as const

export const SEVERITY_META = {
  critical: { label: 'Critical', cls: 'text-signal-risk', chip: 'border-signal-risk/20 bg-signal-risk-soft text-signal-risk' },
  high: { label: 'High', cls: 'text-signal-warning', chip: 'border-signal-warning/20 bg-signal-warning-soft text-signal-warning' },
  medium: { label: 'Medium', cls: 'text-signal-info', chip: 'border-signal-info/20 bg-signal-info-soft text-signal-info' },
  low: { label: 'Low', cls: 'text-ink-subtle', chip: 'border-hairline bg-canvas-subtle text-ink-subtle' },
} as const

export const STATUS_COLUMN = [
  { key: 'open', label: 'Open' },
  { key: 'in_progress', label: 'In progress' },
  { key: 'resolved', label: 'Resolved' },
  { key: 'verified', label: 'Verified' },
] as const

export const actions: ActionTask[] = [
  { id: 'ACT-4471', title: 'Deep-clean shower grout — mould in stall 4', club: 'Leeds', category: 'cleanliness', severity: 'critical', status: 'in_progress', assignee: 'Tomasz Lewandowski', role: 'Cleaning team', slaHours: 4, ageHours: 3, source: 'Audit AUD-24817 · item L1', escalated: true },
  { id: 'ACT-4472', title: 'Tag & isolate faulty cross-trainer #6', club: 'Leeds', category: 'safety', severity: 'critical', status: 'open', assignee: 'Dan Whitaker', role: 'Maintenance team', slaHours: 4, ageHours: 2, source: 'Audit AUD-24817 · item G4' },
  { id: 'ACT-4473', title: 'Sanitise & de-dust treadmill #14 belt housing', club: 'Leeds', category: 'equipment', severity: 'high', status: 'open', assignee: 'Dan Whitaker', role: 'Maintenance team', slaHours: 24, ageHours: 1, source: 'AI flag · IMG-AUD24817-014' },
  { id: 'ACT-4474', title: 'Clear standing water at locker-room vanity', club: 'Leeds', category: 'safety', severity: 'high', status: 'in_progress', assignee: 'Tomasz Lewandowski', role: 'Cleaning team', slaHours: 24, ageHours: 3, source: 'Audit AUD-24817 · item L2' },
  { id: 'ACT-4475', title: 'Repair locker 212 latch', club: 'Leeds', category: 'member', severity: 'medium', status: 'open', assignee: 'Dan Whitaker', role: 'Maintenance team', slaHours: 72, ageHours: 4, source: 'Audit AUD-24817 · item L3' },
  { id: 'ACT-4458', title: 'Re-rack free weights & reset zone', club: 'Leeds', category: 'equipment', severity: 'low', status: 'resolved', assignee: 'Megan Hart', role: 'Club manager', slaHours: 168, ageHours: 20, source: 'Audit AUD-24817 · item F1' },
  { id: 'ACT-4402', title: 'Service 4 cardio machines flagged for wear', club: 'Liverpool', category: 'equipment', severity: 'high', status: 'in_progress', assignee: 'Sara Quinn', role: 'Maintenance team', slaHours: 24, ageHours: 31, source: 'Audit AUD-24690 · cardio zone', escalated: true },
  { id: 'ACT-4388', title: 'Recurring cleanliness sweep — changing rooms', club: 'Nottingham', category: 'cleanliness', severity: 'high', status: 'in_progress', assignee: 'Olu Adeyemi', role: 'Cleaning team', slaHours: 24, ageHours: 12, source: 'Predictive risk alert' },
  { id: 'ACT-4361', title: 'Proactive cleaning schedule uplift (peak hours)', club: 'Manchester Deansgate', category: 'cleanliness', severity: 'medium', status: 'verified', assignee: 'Priya Nair', role: 'Regional ops lead', slaHours: 72, ageHours: 40, source: 'Predictive forecast' },
  { id: 'ACT-4357', title: 'Reseal studio flooring edge', club: 'Sheffield', category: 'safety', severity: 'low', status: 'resolved', assignee: 'Ben Carter', role: 'Maintenance team', slaHours: 168, ageHours: 60, source: 'Audit AUD-24611 · studios' },
  { id: 'ACT-4341', title: 'Restock sanitiser stations — gym floor', club: 'Coventry', category: 'cleanliness', severity: 'medium', status: 'verified', assignee: 'Lucy Fields', role: 'Club manager', slaHours: 72, ageHours: 55, source: 'Audit AUD-24588 · item G5' },
  { id: 'ACT-4322', title: 'Replace worn cycle pedal straps (x6)', club: 'Leicester', category: 'equipment', severity: 'medium', status: 'open', assignee: 'Ravi Shah', role: 'Maintenance team', slaHours: 72, ageHours: 8, source: 'Audit AUD-24560 · studio kit' },
]

export const actionStats = {
  open: actions.filter((a) => a.status === 'open').length,
  inProgress: actions.filter((a) => a.status === 'in_progress').length,
  resolved: actions.filter((a) => a.status === 'resolved').length,
  verified: actions.filter((a) => a.status === 'verified').length,
  escalated: actions.filter((a) => a.escalated).length,
  portfolioOpen: 412,
  overdue: 23,
  avgResolutionHours: 41,
  closureWithProof: 100,
}

// The auto-generation moment — failed safety item → tracked task
export const autoGenExample = {
  item: 'Faulty cross-trainer #6 — untagged',
  audit: 'AUD-24817 · Gym Floor & Cardio',
  steps: [
    { label: 'Failed item detected', detail: 'Equipment safety check · weight 3' },
    { label: 'Corrective action created', detail: 'ACT-4472 · severity Critical' },
    { label: 'Assigned by role + rota', detail: 'Dan Whitaker · Maintenance team' },
    { label: 'SLA deadline set', detail: '4 hours · breach escalates to regional lead' },
    { label: 'Closure requires photo proof', detail: 'Verified before status clears' },
  ],
}
