import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Evidence } from '@/types'
import { FileText, Eye, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react'

interface EvidenceCardProps {
  evidence: Evidence
  onView: (id: number) => void
  onViewControl?: (controlId: number) => void
}

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: typeof CheckCircle }> = {
  approved: { label: 'Approved', variant: 'default', icon: CheckCircle },
  pending: { label: 'Pending', variant: 'secondary', icon: Clock },
  rejected: { label: 'Rejected', variant: 'destructive', icon: XCircle },
  needs_review: { label: 'Needs Review', variant: 'outline', icon: AlertCircle },
}

function formatFileSize(bytes: number | null): string {
  if (bytes === null) return '-'
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function EvidenceCard({ evidence, onView, onViewControl }: EvidenceCardProps) {
  const status = statusConfig[evidence.status] || statusConfig.pending
  const StatusIcon = status.icon

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <div className="min-w-0">
              <p className="font-medium truncate max-w-[180px]" title={evidence.fileName}>
                {evidence.fileName}
              </p>
              <p className="text-xs text-muted-foreground">{formatFileSize(evidence.fileSize)}</p>
            </div>
          </div>
          <Badge variant={status.variant} className="gap-1 shrink-0">
            <StatusIcon className="h-3 w-3" />
            {status.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        {evidence.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{evidence.description}</p>
        )}
        
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Control:</span>
            {evidence.control ? (
              <button
                onClick={() => onViewControl?.(evidence.controlId)}
                className="text-primary hover:underline"
              >
                {evidence.control.code}
              </button>
            ) : (
              <span className="text-muted-foreground">-</span>
            )}
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Uploaded:</span>
            <span>{formatDate(evidence.createdAt)}</span>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => onView(evidence.id)}
        >
          <Eye className="h-4 w-4 mr-2" />
          View Evidence
        </Button>
      </CardContent>
    </Card>
  )
}
