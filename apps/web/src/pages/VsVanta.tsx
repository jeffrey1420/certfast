import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Shield, Check, X, AlertTriangle, ArrowRight, Clock, MapPin, MessageCircle, Zap, Users, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ComparisonRow {
  feature: string;
  certfast: string;
  vanta: string;
  winner: 'certfast' | 'vanta' | 'tie';
}

const comparisons: ComparisonRow[] = [
  { feature: 'Prix (annuel)', certfast: '€2,400 - 12,000', vanta: '$10,000 - 80,000', winner: 'certfast' },
  { feature: 'Data location', certfast: '🇪🇺 EU only', vanta: '🇺🇸 US primarily', winner: 'certfast' },
  { feature: 'Setup time', certfast: '48h', vanta: '2-4 semaines', winner: 'certfast' },
  { feature: 'Support', certfast: 'Email <4h', vanta: 'Ticket system', winner: 'certfast' },
  { feature: 'SOC 2', certfast: '✅', vanta: '✅', winner: 'tie' },
  { feature: 'ISO 27001', certfast: '✅', vanta: '✅', winner: 'tie' },
  { feature: 'GDPR natif', certfast: '✅', vanta: '⚠️ Via add-on', winner: 'certfast' },
  { feature: 'Français', certfast: '✅', vanta: '❌', winner: 'certfast' },
];

const advantages = [
  {
    icon: Zap,
    title: 'Pricing transparent',
    description: "Pas de \"contact sales\". Nos prix sont publics et sans surprise."
  },
  {
    icon: MapPin,
    title: 'EU First',
    description: "Conçu pour le marché européen. Vos données restent en Europe."
  },
  {
    icon: Users,
    title: 'Founder-led',
    description: "On comprend les contraintes startups parce qu'on est aussi une startup."
  },
  {
    icon: Rocket,
    title: 'Speed',
    description: "On ship des features que vous demandez. Pas de roadmap figée."
  }
];

const migrationSteps = [
  'Export Vanta → Import CertFast',
  'Support dédié pendant la migration',
  'Zero downtime'
];

