// TypeScript type definitions for CertFast

// User types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'admin' | 'manager' | 'auditor' | 'member'
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  user: User
  token: string
}

// Organization types
export interface Organization {
  id: string
  name: string
  slug: string
  logo?: string
  settings: OrganizationSettings
  createdAt: string
  updatedAt: string
}

export interface OrganizationSettings {
  timezone: string
  dateFormat: string
  defaultFramework: string
}

// Framework types
export interface Framework {
  id: string
  name: string
  description: string
  version: string
  category: string
  controlsCount: number
}

// Assessment types
export interface Assessment {
  id: string
  name: string
  description?: string
  frameworkId: string
  framework: Framework
  status: 'draft' | 'in_progress' | 'under_review' | 'completed' | 'archived'
  progress: number
  startDate?: string
  targetDate?: string
  completedDate?: string
  createdBy: User
  createdAt: string
  updatedAt: string
}

export interface AssessmentSummary {
  id: string
  name: string
  status: Assessment['status']
  progress: number
  frameworkName: string
  targetDate?: string
}

// Control types
export interface Control {
  id: number
  organizationId: number
  code: string
  title: string
  description: string | null
  category: string
  status: 'draft' | 'active' | 'archived' | 'deprecated'
  createdAt: string
  updatedAt: string
}

export interface AssessmentControl {
  id: string
  assessmentId: string
  controlId: string
  control: Control
  status: 'not_started' | 'in_progress' | 'implemented' | 'partially_implemented' | 'not_applicable'
  notes?: string
  evidenceCount: number
  assignedTo?: User
  dueDate?: string
  completedAt?: string
  createdAt: string
  updatedAt: string
}

// Evidence types
export type EvidenceStatus = 'pending' | 'approved' | 'rejected' | 'needs_review'

export interface Evidence {
  id: number
  controlId: number
  fileUrl: string
  fileName: string
  fileType: string
  fileSize: number | null
  description: string | null
  status: EvidenceStatus
  uploadedBy: number
  reviewedAt: string | null
  reviewedBy: number | null
  createdAt: string
  updatedAt: string
  
  // Optional expanded relations (when preloaded)
  uploadedByUser?: User
  reviewedByUser?: User
  control?: Control
}

export interface CreateEvidenceData {
  controlId: number
  fileUrl: string
  fileName: string
  fileType: string
  fileSize?: number
  description?: string
}

export interface UpdateEvidenceData {
  description?: string
  status?: EvidenceStatus
  reviewedBy?: number
}

// API response types
export interface ApiResponse<T> {
  data: T
  message?: string
  meta?: PaginationMeta
}

export interface ApiError {
  message: string
  errors?: Record<string, string[]>
  code?: string
}

export interface PaginationMeta {
  currentPage: number
  totalPages: number
  totalCount: number
  perPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: PaginationMeta
}

// Form types
export interface LoginFormData {
  email: string
  password: string
}

export interface RegisterFormData {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  organizationName: string
}

export interface CreateAssessmentFormData {
  name: string
  description?: string
  frameworkId: string
  targetDate?: string
}

export interface UpdateControlStatusFormData {
  status: AssessmentControl['status']
  notes?: string
  dueDate?: string
}

// Dashboard types
export interface DashboardStats {
  totalAssessments: number
  activeAssessments: number
  completedAssessments: number
  pendingEvidence: number
  overallProgress: number
  recentActivity: ActivityItem[]
}

export interface ActivityItem {
  id: string
  type: 'assessment_created' | 'evidence_uploaded' | 'status_changed' | 'user_joined'
  description: string
  user: User
  createdAt: string
}

// Control types (extended)
export interface ControlDetailed {
  id: number
  organizationId: number
  code: string
  title: string
  description: string | null
  category: string
  status: 'draft' | 'active' | 'archived' | 'deprecated'
  createdAt: string
  updatedAt: string
}

// Policy types
export interface Policy {
  id: string
  title: string
  code: string
  description: string
  content?: string
  status: 'draft' | 'published' | 'archived'
  version: string
  ownerId?: string
  owner?: User
  category: string
  effectiveDate?: string
  reviewDate?: string
  approvedBy?: string
  approvedAt?: string
  createdAt: string
  updatedAt: string
}
