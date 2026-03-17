import { Helmet } from 'react-helmet-async';
import { Shield, Send, Clock, Calendar, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MarketingHeader } from '@/components/marketing/MarketingHeader';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';
import { normalizeLanguage } from '@/i18n/config';

interface ContactChannel {
  title: string;
  email: string;
  description: string;
}

interface QuickFaqItem {
  question: string;
  answer: string;
}

export function Contact() {
  const { t, i18n } = useTranslation();
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

  const contactChannels = t('contact.channels', { returnObjects: true }) as ContactChannel[];
  const faqItems = t('contact.quickFaq', { returnObjects: true }) as QuickFaqItem[];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = t('contact.errors.nameRequired');
    if (!formData.email.trim()) {
      newErrors.email = t('contact.errors.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.errors.emailInvalid');
    }
    if (!formData.message.trim()) newErrors.message = t('contact.errors.messageRequired');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (errors[e.target.name]) {
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: '',
      }));
    }
  };

  const currentLanguage = normalizeLanguage(i18n.language);

  return (
    <>
      <Helmet>
        <html lang={currentLanguage} />
        <title>{t('contact.seo.title')}</title>
        <meta name="description" content={t('contact.seo.description')} />
        <link rel="canonical" href="https://certfast.io/contact" />
        <link rel="alternate" hrefLang="fr" href="https://certfast.io/contact?lang=fr" />
        <link rel="alternate" hrefLang="en" href="https://certfast.io/contact?lang=en" />
      </Helmet>

      <div className="min-h-screen bg-white">
        <MarketingHeader />

        <main>
          <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20 md:py-28">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-certfast-200 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-certfast-100 rounded-full blur-3xl"></div>
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  {t('contact.heroTitle')}
                  <span className="text-certfast-600"> {t('contact.heroHighlight')}</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
                  {t('contact.heroSubtitle')}
                </p>
              </div>
            </div>
          </section>

          <section className="py-16 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16">
                <div>
                  <div className="bg-white rounded-2xl border border-gray-200 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('contact.formTitle')}</h2>

                    {isSubmitted ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
                          <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('contact.successTitle')}</h3>
                        <p className="text-gray-600">{t('contact.successDescription')}</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('contact.fields.name')} *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg border ${
                              errors.name
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-certfast-500'
                            } focus:outline-none focus:ring-2 transition-colors`}
                            placeholder={t('contact.placeholders.name')}
                          />
                          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('contact.fields.email')} *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg border ${
                              errors.email
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-certfast-500'
                            } focus:outline-none focus:ring-2 transition-colors`}
                            placeholder={t('contact.placeholders.email')}
                          />
                          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                        </div>

                        <div>
                          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('contact.fields.company')}
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-certfast-500 transition-colors"
                            placeholder={t('contact.placeholders.company')}
                          />
                        </div>

                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('contact.fields.subject')}
                          </label>
                          <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-certfast-500 transition-colors bg-white"
                          >
                            <option value="sales">{t('contact.subjects.sales')}</option>
                            <option value="support">{t('contact.subjects.support')}</option>
                            <option value="partnership">{t('contact.subjects.partnership')}</option>
                            <option value="other">{t('contact.subjects.other')}</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('contact.fields.message')} *
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg border ${
                              errors.message
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-certfast-500'
                            } focus:outline-none focus:ring-2 transition-colors resize-none`}
                            placeholder={t('contact.placeholders.message')}
                          />
                          {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-certfast-600 text-white font-semibold rounded-xl hover:bg-certfast-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? t('contact.sending') : t('contact.send')}
                          {!isSubmitting && <Send className="h-5 w-5" />}
                        </button>

                        <p className="text-center text-sm text-gray-500 mt-4">
                          <Clock className="inline h-4 w-4 mr-1" />
                          {t('contact.responseTime')}
                        </p>
                      </form>
                    )}
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('contact.channelsTitle')}</h2>
                    <div className="space-y-6">
                      {contactChannels.map((channel) => (
                        <div key={channel.title} className="bg-gray-50 rounded-xl p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-certfast-100 flex items-center justify-center">
                              <Shield className="h-5 w-5 text-certfast-600" />
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

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('contact.addressTitle')}</h3>
                    <p className="text-gray-600">
                      <strong>CertFast</strong>
                      <br />
                      [Adresse placeholder]
                      <br />
                      Caen, France 🇫🇷
                    </p>
                  </div>

                  <div className="bg-certfast-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-certfast-600" />
                      {t('contact.quickFaqTitle')}
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

        <MarketingFooter />
      </div>
    </>
  );
}
