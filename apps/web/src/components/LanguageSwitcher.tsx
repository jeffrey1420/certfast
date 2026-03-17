import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LANGUAGE_QUERY_PARAM,
  LANGUAGE_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
  normalizeLanguage,
} from '@/i18n/config';

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const currentLanguage = useMemo(
    () => normalizeLanguage(i18n.resolvedLanguage || i18n.language),
    [i18n.language, i18n.resolvedLanguage]
  );

  const setLanguage = async (language: (typeof SUPPORTED_LANGUAGES)[number]) => {
    if (language === currentLanguage) return;

    await i18n.changeLanguage(language);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);

    const params = new URLSearchParams(location.search);
    params.set(LANGUAGE_QUERY_PARAM, language);

    navigate(
      {
        pathname: location.pathname,
        search: params.toString(),
      },
      { replace: true }
    );
  };

  return (
    <div
      className="inline-flex items-center rounded-lg border border-gray-200 bg-white p-1"
      role="group"
      aria-label={t('language.label')}
    >
      {SUPPORTED_LANGUAGES.map((language) => {
        const active = currentLanguage === language;

        return (
          <button
            key={language}
            type="button"
            onClick={() => setLanguage(language)}
            className={`rounded-md px-2.5 py-1 text-xs font-semibold uppercase transition-colors ${
              active
                ? 'bg-certfast-600 text-white'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
            aria-pressed={active}
            title={t(`language.${language}`)}
          >
            {language}
          </button>
        );
      })}
    </div>
  );
}
