import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PolicyTable, PolicyFilters, type PolicyFilterState, PolicyCard } from './components'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { usePolicyStore } from '@/stores'
import { Button } from '@/components/ui/button'
import { LayoutGrid, List, Loader2 } from 'lucide-react'
import { CreatePolicyDialog } from '@/components/policies'

const ITEMS_PER_PAGE = 10

export function PoliciesPage() {
  const navigate = useNavigate()
  const { policies, isLoading, error, fetchPolicies } = usePolicyStore()
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [filters, setFilters] = useState<PolicyFilterState>({
    status: 'all',
    category: 'all',
    search: '',
  })
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    void fetchPolicies()
  }, [fetchPolicies])

  // Filter policies based on current filters
  const filteredPolicies = policies.filter((policy) => {
    const matchesStatus = filters.status === 'all' || policy.status === filters.status
    const matchesCategory = filters.category === 'all' || policy.category === filters.category
    const matchesSearch =
      filters.search === '' ||
      policy.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      policy.code.toLowerCase().includes(filters.search.toLowerCase()) ||
      policy.description.toLowerCase().includes(filters.search.toLowerCase())
    return matchesStatus && matchesCategory && matchesSearch
  })

  // Pagination
  const totalPages = Math.ceil(filteredPolicies.length / ITEMS_PER_PAGE)
  const paginatedPolicies = filteredPolicies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleViewPolicy = (id: number) => {
    navigate(`/policies/${id}`)
  }

  const handleFiltersChange = (newFilters: PolicyFilterState) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (isLoading && policies.length === 0) {
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
          <p>Error loading policies: {error}</p>
          <Button onClick={() => fetchPolicies()} className="mt-2">
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
          <h1 className="text-2xl font-bold tracking-tight">Policies</h1>
          <p className="text-muted-foreground mt-1">
            Manage compliance policies and documentation
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
          <CreatePolicyDialog onSuccess={() => fetchPolicies()} />
        </div>
      </div>

      {/* Filters */}
      <PolicyFilters filters={filters} onFiltersChange={handleFiltersChange} />

      {/* Policies Display */}
      {viewMode === 'table' ? (
        <Card>
          <CardHeader>
            <CardTitle>All Policies ({filteredPolicies.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <PolicyTable
              policies={paginatedPolicies}
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredPolicies.length}
              onPageChange={handlePageChange}
              onView={handleViewPolicy}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">All Policies ({filteredPolicies.length})</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedPolicies.map((policy) => (
              <PolicyCard
                key={policy.id}
                policy={policy}
                onView={handleViewPolicy}
              />
            ))}
          </div>
          {/* Grid Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredPolicies.length)} of {filteredPolicies.length} policies
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

export default PoliciesPage
