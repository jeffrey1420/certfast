import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, FileText, User, Calendar, CheckCircle2, AlertCircle, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { usePolicyStore } from '@/stores'
import { Loader2 } from 'lucide-react'

const statusConfig = {
  draft: { label: 'Draft', variant: 'secondary' as const, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
  published: { label: 'Published', variant: 'default' as const, color: 'text-green-600', bgColor: 'bg-green-50' },
  archived: { label: 'Archived', variant: 'outline' as const, color: 'text-gray-600', bgColor: 'bg-gray-50' },
  deprecated: { label: 'Deprecated', variant: 'destructive' as const, color: 'text-red-600', bgColor: 'bg-red-50' },
}

const categoryColors: Record<string, string> = {
  'Security': 'bg-blue-100 text-blue-800',
  'Privacy': 'bg-purple-100 text-purple-800',
  'Governance': 'bg-green-100 text-green-800',
  'Risk': 'bg-orange-100 text-orange-800',
  'Compliance': 'bg-pink-100 text-pink-800',
  'HR': 'bg-red-100 text-red-800',
  'IT': 'bg-yellow-100 text-yellow-800',
  'Operations': 'bg-indigo-100 text-indigo-800',
}

export function PolicyDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { currentPolicy, isLoading, error, fetchPolicyById } = usePolicyStore()

  useEffect(() => {
    if (id) {
      void fetchPolicyById(id)
    }
  }, [id, fetchPolicyById])

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
        <Button variant="ghost" size="sm" onClick={() => navigate('/policies')} className="-ml-2 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Policies
        </Button>
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          <p>Error loading policy: {error}</p>
          <Button onClick={() => id && fetchPolicyById(id)} className="mt-2">
            Retry
          </Button>
        </div>
      </div>
    )
  }

  if (!currentPolicy) {
    return (
      <div className="p-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/policies')} className="-ml-2 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Policies
        </Button>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Policy not found</p>
        </div>
      </div>
    )
  }

  const statusStyle = statusConfig[currentPolicy.status]

  return (
    <div className="space-y-6 p-6">
      {/* Back Button */}
      <Button variant="ghost" size="sm" onClick={() => navigate('/policies')} className="-ml-2">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Policies
      </Button>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm text-muted-foreground">{currentPolicy.code}</span>
                <Badge variant={statusStyle.variant}>
                  {statusStyle.label}
                </Badge>
              </div>
              <h1 className="text-2xl font-bold tracking-tight">{currentPolicy.title}</h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[currentPolicy.category] || 'bg-gray-100 text-gray-800'}`}>
              {currentPolicy.category}
            </span>
            <span className="text-sm text-muted-foreground">
              Version {currentPolicy.version}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline">Edit Policy</Button>
          <Button>Download PDF</Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {currentPolicy.description}
              </p>
            </CardContent>
          </Card>

          {/* Policy Content */}
          {currentPolicy.content && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Policy Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  {currentPolicy.content}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Status Info */}
          <Card className={statusStyle.bgColor}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                {currentPolicy.status === 'published' ? (
                  <CheckCircle2 className={`h-6 w-6 ${statusStyle.color}`} />
                ) : currentPolicy.status === 'draft' ? (
                  <Clock className={`h-6 w-6 ${statusStyle.color}`} />
                ) : (
                  <AlertCircle className={`h-6 w-6 ${statusStyle.color}`} />
                )}
                <div>
                  <p className={`font-medium ${statusStyle.color}`}>
                    This policy is {currentPolicy.status}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {currentPolicy.status === 'published'
                      ? 'This policy is currently active and in effect.'
                      : currentPolicy.status === 'draft'
                      ? 'This policy is under review and not yet in effect.'
                      : 'This policy has been archived and is no longer in effect.'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Metadata */}
        <div className="space-y-6">
          {/* Policy Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Policy Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Code</span>
                <span className="font-medium font-mono">{currentPolicy.code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Version</span>
                <span className="font-medium">{currentPolicy.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium">{currentPolicy.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge variant={statusStyle.variant} className="text-xs">
                  {statusStyle.label}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Dates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Important Dates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {currentPolicy.effectiveDate && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Effective Date</span>
                  <span className="font-medium">
                    {new Date(currentPolicy.effectiveDate).toLocaleDateString()}
                  </span>
                </div>
              )}
              {currentPolicy.reviewDate && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Review Date</span>
                  <span className="font-medium">
                    {new Date(currentPolicy.reviewDate).toLocaleDateString()}
                  </span>
                </div>
              )}
              {currentPolicy.approvedAt && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Approved On</span>
                  <span className="font-medium">
                    {new Date(currentPolicy.approvedAt).toLocaleDateString()}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span className="font-medium">
                  {new Date(currentPolicy.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated</span>
                <span className="font-medium">
                  {new Date(currentPolicy.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Owner */}
          {currentPolicy.owner && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Policy Owner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {currentPolicy.owner.firstName[0]}{currentPolicy.owner.lastName[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">
                      {currentPolicy.owner.firstName} {currentPolicy.owner.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">{currentPolicy.owner.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Approved By */}
          {currentPolicy.approvedBy && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Approved By
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{currentPolicy.approvedBy}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default PolicyDetailPage
