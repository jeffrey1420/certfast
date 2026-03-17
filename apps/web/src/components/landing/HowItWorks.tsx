import { Plug, ListChecks, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const icons = [Plug, ListChecks, Award];

interface Step {
  number: string;
  title: string;
  description: string;
}

export function HowItWorks() {
  const { t } = useTranslation();
  const steps = t('landing.howItWorks.steps', { returnObjects: true }) as Step[];

  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('landing.howItWorks.title')}
          </h2>
          <p className="text-lg text-muted-foreground">{t('landing.howItWorks.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = icons[index] || Plug;
            return (
              <div key={step.number} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-certfast-200 to-transparent"></div>
                )}

                <div className="relative bg-card border rounded-2xl p-8 text-center hover:border-certfast-200 transition-colors">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-certfast-100 text-certfast-700 mb-6">
                    <Icon className="h-8 w-8" />
                  </div>

                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-certfast-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {step.number}
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>

                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
