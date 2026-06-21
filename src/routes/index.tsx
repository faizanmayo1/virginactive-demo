import { Navigate, type RouteObject } from 'react-router-dom'

import { AppShell } from '@/layouts/AppShell'
import { CommandCenter } from '@/pages/CommandCenter'
import { MobileAudit } from '@/pages/MobileAudit'
import { PhotoValidation } from '@/pages/PhotoValidation'
import { ClubCompliance } from '@/pages/ClubCompliance'
import { ActionTracker } from '@/pages/ActionTracker'
import { PredictiveRisk } from '@/pages/PredictiveRisk'
import { RegionalHub } from '@/pages/RegionalHub'
import { MemberExperience } from '@/pages/MemberExperience'
import { ROUTES } from '@/routes/paths'

export const routes: RouteObject[] = [
  {
    path: ROUTES.root,
    element: <AppShell />,
    children: [
      { index: true, element: <CommandCenter /> },
      { path: ROUTES.audit.slice(1), element: <MobileAudit /> },
      { path: ROUTES.vision.slice(1), element: <PhotoValidation /> },
      { path: ROUTES.clubs.slice(1), element: <ClubCompliance /> },
      { path: ROUTES.actions.slice(1), element: <ActionTracker /> },
      { path: ROUTES.risk.slice(1), element: <PredictiveRisk /> },
      { path: ROUTES.regions.slice(1), element: <RegionalHub /> },
      { path: ROUTES.experience.slice(1), element: <MemberExperience /> },
      { path: '*', element: <Navigate to={ROUTES.root} replace /> },
    ],
  },
]
