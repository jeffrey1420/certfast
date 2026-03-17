import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ControlTable, ControlFilters, type ControlFilterState } from './components'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useControlStore } from '@/stores'
import { Button } from '@/components/ui/button'
import { LayoutGrid, List, Loader2 } from 'lucide-react'
import { ControlCard } from './components/ControlCard'

const ITEMS_PER_PAGE = 10

export function ControlsPage() {
  const navigate = useNavigate()
  const { controls, isLoading, error, fetchControls } = useControlStore()
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [filters, setFilters] = useState<ControlFilterState>({
    category: 'all',
    status: 'all',
    search: '',
  })
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    void fetchControls()
  }, [fetchControls])

  // Filter controls based on current filters
  const filteredControls = controls.filter((control) => {
    const matchesCategory = filters.category === 'all' || control.category === filters.category
    const matchesStatus = filters.status === 'all' || control.status === filters.status
    const matchesSearch =
      filters.search === '' ||
      control.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      control.code.toLowerCase().includes(filters.search.toLowerCase()) ||
      (control.description && control.description.toLowerCase().includes(filters.search.toLowerCase()))
    return matchesCategory && matchesStatus && matchesSearch
  })

  // Pagination
  const totalPages = Math.ceil(filteredControls.length / ITEMS_PER_PAGE)
  const paginatedControls = filteredControls.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleViewControl = (id: number) => {
    navigate(`/controls/${id}`)
  }

  const handleFiltersChange = (newFilters: ControlFilterState) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (isLoading && controls.length === 0) {
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
          <p>Error loading controls: {error}</p>
          <Button onClick={() => fetchControls()} className="mt-2">
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
          <h1 className="text-2xl font-bold tracking-tight">Controls</h1>
          <p className="text-muted-foreground mt-1">
            Browse and manage security controls from your compliance frameworks
          </p>
        </div>
        <div className="flex items-center gap-2">
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
      <ControlFilters filters={filters} onFiltersChange={handleFiltersChange} />

      {/* Controls Display */}
      {viewMode === 'table' ? (
        <Card>
          <CardHeader>
            <CardTitle>All Controls ({filteredControls.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <ControlTable
              controls={paginatedControls}
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredControls.length}
              onPageChange={handlePageChange}
              onView={handleViewControl}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">All Controls ({filteredControls.length})</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedControls.map((control) => (
              <ControlCard
                key={control.id}
                control={control}
                onView={handleViewControl}
              />
            ))}
          </div>
          {/* Grid Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredControls.length)} of {filteredControls.length} controls
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
    </div>
  )
}

export default ControlsPage
