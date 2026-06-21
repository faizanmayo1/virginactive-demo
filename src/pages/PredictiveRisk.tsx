import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Activity, ArrowRight, CalendarClock, Gauge, ShieldAlert, Sparkles, TrendingDown, Wrench } from 'lucide-react'

import { HeaderStat, PageHeader } from '@/components/blueprint/PageHeader'
import { SectionHead } from '@/components/blueprint/SectionHead'
import { KPICard } from '@/components/blueprint/KPICard'
import { Button } from '@/components/ui/button'
import { equipmentForecast, heroAlert, riskClubs, riskStats, usageProfile } from '@/data/risk'
import { cn } from '@/utils/cn'

const EQ_STATUS = {
  urgent: { label: 'Urgent', chip: 'border-signal-risk/20 bg-signal-risk-soft text-signal-risk', bar: 'bg-signal-risk' },
  'service-soon': { label: 'Service soon', chip: 'border-signal-warning/20 bg-signal-warning-soft text-signal-warning', bar: 'bg-signal-warning' },
  monitor: { label: 'Monitor', chip: 'border-hairline bg-canvas-subtle text-ink-subtle', bar: 'bg-signal-positive' },
} as const

export function PredictiveRisk() {
  return (
    <div className="mx-auto max-w-[1320px] px-4 py-7 lg:px-8">
      <PageHeader
        eyebrow="Forecasting"
        title="Predictive Risk & Maintenance"
        description="Move from reactive audits to forecasts — see which clubs will slip below standard, and which machines will fail, before it happens."
        meta={
          <>
            <HeaderStat label="Clubs at risk" value={`${riskStats.clubsAtRisk}`} tone="warning" />
            <HeaderStat label="Forecast accuracy" value="89%" tone="azure" />
            <HeaderStat label="Breaches prevented" value={`${riskStats.preventedBreaches}`} tone="positive" />
          </>
        }
      />

      <div className="mt-7 grid grid-cols-2 gap-3.5 reveal lg:grid-cols-4">
        <KPICard label="Predicted breach · 48h" value="1" sub="Manchester Deansgate" icon={ShieldAlert} accent />
        <KPICard label="Equipment urgent" value="2" sub="service overdue / due" icon={Wrench} />
        <KPICard label="Clubs at risk · 14d" value="14" delta="+3 wk" deltaTone="negative" sub="below trajectory" icon={TrendingDown} />
        <KPICard label="Forecast accuracy" value="89%" delta="+2.1" deltaTone="positive" sub="rolling 90 days" icon={Gauge} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.15fr_1fr]">
        {/* hero alert */}
        <div className="relative overflow-hidden rounded-xl border border-azure/40 bg-card shadow-card-md">
          <div className="azure-rule" aria-hidden />
          <div className="aurora-wash pointer-events-none absolute inset-0 opacity-70" aria-hidden />
          <div className="relative p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-md bg-azure text-white shadow-volt-glow"><Sparkles className="h-3.5 w-3.5" /></span>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-azure-deep">Early-warning forecast</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-signal-warning-soft px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.06em] text-signal-warning">
                <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-signal-warning" />{heroAlert.window}
              </span>
            </div>

            <h3 className="mt-3.5 font-display text-[18px] font-extrabold tracking-tight-bank text-ink">
              {heroAlert.club} is forecast to fail {heroAlert.category.toLowerCase()} standards
            </h3>
            <p className="mt-1 text-[13px] text-ink-muted">
              {Math.round(heroAlert.probability * 100)}% probability of breach within {heroAlert.window} at the current trajectory.
            </p>

            {/* score projection */}
            <div className="mt-4 flex items-center gap-4 rounded-xl border border-hairline bg-canvas-subtle/40 p-4">
              <div className="text-center">
                <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink-faint">Today</p>
                <p className="font-display text-[26px] font-extrabold tabular tracking-tight-bank text-signal-positive">{heroAlert.current}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-ink-faint" />
              <div className="text-center">
                <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink-faint">Forecast Sun</p>
                <p className="font-display text-[26px] font-extrabold tabular tracking-tight-bank text-signal-risk">{heroAlert.predicted}</p>
              </div>
              <div className="ml-auto max-w-[150px]">
                <p className="font-mono text-[10px] leading-snug text-ink-subtle">{heroAlert.ifIgnored}</p>
              </div>
            </div>

            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint">Why</p>
            <ul className="mt-1.5 space-y-1.5">
              {heroAlert.rationale.map((r) => (
                <li key={r} className="flex items-start gap-2 text-[12.5px] text-ink-muted"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-azure" />{r}</li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-azure/30 bg-azure-soft/40 px-4 py-3">
              <div className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-azure" />
                <span className="text-[12.5px] font-medium text-ink">{heroAlert.intervention}</span>
              </div>
              <Button variant="amber" size="sm">Schedule it</Button>
            </div>
          </div>
        </div>

        {/* risk-ranked clubs */}
        <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <SectionHead title="Compliance risk ranking" hint="Probability of breach" icon={Activity} />
          <ul className="mt-4 space-y-3.5">
            {riskClubs.map((r) => (
              <li key={r.club}>
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="truncate text-[12.5px] font-semibold text-ink">{r.club}</p>
                    <p className="truncate font-mono text-[9.5px] uppercase tracking-[0.06em] text-ink-faint">{r.driver}</p>
                  </div>
                  <div className="ml-3 shrink-0 text-right">
                    <p className={cn('font-display text-[15px] font-bold tabular tracking-tight-bank', r.probability >= 0.7 ? 'text-signal-risk' : 'text-signal-warning')}>{Math.round(r.probability * 100)}%</p>
                    <p className="font-mono text-[9px] uppercase tracking-[0.06em] text-ink-faint">{r.window}</p>
                  </div>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-canvas-subtle">
                  <div className={cn('h-full rounded-full', r.probability >= 0.7 ? 'bg-signal-risk' : 'bg-signal-warning')} style={{ width: `${Math.round(r.probability * 100)}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* equipment + usage */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <SectionHead title="Equipment maintenance forecast" hint="Predicted failure & service windows" icon={Wrench} />
          <div className="mt-4 space-y-2">
            {equipmentForecast.map((e) => {
              const st = EQ_STATUS[e.status]
              return (
                <div key={e.asset + e.club} className="flex items-center gap-3 rounded-lg border border-hairline px-3 py-2.5">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-[12.5px] font-semibold text-ink">{e.asset}</p>
                      <span className={cn('shrink-0 rounded-full border px-1.5 py-0.5 font-mono text-[8px] font-semibold uppercase', st.chip)}>{st.label}</span>
                    </div>
                    <p className="font-mono text-[9.5px] uppercase tracking-[0.06em] text-ink-faint">{e.club} · {e.type} · {e.usageVsAvg}× usage</p>
                  </div>
                  <div className="w-24 shrink-0">
                    <div className="flex items-center justify-between font-mono text-[9px] text-ink-faint"><span>health</span><span className="tabular">{e.health}%</span></div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-canvas-subtle"><div className={cn('h-full rounded-full', st.bar)} style={{ width: `${e.health}%` }} /></div>
                  </div>
                  <span className={cn('w-20 shrink-0 text-right font-mono text-[10px] font-semibold uppercase tracking-[0.04em]', e.status === 'urgent' ? 'text-signal-risk' : 'text-ink-subtle')}>{e.predictedService}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <SectionHead title="Cleaning-schedule optimisation" hint="Footfall by hour · % capacity" icon={TrendingDown} />
          <div className="mt-3 h-[210px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usageProfile} margin={{ top: 6, right: 4, bottom: 0, left: -22 }} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EDEFF2" vertical={false} />
                <XAxis dataKey="hour" tick={{ fontSize: 10, fill: '#9AA0A8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#9AA0A8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E7E9ED', fontSize: 12 }} cursor={{ fill: 'rgba(31,111,235,0.06)' }} />
                <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'Inter' }} iconType="circle" iconSize={8} />
                <Bar dataKey="weekday" name="Weekday" fill="#1B1E24" radius={[3, 3, 0, 0]} isAnimationActive={false} />
                <Bar dataKey="weekend" name="Weekend" fill="#1F6FEB" radius={[3, 3, 0, 0]} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 flex items-start gap-1.5 font-mono text-[10.5px] leading-snug text-ink-subtle">
            <Sparkles className="mt-px h-3 w-3 shrink-0 text-azure" />Weekend peaks at midday — model recommends shifting deep-cleans to 06:00 + 14:00 slots.
          </p>
        </div>
      </div>
    </div>
  )
}
