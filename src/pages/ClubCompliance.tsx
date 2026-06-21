import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts'
import { AlertTriangle, ChevronRight, Download, ScanLine, Search, Sparkles } from 'lucide-react'

import { HeaderStat, PageHeader } from '@/components/blueprint/PageHeader'
import { SectionHead } from '@/components/blueprint/SectionHead'
import { ScoreRing, StatusChip, StatusDot } from '@/components/blueprint/ScoreRing'
import { Button } from '@/components/ui/button'
import { CATEGORY_LABEL, WEIGHTS, clubs, heroClub, regions } from '@/data/clubs'
import { auditZones } from '@/data/audit'
import type { CategoryScores, Club } from '@/types'
import { cn } from '@/utils/cn'

const ordered = [...clubs].sort((a, b) => a.overall - b.overall)
const catKeys = Object.keys(WEIGHTS) as (keyof CategoryScores)[]

function trendSeries(club: Club) {
  const step = club.trend7d / 5
  return Array.from({ length: 6 }, (_, i) => ({ week: `W${i + 1}`, value: Math.round((club.overall - club.trend7d + step * i) * 10) / 10 }))
}

function catTone(v: number) {
  return v >= 90 ? 'bg-signal-positive' : v >= 80 ? 'bg-signal-warning' : 'bg-signal-risk'
}

