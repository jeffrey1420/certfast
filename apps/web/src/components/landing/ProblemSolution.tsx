import {
  XCircle,
  CheckCircle2,
  Clock,
  DollarSign,
  RefreshCw,
  FileSpreadsheet,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const itemIcons = [Clock, DollarSign, RefreshCw, FileSpreadsheet];

export function ProblemSolution() {
  const { t } = useTranslation();
  const oldItems = t('landing.problemSolution.oldWay.items', {
    returnObjects: true,
  }) as string[];
  const newItems = t('landing.problemSolution.newWay.items', {
    returnObjects: true,
  }) as string[];

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('landing.problemSolution.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('landing.problemSolution.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-red-50/50 border border-red-100 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-red-900">
                {t('landing.problemSolution.oldWay.title')}
              </h3>
            </div>

            <ul className="space-y-4">
              {oldItems.map((item, index) => {
                const Icon = itemIcons[index] || Clock;
                return (
                  <li key={item} className="flex items-start gap-3">
                    <Icon className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                    <span className="text-red-900/80">{item}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="bg-green-50/50 border border-green-100 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-900">
                {t('landing.problemSolution.newWay.title')}
              </h3>
            </div>

            <ul className="space-y-4">
              {newItems.map((item, index) => {
                const Icon = itemIcons[index] || Clock;
                return (
                  <li key={item} className="flex items-start gap-3">
                    <Icon className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-green-900/80 font-medium">{item}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
