import { RefreshCw, Calendar, PiggyBank, Github, Cloud, MessageSquare } from "lucide-react";

const features = [
  {
    icon: RefreshCw,
    title: "Set It and Forget It",
    description:
      "Connect your stack (AWS, GitHub, Slack) and let CertFast collect evidence 24/7. No more screenshot hunts.",
    integrations: [
      { icon: Github, label: "GitHub" },
      { icon: Cloud, label: "AWS" },
      { icon: MessageSquare, label: "Slack" },
    ],
  },
  {
    icon: Calendar,
    title: "Guided from Day One",
    description:
      "Our AI builds a custom compliance roadmap. Know exactly what to do today, this week, and this month.",
    highlights: ["AI-powered roadmap", "Weekly milestones", "Progress tracking"],
  },
  {
    icon: PiggyBank,
    title: "Startup-Friendly Pricing",
    description:
      "From €199/month. Pay as you grow. Cancel anytime. No hidden fees.",
    highlights: ["5x cheaper than Vanta", "No setup fees", "Cancel anytime"],
  },
];

export function Features() {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Get Certified
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful features designed for fast-moving startups.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card border rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 bg-certfast-100 rounded-xl w-fit mb-6">
                <feature.icon className="h-8 w-8 text-certfast-600" />
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground mb-6">
                {feature.description}
              </p>
              
              {feature.integrations && (
                <div className="flex gap-3">
                  {feature.integrations.map((integration, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-lg text-sm text-muted-foreground"
                    >
                      <integration.icon className="h-4 w-4" />
                      <span>{integration.label}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {feature.highlights && (
                <ul className="space-y-2">
                  {feature.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-certfast-500"></div>
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
