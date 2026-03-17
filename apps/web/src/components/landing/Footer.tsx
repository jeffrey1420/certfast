import { Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: t('nav.dashboard'), href: '/dashboard' },
      { label: t('nav.pricing'), href: '#pricing' },
      { label: t('nav.features'), href: '#features' },
    ],
    company: [
      { label: t('nav.blog'), href: '/blog' },
      { label: t('nav.about'), href: '/about' },
      { label: t('nav.contact'), href: '/contact' },
    ],
    resources: [
      { label: t('nav.documentation'), href: '#' },
      { label: t('nav.helpCenter'), href: '#' },
      { label: t('nav.apiReference'), href: '#' },
    ],
    legal: [
      { label: t('nav.privacy'), href: '/privacy' },
      { label: t('nav.terms'), href: '/terms' },
      { label: t('nav.cookies'), href: '/cookies' },
      { label: t('nav.security'), href: '/security' },
    ],
  };

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-certfast-600 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">{t('meta.siteName')}</span>
            </a>
            <p className="text-sm text-muted-foreground max-w-xs mb-6">{t('footer.tagline')}</p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('nav.product')}</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('nav.company')}</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('nav.resources')}</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('nav.legal')}</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">{t('footer.rights', { year })}</p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{t('footer.madeInEurope')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
