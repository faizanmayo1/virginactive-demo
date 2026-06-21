import type { VisionDetection } from '@/types'

// AI photo validation — the computer-vision layer.
// Subject: cardio zone photo captured during the Leeds audit (treadmill #14).
export const visionMeta = {
  imageId: 'IMG-AUD24817-014',
  capturedBy: 'Priya Nair',
  capturedAt: '09:58 · today',
  zone: 'Gym Floor & Cardio',
  asset: 'Treadmill #14',
  club: 'Virgin Active Leeds',
  model: 'StandardsVision v4',
  latencyMs: 820,
}

export const detections: VisionDetection[] = [
  { id: 'd1', label: 'Dust accumulation — belt housing', severity: 'risk', confidence: 0.94, x: 20, y: 58, w: 34, h: 22 },
  { id: 'd2', label: 'Grime build-up — side rail', severity: 'warning', confidence: 0.88, x: 60, y: 44, w: 26, h: 18 },
  { id: 'd3', label: 'Smudging — console screen', severity: 'warning', confidence: 0.81, x: 40, y: 14, w: 22, h: 16 },
  { id: 'd4', label: 'Clean zone — deck surface', severity: 'positive', confidence: 0.97, x: 30, y: 84, w: 40, h: 11 },
]

// Score breakdown the model produces for the cleanliness sub-standard
export const visionScore = {
  cleanliness: 61,
  status: 'red' as const,
  threshold: 80,
  violation: 'BRAND-CLN-03 · Cardio equipment hygiene below standard',
}

// The objectivity moment: inspector's tap vs the model's read
export const scoringDiscrepancy = {
  inspectorScore: 78,
  aiScore: 61,
  gap: 17,
  verdict: 'Inspector rating exceeds image evidence — flagged for review',
}

export const analysisSteps = [
  { label: 'Image received & EXIF verified', detail: 'Geo + timestamp match audit AUD-24817', done: true },
  { label: 'Asset recognised', detail: 'Treadmill · cardio class', done: true },
  { label: 'Surface segmentation', detail: '5 regions · belt, rails, console, deck, frame', done: true },
  { label: 'Contaminant detection', detail: 'Dust, grime, smudge, residue models', done: true },
  { label: 'Cleanliness score + violation match', detail: 'Mapped to BRAND-CLN-03', done: true },
]

export const visionChecks = [
  { label: 'Photo evidence present', value: 'Pass', tone: 'positive' as const },
  { label: 'Geo + timestamp valid', value: 'Pass', tone: 'positive' as const },
  { label: 'Score vs evidence', value: 'Mismatch', tone: 'risk' as const },
  { label: 'Model confidence', value: 'High · 0.90', tone: 'positive' as const },
]

// Before / after — same asset, last compliant capture vs today
export const beforeAfter = {
  before: { label: 'Last compliant', date: '14 days ago', score: 91 },
  after: { label: 'Today', date: 'just now', score: 61 },
}

// Portfolio-level CV stats for the page header
export const visionStats = {
  imagesAnalysed: 20418,
  flagsRaised: 1342,
  scoringMismatches: 268,
  avgConfidence: 0.91,
  hoursSaved: 1180,
}
