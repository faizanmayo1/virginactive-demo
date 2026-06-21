import { X } from 'lucide-react'

import { notifications, type AppNotification } from '@/data/notifications'
import { cn } from '@/utils/cn'

const toneDot: Record<AppNotification['tone'], string> = {
  positive: 'bg-signal-positive',
  warning: 'bg-signal-warning',
  risk: 'bg-signal-risk',
  info: 'bg-signal-info',
}

export function NotificationsPanel({
  open,
  onClose,
  cleared,
  onMarkAllRead,
}: {
  open: boolean
  onClose: () => void
  cleared: boolean
  onMarkAllRead: () => void
}) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[70]">
      <button type="button" aria-label="Close notifications" className="absolute inset-0 bg-steel-900/30 backdrop-blur-[2px] animate-fade-in" onClick={onClose} />
      <aside className="absolute inset-y-0 right-0 flex w-[360px] max-w-[90vw] flex-col border-l border-hairline bg-card shadow-card-lg animate-slide-in-right">
        <div className="flex h-16 items-center justify-between border-b border-hairline px-5">
          <div>
            <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-faint">Alerts</p>
            <p className="font-display text-[15px] font-bold tracking-tight-bank text-ink">Notifications</p>
          </div>
          <button type="button" onClick={onClose} className="grid h-8 w-8 place-items-center rounded-md text-ink-muted hover:bg-canvas-subtle" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center justify-between border-b border-hairline px-5 py-2.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-subtle">{cleared ? 'All caught up' : `${notifications.filter((n) => n.unread).length} unread`}</span>
          <button type="button" onClick={onMarkAllRead} className="font-mono text-[10px] uppercase tracking-[0.1em] text-azure-deep hover:underline">Mark all read</button>
        </div>
        <ul className="flex-1 overflow-y-auto px-3 py-3">
          {notifications.map((n) => (
            <li key={n.id} className={cn('relative rounded-lg px-3 py-3 transition-colors hover:bg-canvas-subtle', !cleared && n.unread && 'bg-azure-soft/30')}>
              <div className="flex items-start gap-3">
                <span className={cn('mt-1.5 h-2 w-2 shrink-0 rounded-full', toneDot[n.tone])} />
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold leading-snug text-ink">{n.title}</p>
                  <p className="mt-0.5 text-[12px] leading-snug text-ink-muted">{n.body}</p>
                  <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.08em] text-ink-faint">{n.time}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}
