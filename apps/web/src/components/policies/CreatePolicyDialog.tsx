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
import { usePolicyStore, useOrganizationStore } from '@/stores'
import type { CreatePolicyData } from '@/stores/policy'

interface CreatePolicyDialogProps {
  onSuccess?: () => void
}

export function CreatePolicyDialog({ onSuccess }: CreatePolicyDialogProps) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [version, setVersion] = useState('1.0.0')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { createPolicy } = usePolicyStore()
  const { currentOrganization } = useOrganizationStore()

  const handleSubmit = async () => {
    // Validation
    if (!title.trim()) {
      setError('Title is required')
      return
    }
    if (!content.trim()) {
      setError('Content is required')
      return
    }
    if (!currentOrganization) {
      setError('No organization selected. Please join or create an organization first.')
      return
    }

    setIsSubmitting(true)
    setError(null)

    const policyData: CreatePolicyData = {
      organizationId: Number(currentOrganization.id),
      title: title.trim(),
      content: content.trim(),
      version: version.trim() || '1.0.0',
    }

    const result = await createPolicy(policyData)
    setIsSubmitting(false)

    if (result) {
      // Reset form
      setTitle('')
      setContent('')
      setVersion('1.0.0')
      setOpen(false)
      onSuccess?.()
    } else {
      setError('Failed to create policy. Please try again.')
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      // Reset form when closing
      setTitle('')
      setContent('')
      setVersion('1.0.0')
      setError(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Policy
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Create New Policy</DialogTitle>
          <DialogDescription>
            Add a new compliance policy to your organization.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Policy Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Information Security Policy, Access Control Policy"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          {/* Version */}
          <div className="space-y-2">
            <Label htmlFor="version">Version</Label>
            <Input
              id="version"
              placeholder="e.g., 1.0.0"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              disabled={isSubmitting}
            />
            <p className="text-xs text-muted-foreground">
              Defaults to 1.0.0 if not specified
            </p>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Policy Content *</Label>
            <Textarea
              id="content"
              placeholder="Enter the full policy content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isSubmitting}
              rows={8}
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
            disabled={isSubmitting || !title.trim() || !content.trim()}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Policy'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
