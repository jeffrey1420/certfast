import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function LegalTabs() {
  const { t } = useTranslation();
  const location = useLocation();

  const tabs = [
    { key: 'privacy', href: '/privacy', label: t('legal.tabs.privacy') },
    { key: 'terms', href: '/terms', label: t('legal.tabs.terms') },
    { key: 'cookies', href: '/cookies', label: t('legal.tabs.cookies') },
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6 -mb-px">
          {tabs.map((tab) => {
            const active = location.pathname === tab.href;

            return (
              <Link
                key={tab.key}
                to={tab.href}
                className={`py-4 text-sm font-medium border-b-2 ${
                  active
                    ? 'text-certfast-600 border-certfast-600'
                    : 'text-gray-500 hover:text-gray-700 border-transparent'
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
