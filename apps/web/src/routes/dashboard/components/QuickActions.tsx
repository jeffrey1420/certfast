import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'
import {
  Plus,
  ClipboardCheck,
  FileUp,
  Settings,
  LucideIcon
} from 'lucide-react'

interface QuickAction {
  id: string
  label: string
  icon: LucideIcon
  href: string
  variant?: 'default' | 'outline' | 'secondary'
}

const quickActions: QuickAction[] = [
  {
    id: 'new-assessment',
    label: 'New Assessment',
    icon: Plus,
    href: '/assessments/new',
    variant: 'default',
  },
  {
    id: 'view-assessments',
    label: 'View Assessments',
    icon: ClipboardCheck,
    href: '/assessments',
    variant: 'outline',
  },
  {
    id: 'upload-evidence',
    label: 'Upload Evidence',
    icon: FileUp,
    href: '/evidence/upload',
    variant: 'outline',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    href: '/settings',
    variant: 'outline',
  },
]

interface QuickActionsProps {
  className?: string
}

export function QuickActions({ className }: QuickActionsProps) {
  const navigate = useNavigate()

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className="text-base font-medium">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.id}
                variant={action.variant}
                className="justify-start gap-2 h-auto py-3"
                onClick={() => navigate(action.href)}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="text-sm">{action.label}</span>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default QuickActions
