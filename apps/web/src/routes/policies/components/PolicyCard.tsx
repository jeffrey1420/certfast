import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText, Eye, Calendar } from 'lucide-react'
import type { Policy } from '@/types'

interface PolicyCardProps {
  policy: Policy
  onView: (id: string) => void
}

const statusConfig = {
  draft: { label: 'Draft', variant: 'secondary' as const },
  published: { label: 'Published', variant: 'default' as const },
  archived: { label: 'Archived', variant: 'outline' as const },
  deprecated: { label: 'Deprecated', variant: 'destructive' as const },
}

const categoryColors: Record<string, string> = {
  'Security': 'bg-blue-100 text-blue-800 border-blue-200',
  'Privacy': 'bg-purple-100 text-purple-800 border-purple-200',
  'Governance': 'bg-green-100 text-green-800 border-green-200',
  'Risk': 'bg-orange-100 text-orange-800 border-orange-200',
  'Compliance': 'bg-pink-100 text-pink-800 border-pink-200',
  'HR': 'bg-red-100 text-red-800 border-red-200',
  'IT': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Operations': 'bg-indigo-100 text-indigo-800 border-indigo-200',
}

export function PolicyCard({ policy, onView }: PolicyCardProps) {
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Not set'
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-sm font-mono text-muted-foreground">
                {policy.code}
              </CardTitle>
              <h3 className="font-semibold leading-tight">{policy.title}</h3>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onView(policy.id)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {policy.description}
        </p>
        
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${categoryColors[policy.category] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
            {policy.category}
          </span>
          <Badge variant={statusConfig[policy.status].variant}>
            {statusConfig[policy.status].label}
          </Badge>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t">
          <div className="flex items-center gap-1">
            <span>Version {policy.version}</span>
          </div>
          {policy.effectiveDate && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Effective {formatDate(policy.effectiveDate)}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
