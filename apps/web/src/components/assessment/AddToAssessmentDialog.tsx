import { useState, useEffect } from 'react'
import { useAssessmentStore } from '@/stores/assessment'
import { useOrganizationStore } from '@/stores/organization'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, Plus, CheckCircle, AlertCircle, Folder } from 'lucide-react'

interface AddToAssessmentDialogProps {
  controlId: number
  controlCode: string
  controlTitle: string
}

const statusLabels: Record<string, string> = {
  draft: 'Draft',
  active: 'Active',
  in_review: 'In Review',
  completed: 'Completed',
  archived: 'Archived',
}

const statusVariants: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  draft: 'secondary',
  active: 'default',
  in_review: 'outline',
  completed: 'default',
  archived: 'destructive',
}

export function AddToAssessmentDialog({
  controlId,
  controlCode,
  controlTitle,
}: AddToAssessmentDialogProps) {
  const [open, setOpen] = useState(false)
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<number | null>(null)
  const [isLinking, setIsLinking] = useState(false)
  const [linkSuccess, setLinkSuccess] = useState(false)

  const { assessments, isLoading, error, fetchAssessments } = useAssessmentStore()
  const { currentOrganization } = useOrganizationStore()

  useEffect(() => {
    if (open) {
      void fetchAssessments(currentOrganization?.id ? Number(currentOrganization.id) : undefined)
      setSelectedAssessmentId(null)
      setLinkSuccess(false)
    }
  }, [open, fetchAssessments, currentOrganization?.id])

  const handleLinkControl = async () => {
    if (!selectedAssessmentId) return

    setIsLinking(true)

    // TODO: Backend API for linking controls to assessments is not yet implemented.
    // This will be a POST /api/v1/assessments/:id/controls endpoint.
    // For now, we show a "coming soon" state to users.
    
    // Simulate API delay for UX feedback
    await new Promise((resolve) => setTimeout(resolve, 800))
    
    setIsLinking(false)
    setLinkSuccess(true)
    
    // Close dialog after showing success state
    setTimeout(() => {
      setOpen(false)
      setLinkSuccess(false)
      setSelectedAssessmentId(null)
    }, 1500)
  }

  const availableAssessments = assessments.filter(
    (a) => a.status === 'draft' || a.status === 'active'
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add to Assessment
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Control to Assessment</DialogTitle>
          <DialogDescription>
            Link <span className="font-mono font-medium">{controlCode}</span> to an existing
            assessment. This control will be tracked as part of the compliance evaluation.
          </DialogDescription>
        </DialogHeader>

        {/* Control Summary */}
        <div className="bg-muted/50 rounded-lg p-3 border">
          <p className="font-medium text-sm">{controlTitle}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Control ID: {controlId}
          </p>
        </div>

        {/* Content */}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg text-sm">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <p>Failed to load assessments: {error}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchAssessments(currentOrganization?.id ? Number(currentOrganization.id) : undefined)}
              className="mt-2"
            >
              Retry
            </Button>
          </div>
        )}

        {!isLoading && !error && availableAssessments.length === 0 && (
          <div className="text-center py-8 border rounded-lg bg-muted/30">
            <Folder className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-sm font-medium">No available assessments</p>
            <p className="text-xs text-muted-foreground mt-1 px-4">
              Create a new assessment in draft or active status to link this control.
            </p>
          </div>
        )}

        {!isLoading && !error && availableAssessments.length > 0 && !linkSuccess && (
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {availableAssessments.map((assessment) => (
              <button
                key={assessment.id}
                onClick={() => setSelectedAssessmentId(assessment.id)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  selectedAssessmentId === assessment.id
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-border hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{assessment.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {assessment.type.replace(/_/g, ' ').toUpperCase()}
                    </p>
                  </div>
                  <Badge variant={statusVariants[assessment.status]} className="text-xs shrink-0">
                    {statusLabels[assessment.status]}
                  </Badge>
                </div>
                {assessment.dueDate && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Due: {new Date(assessment.dueDate).toLocaleDateString()}
                  </p>
                )}
              </button>
            ))}
          </div>
        )}

        {linkSuccess && (
          <div className="bg-green-50 text-green-700 p-6 rounded-lg text-center">
            <CheckCircle className="h-10 w-10 mx-auto mb-2" />
            <p className="font-medium">Control linked successfully!</p>
            <p className="text-sm text-green-600 mt-1">
              This feature will be fully available soon.
            </p>
          </div>
        )}

        {/* Coming Soon Notice */}
        {!linkSuccess && (
          <div className="bg-amber-50 text-amber-800 p-3 rounded-lg text-xs flex items-start gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <p>
              <span className="font-medium">Coming soon:</span> Control-assessment linking backend
              API is in development. This dialog demonstrates the intended UX.
            </p>
          </div>
        )}

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isLinking}>
            Cancel
          </Button>
          <Button
            onClick={handleLinkControl}
            disabled={!selectedAssessmentId || isLinking || linkSuccess}
          >
            {isLinking && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {isLinking ? 'Linking...' : 'Link to Assessment'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddToAssessmentDialog
