import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Shield, FileText } from 'lucide-react';

export function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | CertFast</title>
        <meta
          name="description"
          content="CertFast Privacy Policy - Learn how we collect, use, and protect your personal data in compliance with GDPR."
        />
        <meta property="og:title" content="Privacy Policy | CertFast" />
        <meta
          property="og:description"
          content="Learn how CertFast collects, uses, and protects your personal data."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://certfast.io/privacy" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
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
                  className="text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Blog
                </Link>
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

        {/* Legal Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-certfast-100">
                <FileText className="h-5 w-5 text-certfast-600" />
              </div>
              <span className="text-sm font-medium text-certfast-600 uppercase tracking-wide">
                Legal
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-600">
              Last updated: <strong>17 March 2026</strong>
            </p>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-gray-200">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex gap-6 -mb-px">
              <Link
                to="/privacy"
                className="py-4 text-sm font-medium text-certfast-600 border-b-2 border-certfast-600"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="py-4 text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className="py-4 text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Content */}
        <main className="py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <article className="prose prose-lg max-w-none">
              {/* Introduction */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
                <p className="text-gray-600 leading-relaxed">
                  CertFast ("we", "our", "us") is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, store, and protect your 
                  personal data when you use our compliance automation platform 
                  (the "Service").
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  CertFast is operated by [Company Name], a company registered in France. 
                  We act as the data controller for the personal data we process in 
                  connection with our Service.
                </p>
              </section>

              {/* Data Collected */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Data We Collect</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We collect and process the following categories of personal data:
                </p>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Information</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                  <li>Full name and email address</li>
                  <li>Company name and job title</li>
                  <li>Account credentials (encrypted passwords)</li>
                  <li>Profile information and preferences</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">Compliance Data</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                  <li>Assessment data and control implementations</li>
                  <li>Evidence files uploaded for compliance purposes</li>
                  <li>Audit trails and compliance status information</li>
                  <li>Policy documents and configurations</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">Usage Data</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                  <li>IP addresses and browser information</li>
                  <li>Device and operating system information</li>
                  <li>Access logs and activity timestamps</li>
                  <li>Features used and interactions with the Service</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Information</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Billing address and payment method details (processed securely via Stripe)</li>
                  <li>Subscription history and invoices</li>
                  <li>Transaction records</li>
                </ul>
              </section>

              {/* Purposes */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Data</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We process your personal data for the following purposes:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>
                    <strong>Service Provision:</strong> To provide, maintain, and improve 
                    our compliance automation platform and related services.
                  </li>
                  <li>
                    <strong>Account Management:</strong> To create and manage your account, 
                    authenticate your identity, and provide customer support.
                  </li>
                  <li>
                    <strong>Service Improvement:</strong> To analyze usage patterns, 
                    troubleshoot issues, and develop new features.
                  </li>
                  <li>
                    <strong>Communications:</strong> To send service-related notifications, 
                    security alerts, and optional marketing communications (with your consent).
                  </li>
                  <li>
                    <strong>Legal Compliance:</strong> To comply with applicable laws, 
                    regulations, and legal obligations.
                  </li>
                </ul>
              </section>

              {/* Legal Basis */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Legal Basis for Processing</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Under the GDPR, we process your personal data based on the following legal grounds:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>
                    <strong>Contractual Necessity:</strong> Processing necessary to perform 
                    our contract with you and provide the Service.
                  </li>
                  <li>
                    <strong>Legitimate Interests:</strong> Processing for our legitimate 
                    interests in operating and improving our business, provided these interests 
                    are not overridden by your rights.
                  </li>
                  <li>
                    <strong>Consent:</strong> Processing based on your explicit consent, 
                    which you may withdraw at any time (for marketing communications and 
                    certain cookies).
                  </li>
                  <li>
                    <strong>Legal Obligation:</strong> Processing necessary to comply with 
                    legal obligations applicable to our business.
                  </li>
                </ul>
              </section>

              {/* Recipients */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Recipients</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We share your personal data only with trusted third parties under strict 
                  confidentiality agreements:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>
                    <strong>Hosting Provider:</strong> Hetzner Online GmbH (Germany) - 
                    for secure data hosting within the EU.
                  </li>
                  <li>
                    <strong>Payment Processor:</strong> Stripe (with Standard Contractual 
                    Clauses for data protection compliance).
                  </li>
                  <li>
                    <strong>Email Service:</strong> SendGrid/Twilio (with appropriate 
                    safeguards) - for transactional and marketing emails.
                  </li>
                  <li>
                    <strong>Analytics:</strong> Plausible Analytics (privacy-focused, 
                    EU-hosted) - for anonymous usage statistics.
                  </li>
                  <li>
                    <strong>Legal Authorities:</strong> When required by law or to protect 
                    our legal rights.
                  </li>
                </ul>
              </section>

              {/* Retention */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
                <p className="text-gray-600 leading-relaxed">
                  We retain your personal data only for as long as necessary to fulfill the 
                  purposes outlined in this Privacy Policy:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-4">
                  <li>
                    <strong>Account Data:</strong> Retained for the duration of your 
                    subscription plus 3 years after account closure (for legal obligations).
                  </li>
                  <li>
                    <strong>Compliance Data:</strong> Retained according to your 
                    organization's data retention policies or up to 7 years for audit purposes.
                  </li>
                  <li>
                    <strong>Usage Logs:</strong> Retained for 12 months for security 
                    and troubleshooting purposes.
                  </li>
                  <li>
                    <strong>Payment Records:</strong> Retained for 10 years in accordance 
                    with French accounting regulations.
                  </li>
                </ul>
              </section>

              {/* User Rights */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Under the GDPR, you have the following rights regarding your personal data:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>
                    <strong>Right of Access:</strong> Request a copy of your personal data 
                    and information about how we process it.
                  </li>
                  <li>
                    <strong>Right to Rectification:</strong> Request correction of inaccurate 
                    or incomplete personal data.
                  </li>
                  <li>
                    <strong>Right to Erasure ("Right to be Forgotten"):</strong> Request 
                    deletion of your personal data under certain circumstances.
                  </li>
                  <li>
                    <strong>Right to Restrict Processing:</strong> Request limitation of 
                    processing under specific conditions.
                  </li>
                  <li>
                    <strong>Right to Data Portability:</strong> Receive your data in a 
                    structured, commonly used format and transfer it to another controller.
                  </li>
                  <li>
                    <strong>Right to Object:</strong> Object to processing based on legitimate 
                    interests or for direct marketing purposes.
                  </li>
                  <li>
                    <strong>Right to Withdraw Consent:</strong> Withdraw consent at any time 
                    for processing based on consent.
                  </li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  To exercise your rights, please contact our Data Protection Officer at{' '}
                  <a href="mailto:data@certfast.io" className="text-certfast-600 hover:underline">
                    data@certfast.io
                  </a>.
                </p>
              </section>

              {/* Cookies */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking Technologies</h2>
                <p className="text-gray-600 leading-relaxed">
                  We use cookies and similar technologies to enhance your experience, 
                  analyze usage, and provide essential functionality. For detailed 
                  information about the cookies we use, please see our{' '}
                  <Link to="/cookies" className="text-certfast-600 hover:underline">
                    Cookie Policy
                  </Link>.
                </p>
              </section>

              {/* International Transfers */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">International Data Transfers</h2>
                <p className="text-gray-600 leading-relaxed">
                  Your personal data is primarily processed and stored within the European 
                  Union. When we transfer data outside the EU (e.g., to our payment processor), 
                  we ensure appropriate safeguards are in place, including Standard Contractual 
                  Clauses approved by the European Commission. We do not transfer your data 
                  to the United States without adequate protection measures.
                </p>
              </section>

              {/* Security */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
                <p className="text-gray-600 leading-relaxed">
                  We implement appropriate technical and organizational measures to protect 
                  your personal data against unauthorized access, alteration, disclosure, 
                  or destruction. These measures include encryption at rest and in transit, 
                  access controls, regular security assessments, and staff training on data 
                  protection.
                </p>
              </section>

              {/* Contact DPO */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or wish to exercise 
                  your data protection rights, please contact our Data Protection Officer:
                </p>
                <div className="bg-gray-100 rounded-lg p-6">
                  <p className="text-gray-600">
                    <strong>Email:</strong>{' '}
                    <a href="mailto:data@certfast.io" className="text-certfast-600 hover:underline">
                      data@certfast.io
                    </a>
                  </p>
                  <p className="text-gray-600 mt-2">
                    <strong>Address:</strong> [Company Address], France
                  </p>
                </div>
                <p className="text-gray-600 leading-relaxed mt-4">
                  You also have the right to lodge a complaint with the French Data Protection 
                  Authority (CNIL) if you believe our processing of your personal data 
                  infringes the GDPR.
                </p>
              </section>

              {/* Updates */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
                <p className="text-gray-600 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you 
                  of any material changes by email or through the Service at least 30 days 
                  before the changes take effect. The "Last updated" date at the top of 
                  this page indicates when this policy was last revised.
                </p>
              </section>
            </article>
          </div>
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
                    <Link to="/privacy" className="hover:text-white transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" className="hover:text-white transition-colors">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/privacy" className="hover:text-white transition-colors">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" className="hover:text-white transition-colors">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link to="/cookies" className="hover:text-white transition-colors">
                      Cookies
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm">© 2026 CertFast. All rights reserved.</p>
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
