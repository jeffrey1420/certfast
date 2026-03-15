interface ProgressBarProps {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  color?: 'blue' | 'green' | 'amber' | 'red'
}

const sizeVariants = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
}

const colorVariants = {
  blue: 'bg-blue-600',
  green: 'bg-green-600',
  amber: 'bg-amber-500',
  red: 'bg-red-600',
}

export function ProgressBar({ 
  value, 
  max = 100, 
  size = 'md', 
  showLabel = true,
  color = 'blue' 
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  
  // Determine color based on percentage if not specified
  const computedColor = color || (percentage >= 80 ? 'green' : percentage >= 50 ? 'blue' : percentage >= 30 ? 'amber' : 'red')
  
  return (
    <div className="w-full space-y-2">
      {showLabel && (
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full bg-muted rounded-full ${sizeVariants[size]}`}>
        <div
          className={`${sizeVariants[size]} ${colorVariants[computedColor]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  )
}

export default ProgressBar
