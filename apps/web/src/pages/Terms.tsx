import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Shield, FileText } from 'lucide-react';

export function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | CertFast</title>
        <meta
          name="description"
          content="CertFast Terms of Service - Read the terms and conditions governing your use of our compliance automation platform."
        />
        <meta property="og:title" content="Terms of Service | CertFast" />
        <meta
          property="og:description"
          content="Terms and conditions for using the CertFast compliance automation platform."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://certfast.io/terms" />
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
              Terms of Service
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
                className="py-4 text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="py-4 text-sm font-medium text-certfast-600 border-b-2 border-certfast-600"
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
              {/* Definitions */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Definitions</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  In these Terms of Service, the following terms shall have the following meanings:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>
                    <strong>"Service":</strong> The CertFast compliance automation platform, 
                    including all features, tools, and associated services accessible via 
                    web application at certfast.io or mobile applications.
                  </li>
                  <li>
                    <strong>"User":</strong> Any individual or entity that accesses or uses 
                    the Service, whether registered or not.
                  </li>
                  <li>
                    <strong>"Account":</strong> A registered user account created to access 
                    and use the Service.
                  </li>
                  <li>
                    <strong>"Organization":</strong> A company, organization, or entity that 
                    has subscribed to the Service and manages User accounts within that subscription.
                  </li>
                  <li>
                    <strong>"Content":</strong> All data, documents, information, materials, 
                    and files uploaded, submitted, or generated by Users through the Service.
                  </li>
                  <li>
                    <strong>"Subscription":</strong> A paid plan or free trial that grants 
                    access to the Service features according to the selected tier.
                  </li>
                  <li>
                    <strong>"We", "Us", "Our":</strong> CertFast and its operators.
                  </li>
                </ul>
              </section>

              {/* Acceptance */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Acceptance of Terms</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  By accessing or using the Service, you agree to be bound by these Terms of Service 
                  and our Privacy Policy. If you do not agree to these terms, you must not access 
                  or use the Service.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you are using the Service on behalf of an Organization, you represent and 
                  warrant that you have the authority to bind that Organization to these terms. 
                  In such case, "you" and "your" shall refer to that Organization.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  You must be at least 18 years old to use the Service. By using the Service, 
                  you represent and warrant that you meet this age requirement.
                </p>
              </section>

              {/* Service Description */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Description of Service</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  CertFast is a compliance automation platform designed to help organizations 
                  manage their security compliance frameworks (including but not limited to 
                  SOC 2, ISO 27001, and GDPR). The Service includes features for:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Compliance assessment and tracking</li>
                  <li>Control management and implementation</li>
                  <li>Evidence collection and storage</li>
                  <li>Policy creation and management</li>
                  <li>Audit preparation and reporting</li>
                  <li>Team collaboration and workflow management</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  We reserve the right to modify, suspend, or discontinue any part of the Service 
                  at any time, with or without notice. We will not be liable to you or any third 
                  party for any modification, suspension, or discontinuation.
                </p>
              </section>

              {/* User Accounts */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Accounts and Security</h2>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Registration</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  To access certain features of the Service, you must create an Account. You agree 
                  to provide accurate, current, and complete information during registration and 
                  to update such information to keep it accurate, current, and complete.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Security</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You are responsible for maintaining the confidentiality of your Account credentials 
                  and for all activities that occur under your Account. You agree to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                  <li>Use strong, unique passwords for your Account</li>
                  <li>Enable two-factor authentication where available</li>
                  <li>Notify us immediately of any unauthorized access or security breach</li>
                  <li>Log out of your Account at the end of each session</li>
                  <li>Not share your Account credentials with any third party</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">Prohibited Activities</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Use the Service for any illegal purpose or in violation of any laws</li>
                  <li>Upload or transmit viruses, malware, or other harmful code</li>
                  <li>Attempt to gain unauthorized access to any part of the Service</li>
                  <li>Interfere with or disrupt the Service or servers</li>
                  <li>Scrape, spider, or data mine the Service without permission</li>
                  <li>Impersonate any person or entity or misrepresent your affiliation</li>
                  <li>Use the Service to store or process sensitive personal data not relevant to compliance</li>
                </ul>
              </section>

              {/* Intellectual Property */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property</h2>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Intellectual Property</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The Service and its original content (excluding User Content), features, and 
                  functionality are and will remain the exclusive property of CertFast. The Service 
                  is protected by copyright, trademark, and other laws. Our trademarks and trade 
                  dress may not be used in connection with any product or service without our 
                  prior written consent.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">User Content</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You retain all rights to the Content you upload, submit, or generate through 
                  the Service. By submitting Content to the Service, you grant us a worldwide, 
                  non-exclusive, royalty-free license to use, reproduce, modify, and display 
                  such Content solely for the purpose of providing and improving the Service.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  You represent and warrant that: (i) you own or have the necessary rights to 
                  submit the Content, and (ii) the Content does not violate the rights of any 
                  third party or any applicable laws.
                </p>
              </section>

              {/* Payment */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Payment and Billing</h2>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Subscription Terms</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Certain features of the Service require a paid Subscription. By subscribing, 
                  you agree to pay all fees associated with your selected plan. Subscription 
                  fees are billed in advance on a monthly or annual basis, depending on your 
                  selection.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Method</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You must provide a valid payment method (credit card or approved alternative) 
                  to complete your Subscription. You authorize us to charge your payment method 
                  for all applicable fees. All payments are processed securely through Stripe.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cancellation and Refunds</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You may cancel your Subscription at any time through your Account settings. 
                  Upon cancellation:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                  <li>Your Subscription will remain active until the end of the current billing period</li>
                  <li>No refunds will be provided for partial months or unused periods</li>
                  <li>Your data will be retained for 30 days after cancellation, after which it may be deleted</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">Price Changes</h3>
                <p className="text-gray-600 leading-relaxed">
                  We may modify Subscription fees at any time. Any price changes will take effect 
                  at the start of your next billing period. We will provide at least 30 days' 
                  advance notice of any material price increases.
                </p>
              </section>

              {/* Limitation of Liability */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  To the maximum extent permitted by applicable law, CertFast and its affiliates, 
                  officers, employees, agents, and licensors shall not be liable for:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                  <li>Any indirect, incidental, special, consequential, or punitive damages</li>
                  <li>Loss of profits, revenue, data, or business opportunities</li>
                  <li>Personal injury or property damage</li>
                  <li>Any damages arising from unauthorized access to or use of our servers</li>
                  <li>Any errors, mistakes, or inaccuracies in the Service</li>
                  <li>Any interruption or cessation of transmission to or from the Service</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Our total liability for any claim arising out of or relating to these Terms 
                  or the Service shall not exceed the greater of: (i) the amount you paid to 
                  us in the 12 months preceding the claim, or (ii) €100.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Nothing in these Terms shall limit or exclude liability for: (i) death or 
                  personal injury caused by negligence, (ii) fraud or fraudulent misrepresentation, 
                  or (iii) any other liability that cannot be excluded under applicable law.
                </p>
              </section>

              {/* Indemnification */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Indemnification</h2>
                <p className="text-gray-600 leading-relaxed">
                  You agree to defend, indemnify, and hold harmless CertFast and its affiliates, 
                  officers, employees, and agents from and against any claims, liabilities, 
                  damages, losses, and expenses (including reasonable attorneys' fees) arising 
                  out of or in any way connected with: (i) your access to or use of the Service, 
                  (ii) your violation of these Terms, (iii) your Content, or (iv) your violation 
                  of any third-party right.
                </p>
              </section>

              {/* Termination */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Termination</h2>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Termination by You</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You may terminate these Terms at any time by cancelling your Subscription and 
                  ceasing all use of the Service.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">Termination by Us</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We may suspend or terminate your access to the Service immediately, without 
                  prior notice or liability, for any reason, including:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                  <li>Breach of these Terms</li>
                  <li>Failure to pay fees when due</li>
                  <li>Conduct that we believe may harm other users or our business</li>
                  <li>Extended periods of inactivity</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">Effect of Termination</h3>
                <p className="text-gray-600 leading-relaxed">
                  Upon termination, your right to use the Service will immediately cease. All 
                  provisions of these Terms which by their nature should survive termination 
                  shall survive, including ownership provisions, warranty disclaimers, indemnity, 
                  and limitations of liability.
                </p>
              </section>

              {/* Governing Law */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law and Jurisdiction</h2>
                <p className="text-gray-600 leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws 
                  of France, without regard to its conflict of law provisions. Any dispute 
                  arising from or relating to these Terms or the Service shall be subject to 
                  the exclusive jurisdiction of the courts of Paris, France.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  If you are a consumer residing in the European Union, you may also be entitled 
                  to the mandatory consumer protection laws of your country of residence.
                </p>
              </section>

              {/* Modifications */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Modifications to Terms</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We reserve the right to modify these Terms at any time. When we make material 
                  changes, we will:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                  <li>Post the updated Terms on this page with a revised "Last updated" date</li>
                  <li>Send an email notification to registered Users at least 30 days before changes take effect</li>
                  <li>Display a prominent notice in the Service</li>
                </ul>
                <p className="text-gray-600 leading-relaxed">
                  Your continued use of the Service after the effective date of the revised 
                  Terms constitutes your acceptance of the changes. If you do not agree to 
                  the revised Terms, you must stop using the Service.
                </p>
              </section>

              {/* General */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. General Provisions</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  <strong>Entire Agreement:</strong> These Terms, together with our Privacy Policy 
                  and Cookie Policy, constitute the entire agreement between you and CertFast 
                  regarding the Service.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  <strong>Waiver:</strong> Our failure to enforce any right or provision of these 
                  Terms will not be considered a waiver of those rights.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  <strong>Severability:</strong> If any provision of these Terms is held to be 
                  invalid or unenforceable, the remaining provisions will remain in full force 
                  and effect.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  <strong>Assignment:</strong> You may not assign or transfer these Terms without 
                  our prior written consent. We may assign these Terms without restriction.
                </p>
              </section>

              {/* Contact */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you have any questions about these Terms, please contact us:
                </p>
                <div className="bg-gray-100 rounded-lg p-6">
                  <p className="text-gray-600">
                    <strong>Email:</strong>{' '}
                    <a href="mailto:legal@certfast.io" className="text-certfast-600 hover:underline">
                      legal@certfast.io
                    </a>
                  </p>
                  <p className="text-gray-600 mt-2">
                    <strong>Address:</strong> [Company Address], France
                  </p>
                </div>
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
