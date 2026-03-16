import { Routes, Route } from 'react-router-dom'
import { LoginPage } from '@/routes/auth/login'
import { RegisterPage } from '@/routes/auth/register'
import { ForgotPasswordPage } from '@/routes/auth/forgot-password'
import { ResetPasswordPage } from '@/routes/auth/reset-password'
import { DashboardPage } from '@/routes/dashboard'
import { AssessmentsPage } from '@/routes/assessments'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/assessments" element={<AssessmentsPage />} />
        <Route path="*" element={<div className="p-8">404 - Not Found</div>} />
      </Routes>
    </div>
  )
}

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-certfast-700">
          CertFast
        </h1>
        <p className="text-lg text-muted-foreground">
          Compliance Made Simple
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <a
            href="/login"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white transition-colors bg-certfast-600 rounded-lg hover:bg-certfast-700"
          >
            Get Started
          </a>
          <a
            href="/register"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-colors border border-border rounded-lg hover:bg-accent"
          >
            Create Account
          </a>
        </div>
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
        <FeatureCard
          title="Automated Assessments"
          description="Streamline your compliance assessments with intelligent automation."
        />
        <FeatureCard
          title="Evidence Management"
          description="Centralize and organize all your compliance evidence in one place."
        />
        <FeatureCard
          title="Real-time Progress"
          description="Track compliance progress with intuitive dashboards and reports."
        />
      </div>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

export default App
