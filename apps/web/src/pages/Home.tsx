import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Shield, BookOpen } from 'lucide-react';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { Pricing } from '@/components/landing/Pricing';
import { CTA } from '@/components/landing/CTA';

export function Home() {
  return (
    <>
      <Helmet>
        <title>CertFast - Compliance Automation Platform | SOC 2, ISO 27001, GDPR</title>
        <meta
          name="description"
          content="CertFast streamlines your SOC 2, ISO 27001, and GDPR compliance journey. Automate evidence collection, track controls, and pass audits with confidence."
        />
        <meta
          property="og:title"
          content="CertFast - Compliance Automation Platform"
        />
        <meta
          property="og:description"
          content="Streamline your compliance journey with automated evidence collection and control management."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://certfast.io" />
        <meta property="og:image" content="https://certfast.io/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://certfast.io" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'CertFast',
            applicationCategory: 'BusinessApplication',
            description:
              'Compliance automation platform for SOC 2, ISO 27001, and GDPR.',
            offers: {
              '@type': 'Offer',
              price: '99',
              priceCurrency: 'USD',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              ratingCount: '500',
            },
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Link to="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-certfast-600">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">CertFast</span>
              </Link>

              <div className="hidden md:flex items-center gap-8">
                <Link
                  to="/blog"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1"
                >
                  <BookOpen className="h-4 w-4" />
                  Blog
                </Link>
                <a
                  href="#features"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Pricing
                </a>
                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Product
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="hidden md:block text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center rounded-lg bg-certfast-600 px-4 py-2 text-sm font-medium text-white hover:bg-certfast-700 transition-colors"
                >
                  Get started
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main>
          <Hero />
          <Features />
          <Pricing />
          <CTA />
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-certfast-600">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-lg font-bold text-white">CertFast</span>
                </div>
                <p className="text-sm text-gray-400">
                  Compliance automation that actually works.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Product</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/dashboard" className="hover:text-white transition-colors">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/assessments" className="hover:text-white transition-colors">
                      Assessments
                    </Link>
                  </li>
                  <li>
                    <Link to="/controls" className="hover:text-white transition-colors">
                      Controls
                    </Link>
                  </li>
                  <li>
                    <Link to="/policies" className="hover:text-white transition-colors">
                      Policies
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/blog" className="hover:text-white transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      API Reference
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/about" className="hover:text-white transition-colors">
                      About
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Careers
                    </a>
                  </li>
                  <li>
                    <Link to="/contact" className="hover:text-white transition-colors">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm">© 2024 CertFast. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Twitter
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  LinkedIn
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