export function ClubCompliance() {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState(heroClub.id)
  const [query, setQuery] = useState('')
  const club = clubs.find((c) => c.id === selectedId) ?? heroClub
  const region = regions.find((r) => r.name === club.region)
  const tierClubs = clubs.filter((c) => c.tier === club.tier)
  const tierAvg = Math.round((tierClubs.reduce((s, c) => s + c.overall, 0) / tierClubs.length) * 10) / 10
  const isHero = club.id === heroClub.id
  const failedItems = auditZones.flatMap((z) => z.items.filter((i) => i.state === 'fail' || i.state === 'flag').map((i) => ({ ...i, zone: z.name })))
  const list = ordered.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="mx-auto max-w-[1320px] px-4 py-7 lg:px-8">
      <PageHeader
        eyebrow="Scoring & drill-down"
        title="Club Compliance"
        description="Weighted compliance per club, recalculated after every audit — drill from portfolio to region to club to the exact failed item."
        actions={<Button variant="secondary" size="sm"><Download className="h-4 w-4" />Export club report</Button>}
      />

      {/* breadcrumb */}
      <div className="mt-5 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-subtle">
        <span className="hover:text-ink">Portfolio</span><ChevronRight className="h-3 w-3 text-ink-faint" />
        <span className="hover:text-ink">{club.region}</span><ChevronRight className="h-3 w-3 text-ink-faint" />
        <span className="text-azure-deep">{club.name}</span>
      </div>

      <div className="mt-4 grid gap-5 lg:grid-cols-[300px_1fr]">
        {/* club picker */}
        <div className="rounded-xl border border-hairline bg-card p-3 shadow-card-sm lg:sticky lg:top-24 lg:self-start">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-faint" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find a club"
              className="w-full rounded-lg border border-hairline bg-canvas-subtle/50 py-2 pl-8 pr-3 text-[12.5px] text-ink outline-none placeholder:text-ink-faint focus:border-azure/40 focus:bg-card"
            />
          </div>
          <p className="mt-3 px-1 font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink-faint">Lowest first · {list.length} clubs</p>
          <ul className="mt-1.5 max-h-[520px] space-y-0.5 overflow-y-auto pr-1">
            {list.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(c.id)}
                  className={cn('flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors', c.id === selectedId ? 'bg-azure-soft/40 ring-1 ring-azure/30' : 'hover:bg-canvas-subtle')}
                >
                  <StatusDot status={c.status} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12.5px] font-medium text-ink">{c.name}</p>
                    <p className="truncate font-mono text-[9px] uppercase tracking-[0.08em] text-ink-faint">{c.region}</p>
                  </div>
                  <span className={cn('font-display text-[14px] font-bold tabular tracking-tight-bank', c.status === 'red' ? 'text-signal-risk' : 'text-ink')}>{c.overall}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* detail */}
        <div className="space-y-5">
          {/* header card */}
          <div className="relative overflow-hidden rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            {club.status === 'red' && <div className="absolute inset-x-0 top-0 h-1 bg-signal-risk" aria-hidden />}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <ScoreRing value={club.overall} status={club.status} size={104} stroke={9} label="overall" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-[20px] font-extrabold tracking-tight-bank text-ink">Virgin Active {club.name}</h2>
                  <StatusChip status={club.status} />
                </div>
                <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-faint">{club.region} · {club.tier} · {club.members.toLocaleString()} members</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-1.5">
                  <HeaderStat label="7-day trend" value={`${club.trend7d > 0 ? '+' : ''}${club.trend7d}`} tone={club.trend7d < 0 ? 'risk' : 'positive'} />
                  <HeaderStat label="Open actions" value={`${club.openActions}`} tone={club.openActions > 8 ? 'warning' : undefined} />
                  <HeaderStat label="Last audit" value={club.lastAudit} />
                  <HeaderStat label="Usage index" value={`${club.usageIndex}`} />
                </div>
              </div>
            </div>
          </div>

          {/* weighted breakdown + trend */}
          <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
            <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
              <SectionHead title="Weighted standard scores" hint="Score × category weight = contribution" />
              <ul className="mt-4 space-y-3.5">
                {catKeys.map((k) => {
                  const v = club.scores[k]
                  const contribution = Math.round(v * WEIGHTS[k] * 10) / 10
                  return (
                    <li key={k}>
                      <div className="flex items-center justify-between text-[12.5px]">
                        <span className="font-medium text-ink">{CATEGORY_LABEL[k]}</span>
                        <span className="flex items-center gap-3 font-mono tabular text-ink-muted">
                          <span className="text-ink-faint">w {Math.round(WEIGHTS[k] * 100)}%</span>
                          <span className="text-ink-faint">+{contribution}</span>
                          <span className={cn('font-semibold', v >= 90 ? 'text-signal-positive' : v >= 80 ? 'text-signal-warning' : 'text-signal-risk')}>{v}</span>
                        </span>
                      </div>
                      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-canvas-subtle">
                        <div className={cn('h-full rounded-full', catTone(v))} style={{ width: `${v}%` }} />
                      </div>
                    </li>
                  )
                })}
              </ul>
              <div className="mt-4 flex items-center justify-between border-t border-hairline pt-3">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-subtle">Weighted overall</span>
                <span className="font-display text-[18px] font-extrabold tabular tracking-tight-bank text-ink">{club.overall}</span>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
                <SectionHead title="6-week trend" hint="Compliance trajectory" />
                <div className="mt-2 h-[96px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendSeries(club)} margin={{ top: 6, right: 4, bottom: 0, left: -34 }}>
                      <defs>
                        <linearGradient id="clubTrend" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={club.status === 'red' ? '#DC2626' : '#1F6FEB'} stopOpacity={0.25} />
                          <stop offset="100%" stopColor={club.status === 'red' ? '#DC2626' : '#1F6FEB'} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <YAxis domain={['dataMin - 3', 'dataMax + 3']} tick={{ fontSize: 9, fill: '#9AA0A8' }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E7E9ED', fontSize: 12 }} formatter={(v) => [`${v}`, 'Score']} />
                      <Area type="monotone" dataKey="value" stroke={club.status === 'red' ? '#DC2626' : '#1F6FEB'} strokeWidth={2.4} fill="url(#clubTrend)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
                <SectionHead title="Benchmark" hint="vs region & tier" />
                <ul className="mt-3 space-y-2.5 text-[12.5px]">
                  <Bench label={`${club.region} region avg`} value={region?.compliance ?? 0} club={club.overall} />
                  <Bench label={`${club.tier} tier avg`} value={tierAvg} club={club.overall} />
                  <Bench label="Portfolio avg" value={90.7} club={club.overall} />
                </ul>
              </div>
            </div>
          </div>

          {/* failed items + zones */}
          <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
            <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
              <SectionHead title="Failed & flagged items" hint={isHero ? `${failedItems.length} from latest audit` : 'No open failures'} icon={AlertTriangle} />
              {isHero ? (
                <ul className="mt-3.5 space-y-2">
                  {failedItems.map((it) => (
                    <li key={it.id} className="flex items-start gap-3 rounded-lg border border-hairline px-3 py-2.5">
                      <span className={cn('mt-1 h-2 w-2 shrink-0 rounded-full', it.state === 'fail' ? 'bg-signal-risk' : 'bg-signal-warning')} />
                      <div className="min-w-0 flex-1">
                        <p className="text-[12.5px] font-medium leading-snug text-ink">{it.label}</p>
                        <p className="font-mono text-[9.5px] uppercase tracking-[0.08em] text-ink-faint">{it.zone}</p>
                        {it.aiFlag && <p className="mt-1 flex items-start gap-1 font-mono text-[10px] text-azure-deep"><Sparkles className="mt-px h-2.5 w-2.5 shrink-0" />{it.aiFlag}</p>}
                        {it.note && !it.aiFlag && <p className="mt-0.5 font-mono text-[10px] text-ink-faint">{it.note}</p>}
                      </div>
                      <span className={cn('rounded px-1.5 py-0.5 font-mono text-[8.5px] font-semibold uppercase', it.state === 'fail' ? 'bg-signal-risk-soft text-signal-risk' : 'bg-signal-warning-soft text-signal-warning')}>{it.state}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 rounded-lg border border-dashed border-hairline bg-canvas-subtle/40 px-4 py-6 text-center text-[12.5px] text-ink-subtle">No open standard failures on the latest audit. Last inspected {club.lastAudit}.</p>
              )}
            </div>

            <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
              <SectionHead title="Department drill-down" hint="Zone scores" />
              {isHero ? (
                <ul className="mt-3.5 space-y-2">
                  {[...auditZones].sort((a, b) => a.score - b.score).map((z) => {
                    const st = z.score >= 90 ? 'green' : z.score >= 80 ? 'amber' : 'red'
                    return (
                      <li key={z.id} className="flex items-center gap-3">
                        <StatusDot status={st as 'green' | 'amber' | 'red'} />
                        <span className="flex-1 truncate text-[12px] text-ink">{z.name}</span>
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-canvas-subtle">
                          <div className={cn('h-full rounded-full', catTone(z.score))} style={{ width: `${z.score}%` }} />
                        </div>
                        <span className="w-7 text-right font-mono text-[12px] font-semibold tabular text-ink">{z.score}</span>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <p className="mt-4 rounded-lg border border-dashed border-hairline bg-canvas-subtle/40 px-4 py-6 text-center text-[12.5px] text-ink-subtle">Zone-level detail appears after the next on-site audit.</p>
              )}
            </div>
          </div>

          {isHero && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-azure/30 bg-azure-soft/30 px-5 py-3.5">
              <p className="flex items-center gap-2 text-[12.5px] text-ink"><Sparkles className="h-4 w-4 text-azure" />Two cleanliness failures and an untagged safety fault pulled Leeds below threshold.</p>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={() => navigate('/vision')}><ScanLine className="h-3.5 w-3.5" />View AI evidence</Button>
                <Button variant="amber" size="sm" onClick={() => navigate('/actions')}>Track actions</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Bench({ label, value, club }: { label: string; value: number; club: number }) {
  const delta = Math.round((club - value) * 10) / 10
  return (
    <li className="flex items-center justify-between">
      <span className="text-ink-muted">{label}</span>
      <span className="flex items-center gap-2 font-mono tabular">
        <span className="text-ink">{value}%</span>
        <span className={cn('font-semibold', delta < 0 ? 'text-signal-risk' : 'text-signal-positive')}>{delta > 0 ? '+' : ''}{delta}</span>
      </span>
    </li>
  )
}
