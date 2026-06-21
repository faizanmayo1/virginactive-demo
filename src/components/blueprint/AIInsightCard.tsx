import type { ReactNode } from 'react'
import { Sparkles } from 'lucide-react'

import { cn } from '@/utils/cn'

/** Azure AI panel — the computer-vision / copilot surface, crowned with an azure rule. */
export function AIInsightCard({
  title,
  eyebrow = 'StandardsVision AI',
  children,
  className,
  footer,
}: {
  title: string
  eyebrow?: string
  children: ReactNode
  className?: string
  footer?: ReactNode
}) {
  return (
    <div className={cn('relative overflow-hidden rounded-xl border border-azure/30 bg-card shadow-card-sm', className)}>
      <div className="azure-rule" aria-hidden />
      <div className="aurora-wash pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div className="relative p-5">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-azure text-white shadow-volt-glow"><Sparkles className="h-3.5 w-3.5" /></span>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-azure-deep">{eyebrow}</p>
        </div>
        <h3 className="mt-3 font-display text-[16px] font-bold tracking-tight-bank text-ink">{title}</h3>
        <div className="mt-3">{children}</div>
        {footer && <div className="mt-4 border-t border-hairline pt-3">{footer}</div>}
      </div>
    </div>
  )
}