export function VsVanta() {
  return (
    <>
      <Helmet>
        <title>CertFast vs Vanta: The European Alternative (5x Cheaper)</title>
        <meta name="description" content="Compare CertFast and Vanta. EU data residency, 5x lower pricing, same compliance results. See why European startups are switching." />
        <meta property="og:title" content="CertFast vs Vanta: The European Alternative" />
        <meta property="og:description" content="Same compliance results, 5x cheaper, EU data only. See the comparison." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://certfast.io/vs-vanta" />
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

              <div className="hidden md:flex items-center gap-8">
                <Link to="/blog" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                  Blog
                </Link>
                <a href="#comparison" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                  Comparison
                </a>
                <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                  Product
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <Link to="/login" className="hidden md:block text-sm font-medium text-gray-600 hover:text-gray-900">
                  Sign in
                </Link>
                <Link to="/register">
                  <Button className="bg-certfast-600 hover:bg-certfast-700">
                    Get started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-certfast-50/30 pt-20 pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-certfast-100 px-4 py-1.5 mb-6">
                <span className="text-sm font-medium text-certfast-700">
                  🇪🇺 Made for Europe
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                The Vanta Alternative for{' '}
                <span className="text-certfast-600">European Startups</span>
              </h1>

              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Same compliance results, <span className="font-semibold text-certfast-600">5x cheaper</span>, EU data only
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#pricing">
                  <Button size="lg" className="bg-certfast-600 hover:bg-certfast-700 px-8">
                    See Pricing
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <Link to="/register">
                  <Button size="lg" variant="outline" className="px-8">
                    Start Free Trial
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparison" className="py-20 bg-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                CertFast vs Vanta: Side by Side
              </h2>
              <p className="text-gray-600">
                See why European startups are making the switch
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-certfast-600 bg-certfast-50/50">CertFast</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-500">Vanta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparisons.map((row, idx) => (
                    <tr key={idx} className={row.winner === 'certfast' ? 'bg-certfast-50/20' : ''}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.feature}</td>
                      <td className="px-6 py-4 text-center bg-certfast-50/30">
                        <div className="flex items-center justify-center gap-2">
                          {row.certfast === '✅' ? (
                            <Check className="h-5 w-5 text-green-600" />
                          ) : row.certfast === '❌' ? (
                            <X className="h-5 w-5 text-red-500" />
                          ) : (
                            <span className={`text-sm font-medium ${row.winner === 'certfast' ? 'text-certfast-700' : 'text-gray-900'}`}>
                              {row.certfast}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {row.vanta === '✅' ? (
                            <Check className="h-5 w-5 text-green-600" />
                          ) : row.vanta === '❌' ? (
                            <X className="h-5 w-5 text-red-500" />
                          ) : row.vanta.startsWith('⚠️') ? (
                            <div className="flex items-center gap-1">
                              <AlertTriangle className="h-4 w-4 text-amber-500" />
                              <span className="text-sm text-gray-600">{row.vanta.slice(2)}</span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-600">{row.vanta}</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Why CertFast Wins */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Pourquoi CertFast gagne
              </h2>
              <p className="text-gray-600">
                Construit différemment, pour des résultats différents
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {advantages.map((adv, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="h-12 w-12 rounded-lg bg-certfast-100 flex items-center justify-center mb-4">
                    <adv.icon className="h-6 w-6 text-certfast-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{adv.title}</h3>
                  <p className="text-gray-600 text-sm">{adv.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-5xl text-certfast-200 mb-6">"</div>
            <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-8">
              On payait $25K/an chez Vanta. Avec CertFast on a exactement la même chose pour €4,990. 
              Le switch a pris 2 jours.
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="h-12 w-12 rounded-full bg-certfast-100 flex items-center justify-center">
                <span className="text-certfast-700 font-semibold">CT</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">CTO</div>
                <div className="text-gray-600">FinTech, Paris</div>
              </div>
            </div>
          </div>
        </section>

        {/* Easy Migration */}
        <section className="py-20 bg-gradient-to-br from-certfast-600 to-certfast-800 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Migration facile depuis Vanta
                </h2>
                <p className="text-certfast-100 mb-8">
                  On s'occupe de tout. Vous ne perdez aucune donnée, aucun temps.
                </p>
                <ul className="space-y-4">
                  {migrationSteps.map((step, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                        <Check className="h-4 w-4" />
                      </div>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 rounded-xl bg-white/20 flex items-center justify-center">
                    <Clock className="h-8 w-8" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">48h</div>
                    <div className="text-certfast-200">Temps moyen de migration</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-xl bg-white/20 flex items-center justify-center">
                    <MessageCircle className="h-8 w-8" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">1:1</div>
                    <div className="text-certfast-200">Support dédié</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section id="pricing" className="py-20 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Prêt à faire le switch ?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Rejoignez les startups européennes qui ont déjà choisi CertFast
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-certfast-600 hover:bg-certfast-700 px-8">
                  Make the Switch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="mailto:sales@certfast.io">
                <Button size="lg" variant="outline" className="px-8">
                  Parler à l'équipe
                </Button>
              </a>
            </div>
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
                <p className="text-sm text-gray-400">
                  Compliance automation that actually works.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                  <li><Link to="/assessments" className="hover:text-white transition-colors">Assessments</Link></li>
                  <li><Link to="/controls" className="hover:text-white transition-colors">Controls</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Comparisons</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/vs-vanta" className="hover:text-white transition-colors">vs Vanta</Link></li>
                  <li><Link to="/vs-drata" className="hover:text-white transition-colors">vs Drata</Link></li>
                  <li><Link to="/case-study/acme" className="hover:text-white transition-colors">Case Study</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
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
