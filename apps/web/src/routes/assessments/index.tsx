import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  FileCheck,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Types
interface Assessment {
  id: string
  name: string
  framework: string
  status: 'draft' | 'in_progress' | 'completed' | 'archived'
  progress: number
  controlsCount: number
  completedControls: number
  lastUpdated: string
  dueDate: string
  assignedTo: string
}

// Mock data
const mockAssessments: Assessment[] = [
  {
    id: '1',
    name: 'ISO 27001:2022 Assessment',
    framework: 'ISO 27001',
    status: 'in_progress',
    progress: 65,
    controlsCount: 114,
    completedControls: 74,
    lastUpdated: '2026-03-15',
    dueDate: '2026-04-30',
    assignedTo: 'Security Team',
  },
  {
    id: '2',
    name: 'SOC 2 Type I Audit',
    framework: 'SOC 2',
    status: 'in_progress',
    progress: 40,
    controlsCount: 85,
    completedControls: 34,
    lastUpdated: '2026-03-14',
    dueDate: '2026-05-15',
    assignedTo: 'Compliance Team',
  },
  {
    id: '3',
    name: 'GDPR Compliance Review',
    framework: 'GDPR',
    status: 'completed',
    progress: 100,
    controlsCount: 32,
    completedControls: 32,
    lastUpdated: '2026-03-10',
    dueDate: '2026-03-10',
    assignedTo: 'Privacy Team',
  },
  {
    id: '4',
    name: 'HIPAA Security Assessment',
    framework: 'HIPAA',
    status: 'draft',
    progress: 10,
    controlsCount: 48,
    completedControls: 5,
    lastUpdated: '2026-03-12',
    dueDate: '2026-06-01',
    assignedTo: 'Healthcare Team',
  },
  {
    id: '5',
    name: 'PCI DSS v4.0 Assessment',
    framework: 'PCI DSS',
    status: 'in_progress',
    progress: 55,
    controlsCount: 78,
    completedControls: 43,
    lastUpdated: '2026-03-13',
    dueDate: '2026-05-01',
    assignedTo: 'Security Team',
  },
  {
    id: '6',
    name: 'NIST CSF Evaluation',
    framework: 'NIST CSF',
    status: 'archived',
    progress: 100,
    controlsCount: 108,
    completedControls: 108,
    lastUpdated: '2026-02-28',
    dueDate: '2026-02-28',
    assignedTo: 'Risk Team',
  },
  {
    id: '7',
    name: 'CCPA Compliance Check',
    framework: 'CCPA',
    status: 'draft',
    progress: 0,
    controlsCount: 24,
    completedControls: 0,
    lastUpdated: '2026-03-16',
    dueDate: '2026-06-15',
    assignedTo: 'Legal Team',
  },
  {
    id: '8',
    name: 'ISO 9001:2015 Audit',
    framework: 'ISO 9001',
    status: 'in_progress',
    progress: 75,
    controlsCount: 45,
    completedControls: 34,
    lastUpdated: '2026-03-15',
    dueDate: '2026-04-20',
    assignedTo: 'Quality Team',
  },
]

const frameworks = ['All', 'ISO 27001', 'SOC 2', 'GDPR', 'HIPAA', 'PCI DSS', 'NIST CSF', 'CCPA', 'ISO 9001']
const statuses = ['All', 'Draft', 'In Progress', 'Completed', 'Archived']

const getStatusIcon = (status: Assessment['status']) => {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="h-4 w-4 text-green-600" />
    case 'in_progress':
      return <Clock className="h-4 w-4 text-blue-600" />
    case 'draft':
      return <FileCheck className="h-4 w-4 text-gray-600" />
    case 'archived':
      return <XCircle className="h-4 w-4 text-muted-foreground" />
  }
}

const getStatusBadge = (status: Assessment['status']) => {
  switch (status) {
    case 'completed':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
    case 'in_progress':
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">In Progress</Badge>
    case 'draft':
      return <Badge variant="secondary">Draft</Badge>
    case 'archived':
      return <Badge variant="outline">Archived</Badge>
  }
}

const getProgressColor = (progress: number) => {
  if (progress >= 80) return 'bg-green-500'
  if (progress >= 50) return 'bg-blue-500'
  if (progress >= 25) return 'bg-yellow-500'
  return 'bg-gray-400'
}

export function AssessmentsPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFramework, setSelectedFramework] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter assessments
  const filteredAssessments = useMemo(() => {
    return mockAssessments.filter((assessment) => {
      const matchesSearch = assessment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assessment.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFramework = selectedFramework === 'All' || assessment.framework === selectedFramework
      const matchesStatus = selectedStatus === 'All' || 
        assessment.status === selectedStatus.toLowerCase().replace(' ', '_')
      
      return matchesSearch && matchesFramework && matchesStatus
    })
  }, [searchQuery, selectedFramework, selectedStatus])

  // Pagination
  const totalPages = Math.ceil(filteredAssessments.length / itemsPerPage)
  const paginatedAssessments = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredAssessments.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredAssessments, currentPage])

  const handleCreateAssessment = () => {
    navigate('/assessments/new')
  }

  const handleViewAssessment = (id: string) => {
    navigate(`/assessments/${id}`)
  }

  const handleEditAssessment = (id: string) => {
    navigate(`/assessments/${id}/edit`)
  }

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Assessments</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track your compliance assessments
          </p>
        </div>
        <Button onClick={handleCreateAssessment} className="w-fit">
          <Plus className="h-4 w-4 mr-2" />
          New Assessment
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assessments..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-10"
              />
            </div>
            
            {/* Framework Filter */}
            <Select
              value={selectedFramework}
              onValueChange={(value) => {
                setSelectedFramework(value)
                setCurrentPage(1)
              }}
            >
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Framework" />
              </SelectTrigger>
              <SelectContent>
                {frameworks.map((framework) => (
                  <SelectItem key={framework} value={framework}>
                    {framework}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select
              value={selectedStatus}
              onValueChange={(value) => {
                setSelectedStatus(value)
                setCurrentPage(1)
              }}
            >
              <SelectTrigger className="w-[160px]">
                <AlertCircle className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing {paginatedAssessments.length} of {filteredAssessments.length} assessments
        </span>
        {(searchQuery || selectedFramework !== 'All' || selectedStatus !== 'All') && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchQuery('')
              setSelectedFramework('All')
              setSelectedStatus('All')
              setCurrentPage(1)
            }}
          >
            Clear filters
          </Button>
        )}
      </div>

      {/* Assessments Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assessment</TableHead>
                <TableHead>Framework</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedAssessments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No assessments found matching your criteria
                  </TableCell>
                </TableRow>
              ) : (
                paginatedAssessments.map((assessment) => (
                  <TableRow
                    key={assessment.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleViewAssessment(assessment.id)}
                  >
                    <TableCell>
                      <div className="font-medium">{assessment.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {assessment.completedControls} of {assessment.controlsCount} controls
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{assessment.framework}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(assessment.status)}
                        {getStatusBadge(assessment.status)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="w-full max-w-[120px]">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span>{assessment.progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${getProgressColor(assessment.progress)}`}
                            style={{ width: `${assessment.progress}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(assessment.dueDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {assessment.assignedTo}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation()
                            handleViewAssessment(assessment.id)
                          }}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation()
                            handleEditAssessment(assessment.id)
                          }}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Archive
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
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

export default AssessmentsPage
