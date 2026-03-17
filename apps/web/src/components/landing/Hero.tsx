import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface HeroStat {
  label: string;
  value: string;
}

export function Hero() {
  const { t } = useTranslation();

  const stats = t('landing.hero.stats', { returnObjects: true }) as HeroStat[];
  const activities = t('landing.hero.activity', { returnObjects: true }) as string[];
  const proofs = t('landing.hero.proof', { returnObjects: true }) as string[];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-certfast-200 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-certfast-100 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-certfast-50 border border-certfast-100 text-certfast-700 text-sm font-medium mb-8">
            <Shield className="h-4 w-4" />
            {t('landing.hero.badge')}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t('landing.hero.title')}
            <span className="text-certfast-600"> {t('landing.hero.titleHighlight')}</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('landing.hero.subtitle')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 mb-10">
            {proofs.map((proof) => (
              <div key={proof} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                {proof}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-certfast-600 text-white font-semibold rounded-xl hover:bg-certfast-700 transition-colors shadow-lg shadow-certfast-200"
            >
              {t('landing.hero.ctaPrimary')}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              {t('landing.hero.ctaSecondary')}
            </Link>
          </div>

          <p className="mt-4 text-sm text-gray-500">{t('landing.hero.note')}</p>
        </div>

        <div className="mt-16 relative">
          <div className="relative rounded-2xl bg-gray-900 p-2 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent rounded-2xl"></div>
            <div className="relative bg-gray-800 rounded-xl overflow-hidden aspect-[16/9]">
              <div className="absolute inset-0 bg-gray-900">
                <div className="h-12 bg-gray-800 border-b border-gray-700 flex items-center px-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="ml-4 px-4 py-1 bg-gray-700 rounded text-xs text-gray-400">
                    certfast.io/dashboard
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    {stats.map((stat, index) => (
                      <div
                        key={stat.label}
                        className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                      >
                        <div className="text-gray-400 text-sm mb-1">{stat.label}</div>
                        <div
                          className={`text-2xl font-bold ${
                            index === 0 || index === 2
                              ? 'text-green-400'
                              : index === 1
                              ? 'text-blue-400'
                              : 'text-yellow-400'
                          }`}
                        >
                          {stat.value}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-gray-300 font-medium">
                        {t('landing.hero.recentActivity')}
                      </div>
                      <div className="text-gray-500 text-sm">{t('landing.hero.viewAll')}</div>
                    </div>
                    <div className="space-y-3">
                      {activities.map((activity) => (
                        <div
                          key={activity}
                          className="flex items-center gap-3 text-gray-400 text-sm"
                        >
                          <div className="w-2 h-2 rounded-full bg-certfast-500"></div>
                          {activity}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
