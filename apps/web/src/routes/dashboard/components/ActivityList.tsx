import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  ClipboardCheck,
  FileCheck,
  Shield,
  AlertCircle,
  Clock,
  CheckCircle2,
  LucideIcon
} from 'lucide-react'

type ActivityType = 
  | 'assessment_completed'
  | 'evidence_uploaded'
  | 'control_approved'
  | 'compliance_alert'
  | 'task_assigned'

interface Activity {
  id: number
  type: ActivityType
  title: string
  description?: string
  time: string
}

interface ActivityListProps {
  activities: Activity[]
  className?: string
}

const activityIcons: Record<ActivityType, LucideIcon> = {
  assessment_completed: ClipboardCheck,
  evidence_uploaded: FileCheck,
  control_approved: Shield,
  compliance_alert: AlertCircle,
  task_assigned: Clock,
}

const activityColors: Record<ActivityType, string> = {
  assessment_completed: 'bg-blue-500/10 text-blue-600',
  evidence_uploaded: 'bg-green-500/10 text-green-600',
  control_approved: 'bg-purple-500/10 text-purple-600',
  compliance_alert: 'bg-red-500/10 text-red-600',
  task_assigned: 'bg-amber-500/10 text-amber-600',
}

const activityLabels: Record<ActivityType, string> = {
  assessment_completed: 'Assessment',
  evidence_uploaded: 'Evidence',
  control_approved: 'Control',
  compliance_alert: 'Alert',
  task_assigned: 'Task',
}

export function ActivityList({ activities, className }: ActivityListProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className="text-base font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle2 className="mx-auto h-8 w-8 mb-2 opacity-50" />
              <p className="text-sm">No recent activity</p>
            </div>
          ) : (
            activities.map((activity) => {
              const Icon = activityIcons[activity.type]
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div
                    className={cn(
                      'p-2 rounded-full shrink-0',
                      activityColors[activity.type]
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium truncate">
                        {activity.title}
                      </p>
                      <Badge variant="secondary" className="text-xs shrink-0">
                        {activityLabels[activity.type]}
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
        </div>
      </CardContent>
    </Card>
  )
}

export default ActivityList
