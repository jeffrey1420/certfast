import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Lock, Heart, Rocket, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { MarketingHeader } from '@/components/marketing/MarketingHeader';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';
import { normalizeLanguage } from '@/i18n/config';

const valueIcons = [Eye, Lock, Heart, Rocket];
const valueColors = ['bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-purple-500'];

interface ValueItem {
  name: string;
  description: string;
}

interface StoryItem {
  title: string;
  text: string;
}

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TeamMember {
  initials: string;
  role: string;
}

export function About() {
  const { t, i18n } = useTranslation();

  const values = t('about.values', { returnObjects: true }) as ValueItem[];
  const story = t('about.story', { returnObjects: true }) as StoryItem[];
  const timeline = t('about.timeline', { returnObjects: true }) as TimelineItem[];
  const team = t('about.team', { returnObjects: true }) as TeamMember[];
  const currentLanguage = normalizeLanguage(i18n.language);

  return (
    <>
      <Helmet>
        <html lang={currentLanguage} />
        <title>{t('about.seo.title')}</title>
        <meta name="description" content={t('about.seo.description')} />
        <link rel="canonical" href="https://certfast.io/about" />
        <link rel="alternate" hrefLang="fr" href="https://certfast.io/about?lang=fr" />
        <link rel="alternate" hrefLang="en" href="https://certfast.io/about?lang=en" />
      </Helmet>

      <div className="min-h-screen bg-white">
        <MarketingHeader />

        <main>
          <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-24 md:py-32">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-certfast-200 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-certfast-100 rounded-full blur-3xl"></div>
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  {t('about.heroTitle')}
                  <span className="text-certfast-600"> {t('about.heroHighlight')}</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
                  {t('about.heroSubtitle')}
                </p>
              </div>
            </div>
          </section>

          <section className="py-24 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t('about.storyTitle')}</h2>
                  <div className="space-y-6">
                    {story.map((item, index) => (
                      <div key={item.title} className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-certfast-100 flex items-center justify-center">
                          <span className="text-certfast-600 font-bold">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                          <p className="text-gray-600">{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-certfast-600 rounded-2xl rotate-3 opacity-10"></div>
                  <div className="relative bg-gray-900 rounded-2xl p-8 text-white">
                    <blockquote className="text-2xl font-medium italic mb-6">"{t('about.quote')}"</blockquote>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-certfast-500 flex items-center justify-center text-lg font-bold">
                        AB
                      </div>
                      <div>
                        <div className="font-semibold">{t('about.quoteAuthor')}</div>
                        <div className="text-gray-400 text-sm">{t('about.quoteRole')}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-24 bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-base font-semibold text-certfast-600 mb-2">{t('about.valuesTitle')}</h2>
                <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('about.valuesSubtitle')}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => {
                  const Icon = valueIcons[index] || Eye;
                  const color = valueColors[index] || 'bg-certfast-500';

                  return (
                    <div
                      key={value.name}
                      className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
                    >
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${color} bg-opacity-10 mb-6`}
                      >
                        <Icon className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.name}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="py-24 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('about.teamTitle')}</h2>
                <p className="text-xl text-gray-600">{t('about.teamSubtitle')}</p>
                <div className="flex items-center justify-center gap-2 mt-4 text-gray-600">
                  <MapPin className="h-5 w-5 text-certfast-600" />
                  <span>{t('about.teamLocation')}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                {team.map((member) => (
                  <div key={member.initials} className="text-center">
                    <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500 mb-4">
                      {member.initials}
                    </div>
                    <div className="text-sm text-gray-500">{member.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-24 bg-gray-900 text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('about.timelineTitle')}</h2>
                <p className="text-xl text-gray-400">{t('about.timelineSubtitle')}</p>
              </div>

              <div className="relative max-w-4xl mx-auto">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-700"></div>
                {timeline.map((item, index) => (
                  <div
                    key={item.year}
                    className={`relative flex items-center gap-8 mb-12 ${
                      index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    }`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <div className="text-4xl font-bold text-certfast-400 mb-2">{item.year}</div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-certfast-500 border-4 border-gray-900"></div>
                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-24 bg-certfast-600">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('about.ctaTitle')}</h2>
              <p className="text-xl text-certfast-100 mb-8 max-w-2xl mx-auto">{t('about.ctaSubtitle')}</p>
              <Link
                to="#"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-certfast-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
              >
                {t('about.ctaButton')}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </section>
        </main>

        <MarketingFooter />
      </div>
    </>
  );
}
