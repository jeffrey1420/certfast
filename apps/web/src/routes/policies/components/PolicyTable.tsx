import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react'
import type { Policy } from '@/types'

interface PolicyTableProps {
  policies: Policy[]
  currentPage: number
  totalPages: number
  totalItems: number
  onPageChange: (page: number) => void
  onView: (id: string) => void
}

const statusConfig = {
  draft: { label: 'Draft', variant: 'secondary' as const },
  published: { label: 'Published', variant: 'default' as const },
  archived: { label: 'Archived', variant: 'outline' as const },
  deprecated: { label: 'Deprecated', variant: 'destructive' as const },
}

const categoryColors: Record<string, string> = {
  'Security': 'bg-blue-100 text-blue-800',
  'Privacy': 'bg-purple-100 text-purple-800',
  'Governance': 'bg-green-100 text-green-800',
  'Risk': 'bg-orange-100 text-orange-800',
  'Compliance': 'bg-pink-100 text-pink-800',
  'HR': 'bg-red-100 text-red-800',
  'IT': 'bg-yellow-100 text-yellow-800',
  'Operations': 'bg-indigo-100 text-indigo-800',
}

export function PolicyTable({
  policies,
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
  onView,
}: PolicyTableProps) {
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Not set'
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Version</TableHead>
              <TableHead>Effective Date</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {policies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  No policies found
                </TableCell>
              </TableRow>
            ) : (
              policies.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell className="font-mono font-medium">{policy.code}</TableCell>
                  <TableCell className="max-w-md">
                    <div className="font-medium">{policy.title}</div>
                    <div className="text-sm text-muted-foreground truncate">
                      {policy.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[policy.category] || 'bg-gray-100 text-gray-800'}`}>
                      {policy.category}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusConfig[policy.status].variant}>
                      {statusConfig[policy.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell>{policy.version}</TableCell>
                  <TableCell>{formatDate(policy.effectiveDate)}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onView(policy.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * 10 + 1} to{' '}
            {Math.min(currentPage * 10, totalItems)} of {totalItems} policies
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="sm"
                  className="w-8"
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
