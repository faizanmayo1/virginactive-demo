export interface AppNotification {
  id: string
  title: string
  body: string
  time: string
  tone: 'positive' | 'warning' | 'risk' | 'info'
  unread: boolean
}

export const notifications: AppNotification[] = [
  { id: 'n1', title: 'Leeds dropped to red status', body: 'Cleanliness deviation in cardio & locker zones pulled overall to 76.', time: '12m ago', tone: 'risk', unread: true },
  { id: 'n2', title: 'AI flagged a scoring mismatch', body: 'Treadmill #14 rated 78 by inspector, 61 by StandardsVision — review queued.', time: '18m ago', tone: 'risk', unread: true },
  { id: 'n3', title: 'North region equipment alert', body: '3 clubs trending below equipment-readiness threshold this week.', time: '1h ago', tone: 'warning', unread: true },
  { id: 'n4', title: 'Predictive warning · Manchester Deansgate', body: 'Forecast to breach cleanliness threshold within 48h at current pace.', time: '2h ago', tone: 'warning', unread: false },
  { id: 'n5', title: 'Surprise audit completed · Brighton', body: 'Score 92 · all zones compliant. No actions raised.', time: '3h ago', tone: 'positive', unread: false },
  { id: 'n6', title: 'Mayfair held top rank', body: 'Flagship retains #1 portfolio compliance for a 6th week.', time: '5h ago', tone: 'positive', unread: false },
]
