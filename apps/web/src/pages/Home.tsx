import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { Pricing } from '@/components/landing/Pricing';
import { CTA } from '@/components/landing/CTA';
import { MarketingHeader } from '@/components/marketing/MarketingHeader';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';
import { normalizeLanguage } from '@/i18n/config';

export function Home() {
  const { t, i18n } = useTranslation();
  const currentLanguage = normalizeLanguage(i18n.language);

  return (
    <>
      <Helmet>
        <html lang={currentLanguage} />
        <title>{t('home.seo.title')}</title>
        <meta name="description" content={t('home.seo.description')} />
        <meta property="og:title" content={t('home.seo.ogTitle')} />
        <meta property="og:description" content={t('home.seo.ogDescription')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://certfast.io" />
        <meta property="og:image" content="https://certfast.io/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://certfast.io" />
        <link rel="alternate" hrefLang="fr" href="https://certfast.io/?lang=fr" />
        <link rel="alternate" hrefLang="en" href="https://certfast.io/?lang=en" />
        <link rel="alternate" hrefLang="x-default" href="https://certfast.io/?lang=fr" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'CertFast',
            applicationCategory: 'BusinessApplication',
            description: t('home.structuredDataDescription'),
            offers: {
              '@type': 'Offer',
              price: '99',
              priceCurrency: 'USD',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              ratingCount: '500',
            },
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        <MarketingHeader showLandingLinks />

        <main>
          <Hero />
          <Features />
          <Pricing />
          <CTA />
        </main>

        <MarketingFooter />
      </div>
    </>
  );
}
