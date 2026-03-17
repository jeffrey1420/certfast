import { Helmet } from 'react-helmet-async';
import { FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { MarketingHeader } from '@/components/marketing/MarketingHeader';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';
import { LegalTabs } from '@/components/marketing/LegalTabs';
import { normalizeLanguage } from '@/i18n/config';

interface LegalSection {
  title: string;
  content: string;
}

export function Cookies() {
  const { t, i18n } = useTranslation();
  const sections = t('cookies.sections', { returnObjects: true }) as LegalSection[];
  const currentLanguage = normalizeLanguage(i18n.language);

  return (
    <>
      <Helmet>
        <html lang={currentLanguage} />
        <title>{t('cookies.seo.title')}</title>
        <meta name="description" content={t('cookies.seo.description')} />
        <link rel="canonical" href="https://certfast.io/cookies" />
        <link rel="alternate" hrefLang="fr" href="https://certfast.io/cookies?lang=fr" />
        <link rel="alternate" hrefLang="en" href="https://certfast.io/cookies?lang=en" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <MarketingHeader />

        <header className="bg-white border-b border-gray-200">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-certfast-100">
                <FileText className="h-5 w-5 text-certfast-600" />
              </div>
              <span className="text-sm font-medium text-certfast-600 uppercase tracking-wide">
                {t('legal.badge')}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('cookies.title')}</h1>
            <p className="text-gray-600">{t('legal.lastUpdated', { date: t('cookies.date') })}</p>
          </div>
        </header>

        <LegalTabs />

        <main className="py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <article className="prose prose-lg max-w-none">
              {sections.map((section) => (
                <section key={section.title} className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                  <p className="text-gray-600 leading-relaxed">{section.content}</p>
                </section>
              ))}
            </article>
          </div>
        </main>

        <MarketingFooter />
      </div>
    </>
  );
}
