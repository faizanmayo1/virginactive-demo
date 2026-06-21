import { CartesianGrid, ComposedChart, Bar, Line, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from 'recharts'
import { Activity, HeartPulse, MessageSquareWarning, Smile, Sparkles, TrendingDown } from 'lucide-react'

import { HeaderStat, PageHeader } from '@/components/blueprint/PageHeader'
import { SectionHead } from '@/components/blueprint/SectionHead'
import {
  complaintClusters,
  downtimeHero,
  experiencePoints,
  experienceScores,
  sentiment,
} from '@/data/experience'
import { cn } from '@/utils/cn'

export function MemberExperience() {
  return (
    <div className="mx-auto max-w-[1320px] px-4 py-7 lg:px-8">
      <PageHeader
        eyebrow="Service quality"
        title="Member Experience"
        description="Connect operational compliance to how members actually feel — correlating audit scores with satisfaction and clustering complaints against the failures behind them."
        meta={
          <>
            <HeaderStat label="Avg satisfaction" value="83" tone="azure" />
            <HeaderStat label="Responses analysed" value="48,230" />
            <HeaderStat label="Audit ↔ satisfaction" value="0.91" tone="positive" />
            <HeaderStat label="Open complaints" value="312" tone="warning" />
          </>
        }
      />

      {/* hero correlation + sentiment/scores */}
      <div className="mt-7 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <div className="relative overflow-hidden rounded-xl border border-azure/40 bg-card shadow-card-md">
          <div className="azure-rule" aria-hidden />
          <div className="relative p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-md bg-azure text-white shadow-volt-glow"><Sparkles className="h-3.5 w-3.5" /></span>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-azure-deep">Correlation · {downtimeHero.club}</p>
              </div>
              <span className="rounded-full bg-signal-risk-soft px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.06em] text-signal-risk">−{Math.abs(downtimeHero.satisfactionTrend)} pts NPS</span>
            </div>
            <h3 className="mt-3.5 font-display text-[18px] font-extrabold tracking-tight-bank text-ink">Equipment downtime is dragging satisfaction down</h3>
            <p className="mt-1 text-[13px] text-ink-muted">
              As Leeds equipment downtime climbed to <span className="font-semibold text-ink">{downtimeHero.downtimeHours}h</span> (+{downtimeHero.downtimeTrend}%), member satisfaction fell to <span className="font-semibold text-ink">{downtimeHero.satisfaction}</span> — the two move together, week for week.
            </p>
            <div className="mt-4 h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={downtimeHero.weeks} margin={{ top: 6, right: 6, bottom: 0, left: -22 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EDEFF2" vertical={false} />
                  <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#9AA0A8' }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="l" tick={{ fontSize: 10, fill: '#9AA0A8' }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="r" orientation="right" domain={[55, 85]} tick={{ fontSize: 10, fill: '#9AA0A8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E7E9ED', fontSize: 12 }} />
                  <Bar yAxisId="l" dataKey="downtime" name="Downtime (h)" fill="#8FB8F8" radius={[3, 3, 0, 0]} isAnimationActive={false} />
                  <Line yAxisId="r" type="monotone" dataKey="satisfaction" name="Satisfaction" stroke="#DC2626" strokeWidth={2.6} dot={{ r: 3, fill: '#DC2626' }} isAnimationActive={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <SectionHead title="Feedback sentiment" hint="48,230 responses" icon={HeartPulse} />
            <div className="mt-4 flex h-3 overflow-hidden rounded-full">
              <div className="bg-signal-positive" style={{ width: `${sentiment.positive}%` }} />
              <div className="bg-signal-warning" style={{ width: `${sentiment.neutral}%` }} />
              <div className="bg-signal-risk" style={{ width: `${sentiment.negative}%` }} />
            </div>
            <div className="mt-3 flex items-center justify-between font-mono text-[10.5px]">
              <span className="flex items-center gap-1.5 text-ink-muted"><span className="h-2 w-2 rounded-full bg-signal-positive" />{sentiment.positive}% positive</span>
              <span className="flex items-center gap-1.5 text-ink-muted"><span className="h-2 w-2 rounded-full bg-signal-warning" />{sentiment.neutral}% neutral</span>
              <span className="flex items-center gap-1.5 text-ink-muted"><span className="h-2 w-2 rounded-full bg-signal-risk" />{sentiment.negative}% negative</span>
            </div>
          </div>

          <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <SectionHead title="Experience scores" hint="Leeds · perception" icon={Smile} />
            <ul className="mt-4 space-y-3">
              {experienceScores.map((s) => (
                <li key={s.key}>
                  <div className="flex items-center justify-between text-[12.5px]">
                    <span className="font-medium text-ink">{s.key}</span>
                    <span className="font-mono tabular text-ink-muted">{s.value}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-canvas-subtle">
                    <div className={cn('h-full rounded-full', s.value >= 85 ? 'bg-signal-positive' : s.value >= 75 ? 'bg-signal-warning' : 'bg-signal-risk')} style={{ width: `${s.value}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* scatter + clusters */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <SectionHead title="Audit score ↔ satisfaction" hint="Each dot a club · r = 0.91" icon={Activity} />
          <div className="mt-3 h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 10, bottom: 4, left: -18 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EDEFF2" />
                <XAxis type="number" dataKey="auditScore" name="Audit" domain={[72, 100]} tick={{ fontSize: 10, fill: '#9AA0A8' }} axisLine={false} tickLine={false} label={{ value: 'Audit score', position: 'insideBottom', offset: -2, fontSize: 10, fill: '#9AA0A8' }} />
                <YAxis type="number" dataKey="satisfaction" name="Satisfaction" domain={[55, 100]} tick={{ fontSize: 10, fill: '#9AA0A8' }} axisLine={false} tickLine={false} />
                <ZAxis range={[120, 120]} />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ borderRadius: 10, border: '1px solid #E7E9ED', fontSize: 12 }}
                  formatter={(v, n) => [`${v}`, n === 'auditScore' ? 'Audit' : 'Satisfaction']}
                  labelFormatter={() => ''}
                />
                <Scatter data={experiencePoints} fill="#1F6FEB" fillOpacity={0.85} stroke="#fff" strokeWidth={1} isAnimationActive={false} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-1 flex items-start gap-1.5 font-mono text-[10.5px] leading-snug text-ink-subtle">
            <TrendingDown className="mt-px h-3 w-3 shrink-0 text-azure" />Leeds sits bottom-left — the lowest audit score and the lowest satisfaction in the portfolio.
          </p>
        </div>

        <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <SectionHead title="Complaint clusters → audit failures" hint="Recurring themes mapped to root cause" icon={MessageSquareWarning} />
          <ul className="mt-4 space-y-2.5">
            {complaintClusters.map((c) => (
              <li key={c.theme} className="rounded-lg border border-hairline px-3.5 py-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[12.5px] font-semibold text-ink">{c.theme}</p>
                  <span className="shrink-0 font-display text-[16px] font-bold tabular tracking-tight-bank text-ink">{c.count}</span>
                </div>
                <div className="mt-1.5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-canvas-subtle px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.06em] text-ink-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-azure" />{c.linkedFailure}
                  </span>
                  <span className="flex items-center gap-2 font-mono text-[10px] text-ink-faint">
                    top: {c.topClub}
                    <span className={cn('font-semibold', c.trend7d > 0 ? 'text-signal-risk' : 'text-signal-positive')}>{c.trend7d > 0 ? '▲' : '▼'}{Math.abs(c.trend7d)}%</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
