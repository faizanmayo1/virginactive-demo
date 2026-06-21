import { useEffect, useState } from 'react'

import type { ComplianceStatus } from '@/types'
import { cn } from '@/utils/cn'

const STATUS_COLOR: Record<ComplianceStatus, string> = {
  green: '#16A34A',
  amber: '#D97706',
  red: '#DC2626',
}

/**
 * Compliance "Pulse" ring — the signature score meter.
 * Transition-driven arc fill that re-animates whenever the value changes,
 * status-coloured, with a soft glow and the score in the display face.
 */
export function ScoreRing({
  value,
  status,
  size = 92,
  stroke = 8,
  label,
  animate = true,
}: {
  value: number
  status: ComplianceStatus
  size?: number
  stroke?: number
  label?: string
  animate?: boolean
}) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - Math.max(0, Math.min(100, value)) / 100)
  const color = STATUS_COLOR[status]

  const [dash, setDash] = useState(animate ? circ : offset)

  useEffect(() => {
    if (!animate) {
      setDash(offset)
      return
    }
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setDash(offset)
      return
    }
    setDash(circ)
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setDash(offset)))
    return () => cancelAnimationFrame(raf)
  }, [offset, circ, animate])

  return (
    <div className="relative grid shrink-0 place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90 overflow-visible">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EDEFF2" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={dash}
          style={{ transition: 'stroke-dashoffset 1.1s cubic-bezier(0.34, 1.2, 0.4, 1)', filter: `drop-shadow(0 0 5px ${color}55)` }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-display font-extrabold leading-none tabular tracking-tight-bank text-ink" style={{ fontSize: size * 0.26 }}>
          {Math.round(value)}
        </span>
        {label && <span className="mt-0.5 font-mono uppercase tracking-[0.12em] text-ink-faint" style={{ fontSize: Math.max(7, size * 0.092) }}>{label}</span>}
      </div>
    </div>
  )
}

export function StatusDot({ status, ping = false }: { status: ComplianceStatus; ping?: boolean }) {
  const color = STATUS_COLOR[status]
  return (
    <span className="relative inline-flex h-2.5 w-2.5">
      {ping && <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ backgroundColor: color }} />}
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
    </span>
  )
}

const CHIP: Record<ComplianceStatus, string> = {
  green: 'border-signal-positive/20 bg-signal-positive-soft text-signal-positive',
  amber: 'border-signal-warning/20 bg-signal-warning-soft text-signal-warning',
  red: 'border-signal-risk/20 bg-signal-risk-soft text-signal-risk',
}
const CHIP_LABEL: Record<ComplianceStatus, string> = { green: 'Compliant', amber: 'At risk', red: 'Breach' }

export function StatusChip({ status, className }: { status: ComplianceStatus; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-semibold', CHIP[status], className)}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: STATUS_COLOR[status] }} />
      {CHIP_LABEL[status]}
    </span>
  )
}
