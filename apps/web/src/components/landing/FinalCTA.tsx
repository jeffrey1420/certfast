import { useTranslation } from 'react-i18next';

export function FinalCTA() {
  const { t } = useTranslation();

  return (
    <section className="py-20 md:py-32 bg-certfast-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {t('landing.finalCta.title')}
          </h2>

          <p className="text-lg md:text-xl text-certfast-100 mb-10">
            {t('landing.finalCta.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-certfast-700 transition-all duration-200 bg-white rounded-lg hover:bg-certfast-50 hover:shadow-lg hover:-translate-y-0.5"
            >
              {t('landing.finalCta.button')}
            </a>
          </div>

          <p className="mt-6 text-sm text-certfast-200">{t('landing.finalCta.note')}</p>
        </div>
      </div>
    </section>
  );
}
