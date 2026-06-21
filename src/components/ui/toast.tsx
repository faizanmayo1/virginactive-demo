import * as React from 'react'
import { createContext, useCallback, useContext, useState } from 'react'
import { AlertTriangle, CheckCircle2, Info, X } from 'lucide-react'

import { cn } from '@/utils/cn'

export type ToastTone = 'success' | 'info' | 'warning'

interface ToastItem {
  id: number
  title: string
  description?: string
  tone: ToastTone
}

interface ToastContextValue {
  toast: (t: { title: string; description?: string; tone?: ToastTone }) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

let counter = 0
const DISMISS_MS = 3800

const toneMap: Record<ToastTone, { icon: typeof Info; chip: string; bar: string }> = {
  success: { icon: CheckCircle2, chip: 'bg-signal-positive-soft text-signal-positive', bar: 'bg-signal-positive' },
  info: { icon: Info, chip: 'bg-sky-soft text-sky-deep', bar: 'bg-sky' },
  warning: { icon: AlertTriangle, chip: 'bg-signal-warning-soft text-signal-warning', bar: 'bg-signal-warning' },
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])

  const dismiss = useCallback((id: number) => {
    setItems((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback<ToastContextValue['toast']>(
    ({ title, description, tone = 'success' }) => {
      const id = ++counter
      setItems((prev) => [...prev, { id, title, description, tone }])
      window.setTimeout(() => dismiss(id), DISMISS_MS)
    },
    [dismiss],
  )

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[80] flex w-full max-w-[360px] flex-col gap-2">
        {items.map((t) => {
          const tone = toneMap[t.tone]
          const Icon = tone.icon
          return (
            <div
              key={t.id}
              className="pointer-events-auto relative flex items-start gap-3 overflow-hidden rounded-lg border border-hairline bg-card px-4 py-3 shadow-card-lg animate-fade-in"
              role="status"
            >
              <span className={cn('absolute left-0 top-0 h-full w-0.5', tone.bar)} aria-hidden />
              <span className={cn('mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md', tone.chip)}>
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{t.title}</p>
                {t.description && <p className="mt-0.5 text-[12px] leading-relaxed text-ink-muted">{t.description}</p>}
              </div>
              <button
                type="button"
                onClick={() => dismiss(t.id)}
                className="grid h-6 w-6 shrink-0 place-items-center rounded-md text-ink-subtle transition-colors hover:bg-canvas-subtle hover:text-ink"
                aria-label="Dismiss"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}
