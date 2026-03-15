import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, FileText, AlertCircle, Upload, Clock } from 'lucide-react'

interface Activity {
  id: number
  type: 'assessment_completed' | 'evidence_uploaded' | 'control_reviewed' | 'alert' | 'deadline'
  title: string
  description?: string
  time: string
}

interface ActivityListProps {
  activities: Activity[]
}

const activityIcons = {
  assessment_completed: CheckCircle,
  evidence_uploaded: Upload,
  control_reviewed: FileText,
  alert: AlertCircle,
  deadline: Clock
}

const activityColors = {
  assessment_completed: 'bg-green-100 text-green-700',
  evidence_uploaded: 'bg-blue-100 text-blue-700',
  control_reviewed: 'bg-purple-100 text-purple-700',
  alert: 'bg-red-100 text-red-700',
  deadline: 'bg-yellow-100 text-yellow-700'
}

export function ActivityList({ activities }: ActivityListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No recent activity
            </p>
          ) : (
            activities.map((activity) => {
              const Icon = activityIcons[activity.type]
              return (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${activityColors[activity.type]}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{activity.title}</p>
                    {activity.description && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {activity.description}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
