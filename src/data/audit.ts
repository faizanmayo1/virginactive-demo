import type { AuditZone } from '@/types'

// Live mobile audit in progress — Virgin Active Leeds, the hero club.
export const auditMeta = {
  auditId: 'AUD-24817',
  club: 'Virgin Active Leeds',
  clubId: 'va-leeds',
  template: 'Classic Club · Full Standards',
  inspector: 'Priya Nair',
  role: 'Regional Inspector',
  startedAt: '09:42',
  geo: '53.7965° N, 1.5478° W',
  geoLabel: 'Leeds, LS1 · verified',
  device: 'iPhone 15 · offline-capable',
  items: 42,
  itemsDone: 31,
}

// Smart-checklist adaptation banner facts
export const checklistAdaptation = {
  tier: 'Classic',
  size: 'Large (3,200 m²)',
  region: 'North',
  membership: 'Standard + Premium',
  added: ['Free-weights zone capacity check', 'Sauna temperature log'],
  removed: ['Pool plant room (no pool at site)'],
}

export const auditZones: AuditZone[] = [
  {
    id: 'reception',
    name: 'Reception & Member Experience',
    icon: 'door-open',
    score: 94,
    photos: 3,
    items: [
      { id: 'r1', label: 'Welcome desk staffed & branded', state: 'pass', weight: 2, photo: true },
      { id: 'r2', label: 'Entrance floor clean, no hazards', state: 'pass', weight: 3 },
      { id: 'r3', label: 'Digital signage on-brand & current', state: 'pass', weight: 1, photo: true },
      { id: 'r4', label: 'Queue time under 2 minutes', state: 'flag', weight: 2, note: 'Peak-hour queue 3m20s observed' },
    ],
  },
  {
    id: 'gym-floor',
    name: 'Gym Floor & Cardio',
    icon: 'dumbbell',
    score: 71,
    photos: 8,
    items: [
      { id: 'g1', label: 'Cardio machines wiped & sanitised', state: 'fail', weight: 4, photo: true, aiFlag: 'Dust accumulation detected on treadmill belt housing', note: 'Treadmill #14 — visible grime' },
      { id: 'g2', label: 'Floor free of clutter & loose cables', state: 'pass', weight: 3, photo: true },
      { id: 'g3', label: 'Equipment spacing meets layout standard', state: 'pass', weight: 2 },
      { id: 'g4', label: 'Out-of-order machines tagged & logged', state: 'fail', weight: 3, note: 'Cross-trainer #6 faulty, untagged' },
      { id: 'g5', label: 'Sanitiser stations stocked', state: 'pass', weight: 2, photo: true },
    ],
  },
  {
    id: 'free-weights',
    name: 'Free Weights',
    icon: 'weight',
    score: 88,
    photos: 4,
    items: [
      { id: 'f1', label: 'Weights racked & returned to home', state: 'flag', weight: 2, photo: true, note: 'Several dumbbells off-rack' },
      { id: 'f2', label: 'Benches clean & undamaged', state: 'pass', weight: 2, photo: true },
      { id: 'f3', label: 'Flooring intact, no trip hazards', state: 'pass', weight: 3 },
    ],
  },
  {
    id: 'studios',
    name: 'Studios & Class Readiness',
    icon: 'music',
    score: 92,
    photos: 2,
    items: [
      { id: 's1', label: 'Studio floor clean & sprung surface intact', state: 'pass', weight: 3, photo: true },
      { id: 's2', label: 'Class equipment sanitised & stored', state: 'pass', weight: 2 },
      { id: 's3', label: 'AV & lighting operational', state: 'pass', weight: 1, photo: true },
    ],
  },
  {
    id: 'locker',
    name: "Men's Locker Room",
    icon: 'lock',
    score: 58,
    photos: 9,
    items: [
      { id: 'l1', label: 'Showers clean, no limescale or mould', state: 'fail', weight: 4, photo: true, aiFlag: 'Mould pattern detected in grout — corner stall 4', note: 'Recurring failure — 3rd audit' },
      { id: 'l2', label: 'Floors dry & non-slip', state: 'fail', weight: 4, photo: true, note: 'Standing water near vanity' },
      { id: 'l3', label: 'Lockers functional & undamaged', state: 'flag', weight: 2, note: 'Locker 212 latch broken' },
      { id: 'l4', label: 'Consumables stocked (towels, toiletries)', state: 'pass', weight: 2, photo: true },
      { id: 'l5', label: 'Waste bins emptied', state: 'pass', weight: 1 },
    ],
  },
  {
    id: 'spa',
    name: 'Spa & Wellness',
    icon: 'waves',
    score: 90,
    photos: 5,
    items: [
      { id: 'w1', label: 'Sauna temperature within range & logged', state: 'pass', weight: 2, photo: true },
      { id: 'w2', label: 'Relaxation area clean & set up', state: 'pass', weight: 2, photo: true },
      { id: 'w3', label: 'Treatment rooms turned over', state: 'pending', weight: 2 },
    ],
  },
]
