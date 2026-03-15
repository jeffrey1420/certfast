interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  showPercentage?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function ProgressBar({ 
  value, 
  max = 100, 
  label, 
  showPercentage = true,
  size = 'md' 
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  
  const heightClasses = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6'
  }
  
  const getColorClass = (pct: number) => {
    if (pct >= 80) return 'bg-green-500'
    if (pct >= 60) return 'bg-yellow-500'
    if (pct >= 40) return 'bg-orange-500'
    return 'bg-red-500'
  }
  
  return (
    <div className="w-full space-y-2">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center">
          {label && <span className="text-sm font-medium">{label}</span>}
          {showPercentage && (
            <span className="text-sm text-muted-foreground">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-secondary rounded-full ${heightClasses[size]} overflow-hidden`}>
        <div 
          className={`${heightClasses[size]} ${getColorClass(percentage)} transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
