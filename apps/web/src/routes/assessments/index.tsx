import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AssessmentTable, type Assessment } from './components/AssessmentTable'
import { AssessmentFilters, type FilterState } from './components/AssessmentFilters'
import { CreateButton } from './components/CreateButton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Mock data for assessments
const mockAssessments: Assessment[] = [
  {
    id: '1',
    name: 'ISO 27001 Compliance Review',
    framework: 'ISO 27001',
    status: 'in_progress',
    progress: 75,
    dueDate: '2026-04-15',
    owner: 'John Smith',
  },
  {
    id: '2',
    name: 'SOC 2 Type I Audit',
    framework: 'SOC 2',
    status: 'pending',
    progress: 25,
    dueDate: '2026-05-01',
    owner: 'Sarah Chen',
  },
  {
    id: '3',
    name: 'GDPR Compliance Assessment',
    framework: 'GDPR',
    status: 'completed',
    progress: 100,
    dueDate: '2026-03-10',
    owner: 'Mike Johnson',
  },
  {
    id: '4',
    name: 'HIPAA Security Evaluation',
    framework: 'HIPAA',
    status: 'in_progress',
    progress: 60,
    dueDate: '2026-04-30',
    owner: 'Emily Davis',
  },
  {
    id: '5',
    name: 'PCI DSS v4.0 Assessment',
    framework: 'PCI DSS',
    status: 'overdue',
    progress: 40,
    dueDate: '2026-03-01',
    owner: 'David Wilson',
  },
  {
    id: '6',
    name: 'NIST CSF Gap Analysis',
    framework: 'NIST CSF',
    status: 'in_progress',
    progress: 50,
    dueDate: '2026-05-15',
    owner: 'Lisa Anderson',
  },
  {
    id: '7',
    name: 'CIS Controls Review',
    framework: 'CIS Controls',
    status: 'pending',
    progress: 10,
    dueDate: '2026-06-01',
    owner: 'Tom Brown',
  },
  {
    id: '8',
    name: 'CCPA Compliance Check',
    framework: 'CCPA',
    status: 'completed',
    progress: 100,
    dueDate: '2026-02-28',
    owner: 'Anna Lee',
  },
]

const ITEMS_PER_PAGE = 5

export function AssessmentsPage() {
  const navigate = useNavigate()
  const [assessments] = useState<Assessment[]>(mockAssessments)
  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    framework: 'all',
    search: '',
  })
  const [currentPage, setCurrentPage] = useState(1)

  // Filter assessments based on current filters
  const filteredAssessments = assessments.filter((assessment) => {
    const matchesStatus = filters.status === 'all' || assessment.status === filters.status
    const matchesFramework = filters.framework === 'all' || assessment.framework === filters.framework
    const matchesSearch =
      filters.search === '' ||
      assessment.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      assessment.owner.toLowerCase().includes(filters.search.toLowerCase())
    return matchesStatus && matchesFramework && matchesSearch
  })

  // Pagination
  const totalPages = Math.ceil(filteredAssessments.length / ITEMS_PER_PAGE)
  const paginatedAssessments = filteredAssessments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleCreateAssessment = () => {
    navigate('/assessments/new')
  }

  const handleViewAssessment = (id: string) => {
    navigate(`/assessments/${id}`)
  }

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    setCurrentPage(1) // Reset to first page when filters change
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Assessments</h1>
          <p className="text-muted-foreground mt-1">
            Manage your compliance assessments and track progress
          </p>
        </div>
        <CreateButton onClick={handleCreateAssessment} />
      </div>

      {/* Filters */}
      <AssessmentFilters filters={filters} onFiltersChange={handleFiltersChange} />

      {/* Assessment Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Assessments</CardTitle>
        </CardHeader>
        <CardContent>
          <AssessmentTable
            assessments={paginatedAssessments}
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredAssessments.length}
            onPageChange={handlePageChange}
            onView={handleViewAssessment}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default AssessmentsPage
