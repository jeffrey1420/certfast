import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { EvidenceTable } from './components/EvidenceTable'
import { EvidenceFilters, type EvidenceFilterState } from './components/EvidenceFilters'
import { EvidenceCard } from './components/EvidenceCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEvidenceStore } from '@/stores'
import { Button } from '@/components/ui/button'
import { LayoutGrid, List, Loader2, Upload } from 'lucide-react'
import { UploadEvidenceDialog } from '@/components/evidence/UploadEvidenceDialog'

const ITEMS_PER_PAGE = 10

export function EvidencePage() {
  const navigate = useNavigate()
  const { evidence, isLoading, error, fetchEvidenceByControl } = useEvidenceStore()
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [filters, setFilters] = useState<EvidenceFilterState>({
    status: 'all',
    controlId: 'all',
    search: '',
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)

  useEffect(() => {
    // Fetch all evidence - we use controlId 0 to fetch all
    void fetchEvidenceByControl(0)
  }, [fetchEvidenceByControl])

  // Filter evidence based on current filters
  const filteredEvidence = evidence.filter((item) => {
    const matchesStatus = filters.status === 'all' || item.status === filters.status
    const matchesSearch =
      filters.search === '' ||
      item.fileName.toLowerCase().includes(filters.search.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(filters.search.toLowerCase()))
    return matchesStatus && matchesSearch
  })

  // Pagination
  const totalPages = Math.ceil(filteredEvidence.length / ITEMS_PER_PAGE)
  const paginatedEvidence = filteredEvidence.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleViewEvidence = (id: number) => {
    navigate(`/evidence/${id}`)
  }

  const handleViewControl = (controlId: number) => {
    navigate(`/controls/${controlId}`)
  }

  const handleFiltersChange = (newFilters: EvidenceFilterState) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (isLoading && evidence.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          <p>Error loading evidence: {error}</p>
          <Button onClick={() => fetchEvidenceByControl(0)} className="mt-2">
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Evidence</h1>
          <p className="text-muted-foreground mt-1">
            Manage compliance evidence and documentation
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setIsUploadDialogOpen(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Upload Evidence
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('table')}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <EvidenceFilters filters={filters} onFiltersChange={handleFiltersChange} />

      {/* Evidence Display */}
      {viewMode === 'table' ? (
        <Card>
          <CardHeader>
            <CardTitle>All Evidence ({filteredEvidence.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <EvidenceTable
              evidence={paginatedEvidence}
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredEvidence.length}
              onPageChange={handlePageChange}
              onView={handleViewEvidence}
              onViewControl={handleViewControl}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">All Evidence ({filteredEvidence.length})</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedEvidence.map((item) => (
              <EvidenceCard
                key={item.id}
                evidence={item}
                onView={handleViewEvidence}
                onViewControl={handleViewControl}
              />
            ))}
          </div>
          {/* Grid Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredEvidence.length)} of{' '}
                {filteredEvidence.length} items
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
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
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Upload Dialog */}
      <UploadEvidenceDialog
        open={isUploadDialogOpen}
        onOpenChange={setIsUploadDialogOpen}
      />
    </div>
  )
}

export default EvidencePage
