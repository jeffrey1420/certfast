import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-24 bg-certfast-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to streamline your compliance?
            </h2>
            <p className="text-xl text-certfast-100 mb-8">
              Join 500+ companies that use CertFast to automate their compliance
              journey. Start your free trial today—no credit card required.
            </p>

            <div className="space-y-4">
              {[
                '14-day free trial with full access',
                'No credit card required',
                'Cancel anytime',
                'Free onboarding support',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-white">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Start your free trial
              </h3>
              <p className="text-gray-600">
                Get full access to all Professional features for 14 days.
              </p>
            </div>

            <form className="space-y-4">
              <div>
                <label
                  htmlFor="cta-email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Work email
                </label>
                <input
                  type="email"
                  id="cta-email"
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-certfast-500"
                />
              </div>

              <div>
                <label
                  htmlFor="cta-password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="cta-password"
                  placeholder="Create a password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-certfast-500"
                />
              </div>

              <Link
                to="/register"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-certfast-600 text-white font-semibold rounded-lg hover:bg-certfast-700 transition-colors"
              >
                Get started free
                <ArrowRight className="h-5 w-5" />
              </Link>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-certfast-600 font-medium hover:text-certfast-700"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
