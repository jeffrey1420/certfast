import { Zap, Shield, Clock, Users, BarChart3, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const featureIcons = [Zap, Shield, Lock, BarChart3, Users, Clock];
const featureColors = [
  'bg-yellow-500',
  'bg-green-500',
  'bg-blue-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-orange-500',
];

interface FeatureItem {
  name: string;
  description: string;
}

interface FeatureStat {
  value: string;
  label: string;
}

export function Features() {
  const { t } = useTranslation();

  const items = t('landing.features.items', { returnObjects: true }) as FeatureItem[];
  const stats = t('landing.features.stats', { returnObjects: true }) as FeatureStat[];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-certfast-600 mb-2">
            {t('landing.features.eyebrow')}
          </h2>
          <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('landing.features.title')}
          </p>
          <p className="text-xl text-gray-600">{t('landing.features.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((feature, index) => {
            const Icon = featureIcons[index] || Zap;
            const color = featureColors[index] || 'bg-certfast-500';

            return (
              <div
                key={feature.name}
                className="relative group bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
              >
                <div
                  className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-5 rounded-bl-full rounded-tr-2xl group-hover:opacity-10 transition-opacity`}
                ></div>

                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${color} bg-opacity-10 mb-6`}
                >
                  <Icon className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.name}
                </h3>

                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-24 bg-gray-900 rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
