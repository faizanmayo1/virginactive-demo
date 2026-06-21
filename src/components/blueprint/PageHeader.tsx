import type { ReactNode } from 'react'

import { cn } from '@/utils/cn'

/** Page hero header — eyebrow + display title + lede, optional actions and meta row. */
export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  meta,
  className,
}: {
  eyebrow: string
  title: string
  description?: string
  actions?: ReactNode
  meta?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('relative', className)}>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="h-3.5 w-[2.5px] rounded-full bg-azure" aria-hidden />
            <p className="font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-ink-subtle">{eyebrow}</p>
          </div>
          <h1 className="mt-2 font-display text-[26px] font-extrabold leading-tight tracking-tight-bank text-ink md:text-[30px]">{title}</h1>
          {description && <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">{description}</p>}
        </div>
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>
      {meta && <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">{meta}</div>}
    </div>
  )
}

export function HeaderStat({ label, value, tone }: { label: string; value: string; tone?: 'azure' | 'positive' | 'warning' | 'risk' }) {
  const toneClass =
    tone === 'azure' ? 'text-azure-deep'
    : tone === 'positive' ? 'text-signal-positive'
    : tone === 'warning' ? 'text-signal-warning'
    : tone === 'risk' ? 'text-signal-risk'
    : 'text-ink'
  return (
    <div className="flex items-baseline gap-2">
      <span className={cn('font-display text-[17px] font-bold tabular tracking-tight-bank', toneClass)}>{value}</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-subtle">{label}</span>
    </div>
  )
}
