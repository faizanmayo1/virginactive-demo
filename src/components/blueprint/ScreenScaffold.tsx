import type { LucideIcon } from 'lucide-react'
import { Sparkles } from 'lucide-react'

import { PageHeader } from '@/components/blueprint/PageHeader'

/** On-brand placeholder for scaffolded-but-not-yet-built screens. */
export function ScreenScaffold({
  eyebrow,
  title,
  description,
  icon: Icon,
  features,
  demoMoment,
}: {
  eyebrow: string
  title: string
  description: string
  icon: LucideIcon
  features: string[]
  demoMoment: string
}) {
  return (
    <div className="mx-auto max-w-[1320px] reveal px-4 py-7 lg:px-8">
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      <div className="mt-7 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <div className="relative overflow-hidden rounded-xl border border-hairline bg-card p-6 shadow-card-sm">
          <div className="court-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
          <div className="relative">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-steel text-azure-300"><Icon className="h-5 w-5" /></span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-subtle">Planned capabilities</p>
                <p className="font-display text-[15px] font-bold tracking-tight-bank text-ink">In this screen</p>
              </div>
            </div>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 rounded-lg border border-hairline bg-canvas-subtle/40 px-3 py-2.5">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-azure" aria-hidden />
                  <span className="text-[12.5px] leading-snug text-ink-muted">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-azure/30 bg-card p-6 shadow-card-sm">
          <div className="azure-rule" aria-hidden />
          <div className="aurora-wash pointer-events-none absolute inset-0 opacity-70" aria-hidden />
          <div className="relative">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-azure text-white shadow-volt-glow"><Sparkles className="h-3.5 w-3.5" /></span>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-azure-deep">Signature demo moment</p>
            </div>
            <p className="mt-4 text-[14px] leading-relaxed text-ink">{demoMoment}</p>
            <p className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-hairline bg-canvas-subtle/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-subtle">
              Built next · one screen per turn
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
