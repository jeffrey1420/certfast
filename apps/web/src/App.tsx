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
import { VsVanta } from '@/pages/VsVanta';
import { VsDrata } from '@/pages/VsDrata';
import { CaseStudy } from '@/pages/CaseStudy';
import { About } from '@/pages/About';
import { Contact } from '@/pages/Contact';
import { Security } from '@/pages/Security';
import { Privacy } from '@/pages/Privacy';
import { Terms } from '@/pages/Terms';

function App() {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/vs-vanta" element={<VsVanta />} />
          <Route path="/vs-drata" element={<VsDrata />} />
          <Route path="/case-study/:slug" element={<CaseStudy />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/security" element={<Security />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
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
