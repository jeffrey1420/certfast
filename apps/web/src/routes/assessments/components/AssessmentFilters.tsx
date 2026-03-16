import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Filter } from 'lucide-react'

interface AssessmentFiltersProps {
  frameworks: string[]
  statuses: string[]
  selectedFramework: string
  selectedStatus: string
  onFrameworkChange: (framework: string) => void
  onStatusChange: (status: string) => void
}

const statusLabels: Record<string, string> = {
  'All': 'All Statuses',
  'in_progress': 'In Progress',
  'completed': 'Completed',
  'pending': 'Pending',
  'overdue': 'Overdue',
}

export function AssessmentFilters({
  frameworks,
  statuses,
  selectedFramework,
  selectedStatus,
  onFrameworkChange,
  onStatusChange,
}: AssessmentFiltersProps) {
  return (
    <div className="flex items-center gap-2">
      <Filter className="h-4 w-4 text-muted-foreground hidden sm:block" />
      
      <Select value={selectedFramework} onValueChange={onFrameworkChange}>
        <SelectTrigger className="w-[140px] sm:w-[160px]">
          <SelectValue placeholder="Framework" />
        </SelectTrigger>
        <SelectContent>
          {frameworks.map((framework) => (
            <SelectItem key={framework} value={framework}>
              {framework === 'All' ? 'All Frameworks' : framework}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedStatus} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[140px] sm:w-[160px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {statuses.map((status) => (
            <SelectItem key={status} value={status}>
              {statusLabels[status] || status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
