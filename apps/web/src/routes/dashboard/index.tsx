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

// Mock data - will be replaced with API call
const mockMetrics = {
  complianceScore: 85,
  totalAssessments: 12,
  evidenceCount: 47,
  daysToCompliance: 45,
}

const mockActivities: Activity[] = [
  {
    id: 1,
    type: 'assessment_completed',
    title: 'ISO 27001 Assessment',
    description: 'All controls reviewed and approved',
    time: '2h ago',
  },
  {
    id: 2,
    type: 'evidence_uploaded',
    title: 'Security Policy Document',
    description: 'Uploaded to SOC 2 Control A1.2',
    time: '4h ago',
  },
  {
    id: 3,
    type: 'control_approved',
    title: 'Access Control Review',
    description: 'Approved by Security Lead',
    time: '1d ago',
  },
  {
    id: 4,
    type: 'deadline_approaching',
    title: 'SOC 2 Audit Due',
    description: 'Complete remaining 5 controls',
    time: '2d ago',
  },
  {
    id: 5,
    type: 'audit_scheduled',
    title: 'Quarterly Compliance Review',
    description: 'Scheduled for March 25, 2026',
    time: '3d ago',
  },
]

interface DashboardMetrics {
  complianceScore: number
  totalAssessments: number
  evidenceCount: number
  daysToCompliance: number
}

export function DashboardPage() {
  const navigate = useNavigate()
  const [metrics, setMetrics] = useState<DashboardMetrics>(mockMetrics)
  const [activities, setActivities] = useState<Activity[]>(mockActivities)
  const [isLoading, setIsLoading] = useState(false)

  // TODO: Replace with actual API call when ready
  // useEffect(() => {
  //   const fetchMetrics = async () => {
  //     setIsLoading(true)
  //     try {
  //       const response = await fetch('/api/v1/dashboard/metrics')
  //       if (!response.ok) throw new Error('Failed to fetch metrics')
  //       const data = await response.json()
  //       setMetrics(data)
  //     } catch (error) {
  //       console.error('Failed to fetch dashboard metrics:', error)
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }
  //   fetchMetrics()
  // }, [])

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
      default:
        console.log('Action clicked:', actionId)
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
          value={`${metrics.complianceScore}%`}
          description="Overall framework compliance"
          icon={Shield}
          trend={{ value: 12, label: 'from last month' }}
        />
        <MetricCard
          title="Total Assessments"
          value={metrics.totalAssessments}
          description="Active compliance assessments"
          icon={FileCheck}
          trend={{ value: 3, label: 'new this month' }}
        />
        <MetricCard
          title="Evidence Items"
          value={metrics.evidenceCount}
          description="Uploaded compliance documents"
          icon={FolderOpen}
          trend={{ value: 8, label: 'from last week' }}
        />
        <MetricCard
          title="Days to Compliance"
          value={metrics.daysToCompliance}
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
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-muted-foreground">Controls Met</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">1</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <QuickActions
            onActionClick={handleQuickAction}
          />
        </div>
      </div>

      {/* Activity Feed */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ActivityList activities={activities} />
        
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
