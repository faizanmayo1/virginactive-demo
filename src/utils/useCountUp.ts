import { useEffect, useRef, useState } from 'react'

interface Parsed {
  prefix: string
  num: number
  decimals: number
  suffix: string
  grouped: boolean
}

/** Split a display string like "$4.8M" / "94.2%" / "306 hrs" / "1 / 6" into animatable parts. */
function parse(value: string): Parsed | null {
  const m = value.match(/^(\D*)(-?[\d,]*\.?\d+)(.*)$/s)
  if (!m) return null
  const raw = m[2].replace(/,/g, '')
  const num = parseFloat(raw)
  if (!Number.isFinite(num)) return null
  return {
    prefix: m[1],
    num,
    decimals: raw.includes('.') ? raw.split('.')[1].length : 0,
    suffix: m[3],
    grouped: m[2].includes(','),
  }
}

function format(n: number, decimals: number, grouped: boolean): string {
  const s = n.toFixed(decimals)
  if (!grouped) return s
  const [int, dec] = s.split('.')
  const withSep = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return dec ? `${withSep}.${dec}` : withSep
}

/**
 * Animate a numeric display string from 0 → its value on mount (easeOutCubic),
 * preserving any prefix/suffix. Respects prefers-reduced-motion and falls back
 * to the literal value for non-numeric strings.
 */
export function useCountUp(value: string, { durationMs = 900, delayMs = 0 }: { durationMs?: number; delayMs?: number } = {}) {
  const parsed = parse(value)
  const [display, setDisplay] = useState(() =>
    parsed ? `${parsed.prefix}${format(0, parsed.decimals, parsed.grouped)}${parsed.suffix}` : value,
  )
  const rafRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (!parsed) {
      setDisplay(value)
      return
    }
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setDisplay(value)
      return
    }
    let start: number | null = null
    const tick = (t: number) => {
      if (start === null) start = t
      const p = Math.min(1, (t - start) / durationMs)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(`${parsed.prefix}${format(parsed.num * eased, parsed.decimals, parsed.grouped)}${parsed.suffix}`)
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
      else setDisplay(value)
    }
    const timer = window.setTimeout(() => {
      rafRef.current = requestAnimationFrame(tick)
    }, delayMs)
    return () => {
      window.clearTimeout(timer)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, durationMs, delayMs])

  return display
}
