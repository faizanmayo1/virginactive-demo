import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AlertTriangle,
  Camera,
  Check,
  Clock,
  DoorOpen,
  Dumbbell,
  Lock,
  MapPin,
  Music,
  ScanLine,
  Signal,
  Sparkles,
  Wifi,
  WifiOff,
  X,
  Waves,
  type LucideIcon,
} from 'lucide-react'

import { HeaderStat, PageHeader } from '@/components/blueprint/PageHeader'
import { SectionHead } from '@/components/blueprint/SectionHead'
import { ScoreRing, StatusChip } from '@/components/blueprint/ScoreRing'
import { Button } from '@/components/ui/button'
import { auditMeta, auditZones, checklistAdaptation } from '@/data/audit'
import type { AuditItemState, AuditZone } from '@/types'
import { cn } from '@/utils/cn'

const ZONE_ICON: Record<string, LucideIcon> = {
  'door-open': DoorOpen,
  dumbbell: Dumbbell,
  weight: Dumbbell,
  music: Music,
  lock: Lock,
  waves: Waves,
}

const STATE_META: Record<AuditItemState, { icon: LucideIcon; cls: string; ring: string }> = {
  pass: { icon: Check, cls: 'text-signal-positive', ring: 'border-signal-positive/30 bg-signal-positive-soft' },
  fail: { icon: X, cls: 'text-signal-risk', ring: 'border-signal-risk/30 bg-signal-risk-soft' },
  flag: { icon: AlertTriangle, cls: 'text-signal-warning', ring: 'border-signal-warning/30 bg-signal-warning-soft' },
  pending: { icon: Clock, cls: 'text-ink-faint', ring: 'border-hairline bg-canvas-subtle' },
}

function zoneStatus(score: number) {
  return score >= 90 ? 'green' : score >= 80 ? 'amber' : 'red'
}

