import { useState, useEffect } from 'react'
import { MainContent } from '@/components/layout'
import { MetricCard } from './components/MetricCard'
import { ProgressBar } from './components/ProgressBar'
import { ActivityList } from './components/ActivityList'
import { QuickActions } from './components/QuickActions'
import { Shield, ClipboardCheck, FileText, Calendar, TrendingUp } from 'lucide-react'
import { toast } from 'sonner'

// Mock data for now (API not ready)
interface DashboardMetrics {
  complianceScore: number
  totalAssessments: number
  evidenceCount: number
  daysToCompliance: number
}

interface Activity {
  id: number
  type: 'assessment_completed' | 'evidence_uploaded' | 'control_approved' | 'compliance_alert' | 'task_assigned'
  title: string
  description?: string
  time: string
}

const mockMetrics: DashboardMetrics = {
  complianceScore: 85,
  totalAssessments: 12,
  evidenceCount: 47,
  daysToCompliance: 45
}

const mockActivities: Activity[] = [
  {
    id: 1,
    type: 'assessment_completed',
    title: 'ISO 27001 Assessment',
    description: 'All controls have been reviewed',
    time: '2h ago'
  },
  {
    id: 2,
    type: 'evidence_uploaded',
    title: 'Policy Document',
    description: 'Information Security Policy v2.0',
    time: '4h ago'
  },
  {
    id: 3,
    type: 'control_approved',
    title: 'Access Control Review',
    description: 'Approved by Compliance Officer',
    time: '1d ago'
  },
  {
    id: 4,
    type: 'compliance_alert',
    title: 'Upcoming Audit',
    description: 'External audit scheduled in 30 days',
    time: '2d ago'
  },
  {
    id: 5,
    type: 'task_assigned',
    title: 'Risk Assessment',
    description: 'Assigned to John Smith',
    time: '3d ago'
  }
]

export function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics>(mockMetrics)
  const [activities] = useState<Activity[]>(mockActivities)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch metrics from API (with fallback to mock)
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/v1/dashboard/metrics')
        if (response.ok) {
          const data = await response.json()
          setMetrics(data)
        }
      } catch {
        // Fallback to mock data already set
        console.log('Using mock dashboard data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMetrics()
  }, [])

  if (isLoading) {
    return (
      <MainContent>
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse text-muted-foreground">Loading dashboard...</div>
        </div>
      </MainContent>
    )
  }

  return (
    <MainContent>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's your compliance overview.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <MetricCard
          title="Compliance Score"
          value={`${metrics.complianceScore}%`}
          description="Overall compliance status"
          icon={Shield}
          trend={{ value: 12, isPositive: true }}
        />
        <MetricCard
          title="Total Assessments"
          value={metrics.totalAssessments}
          description="Active and completed"
          icon={ClipboardCheck}
        />
        <MetricCard
          title="Evidence Items"
          value={metrics.evidenceCount}
          description="Uploaded documents"
          icon={FileText}
          trend={{ value: 8, isPositive: true }}
        />
        <MetricCard
          title="Days to Compliance"
          value={metrics.daysToCompliance}
          description="Target: ISO 27001 certification"
          icon={Calendar}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Progress Bar */}
        <div className="lg:col-span-2 space-y-6">
          <ProgressBar
            title="Compliance Progress"
            value={metrics.complianceScore}
            max={100}
            description={`You're ${metrics.complianceScore}% compliant with ISO 27001 requirements. Keep up the good work!`}
          />
          
          {/* Additional Stats Row */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                <span>Completed</span>
              </div>
              <div className="text-2xl font-bold mt-1">8/12</div>
              <div className="text-xs text-muted-foreground">Assessments done</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>Pending</span>
              </div>
              <div className="text-2xl font-bold mt-1">4</div>
              <div className="text-xs text-muted-foreground">Items need attention</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>Score</span>
              </div>
              <div className="text-2xl font-bold mt-1">A-</div>
              <div className="text-xs text-muted-foreground">Current grade</div>
            </div>
          </div>
        </div>

        {/* Right Column - Quick Actions & Activity */}
        <div className="space-y-6">
          <QuickActions />
          <ActivityList activities={activities} />
        </div>
      </div>
    </MainContent>
  )
}

export default DashboardPage
