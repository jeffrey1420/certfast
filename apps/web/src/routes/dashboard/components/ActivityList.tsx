import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  CheckCircle2,
  FileCheck,
  Shield,
  Upload,
  AlertCircle,
  Clock,
  type LucideIcon,
} from 'lucide-react'

interface Activity {
  id: number
  type: 'assessment_completed' | 'evidence_uploaded' | 'control_approved' | 'deadline_approaching' | 'audit_scheduled'
  title: string
  description?: string
  time: string
}

interface ActivityListProps {
  activities: Activity[]
  className?: string
}

const activityConfig: Record<
  Activity['type'],
  { icon: LucideIcon; color: string; label: string }
> = {
  assessment_completed: {
    icon: CheckCircle2,
    color: 'bg-green-100 text-green-700',
    label: 'Completed',
  },
  evidence_uploaded: {
    icon: Upload,
    color: 'bg-blue-100 text-blue-700',
    label: 'Uploaded',
  },
  control_approved: {
    icon: Shield,
    color: 'bg-purple-100 text-purple-700',
    label: 'Approved',
  },
  deadline_approaching: {
    icon: Clock,
    color: 'bg-yellow-100 text-yellow-700',
    label: 'Reminder',
  },
  audit_scheduled: {
    icon: AlertCircle,
    color: 'bg-orange-100 text-orange-700',
    label: 'Scheduled',
  },
}

export function ActivityList({ activities, className }: ActivityListProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <FileCheck className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No recent activity</p>
          </div>
        ) : (
          activities.map((activity) => {
            const config = activityConfig[activity.type]
            const Icon = config.icon

            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div
                  className={cn(
                    'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
                    config.color
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium truncate">
                      {activity.title}
                    </p>
                    <Badge variant="secondary" className="text-xs flex-shrink-0">
                      {config.label}
                    </Badge>
                  </div>
                  {activity.description && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {activity.description}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            )
          })
        )}
      </CardContent>
    </Card>
  )
}

export type { Activity }
