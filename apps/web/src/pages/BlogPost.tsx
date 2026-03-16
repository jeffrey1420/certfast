import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, Clock, User, Share2, Twitter, Linkedin } from 'lucide-react';
import { BlogHeader } from '@/components/blog/BlogHeader';
import { MarkdownRenderer } from '@/components/blog/MarkdownRenderer';
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

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    const foundArticle = articlesData.find((a) => a.slug === slug);
    
    if (foundArticle) {
      setArticle(foundArticle);
      
      // Find related articles
      const related = articlesData
        .filter(
          (a) =>
            a.slug !== slug &&
            a.tags.some((tag) => foundArticle.tags.includes(tag))
        )
        .slice(0, 3);
      setRelatedArticles(related);

      // Fetch content
      fetch(`/blog/${slug}.md`)
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch');
          return res.text();
        })
        .then((text) => {
          setContent(text);
          setLoading(false);
        })
        .catch(() => {
          setContent('# Article not found');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [slug]);

  if (!loading && !article) {
    return <Navigate to="/blog" replace />;
  }

  if (loading || !article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <BlogHeader />
        <div className="flex items-center justify-center py-24">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out this article: ${article.title}`;

  // JSON-LD structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Organization',
      name: article.author,
    },
    datePublished: article.date,
    dateModified: article.date,
    image: article.image || 'https://certfast.io/og-image.jpg',
    publisher: {
      '@type': 'Organization',
      name: 'CertFast',
      logo: {
        '@type': 'ImageObject',
        url: 'https://certfast.io/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://certfast.io/blog/${article.slug}`,
    },
  };

  return (
    <>
      <Helmet>
        <title>{article.title} | CertFast Blog</title>
        <meta name="description" content={article.description} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://certfast.io/blog/${article.slug}`}
        />
        <meta
          property="og:image"
          content={article.image || 'https://certfast.io/og-image.jpg'}
        />
        <meta property="article:published_time" content={article.date} />
        <meta property="article:author" content={article.author} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.description} />
        <meta
          name="twitter:image"
          content={article.image || 'https://certfast.io/og-image.jpg'}
        />
        <link
          rel="canonical"
          href={`https://certfast.io/blog/${article.slug}`}
        />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <BlogHeader />

        <article>
          {/* Article Header */}
          <header className="bg-white border-b border-gray-200">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-8 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>

              <div className="flex flex-wrap gap-2 mb-6">
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/blog?tag=${tag}`}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {article.title}
              </h1>

              <p className="text-xl text-gray-600 mb-8">{article.description}</p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-t border-gray-100 pt-6">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={article.date}>{formattedDate}</time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime}</span>
                </div>

                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-gray-400">Share:</span>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      shareUrl
                    )}&text=${encodeURIComponent(shareText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      shareUrl
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-blue-700 transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(shareUrl);
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Copy link"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
              <MarkdownRenderer content={content} />
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section className="border-t border-gray-200 bg-white">
              <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  Related Articles
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedArticles.map((related) => (
                    <Link
                      key={related.slug}
                      to={`/blog/${related.slug}`}
                      className="group block"
                    >
                      <article className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {related.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs font-medium text-gray-500"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-certfast-600 transition-colors line-clamp-2">
                          {related.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {related.description}
                        </p>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="bg-certfast-600 py-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to streamline your compliance?
              </h2>
              <p className="text-certfast-100 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of companies that trust CertFast to automate their
                compliance journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-certfast-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Get started free
                </Link>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                >
                  View demo
                </Link>
              </div>
            </div>
          </section>
        </article>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm">© 2024 CertFast. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
