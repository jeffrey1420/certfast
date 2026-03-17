import { Link, useLocation } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

interface MarketingHeaderProps {
  showLandingLinks?: boolean;
}

export function MarketingHeader({ showLandingLinks = false }: MarketingHeaderProps) {
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-certfast-600">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">{t('meta.siteName')}</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/blog"
              className={`text-sm font-medium ${
                isActive('/blog') ? 'text-certfast-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('nav.blog')}
            </Link>

            {showLandingLinks && (
              <>
                <a href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                  {t('nav.features')}
                </a>
                <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                  {t('nav.pricing')}
                </a>
              </>
            )}

            <Link
              to="/about"
              className={`text-sm font-medium ${
                isActive('/about') ? 'text-certfast-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium ${
                isActive('/contact') ? 'text-certfast-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('nav.contact')}
            </Link>
            <Link
              to="/security"
              className={`text-sm font-medium ${
                isActive('/security') ? 'text-certfast-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('nav.security')}
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              to="/login"
              className="hidden md:block text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              {t('nav.login')}
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-lg bg-certfast-600 px-4 py-2 text-sm font-medium text-white hover:bg-certfast-700 transition-colors"
            >
              {t('nav.signup')}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
