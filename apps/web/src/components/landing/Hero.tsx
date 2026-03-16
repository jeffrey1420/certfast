import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Check } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-certfast-200 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-certfast-100 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-certfast-50 border border-certfast-100 text-certfast-700 text-sm font-medium mb-8">
            <Shield className="h-4 w-4" />
            Trusted by 500+ compliance teams
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Compliance automation that
            <span className="text-certfast-600"> actually works</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            CertFast streamlines your SOC 2, ISO 27001, and GDPR compliance
            journey. Automate evidence collection, track controls, and pass
            audits with confidence.
          </p>

          {/* Social Proof */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 mb-10">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              SOC 2 Type II in 3 months
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              40+ hours saved per audit
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              Enterprise-ready security
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-certfast-600 text-white font-semibold rounded-xl hover:bg-certfast-700 transition-colors shadow-lg shadow-certfast-200"
            >
              Start free trial
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              View demo
            </Link>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            No credit card required. 14-day free trial.
          </p>
        </div>

        {/* Hero Image / Dashboard Preview */}
        <div className="mt-16 relative">
          <div className="relative rounded-2xl bg-gray-900 p-2 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent rounded-2xl"></div>
            <div className="relative bg-gray-800 rounded-xl overflow-hidden aspect-[16/9]">
              {/* Mock Dashboard UI */}
              <div className="absolute inset-0 bg-gray-900">
                <div className="h-12 bg-gray-800 border-b border-gray-700 flex items-center px-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="ml-4 px-4 py-1 bg-gray-700 rounded text-xs text-gray-400">
                    certfast.io/dashboard
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    {[
                      { label: 'Controls', value: '94%', color: 'green' },
                      { label: 'Evidence', value: '87%', color: 'blue' },
                      { label: 'Policies', value: '100%', color: 'green' },
                      { label: 'Audit Ready', value: '92%', color: 'yellow' },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                      >
                        <div className="text-gray-400 text-sm mb-1">{stat.label}</div>
                        <div
                          className={`text-2xl font-bold ${
                            stat.color === 'green'
                              ? 'text-green-400'
                              : stat.color === 'blue'
                              ? 'text-blue-400'
                              : 'text-yellow-400'
                          }`}
                        >
                          {stat.value}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-gray-300 font-medium">
                        Recent Activity
                      </div>
                      <div className="text-gray-500 text-sm">View all</div>
                    </div>
                    <div className="space-y-3">
                      {[
                        'Evidence uploaded for CC6.1',
                        'Policy approved: Access Control',
                        'Control tested: MFA Implementation',
                        'Audit preparation complete',
                      ].map((activity, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 text-gray-400 text-sm"
                        >
                          <div className="w-2 h-2 rounded-full bg-certfast-500"></div>
                          {activity}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
