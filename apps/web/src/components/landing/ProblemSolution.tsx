import { XCircle, CheckCircle2, Clock, DollarSign, RefreshCw, FileSpreadsheet } from "lucide-react";

export function ProblemSolution() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            The Old Way vs. The CertFast Way
          </h2>
          <p className="text-lg text-muted-foreground">
            Stop wasting time and money on outdated compliance processes.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Old Way */}
          <div className="bg-red-50/50 border border-red-100 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-red-900">The Old Way</h3>
            </div>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                <span className="text-red-900/80">12 months to SOC 2</span>
              </li>
              <li className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                <span className="text-red-900/80">€80K+ for consultants</span>
              </li>
              <li className="flex items-start gap-3">
                <RefreshCw className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                <span className="text-red-900/80">Manual evidence collection</span>
              </li>
              <li className="flex items-start gap-3">
                <FileSpreadsheet className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                <span className="text-red-900/80">Spreadsheets everywhere</span>
              </li>
            </ul>
          </div>
          
          {/* CertFast Way */}
          <div className="bg-green-50/50 border border-green-100 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-900">The CertFast Way</h3>
            </div>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <span className="text-green-900/80 font-medium">90 days guaranteed</span>
              </li>
              <li className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <span className="text-green-900/80 font-medium">€2.4K-12K/year</span>
              </li>
              <li className="flex items-start gap-3">
                <RefreshCw className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <span className="text-green-900/80 font-medium">Auto-sync with GitHub/AWS</span>
              </li>
              <li className="flex items-start gap-3">
                <FileSpreadsheet className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <span className="text-green-900/80 font-medium">Single source of truth</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
