import { Card, CardContent } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    label: string
  }
  color?: 'blue' | 'green' | 'amber' | 'purple'
}

const colorVariants = {
  blue: 'bg-blue-500/10 text-blue-600',
  green: 'bg-green-500/10 text-green-600',
  amber: 'bg-amber-500/10 text-amber-600',
  purple: 'bg-purple-500/10 text-purple-600',
}

export function MetricCard({ title, value, icon: Icon, trend, color = 'blue' }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {trend && (
              <p className="text-xs text-muted-foreground">
                <span className={trend.value >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {trend.value >= 0 ? '+' : ''}{trend.value}%
                </span>{' '}
                {trend.label}
              </p>
            )}
          </div>
          <div className={`p-3 rounded-lg ${colorVariants[color]}`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default MetricCard
