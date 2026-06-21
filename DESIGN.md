# Virgin Active — Design System ("Pulse")

An athletic light SaaS aesthetic for a **Digital Brand Standards & Operational Compliance Intelligence** platform. Bold **charcoal-black** structure (echoes Virgin Active's identity) on a near-white canvas, with a single electric **azure** accent that carries both brand energy and the AI / computer-vision layer. Mobile-first: the product lives in an inspector's hand, so the hero is a phone, not a dashboard.

## The one tension that shapes everything
Compliance scoring is built on **green / amber / red** traffic-light status, so **red is a reserved "breach" semantic** — it can't double as the brand colour. Hence azure (not Virgin red) carries brand + AI, and the status trio is never used decoratively.

## Palette

| Role | Token | Hex |
|------|-------|-----|
| Canvas | `canvas` | `#FAFBFC` |
| Card | `card` | `#FFFFFF` |
| Ink | `ink` | `#14161A` |
| Structure / primary (charcoal) | `steel` (alias `navy`) | `#1B1E24` |
| Brand + AI accent (azure) | `azure` / `amber` / `volt` / `sky` / `red` aliases | `#1F6FEB` |
| Hairline | `hairline` | `#E7E9ED` |
| Compliance status | `signal` | compliant `#16A34A` · at-risk `#D97706` · breach `#DC2626` |

> Token **keys** stay `steel`/`amber` (+ `navy`/`red`/`sky` aliases) so shared shadcn primitives render on-brand unedited; only the **values** are remapped. `amber → azure` routes every AI surface to the electric accent. HSL channels in `src/index.css`; literal scales in `tailwind.config.js`.

## Type
- **Display / headings:** Hanken Grotesk (athletic grotesque)
- **UI / body:** Inter
- **Scores / IDs / timestamps:** Spline Sans Mono, tabular (`.tabular`)

## Signatures
- **Compliance "Pulse" ring** (`ScoreRing`) — animated arc, status-coloured score meter.
- **Phone device frame** (`.device-frame` / `.device-screen`) — the mobile audit, the mobile-first thesis.
- **CV scan + detection boxes** (`.scan-line`, `animate-scan-sweep`, `animate-box-in`) — the computer-vision moment on `PhotoValidation`.
- **Charcoal rail** — solid near-black sidebar with azure active states (distinct from the light-sidebar roster).
- `.azure-rule` — charcoal→azure hairline crowning AI cards; `.aurora-wash` thinking backdrop; header audit ticker.

## IA (8 screens)
Overview: **Command Center** · Inspect: **Mobile Audit** ⭐, **AI Photo Validation** ⭐ · Compliance: **Club Compliance** · Operate: **Action & Accountability**, **Regional Manager Hub** · Intelligence: **Predictive Risk & Maintenance**, **Member Experience**.
Built so far: Command Center, Mobile Audit, AI Photo Validation. Remaining 5 are on-brand scaffolds.

## Domain framing
UK health-club operator. **250 clubs**, 5 regions (London / South / Midlands / North / Scotland & Wales). Personas: **James Whitmore** (Director of Operations, leadership) · **Priya Nair** (Regional Inspector, field). Hero narrative: **Leeds** breaches (cleanliness deviation in cardio + locker zones); the **North** region carries a recurring equipment-compliance cluster; threaded across Command Center → Mobile Audit (AUD-24817) → AI Photo Validation (treadmill #14). Pilot data scale: 250 clubs · 3,000 audits · 50k checklist items · 20k images · 10k maintenance records · 5k action tasks.
