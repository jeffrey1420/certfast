import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type TierId = 'starter' | 'professional' | 'enterprise';

const tierConfig: Record<
  TierId,
  {
    id: TierId;
    price: { monthly: number | null; annually: number | null };
    popular: boolean;
  }
> = {
  starter: {
    id: 'starter',
    price: { monthly: 99, annually: 79 },
    popular: false,
  },
  professional: {
    id: 'professional',
    price: { monthly: 299, annually: 249 },
    popular: true,
  },
  enterprise: {
    id: 'enterprise',
    price: { monthly: null, annually: null },
    popular: false,
  },
};

interface TierContent {
  name: string;
  description: string;
  cta: string;
  features: string[];
  notIncluded: string[];
}

export function Pricing() {
  const { t } = useTranslation();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('annually');

  const tierIds: TierId[] = ['starter', 'professional', 'enterprise'];

  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-certfast-600 mb-2">
            {t('landing.pricing.eyebrow')}
          </h2>
          <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('landing.pricing.title')}
          </p>
          <p className="text-xl text-gray-600">{t('landing.pricing.subtitle')}</p>

          <div className="mt-8 flex justify-center items-center gap-4">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-certfast-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('landing.pricing.monthly')}
            </button>
            <button
              onClick={() => setBillingCycle('annually')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                billingCycle === 'annually'
                  ? 'bg-certfast-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('landing.pricing.annually')}
              <span
                className={`text-xs px-2 py-0.5 rounded ${
                  billingCycle === 'annually'
                    ? 'bg-white/20'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {t('landing.pricing.save')}
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tierIds.map((tierId) => {
            const tier = tierConfig[tierId];
            const content = t(`landing.pricing.tiers.${tierId}`, {
              returnObjects: true,
            }) as TierContent;

            return (
              <div
                key={tier.id}
                className={`relative rounded-2xl p-8 ${
                  tier.popular
                    ? 'bg-white border-2 border-certfast-600 shadow-xl scale-105'
                    : 'bg-white border border-gray-200'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-certfast-600 text-white">
                      {t('landing.pricing.mostPopular')}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">{content.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{content.description}</p>
                </div>

                <div className="mb-6">
                  {tier.price[billingCycle] ? (
                    <>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-gray-900">
                          ${tier.price[billingCycle]}
                        </span>
                        <span className="text-gray-500">{t('landing.pricing.perMonth')}</span>
                      </div>
                      {billingCycle === 'annually' && (
                        <p className="text-sm text-gray-500 mt-1">
                          {t('landing.pricing.billedAnnually')}
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="text-2xl font-bold text-gray-900">
                      {t('landing.pricing.custom')}
                    </div>
                  )}
                </div>

                <Link
                  to={tier.id === 'enterprise' ? '#' : '/register'}
                  className={`block w-full text-center py-3 px-4 rounded-lg font-medium transition-colors mb-8 ${
                    tier.popular
                      ? 'bg-certfast-600 text-white hover:bg-certfast-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {content.cta}
                </Link>

                <div className="space-y-4">
                  <p className="text-sm font-medium text-gray-900">
                    {t('landing.pricing.included')}
                  </p>
                  <ul className="space-y-3">
                    {content.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-gray-600"
                      >
                        <Check className="h-5 w-5 text-green-500 shrink-0" />
                        {feature}
                      </li>
                    ))}
                    {content.notIncluded.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-gray-400"
                      >
                        <X className="h-5 w-5 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            {t('landing.pricing.faq')}{' '}
            <a
              href="#"
              className="text-certfast-600 font-medium hover:text-certfast-700 inline-flex items-center gap-1"
            >
              <HelpCircle className="h-4 w-4" />
              {t('landing.pricing.faqLink')}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
