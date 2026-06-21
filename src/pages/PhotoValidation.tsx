import { useEffect, useRef, useState } from 'react'
import {
  AlertTriangle,
  Check,
  RefreshCw,
  ScanLine,
  Sparkles,
  X,
  type LucideIcon,
} from 'lucide-react'

import { HeaderStat, PageHeader } from '@/components/blueprint/PageHeader'
import { SectionHead } from '@/components/blueprint/SectionHead'
import { ScoreRing, StatusChip } from '@/components/blueprint/ScoreRing'
import { Button } from '@/components/ui/button'
import {
  analysisSteps,
  beforeAfter,
  detections,
  scoringDiscrepancy,
  visionChecks,
  visionMeta,
  visionScore,
  visionStats,
} from '@/data/vision'
import type { Tone, VisionDetection } from '@/types'
import { cn } from '@/utils/cn'

const SEV: Record<Tone, { box: string; chip: string; dot: string }> = {
  risk: { box: 'border-signal-risk', chip: 'bg-signal-risk text-white', dot: 'bg-signal-risk' },
  warning: { box: 'border-signal-warning', chip: 'bg-signal-warning text-white', dot: 'bg-signal-warning' },
  positive: { box: 'border-signal-positive', chip: 'bg-signal-positive text-white', dot: 'bg-signal-positive' },
  info: { box: 'border-signal-info', chip: 'bg-signal-info text-white', dot: 'bg-signal-info' },
  neutral: { box: 'border-ink-faint', chip: 'bg-ink-faint text-white', dot: 'bg-ink-faint' },
}

type Phase = 'scanning' | 'done'

