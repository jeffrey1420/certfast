import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, User, Shield, Clock, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ControlList, type Control } from './components/ControlList'
import { EvidenceUpload, type EvidenceFile } from './components/EvidenceUpload'

// Mock assessment data
const mockAssessment = {
  id: '1',
  name: 'ISO 27001 Compliance Review',
  framework: 'ISO 27001',
  status: 'in_progress' as const,
  progress: 75,
  dueDate: '2026-04-15',
  owner: 'John Smith',
  description: 'Comprehensive compliance assessment for ISO 27001:2022 certification covering information security management systems.',
  createdAt: '2026-02-01',
  updatedAt: '2026-03-15',
}

// Mock controls data
const mockControls: Control[] = [
  {
    id: 'ctrl-1',
    name: 'A.5.1 - Information Security Policies',
    description: 'Management direction for information security including policy development and review processes.',
    status: 'completed',
    priority: 'high',
    evidenceRequired: true,
    evidenceCount: 3,
    checklistItems: [
      { id: 'chk-1-1', text: 'Information security policy document created', checked: true },
      { id: 'chk-1-2', text: 'Policy approved by management', checked: true },
      { id: 'chk-1-3', text: 'Policy communicated to all employees', checked: true },
      { id: 'chk-1-4', text: 'Review schedule established', checked: true },
    ],
  },
  {
    id: 'ctrl-2',
    name: 'A.5.2 - Information Security Roles',
    description: 'Definition and allocation of information security responsibilities within the organization.',
    status: 'completed',
    priority: 'high',
    evidenceRequired: true,
    evidenceCount: 2,
    checklistItems: [
      { id: 'chk-2-1', text: 'Security roles defined in job descriptions', checked: true },
      { id: 'chk-2-2', text: 'Security officer appointed', checked: true },
      { id: 'chk-2-3', text: 'Responsibility matrix documented', checked: true },
    ],
  },
  {
    id: 'ctrl-3',
    name: 'A.6.1 - Screening',
    description: 'Background verification checks on candidates for employment and contractors.',
    status: 'in_progress',
    priority: 'medium',
    evidenceRequired: true,
    evidenceCount: 1,
    checklistItems: [
      { id: 'chk-3-1', text: 'Screening policy documented', checked: true },
      { id: 'chk-3-2', text: 'Background check procedures defined', checked: true },
      { id: 'chk-3-3', text: 'Vendor contracts include screening requirements', checked: false },
      { id: 'chk-3-4', text: 'Screening records maintained securely', checked: false },
    ],
  },
  {
    id: 'ctrl-4',
    name: 'A.7.1 - Physical Entry Controls',
    description: 'Secure areas protected by appropriate entry controls to ensure only authorized access.',
    status: 'in_progress',
    priority: 'high',
    evidenceRequired: true,
    evidenceCount: 0,
    checklistItems: [
      { id: 'chk-4-1', text: 'Physical security perimeter defined', checked: true },
      { id: 'chk-4-2', text: 'Access control system implemented', checked: true },
      { id: 'chk-4-3', text: 'Visitor access procedures documented', checked: false },
      { id: 'chk-4-4', text: 'Access logs reviewed regularly', checked: false },
      { id: 'chk-4-5', text: 'Emergency exit procedures tested', checked: false },
    ],
  },
  {
    id: 'ctrl-5',
    name: 'A.8.1 - User Endpoint Devices',
    description: 'Protection of information stored on user endpoint devices.',
    status: 'not_started',
    priority: 'medium',
    evidenceRequired: true,
    evidenceCount: 0,
    checklistItems: [
      { id: 'chk-5-1', text: 'Device registration policy', checked: false },
      { id: 'chk-5-2', text: 'Encryption requirements defined', checked: false },
      { id: 'chk-5-3', text: 'Remote wipe capability enabled', checked: false },
      { id: 'chk-5-4', text: 'Device inventory maintained', checked: false },
    ],
  },
  {
    id: 'ctrl-6',
    name: 'A.9.1 - Access Control Policy',
    description: 'Business requirements for access control documented and reviewed.',
    status: 'completed',
    priority: 'high',
    evidenceRequired: true,
    evidenceCount: 4,
    checklistItems: [
      { id: 'chk-6-1', text: 'Access control policy documented', checked: true },
      { id: 'chk-6-2', text: 'Least privilege principle defined', checked: true },
      { id: 'chk-6-3', text: 'Access review schedule established', checked: true },
      { id: 'chk-6-4', text: 'Policy communicated to users', checked: true },
    ],
  },
]

