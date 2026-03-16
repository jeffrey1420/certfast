import { Shield, CheckCircle, Lock } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-certfast-50 to-white py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-certfast-100 text-certfast-800 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-certfast-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-certfast-600"></span>
            </span>
            Now SOC 2 Type II Certified
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            From Zero to SOC 2 in 90 Days—
            <span className="text-certfast-600">Without Breaking the Bank</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Compliance automation for European startups. 5x cheaper than Vanta. No consultants needed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="/register"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-200 bg-certfast-600 rounded-lg hover:bg-certfast-700 hover:shadow-lg hover:-translate-y-0.5"
            >
              Start Free Trial
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-certfast-700 transition-all duration-200 bg-certfast-100 rounded-lg hover:bg-certfast-200"
            >
              See How It Works
            </a>
          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Shield className="h-5 w-5 text-certfast-600" />
              <span>SOC 2 Type II Certified</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Lock className="h-5 w-5 text-certfast-600" />
              <span>ISO 27001 Ready</span>
            </div>
          </div>
        </div>
        
        {/* Hero Image / Dashboard Preview */}
        <div className="mt-16 relative max-w-5xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-certfast-500 to-certfast-700 rounded-2xl blur opacity-30"></div>
          <div className="relative bg-card border rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-muted/50 px-4 py-3 border-b flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="flex-1 text-center text-xs text-muted-foreground font-mono">
                CertFast Dashboard
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-certfast-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-certfast-700">87%</div>
                  <div className="text-sm text-muted-foreground">Compliance Score</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-700">12</div>
                  <div className="text-sm text-muted-foreground">Days to Audit</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-700">45</div>
                  <div className="text-sm text-muted-foreground">Controls Ready</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-2 bg-muted rounded-full w-3/4"></div>
                <div className="h-2 bg-muted rounded-full w-1/2"></div>
                <div className="h-2 bg-muted rounded-full w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
