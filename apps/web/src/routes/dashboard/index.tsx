import { Layout } from '@/components/layout/layout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { MetricCard } from './components/MetricCard'
import { ProgressBar } from './components/ProgressBar'
import { ActivityList } from './components/ActivityList'
import { QuickActions } from './components/QuickActions'
import { Shield, ClipboardCheck, FileCheck, Calendar, TrendingUp } from 'lucide-react'

// Mock data for now (API not ready)
const metrics = {
  complianceScore: 85,
  totalAssessments: 12,
  evidenceCount: 47,
  daysToCompliance: 45
}

const activities = [
  { 
    id: 1, 
    type: 'assessment_completed' as const, 
    title: 'ISO 27001 Assessment', 
    description: 'All controls verified successfully',
    time: '2h ago' 
  },
  { 
    id: 2, 
    type: 'evidence_uploaded' as const, 
    title: 'Security Policy Document', 
    description: 'Uploaded by John Doe',
    time: '4h ago' 
  },
  { 
    id: 3, 
    type: 'control_verified' as const, 
    title: 'Access Control Policy', 
    description: 'Control AC-001 approved',
    time: '6h ago' 
  },
  { 
    id: 4, 
    type: 'deadline_approaching' as const, 
    title: 'SOC 2 Audit Due', 
    description: 'Due in 7 days',
    time: '1d ago' 
  },
  { 
    id: 5, 
    type: 'issue_detected' as const, 
    title: 'Missing Evidence', 
    description: '3 controls require evidence',
    time: '2d ago' 
  },
]

export function DashboardPage() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's your compliance overview.
          </p>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Compliance Score"
            value={`${metrics.complianceScore}%`}
            icon={Shield}
            color="green"
            trend={{ value: 5.2, label: 'from last month' }}
          />
          <MetricCard
            title="Total Assessments"
            value={metrics.totalAssessments}
            icon={ClipboardCheck}
            color="blue"
            trend={{ value: 2, label: 'new this week' }}
          />
          
003cMetricCard
            title="Evidence Items"
            value={metrics.evidenceCount}
            icon={FileCheck}
            color="purple"
            trend={{ value: 12, label: 'uploaded this week' }}
          />
          <MetricCard
            title="Days to Compliance"
            value={metrics.daysToCompliance}
            icon={Calendar}
            color="amber"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Progress & Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Compliance Progress */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Compliance Progress</CardTitle>
                    <CardDescription>
                      Overall compliance readiness across all frameworks
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2 text-green-600 bg-green-100 px-3 py-1 rounded-full">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">On Track</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Overall Compliance</span>
                      <span className="text-2xl font-bold">{metrics.complianceScore}%</span>
                    </div>
                    <ProgressBar 
                      value={metrics.complianceScore} 
                      size="lg" 
                      showLabel={false}
                      color="green"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">ISO 27001</p>
                      <p className="text-lg font-semibold">92%</p>
                      <ProgressBar value={92} size="sm" showLabel={false} color="blue" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">SOC 2</p>
                      <p className="text-lg font-semibold">78%</p>
                      <ProgressBar value={78} size="sm" showLabel={false} color="amber" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">GDPR</p>
                      <p className="text-lg font-semibold">85%</p>
                      <ProgressBar value={85} size="sm" showLabel={false} color="green" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <ActivityList activities={activities} />
          </div>

          {/* Right Column - Quick Actions */}
          <div>
            <QuickActions />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default DashboardPage