// Mock evidence files
const mockEvidenceFiles: EvidenceFile[] = [
  {
    id: 'ev-1',
    name: 'Security_Policy_2026.pdf',
    size: 2457600,
    type: 'application/pdf',
    uploadedAt: '2 days ago',
  },
  {
    id: 'ev-2',
    name: 'Role_Definitions.docx',
    size: 512000,
    type: 'application/document',
    uploadedAt: '3 days ago',
  },
  {
    id: 'ev-3',
    name: 'Access_Control_Audit.xlsx',
    size: 102400,
    type: 'application/excel',
    uploadedAt: '1 week ago',
  },
]

const statusConfig = {
  pending: { label: 'Pending', variant: 'secondary' as const },
  in_progress: { label: 'In Progress', variant: 'default' as const },
  completed: { label: 'Completed', variant: 'outline' as const },
  overdue: { label: 'Overdue', variant: 'destructive' as const },
}

export function AssessmentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [controls, setControls] = useState<Control[]>(mockControls)
  const [evidenceFiles, setEvidenceFiles] = useState<EvidenceFile[]>(mockEvidenceFiles)

  // Calculate stats
  const completedControls = controls.filter((c) => c.status === 'completed').length
  const totalControls = controls.length
  const checklistTotal = controls.reduce((sum, c) => sum + c.checklistItems.length, 0)
  const checklistChecked = controls.reduce(
    (sum, c) => sum + c.checklistItems.filter((i) => i.checked).length,
    0
  )

  const handleToggleChecklistItem = (controlId: string, itemId: string) => {
    setControls((prev) =>
      prev.map((control) =>
        control.id === controlId
          ? {
              ...control,
              checklistItems: control.checklistItems.map((item) =>
                item.id === itemId ? { ...item, checked: !item.checked } : item
              ),
            }
          : control
      )
    )
  }

  const handleUpload = (files: File[]) => {
    const newFiles: EvidenceFile[] = files.map((file, index) => ({
      id: `ev-new-${Date.now()}-${index}`,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: 'just now',
    }))
    setEvidenceFiles((prev) => [...newFiles, ...prev])
  }

  const handleRemove = (fileId: string) => {
    setEvidenceFiles((prev) => prev.filter((f) => f.id !== fileId))
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
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
            <h1 className="text-2xl font-bold tracking-tight">{mockAssessment.name}</h1>
            <Badge variant={statusConfig[mockAssessment.status].variant}>
              {statusConfig[mockAssessment.status].label}
            </Badge>
          </div>
          <p className="text-muted-foreground max-w-2xl">{mockAssessment.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              {mockAssessment.framework}
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {mockAssessment.owner}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Due {formatDate(mockAssessment.dueDate)}
            </div>
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
              <span className="text-2xl font-bold">{mockAssessment.progress}%</span>
              <Progress value={mockAssessment.progress} className="h-2 flex-1" />
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
              <span className="text-2xl font-bold">30 days</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls List - Takes 2 columns */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Controls ({totalControls})</CardTitle>
            </CardHeader>
            <CardContent>
              <ControlList
                controls={controls}
                onToggleChecklistItem={handleToggleChecklistItem}
              />
            </CardContent>
          </Card>
        </div>

        {/* Evidence Upload - Takes 1 column */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Evidence & Attachments</CardTitle>
            </CardHeader>
            <CardContent>
              <EvidenceUpload
                files={evidenceFiles}
                onUpload={handleUpload}
                onRemove={handleRemove}
              />
            </CardContent>
          </Card>

          {/* Quick Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Assessment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Framework</span>
                <span className="font-medium">{mockAssessment.framework}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Owner</span>
                <span className="font-medium">{mockAssessment.owner}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Due Date</span>
                <span className="font-medium">{formatDate(mockAssessment.dueDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span className="font-medium">{formatDate(mockAssessment.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated</span>
                <span className="font-medium">{formatDate(mockAssessment.updatedAt)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AssessmentDetailPage
