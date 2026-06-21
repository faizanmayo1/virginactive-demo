import { useMemo, useState } from 'react'
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/utils/cn'

export type SortDir = 'asc' | 'desc'

/**
 * Generic client-side table sort. Pass the row array and the initial sort key
 * (a key of T whose value is number | string). Returns the sorted rows plus
 * the current key/dir and a toggle handler for header clicks.
 */
export function useSortable<T>(rows: T[], initialKey: keyof T, initialDir: SortDir = 'desc') {
  const [sortKey, setSortKey] = useState<keyof T>(initialKey)
  const [sortDir, setSortDir] = useState<SortDir>(initialDir)

  const sorted = useMemo(() => {
    const copy = [...rows]
    copy.sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      const cmp =
        typeof av === 'number' && typeof bv === 'number'
          ? av - bv
          : String(av).localeCompare(String(bv))
      return sortDir === 'asc' ? cmp : -cmp
    })
    return copy
  }, [rows, sortKey, sortDir])

  const toggle = (key: keyof T) => {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir(typeof rows[0]?.[key] === 'number' ? 'desc' : 'asc')
    }
  }

  return { sorted, sortKey, sortDir, toggle }
}

/** Clickable column-header label with a sort-direction caret. */
export function SortLabel({
  label,
  active,
  dir,
  onClick,
  align = 'left',
}: {
  label: string
  active: boolean
  dir: SortDir
  onClick: () => void
  align?: 'left' | 'right' | 'center'
}) {
  const Icon = !active ? ChevronsUpDown : dir === 'asc' ? ChevronUp : ChevronDown
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group inline-flex items-center gap-1 font-mono text-[10px] font-medium uppercase tracking-[0.1em] transition-colors hover:text-ink',
        active ? 'text-ink' : 'text-ink-subtle',
        align === 'right' && 'flex-row-reverse',
        align === 'center' && 'justify-center',
      )}
    >
      {label}
      <Icon
        className={cn(
          'h-3 w-3 shrink-0 transition-opacity',
          active ? 'opacity-100 text-ink' : 'opacity-40 group-hover:opacity-70',
        )}
      />
    </button>
  )
}
