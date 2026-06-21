import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium leading-none transition-colors',
  {
    variants: {
      variant: {
        default: 'border-navy/15 bg-navy/10 text-navy',
        secondary: 'border-hairline bg-canvas-subtle text-ink-muted',
        outline: 'border-hairline-strong text-ink-muted',
        positive: 'border-signal-positive/20 bg-signal-positive-soft text-signal-positive',
        warning: 'border-signal-warning/20 bg-signal-warning-soft text-signal-warning',
        risk: 'border-signal-risk/20 bg-signal-risk-soft text-signal-risk',
        info: 'border-signal-info/20 bg-signal-info-soft text-signal-info',
        sky: 'border-sky/30 bg-sky-soft text-sky-deep',
        amber: 'border-amber/30 bg-amber-soft text-amber-deep',
        red: 'border-red/25 bg-red-soft text-red-deep',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
