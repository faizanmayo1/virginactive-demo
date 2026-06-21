import type { LucideIcon } from 'lucide-react'

import { useCountUp } from '@/utils/useCountUp'
import { cn } from '@/utils/cn'

type DeltaTone = 'positive' | 'negative' | 'neutral'

const deltaClass: Record<DeltaTone, string> = {
  positive: 'text-signal-positive',
  negative: 'text-signal-risk',
  neutral: 'text-ink-subtle',
}

/** KPI tile — count-up display value, optional delta, azure top-rail on hover. */
export function KPICard({
  label,
  value,
  delta,
  deltaTone = 'neutral',
  sub,
  icon: Icon,
  accent = false,
  delayMs = 0,
}: {
  label: string
  value: string
  delta?: string
  deltaTone?: DeltaTone
  sub?: string
  icon?: LucideIcon
  accent?: boolean
  delayMs?: number
}) {
  const display = useCountUp(value, { delayMs })
  return (
    <div className={cn('top-rail card-lift relative overflow-hidden rounded-xl border p-4 shadow-card-sm hover:shadow-card', accent ? 'border-azure/40 bg-gradient-to-br from-azure-soft/50 to-card' : 'border-hairline bg-card')}>
      <div className="flex items-start justify-between">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-ink-subtle">{label}</p>
        {Icon && (
          <span className={cn('grid h-7 w-7 place-items-center rounded-md', accent ? 'bg-azure text-white shadow-volt-glow' : 'bg-canvas-subtle text-ink-muted')}>
            <Icon className="h-3.5 w-3.5" />
          </span>
        )}
      </div>
      <p className={cn('mt-3 font-display text-[27px] font-extrabold leading-none tabular tracking-tight-bank', accent ? 'text-azure-gradient' : 'text-ink')}>{display}</p>
      <div className="mt-2 flex items-center gap-2">
        {delta && <span className={cn('text-[12px] font-semibold tabular', deltaClass[deltaTone])}>{delta}</span>}
        {sub && <span className="text-[11.5px] text-ink-subtle">{sub}</span>}
      </div>
    </div>
  )
}
