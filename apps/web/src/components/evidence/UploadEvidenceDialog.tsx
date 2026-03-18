import { useState, useEffect } from 'react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEvidenceStore, useControlStore } from '@/stores'
import type { CreateEvidenceData } from '@/types'

/**
 * Map file extension to MIME type for compliance evidence uploads.
 * Falls back to application/octet-stream for unknown types.
 */
function getMimeTypeFromExtension(ext: string): string {
  const mimeTypes: Record<string, string> = {
    // Documents
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'xls': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'ppt': 'application/vnd.ms-powerpoint',
    'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'txt': 'text/plain',
    'csv': 'text/csv',
    'rtf': 'application/rtf',
    'odt': 'application/vnd.oasis.opendocument.text',
    'ods': 'application/vnd.oasis.opendocument.spreadsheet',
    // Images
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'bmp': 'image/bmp',
    'svg': 'image/svg+xml',
    'webp': 'image/webp',
    // Archives
    'zip': 'application/zip',
    'rar': 'application/vnd.rar',
    '7z': 'application/x-7z-compressed',
    'tar': 'application/x-tar',
    'gz': 'application/gzip',
    // Code/Markup
    'json': 'application/json',
    'xml': 'application/xml',
    'html': 'text/html',
    'md': 'text/markdown',
  }
  return mimeTypes[ext.toLowerCase()] || 'application/octet-stream'
}

interface UploadEvidenceDialogProps {
  controlId?: number
  onSuccess?: () => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function UploadEvidenceDialog({ 
  controlId: initialControlId, 
  onSuccess,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange 
}: UploadEvidenceDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = controlledOnOpenChange !== undefined ? controlledOnOpenChange : setInternalOpen
  
  const [fileUrl, setFileUrl] = useState('')
  const [fileName, setFileName] = useState('')
  const [fileMimeType, setFileMimeType] = useState<string>('')
  const [description, setDescription] = useState('')
  const [selectedControlId, setSelectedControlId] = useState<number | ''>(initialControlId || '')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { createEvidence } = useEvidenceStore()
  const { controls, fetchControls } = useControlStore()

  // Fetch controls when dialog opens if no controlId is provided
  useEffect(() => {
    if (open && !initialControlId) {
      void fetchControls()
    }
  }, [open, initialControlId, fetchControls])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      setFileUrl(`/uploads/${file.name}`)
      setFileMimeType(file.type)
      setError(null)
    }
  }

  const handleSubmit = async () => {
    if (!fileName.trim()) {
      setError('Please select a file')
      return
    }

    const controlIdToUse = initialControlId || (selectedControlId as number)
    if (!controlIdToUse) {
      setError('Please select a control')
      return
    }

    setIsSubmitting(true)
    setError(null)

    // Determine MIME type: use browser-detected type, fallback to extension mapping
    const ext = fileName.split('.').pop()?.toLowerCase() || ''
    const fileType = fileMimeType || getMimeTypeFromExtension(ext)

    const evidenceData: CreateEvidenceData = {
      controlId: controlIdToUse,
      fileUrl: fileUrl || `/uploads/${fileName}`,
      fileName: fileName.trim(),
      fileType,
      description: description.trim() || undefined,
    }

    const result = await createEvidence(evidenceData)
    setIsSubmitting(false)

    if (result) {
      setFileUrl('')
      setFileName('')
      setFileMimeType('')
      setDescription('')
      setSelectedControlId(initialControlId || '')
      setOpen(false)
      onSuccess?.()
    } else {
      setError('Failed to upload evidence. Please try again.')
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      setFileUrl('')
      setFileName('')
      setFileMimeType('')
      setDescription('')
      setSelectedControlId(initialControlId || '')
      setError(null)
    }
  }

  const dialogContent = (
    <>
      <DialogHeader>
        <DialogTitle>Upload Evidence</DialogTitle>
        <DialogDescription>
          Add evidence files to support compliance controls. Accepted formats include documents, images, and certificates.
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4 py-4">
        {/* Control Selector (only when no initialControlId) */}
        {!initialControlId && (
          <div className="space-y-2">
            <Label htmlFor="control">Control *</Label>
            <Select
              value={selectedControlId.toString()}
              onValueChange={(value) => setSelectedControlId(Number(value))}
              disabled={isSubmitting}
            >
              <SelectTrigger id="control">
                <SelectValue placeholder="Select a control" />
              </SelectTrigger>
              <SelectContent>
                {controls.map((control) => (
                  <SelectItem key={control.id} value={control.id.toString()}>
                    {control.code} - {control.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

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
          disabled={isSubmitting || !fileName.trim() || (!initialControlId && !selectedControlId)}
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
    </>
  )

  // If using controlled open, just return the DialogContent wrapper
  if (controlledOpen !== undefined) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[500px]">{dialogContent}</DialogContent>
      </Dialog>
    )
  }

  // Otherwise, return with DialogTrigger
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Evidence
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">{dialogContent}</DialogContent>
    </Dialog>
  )
}
