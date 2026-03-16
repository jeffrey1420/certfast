import { Plug, ListChecks, Award } from "lucide-react";

const steps = [
  {
    icon: Plug,
    number: "01",
    title: "Connect Your Tools",
    description:
      "Link GitHub, AWS, and HR systems in 5 minutes. We integrate with 50+ services.",
  },
  {
    icon: ListChecks,
    number: "02",
    title: "Follow Your Roadmap",
    description:
      "Complete tasks. CertFast tracks progress automatically and reminds you of deadlines.",
  },
  {
    icon: Award,
    number: "03",
    title: "Get Certified",
    description:
      "Pass your audit in 90 days. Guaranteed. Or we work for free until you do.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Get compliant in three simple steps. No consultants required.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-certfast-200 to-transparent"></div>
              )}
              
              <div className="relative bg-card border rounded-2xl p-8 text-center hover:border-certfast-200 transition-colors">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-certfast-100 text-certfast-700 mb-6">
                  <step.icon className="h-8 w-8" />
                </div>
                
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-certfast-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {step.number}
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
