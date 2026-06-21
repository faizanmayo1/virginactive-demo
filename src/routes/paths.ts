export const ROUTES = {
  root: '/',
  audit: '/audit',
  vision: '/vision',
  clubs: '/clubs',
  actions: '/actions',
  risk: '/risk',
  regions: '/regions',
  experience: '/experience',
} as const

export type RouteKey = keyof typeof ROUTES
