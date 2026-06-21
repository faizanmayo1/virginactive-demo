import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-150 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:active:translate-y-0 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-b from-steel-600 to-steel text-white hover:from-steel-500 hover:to-steel-600 shadow-card-sm',
        navy: 'bg-steel text-steel-fore hover:bg-steel-600 shadow-card-sm',
        amber: 'bg-gradient-to-br from-volt to-volt-deep text-white shadow-cta hover:shadow-volt-lift hover:-translate-y-px',
        secondary: 'bg-card text-ink border border-hairline hover:bg-canvas-subtle hover:border-hairline-strong shadow-card-sm',
        ghost: 'text-ink hover:bg-canvas-subtle hover:text-ink',
        outline: 'border border-hairline-strong bg-transparent text-ink hover:bg-canvas-subtle',
        destructive: 'bg-signal-risk text-white hover:bg-signal-risk/90 shadow-card-sm',
        link: 'text-amber-deep underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-10 px-6 text-sm',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
