import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { BlogHeader } from '@/components/blog/BlogHeader';
import { BlogCard } from '@/components/blog/BlogCard';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';
import { normalizeLanguage } from '@/i18n/config';
import articlesData from '@/content/blog/articles.json';

interface Article {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  image?: string;
  featured?: boolean;
}

export function Blog() {
  const { t, i18n } = useTranslation();
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    setArticles(articlesData);
  }, []);

  const allTags = Array.from(new Set(articles.flatMap((article) => article.tags))).sort();

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTag = selectedTag === null || article.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  const featuredArticles = filteredArticles.filter((a) => a.featured);
  const regularArticles = filteredArticles.filter((a) => !a.featured);
  const currentLanguage = normalizeLanguage(i18n.language);

  return (
    <>
      <Helmet>
        <html lang={currentLanguage} />
        <title>{t('blog.seo.title')}</title>
        <meta name="description" content={t('blog.seo.description')} />
        <meta property="og:title" content={t('blog.seo.ogTitle')} />
        <meta property="og:description" content={t('blog.seo.ogDescription')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://certfast.io/blog" />
        <link rel="canonical" href="https://certfast.io/blog" />
        <link rel="alternate" hrefLang="fr" href="https://certfast.io/blog?lang=fr" />
        <link rel="alternate" hrefLang="en" href="https://certfast.io/blog?lang=en" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <BlogHeader />

        <main>
          <section className="bg-white border-b border-gray-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
              <div className="text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-certfast-50 text-certfast-700 text-sm font-medium mb-6">
                  <BookOpen className="h-4 w-4" />
                  {t('blog.badge')}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t('blog.title')}</h1>
                <p className="text-xl text-gray-600 mb-8">{t('blog.subtitle')}</p>

                <div className="relative max-w-xl mx-auto">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder={t('blog.searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-certfast-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="border-b border-gray-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedTag === null
                      ? 'bg-certfast-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t('nav.all')}
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedTag === tag
                        ? 'bg-certfast-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {filteredArticles.length === 0 ? (
                <div className="text-center py-16">
                  <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{t('blog.emptyTitle')}</h3>
                  <p className="text-gray-600">{t('blog.emptyDescription')}</p>
                </div>
              ) : (
                <>
                  {featuredArticles.length > 0 && (
                    <div className="mb-12">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('blog.featuredArticles')}</h2>
                      <div className="space-y-8">
                        {featuredArticles.map((article) => (
                          <BlogCard key={article.slug} {...article} featured={true} />
                        ))}
                      </div>
                    </div>
                  )}

                  {regularArticles.length > 0 && (
                    <div>
                      {featuredArticles.length > 0 && (
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('blog.latestArticles')}</h2>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {regularArticles.map((article) => (
                          <BlogCard key={article.slug} {...article} />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>

          <section className="bg-certfast-600 py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">{t('blog.newsletterTitle')}</h2>
              <p className="text-certfast-100 text-lg mb-8 max-w-2xl mx-auto">{t('blog.newsletterSubtitle')}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={t('blog.newsletterPlaceholder')}
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors">
                  {t('blog.subscribe')}
                </button>
              </div>
            </div>
          </section>
        </main>

        <MarketingFooter />
      </div>
    </>
  );
}
