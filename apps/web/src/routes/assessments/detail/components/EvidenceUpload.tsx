import { useState, useCallback } from 'react'
import { Upload, X, FileText, Image, File } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface EvidenceFile {
  id: string
  name: string
  size: number
  type: string
  uploadedAt: string
}

interface EvidenceUploadProps {
  files: EvidenceFile[]
  onUpload: () => void
  onRemove: (fileId: string) => void
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const getFileIcon = (type: string) => {
  if (type.startsWith('image/')) return Image
  if (type.includes('pdf') || type.includes('document')) return FileText
  return File
}

export function EvidenceUpload({ files, onUpload, onRemove }: EvidenceUploadProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    // Open the upload dialog - actual file handling is done in the dialog
    onUpload()
  }, [onUpload])

  const handleClick = () => {
    // Open the upload dialog
    onUpload()
  }

  return (
    <div className="space-y-4">
      {/* Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
          ${isDragging 
            ? 'border-primary bg-primary/5' 
            : 'border-muted-foreground/25 hover:border-muted-foreground/50'
          }
        `}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="p-3 rounded-full bg-primary/10">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="font-medium">Click to upload evidence</p>
            <p className="text-sm text-muted-foreground mt-1">
              or drag and drop files here
            </p>
          </div>
          <Button variant="outline" size="sm" className="mt-2" asChild>
            <span>Select Files</span>
          </Button>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h5 className="text-sm font-medium">Uploaded Files ({files.length})</h5>
          <div className="space-y-2">
            {files.map((file) => {
              const FileIcon = getFileIcon(file.type)
              return (
                <div
                  key={file.id}
                  className="flex items-center gap-3 p-3 border rounded-lg bg-accent/50"
                >
                  <div className="p-2 rounded bg-background">
                    <FileIcon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)} • Uploaded {file.uploadedAt}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation()
                      onRemove(file.id)
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Supported formats hint */}
      <p className="text-xs text-muted-foreground">
        Supported formats: PDF, Word, Excel, Images (PNG, JPG), Text files
      </p>
    </div>
  )
}
