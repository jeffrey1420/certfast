import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function CTA() {
  const { t } = useTranslation();
  const bullets = t('landing.cta.bullets', { returnObjects: true }) as string[];

  return (
    <section className="py-24 bg-certfast-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('landing.cta.title')}
            </h2>
            <p className="text-xl text-certfast-100 mb-8">{t('landing.cta.subtitle')}</p>

            <div className="space-y-4">
              {bullets.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-white">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {t('landing.cta.formTitle')}
              </h3>
              <p className="text-gray-600">{t('landing.cta.formSubtitle')}</p>
            </div>

            <form className="space-y-4">
              <div>
                <label
                  htmlFor="cta-email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t('landing.cta.workEmail')}
                </label>
                <input
                  type="email"
                  id="cta-email"
                  placeholder={t('landing.cta.emailPlaceholder')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-certfast-500"
                />
              </div>

              <div>
                <label
                  htmlFor="cta-password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t('landing.cta.password')}
                </label>
                <input
                  type="password"
                  id="cta-password"
                  placeholder={t('landing.cta.passwordPlaceholder')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-certfast-500"
                />
              </div>

              <Link
                to="/register"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-certfast-600 text-white font-semibold rounded-lg hover:bg-certfast-700 transition-colors"
              >
                {t('landing.cta.button')}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              {t('landing.cta.already')}{' '}
              <Link
                to="/login"
                className="text-certfast-600 font-medium hover:text-certfast-700"
              >
                {t('landing.cta.signin')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
