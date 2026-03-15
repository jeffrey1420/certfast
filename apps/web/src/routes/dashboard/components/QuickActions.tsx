import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, FileText, Upload, Users, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface QuickAction {
  label: string
  icon: React.ElementType
  onClick: () => void
  variant?: 'default' | 'outline' | 'secondary'
}

export function QuickActions() {
  const navigate = useNavigate()
  
  const actions: QuickAction[] = [
    {
      label: 'New Assessment',
      icon: Plus,
      onClick: () => navigate('/assessments/new'),
      variant: 'default'
    },
    {
      label: 'Upload Evidence',
      icon: Upload,
      onClick: () => navigate('/evidence/upload'),
      variant: 'outline'
    },
    {
      label: 'View Reports',
      icon: FileText,
      onClick: () => navigate('/reports'),
      variant: 'outline'
    },
    {
      label: 'Manage Team',
      icon: Users,
      onClick: () => navigate('/settings/team'),
      variant: 'outline'
    },
    {
      label: 'Settings',
      icon: Settings,
      onClick: () => navigate('/settings'),
      variant: 'outline'
    }
  ]
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.label}
                variant={action.variant}
                className="justify-start gap-2"
                onClick={action.onClick}
              >
                <Icon className="h-4 w-4" />
                {action.label}
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
