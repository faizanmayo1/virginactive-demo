import { cn } from '@/utils/cn'

/** Virgin Active "Pulse" mark — a heartbeat/pulse glyph in azure on a charcoal tile. */
export function Wordmark({ size = 'md', tone = 'dark' }: { size?: 'sm' | 'md' | 'lg'; tone?: 'dark' | 'light' }) {
  const dim = size === 'lg' ? 'h-9 w-9' : size === 'sm' ? 'h-7 w-7' : 'h-8 w-8'
  const title = size === 'lg' ? 'text-[17px]' : 'text-[15px]'
  return (
    <div className="flex items-center gap-2.5">
      <span className={cn('grid shrink-0 place-items-center rounded-[10px] shadow-card-sm', dim, tone === 'dark' ? 'bg-steel' : 'bg-white')}>
        <svg viewBox="0 0 32 32" className="h-[60%] w-[60%]" fill="none" aria-hidden>
          <path d="M4 18 L11 18 L14 9 L18 25 L21 18 L28 18" stroke="#1F6FEB" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <div className="leading-none">
        <p className={cn('font-display font-extrabold tracking-tight-bank', title, tone === 'dark' ? 'text-ink' : 'text-white')}>
          Virgin Active
        </p>
        <p className="mt-0.5 font-mono text-[8.5px] font-medium uppercase tracking-[0.18em] text-ink-faint">Brand Standards</p>
      </div>
    </div>
  )
}