export function PhotoValidation() {
  const [phase, setPhase] = useState<Phase>('scanning')
  const [steps, setSteps] = useState(0)
  const [mode, setMode] = useState<'before' | 'after'>('after')
  const timers = useRef<number[]>([])

  const run = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setMode('after')
    setPhase('scanning')
    setSteps(0)
    analysisSteps.forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setSteps(i + 1), 360 * (i + 1)))
    })
    timers.current.push(window.setTimeout(() => setPhase('done'), 360 * analysisSteps.length + 500))
  }

  useEffect(() => {
    run()
    return () => timers.current.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const showBoxes = phase === 'done' && mode === 'after'

  return (
    <div className="mx-auto max-w-[1320px] px-4 py-7 lg:px-8">
      <PageHeader
        eyebrow="Computer vision · StandardsVision v4"
        title="AI Photo Validation"
        description="Every inspection photo is scored by computer vision — so audits stay objective, consistent, and impossible to wave through on a busy day."
        meta={
          <>
            <HeaderStat label="Images analysed" value={visionStats.imagesAnalysed.toLocaleString()} tone="azure" />
            <HeaderStat label="Flags raised" value={visionStats.flagsRaised.toLocaleString()} tone="warning" />
            <HeaderStat label="Scoring mismatches" value={`${visionStats.scoringMismatches}`} tone="risk" />
            <HeaderStat label="Avg confidence" value="0.91" tone="positive" />
          </>
        }
      />

      <div className="mt-7 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
        {/* The photo + CV overlay */}
        <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <SectionHead
            title="Captured frame"
            hint={`${visionMeta.asset} · ${visionMeta.zone}`}
            icon={ScanLine}
            action={
              <div className="flex rounded-lg border border-hairline p-0.5">
                {(['before', 'after'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    disabled={phase !== 'done'}
                    className={cn('rounded-md px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] transition-colors disabled:opacity-40', mode === m ? 'bg-steel text-white' : 'text-ink-subtle hover:text-ink')}
                  >
                    {m === 'before' ? 'Last clean' : 'Today'}
                  </button>
                ))}
              </div>
            }
          />

          <figure className="relative mt-4 aspect-[4/3] overflow-hidden rounded-xl border border-steel-700 bg-steel-900 shadow-card-md">
            <TreadmillPhoto grimy={mode === 'after'} />

            {/* scan line */}
            {phase === 'scanning' && (
              <>
                <div className="absolute inset-x-0 top-0 h-[3px] animate-scan-sweep scan-line" />
                <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-steel-900/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-azure-glow backdrop-blur">
                  <Sparkles className="h-3 w-3 animate-pulse-soft" /> Analysing…
                </div>
              </>
            )}

            {/* detection boxes */}
            {showBoxes && detections.map((d, i) => <DetectionBox key={d.id} d={d} index={i} />)}

            {/* score badge */}
            {phase === 'done' && (
              <div className="absolute bottom-3 left-3 flex items-center gap-2.5 rounded-xl border border-white/10 bg-steel-900/80 px-3 py-2 backdrop-blur animate-fade-in">
                <ScoreRing value={mode === 'after' ? visionScore.cleanliness : beforeAfter.before.score} status={mode === 'after' ? 'red' : 'green'} size={48} stroke={5} />
                <div>
                  <p className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-steel-400">Cleanliness</p>
                  <p className="font-display text-[13px] font-bold tracking-tight-bank text-white">{mode === 'after' ? 'Below standard' : 'Compliant'}</p>
                </div>
              </div>
            )}

            <figcaption className="absolute right-3 top-3 rounded-md bg-steel-900/70 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-steel-300 backdrop-blur">
              {visionMeta.imageId}
            </figcaption>
          </figure>

          <div className="mt-3 flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint">
              {visionMeta.capturedBy} · {visionMeta.capturedAt} · {visionMeta.latencyMs}ms
            </p>
            <Button variant="secondary" size="sm" onClick={run}><RefreshCw className="h-3.5 w-3.5" />Re-run analysis</Button>
          </div>
        </div>

        {/* AI analysis panel */}
        <div className="space-y-5">
          {/* Steps */}
          <div className="relative overflow-hidden rounded-xl border border-azure/30 bg-card p-5 shadow-card-sm">
            <div className="azure-rule" aria-hidden />
            <div className="aurora-wash pointer-events-none absolute inset-0 opacity-60" aria-hidden />
            <div className="relative">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-md bg-azure text-white shadow-volt-glow"><Sparkles className="h-3.5 w-3.5" /></span>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-azure-deep">Analysis pipeline</p>
              </div>
              <ul className="mt-3.5 space-y-2">
                {analysisSteps.map((s, i) => {
                  const active = i < steps
                  return (
                    <li key={s.label} className={cn('flex items-start gap-2.5 transition-opacity', active ? 'opacity-100' : 'opacity-35')}>
                      <span className={cn('mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full', active ? 'bg-azure text-white' : 'border border-hairline bg-canvas-subtle')}>
                        {active && <Check className="h-2.5 w-2.5" />}
                      </span>
                      <div>
                        <p className="text-[12.5px] font-medium leading-snug text-ink">{s.label}</p>
                        <p className="font-mono text-[10px] text-ink-subtle">{s.detail}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          {/* Detections */}
          <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <SectionHead title="Detections" hint={`${detections.length} regions · model ${visionMeta.model}`} />
            <ul className="mt-3.5 space-y-2">
              {detections.map((d) => (
                <li key={d.id} className="flex items-center gap-3 rounded-lg border border-hairline px-3 py-2">
                  <span className={cn('h-2 w-2 shrink-0 rounded-full', SEV[d.severity].dot)} />
                  <span className="flex-1 text-[12.5px] text-ink">{d.label}</span>
                  <span className="font-mono text-[11px] tabular text-ink-muted">{(d.confidence * 100).toFixed(0)}%</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Violation + discrepancy */}
          <div className="overflow-hidden rounded-xl border border-signal-risk/25 bg-signal-risk-soft/40 p-5 shadow-card-sm">
            <div className="flex items-start gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-signal-risk text-white"><AlertTriangle className="h-5 w-5" /></span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-display text-[14px] font-bold tracking-tight-bank text-ink">Compliance violation</p>
                  <StatusChip status="red" />
                </div>
                <p className="mt-1 font-mono text-[11px] text-ink-muted">{visionScore.violation}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-hairline bg-card px-3 py-2.5">
                <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink-faint">Inspector tap</p>
                <p className="font-display text-[20px] font-extrabold tabular tracking-tight-bank text-ink">{scoringDiscrepancy.inspectorScore}</p>
              </div>
              <div className="rounded-lg border border-azure/30 bg-azure-soft/40 px-3 py-2.5">
                <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-azure-deep">AI from evidence</p>
                <p className="font-display text-[20px] font-extrabold tabular tracking-tight-bank text-azure-deep">{scoringDiscrepancy.aiScore}</p>
              </div>
            </div>
            <p className="mt-3 flex items-center gap-2 font-mono text-[11px] text-ink-muted">
              <Sparkles className="h-3.5 w-3.5 text-azure" />{scoringDiscrepancy.verdict}
            </p>
          </div>

          {/* Validation checks */}
          <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <SectionHead title="Validation checks" hint="Objectivity guardrails" />
            <ul className="mt-3.5 grid grid-cols-2 gap-2">
              {visionChecks.map((c) => (
                <li key={c.label} className="flex items-center gap-2 rounded-lg border border-hairline px-3 py-2">
                  <Indicator tone={c.tone} />
                  <div className="min-w-0">
                    <p className="truncate text-[11.5px] font-medium text-ink">{c.label}</p>
                    <p className={cn('font-mono text-[10px]', c.tone === 'risk' ? 'text-signal-risk' : 'text-ink-subtle')}>{c.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function Indicator({ tone }: { tone: Tone }) {
  const Icon: LucideIcon = tone === 'risk' ? X : Check
  return (
    <span className={cn('grid h-5 w-5 shrink-0 place-items-center rounded-full', tone === 'risk' ? 'bg-signal-risk-soft text-signal-risk' : 'bg-signal-positive-soft text-signal-positive')}>
      <Icon className="h-3 w-3" />
    </span>
  )
}

function DetectionBox({ d, index }: { d: VisionDetection; index: number }) {
  return (
    <div
      className={cn('absolute rounded-md border-2 animate-box-in', SEV[d.severity].box)}
      style={{ left: `${d.x}%`, top: `${d.y}%`, width: `${d.w}%`, height: `${d.h}%`, animationDelay: `${index * 0.12}s`, boxShadow: '0 0 0 9999px rgba(0,0,0,0)' }}
    >
      <span className={cn('absolute -top-[18px] left-0 inline-flex items-center gap-1 whitespace-nowrap rounded px-1.5 py-0.5 font-mono text-[8.5px] font-semibold uppercase tracking-[0.04em]', SEV[d.severity].chip)}>
        {d.label.split(' — ')[0]} · {(d.confidence * 100).toFixed(0)}%
      </span>
    </div>
  )
}

/** Photographic surrogate — a side-view treadmill rendered as the captured frame. */
function TreadmillPhoto({ grimy }: { grimy: boolean }) {
  return (
    <svg viewBox="0 0 100 75" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-label="Treadmill inspection photo">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2A2F38" />
          <stop offset="100%" stopColor="#15171C" />
        </linearGradient>
        <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5B626E" />
          <stop offset="100%" stopColor="#2E333C" />
        </linearGradient>
        <radialGradient id="grime" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6b5a3a" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#6b5a3a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100" height="75" fill="url(#bg)" />
      {/* floor */}
      <rect y="60" width="100" height="15" fill="#1B1E24" />
      <line x1="0" y1="60" x2="100" y2="60" stroke="#3A3F49" strokeWidth="0.4" />
      {/* deck */}
      <rect x="14" y="56" width="60" height="6" rx="1.5" fill="url(#metal)" />
      <rect x="16" y="51" width="56" height="6" rx="1" fill="#23262E" />
      {/* belt slats */}
      {Array.from({ length: 14 }).map((_, i) => (
        <line key={i} x1={18 + i * 3.8} y1="52" x2={18 + i * 3.8} y2="56.5" stroke="#15171C" strokeWidth="0.6" />
      ))}
      {/* mast + console */}
      <rect x="64" y="20" width="4" height="34" rx="1" fill="url(#metal)" />
      <rect x="58" y="10" width="20" height="13" rx="1.5" fill="#30343D" />
      <rect x="60" y="12" width="16" height="7" rx="0.8" fill="#0E1014" />
      <rect x="61" y="13" width="14" height="5" rx="0.5" fill="#1C3050" opacity="0.85" />
      {/* handrails */}
      <path d="M64 24 L52 24 L52 40" fill="none" stroke="url(#metal)" strokeWidth="2.4" strokeLinecap="round" />
      {/* grime overlays (only in 'after') */}
      {grimy && (
        <>
          <ellipse cx="34" cy="55" rx="12" ry="4" fill="url(#grime)" />
          <ellipse cx="70" cy="49" rx="7" ry="4" fill="url(#grime)" />
          <rect x="61" y="13" width="14" height="5" fill="#000" opacity="0.18" />
        </>
      )}
    </svg>
  )
}
