import { Helmet } from 'react-helmet-async';
import {
  Shield,
  Lock,
  Server,
  HardDrive,
  KeyRound,
  CheckCircle2,
  Mail,
  Download,
  ArrowRight,
  BadgeCheck,
  GlobeLock,
  AlertCircle,
  Building2,
  ClipboardCheck,
  Clock,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { MarketingHeader } from '@/components/marketing/MarketingHeader';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';
import { normalizeLanguage } from '@/i18n/config';

interface Pillar {
  title: string;
  items: string[];
}

interface SecurityItem {
  title: string;
  value: string;
}

interface CardItem {
  title: string;
  description: string;
}

interface Metric {
  label: string;
  value: string;
}

export function Security() {
  const { t, i18n } = useTranslation();

  const pillars = t('security.pillars', { returnObjects: true }) as Pillar[];
  const complianceItems = t('security.complianceItems', {
    returnObjects: true,
  }) as SecurityItem[];
  const architecture = t('security.architecture', { returnObjects: true }) as CardItem[];
  const metrics = t('security.incidentMetrics', { returnObjects: true }) as Metric[];
  const thirdParty = t('security.thirdParty', { returnObjects: true }) as CardItem[];

  const pillarIcons = [Lock, Server, HardDrive, KeyRound];
  const architectureIcons = [GlobeLock, Shield, HardDrive];
  const thirdPartyIcons = [Building2, ClipboardCheck, Clock];
  const currentLanguage = normalizeLanguage(i18n.language);

  return (
    <>
      <Helmet>
        <html lang={currentLanguage} />
        <title>{t('security.seo.title')}</title>
        <meta name="description" content={t('security.seo.description')} />
        <meta property="og:title" content={t('security.seo.ogTitle')} />
        <meta property="og:description" content={t('security.seo.ogDescription')} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://certfast.io/security" />
        <link rel="alternate" hrefLang="fr" href="https://certfast.io/security?lang=fr" />
        <link rel="alternate" hrefLang="en" href="https://certfast.io/security?lang=en" />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        <MarketingHeader />

        <main>
          <section className="relative overflow-hidden bg-white border-b border-gray-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
              <div className="text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 rounded-full bg-certfast-50 px-4 py-1.5 mb-6">
                  <BadgeCheck className="h-4 w-4 text-certfast-600" />
                  <span className="text-sm font-medium text-certfast-700">{t('security.badge')}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t('security.title')}</h1>
                <p className="text-xl text-gray-600 leading-relaxed">{t('security.subtitle')}</p>
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('security.pillarsTitle')}</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('security.pillarsSubtitle')}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {pillars.map((pillar, index) => {
                  const Icon = pillarIcons[index] || Lock;
                  return (
                    <div
                      key={pillar.title}
                      className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-certfast-50 mb-4">
                        <Icon className="h-6 w-6 text-certfast-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{pillar.title}</h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        {pillar.items.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="py-20 bg-white border-y border-gray-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('security.complianceTitle')}</h2>
                  <p className="text-lg text-gray-600 mb-8">{t('security.complianceSubtitle')}</p>

                  <div className="space-y-6">
                    {complianceItems.map((item) => (
                      <div key={item.title} className="flex gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-certfast-50 shrink-0">
                          <CheckCircle2 className="h-5 w-5 text-certfast-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.title}</h3>
                          <p className="text-gray-600">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-8 border border-gray-200">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                      <div className="text-3xl font-bold text-certfast-600 mb-1">SOC 2</div>
                      <div className="text-sm text-gray-500">Type II</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                      <div className="text-3xl font-bold text-certfast-600 mb-1">ISO</div>
                      <div className="text-sm text-gray-500">27001</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                      <div className="text-3xl font-bold text-certfast-600 mb-1">GDPR</div>
                      <div className="text-sm text-gray-500">Compliant</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                      <div className="text-3xl font-bold text-certfast-600 mb-1">EU</div>
                      <div className="text-sm text-gray-500">Data Residency</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('security.architectureTitle')}</h2>
                <p className="text-lg text-gray-600">{t('security.architectureSubtitle')}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {architecture.map((item, index) => {
                  const Icon = architectureIcons[index] || Shield;
                  return (
                    <div key={item.title} className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 mx-auto mb-4">
                        <Icon className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="py-20 bg-white border-y border-gray-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="bg-slate-50 rounded-2xl p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      </div>
                      <span className="font-semibold text-gray-900">{t('security.incidentTitle')}</span>
                    </div>

                    <div className="space-y-4">
                      {metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200"
                        >
                          <span className="text-gray-700">{metric.label}</span>
                          <span className="font-semibold text-certfast-600">{metric.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="order-1 lg:order-2">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('security.incidentTitle')}</h2>
                  <p className="text-lg text-gray-600 mb-8">{t('security.incidentSubtitle')}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('security.thirdPartyTitle')}</h2>
                <p className="text-lg text-gray-600">{t('security.thirdPartySubtitle')}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {thirdParty.map((item, index) => {
                  const Icon = thirdPartyIcons[index] || Building2;
                  return (
                    <div key={item.title} className="bg-white rounded-xl p-6 border border-gray-200">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 mb-4">
                        <Icon className="h-6 w-6 text-gray-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="py-20 bg-certfast-600">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">{t('security.reportTitle')}</h2>
                  <p className="text-lg text-certfast-100 mb-8">{t('security.reportSubtitle')}</p>

                  <div className="space-y-4">
                    <a
                      href="mailto:security@certfast.io"
                      className="flex items-center gap-3 p-4 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                      <span>security@certfast.io</span>
                    </a>

                    <div className="flex items-center gap-3 p-4 bg-white/10 rounded-lg text-white">
                      <KeyRound className="h-5 w-5" />
                      <span>{t('security.pgp')}</span>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-white/10 rounded-lg text-white">
                      <BadgeCheck className="h-5 w-5" />
                      <span>{t('security.bounty')}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 text-gray-900">
                  <h3 className="text-xl font-semibold mb-4">{t('security.hallOfFame')}</h3>
                  <p className="text-gray-600 mb-6">{t('security.hallDescription')}</p>
                  <div className="p-6 bg-slate-50 rounded-xl border border-dashed border-gray-300 text-center">
                    <p className="text-gray-500 italic">{t('security.hallEmpty')}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="bg-slate-900 rounded-2xl p-8 md:p-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('security.finalTitle')}</h2>
                <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">{t('security.finalSubtitle')}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors">
                    <Download className="h-4 w-4" />
                    {t('security.whitepaper')}
                  </button>
                  <a
                    href="mailto:security@certfast.io"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-600 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    {t('security.contactTeam')}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <MarketingFooter />
      </div>
    </>
  );
}
