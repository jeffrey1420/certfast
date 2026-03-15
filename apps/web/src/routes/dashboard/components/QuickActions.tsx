import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Plus, 
  FileText, 
  Upload, 
  Share2,
  Settings,
  type LucideIcon
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface QuickAction {
  label: string
  icon: LucideIcon
  href: string
  variant?: 'default' | 'outline' | 'secondary'
}

const quickActions: QuickAction[] = [
  { label: 'New Assessment', icon: Plus, href: '/assessments/new', variant: 'default' },
  { label: 'Upload Evidence', icon: Upload, href: '/evidence/upload', variant: 'outline' },
  { label: 'View Reports', icon: FileText, href: '/reports', variant: 'outline' },
  { label: 'Share Progress', icon: Share2, href: '/share', variant: 'outline' },
  { label: 'Settings', icon: Settings, href: '/settings', variant: 'secondary' },
]

export function QuickActions() {
  const navigate = useNavigate()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-2 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.label}
                variant={action.variant}
                className="justify-start gap-2 h-auto py-3"
                onClick={() => navigate(action.href)}
              >
                <Icon className="w-4 h-4 shrink-0" />
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
