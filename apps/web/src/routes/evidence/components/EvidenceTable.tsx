import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Evidence } from '@/types'
import { FileText, Eye, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react'

interface EvidenceTableProps {
  evidence: Evidence[]
  currentPage: number
  totalPages: number
  totalItems: number
  onPageChange: (page: number) => void
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

export function EvidenceTable({
  evidence,
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
  onView,
  onViewControl,
}: EvidenceTableProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left font-medium">File</th>
              <th className="px-4 py-3 text-left font-medium">Control</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Size</th>
              <th className="px-4 py-3 text-left font-medium">Uploaded</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {evidence.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                  No evidence found
                </td>
              </tr>
            ) : (
              evidence.map((item) => {
                const status = statusConfig[item.status] || statusConfig.pending
                const StatusIcon = status.icon
                return (
                  <tr key={item.id} className="hover:bg-muted/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium truncate max-w-[200px]">{item.fileName}</p>
                          {item.description && (
                            <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {item.control ? (
                        <button
                          onClick={() => onViewControl?.(item.controlId)}
                          className="text-sm text-primary hover:underline"
                        >
                          {item.control.code}
                        </button>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={status.variant} className="gap-1">
                        <StatusIcon className="h-3 w-3" />
                        {status.label}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {formatFileSize(item.fileSize)}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(item.id)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * 10 + 1} to{' '}
            {Math.min(currentPage * 10, totalItems)} of {totalItems} items
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
