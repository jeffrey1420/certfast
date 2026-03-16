import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  showPercentage?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = true,
  size = 'md',
  className,
}: ProgressBarProps) {
  const percentage = Math.round((value / max) * 100)

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6',
  }

  return (
    <div className={cn('space-y-2', className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center">
          {label && (
            <span className="text-sm font-medium text-muted-foreground">
              {label}
            </span>
          )}
          {showPercentage && (
            <span className="text-sm font-bold">{percentage}%</span>
          )}
        </div>
      )}
      <Progress
        value={percentage}
        className={cn(sizeClasses[size])}
      />
    </div>
  )
}
