import './i18n';
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Lazy load all route components for code splitting
const LoginPage = lazy(() => import('@/routes/auth/login').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('@/routes/auth/register').then(m => ({ default: m.RegisterPage })));
const ForgotPasswordPage = lazy(() => import('@/routes/auth/forgot-password').then(m => ({ default: m.ForgotPasswordPage })));
const ResetPasswordPage = lazy(() => import('@/routes/auth/reset-password').then(m => ({ default: m.ResetPasswordPage })));
const DashboardPage = lazy(() => import('@/routes/dashboard').then(m => ({ default: m.DashboardPage })));
const AssessmentsPage = lazy(() => import('@/routes/assessments').then(m => ({ default: m.AssessmentsPage })));
const CreateAssessmentPage = lazy(() => import('@/routes/assessments/new').then(m => ({ default: m.CreateAssessmentPage })));
const AssessmentDetailPage = lazy(() => import('@/routes/assessments/detail').then(m => ({ default: m.AssessmentDetailPage })));
const ControlsPage = lazy(() => import('@/routes/controls').then(m => ({ default: m.ControlsPage })));
const ControlDetailPage = lazy(() => import('@/routes/controls/detail').then(m => ({ default: m.ControlDetailPage })));
const PoliciesPage = lazy(() => import('@/routes/policies').then(m => ({ default: m.PoliciesPage })));
const PolicyDetailPage = lazy(() => import('@/routes/policies/detail').then(m => ({ default: m.PolicyDetailPage })));
const EvidencePage = lazy(() => import('@/routes/evidence').then(m => ({ default: m.EvidencePage })));
const EvidenceDetailPage = lazy(() => import('@/routes/evidence/detail').then(m => ({ default: m.EvidenceDetailPage })));
const Home = lazy(() => import('@/pages/Home').then(m => ({ default: m.Home })));
const Blog = lazy(() => import('@/pages/Blog').then(m => ({ default: m.Blog })));
const BlogPost = lazy(() => import('@/pages/BlogPost').then(m => ({ default: m.BlogPost })));
const VsVanta = lazy(() => import('@/pages/VsVanta').then(m => ({ default: m.VsVanta })));
const VsDrata = lazy(() => import('@/pages/VsDrata').then(m => ({ default: m.VsDrata })));
const CaseStudy = lazy(() => import('@/pages/CaseStudy').then(m => ({ default: m.CaseStudy })));
const About = lazy(() => import('@/pages/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('@/pages/Contact').then(m => ({ default: m.Contact })));
const Security = lazy(() => import('@/pages/Security').then(m => ({ default: m.Security })));
const Privacy = lazy(() => import('@/pages/Privacy').then(m => ({ default: m.Privacy })));
const Terms = lazy(() => import('@/pages/Terms').then(m => ({ default: m.Terms })));
const Cookies = lazy(() => import('@/pages/Cookies').then(m => ({ default: m.Cookies })));

// Simple loading fallback
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-background">
        <Suspense fallback={<LoadingFallback />}>
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
            <Route path="/cookies" element={<Cookies />} />
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
            <Route path="/evidence" element={<EvidencePage />} />
            <Route path="/evidence/:id" element={<EvidenceDetailPage />} />
            <Route path="*" element={<div className="p-8">404 - Not Found</div>} />
          </Routes>
        </Suspense>
      </div>
    </HelmetProvider>
  );
}

export default App
