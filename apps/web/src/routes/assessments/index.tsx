import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AssessmentTable, type Assessment } from './components/AssessmentTable'
import { AssessmentFilters } from './components/AssessmentFilters'
import { AssessmentSearch } from './components/AssessmentSearch'
import { Button } from '@/components/ui/button'
import { Plus, FileCheck } from 'lucide-react'

// Mock data - will be replaced with API call
const mockAssessments: Assessment[] = [
  {
    id: '1',
    name: 'ISO 27001 2022 Assessment',
    framework: 'ISO 27001',
    status: 'in_progress',
    progress: 75,
    controlsCount: 114,
    completedControls: 85,
    dueDate: '2026-04-15',
    owner: 'Security Team',
    createdAt: '2026-01-15',
  },
  {
    id: '2',
    name: 'SOC 2 Type I Audit',
    framework: 'SOC 2',
    status: 'completed',
    progress: 100,
    controlsCount: 64,
    completedControls: 64,
    dueDate: '2026-02-28',
    owner: 'Compliance Lead',
    createdAt: '2025-11-01',
  },
  {
    id: '3',
    name: 'GDPR Compliance Review',
    framework: 'GDPR',
    status: 'in_progress',
    progress: 45,
    controlsCount: 32,
    completedControls: 14,
    dueDate: '2026-05-30',
    owner: 'Privacy Team',
    createdAt: '2026-02-01',
  },
  {
    id: '4',
    name: 'HIPAA Security Assessment',
    framework: 'HIPAA',
    status: 'pending',
    progress: 0,
    controlsCount: 48,
    completedControls: 0,
    dueDate: '2026-06-15',
    owner: 'Healthcare Team',
    createdAt: '2026-03-10',
  },
  {
    id: '5',
    name: 'PCI DSS v4.0 Assessment',
    framework: 'PCI DSS',
    status: 'in_progress',
    progress: 60,
    controlsCount: 78,
    completedControls: 47,
    dueDate: '2026-04-30',
    owner: 'Payment Team',
    createdAt: '2026-01-20',
  },
  {
    id: '6',
    name: 'NIST CSF Evaluation',
    framework: 'NIST CSF',
    status: 'overdue',
    progress: 30,
    controlsCount: 108,
    completedControls: 32,
    dueDate: '2026-02-15',
    owner: 'Risk Team',
    createdAt: '2025-10-15',
  },
  {
    id: '7',
    name: 'CCPA Compliance Check',
    framework: 'CCPA',
    status: 'completed',
    progress: 100,
    controlsCount: 24,
    completedControls: 24,
    dueDate: '2026-01-31',
    owner: 'Legal Team',
    createdAt: '2025-12-01',
  },
  {
    id: '8',
    name: 'FedRAMP Baseline',
    framework: 'FedRAMP',
    status: 'in_progress',
    progress: 55,
    controlsCount: 325,
    completedControls: 179,
    dueDate: '2026-07-15',
    owner: 'GovCloud Team',
    createdAt: '2025-09-01',
  },
]

const frameworks = ['All', 'ISO 27001', 'SOC 2', 'GDPR', 'HIPAA', 'PCI DSS', 'NIST CSF', 'CCPA', 'FedRAMP']
const statuses = ['All', 'in_progress', 'completed', 'pending', 'overdue']

export function AssessmentsPage() {
  const navigate = useNavigate()
  const [assessments] = useState<Assessment[]>(mockAssessments)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFramework, setSelectedFramework] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter assessments
  const filteredAssessments = assessments.filter((assessment) => {
    const matchesSearch = assessment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assessment.owner.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFramework = selectedFramework === 'All' || assessment.framework === selectedFramework
    const matchesStatus = selectedStatus === 'All' || assessment.status === selectedStatus
    return matchesSearch && matchesFramework && matchesStatus
  })

  // Pagination
  const totalPages = Math.ceil(filteredAssessments.length / itemsPerPage)
  const paginatedAssessments = filteredAssessments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleCreateAssessment = () => {
    navigate('/assessments/new')
  }

  const handleViewAssessment = (id: string) => {
    navigate(`/assessments/${id}`)
  }

  const handleEditAssessment = (id: string) => {
    navigate(`/assessments/${id}/edit`)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedFramework('All')
    setSelectedStatus('All')
    setCurrentPage(1)
  }

  const hasActiveFilters = searchQuery || selectedFramework !== 'All' || selectedStatus !== 'All'

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <FileCheck className="h-6 w-6" />
            Assessments
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and track your compliance assessments
          </p>
        </div>
        <Button onClick={handleCreateAssessment} className="sm:w-auto w-full">
          <Plus className="h-4 w-4 mr-2" />
          New Assessment
        </Button>
      </div>

      {/* Filters Section */}
      <div className="bg-card border rounded-lg p-4 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <AssessmentSearch 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search assessments..."
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 lg:w-auto">
            <AssessmentFilters
              frameworks={frameworks}
              statuses={statuses}
              selectedFramework={selectedFramework}
              selectedStatus={selectedStatus}
              onFrameworkChange={setSelectedFramework}
              onStatusChange={setSelectedStatus}
            />
          </div>
        </div>
        
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 border-t">
            <p className="text-sm text-muted-foreground">
              Showing {filteredAssessments.length} result{filteredAssessments.length !== 1 ? 's' : ''}
            </p>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear filters
            </Button>
          </div>
        )}
      </div>

      {/* Assessment Table */}
      <AssessmentTable
        assessments={paginatedAssessments}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredAssessments.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onView={handleViewAssessment}
        onEdit={handleEditAssessment}
      />
    </div>
  )
}

export default AssessmentsPage
