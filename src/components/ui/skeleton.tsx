import { cn } from '@/utils/cn'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** When true, renders a shimmer animation across the block. */
  shimmer?: boolean
}

export function Skeleton({ className, shimmer = false, ...props }: SkeletonProps) {
  if (shimmer) {
    return (
      <div
        className={cn(
          'overflow-hidden rounded-md',
          'bg-gradient-to-r from-canvas-subtle via-hairline-strong to-canvas-subtle bg-[length:200%_100%] animate-shimmer',
          className,
        )}
        {...props}
      />
    )
  }
  return <div className={cn('rounded-md bg-canvas-subtle animate-pulse', className)} {...props} />
}
