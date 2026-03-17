import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Lock, 
  Server, 
  Eye, 
  CheckCircle2,
  Clock,
  FileCheck,
  AlertTriangle,
  Mail,
  Download,
  ArrowRight,
  BadgeCheck,
  HardDrive,
  GlobeLock,
  KeyRound,
  Building2,
  ClipboardCheck,
  AlertCircle
} from 'lucide-react';

export function Security() {
  return (
    <>
      <Helmet>
        <title>Security &amp; Trust Center | CertFast</title>
        <meta name="description" content="Learn how CertFast protects your compliance data with EU-only infrastructure, encryption, and zero-trust security." />
        <meta property="og:title" content="Security & Trust Center | CertFast" />
        <meta property="og:description" content="Enterprise-grade security for your compliance data. EU-only infrastructure, encryption, and zero-trust architecture." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://certfast.io/security" />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
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
                  to="/security"
                  className="text-sm font-medium text-certfast-600"
                >
                  Security
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

        <main>
          {/* 1. Hero Section */}
          <section className="relative overflow-hidden bg-white border-b border-gray-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
              <div className="text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 rounded-full bg-certfast-50 px-4 py-1.5 mb-6">
                  <BadgeCheck className="h-4 w-4 text-certfast-600" />
                  <span className="text-sm font-medium text-certfast-700">
                    SOC 2 Type II Certified
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Security at CertFast
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Your compliance data deserves the highest protection. Here's how we keep it safe.
                </p>
              </div>
            </div>
            
            {/* Decorative gradient */}
            <div className="absolute inset-x-0 -bottom-40 -z-10 transform-gpu overflow-hidden blur-3xl">
              <div className="relative left-1/2 -translate-x-1/2 aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-certfast-200 to-certfast-400 opacity-20" />
            </div>
          </section>

          {/* 2. Security Pillars (4 cards) */}
          <section className="py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Security Pillars
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  A multi-layered approach to protecting your most sensitive compliance data
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Encryption */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 mb-4">
                    <Lock className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Encryption</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>AES-256 au repos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>TLS 1.3 en transit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>Chiffrement des backups</span>
                    </li>
                  </ul>
                </div>

                {/* Infrastructure */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50 mb-4">
                    <Server className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Infrastructure</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>Bare metal EU uniquement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>Datacenters ISO 27001</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>Réseau isolé et segmenté</span>
                    </li>
                  </ul>
                </div>

                {/* Data Protection */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50 mb-4">
                    <HardDrive className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Protection</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>Pas de transfert hors UE</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>Rétention minimale</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>Anonymisation auto</span>
                    </li>
                  </ul>
                </div>

                {/* Access Control */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50 mb-4">
                    <KeyRound className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Access Control</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>MFA obligatoire</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>RBAC granulaire</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>Audit logs immuables</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Compliance Section */}
          <section className="py-20 bg-white border-y border-gray-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <ClipboardCheck className="h-5 w-5 text-certfast-600" />
                    <span className="text-sm font-semibold text-certfast-600 uppercase tracking-wide">
                      Compliance
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Certified and Audited
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    We maintain the highest standards of compliance to ensure your data is handled with care.
                  </p>

                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-certfast-50 shrink-0">
                        <FileCheck className="h-5 w-5 text-certfast-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Frameworks</h3>
                        <p className="text-gray-600">SOC 2, ISO 27001, GDPR roadmap</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-certfast-50 shrink-0">
                        <Clock className="h-5 w-5 text-certfast-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Audits</h3>
                        <p className="text-gray-600">Internes trimestriels, externes annuels</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-certfast-50 shrink-0">
                        <BadgeCheck className="h-5 w-5 text-certfast-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Certifications</h3>
                        <p className="text-gray-600">En cours de certification SOC 2 Type II</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-8 border border-gray-200">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                      <div className="text-3xl font-bold text-certfast-600 mb-1">SOC 2</div>
                      <div className="text-sm text-gray-500">Type II</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                      <div className="text-3xl font-bold text-certfast-600 mb-1">ISO</div>
                      <div className="text-sm text-gray-500">27001</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                      <div className="text-3xl font-bold text-certfast-600 mb-1">GDPR</div>
                      <div className="text-sm text-gray-500">Compliant</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                      <div className="text-3xl font-bold text-certfast-600 mb-1">EU</div>
                      <div className="text-sm text-gray-500">Data Residency</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Architecture Highlights */}
          <section className="py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Architecture Highlights
                </h2>
                <p className="text-lg text-gray-600">
                  Built with security and privacy at the core
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 mx-auto mb-4">
                    <GlobeLock className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    EU Data Residency
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Vos données restent dans l'UE. Nous n'utilisons aucun service cloud américain.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-50 mx-auto mb-4">
                    <Shield className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Zero-Trust Architecture
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Aucune confiance implicite. Chaque requête est authentifiée et autorisée.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 mx-auto mb-4">
                    <HardDrive className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Backup Quotidiens
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Sauvegardes chiffrées quotidiennes avec test de restauration mensuel.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Incident Response */}
          <section className="py-20 bg-white border-y border-gray-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="bg-slate-50 rounded-2xl p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      </div>
                      <span className="font-semibold text-gray-900">Incident Response</span>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-gray-400" />
                          <span className="text-gray-700">SLA Acknowledgement</span>
                        </div>
                        <span className="font-semibold text-certfast-600">4h</span>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3">
                          <Eye className="h-5 w-5 text-gray-400" />
                          <span className="text-gray-700">Communication</span>
                        </div>
                        <span className="font-semibold text-certfast-600">100%</span>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="h-5 w-5 text-gray-400" />
                          <span className="text-gray-700">Résolution critique</span>
                        </div>
                        <span className="font-semibold text-certfast-600">&lt; 24h</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="order-1 lg:order-2">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="h-5 w-5 text-certfast-600" />
                    <span className="text-sm font-semibold text-certfast-600 uppercase tracking-wide">
                      Response
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Incident Response
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Un plan d'intervention clair et testé régulièrement pour garantir la continuité de vos opérations.
                  </p>

                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-medium text-gray-900">SLA: 4h pour acknowledgement</span>
                        <p className="text-gray-600 text-sm">Réponse initiale garantie dans les 4 heures</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-medium text-gray-900">Communication: Transparence totale</span>
                        <p className="text-gray-600 text-sm">Mises à jour régulières pendant l'incident</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-medium text-gray-900">Résolution: &lt; 24h pour incidents critiques</span>
                        <p className="text-gray-600 text-sm">Objectif de résolution rapide des problèmes critiques</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 6. Third-Party Security */}
          <section className="py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Third-Party Security
                </h2>
                <p className="text-lg text-gray-600">
                  Nous contrôlons rigoureusement tous nos sous-traitants
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 mb-4">
                    <Building2 className="h-6 w-6 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Sous-traitants</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Hébergement bare metal (EU)</li>
                    <li>• Monitoring et alerting</li>
                    <li>• Services d'email (EU)</li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 mb-4">
                    <ClipboardCheck className="h-6 w-6 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Due Diligence</h3>
                  <p className="text-sm text-gray-600">
                    Vérification de sécurité complète avant onboarding de tout nouveau fournisseur. 
                    Questionnaires de sécurité et revue des certifications.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 mb-4">
                    <Clock className="h-6 w-6 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Reviews Annuels</h3>
                  <p className="text-sm text-gray-600">
                    Revue annuelle de la sécurité de tous les sous-traitants. 
                    Réévaluation des risques et mise à jour des contrats.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 7. Report a Vulnerability */}
          <section className="py-20 bg-certfast-600">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="h-5 w-5 text-certfast-200" />
                    <span className="text-sm font-semibold text-certfast-200 uppercase tracking-wide">
                      Responsible Disclosure
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-6">
                    Report a Vulnerability
                  </h2>
                  <p className="text-lg text-certfast-100 mb-8">
                    Nous prenons la sécurité au sérieux. Si vous découvrez une vulnérabilité, 
                    veuillez nous la signaler de manière responsable.
                  </p>

                  <div className="space-y-4">
                    <a 
                      href="mailto:security@certfast.io" 
                      className="flex items-center gap-3 p-4 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                      <span>security@certfast.io</span>
                    </a>

                    <div className="flex items-center gap-3 p-4 bg-white/10 rounded-lg text-white">
                      <KeyRound className="h-5 w-5" />
                      <span>PGP Key (coming soon)</span>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-white/10 rounded-lg text-white">
                      <BadgeCheck className="h-5 w-5" />
                      <span>Bug Bounty Program (coming soon)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 text-gray-900">
                  <h3 className="text-xl font-semibold mb-4">Hall of Fame</h3>
                  <p className="text-gray-600 mb-6">
                    Nous remercions les chercheurs en sécurité qui nous ont aidés 
                    à améliorer notre plateforme.
                  </p>
                  <div className="p-6 bg-slate-50 rounded-xl border border-dashed border-gray-300 text-center">
                    <p className="text-gray-500 italic">
                      Aucune vulnérabilité signalée pour le moment.
                      <br />
                      Soyez le premier à figurer ici !
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 8. CTA Section */}
          <section className="py-20 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="bg-slate-900 rounded-2xl p-8 md:p-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Want to learn more?
                </h2>
                <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                  Download our security whitepaper or contact our security team for any questions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors">
                    <Download className="h-4 w-4" />
                    Download Security Whitepaper
                  </button>
                  <a 
                    href="mailto:security@certfast.io"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-600 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    Contact Security Team
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
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
                    <Link to="/security" className="hover:text-white transition-colors">
                      Security
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
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Contact
                    </a>
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
