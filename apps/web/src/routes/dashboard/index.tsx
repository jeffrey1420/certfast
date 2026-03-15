import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Activity, TrendingUp, Shield, FileCheck } from 'lucide-react';
import { MetricCard } from './components/MetricCard';
import { ProgressBar } from './components/ProgressBar';
import { ActivityList } from './components/ActivityList';
import { QuickActions } from './components/QuickActions';

// Mock data for now (API not ready)
const metrics = {
  complianceScore: 85,
  totalAssessments: 12,
  evidenceCount: 47,
  daysToCompliance: 45
};

const activities = [
  { id: 1, type: 'assessment_completed', title: 'ISO 27001 Assessment', time: '2h ago' },
  { id: 2, type: 'evidence_uploaded', title: 'Policy Document Uploaded', time: '4h ago' },
  { id: 3, type: 'control_passed', title: 'Access Control Passed', time: '6h ago' },
  { id: 4, type: 'assessment_started', title: 'SOC 2 Assessment Started', time: '1d ago' },
  { id: 5, type: 'evidence_uploaded', title: 'Audit Trail Uploaded', time: '2d ago' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back! Here's your compliance overview.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Compliance Score"
          value={`${metrics.complianceScore}%`}
          description="Overall compliance rating"
          icon={<Shield className="h-4 w-4 text-muted-foreground" />}
          trend="+5% from last month"
          trendUp={true}
        />
        <MetricCard
          title="Assessments"
          value={metrics.totalAssessments}
          description="Active assessments"
          icon={<FileCheck className="h-4 w-4 text-muted-foreground" />}
          trend="3 pending review"
          trendUp={null}
        />
        <MetricCard
          title="Evidence"
          value={metrics.evidenceCount}
          description="Files uploaded"
          icon={<Activity className="h-4 w-4 text-muted-foreground" />}
          trend="+12 this week"
          trendUp={true}
        />
        <MetricCard
          title="Days Remaining"
          value={metrics.daysToCompliance}
          description="Until compliance deadline"
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          trend="On track"
          trendUp={true}
        />
      </div>

      {/* Progress and Activity */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Compliance Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ProgressBar 
              value={metrics.complianceScore} 
              label="Overall Compliance"
              description={`${metrics.complianceScore}% completed`}
            />
            <ProgressBar 
              value={72} 
              label="ISO 27001"
              description="8 of 14 controls passed"
            />
            <ProgressBar 
              value={45} 
              label="SOC 2 Type II"
              description="9 of 20 controls passed"
            />
            <ProgressBar 
              value={90} 
              label="GDPR"
              description="18 of 20 controls passed"
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityList activities={activities} />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <QuickActions />
        </CardContent>
      </Card>
    </div>
  );
}
