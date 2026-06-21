/**
 * Single source of truth for signal-tone → background class, so dots / bars /
 * chips render the same colour for the same tone everywhere. `info` is blue
 * (matches the canonical StatusBadge), not volt.
 */
export function toneBg(tone: string): string {
  const map: Record<string, string> = {
    positive: 'bg-signal-positive',
    info: 'bg-signal-info',
    warning: 'bg-signal-warning',
    risk: 'bg-signal-risk',
    neutral: 'bg-signal-neutral',
  }
  return map[tone] ?? map.neutral
}
