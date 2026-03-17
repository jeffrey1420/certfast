import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { Shield, Check, ArrowRight, Clock, DollarSign, Users, Building2, Target, Zap, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Template case study data - can be extended for dynamic content
const caseStudyData = {
  acme: {
    companyName: 'AcmeCorp',
    companyType: 'B2B SaaS',
    employees: 45,
    funding: 'Series A',
    industry: 'Fintech',
    daysToCompliance: 87,
    savingsVsConsultant: 2400,
    engineersInvolved: 1,
    contractValue: 200000,
    hoursSaved: 200,
    initialControls: 47,
    quote: {
      text: "Sans CertFast on aurait soit perdu le contrat, soit recruté un consultant à prix d'or. C'était notre seule option viable.",
      author: 'CTO',
      role: 'Co-founder & CTO'
    }
  }
};

interface CaseStudyContentProps {
  data: typeof caseStudyData.acme;
}

function CaseStudyContent({ data }: CaseStudyContentProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-certfast-50/30 pt-20 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Company Logo Placeholder */}
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-certfast-100 mb-6">
              <Building2 className="h-10 w-10 text-certfast-600" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How {data.companyName} Got{' '}
              <span className="text-certfast-600">SOC 2 in {data.daysToCompliance} Days</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              From zero documentation to enterprise-ready compliance
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-certfast-600">{data.daysToCompliance}</div>
                <div className="text-sm text-gray-600">days</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-green-600">€{data.savingsVsConsultant.toLocaleString()}</div>
                <div className="text-sm text-gray-600">saved vs consultant</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-gray-900">{data.engineersInvolved}</div>
                <div className="text-sm text-gray-600">engineer</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Context Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-certfast-100 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-certfast-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Le contexte</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">Company</div>
              <div className="font-semibold text-gray-900">{data.companyType}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">Team size</div>
              <div className="font-semibold text-gray-900">{data.employees} employés</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">Stage</div>
              <div className="font-semibold text-gray-900">{data.funding}</div>
            </div>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 text-lg">
              {data.companyName} est une startup {data.companyType} en pleine croissance. 
              Après leur {data.funding.toLowerCase()}, ils visaient un marché enterprise. 
              Le problème : leur prospect le plus prometteur exigeait une certification SOC 2.
            </p>
            <p className="text-gray-600">
              La deadline était claire :{' '}
              <span className="font-semibold text-gray-900">3 mois maximum</span> pour obtenir la certification, 
              sinon le contrat tombait à l'eau.
            </p>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
              <Target className="h-5 w-5 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Le challenge</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center mb-4">
                <FileCheck className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Aucun processus documenté</h3>
              <p className="text-sm text-gray-600">
                Comme beaucoup de startups, tout était dans les têtes. 
                Aucune documentation formelle des processus de sécurité.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                <Users className="h-5 w-5 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Équipe déjà débordée</h3>
              <p className="text-sm text-gray-600">
                L'équipe tech travaillait déjà à plein régime sur le produit. 
                Impossible de consacrer un ingénieur à temps plein sur la compliance.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center mb-4">
                <DollarSign className="h-5 w-5 text-amber-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Budget limité</h3>
              <p className="text-sm text-gray-600">
                Pas de marge pour un consultant à €50K. 
                Il fallait une solution efficace et abordable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-certfast-100 flex items-center justify-center">
              <Zap className="h-5 w-5 text-certfast-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">La solution : CertFast</h2>
          </div>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-certfast-600 text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div className="w-0.5 h-full bg-certfast-200 mx-auto mt-2"></div>
              </div>
              <div className="pb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Assessment initial
                </h3>
                <p className="text-gray-600">
                  En moins d'une heure, CertFast a analysé leur infrastructure et identifié{' '}
                  <span className="font-semibold text-certfast-600">{data.initialControls} contrôles</span>{' '}
                  à implémenter pour être compliant SOC 2.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-certfast-600 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div className="w-0.5 h-full bg-certfast-200 mx-auto mt-2"></div>
              </div>
              <div className="pb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Roadmap personnalisée
                </h3>
                <p className="text-gray-600">
                  CertFast a généré une roadmap priorisée avec des tâches assignées à chaque membre de l'équipe. 
                  Plus de questions sur "qui fait quoi".
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-certfast-600 text-white flex items-center justify-center font-bold">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Automatisation evidence collection
                </h3>
                <p className="text-gray-600">
                  Intégration directe avec GitHub, AWS, et Google Workspace. 
                  <span className="font-semibold text-certfast-600">80% des preuves</span>{' '}
                  collectées automatiquement, sans intervention manuelle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 bg-gradient-to-br from-certfast-600 to-certfast-800 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 mb-4">
              <Check className="h-4 w-4" />
              <span className="text-sm font-medium">Mission accomplie</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Les résultats</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="h-12 w-12 rounded-lg bg-white/20 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <div className="text-3xl font-bold mb-2">Jour {data.daysToCompliance}</div>
              <p className="text-certfast-100">
                SOC 2 Type II obtenu, juste à temps pour la deadline.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="h-12 w-12 rounded-lg bg-white/20 flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6" />
              </div>
              <div className="text-3xl font-bold mb-2">€{data.contractValue.toLocaleString()}</div>
              <p className="text-certfast-100">
                Contrat enterprise signé grâce à la certification.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="h-12 w-12 rounded-lg bg-white/20 flex items-center justify-center mb-4">
                <Users className="h-6 w-6" />
              </div>
              <div className="text-3xl font-bold mb-2">{data.hoursSaved}h</div>
              <p className="text-certfast-100">
                Économisées par rapport à une méthode manuelle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl text-certfast-200 mb-6">"</div>
          <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-8">
            {data.quote.text}
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="h-14 w-14 rounded-full bg-certfast-100 flex items-center justify-center">
              <span className="text-certfast-700 font-semibold text-lg">{data.quote.author.charAt(0)}</span>
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900">{data.quote.author}</div>
              <div className="text-gray-600">{data.quote.role}, {data.companyName}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Get the same results
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Rejoignez {data.companyName} et des centaines d'autres startups qui ont choisi CertFast
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-certfast-600 hover:bg-certfast-700 px-8">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="https://calendly.com/certfast/demo" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="px-8">
                Book a Demo
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  
  // For now, we only have the acme case study. 
  // In the future, this can be extended to fetch different case studies based on slug
  const data = caseStudyData[slug as keyof typeof caseStudyData] || caseStudyData.acme;

  return (
    <>
      <Helmet>
        <title>Case Study: SOC 2 in {data.daysToCompliance} Days | CertFast</title>
        <meta name="description" content={`How ${data.companyName} achieved SOC 2 compliance in ${data.daysToCompliance} days with CertFast, saving €${data.savingsVsConsultant.toLocaleString()} vs traditional consultants.`} />
        <meta property="og:title" content={`Case Study: SOC 2 in ${data.daysToCompliance} Days | CertFast`} />
        <meta property="og:description" content={`How ${data.companyName} achieved SOC 2 compliance with CertFast.`} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://certfast.io/case-study/${slug || 'acme'}`} />
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
                  <Button className="bg-certfast-600 hover:bg-certfast-700">
                    Get started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <CaseStudyContent data={data} />

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
                <h4 className="text-white font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><Link to="/case-study/acme" className="hover:text-white transition-colors">Case Studies</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
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
