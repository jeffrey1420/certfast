import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, FileText, Download, ExternalLink, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEvidenceStore, useControlStore } from '@/stores'
import { Loader2 } from 'lucide-react'

const statusConfig = {
  pending: { 
    label: 'Pending Review', 
    variant: 'secondary' as const, 
    icon: Clock,
    description: 'This evidence is awaiting review'
  },
  approved: { 
    label: 'Approved', 
    variant: 'default' as const, 
    icon: CheckCircle,
    description: 'This evidence has been approved'
  },
  rejected: { 
    label: 'Rejected', 
    variant: 'destructive' as const, 
    icon: XCircle,
    description: 'This evidence has been rejected'
  },
  needs_review: { 
    label: 'Needs Review', 
    variant: 'outline' as const, 
    icon: AlertCircle,
    description: 'This evidence requires additional review'
  },
}

const fileTypeIcons: Record<string, string> = {
  'application/pdf': '📄',
  'image/png': '🖼️',
  'image/jpeg': '🖼️',
  'image/jpg': '🖼️',
  'text/plain': '📝',
  'application/msword': '📘',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '📘',
  'application/vnd.ms-excel': '📗',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '📗',
}

function formatFileSize(bytes: number | null): string {
  if (bytes === null) return 'Unknown size'
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function getFileIcon(fileType: string): string {
  return fileTypeIcons[fileType] || '📎'
}

export function EvidenceDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { currentEvidence, isLoading, error, fetchEvidenceById, updateEvidence } = useEvidenceStore()
  const { currentControl, fetchControlById } = useControlStore()
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateError, setUpdateError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      void fetchEvidenceById(Number(id))
    }
  }, [id, fetchEvidenceById])

  // Fetch control info when evidence is loaded
  useEffect(() => {
    if (currentEvidence?.controlId) {
      void fetchControlById(String(currentEvidence.controlId))
    }
  }, [currentEvidence?.controlId, fetchControlById])

  const handleApprove = async () => {
    if (!currentEvidence) return
    
    setIsUpdating(true)
    setUpdateError(null)
    const result = await updateEvidence(currentEvidence.id, { status: 'approved' })
    setIsUpdating(false)
    
    if (!result) {
      setUpdateError('Failed to approve evidence. Please try again.')
    }
  }

  const handleReject = async () => {
    if (!currentEvidence) return
    
    setIsUpdating(true)
    setUpdateError(null)
    const result = await updateEvidence(currentEvidence.id, { status: 'rejected' })
    setIsUpdating(false)
    
    if (!result) {
      setUpdateError('Failed to reject evidence. Please try again.')
    }
  }

  const handleViewFile = () => {
    if (currentEvidence?.fileUrl) {
      window.open(currentEvidence.fileUrl, '_blank')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/evidence')} className="-ml-2 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Evidence
        </Button>
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          <p>Error loading evidence: {error}</p>
          <Button onClick={() => id && fetchEvidenceById(Number(id))} className="mt-2">
            Retry
          </Button>
        </div>
      </div>
    )
  }

  if (!currentEvidence) {
    return (
      <div className="p-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/evidence')} className="-ml-2 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Evidence
        </Button>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Evidence not found</p>
        </div>
      </div>
    )
  }

  const StatusIcon = statusConfig[currentEvidence.status].icon
  const isReviewed = currentEvidence.status === 'approved' || currentEvidence.status === 'rejected'

  return (
    <div className="space-y-6 p-6">
      {/* Back Button */}
      <Button variant="ghost" size="sm" onClick={() => navigate('/evidence')} className="-ml-2">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Evidence
      </Button>

      {/* Update Error */}
      {updateError && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          <p>{updateError}</p>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-2xl">
              {getFileIcon(currentEvidence.fileType)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Badge variant={statusConfig[currentEvidence.status].variant}>
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {statusConfig[currentEvidence.status].label}
                </Badge>
              </div>
              <h1 className="text-2xl font-bold tracking-tight">{currentEvidence.fileName}</h1>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {formatFileSize(currentEvidence.fileSize)} • {currentEvidence.fileType}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleViewFile}>
            <ExternalLink className="h-4 w-4 mr-2" />
            View File
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description Card */}
          {currentEvidence.description ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {currentEvidence.description}
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm italic">
                  No description provided for this evidence.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Review Actions */}
          {!isReviewed && (
            <Card>
              <CardHeader>
                <CardTitle>Review Evidence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Button 
                    onClick={handleApprove}
                    disabled={isUpdating}
                    variant="default"
                  >
                    {isUpdating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </>
                    )}
                  </Button>
                  <Button 
                    onClick={handleReject}
                    disabled={isUpdating}
                    variant="outline"
                    className="border-destructive text-destructive hover:bg-destructive/10"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Metadata */}
        <div className="space-y-6">
          {/* Status Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Badge variant={statusConfig[currentEvidence.status].variant} className="text-sm">
                <StatusIcon className="h-3 w-3 mr-1" />
                {statusConfig[currentEvidence.status].label}
              </Badge>
              <p className="text-sm text-muted-foreground">
                {statusConfig[currentEvidence.status].description}
              </p>
            </CardContent>
          </Card>

          {/* Linked Control */}
          {currentControl && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Linked Control</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div 
                  className="p-3 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors"
                  onClick={() => navigate(`/controls/${currentControl.id}`)}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{currentControl.code}</span>
                  </div>
                  <p className="font-medium text-sm mt-1">{currentControl.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{currentControl.category}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Evidence Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Evidence Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">File Type</span>
                <span className="font-medium">{currentEvidence.fileType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">File Size</span>
                <span className="font-medium">{formatFileSize(currentEvidence.fileSize)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Uploaded</span>
                <span className="font-medium">
                  {new Date(currentEvidence.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated</span>
                <span className="font-medium">
                  {new Date(currentEvidence.updatedAt).toLocaleDateString()}
                </span>
              </div>
              {currentEvidence.reviewedAt && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reviewed</span>
                  <span className="font-medium">
                    {new Date(currentEvidence.reviewedAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default EvidenceDetailPage
