import { Building2, Rocket, Zap } from "lucide-react";

export function SocialProof() {
  return (
    <section className="py-16 bg-background border-y">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-muted-foreground text-sm font-medium uppercase tracking-wider mb-8">
          Trusted by 50+ European startups
        </p>
        
        {/* Company Logos */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mb-12">
          <div className="flex items-center gap-2 text-muted-foreground/60 hover:text-muted-foreground transition-colors">
            <Building2 className="h-8 w-8" />
            <span className="text-xl font-semibold">TechFlow</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground/60 hover:text-muted-foreground transition-colors">
            <Rocket className="h-8 w-8" />
            <span className="text-xl font-semibold">LaunchPad</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground/60 hover:text-muted-foreground transition-colors">
            <Zap className="h-8 w-8" />
            <span className="text-xl font-semibold">Voltaic</span>
          </div>
        </div>
        
        {/* Testimonial */}
        <div className="max-w-3xl mx-auto">
          <blockquote className="relative">
            <div className="absolute -top-4 -left-4 text-6xl text-certfast-200 font-serif">"</div>
            <p className="text-lg md:text-xl text-foreground text-center italic mb-6 relative z-10">
              We got SOC 2 in 87 days with CertFast. Vanta quoted us $45K—we paid €2,400.
            </p>
            <div className="text-center">
              <div className="font-semibold text-foreground">CTO, Series A SaaS</div>
              <div className="text-sm text-muted-foreground">European Fintech Startup</div>
            </div>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
