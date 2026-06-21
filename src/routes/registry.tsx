import {
  Activity,
  Building2,
  ClipboardCheck,
  LayoutDashboard,
  ListChecks,
  Map,
  ScanLine,
  Smile,
  type LucideIcon,
} from 'lucide-react'

import { ROUTES } from '@/routes/paths'

export interface RouteEntry {
  path: string
  section: string
  label: string
  short: string
  eyebrow: string
  icon: LucideIcon
  end?: boolean
  badge?: { text: string; variant: 'amber' | 'warning' }
}

export const routeRegistry: RouteEntry[] = [
  { path: ROUTES.root, end: true, section: 'Overview', label: 'Operational Command Center', short: 'Command Center', eyebrow: 'Portfolio · 250 clubs', icon: LayoutDashboard },

  { path: ROUTES.audit, section: 'Inspect', label: 'Mobile Audit', short: 'Mobile Audit', eyebrow: 'Field inspection', icon: ClipboardCheck, badge: { text: 'Live', variant: 'warning' } },
  { path: ROUTES.vision, section: 'Inspect', label: 'AI Photo Validation', short: 'Photo Validation', eyebrow: 'Computer vision', icon: ScanLine, badge: { text: 'AI', variant: 'amber' } },

  { path: ROUTES.clubs, section: 'Compliance', label: 'Club Compliance', short: 'Club Compliance', eyebrow: 'Scoring & drill-down', icon: Building2 },
  { path: ROUTES.actions, section: 'Operate', label: 'Action & Accountability', short: 'Actions', eyebrow: 'Corrective workflow', icon: ListChecks },
  { path: ROUTES.regions, section: 'Operate', label: 'Regional Manager Hub', short: 'Regional Hub', eyebrow: 'Regional control', icon: Map },

  { path: ROUTES.risk, section: 'Intelligence', label: 'Predictive Risk & Maintenance', short: 'Predictive Risk', eyebrow: 'Forecasting', icon: Activity, badge: { text: 'AI', variant: 'amber' } },
  { path: ROUTES.experience, section: 'Intelligence', label: 'Member Experience', short: 'Member Experience', eyebrow: 'Service quality', icon: Smile },
]

const SECTION_ORDER = ['Overview', 'Inspect', 'Compliance', 'Operate', 'Intelligence']

export function groupRoutesBySection() {
  return SECTION_ORDER.map((section) => ({
    section,
    entries: routeRegistry.filter((r) => r.section === section),
  }))
}

export function findRouteByPath(pathname: string): RouteEntry | undefined {
  if (pathname === '/') return routeRegistry[0]
  return routeRegistry.find((r) => r.path !== '/' && pathname.startsWith(r.path))
}