export function MobileAudit() {
  const navigate = useNavigate()
  const [openZone, setOpenZone] = useState('gym-floor')

  return (
    <div className="mx-auto max-w-[1320px] px-4 py-7 lg:px-8">
      <PageHeader
        eyebrow="Field inspection · Live"
        title="Mobile Audit"
        description="The same structured audit every inspector runs in the field — photo-backed, geo-verified, offline-capable, and scored the moment a tap lands."
        actions={
          <Button variant="amber" size="sm" onClick={() => navigate('/vision')}>
            <ScanLine className="h-4 w-4" />Open AI validation
          </Button>
        }
        meta={
          <>
            <HeaderStat label="Audit" value={auditMeta.auditId} />
            <HeaderStat label="Inspector" value={auditMeta.inspector.split(' ')[0]} />
            <HeaderStat label="Progress" value={`${auditMeta.itemsDone}/${auditMeta.items}`} tone="azure" />
            <HeaderStat label="Running score" value="76" tone="risk" />
          </>
        }
      />

      <div className="mt-7 grid gap-7 lg:grid-cols-[auto_1fr]">
        {/* Phone */}
        <div className="mx-auto w-full max-w-[332px] lg:sticky lg:top-24 lg:self-start">
          <Phone openZone={openZone} setOpenZone={setOpenZone} />
          <div className="mt-4 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint">
            <MapPin className="h-3.5 w-3.5 text-azure" /> {auditMeta.geoLabel}
          </div>
        </div>

        {/* Detail rail */}
        <div className="space-y-5">
          {/* Feature callouts */}
          <div className="grid gap-3.5 sm:grid-cols-2">
            <Feature icon={Camera} title="Photo on every item" body="Each checklist line carries timestamped photo evidence — no proof, no pass." />
            <Feature icon={WifiOff} title="Offline-first capture" body="Audits run with no signal in plant rooms and basements, then sync the moment a connection returns." />
            <Feature icon={MapPin} title="Geo + time verified" body="Every audit is stamped to the club's coordinates and a server clock — no off-site or back-dated entries." />
            <Feature icon={Sparkles} title="Real-time scoring" body="The weighted compliance score recalculates on every tap, so the result is final when the inspector leaves." accent />
          </div>

          {/* Smart checklist adaptation */}
          <div className="relative overflow-hidden rounded-xl border border-azure/30 bg-card p-5 shadow-card-sm">
            <div className="azure-rule" aria-hidden />
            <div className="aurora-wash pointer-events-none absolute inset-0 opacity-60" aria-hidden />
            <div className="relative">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-md bg-azure text-white shadow-volt-glow"><Sparkles className="h-3.5 w-3.5" /></span>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-azure-deep">Smart checklist adaptation</p>
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-ink-muted">
                The template tailored itself to this site — <span className="font-semibold text-ink">{checklistAdaptation.tier}</span> tier,
                {' '}{checklistAdaptation.size}, {checklistAdaptation.region} region — adding and removing items automatically.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {checklistAdaptation.added.map((a) => (
                  <span key={a} className="inline-flex items-center gap-1 rounded-full border border-signal-positive/25 bg-signal-positive-soft px-2 py-1 font-mono text-[10px] text-signal-positive"><Check className="h-3 w-3" />{a}</span>
                ))}
                {checklistAdaptation.removed.map((r) => (
                  <span key={r} className="inline-flex items-center gap-1 rounded-full border border-hairline bg-canvas-subtle px-2 py-1 font-mono text-[10px] text-ink-subtle"><X className="h-3 w-3" />{r}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Zone breakdown */}
          <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <SectionHead title="Zone breakdown" hint={`${auditZones.length} zones · tap to expand on device`} />
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {auditZones.map((z) => {
                const Icon = ZONE_ICON[z.icon] ?? Dumbbell
                const st = zoneStatus(z.score) as 'green' | 'amber' | 'red'
                return (
                  <li key={z.id}>
                    <button
                      type="button"
                      onClick={() => setOpenZone(z.id)}
                      className={cn('flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors', openZone === z.id ? 'border-azure/40 bg-azure-soft/30' : 'border-hairline hover:bg-canvas-subtle')}
                    >
                      <span className="grid h-8 w-8 place-items-center rounded-md bg-canvas-subtle text-ink-muted"><Icon className="h-4 w-4" /></span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[12.5px] font-medium text-ink">{z.name}</p>
                        <p className="font-mono text-[9.5px] uppercase tracking-[0.08em] text-ink-faint">{z.photos} photos</p>
                      </div>
                      <span className={cn('font-display text-[15px] font-bold tabular tracking-tight-bank', st === 'red' ? 'text-signal-risk' : st === 'amber' ? 'text-signal-warning' : 'text-signal-positive')}>{z.score}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function Feature({ icon: Icon, title, body, accent = false }: { icon: LucideIcon; title: string; body: string; accent?: boolean }) {
  return (
    <div className={cn('rounded-xl border bg-card p-4 shadow-card-sm', accent ? 'border-azure/30' : 'border-hairline')}>
      <span className={cn('grid h-8 w-8 place-items-center rounded-md', accent ? 'bg-azure text-white shadow-volt-glow' : 'bg-canvas-subtle text-ink-muted')}><Icon className="h-4 w-4" /></span>
      <p className="mt-3 text-[13px] font-semibold text-ink">{title}</p>
      <p className="mt-1 text-[12px] leading-snug text-ink-muted">{body}</p>
    </div>
  )
}

function Phone({ openZone, setOpenZone }: { openZone: string; setOpenZone: (id: string) => void }) {
  return (
    <div className="device-frame">
      <div className="device-screen">
        {/* status bar */}
        <div className="flex items-center justify-between bg-steel-900 px-5 pb-2 pt-2.5 text-white">
          <span className="font-mono text-[11px] font-semibold tabular">{auditMeta.startedAt}</span>
          <span className="flex items-center gap-1.5">
            <Signal className="h-3.5 w-3.5" />
            <Wifi className="h-3.5 w-3.5" />
            <span className="font-mono text-[10px] tabular">82%</span>
          </span>
        </div>

        {/* app header */}
        <div className="bg-steel-900 px-5 pb-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-steel-400">{auditMeta.auditId}</p>
              <p className="font-display text-[15px] font-bold tracking-tight-bank">{auditMeta.club}</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-signal-risk/15 px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.06em] text-signal-risk">
              <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-signal-risk" />Live
            </span>
          </div>

          {/* live score */}
          <div className="mt-4 flex items-center gap-4 rounded-xl bg-white/[0.06] p-3">
            <ScoreRing value={76} status="red" size={74} stroke={7} label="live" />
            <div className="min-w-0">
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-steel-400">Compliance score</p>
              <div className="mt-1 flex items-center gap-2">
                <StatusChip status="red" />
                <span className="font-mono text-[10px] text-steel-300">{auditMeta.itemsDone}/{auditMeta.items} items</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-azure" style={{ width: `${Math.round((auditMeta.itemsDone / auditMeta.items) * 100)}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* zone list */}
        <div className="max-h-[300px] overflow-y-auto bg-canvas px-3 py-3">
          {auditZones.map((z) => (
            <ZoneRow key={z.id} zone={z} open={openZone === z.id} onToggle={() => setOpenZone(openZone === z.id ? '' : z.id)} />
          ))}
        </div>

        {/* capture bar */}
        <div className="border-t border-hairline bg-card px-4 py-3">
          <button type="button" className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-azure to-azure-deep py-2.5 font-display text-[13px] font-semibold text-white shadow-cta active:translate-y-px">
            <Camera className="h-4 w-4" /> Capture photo
          </button>
        </div>
      </div>
    </div>
  )
}

function ZoneRow({ zone, open, onToggle }: { zone: AuditZone; open: boolean; onToggle: () => void }) {
  const Icon = ZONE_ICON[zone.icon] ?? Dumbbell
  const st = zoneStatus(zone.score) as 'green' | 'amber' | 'red'
  const scoreCls = st === 'red' ? 'text-signal-risk' : st === 'amber' ? 'text-signal-warning' : 'text-signal-positive'
  return (
    <div className="mb-2 overflow-hidden rounded-xl border border-hairline bg-card">
      <button type="button" onClick={onToggle} className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left">
        <span className="grid h-7 w-7 place-items-center rounded-md bg-canvas-subtle text-ink-muted"><Icon className="h-3.5 w-3.5" /></span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12px] font-semibold text-ink">{zone.name}</p>
          <p className="font-mono text-[9px] uppercase tracking-[0.08em] text-ink-faint">{zone.items.length} checks · {zone.photos} photos</p>
        </div>
        <span className={cn('font-display text-[15px] font-bold tabular tracking-tight-bank', scoreCls)}>{zone.score}</span>
      </button>
      {open && (
        <ul className="border-t border-hairline px-3 py-2">
          {zone.items.map((it) => {
            const m = STATE_META[it.state]
            const SIcon = m.icon
            return (
              <li key={it.id} className="flex items-start gap-2.5 py-1.5">
                <span className={cn('mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border', m.ring)}>
                  <SIcon className={cn('h-3 w-3', m.cls)} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[11.5px] leading-snug text-ink">{it.label}</p>
                  {it.aiFlag && (
                    <p className="mt-0.5 flex items-start gap-1 font-mono text-[9.5px] leading-snug text-azure-deep">
                      <Sparkles className="mt-px h-2.5 w-2.5 shrink-0" />{it.aiFlag}
                    </p>
                  )}
                  {it.note && !it.aiFlag && <p className="mt-0.5 font-mono text-[9.5px] leading-snug text-ink-faint">{it.note}</p>}
                </div>
                {it.photo && <Camera className="mt-0.5 h-3 w-3 shrink-0 text-ink-faint" />}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
