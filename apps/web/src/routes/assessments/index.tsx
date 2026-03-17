import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AssessmentTable, type Assessment } from './components/AssessmentTable'
import { AssessmentFilters, type FilterState } from './components/AssessmentFilters'
import { CreateButton } from './components/CreateButton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAssessmentStore, type AssessmentBackend } from '@/stores/assessment'
import { useAuthStore } from '@/stores/auth'
import { Loader2 } from 'lucide-react'

const ITEMS_PER_PAGE = 5

// Map backend assessment type to frontend display format
const typeToFrameworkMap: Record<string, string> = {
  soc2_type1: 'SOC 2 Type I',
  soc2_type2: 'SOC 2 Type II',
  iso27001: 'ISO 27001',
  gdpr: 'GDPR',
  hipaa: 'HIPAA',
  custom: 'Custom',
}

// Map backend status to frontend status
const statusMap: Record<string, Assessment['status']> = {
  draft: 'pending',
  active: 'in_progress',
  in_review: 'in_progress',
  completed: 'completed',
  archived: 'completed',
}

function mapBackendToFrontend(backend: AssessmentBackend, ownerName: string): Assessment {
  // Calculate a rough progress based on status
  let progress = 0
  if (backend.status === 'active') progress = 50
  else if (backend.status === 'in_review') progress = 75
  else if (backend.status === 'completed') progress = 100

  // Check if overdue
  let status = statusMap[backend.status] || 'pending'
  if (backend.dueDate && new Date(backend.dueDate) < new Date() && status !== 'completed') {
    status = 'overdue'
  }

  return {
    id: backend.id.toString(),
    name: backend.title,
    framework: typeToFrameworkMap[backend.type] || backend.type,
    status,
    progress,
    dueDate: backend.dueDate || new Date().toISOString().split('T')[0],
    owner: ownerName,
  }
}

export function AssessmentsPage() {
  const navigate = useNavigate()
  const { assessments: backendAssessments, isLoading, error, fetchAssessments } = useAssessmentStore()
  const { user } = useAuthStore()
  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    framework: 'all',
    search: '',
  })
  const [currentPage, setCurrentPage] = useState(1)

  // Fetch assessments on mount
  useEffect(() => {
    void fetchAssessments()
  }, [fetchAssessments])

  // Get owner name from current user
  const ownerName = user ? `${user.firstName} ${user.lastName}` : 'Unknown'

  // Map backend assessments to frontend format
  const assessments = backendAssessments.map((assessment) => 
    mapBackendToFrontend(assessment, ownerName)
  )

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
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

      {/* Error Message */}
      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          <p>Error loading assessments: {error}</p>
          <button
            onClick={() => fetchAssessments()}
            className="mt-2 text-sm underline hover:no-underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Filters */}
      <AssessmentFilters filters={filters} onFiltersChange={handleFiltersChange} />

      {/* Assessment Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Assessments</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredAssessments.length === 0 && !isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {assessments.length === 0
                  ? 'No assessments yet. Create your first assessment to get started.'
                  : 'No assessments match your current filters.'}
              </p>
            </div>
          ) : (
            <AssessmentTable
              assessments={paginatedAssessments}
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredAssessments.length}
              onPageChange={handlePageChange}
              onView={handleViewAssessment}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default AssessmentsPage
