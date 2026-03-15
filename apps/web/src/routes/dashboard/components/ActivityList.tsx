import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ClipboardCheck, 
  FileCheck, 
  FileUp, 
  AlertCircle,
  CheckCircle2,
  Clock,
  type LucideIcon
}

type ActivityType = 
  | 'assessment_completed' 
  | 'evidence_uploaded' 
  | 'control_verified' 
  | 'deadline_approaching' 
  | 'issue_detected'

interface Activity {
  id: number
  type: ActivityType
  title: string
  description?: string
  time: string
}

interface ActivityListProps {
  activities: Activity[]
}

const activityConfig: Record<ActivityType, { icon: LucideIcon; color: string; badge: string }> = {
  assessment_completed: {
    icon: ClipboardCheck,
    color: 'text-green-600 bg-green-100',
    badge: 'Completed',
  },
  evidence_uploaded: {
    icon: FileUp,
    color: 'text-blue-600 bg-blue-100',
    badge: 'Uploaded',
  },
  control_verified: {
    icon: FileCheck,
    color: 'text-purple-600 bg-purple-100',
    badge: 'Verified',
  },
  deadline_approaching: {
    icon: Clock,
    color: 'text-amber-600 bg-amber-100',
    badge: 'Due Soon',
  },
  issue_detected: {
    icon: AlertCircle,
    color: 'text-red-600 bg-red-100',
    badge: 'Issue',
  },
}

export function ActivityList({ activities }: ActivityListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-4">
          {activities.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle2 className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No recent activity</p>
            </div>
          ) : (
            activities.map((activity) => {
              const config = activityConfig[activity.type]
              const Icon = config.icon
              
              return (
                <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                  <div className={`p-2 rounded-lg shrink-0 ${config.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-sm">{activity.title}</p>
                      <Badge variant="secondary" className="text-xs">
                        {config.badge}
                      </Badge>
                    </div>
                    {activity.description && (
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {activity.description}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
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
