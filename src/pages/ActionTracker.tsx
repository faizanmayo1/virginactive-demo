import { AlertTriangle, ArrowUpRight, Camera, CheckCircle2, Clock, ListChecks, ShieldAlert, Sparkles, Timer } from 'lucide-react'

import { HeaderStat, PageHeader } from '@/components/blueprint/PageHeader'
import { SectionHead } from '@/components/blueprint/SectionHead'
import { KPICard } from '@/components/blueprint/KPICard'
import { actionStats, actions, autoGenExample, SEVERITY_META, STATUS_COLUMN } from '@/data/actions'
import type { ActionTask } from '@/types'
import { cn } from '@/utils/cn'

const STATUS_ACCENT: Record<string, string> = {
  open: 'bg-signal-info',
  in_progress: 'bg-signal-warning',
  resolved: 'bg-signal-positive',
  verified: 'bg-steel',
}

export function ActionTracker() {
  return (
    <div className="mx-auto max-w-[1320px] px-4 py-7 lg:px-8">
      <PageHeader
        eyebrow="Corrective workflow"
        title="Action & Accountability"
        description="Every failed audit item becomes tracked work — assigned by role, deadlined by severity, escalated when overdue, and closed only with photo proof."
        meta={
          <>
            <HeaderStat label="Open" value={`${actionStats.portfolioOpen}`} tone="azure" />
            <HeaderStat label="Overdue" value={`${actionStats.overdue}`} tone="risk" />
            <HeaderStat label="Avg resolution" value={`${actionStats.avgResolutionHours}h`} />
            <HeaderStat label="Closed with proof" value="100%" tone="positive" />
          </>
        }
      />

      <div className="mt-7 grid grid-cols-2 gap-3.5 reveal lg:grid-cols-4">
        <KPICard label="Escalated now" value={`${actionStats.escalated}`} sub="past SLA" icon={ShieldAlert} accent />
        <KPICard label="In progress" value={`${actionStats.inProgress}`} sub="being worked" icon={Timer} />
        <KPICard label="Awaiting verify" value={`${actionStats.resolved}`} sub="photo proof needed" icon={Camera} />
        <KPICard label="Verified this week" value="58" delta="+12" deltaTone="positive" sub="portfolio" icon={CheckCircle2} />
      </div>

      {/* auto-generation moment + featured task */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.25fr_1fr]">
        <div className="relative overflow-hidden rounded-xl border border-azure/30 bg-card p-5 shadow-card-sm">
          <div className="azure-rule" aria-hidden />
          <div className="aurora-wash pointer-events-none absolute inset-0 opacity-60" aria-hidden />
          <div className="relative">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-azure text-white shadow-volt-glow"><Sparkles className="h-3.5 w-3.5" /></span>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-azure-deep">Auto-generated from a failed check</p>
            </div>
            <h3 className="mt-3 font-display text-[16px] font-bold tracking-tight-bank text-ink">{autoGenExample.item}</h3>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-faint">{autoGenExample.audit}</p>
            <ol className="mt-4 space-y-0">
              {autoGenExample.steps.map((s, i) => (
                <li key={s.label} className="relative flex gap-3 pb-4 last:pb-0">
                  {i < autoGenExample.steps.length - 1 && <span className="absolute left-[11px] top-6 h-full w-px bg-hairline" aria-hidden />}
                  <span className="z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-azure font-mono text-[10px] font-bold text-white">{i + 1}</span>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-[12.5px] font-semibold text-ink">{s.label}</p>
                    <p className="font-mono text-[10.5px] text-ink-subtle">{s.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* featured escalating task */}
        <FeaturedTask task={actions[0]} />
      </div>

      {/* board */}
      <div className="mt-5">
        <SectionHead title="Action board" hint="Open → In progress → Resolved → Verified" icon={ListChecks} className="mb-4" />
        <div className="grid gap-4 lg:grid-cols-4">
          {STATUS_COLUMN.map((col) => {
            const items = actions.filter((a) => a.status === col.key)
            return (
              <div key={col.key} className="rounded-xl border border-hairline bg-canvas-subtle/40 p-3">
                <div className="flex items-center justify-between px-1 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className={cn('h-2 w-2 rounded-full', STATUS_ACCENT[col.key])} />
                    <span className="font-display text-[13px] font-bold tracking-tight-bank text-ink">{col.label}</span>
                  </div>
                  <span className="font-mono text-[11px] tabular text-ink-faint">{items.length}</span>
                </div>
                <div className="space-y-2.5">
                  {items.map((t) => <TaskCard key={t.id} task={t} />)}
                  {items.length === 0 && <p className="rounded-lg border border-dashed border-hairline py-6 text-center font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint">Empty</p>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function SlaBar({ task }: { task: ActionTask }) {
  const pct = Math.min(100, Math.round((task.ageHours / task.slaHours) * 100))
  const overdue = task.ageHours >= task.slaHours
  const remaining = task.slaHours - task.ageHours
  const done = task.status === 'resolved' || task.status === 'verified'
  return (
    <div>
      <div className="flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.06em]">
        <span className="text-ink-faint">SLA {task.slaHours}h</span>
        <span className={cn(done ? 'text-signal-positive' : overdue ? 'text-signal-risk' : 'text-ink-subtle')}>
          {done ? 'met' : overdue ? `${Math.abs(remaining)}h over` : `${remaining}h left`}
        </span>
      </div>
      <div className="mt-1 h-1 overflow-hidden rounded-full bg-canvas-subtle">
        <div className={cn('h-full rounded-full', done ? 'bg-signal-positive' : overdue ? 'bg-signal-risk' : 'bg-signal-warning')} style={{ width: `${done ? 100 : pct}%` }} />
      </div>
    </div>
  )
}

function TaskCard({ task }: { task: ActionTask }) {
  const sev = SEVERITY_META[task.severity]
  return (
    <div className="rounded-lg border border-hairline bg-card p-3 shadow-card-sm transition-shadow hover:shadow-card">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.08em] text-ink-faint">{task.id}</span>
        <span className={cn('rounded-full border px-1.5 py-0.5 font-mono text-[8.5px] font-semibold uppercase', sev.chip)}>{sev.label}</span>
      </div>
      <p className="mt-1.5 text-[12.5px] font-semibold leading-snug text-ink">{task.title}</p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.06em] text-ink-faint">{task.club} · {task.role}</p>
      {task.escalated && (
        <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-signal-risk-soft px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.06em] text-signal-risk"><AlertTriangle className="h-2.5 w-2.5" />Escalated</p>
      )}
      <div className="mt-2.5 border-t border-hairline pt-2.5"><SlaBar task={task} /></div>
    </div>
  )
}

function FeaturedTask({ task }: { task: ActionTask }) {
  const sev = SEVERITY_META[task.severity]
  return (
    <div className="overflow-hidden rounded-xl border border-signal-risk/25 bg-card shadow-card-sm">
      <div className="flex items-center gap-2 border-b border-hairline bg-signal-risk-soft/40 px-5 py-2.5">
        <AlertTriangle className="h-4 w-4 text-signal-risk" />
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-signal-risk">Escalated · past SLA</span>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint">{task.id}</span>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2">
          <span className={cn('rounded-full border px-2 py-0.5 font-mono text-[9px] font-semibold uppercase', sev.chip)}>{sev.label}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-ink-faint">{task.club}</span>
        </div>
        <h3 className="mt-2 font-display text-[16px] font-bold tracking-tight-bank text-ink">{task.title}</h3>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-[12px]">
          <Field label="Assigned to" value={task.assignee} sub={task.role} />
          <Field label="Source" value={task.source.split(' · ')[0]} sub={task.source.split(' · ')[1]} />
        </dl>
        <div className="mt-4 rounded-lg border border-hairline bg-canvas-subtle/40 p-3">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-subtle">
            <Clock className="h-3.5 w-3.5 text-signal-risk" />Auto-escalates to regional lead
          </div>
          <div className="mt-2"><SlaBar task={task} /></div>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-dashed border-hairline px-3 py-2.5 font-mono text-[10.5px] text-ink-subtle">
          <Camera className="h-3.5 w-3.5 text-ink-faint" />Photo proof required before this can be verified
        </div>
        <button type="button" className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-azure-deep hover:underline">
          Open task <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

function Field({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-lg border border-hairline bg-canvas-subtle/30 px-3 py-2">
      <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink-faint">{label}</p>
      <p className="mt-0.5 text-[12.5px] font-semibold text-ink">{value}</p>
      {sub && <p className="font-mono text-[9.5px] text-ink-subtle">{sub}</p>}
    </div>
  )
}
