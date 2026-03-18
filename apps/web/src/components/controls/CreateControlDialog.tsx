import { useState } from 'react'
import { Plus, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
import { useControlStore, useOrganizationStore } from '@/stores'
import type { CreateControlData } from '@/types'

const CATEGORIES = [
  'Governance',
  'Risk Management',
  'Asset Management',
  'Access Control',
  'Cryptography',
  'Physical Security',
  'Operations Security',
  'Communications Security',
  'System Acquisition',
  'Supplier Relationships',
  'Incident Management',
  'Business Continuity',
  'Compliance',
]

interface CreateControlDialogProps {
  onSuccess?: () => void
}

export function CreateControlDialog({ onSuccess }: CreateControlDialogProps) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [code, setCode] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<'draft' | 'active'>('draft')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { createControl } = useControlStore()
  const { currentOrganization } = useOrganizationStore()

  const handleSubmit = async () => {
    // Validation
    if (!title.trim()) {
      setError('Title is required')
      return
    }
    if (!code.trim()) {
      setError('Code is required')
      return
    }
    if (!category) {
      setError('Category is required')
      return
    }
    if (!currentOrganization) {
      setError('No organization selected. Please join or create an organization first.')
      return
    }

    setIsSubmitting(true)
    setError(null)

    const controlData: CreateControlData = {
      organizationId: Number(currentOrganization.id),
      title: title.trim(),
      code: code.trim().toUpperCase(),
      category,
      description: description.trim() || undefined,
      status,
    }

    const result = await createControl(controlData)
    setIsSubmitting(false)

    if (result) {
      // Reset form
      setTitle('')
      setCode('')
      setCategory('')
      setDescription('')
      setStatus('draft')
      setOpen(false)
      onSuccess?.()
    } else {
      setError('Failed to create control. Please try again.')
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      // Reset form when closing
      setTitle('')
      setCode('')
      setCategory('')
      setDescription('')
      setStatus('draft')
      setError(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Control
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Control</DialogTitle>
          <DialogDescription>
            Add a new security control to your compliance framework.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Code */}
          <div className="space-y-2">
            <Label htmlFor="code">Control Code *</Label>
            <Input
              id="code"
              placeholder="e.g., AC-1, CM-2, SC-3"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={isSubmitting}
            />
            <p className="text-xs text-muted-foreground">
              A unique identifier for this control (e.g., AC-1 for Access Control 1)
            </p>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Control title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={category}
              onValueChange={setCategory}
              disabled={isSubmitting}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Initial Status</Label>
            <Select
              value={status}
              onValueChange={(value: 'draft' | 'active') => setStatus(value)}
              disabled={isSubmitting}
            >
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="active">Active</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the control purpose and implementation requirements..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
              rows={4}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
              {error}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || !title.trim() || !code.trim() || !category}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Control'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
