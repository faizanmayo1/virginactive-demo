import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarClock, CheckSquare, ClipboardList, FileWarning, ShieldAlert, Sparkles } from 'lucide-react'

import { HeaderStat, PageHeader } from '@/components/blueprint/PageHeader'
import { SectionHead } from '@/components/blueprint/SectionHead'
import { StatusChip, StatusDot } from '@/components/blueprint/ScoreRing'
import { Button } from '@/components/ui/button'
import { clubs, regions } from '@/data/clubs'
import { actions } from '@/data/actions'
import type { RegionName } from '@/types'
import { cn } from '@/utils/cn'

const REGION_NAMES = regions.map((r) => r.name)

const AUDIT_TYPE = {
  planned: { label: 'Planned', chip: 'border-signal-info/20 bg-signal-info-soft text-signal-info' },
  surprise: { label: 'Surprise', chip: 'border-azure/30 bg-azure-soft text-azure-deep' },
  risk: { label: 'Risk-based', chip: 'border-signal-warning/20 bg-signal-warning-soft text-signal-warning' },
} as const

const schedule: { club: string; region: RegionName; type: keyof typeof AUDIT_TYPE; when: string; inspector: string }[] = [
  { club: 'Leeds', region: 'North', type: 'risk', when: 'Today · re-audit', inspector: 'Priya Nair' },
  { club: 'Liverpool', region: 'North', type: 'risk', when: 'Tomorrow 10:00', inspector: 'Priya Nair' },
  { club: 'Manchester Deansgate', region: 'North', type: 'surprise', when: 'Sat 07:00', inspector: 'Marcus Reid' },
  { club: 'Sheffield', region: 'North', type: 'planned', when: 'Mon 09:00', inspector: 'Marcus Reid' },
  { club: 'Nottingham', region: 'Midlands', type: 'risk', when: 'Tomorrow 14:00', inspector: 'Hannah Cole' },
  { club: 'Birmingham Central', region: 'Midlands', type: 'planned', when: 'Wed 09:00', inspector: 'Hannah Cole' },
  { club: 'Leicester', region: 'Midlands', type: 'surprise', when: 'Thu 08:00', inspector: 'Hannah Cole' },
  { club: 'Mayfair', region: 'London', type: 'planned', when: 'Fri 11:00', inspector: 'Sofia Marsh' },
  { club: 'Chelsea', region: 'London', type: 'planned', when: 'Mon 10:00', inspector: 'Sofia Marsh' },
  { club: 'Reading', region: 'South', type: 'risk', when: 'Wed 13:00', inspector: 'Tom Bailey' },
  { club: 'Brighton', region: 'South', type: 'surprise', when: 'Fri 08:00', inspector: 'Tom Bailey' },
  { club: 'Edinburgh', region: 'Scotland & Wales', type: 'planned', when: 'Tue 10:00', inspector: 'Iona Fraser' },
  { club: 'Cardiff', region: 'Scotland & Wales', type: 'risk', when: 'Thu 12:00', inspector: 'Iona Fraser' },
]

export function RegionalHub() {
  const navigate = useNavigate()
  const [region, setRegion] = useState<RegionName>('North')
  const meta = regions.find((r) => r.name === region)!

  const regionClubs = useMemo(() => clubs.filter((c) => c.region === region).sort((a, b) => a.overall - b.overall), [region])
  const regionActions = useMemo(() => actions.filter((a) => regionClubs.some((c) => c.name === a.club)), [regionClubs])
  const escalations = regionActions.filter((a) => a.escalated)
  const reviews = regionActions.filter((a) => a.status === 'resolved')
  const regionSchedule = schedule.filter((s) => s.region === region)
  const belowThreshold = regionClubs.filter((c) => c.overall < 90)

  return (
    <div className="mx-auto max-w-[1320px] px-4 py-7 lg:px-8">
      <PageHeader
        eyebrow="Regional control"
        title="Regional Manager Hub"
        description="Actionable control for regional leaders — compare clubs, clear SLA breaches, work the task queue, and schedule risk-based inspections where they matter."
        actions={<Button variant="amber" size="sm"><CalendarClock className="h-4 w-4" />Schedule audit</Button>}
      />

      {/* region tabs */}
      <div className="mt-5 flex flex-wrap gap-2">
        {REGION_NAMES.map((r) => {
          const rm = regions.find((x) => x.name === r)!
          return (
            <button
              key={r}
              type="button"
              onClick={() => setRegion(r)}
              className={cn('flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors', region === r ? 'border-steel bg-steel text-white' : 'border-hairline bg-card text-ink-muted hover:border-hairline-strong')}
            >
              {r}
              <span className={cn('font-mono text-[10px] tabular', region === r ? 'text-steel-soft' : 'text-ink-faint')}>{rm.compliance}%</span>
              {rm.redClubs > 0 && <span className="h-1.5 w-1.5 rounded-full bg-signal-risk" />}
            </button>
          )
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border border-hairline bg-card px-5 py-3.5 shadow-card-sm">
        <HeaderStat label="Clubs" value={`${meta.clubs}`} />
        <HeaderStat label="Region compliance" value={`${meta.compliance}%`} tone={meta.compliance >= 90 ? 'positive' : 'warning'} />
        <HeaderStat label="7-day" value={`${meta.trend7d > 0 ? '+' : ''}${meta.trend7d}`} tone={meta.trend7d < 0 ? 'risk' : 'positive'} />
        <HeaderStat label="In breach" value={`${meta.redClubs}`} tone={meta.redClubs > 0 ? 'risk' : undefined} />
        <HeaderStat label="SLA breaches" value={`${escalations.length}`} tone={escalations.length ? 'risk' : 'positive'} />
        <HeaderStat label="Weakest standard" value={meta.weakest === 'member' ? 'Member exp.' : meta.weakest.charAt(0).toUpperCase() + meta.weakest.slice(1)} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        {/* club comparison */}
        <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <SectionHead title="Club comparison" hint={`${regionClubs.length} clubs · lowest first`} icon={ClipboardList} />
          <div className="mt-4 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-hairline font-mono text-[9.5px] uppercase tracking-[0.08em] text-ink-faint">
                  <th className="pb-2 font-medium">Club</th>
                  <th className="pb-2 text-right font-medium">Score</th>
                  <th className="pb-2 text-right font-medium">7d</th>
                  <th className="pb-2 text-right font-medium">Actions</th>
                  <th className="pb-2 text-right font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {regionClubs.map((c) => (
                  <tr key={c.id} className="border-b border-hairline/60 last:border-0 transition-colors hover:bg-canvas-subtle/50">
                    <td className="py-2.5">
                      <button type="button" onClick={() => navigate('/clubs')} className="flex items-center gap-2 text-left">
                        <StatusDot status={c.status} />
                        <span className="text-[12.5px] font-medium text-ink hover:text-azure-deep">{c.name}</span>
                      </button>
                    </td>
                    <td className={cn('py-2.5 text-right font-display text-[14px] font-bold tabular tracking-tight-bank', c.status === 'red' ? 'text-signal-risk' : 'text-ink')}>{c.overall}</td>
                    <td className={cn('py-2.5 text-right font-mono text-[11.5px] tabular', c.trend7d < 0 ? 'text-signal-risk' : 'text-signal-positive')}>{c.trend7d < 0 ? '▼' : '▲'}{Math.abs(c.trend7d)}</td>
                    <td className="py-2.5 text-right font-mono text-[12px] tabular text-ink-muted">{c.openActions}</td>
                    <td className="py-2.5 text-right"><StatusChip status={c.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {belowThreshold.length > 0 && (
            <p className="mt-4 flex items-center gap-2 rounded-lg border border-azure/30 bg-azure-soft/30 px-3 py-2.5 text-[12px] text-ink">
              <Sparkles className="h-4 w-4 shrink-0 text-azure" />
              {belowThreshold.length} clubs below the 90 threshold — {belowThreshold.map((c) => c.name).join(', ')}. Risk-based re-audits already scheduled.
            </p>
          )}
        </div>

        {/* task queue */}
        <div className="space-y-5">
          <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <SectionHead title="Manager task queue" hint="Escalations · reviews · approvals" icon={CheckSquare} />
            <ul className="mt-3.5 space-y-2">
              {escalations.map((a) => (
                <QueueRow key={a.id} icon={ShieldAlert} tone="risk" title={a.title} sub={`${a.club} · ${a.id}`} tag="Escalation" />
              ))}
              {reviews.map((a) => (
                <QueueRow key={a.id} icon={FileWarning} tone="warning" title={a.title} sub={`${a.club} · awaiting verify`} tag="Review" />
              ))}
              <QueueRow icon={CheckSquare} tone="info" title={`Approve weekly ops summary — ${region}`} sub="Auto-generated · ready to sign off" tag="Approval" />
              {escalations.length === 0 && reviews.length === 0 && (
                <li className="rounded-lg border border-dashed border-hairline py-6 text-center font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint">Queue clear</li>
              )}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-hairline bg-steel-900 p-5 text-white shadow-card-sm">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-steel-400">Weekly ops summary · {region}</p>
            <p className="mt-2 text-[13px] leading-relaxed text-steel-200">
              {region} compliance {meta.trend7d < 0 ? 'fell' : 'rose'} {Math.abs(meta.trend7d)} points to <span className="font-semibold text-white">{meta.compliance}%</span>.
              {meta.redClubs > 0 ? ` ${meta.redClubs} club${meta.redClubs > 1 ? 's' : ''} in breach, concentrated in ${meta.weakest}.` : ' No clubs in breach this week.'}
            </p>
            <div className="mt-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-azure-glow">
              <Sparkles className="h-3.5 w-3.5" />Generated every Monday 06:00
            </div>
          </div>
        </div>
      </div>

      {/* inspection scheduling */}
      <div className="mt-5 rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
        <SectionHead title="Inspection schedule" hint="Planned · surprise · risk-based" icon={CalendarClock} />
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {regionSchedule.map((s, i) => (
            <div key={i} className="rounded-lg border border-hairline bg-canvas-subtle/30 p-3.5">
              <div className="flex items-center justify-between">
                <span className={cn('rounded-full border px-2 py-0.5 font-mono text-[8.5px] font-semibold uppercase tracking-[0.06em]', AUDIT_TYPE[s.type].chip)}>{AUDIT_TYPE[s.type].label}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-ink-faint">{s.when}</span>
              </div>
              <p className="mt-2 text-[13px] font-semibold text-ink">{s.club}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-ink-faint">{s.inspector}</p>
            </div>
          ))}
          {regionSchedule.length === 0 && <p className="col-span-full py-6 text-center font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint">No inspections scheduled</p>}
        </div>
      </div>
    </div>
  )
}

function QueueRow({ icon: Icon, tone, title, sub, tag }: { icon: React.ComponentType<{ className?: string }>; tone: 'risk' | 'warning' | 'info'; title: string; sub: string; tag: string }) {
  const toneCls = tone === 'risk' ? 'bg-signal-risk-soft text-signal-risk' : tone === 'warning' ? 'bg-signal-warning-soft text-signal-warning' : 'bg-signal-info-soft text-signal-info'
  return (
    <li className="flex items-center gap-3 rounded-lg border border-hairline px-3 py-2.5">
      <span className={cn('grid h-7 w-7 shrink-0 place-items-center rounded-md', toneCls)}><Icon className="h-3.5 w-3.5" /></span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[12.5px] font-medium text-ink">{title}</p>
        <p className="truncate font-mono text-[9.5px] uppercase tracking-[0.06em] text-ink-faint">{sub}</p>
      </div>
      <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.08em] text-ink-subtle">{tag}</span>
    </li>
  )
}
