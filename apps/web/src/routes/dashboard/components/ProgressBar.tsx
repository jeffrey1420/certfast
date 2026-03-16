import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  title: string
  value: number
  max?: number
  description?: string
  className?: string
}

export function ProgressBar({
  title,
  value,
  max = 100,
  description,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold">{value}%</span>
          <span className="text-sm text-muted-foreground">Target: {max}%</span>
        </div>
        <Progress value={value} max={max} className="h-3" />
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}

export default ProgressBar
