import { useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, User, Shield, Clock, CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ControlList, type Control } from './components/ControlList'
import { EvidenceUpload, type EvidenceFile } from './components/EvidenceUpload'
import { useAssessmentStore, useControlStore, useEvidenceStore } from '@/stores'
import type { AssessmentControl } from '@/stores'
import type { Evidence } from '@/types'

// Helper function to format assessment type for display
const formatAssessmentType = (type: string): string => {
  const typeMap: Record<string, string> = {
    'soc2_type1': 'SOC 2 Type I',
    'soc2_type2': 'SOC 2 Type II',
    'iso27001': 'ISO 27001',
    'gdpr': 'GDPR',
    'hipaa': 'HIPAA',
    'custom': 'Custom Framework'
  }
  return typeMap[type] || type
}

// Map backend assessment control to frontend Control interface
const mapAssessmentControlToControl = (ac: AssessmentControl): Control => {
  // Map pivot status to control status
  const statusMap: Record<string, Control['status']> = {
    'not_started': 'not_started',
    'in_progress': 'in_progress',
    'implemented': 'completed',
    'partially_implemented': 'in_progress',
    'not_applicable': 'completed',
  }

  // Derive priority from category (simplified mapping)
  const priorityMap: Record<string, Control['priority']> = {
    'Security Management': 'high',
    'Access Control': 'high',
    'Cryptography': 'high',
    'Operations Security': 'medium',
    'Communications Security': 'medium',
    'System Acquisition': 'medium',
    'Supplier Relationships': 'low',
    'Incident Management': 'high',
    'Business Continuity': 'medium',
    'Compliance': 'medium',
  }

  // Create checklist items based on control status
  // This is a temporary mapping until backend provides real checklist items
  const checklistItems: Control['checklistItems'] = []
  if (ac.pivotStatus === 'implemented' || ac.pivotStatus === 'partially_implemented') {
    checklistItems.push(
      { id: `${ac.id}-1`, text: 'Control documented', checked: true },
      { id: `${ac.id}-2`, text: 'Evidence collected', checked: ac.pivotStatus === 'implemented' }
    )
  } else if (ac.pivotStatus === 'in_progress') {
    checklistItems.push(
      { id: `${ac.id}-1`, text: 'Control documented', checked: true },
      { id: `${ac.id}-2`, text: 'Evidence collection in progress', checked: false }
    )
  } else {
    checklistItems.push(
      { id: `${ac.id}-1`, text: 'Control documentation pending', checked: false },
      { id: `${ac.id}-2`, text: 'Evidence collection pending', checked: false }
    )
  }

  return {
    id: ac.id.toString(),
    name: `${ac.code} - ${ac.title}`,
    description: ac.description || '',
    status: statusMap[ac.pivotStatus] || 'not_started',
    priority: priorityMap[ac.category] || 'medium',
    evidenceRequired: true,
    evidenceCount: 0, // Will be populated from evidence store
    checklistItems,
  }
}

// Map evidence to EvidenceFile interface
const mapEvidenceToEvidenceFile = (ev: Evidence): EvidenceFile => ({
  id: ev.id.toString(),
  name: ev.fileName,
  size: ev.fileSize || 0,
  type: ev.fileType,
  uploadedAt: new Date(ev.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  }),
})

const statusConfig = {
  draft: { label: 'Draft', variant: 'secondary' as const },
  active: { label: 'Active', variant: 'default' as const },
  in_review: { label: 'In Review', variant: 'default' as const },
  completed: { label: 'Completed', variant: 'outline' as const },
  archived: { label: 'Archived', variant: 'destructive' as const },
}

