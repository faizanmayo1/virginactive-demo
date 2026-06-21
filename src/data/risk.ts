// Predictive Risk & Maintenance data

export interface RiskClub {
  club: string
  region: string
  currentScore: number
  predictedScore: number
  probability: number // chance of breach within window
  window: string
  driver: string
}

export const riskClubs: RiskClub[] = [
  { club: 'Manchester Deansgate', region: 'North', currentScore: 90, predictedScore: 79, probability: 0.86, window: '48 hours', driver: 'Cleanliness · peak-weekend load + cleaning gap' },
  { club: 'Liverpool', region: 'North', currentScore: 84, predictedScore: 78, probability: 0.74, window: '7 days', driver: 'Equipment · cardio wear, slow response time' },
  { club: 'Nottingham', region: 'Midlands', currentScore: 87, predictedScore: 81, probability: 0.61, window: '7 days', driver: 'Cleanliness · recurring changing-room flags' },
  { club: 'Leicester', region: 'Midlands', currentScore: 86, predictedScore: 82, probability: 0.52, window: '14 days', driver: 'Equipment · ageing studio kit' },
  { club: 'Sheffield', region: 'North', currentScore: 83, predictedScore: 80, probability: 0.44, window: '14 days', driver: 'Safety · flooring wear in studios' },
]

// The 48-hour early-warning hero
export const heroAlert = {
  club: 'Manchester Deansgate',
  window: '48 hours',
  probability: 0.86,
  current: 90,
  predicted: 79,
  category: 'Cleanliness',
  rationale: [
    'Saturday + Sunday forecast at 1.9× weekday footfall',
    'Cardio & locker zones already trending down this week',
    'No deep-clean scheduled before the weekend peak',
  ],
  intervention: 'Insert a Saturday 06:00 deep-clean + midday spot-check',
  ifIgnored: 'Forecast breach by Sunday 18:00 · −11 points',
}

export interface EquipmentForecast {
  asset: string
  club: string
  type: string
  health: number
  predictedService: string
  usageVsAvg: number
  status: 'monitor' | 'service-soon' | 'urgent'
}

export const equipmentForecast: EquipmentForecast[] = [
  { asset: 'Treadmill #14', club: 'Leeds', type: 'Cardio', health: 41, predictedService: 'Within 3 days', usageVsAvg: 1.6, status: 'urgent' },
  { asset: 'Cross-trainer #6', club: 'Leeds', type: 'Cardio', health: 28, predictedService: 'Overdue', usageVsAvg: 1.4, status: 'urgent' },
  { asset: 'Cycle bank A (×8)', club: 'Liverpool', type: 'Studio', health: 58, predictedService: 'Within 9 days', usageVsAvg: 1.3, status: 'service-soon' },
  { asset: 'Treadmill #3', club: 'Manchester Deansgate', type: 'Cardio', health: 63, predictedService: 'Within 12 days', usageVsAvg: 1.5, status: 'service-soon' },
  { asset: 'Rowing erg #2', club: 'Nottingham', type: 'Cardio', health: 71, predictedService: 'Within 18 days', usageVsAvg: 1.1, status: 'monitor' },
  { asset: 'Cable machine #1', club: 'Sheffield', type: 'Strength', health: 76, predictedService: 'Within 24 days', usageVsAvg: 0.9, status: 'monitor' },
]

// Hourly load profile (cleaning-schedule optimisation) — % of capacity
export const usageProfile = [
  { hour: '06', weekday: 38, weekend: 22 },
  { hour: '08', weekday: 74, weekend: 40 },
  { hour: '10', weekday: 52, weekend: 78 },
  { hour: '12', weekday: 61, weekend: 88 },
  { hour: '14', weekday: 44, weekend: 82 },
  { hour: '16', weekday: 58, weekend: 64 },
  { hour: '18', weekday: 92, weekend: 49 },
  { hour: '20', weekday: 70, weekend: 33 },
]

export const riskStats = {
  clubsAtRisk: 14,
  predictedBreaches48h: 1,
  equipmentUrgent: 2,
  forecastAccuracy: 0.89,
  preventedBreaches: 37,
}
