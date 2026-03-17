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

export interface ControlFilterState {
  category: string
  status: string
  search: string
}

interface ControlFiltersProps {
  filters: ControlFilterState
  onFiltersChange: (filters: ControlFilterState) => void
}

const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  { value: 'Governance', label: 'Governance' },
  { value: 'Risk Management', label: 'Risk Management' },
  { value: 'Asset Management', label: 'Asset Management' },
  { value: 'Access Control', label: 'Access Control' },
  { value: 'Cryptography', label: 'Cryptography' },
  { value: 'Physical Security', label: 'Physical Security' },
  { value: 'Operations Security', label: 'Operations Security' },
  { value: 'Communications Security', label: 'Communications Security' },
  { value: 'System Acquisition', label: 'System Acquisition' },
  { value: 'Supplier Relationships', label: 'Supplier Relationships' },
  { value: 'Incident Management', label: 'Incident Management' },
  { value: 'Business Continuity', label: 'Business Continuity' },
  { value: 'Compliance', label: 'Compliance' },
]

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'draft', label: 'Draft' },
  { value: 'active', label: 'Active' },
  { value: 'archived', label: 'Archived' },
  { value: 'deprecated', label: 'Deprecated' },
]

export function ControlFilters({ filters, onFiltersChange }: ControlFiltersProps) {
  const handleCategoryChange = (value: string) => {
    onFiltersChange({ ...filters, category: value })
  }

  const handleStatusChange = (value: string) => {
    onFiltersChange({ ...filters, status: value })
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
          placeholder="Search controls..."
          value={filters.search}
          onChange={handleSearchChange}
          className="pl-9"
        />
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
    </div>
  )
}
