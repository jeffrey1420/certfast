import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react'
import type { ControlDetailed } from '@/types'

interface ControlTableProps {
  controls: ControlDetailed[]
  currentPage: number
  totalPages: number
  totalItems: number
  onPageChange: (page: number) => void
  onView: (id: string) => void
}

const categoryColors: Record<string, string> = {
  'Governance': 'bg-blue-100 text-blue-800',
  'Risk Management': 'bg-purple-100 text-purple-800',
  'Asset Management': 'bg-green-100 text-green-800',
  'Access Control': 'bg-orange-100 text-orange-800',
  'Cryptography': 'bg-pink-100 text-pink-800',
  'Physical Security': 'bg-red-100 text-red-800',
  'Operations Security': 'bg-yellow-100 text-yellow-800',
  'Communications Security': 'bg-indigo-100 text-indigo-800',
  'System Acquisition': 'bg-teal-100 text-teal-800',
  'Supplier Relationships': 'bg-cyan-100 text-cyan-800',
  'Incident Management': 'bg-rose-100 text-rose-800',
  'Business Continuity': 'bg-emerald-100 text-emerald-800',
  'Compliance': 'bg-slate-100 text-slate-800',
}

const maturityConfig = {
  basic: { label: 'Basic', variant: 'secondary' as const },
  intermediate: { label: 'Intermediate', variant: 'default' as const },
  advanced: { label: 'Advanced', variant: 'outline' as const },
}

export function ControlTable({
  controls,
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
  onView,
}: ControlTableProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Maturity</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {controls.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No controls found
                </TableCell>
              </TableRow>
            ) : (
              controls.map((control) => (
                <TableRow key={control.id}>
                  <TableCell className="font-mono font-medium">{control.code}</TableCell>
                  <TableCell className="max-w-md">
                    <div className="font-medium">{control.title}</div>
                    <div className="text-sm text-muted-foreground truncate">
                      {control.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[control.category] || 'bg-gray-100 text-gray-800'}`}>
                      {control.category}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={maturityConfig[control.maturityLevel].variant}>
                      {maturityConfig[control.maturityLevel].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onView(control.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * 10 + 1} to{' '}
            {Math.min(currentPage * 10, totalItems)} of {totalItems} controls
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="sm"
                  className="w-8"
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
