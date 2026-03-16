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
import { Progress } from '@/components/ui/progress'
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react'

export interface Assessment {
  id: string
  name: string
  framework: string
  status: 'pending' | 'in_progress' | 'completed' | 'overdue'
  progress: number
  dueDate: string
  owner: string
}

interface AssessmentTableProps {
  assessments: Assessment[]
  currentPage: number
  totalPages: number
  totalItems: number
  onPageChange: (page: number) => void
  onView: (id: string) => void
}

const statusConfig = {
  pending: { label: 'Pending', variant: 'secondary' as const },
  in_progress: { label: 'In Progress', variant: 'default' as const },
  completed: { label: 'Completed', variant: 'outline' as const },
  overdue: { label: 'Overdue', variant: 'destructive' as const },
}

export function AssessmentTable({
  assessments,
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
  onView,
}: AssessmentTableProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
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
              <TableHead>Name</TableHead>
              <TableHead>Framework</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assessments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  No assessments found
                </TableCell>
              </TableRow>
            ) : (
              assessments.map((assessment) => (
                <TableRow key={assessment.id}>
                  <TableCell className="font-medium">{assessment.name}</TableCell>
                  <TableCell>{assessment.framework}</TableCell>
                  <TableCell>
                    <Badge variant={statusConfig[assessment.status].variant}>
                      {statusConfig[assessment.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 w-[120px]">
                      <Progress value={assessment.progress} className="h-2 flex-1" />
                      <span className="text-xs text-muted-foreground w-8">
                        {assessment.progress}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(assessment.dueDate)}</TableCell>
                  <TableCell>{assessment.owner}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onView(assessment.id)}
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
            Showing {(currentPage - 1) * 5 + 1} to{' '}
            {Math.min(currentPage * 5, totalItems)} of {totalItems} assessments
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
