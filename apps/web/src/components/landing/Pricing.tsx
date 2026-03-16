import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, HelpCircle } from 'lucide-react';

const tiers = [
  {
    name: 'Starter',
    id: 'starter',
    price: { monthly: 99, annually: 79 },
    description: 'Perfect for startups getting their first certification.',
    features: [
      'Up to 3 team members',
      '1 compliance framework',
      'Basic evidence collection',
      'Policy templates library',
      'Email support',
      'Standard integrations',
    ],
    notIncluded: [
      'Custom controls',
      'API access',
      'Dedicated success manager',
    ],
    cta: 'Start free trial',
    popular: false,
  },
  {
    name: 'Professional',
    id: 'professional',
    price: { monthly: 299, annually: 249 },
    description: 'For growing teams managing multiple frameworks.',
    features: [
      'Up to 15 team members',
      'Unlimited frameworks',
      'Advanced automation',
      'Custom controls',
      'Priority support',
      'All integrations',
      'API access',
      'Audit assistance',
    ],
    notIncluded: ['Dedicated success manager'],
    cta: 'Start free trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    id: 'enterprise',
    price: { monthly: null, annually: null },
    description: 'Custom solutions for large organizations.',
    features: [
      'Unlimited team members',
      'Unlimited frameworks',
      'Custom automation',
      'SSO & SAML',
      'Dedicated success manager',
      'Custom integrations',
      'SLA guarantee',
      'On-premise option',
    ],
    notIncluded: [],
    cta: 'Contact sales',
    popular: false,
  },
];

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>(
    'annually'
  );

  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-certfast-600 mb-2">
            Pricing
          </h2>
          <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, transparent pricing
          </p>
          <p className="text-xl text-gray-600">
            Choose the plan that fits your compliance needs. All plans include a
            14-day free trial.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 flex justify-center items-center gap-4">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-certfast-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annually')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                billingCycle === 'annually'
                  ? 'bg-certfast-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Annually
              <span
                className={`text-xs px-2 py-0.5 rounded ${
                  billingCycle === 'annually'
                    ? 'bg-white/20'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
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
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">{tier.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{tier.description}</p>
              </div>

              <div className="mb-6">
                {tier.price[billingCycle] ? (
                  <>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-gray-900">
                        ${tier.price[billingCycle]}
                      </span>
                      <span className="text-gray-500">/month</span>
                    </div>
                    {billingCycle === 'annually' && (
                      <p className="text-sm text-gray-500 mt-1">
                        Billed annually
                      </p>
                    )}
                  </>
                ) : (
                  <div className="text-2xl font-bold text-gray-900">Custom</div>
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
                {tier.cta}
              </Link>

              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-900">
                  What's included:
                </p>
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-gray-600"
                    >
                      <Check className="h-5 w-5 text-green-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                  {tier.notIncluded.map((feature) => (
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
          ))}
        </div>

        {/* FAQ Link */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Have questions?{' '}
            <a
              href="#"
              className="text-certfast-600 font-medium hover:text-certfast-700 inline-flex items-center gap-1"
            >
              <HelpCircle className="h-4 w-4" />
              Check our FAQ
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