export function AssessmentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { currentAssessment, isLoading: isLoadingAssessment, error: assessmentError, fetchAssessmentById } = useAssessmentStore()
  const { assessmentControls, isLoading: isLoadingControls, fetchControlsByAssessment } = useControlStore()
  const { evidence, isLoading: isLoadingEvidence, fetchEvidenceByControl } = useEvidenceStore()

  // Fetch assessment data and controls on mount
  useEffect(() => {
    if (id) {
      void fetchAssessmentById(id)
      void fetchControlsByAssessment(id)
    }
  }, [id, fetchAssessmentById, fetchControlsByAssessment])

  // Fetch evidence when controls change
  useEffect(() => {
    if (assessmentControls.length > 0) {
      // Fetch evidence for each control
      assessmentControls.forEach((control) => {
        void fetchEvidenceByControl(control.id)
      })
    }
  }, [assessmentControls, fetchEvidenceByControl])

  // Map assessment controls to Control interface
  const controls = useMemo(() => {
    return assessmentControls.map(mapAssessmentControlToControl)
  }, [assessmentControls])

  // Map evidence to EvidenceFile interface
  const evidenceFiles = useMemo(() => {
    return evidence.map(mapEvidenceToEvidenceFile)
  }, [evidence])

  // Calculate stats
  const completedControls = controls.filter((c) => c.status === 'completed').length
  const totalControls = controls.length
  const checklistTotal = controls.reduce((sum, c) => sum + c.checklistItems.length, 0)
  const checklistChecked = controls.reduce(
    (sum, c) => sum + c.checklistItems.filter((i) => i.checked).length,
    0
  )

  // Calculate progress based on controls
  const progress = totalControls > 0
    ? Math.round((completedControls / totalControls) * 100)
    : 0

  const handleToggleChecklistItem = (controlId: string, itemId: string) => {
    // TODO: Implement checklist item toggle via API
    // This requires backend support for checklist items
    console.log('Toggle checklist item:', controlId, itemId)
  }

  const handleUpload = (files: File[]) => {
    // TODO: Implement evidence upload via API
    // This requires backend file upload support
    console.log('Upload files:', files)
  }

  const handleRemove = (fileId: string) => {
    // TODO: Implement evidence deletion via API
    console.log('Remove file:', fileId)
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  // Calculate days remaining
  const daysRemaining = currentAssessment?.dueDate
    ? Math.max(0, Math.ceil((new Date(currentAssessment.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null

  // Loading state
  if (isLoadingAssessment) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Error state
  if (assessmentError) {
    return (
      <div className="p-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/assessments')} className="-ml-2 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Assessments
        </Button>
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          <p>Error loading assessment: {assessmentError}</p>
          <Button onClick={() => id && fetchAssessmentById(id)} className="mt-2">
            Retry
          </Button>
        </div>
      </div>
    )
  }

  // Not found state
  if (!currentAssessment) {
    return (
      <div className="p-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/assessments')} className="-ml-2 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Assessments
        </Button>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Assessment not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Back Button */}
      <Button variant="ghost" size="sm" onClick={() => navigate('/assessments')} className="-ml-2">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Assessments
      </Button>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">{currentAssessment.title}</h1>
            <Badge variant={statusConfig[currentAssessment.status].variant}>
              {statusConfig[currentAssessment.status].label}
            </Badge>
          </div>
          <p className="text-muted-foreground max-w-2xl">{currentAssessment.description || 'No description provided'}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              {formatAssessmentType(currentAssessment.type)}
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              Organization #{currentAssessment.organizationId}
            </div>
            {currentAssessment.dueDate && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Due {formatDate(currentAssessment.dueDate)}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline">Edit Assessment</Button>
          <Button>Complete Review</Button>
        </div>
      </div>

      {/* Progress Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{progress}%</span>
              <Progress value={progress} className="h-2 flex-1" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{completedControls}/{totalControls}</span>
              <span className="text-sm text-muted-foreground">completed</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Checklist Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span className="text-2xl font-bold">{checklistChecked}/{checklistTotal}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Time Remaining</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <span className="text-2xl font-bold">
                {daysRemaining !== null ? `${daysRemaining} days` : 'N/A'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls loading state */}
      {isLoadingControls && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Loading controls...</span>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls List - Takes 2 columns */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Controls ({totalControls})</CardTitle>
            </CardHeader>
            <CardContent>
              {controls.length === 0 && !isLoadingControls ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No controls linked to this assessment.</p>
                  <Button className="mt-4">Add Controls</Button>
                </div>
              ) : (
                <ControlList
                  controls={controls}
                  onToggleChecklistItem={handleToggleChecklistItem}
                />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Evidence Upload - Takes 1 column */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Evidence & Attachments ({evidenceFiles.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingEvidence && evidenceFiles.length === 0 ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                </div>
              ) : (
                <EvidenceUpload
                  files={evidenceFiles}
                  onUpload={handleUpload}
                  onRemove={handleRemove}
                />
              )}
            </CardContent>
          </Card>

          {/* Quick Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Assessment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type</span>
                <span className="font-medium">{formatAssessmentType(currentAssessment.type)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium capitalize">{currentAssessment.status.replace('_', ' ')}</span>
              </div>
              {currentAssessment.dueDate && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Due Date</span>
                  <span className="font-medium">{formatDate(currentAssessment.dueDate)}</span>
                </div>
              )}
              {currentAssessment.startedAt && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Started</span>
                  <span className="font-medium">{formatDate(currentAssessment.startedAt)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span className="font-medium">{formatDate(currentAssessment.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated</span>
                <span className="font-medium">{formatDate(currentAssessment.updatedAt)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AssessmentDetailPage
