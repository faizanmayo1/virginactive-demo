import type { ReactNode } from 'react'

import { cn } from '@/utils/cn'

/** Section heading — display title + optional mono hint and a trailing action. */
export function SectionHead({
  title,
  hint,
  action,
  icon: Icon,
  className,
}: {
  title: string
  hint?: string
  action?: ReactNode
  icon?: React.ComponentType<{ className?: string }>
  className?: string
}) {
  return (
    <div className={cn('flex items-end justify-between gap-3', className)}>
      <div className="flex items-center gap-2.5">
        {Icon && (
          <span className="grid h-7 w-7 place-items-center rounded-md border border-hairline bg-canvas-subtle text-ink-muted">
            <Icon className="h-4 w-4" />
          </span>
        )}
        <div>
          <h2 className="font-display text-[15px] font-bold tracking-tight-bank text-ink">{title}</h2>
          {hint && <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-subtle">{hint}</p>}
        </div>
      </div>
      {action}
    </div>
  )
}
