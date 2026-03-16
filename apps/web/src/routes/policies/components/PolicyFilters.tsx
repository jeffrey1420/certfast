import type { ChangeEvent } from 'react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search } from 'lucide-react'

export interface PolicyFilterState {
  status: string
  category: string
  search: string
}

interface PolicyFiltersProps {
  filters: PolicyFilterState
  onFiltersChange: (filters: PolicyFilterState) => void
}

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' },
]

const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  { value: 'Security', label: 'Security' },
  { value: 'Privacy', label: 'Privacy' },
  { value: 'Governance', label: 'Governance' },
  { value: 'Risk', label: 'Risk' },
  { value: 'Compliance', label: 'Compliance' },
  { value: 'HR', label: 'HR' },
  { value: 'IT', label: 'IT' },
  { value: 'Operations', label: 'Operations' },
]

export function PolicyFilters({ filters, onFiltersChange }: PolicyFiltersProps) {
  const handleStatusChange = (value: string) => {
    onFiltersChange({ ...filters, status: value })
  }

  const handleCategoryChange = (value: string) => {
    onFiltersChange({ ...filters, category: value })
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, search: e.target.value })
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search policies..."
          value={filters.search}
          onChange={handleSearchChange}
          className="pl-9"
        />
      </div>

      {/* Status Filter */}
      <div className="w-full sm:w-[180px]">
        <Select value={filters.status} onValueChange={handleStatusChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Category Filter */}
      <div className="w-full sm:w-[180px]">
        <Select value={filters.category} onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categoryOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
