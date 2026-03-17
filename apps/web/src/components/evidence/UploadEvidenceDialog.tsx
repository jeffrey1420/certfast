import { useState } from 'react'
import { Upload, Loader2 } from 'lucide-react'
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
import { useEvidenceStore } from '@/stores'
import type { CreateEvidenceData } from '@/types'

interface UploadEvidenceDialogProps {
  controlId: number
  onSuccess?: () => void
}

export function UploadEvidenceDialog({ controlId, onSuccess }: UploadEvidenceDialogProps) {
  const [open, setOpen] = useState(false)
  const [fileUrl, setFileUrl] = useState('')
  const [fileName, setFileName] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { createEvidence } = useEvidenceStore()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // For now, we'll use a placeholder URL since we don't have file storage
      // In production, this would upload to S3/storage and get back a URL
      setFileName(file.name)
      setFileUrl(`/uploads/${file.name}`)
      setError(null)
    }
  }

  const handleSubmit = async () => {
    // Validation
    if (!fileName.trim()) {
      setError('Please select a file')
      return
    }

    setIsSubmitting(true)
    setError(null)

    // Derive file type from extension
    const ext = fileName.split('.').pop()?.toLowerCase() || ''
    const fileType = ext ? `.${ext}` : 'unknown'

    const evidenceData: CreateEvidenceData = {
      controlId,
      fileUrl: fileUrl || `/uploads/${fileName}`,
      fileName: fileName.trim(),
      fileType,
      description: description.trim() || undefined,
    }

    const result = await createEvidence(evidenceData)
    setIsSubmitting(false)

    if (result) {
      // Success - reset form and close dialog
      setFileUrl('')
      setFileName('')
      setDescription('')
      setOpen(false)
      onSuccess?.()
    } else {
      setError('Failed to upload evidence. Please try again.')
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      // Reset form when closing
      setFileUrl('')
      setFileName('')
      setDescription('')
      setError(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Evidence
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload Evidence</DialogTitle>
          <DialogDescription>
            Add evidence files to support this control. Accepted formats include documents, images, and certificates.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* File Input */}
          <div className="space-y-2">
            <Label htmlFor="file">File *</Label>
            <Input
              id="file"
              type="file"
              onChange={handleFileChange}
              disabled={isSubmitting}
              className="cursor-pointer"
            />
            {fileName && (
              <p className="text-xs text-muted-foreground">
                Selected: {fileName}
              </p>
            )}
          </div>

          {/* Optional: Manual URL input (for testing/demo) */}
          <div className="space-y-2">
            <Label htmlFor="fileUrl">File URL (optional)</Label>
            <Input
              id="fileUrl"
              type="text"
              placeholder="https://example.com/file.pdf"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              disabled={isSubmitting}
            />
            <p className="text-xs text-muted-foreground">
              Override the file URL if uploading to external storage
            </p>
          </div>

          {/* File Name Override */}
          <div className="space-y-2">
            <Label htmlFor="fileName">Display Name *</Label>
            <Input
              id="fileName"
              type="text"
              placeholder="compliance-certificate.pdf"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              placeholder="Brief description of this evidence..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
              rows={3}
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
            onClick={() => setOpen(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || !fileName.trim()}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              'Upload'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
