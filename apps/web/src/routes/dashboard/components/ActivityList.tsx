import { CheckCircle, FileUp, Shield, PlayCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Activity {
  id: number;
  type: string;
  title: string;
  time: string;
}

interface ActivityListProps {
  activities: Activity[];
}

const activityIcons: Record<string, React.ReactNode> = {
  assessment_completed: <CheckCircle className="h-4 w-4 text-green-500" />,
  evidence_uploaded: <FileUp className="h-4 w-4 text-blue-500" />,
  control_passed: <Shield className="h-4 w-4 text-green-500" />,
  assessment_started: <PlayCircle className="h-4 w-4 text-yellow-500" />,
};

const activityLabels: Record<string, string> = {
  assessment_completed: 'Completed',
  evidence_uploaded: 'Uploaded',
  control_passed: 'Passed',
  assessment_started: 'Started',
};

export function ActivityList({ activities }: ActivityListProps) {
  return (
    <div className="space-y-4">
      {activities.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          No recent activity
        </p>
      ) : (
        activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="mt-0.5">
              {activityIcons[activity.type] || <Clock className="h-4 w-4 text-gray-500" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {activity.title}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-muted-foreground">
                  {activityLabels[activity.type] || 'Updated'}
                </span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
