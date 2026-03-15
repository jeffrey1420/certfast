import { useEffect, useState } from 'react'
import { MetricCard } from './components/MetricCard'
import { ProgressBar } from './components/ProgressBar'
import { ActivityList } from './components/ActivityList'
import { QuickActions } from './components/QuickActions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, TrendingUp, Shield, FileCheck, Loader2 } from 'lucide-react'

// Mock data - will be replaced with API call
const mockMetrics = {
  complianceScore: 85,
  totalAssessments: 12,
  evidenceCount: 47,
  daysToCompliance: 45
}

const mockActivities = [
  { id: 1, type: 'assessment_completed' as const, title: 'ISO 27001 Assessment', description: 'All controls passed', time: '2h ago' },
  { id: 2, type: 'evidence_uploaded' as const, title: 'Evidence Uploaded', description: 'Firewall configuration uploaded', time: '4h ago' },
  { id: 3, type: 'control_reviewed' as const, title: 'Control Reviewed', description: 'Access control policy reviewed', time: '1d ago' },
  { id: 4, type: 'alert' as const, title: 'Action Required', description: 'Missing evidence for SOC 2', time: '1d ago' },
  { id: 5, type: 'deadline' as const, title: 'Deadline Approaching', description: 'Annual audit due in 30 days', time: '2d ago' }
]

interface DashboardMetrics {
  complianceScore: number
  totalAssessments: number
  evidenceCount: number
  daysToCompliance: number
}

interface Activity {
  id: number
  type: 'assessment_completed' | 'evidence_uploaded' | 'control_reviewed' | 'alert' | 'deadline'
  title: string
  description?: string
  time: string
}

export function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call - will be replaced with real API
    const fetchDashboardData = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/v1/dashboard/metrics')
        // const data = await response.json()
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        setMetrics(mockMetrics)
        setActivities(mockActivities)
      } catch (err) {
        setError('Failed to load dashboard data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !metrics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-destructive mb-2">{error || 'Failed to load dashboard'}</p>
          <button 
            onClick={() => window.location.reload()}
            className="text-primary hover:underline text-sm"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your compliance status and recent activity
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Compliance Score"
          value={`${metrics.complianceScore}%`}
          description="Overall compliance rating"
          icon={Shield}
          trend={{ value: 5, positive: true }}
        />
        <MetricCard
          title="Assessments"
          value={metrics.totalAssessments}
          description="Active compliance assessments"
          icon={Activity}
          trend={{ value: 2, positive: true }}
        />
        <MetricCard
          title="Evidence"
          value={metrics.evidenceCount}
          description="Evidence files uploaded"
          icon={FileCheck}
          trend={{ value: 12, positive: true }}
        />
        <MetricCard
          title="Days to Compliance"
          value={metrics.daysToCompliance}
          description="Estimated time to full compliance"
          icon={TrendingUp}
        />
      </div>

      {/* Progress Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Compliance Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <ProgressBar
            value={metrics.complianceScore}
            label="Overall Compliance Score"
            size="lg"
          />
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="font-semibold text-green-700">85%</p>
              <p className="text-green-600">Controls Passed</p>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <p className="font-semibold text-yellow-700">10%</p>
              <p className="text-yellow-600">In Progress</p>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <p className="font-semibold text-red-700">5%</p>
              <p className="text-red-600">Needs Attention</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityList activities={activities} />
        <QuickActions />
      </div>
    </div>
  )
}

export default DashboardPage
