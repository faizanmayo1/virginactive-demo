import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { AlertTriangle, ArrowUpRight, Camera, Download, ListChecks, MapPin, ScanLine, ShieldCheck, TrendingDown } from 'lucide-react'

import { HeaderStat, PageHeader } from '@/components/blueprint/PageHeader'
import { SectionHead } from '@/components/blueprint/SectionHead'
import { KPICard } from '@/components/blueprint/KPICard'
import { AIInsightCard } from '@/components/blueprint/AIInsightCard'
import { StatusChip, StatusDot } from '@/components/blueprint/ScoreRing'
import { Button } from '@/components/ui/button'
import {
  CATEGORY_LABEL,
  categoryAverages,
  clubs,
  complianceTrend,
  portfolio,
  regions,
  STATUS_META,
} from '@/data/clubs'
import type { Club } from '@/types'
import { cn } from '@/utils/cn'

const topClubs = [...clubs].sort((a, b) => b.overall - a.overall).slice(0, 5)
const watchClubs = [...clubs].sort((a, b) => a.overall - b.overall).slice(0, 5)

export function CommandCenter() {
  const navigate = useNavigate()
  const [hover, setHover] = useState<Club | null>(null)

  return (
    <div className="mx-auto max-w-[1320px] px-4 py-7 lg:px-8">
      <PageHeader
        eyebrow="Portfolio overview · United Kingdom"
        title="Operational Command Center"
        description="Live brand-standards compliance across all 250 clubs — one source of truth from portfolio down to a single audit item."
        actions={
          <>
            <Button variant="secondary" size="sm"><Download className="h-4 w-4" />Export report</Button>
            <Button variant="amber" size="sm" onClick={() => navigate('/audit')}><ScanLine className="h-4 w-4" />New audit</Button>
          </>
        }
        meta={
          <>
            <HeaderStat label="Portfolio compliance" value={`${portfolio.compliance}%`} tone="azure" />
            <HeaderStat label="Red status" value={`${portfolio.redClubs}`} tone="risk" />
            <HeaderStat label="Audits / week" value={`${portfolio.auditsThisWeek}`} />
            <HeaderStat label="Completion" value={`${portfolio.auditCompletion}%`} tone="positive" />
          </>
        }
      />

      <div className="mt-7 grid grid-cols-2 gap-3.5 reveal lg:grid-cols-5">
        <KPICard label="Portfolio compliance" value="90.7%" delta="▼ 0.6" deltaTone="negative" sub="6-week low" icon={ShieldCheck} accent />
        <KPICard label="Clubs in breach" value="4" delta="+2 wk" deltaTone="negative" sub="of 250" icon={AlertTriangle} />
        <KPICard label="Audits this week" value="184" delta="96.2%" deltaTone="positive" sub="completion" icon={ScanLine} />
        <KPICard label="Open actions" value="412" delta="23 overdue" deltaTone="negative" sub="portfolio-wide" icon={ListChecks} />
        <KPICard label="AI inspections" value="20,418" delta="1,342 flags" deltaTone="neutral" sub="this quarter" icon={Camera} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.45fr_1fr]">
        {/* UK portfolio map */}
        <div className="relative overflow-hidden rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <SectionHead
            title="Portfolio map"
            hint="250 clubs · 5 regions"
            icon={MapPin}
            action={
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-subtle">
                {(['green', 'amber', 'red'] as const).map((s) => (
                  <span key={s} className="flex items-center gap-1.5"><StatusDot status={s} />{STATUS_META[s].label}</span>
                ))}
              </div>
            }
          />
          <div className="relative mt-4">
            <div className="court-grid pointer-events-none absolute inset-0 rounded-lg opacity-50" aria-hidden />
            <svg viewBox="0 0 100 100" className="relative h-[380px] w-full" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="ukFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1F6FEB" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#1F6FEB" stopOpacity="0.03" />
                </linearGradient>
              </defs>
              {/* Great Britain silhouette */}
              <path
                d="M45 11 L49 13 L46 16 L51 18 L48 22 L53 25 L50 29 L55 33 L54 40 L58 45 L56 49 L61 52 L64 55 L60 57 L63 62 L66 66 L60 67 L55 69 L48 70 L40 72 L34 72 L36 69 L41 68 L38 65 L35 63 L39 60 L34 58 L38 55 L36 52 L41 51 L40 47 L43 44 L40 40 L43 37 L39 33 L43 31 L38 28 L42 26 L38 23 L41 20 L37 17 L42 15 L40 12 Z"
                fill="url(#ukFill)"
                stroke="hsl(216 84% 52% / 0.30)"
                strokeWidth="0.5"
                strokeLinejoin="round"
              />
              {clubs.map((c) => {
                const meta = STATUS_META[c.status]
                const active = hover?.id === c.id
                return (
                  <g key={c.id} onMouseEnter={() => setHover(c)} onMouseLeave={() => setHover(null)} className="cursor-pointer">
                    {c.status === 'red' && (
                      <>
                        <circle cx={c.x} cy={c.y} r={2.2} fill={meta.hex} opacity={0.3} className="origin-center animate-pulse-ring" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
                      </>
                    )}
                    <circle cx={c.x} cy={c.y} r={active ? 3.4 : 2.8} fill={meta.hex} opacity={0.16} className="transition-all" />
                    <circle cx={c.x} cy={c.y} r={active ? 2.4 : 1.8} fill={meta.hex} stroke="#fff" strokeWidth={0.6} className="transition-all" style={{ filter: active ? `drop-shadow(0 0 3px ${meta.hex})` : undefined }} />
                  </g>
                )
              })}
            </svg>
            {hover && (
              <div className="pointer-events-none absolute left-4 top-4 w-56 rounded-lg border border-hairline bg-card/95 p-3 shadow-card-md backdrop-blur animate-fade-in">
                <div className="flex items-center justify-between">
                  <p className="font-display text-[14px] font-bold tracking-tight-bank text-ink">{hover.name}</p>
                  <StatusChip status={hover.status} />
                </div>
                <p className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-ink-faint">{hover.region} · {hover.tier}</p>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="font-display text-[22px] font-extrabold tabular tracking-tight-bank text-ink">{hover.overall}</span>
                  <span className="font-mono text-[10px] text-ink-subtle">overall</span>
                  <span className={cn('ml-auto font-mono text-[11px] font-semibold', hover.trend7d < 0 ? 'text-signal-risk' : 'text-signal-positive')}>
                    {hover.trend7d < 0 ? '▼' : '▲'} {Math.abs(hover.trend7d)}
                  </span>
                </div>
              </div>
            )}
            <p className="mt-1 text-center font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink-faint">Hover a club to inspect · {portfolio.redClubs} clubs in breach</p>
          </div>
        </div>

        {/* Region breakdown + AI insight */}
        <div className="flex flex-col gap-5">
          <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <SectionHead title="Regional performance" hint="Compliance by region" icon={TrendingDown} />
            <ul className="mt-4 space-y-3">
              {regions.map((r) => {
                const tone = r.compliance >= 90 ? 'bg-signal-positive' : r.compliance >= 86 ? 'bg-signal-warning' : 'bg-signal-risk'
                return (
                  <li key={r.name}>
                    <div className="flex items-center justify-between text-[12.5px]">
                      <span className="font-medium text-ink">{r.name}</span>
                      <span className="flex items-center gap-2 font-mono tabular text-ink-muted">
                        {r.redClubs > 0 && <span className="text-signal-risk">{r.redClubs} red</span>}
                        <span className="text-ink">{r.compliance}%</span>
                        <span className={cn('text-[11px]', r.trend7d < 0 ? 'text-signal-risk' : 'text-signal-positive')}>{r.trend7d < 0 ? '▼' : '▲'}{Math.abs(r.trend7d)}</span>
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-canvas-subtle">
                      <div className={cn('h-full rounded-full', tone)} style={{ width: `${r.compliance}%` }} />
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          <AIInsightCard title="North region is dragging the portfolio">
            <p className="text-[13px] leading-relaxed text-ink-muted">
              Equipment-readiness across 3 North clubs has slipped below threshold for a 3rd straight week — concentrated in cardio zones. <span className="font-semibold text-ink">Leeds</span> has now breached.
            </p>
            <ul className="mt-3 space-y-1.5 font-mono text-[11px] text-ink-subtle">
              <li className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-azure" />Pattern matches a recurring maintenance gap, not one-off audits</li>
              <li className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-azure" />Recommend risk-based re-audit + maintenance sweep this week</li>
            </ul>
            <button type="button" onClick={() => navigate('/clubs')} className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-azure-deep hover:underline">
              Inspect Leeds <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </AIInsightCard>
        </div>
      </div>

      {/* Rankings + categories + trend */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.45fr_1fr]">
        <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <SectionHead title="Club ranking" hint="Top performers vs needs attention" />
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <RankColumn title="Top performers" clubs={topClubs} />
            <RankColumn title="Needs attention" clubs={watchClubs} watch />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <SectionHead title="Standard averages" hint="Weighted categories · portfolio" />
            <ul className="mt-4 space-y-3">
              {categoryAverages.map((c) => (
                <li key={c.key}>
                  <div className="flex items-center justify-between text-[12.5px]">
                    <span className="font-medium text-ink">{CATEGORY_LABEL[c.key]}</span>
                    <span className="font-mono tabular text-ink-muted">{c.value}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-canvas-subtle">
                    <div className={cn('h-full rounded-full', c.value >= 90 ? 'bg-signal-positive' : 'bg-signal-warning')} style={{ width: `${c.value}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <SectionHead title="Compliance trend" hint="Portfolio · 6 weeks" />
            <div className="mt-3 h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={complianceTrend} margin={{ top: 6, right: 4, bottom: 0, left: -28 }}>
                  <defs>
                    <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1F6FEB" stopOpacity={0.28} />
                      <stop offset="100%" stopColor="#1F6FEB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#9AA0A8', fontFamily: 'Spline Sans Mono' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[89, 93]} tick={{ fontSize: 10, fill: '#9AA0A8', fontFamily: 'Spline Sans Mono' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: 10, border: '1px solid #E7E9ED', fontSize: 12, fontFamily: 'Inter', boxShadow: '0 8px 20px -4px rgba(20,22,26,0.12)' }}
                    formatter={(v) => [`${v}%`, 'Compliance']}
                  />
                  <Area type="monotone" dataKey="value" stroke="#1F6FEB" strokeWidth={2.4} fill="url(#trendFill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function RankColumn({ title, clubs: list, watch = false }: { title: string; clubs: Club[]; watch?: boolean }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-subtle">{title}</p>
      <ul className="mt-3 space-y-1">
        {list.map((c, i) => (
          <li key={c.id} className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-canvas-subtle">
            <span className="w-4 font-mono text-[11px] tabular text-ink-faint">{i + 1}</span>
            <StatusDot status={c.status} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium text-ink">{c.name}</p>
              <p className="truncate font-mono text-[9.5px] uppercase tracking-[0.08em] text-ink-faint">{c.region}</p>
            </div>
            <span className={cn('font-display text-[15px] font-bold tabular tracking-tight-bank', watch && c.status === 'red' ? 'text-signal-risk' : 'text-ink')}>{c.overall}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
