/**
 * VyaPay formatters — USD-first payments helpers (amounts, rates, bps, counts).
 * Numerics render tabular.
 */

const LOCALE = 'en-US'

const usdFull = new Intl.NumberFormat(LOCALE, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
const usdCents = new Intl.NumberFormat(LOCALE, { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })
const usdCompact = new Intl.NumberFormat(LOCALE, { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 2 })
const numberCompact = new Intl.NumberFormat(LOCALE, { notation: 'compact', maximumFractionDigits: 1 })
const numberFull = new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 0 })
const pct1 = new Intl.NumberFormat(LOCALE, { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 })

/** $1,250 — whole-dollar amount */
export const formatUSD = (v: number) => usdFull.format(v)
/** $12.50 — amount with cents (transaction values) */
export const formatUSDCents = (v: number) => usdCents.format(v)
/** $2.1M / $58K — compact currency for KPIs */
export const formatUSDCompact = (v: number) => usdCompact.format(v)
/** 12.3K / 5M — generic compact */
export const formatCompact = (v: number) => numberCompact.format(v)
/** 2,000 — grouped integer */
export const formatNumber = (v: number) => numberFull.format(v)
/** 94.2% — approval/decline/CB rate (input as decimal 0.942) */
export const formatPercent = (v: number) => pct1.format(v)
/** 94.2 — pass a 0–100 figure for a bare percent string */
export const formatRate = (v: number) => `${v.toFixed(1)}%`
/** 18 bps — basis points */
export const formatBps = (v: number) => `${v} bps`

export const formatDelta = (value: number, variant: 'percent' | 'number' = 'percent') => {
  const arrow = value > 0 ? '▲' : value < 0 ? '▼' : '·'
  const abs = Math.abs(value)
  return variant === 'number' ? `${arrow} ${numberCompact.format(abs)}` : `${arrow} ${abs.toFixed(1)}%`
}

export const deltaTone = (
  value: number,
  inversion: 'higher-is-better' | 'lower-is-better' = 'higher-is-better',
): 'positive' | 'negative' | 'neutral' => {
  if (value === 0) return 'neutral'
  const isPositive = inversion === 'higher-is-better' ? value > 0 : value < 0
  return isPositive ? 'positive' : 'negative'
}
