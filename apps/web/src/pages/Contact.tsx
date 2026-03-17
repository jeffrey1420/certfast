import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Shield, Send, Mail, Clock, Calendar, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const contactChannels = [
  {
    title: 'Sales',
    email: 'sales@certfast.io',
    description: 'Devis enterprise, démos',
    icon: Mail,
  },
  {
    title: 'Support',
    email: 'support@certfast.io',
    description: 'Questions techniques, bugs',
    icon: Mail,
  },
  {
    title: 'Security',
    email: 'security@certfast.io',
    description: 'Vulnérabilités',
    icon: Shield,
  },
];

const faqItems = [
  {
    question: 'Temps de réponse moyen ?',
    answer: '< 4h',
  },
  {
    question: 'Démo disponible ?',
    answer: 'Oui, booker un call',
  },
  {
    question: 'Support en français ?',
    answer: 'Oui',
  },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: 'sales',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }
    if (!formData.message.trim()) newErrors.message = 'Le message est requis';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors(prev => ({
        ...prev,
        [e.target.name]: '',
      }));
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact | CertFast</title>
        <meta name="description" content="Get in touch with CertFast sales, support, or security team. We're here to help with your compliance journey." />
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
                <Link to="/about" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                  About
                </Link>
                <Link to="/contact" className="text-sm font-medium text-certfast-600">
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
          <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20 md:py-28">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-certfast-200 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-certfast-100 rounded-full blur-3xl"></div>
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Get in
                  <span className="text-certfast-600"> Touch</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
                  Questions ? Démonstration ? On est là.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Form Section */}
          <section className="py-16 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16">
                {/* Form Column */}
                <div>
                  <div className="bg-white rounded-2xl border border-gray-200 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Envoyez-nous un message
                    </h2>
                    
                    {isSubmitted ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
                          <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Message envoyé !
                        </h3>
                        <p className="text-gray-600">
                          On vous répond sous 24h ouvrées.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Nom *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-certfast-500'} focus:outline-none focus:ring-2 transition-colors`}
                            placeholder="Votre nom"
                          />
                          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-certfast-500'} focus:outline-none focus:ring-2 transition-colors`}
                            placeholder="votre@email.com"
                          />
                          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                        </div>

                        <div>
                          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                            Entreprise
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-certfast-500 transition-colors"
                            placeholder="Votre entreprise"
                          />
                        </div>

                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                            Sujet
                          </label>
                          <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-certfast-500 transition-colors bg-white"
                          >
                            <option value="sales">Sales</option>
                            <option value="support">Support</option>
                            <option value="partnership">Partnership</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            Message *
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-certfast-500'} focus:outline-none focus:ring-2 transition-colors resize-none`}
                            placeholder="Comment pouvons-nous vous aider ?"
                          />
                          {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-certfast-600 text-white font-semibold rounded-xl hover:bg-certfast-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>Envoi en cours...</>
                          ) : (
                            <>
                              Send Message
                              <Send className="h-5 w-5" />
                            </>
                          )}
                        </button>

                        <p className="text-center text-sm text-gray-500 mt-4">
                          <Clock className="inline h-4 w-4 mr-1" />
                          On répond sous 24h ouvrées
                        </p>
                      </form>
                    )}
                  </div>
                </div>

                {/* Contact Channels Column */}
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Autres canaux
                    </h2>
                    <div className="space-y-6">
                      {contactChannels.map((channel) => (
                        <div key={channel.title} className="bg-gray-50 rounded-xl p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-certfast-100 flex items-center justify-center">
                              <channel.icon className="h-5 w-5 text-certfast-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">{channel.title}</h3>
                          </div>
                          <a
                            href={`mailto:${channel.email}`}
                            className="text-certfast-600 font-medium hover:underline mb-1 block"
                          >
                            {channel.email}
                          </a>
                          <p className="text-sm text-gray-600">{channel.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Adresse</h3>
                    <p className="text-gray-600">
                      <strong>CertFast</strong><br />
                      [Adresse placeholder]<br />
                      Caen, France 🇫🇷
                    </p>
                  </div>

                  {/* Quick FAQ */}
                  <div className="bg-certfast-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-certfast-600" />
                      FAQ Rapide
                    </h3>
                    <div className="space-y-4">
                      {faqItems.map((item) => (
                        <div key={item.question} className="flex justify-between items-center">
                          <span className="text-gray-700">{item.question}</span>
                          <span className="text-certfast-600 font-medium">{item.answer}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
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
