import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function MarketingFooter() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-certfast-600">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">{t('meta.siteName')}</span>
            </div>
            <p className="text-sm text-gray-400">{t('footer.tagline')}</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t('nav.product')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">
                  {t('nav.dashboard')}
                </Link>
              </li>
              <li>
                <Link to="/assessments" className="hover:text-white transition-colors">
                  {t('nav.assessments')}
                </Link>
              </li>
              <li>
                <Link to="/controls" className="hover:text-white transition-colors">
                  {t('nav.controls')}
                </Link>
              </li>
              <li>
                <Link to="/policies" className="hover:text-white transition-colors">
                  {t('nav.policies')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t('nav.resources')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  {t('nav.blog')}
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('nav.documentation')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('nav.helpCenter')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t('nav.legal')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  {t('nav.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  {t('nav.terms')}
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-white transition-colors">
                  {t('nav.cookies')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">{t('footer.rights', { year })}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              {t('footer.twitter')}
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              {t('footer.linkedin')}
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              {t('footer.github')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
