import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Shield, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useControlStore } from '@/stores'
import { Loader2 } from 'lucide-react'

const statusConfig = {
  draft: { label: 'Draft', variant: 'secondary' as const, description: 'This control is in draft status and not yet active' },
  active: { label: 'Active', variant: 'default' as const, description: 'This control is currently active and should be implemented' },
  archived: { label: 'Archived', variant: 'outline' as const, description: 'This control has been archived and is no longer in use' },
  deprecated: { label: 'Deprecated', variant: 'destructive' as const, description: 'This control is deprecated and will be removed' },
}

const categoryColors: Record<string, string> = {
  'Governance': 'bg-blue-100 text-blue-800',
  'Risk Management': 'bg-purple-100 text-purple-800',
  'Asset Management': 'bg-green-100 text-green-800',
  'Access Control': 'bg-orange-100 text-orange-800',
  'Cryptography': 'bg-pink-100 text-pink-800',
  'Physical Security': 'bg-red-100 text-red-800',
  'Operations Security': 'bg-yellow-100 text-yellow-800',
  'Communications Security': 'bg-indigo-100 text-indigo-800',
  'System Acquisition': 'bg-teal-100 text-teal-800',
  'Supplier Relationships': 'bg-cyan-100 text-cyan-800',
  'Incident Management': 'bg-rose-100 text-rose-800',
  'Business Continuity': 'bg-emerald-100 text-emerald-800',
  'Compliance': 'bg-slate-100 text-slate-800',
}

export function ControlDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { currentControl, isLoading, error, fetchControlById } = useControlStore()

  useEffect(() => {
    if (id) {
      void fetchControlById(id)
    }
  }, [id, fetchControlById])

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
        <Button variant="ghost" size="sm" onClick={() => navigate('/controls')} className="-ml-2 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Controls
        </Button>
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          <p>Error loading control: {error}</p>
          <Button onClick={() => id && fetchControlById(id)} className="mt-2">
            Retry
          </Button>
        </div>
      </div>
    )
  }

  if (!currentControl) {
    return (
      <div className="p-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/controls')} className="-ml-2 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Controls
        </Button>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Control not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Back Button */}
      <Button variant="ghost" size="sm" onClick={() => navigate('/controls')} className="-ml-2">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Controls
      </Button>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm text-muted-foreground">{currentControl.code}</span>
                <Badge variant={statusConfig[currentControl.status].variant}>
                  {statusConfig[currentControl.status].label}
                </Badge>
              </div>
              <h1 className="text-2xl font-bold tracking-tight">{currentControl.title}</h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[currentControl.category] || 'bg-gray-100 text-gray-800'}`}>
              {currentControl.category}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline">Add to Assessment</Button>
          <Button>Mark as Implemented</Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description Card */}
          {currentControl.description && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {currentControl.description}
                </p>
              </CardContent>
            </Card>
          )}

          {!currentControl.description && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm italic">
                  No description available for this control.
                </p>
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
              <Badge variant={statusConfig[currentControl.status].variant} className="text-sm">
                {statusConfig[currentControl.status].label}
              </Badge>
              <p className="text-sm text-muted-foreground">
                {statusConfig[currentControl.status].description}
              </p>
            </CardContent>
          </Card>

          {/* Control Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Control Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Code</span>
                <span className="font-medium font-mono">{currentControl.code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium">{currentControl.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span className="font-medium">
                  {new Date(currentControl.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated</span>
                <span className="font-medium">
                  {new Date(currentControl.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ControlDetailPage
