import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight, Eye, Lock, Heart, Rocket, MapPin } from 'lucide-react';

const values = [
  {
    name: 'Transparency',
    description: 'Pas de pricing opaque, pas de features cachées',
    icon: Eye,
    color: 'bg-blue-500',
  },
  {
    name: 'Privacy First',
    description: 'Vos données restent en Europe. Point final.',
    icon: Lock,
    color: 'bg-green-500',
  },
  {
    name: 'Founder Obsession',
    description: 'On répond aux emails en moins de 2h',
    icon: Heart,
    color: 'bg-red-500',
  },
  {
    name: 'Continuous Improvement',
    description: 'On ship tous les jours',
    icon: Rocket,
    color: 'bg-purple-500',
  },
];

const timeline = [
  {
    year: '2024',
    title: 'The Beginning',
    description: 'Idée et premiers prototypes après avoir vécu le cauchemar de la compliance.',
  },
  {
    year: '2025',
    title: 'Beta Launch',
    description: 'Beta avec 50 startups européennes qui nous ont fait confiance.',
  },
  {
    year: '2026',
    title: 'Public Launch',
    description: 'Lancement V1 public et première levée de fonds.',
  },
];

const team = [
  { initials: 'AB', role: 'CEO & Co-founder' },
  { initials: 'CD', role: 'CTO & Co-founder' },
  { initials: 'EF', role: 'Head of Security' },
  { initials: 'GH', role: 'Lead Engineer' },
];

export function About() {
  return (
    <>
      <Helmet>
        <title>About Us | CertFast</title>
        <meta name="description" content="Meet the team behind CertFast. Founded in Caen, France, we're building the compliance platform we wish we had." />
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
                <Link to="/about" className="text-sm font-medium text-certfast-600">
                  About
                </Link>
                <Link to="/contact" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                  Contact
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <Link to="/login" className="hidden md:block text-sm font-medium text-gray-600 hover:text-gray-900">
                  Sign in
                </Link>
                <Link to="/register" className="inline-flex items-center justify-center rounded-lg bg-certfast-600 px-4 py-2 text-sm font-medium text-white hover:bg-certfast-700 transition-colors">
                  Get started
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main>
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-24 md:py-32">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-certfast-200 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-certfast-100 rounded-full blur-3xl"></div>
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Built by Founders,
                  <span className="text-certfast-600"> for Founders</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
                  We started CertFast because we lived the compliance nightmare ourselves.
                </p>
              </div>
            </div>
          </section>

          {/* Story Section */}
          <section className="py-24 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Notre Story
                  </h2>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                        <span className="text-red-600 font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">The Problem</h3>
                        <p className="text-gray-600">
                          En 2024, notre équipe a perdu 6 mois et €80K sur notre SOC 2. 
                          Des processus manuels, des consultants qui facturent des fortunes, 
                          et une frustration infinie.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-certfast-100 flex items-center justify-center">
                        <span className="text-certfast-600 font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">The Solution</h3>
                        <p className="text-gray-600">
                          On a décidé de créer l'outil qu'on aurait voulu avoir. 
                          Une plateforme qui automatise les tâches rébarbatives 
                          et rend la compliance presque... agréable ?
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-600 font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Mission</h3>
                        <p className="text-gray-600">
                          Rendre la compliance accessible à toutes les startups. 
                          Parce qu'un bon produit ne devrait pas être bloqué 
                          par des contraintes administratives.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-certfast-600 rounded-2xl rotate-3 opacity-10"></div>
                  <div className="relative bg-gray-900 rounded-2xl p-8 text-white">
                    <blockquote className="text-2xl font-medium italic mb-6">
                      "We built CertFast for the 3 AM panic attacks before audit day. 
                      Nobody should have to go through that."
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-certfast-500 flex items-center justify-center text-lg font-bold">
                        AB
                      </div>
                      <div>
                        <div className="font-semibold">Alexandre Bernard</div>
                        <div className="text-gray-400 text-sm">CEO & Co-founder</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-24 bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-base font-semibold text-certfast-600 mb-2">
                  Our Values
                </h2>
                <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Ce qui nous motive chaque jour
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value) => (
                  <div
                    key={value.name}
                    className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
                  >
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${value.color} bg-opacity-10 mb-6`}
                    >
                      <value.icon
                        className={`h-6 w-6 ${value.color.replace('bg-', 'text-')}`}
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {value.name}
                    </h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="py-24 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  L'équipe
                </h2>
                <p className="text-xl text-gray-600">
                  Fondé par des engineers avec 10+ ans d'expérience SaaS et security
                </p>
                <div className="flex items-center justify-center gap-2 mt-4 text-gray-600">
                  <MapPin className="h-5 w-5 text-certfast-600" />
                  <span>Basé à Caen, France 🇫🇷</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                {team.map((member) => (
                  <div key={member.initials} className="text-center">
                    <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500 mb-4">
                      {member.initials}
                    </div>
                    <div className="text-sm text-gray-500">{member.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Timeline Section */}
          <section className="py-24 bg-gray-900 text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Notre Journey
                </h2>
                <p className="text-xl text-gray-400">
                  De l'idée à la plateforme utilisée par des centaines de startups
                </p>
              </div>

              <div className="relative max-w-4xl mx-auto">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-700"></div>
                {timeline.map((item, index) => (
                  <div key={item.year} className={`relative flex items-center gap-8 mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <div className="text-4xl font-bold text-certfast-400 mb-2">{item.year}</div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-certfast-500 border-4 border-gray-900"></div>
                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 bg-certfast-600">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Rejoignez l'équipe
              </h2>
              <p className="text-xl text-certfast-100 mb-8 max-w-2xl mx-auto">
                On recrute ! Envie de changer le monde de la compliance ?
              </p>
              <Link
                to="#"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-certfast-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
              >
                Voir nos offres
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </section>
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
                  <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                  <li><Link to="/assessments" className="hover:text-white transition-colors">Assessments</Link></li>
                  <li><Link to="/controls" className="hover:text-white transition-colors">Controls</Link></li>
                  <li><Link to="/policies" className="hover:text-white transition-colors">Policies</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                  <li><Link to="#" className="hover:text-white transition-colors">Careers</Link></li>
                  <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link to="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm">© 2024 CertFast. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
