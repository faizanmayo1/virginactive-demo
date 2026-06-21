import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Bell, Menu, Sparkles, X } from 'lucide-react'

import { NotificationsPanel } from '@/components/NotificationsPanel'
import { Wordmark } from '@/components/Brand/Wordmark'
import { notifications } from '@/data/notifications'
import { portfolio } from '@/data/clubs'
import { findRouteByPath, groupRoutesBySection } from '@/routes/registry'
import { cn } from '@/utils/cn'

const UNREAD = notifications.filter((n) => n.unread).length

function NavSections({ onNavigate }: { onNavigate?: () => void }) {
  const sections = groupRoutesBySection()
  return (
    <nav className="flex-1 overflow-y-auto px-3 pb-2">
      {sections.map(({ section, entries }) => (
        <div key={section} className="mt-5 first:mt-1">
          <p className="px-2 pb-1.5 pt-1 font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-steel-400">{section}</p>
          <ul className="space-y-0.5">
            {entries.map((entry) => (
              <li key={entry.path}>
                <NavLink
                  to={entry.path}
                  end={entry.end}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    cn(
                      'group relative flex items-center gap-2.5 overflow-hidden rounded-lg px-2.5 py-2 text-[12.5px] font-medium transition-colors',
                      isActive ? 'nav-active-wash text-white' : 'text-steel-300 hover:bg-white/[0.05] hover:text-white',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className={cn('absolute left-0 top-1.5 bottom-1.5 w-[2.5px] rounded-r-full transition-colors', isActive ? 'bg-azure' : 'bg-transparent')} aria-hidden />
                      <entry.icon className={cn('h-[17px] w-[17px] shrink-0', isActive ? 'text-azure-glow' : 'text-steel-400 group-hover:text-steel-200')} />
                      <span className="flex-1 truncate">{entry.short}</span>
                      {entry.badge?.variant === 'amber' && (
                        <span className="rounded-full bg-azure/20 px-1.5 py-0.5 font-mono text-[8.5px] font-semibold uppercase tracking-[0.08em] text-azure-glow">{entry.badge.text}</span>
                      )}
                      {entry.badge?.variant === 'warning' && (
                        <span className="flex items-center gap-1 rounded-full bg-signal-warning/15 px-1.5 py-0.5 font-mono text-[8.5px] font-semibold uppercase tracking-[0.06em] text-signal-warning">
                          <span className="h-1 w-1 animate-pulse-soft rounded-full bg-signal-warning" />
                          {entry.badge.text}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}

function PortfolioPulse() {
  return (
    <div className="px-4 pb-3 pt-3">
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3">
        <p className="font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-steel-400">Portfolio pulse</p>
        <div className="mt-1.5 flex items-baseline gap-1.5">
          <span className="font-display text-[20px] font-extrabold tabular tracking-tight-bank text-white">{portfolio.compliance}%</span>
          <span className="font-mono text-[10px] text-signal-risk">▼ {Math.abs(portfolio.complianceTrend)}</span>
        </div>
        <div className="mt-2 flex items-center gap-3 border-t border-white/10 pt-2.5 text-[10px]">
          <span className="flex items-center gap-1 font-mono text-steel-300"><span className="h-1.5 w-1.5 rounded-full bg-signal-risk" />{portfolio.redClubs} red</span>
          <span className="flex items-center gap-1 font-mono text-steel-300"><span className="h-1.5 w-1.5 rounded-full bg-signal-warning" />{portfolio.amberClubs} amber</span>
        </div>
      </div>
    </div>
  )
}

function UserCard() {
  return (
    <div className="border-t border-white/10 px-3 py-3">
      <button type="button" className="flex w-full items-center gap-2.5 rounded-md p-1.5 text-left transition-colors hover:bg-white/[0.05]">
        <div className="grid h-8 w-8 place-items-center rounded-full bg-azure text-[11px] font-semibold tabular text-white">JW</div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-medium text-white">James Whitmore</p>
          <p className="truncate font-mono text-[9px] uppercase tracking-[0.06em] text-steel-400">Director of Operations</p>
        </div>
      </button>
    </div>
  )
}

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <div className="flex h-16 items-center px-5">
        <Wordmark size="md" tone="light" />
      </div>
      <div className="mx-5 h-px bg-white/10" />
      <NavSections onNavigate={onNavigate} />
      <PortfolioPulse />
      <UserCard />
    </>
  )
}

const TICKER = [
  'Brighton · surprise audit complete · 92',
  'Mayfair · zone re-check passed · 97',
  'Leeds · cleanliness flag raised · cardio',
  'StandardsVision · 18 photos analysed',
  'Canary Wharf · audit complete · 95',
  'North region · equipment alert · 3 clubs',
]

function Topbar({ onOpenNav, onOpenNotes, unread }: { onOpenNav: () => void; onOpenNotes: () => void; unread: number }) {
  const location = useLocation()
  const route = findRouteByPath(location.pathname) ?? findRouteByPath('/')
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-hairline bg-canvas/80 px-4 backdrop-blur-xl lg:px-8">
      <button type="button" onClick={onOpenNav} className="grid h-9 w-9 shrink-0 place-items-center rounded-md text-ink-muted hover:bg-canvas-subtle lg:hidden" aria-label="Open navigation">
        <Menu className="h-5 w-5" />
      </button>

      <div className="min-w-0 shrink-0 lg:w-60">
        <p className="font-mono text-[9.5px] font-medium uppercase tracking-[0.16em] text-ink-faint">{route?.eyebrow}</p>
        <h1 className="truncate font-display text-[16px] font-bold tracking-tight-bank text-ink">{route?.label}</h1>
      </div>

      <div className="hidden items-center gap-3 overflow-hidden lg:flex lg:flex-1">
        <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-hairline bg-card px-2 py-1">
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-positive opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal-positive" />
          </span>
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-ink-subtle">7 audits live</span>
        </span>
        <div className="ticker-mask relative min-w-0 flex-1 overflow-hidden">
          <div className="flex w-max items-center gap-8 whitespace-nowrap will-change-transform animate-[ticker_38s_linear_infinite]">
            {[...TICKER, ...TICKER].map((t, i) => (
              <span key={i} className="font-mono text-[11px] text-ink-subtle">
                <span className="mr-2 text-azure">·</span>{t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <button type="button" onClick={onOpenNotes} className="relative grid h-9 w-9 shrink-0 place-items-center rounded-md text-ink-muted hover:bg-canvas-subtle" aria-label="Notifications">
        <Bell className="h-5 w-5" />
        {unread > 0 && (
          <span className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-signal-risk px-1 font-mono text-[9px] font-semibold text-white">{unread}</span>
        )}
      </button>

      <button type="button" className="hidden shrink-0 items-center gap-2 rounded-full border border-azure/30 bg-azure-soft px-3 py-1.5 transition-colors hover:bg-azure-100 sm:flex">
        <Sparkles className="h-3.5 w-3.5 text-azure" />
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-azure-deep">Ask Copilot</span>
      </button>
    </header>
  )
}

export function AppShell() {
  const [navOpen, setNavOpen] = useState(false)
  const [notesOpen, setNotesOpen] = useState(false)
  const [notesCleared, setNotesCleared] = useState(false)
  const location = useLocation()

  useEffect(() => { setNavOpen(false) }, [location.pathname])

  return (
    <div className="relative flex min-h-screen">
      <div className="app-atmosphere pointer-events-none fixed inset-0 -z-10" aria-hidden />
      <div className="app-grain pointer-events-none fixed inset-0 -z-10" aria-hidden />

      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-gradient-to-b from-steel-800 to-steel-900 lg:flex">
        <Sidebar />
      </aside>

      {navOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button type="button" aria-label="Close navigation" className="absolute inset-0 bg-steel-900/50 backdrop-blur-[2px] animate-fade-in" onClick={() => setNavOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-72 flex-col bg-gradient-to-b from-steel-800 to-steel-900 animate-slide-in-right">
            <button type="button" onClick={() => setNavOpen(false)} className="absolute right-3 top-4 grid h-8 w-8 place-items-center rounded-md text-steel-300 hover:bg-white/10" aria-label="Close">
              <X className="h-4 w-4" />
            </button>
            <Sidebar onNavigate={() => setNavOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onOpenNav={() => setNavOpen(true)} onOpenNotes={() => setNotesOpen(true)} unread={notesCleared ? 0 : UNREAD} />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      <NotificationsPanel open={notesOpen} onClose={() => setNotesOpen(false)} cleared={notesCleared} onMarkAllRead={() => setNotesCleared(true)} />
    </div>
  )
}
