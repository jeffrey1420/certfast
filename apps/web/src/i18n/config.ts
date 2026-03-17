export const SUPPORTED_LANGUAGES = ['fr', 'en'] as const;

export type AppLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: AppLanguage = 'fr';

export const LANGUAGE_STORAGE_KEY = 'certfast_lang';

export const LANGUAGE_QUERY_PARAM = 'lang';

export const isSupportedLanguage = (value: string | null | undefined): value is AppLanguage =>
  !!value && SUPPORTED_LANGUAGES.includes(value as AppLanguage);

export const normalizeLanguage = (value: string | null | undefined): AppLanguage => {
  if (!value) return DEFAULT_LANGUAGE;
  const short = value.toLowerCase().split('-')[0];
  return isSupportedLanguage(short) ? short : DEFAULT_LANGUAGE;
};
