import { useEffect } from 'react'
import { FileText, Calendar, CheckCircle2, XCircle, Clock, AlertCircle, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useEvidenceStore } from '@/stores'
import type { Evidence } from '@/types'

const statusConfig = {
  pending: { 
    label: 'Pending', 
    variant: 'secondary' as const, 
    icon: Clock,
    className: 'text-gray-600'
  },
  approved: { 
    label: 'Approved', 
    variant: 'default' as const, 
    icon: CheckCircle2,
    className: 'text-green-600'
  },
  rejected: { 
    label: 'Rejected', 
    variant: 'destructive' as const, 
    icon: XCircle,
    className: 'text-red-600'
  },
  needs_review: { 
    label: 'Needs Review', 
    variant: 'outline' as const, 
    icon: AlertCircle,
    className: 'text-yellow-600'
  },
}

interface EvidenceSectionProps {
  controlId: number
}

export function EvidenceSection({ controlId }: EvidenceSectionProps) {
  const { evidence, isLoading, error, fetchEvidenceByControl } = useEvidenceStore()

  useEffect(() => {
    void fetchEvidenceByControl(controlId)
  }, [controlId, fetchEvidenceByControl])

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Evidence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Evidence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg text-sm">
            <p>Error loading evidence: {error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Evidence ({evidence.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {evidence.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-sm text-muted-foreground">
              No evidence has been uploaded for this control yet.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {evidence.map((item) => (
              <EvidenceCard key={item.id} evidence={item} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface EvidenceCardProps {
  evidence: Evidence
}

function EvidenceCard({ evidence }: EvidenceCardProps) {
  const config = statusConfig[evidence.status]
  const StatusIcon = config.icon

  const formatFileSize = (bytes: number | null): string => {
    if (!bytes) return 'Unknown size'
    const kb = bytes / 1024
    if (kb < 1024) return `${kb.toFixed(1)} KB`
    return `${(kb / 1024).toFixed(1)} MB`
  }

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
      <div className="flex items-start gap-3">
        {/* File Icon */}
        <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
          <FileText className="w-5 h-5 text-primary" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <h4 className="font-medium truncate">{evidence.fileName}</h4>
              <p className="text-xs text-muted-foreground">
                {evidence.fileType} • {formatFileSize(evidence.fileSize)}
              </p>
            </div>
            <Badge variant={config.variant} className="flex items-center gap-1 flex-shrink-0">
              <StatusIcon className={`h-3 w-3 ${config.className}`} />
              {config.label}
            </Badge>
          </div>

          {evidence.description && (
            <p className="text-sm text-muted-foreground mb-2">
              {evidence.description}
            </p>
          )}

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Uploaded {formatDate(evidence.createdAt)}</span>
            </div>
            {evidence.reviewedAt && (
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                <span>Reviewed {formatDate(evidence.reviewedAt)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
