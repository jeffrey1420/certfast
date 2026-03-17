import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LoginPage } from '@/routes/auth/login';
import { RegisterPage } from '@/routes/auth/register';
import { ForgotPasswordPage } from '@/routes/auth/forgot-password';
import { ResetPasswordPage } from '@/routes/auth/reset-password';
import { DashboardPage } from '@/routes/dashboard';
import { AssessmentsPage } from '@/routes/assessments';
import { CreateAssessmentPage } from '@/routes/assessments/new';
import { AssessmentDetailPage } from '@/routes/assessments/detail';
import { ControlsPage } from '@/routes/controls';
import { ControlDetailPage } from '@/routes/controls/detail';
import { PoliciesPage } from '@/routes/policies';
import { PolicyDetailPage } from '@/routes/policies/detail';
import { Home } from '@/pages/Home';
import { Blog } from '@/pages/Blog';
import { BlogPost } from '@/pages/BlogPost';

function App() {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/assessments" element={<AssessmentsPage />} />
          <Route path="/assessments/new" element={<CreateAssessmentPage />} />
          <Route path="/assessments/:id" element={<AssessmentDetailPage />} />
          <Route path="/controls" element={<ControlsPage />} />
          <Route path="/controls/:id" element={<ControlDetailPage />} />
          <Route path="/policies" element={<PoliciesPage />} />
          <Route path="/policies/:id" element={<PolicyDetailPage />} />
          <Route path="*" element={<div className="p-8">404 - Not Found</div>} />
        </Routes>
      </div>
    </HelmetProvider>
  );
}

export default App
