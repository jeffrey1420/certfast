import { useState, useEffect, type ChangeEvent } from 'react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search } from 'lucide-react'
import { useDebounce } from '@/hooks'

export interface FilterState {
  status: string
  framework: string
  search: string
}

interface AssessmentFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
}

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'overdue', label: 'Overdue' },
]

const frameworkOptions = [
  { value: 'all', label: 'All Frameworks' },
  { value: 'ISO 27001', label: 'ISO 27001' },
  { value: 'SOC 2', label: 'SOC 2' },
  { value: 'GDPR', label: 'GDPR' },
  { value: 'HIPAA', label: 'HIPAA' },
  { value: 'PCI DSS', label: 'PCI DSS' },
  { value: 'NIST CSF', label: 'NIST CSF' },
  { value: 'CIS Controls', label: 'CIS Controls' },
  { value: 'CCPA', label: 'CCPA' },
]

export function AssessmentFilters({ filters, onFiltersChange }: AssessmentFiltersProps) {
  // Local state for search input (updates immediately)
  const [searchInput, setSearchInput] = useState(filters.search)
  // Debounced value for filtering (updates after delay)
  const debouncedSearch = useDebounce(searchInput, 300)

  // Sync local search input when external filters change
  useEffect(() => {
    setSearchInput(filters.search)
  }, [filters.search])

  // Update parent with debounced search value
  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      onFiltersChange({ ...filters, search: debouncedSearch })
    }
  }, [debouncedSearch, filters, onFiltersChange])

  const handleStatusChange = (value: string) => {
    onFiltersChange({ ...filters, status: value })
  }

  const handleFrameworkChange = (value: string) => {
    onFiltersChange({ ...filters, framework: value })
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search assessments..."
          value={searchInput}
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

      {/* Framework Filter */}
      <div className="w-full sm:w-[180px]">
        <Select value={filters.framework} onValueChange={handleFrameworkChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by framework" />
          </SelectTrigger>
          <SelectContent>
            {frameworkOptions.map((option) => (
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
