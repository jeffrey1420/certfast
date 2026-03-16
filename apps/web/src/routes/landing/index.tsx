import { Helmet } from "react-helmet-async";
import {
  Hero,
  Features,
  Pricing,
  CTA,
} from "@/components/landing";
import { BlogHeader } from "@/components/blog/BlogHeader";

export function LandingPage() {
  return (
    <>
      <Helmet>
        <title>CertFast - SOC 2 Compliance in 90 Days | 5x Cheaper Than Vanta</title>
        <meta
          name="description"
          content="Automate SOC 2, ISO 27001, and GDPR compliance for your startup. Get certified in 90 days for €199/month. No consultants needed."
        />
        <meta
          property="og:title"
          content="CertFast - Compliance Automation for Startups"
        />
        <meta
          property="og:description"
          content="Get SOC 2 certified in 90 days for 5x less than Vanta"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CertFast - SOC 2 in 90 Days" />
        <meta
          name="twitter:description"
          content="Compliance automation for European startups. 5x cheaper than Vanta."
        />
      </Helmet>

      <div className="min-h-screen">
        <BlogHeader />
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
                <h4 className="text-white font-semibold mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
                  <li><a href="/assessments" className="hover:text-white transition-colors">Assessments</a></li>
                  <li><a href="/controls" className="hover:text-white transition-colors">Controls</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm">© 2024 CertFast. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
