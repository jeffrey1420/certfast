import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  Edit2,
  MoreHorizontal,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  PauseCircle
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export interface Assessment {
  id: string
  name: string
  framework: string
  status: 'in_progress' | 'completed' | 'pending' | 'overdue'
  progress: number
  controlsCount: number
  completedControls: number
  dueDate: string
  owner: string
  createdAt: string
}

interface AssessmentTableProps {
  assessments: Assessment[]
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  onView: (id: string) => void
  onEdit: (id: string) => void
}

const statusConfig = {
  in_progress: {
    label: 'In Progress',
    variant: 'default' as const,
    icon: Clock,
    color: 'text-blue-600 bg-blue-50',
  },
  completed: {
    label: 'Completed',
    variant: 'success' as const,
    icon: CheckCircle2,
    color: 'text-green-600 bg-green-50',
  },
  pending: {
    label: 'Pending',
    variant: 'secondary' as const,
    icon: PauseCircle,
    color: 'text-gray-600 bg-gray-50',
  },
  overdue: {
    label: 'Overdue',
    variant: 'destructive' as const,
    icon: AlertCircle,
    color: 'text-red-600 bg-red-50',
  },
}

const frameworkColors: Record<string, string> = {
  'ISO 27001': 'bg-purple-100 text-purple-800',
  'SOC 2': 'bg-blue-100 text-blue-800',
  'GDPR': 'bg-green-100 text-green-800',
  'HIPAA': 'bg-red-100 text-red-800',
  'PCI DSS': 'bg-orange-100 text-orange-800',
  'NIST CSF': 'bg-cyan-100 text-cyan-800',
  'CCPA': 'bg-yellow-100 text-yellow-800',
  'FedRAMP': 'bg-indigo-100 text-indigo-800',
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function getDaysUntilDue(dateString: string): number {
  const due = new Date(dateString)
  const today = new Date()
  const diffTime = due.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function AssessmentTable({
  assessments,
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onView,
  onEdit,
}: AssessmentTableProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  if (assessments.length === 0) {
    return (
      <div className="bg-card border rounded-lg p-12 text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <AlertCircle className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">No assessments found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or create a new assessment.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-card border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">Assessment</TableHead>
              <TableHead>Framework</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assessments.map((assessment) => {
              const status = statusConfig[assessment.status]
              const StatusIcon = status.icon
              const daysUntilDue = getDaysUntilDue(assessment.dueDate)
              const isOverdue = daysUntilDue < 0
              const isDueSoon = daysUntilDue >= 0 && daysUntilDue <= 7

              return (
                <TableRow key={assessment.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="font-medium">{assessment.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {assessment.completedControls} of {assessment.controlsCount} controls
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary" 
                      className={frameworkColors[assessment.framework] || 'bg-gray-100'}
                    >
                      {assessment.framework}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}>
                      <StatusIcon className="h-3.5 w-3.5" />
                      {status.label}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-full max-w-[120px]">
                      <div className="flex justify-between text-xs mb-1">
                        <span>{assessment.progress}%</span>
                      </div>
                      <Progress value={assessment.progress} className="h-1.5" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className={isOverdue ? 'text-red-600 font-medium' : isDueSoon ? 'text-orange-600 font-medium' : ''}>
                        {formatDate(assessment.dueDate)}
                      </span>
                    </div>
                    {isOverdue && (
                      <span className="text-xs text-red-600">{Math.abs(daysUntilDue)} days overdue</span>
                    )}
                    {isDueSoon && !isOverdue && (
                      <span className="text-xs text-orange-600">Due in {daysUntilDue} days</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{assessment.owner}</span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onView(assessment.id)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(assessment.id)}>
                          <Edit2 className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-4 border-t">
          <div className="text-sm text-muted-foreground">
            Showing {startItem} to {endItem} of {totalItems} assessments
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
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
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
