import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MetricCard } from './components/MetricCard'
import { ProgressBar } from './components/ProgressBar'
import { ActivityList, type Activity } from './components/ActivityList'
import { QuickActions } from './components/QuickActions'
import {
  Shield,
  FileCheck,
  FolderOpen,
  Calendar,
  TrendingUp,
} from 'lucide-react'
import api from '@/lib/api'

interface DashboardMetrics {
  complianceScore: number
  totalAssessments: number
  evidenceCount: number
  daysToCompliance: number
  controlsMet: number
  controlsInProgress: number
  controlsPending: number
}

interface DashboardActivityResponse {
  id: number
  type: Activity['type']
  title: string
  description?: string
  occurredAt: string
}

function formatRelativeTime(occurredAt: string): string {
  const timestamp = new Date(occurredAt)
  if (Number.isNaN(timestamp.getTime())) {
    return 'Recently'
  }

  const diffMs = timestamp.getTime() - Date.now()
  const absDiffMs = Math.abs(diffMs)

  const minute = 60_000
  const hour = 60 * minute
  const day = 24 * hour

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

  if (absDiffMs < hour) {
    return rtf.format(Math.round(diffMs / minute), 'minute')
  }

  if (absDiffMs < day) {
    return rtf.format(Math.round(diffMs / hour), 'hour')
  }

  return rtf.format(Math.round(diffMs / day), 'day')
}

export function DashboardPage() {
  const navigate = useNavigate()
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    complianceScore: 0,
    totalAssessments: 0,
    evidenceCount: 0,
    daysToCompliance: 45,
    controlsMet: 0,
    controlsInProgress: 0,
    controlsPending: 0,
  })
  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(false)
  const [isLoadingActivity, setIsLoadingActivity] = useState(false)

  useEffect(() => {
    const fetchMetrics = async () => {
      setIsLoadingMetrics(true)
      try {
        const { data } = await api.get<DashboardMetrics>('/dashboard/metrics')
        setMetrics(data)
      } catch (error) {
        console.error('Failed to fetch dashboard metrics:', error)
      } finally {
        setIsLoadingMetrics(false)
      }
    }

    void fetchMetrics()
  }, [])

  useEffect(() => {
    const fetchActivity = async () => {
      setIsLoadingActivity(true)
      try {
        const { data } = await api.get<DashboardActivityResponse[]>('/dashboard/activity')
        setActivities(
          data.map((item) => ({
            id: item.id,
            type: item.type,
            title: item.title,
            description: item.description,
            time: formatRelativeTime(item.occurredAt),
          }))
        )
      } catch (error) {
        console.error('Failed to fetch dashboard activity:', error)
        setActivities([])
      } finally {
        setIsLoadingActivity(false)
      }
    }

    void fetchActivity()
  }, [])

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'new-assessment':
        navigate('/assessments/new')
        break
      case 'upload-evidence':
        navigate('/evidence/upload')
        break
      case 'view-reports':
        navigate('/reports')
        break
      case 'settings':
        navigate('/settings')
        break
    }
  }

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of your compliance status and recent activity
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Compliance Score"
          value={isLoadingMetrics ? '-' : `${metrics.complianceScore}%`}
          description="Overall framework compliance"
          icon={Shield}
          trend={{ value: 12, label: 'from last month' }}
        />
        <MetricCard
          title="Total Assessments"
          value={isLoadingMetrics ? '-' : metrics.totalAssessments}
          description="Active compliance assessments"
          icon={FileCheck}
          trend={{ value: 3, label: 'new this month' }}
        />
        <MetricCard
          title="Evidence Items"
          value={isLoadingMetrics ? '-' : metrics.evidenceCount}
          description="Uploaded compliance documents"
          icon={FolderOpen}
          trend={{ value: 8, label: 'from last week' }}
        />
        <MetricCard
          title="Days to Compliance"
          value={isLoadingMetrics ? '-' : metrics.daysToCompliance}
          description="Estimated completion time"
          icon={Calendar}
        />
      </div>

      {/* Progress Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">Compliance Progress</h2>
                <p className="text-sm text-muted-foreground">
                  Track your journey toward full certification
                </p>
              </div>
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </div>

            <ProgressBar
              value={metrics.complianceScore}
              max={100}
              label="Overall Compliance"
              size="lg"
              className="mt-4"
            />

            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
              <div className="text-center">
                <p className="text-2xl font-bold">
                  {isLoadingMetrics ? '-' : metrics.controlsMet}
                </p>
                <p className="text-xs text-muted-foreground">Controls Met</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">
                  {isLoadingMetrics ? '-' : metrics.controlsInProgress}
                </p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">
                  {isLoadingMetrics ? '-' : metrics.controlsPending}
                </p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <QuickActions onActionClick={handleQuickAction} />
        </div>
      </div>

      {/* Activity Feed */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ActivityList activities={isLoadingActivity ? [] : activities} />

        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Upcoming Deadlines</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">SOC 2 Type I Audit</p>
                <p className="text-sm text-muted-foreground">External audit scheduled</p>
              </div>
              <span className="text-sm font-medium text-orange-600">15 days</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">ISO 27001 Recertification</p>
                <p className="text-sm text-muted-foreground">Annual review due</p>
              </div>
              <span className="text-sm font-medium text-green-600">45 days</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">GDPR Compliance Review</p>
                <p className="text-sm text-muted-foreground">Quarterly assessment</p>
              </div>
              <span className="text-sm font-medium text-yellow-600">30 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
