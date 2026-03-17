import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function VsDrata() {
  return (
    <>
      <Helmet>
        <title>CertFast vs Drata: The European Alternative (5x Cheaper)</title>
        <meta name="description" content="Compare CertFast and Drata. EU data residency, 5x lower pricing, same compliance results. See why European startups are switching." />
        <link rel="canonical" href="https://certfast.io/vs-drata" />
      </Helmet>

      <div className="min-h-screen bg-white">
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
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                  Sign in
                </Link>
                <Link to="/register">
                  <Button className="bg-certfast-600 hover:bg-certfast-700">Get started</Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-certfast-50/30 pt-20 pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-certfast-100 px-4 py-1.5 mb-6">
                <span className="text-sm font-medium text-certfast-700">🇪🇺 Made for Europe</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                The Drata Alternative for{' '}
                <span className="text-certfast-600">European Startups</span>
              </h1>

              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Same compliance automation, <span className="font-semibold text-certfast-600">fraction of the price</span>, EU data only
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button size="lg" className="bg-certfast-600 hover:bg-certfast-700 px-8">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/vs-vanta">
                  <Button size="lg" variant="outline" className="px-8">
                    See Vanta Comparison
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Coming Soon Message */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-lg text-gray-600 mb-6">
              Detailed comparison coming soon. In the meantime, check out our{' '}
              <Link to="/vs-vanta" className="text-certfast-600 hover:underline">Vanta comparison</Link>{' '}
              to see how CertFast stacks up against the competition.
            </p>
          </div>
        </section>

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
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Comparisons</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/vs-vanta" className="hover:text-white">vs Vanta</Link></li>
                  <li><Link to="/vs-drata" className="hover:text-white">vs Drata</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8">
              <p className="text-sm">© 2024 CertFast. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
