import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Plus,
  Upload,
  FileText,
  Settings,
  type LucideIcon,
} from 'lucide-react'

interface QuickAction {
  id: string
  label: string
  icon: LucideIcon
  onClick?: () => void
  variant?: 'default' | 'outline' | 'secondary'
}

interface QuickActionsProps {
  actions?: QuickAction[]
  onActionClick?: (actionId: string) => void
  className?: string
}

const defaultActions: QuickAction[] = [
  {
    id: 'new-assessment',
    label: 'New Assessment',
    icon: Plus,
    variant: 'default',
  },
  {
    id: 'upload-evidence',
    label: 'Upload Evidence',
    icon: Upload,
    variant: 'outline',
  },
  {
    id: 'view-reports',
    label: 'View Reports',
    icon: FileText,
    variant: 'outline',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    variant: 'outline',
  },
]

export function QuickActions({
  actions = defaultActions,
  onActionClick,
  className,
}: QuickActionsProps) {
  const handleClick = (action: QuickAction) => {
    if (action.onClick) {
      action.onClick()
    } else if (onActionClick) {
      onActionClick(action.id)
    }
  }

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.id}
                variant={action.variant}
                className="h-auto py-4 flex flex-col items-center gap-2 justify-center"
                onClick={() => handleClick(action)}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{action.label}</span>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export type { QuickAction }
