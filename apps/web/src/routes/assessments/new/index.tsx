import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAssessmentStore } from '@/stores/assessment'
import { useOrganizationStore } from '@/stores/organization'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowLeft, Loader2 } from 'lucide-react'

const ASSESSMENT_TYPES = [
  { value: 'soc2_type1', label: 'SOC 2 Type I' },
  { value: 'soc2_type2', label: 'SOC 2 Type II' },
  { value: 'iso27001', label: 'ISO 27001' },
  { value: 'gdpr', label: 'GDPR' },
  { value: 'hipaa', label: 'HIPAA' },
  { value: 'custom', label: 'Custom' },
]

interface FormData {
  organizationId: string
  title: string
  type: string
  description: string
  dueDate: string
}

interface FormErrors {
  organizationId?: string
  title?: string
  type?: string
}

export function CreateAssessmentPage() {
  const navigate = useNavigate()
  const { createAssessment, isLoading: isCreating } = useAssessmentStore()
  const { organizations, currentOrganization, fetchOrganizations, isLoading: isLoadingOrgs } = useOrganizationStore()

  const [formData, setFormData] = useState<FormData>({
    organizationId: currentOrganization?.id || '',
    title: '',
    type: '',
    description: '',
    dueDate: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Fetch organizations on mount
  useEffect(() => {
    void fetchOrganizations()
  }, [fetchOrganizations])

  // Update organizationId when currentOrganization changes or organizations load
  useEffect(() => {
    if (!formData.organizationId) {
      if (currentOrganization?.id) {
        setFormData((prev) => ({ ...prev, organizationId: currentOrganization.id }))
      } else if (organizations.length > 0) {
        setFormData((prev) => ({ ...prev, organizationId: organizations[0].id }))
      }
    }
  }, [currentOrganization, organizations, formData.organizationId])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.organizationId) {
      newErrors.organizationId = 'Organization is required'
    }
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    if (!formData.type) {
      newErrors.type = 'Assessment type is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    if (!validateForm()) {
      return
    }

    try {
      const payload = {
        organizationId: Number(formData.organizationId),
        title: formData.title.trim(),
        type: formData.type,
        ...(formData.description && { description: formData.description.trim() }),
        ...(formData.dueDate && { dueDate: formData.dueDate }),
      }

      await createAssessment(payload)
      navigate('/assessments')
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to create assessment')
    }
  }

  const handleCancel = () => {
    navigate('/assessments')
  }

  return (
    <div className="space-y-6 p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={handleCancel}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create New Assessment</h1>
          <p className="text-muted-foreground mt-1">
            Start a new compliance assessment for your organization
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Assessment Details</CardTitle>
          <CardDescription>
            Provide the basic information for your compliance assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Organization Selection */}
            <div className="space-y-2">
              <Label htmlFor="organizationId">
                Organization <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.organizationId}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, organizationId: value }))
                }
                disabled={isLoadingOrgs}
              >
                <SelectTrigger id="organizationId">
                  {isLoadingOrgs ? (
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading organizations...
                    </span>
                  ) : (
                    <SelectValue placeholder="Select an organization" />
                  )}
                </SelectTrigger>
                <SelectContent>
                  {organizations.length === 0 ? (
                    <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                      No organizations available
                    </div>
                  ) : (
                    organizations.map((org) => (
                      <SelectItem key={org.id} value={org.id}>
                        {org.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              {errors.organizationId && (
                <p className="text-sm text-destructive">{errors.organizationId}</p>
              )}
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">
                Assessment Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                placeholder="e.g., Q1 2026 SOC 2 Type II Assessment"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              />
              {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
            </div>

            {/* Assessment Type */}
            <div className="space-y-2">
              <Label htmlFor="type">
                Assessment Type <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select assessment type" />
                </SelectTrigger>
                <SelectContent>
                  {ASSESSMENT_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.type && <p className="text-sm text-destructive">{errors.type}</p>}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Add any additional details about this assessment..."
                rows={4}
                value={formData.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setFormData((prev) => ({ ...prev, description: e.target.value }))
                }
              />
            </div>

            {/* Due Date */}
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date (Optional)</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, dueDate: e.target.value }))}
              />
            </div>

            {/* Error Message */}
            {submitError && (
              <div className="bg-destructive/10 text-destructive p-4 rounded-lg text-sm">
                {submitError}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4">
              <Button type="submit" disabled={isCreating}>
                {isCreating && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Create Assessment
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel} disabled={isCreating}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateAssessmentPage
