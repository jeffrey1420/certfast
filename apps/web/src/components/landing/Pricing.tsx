import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "€199",
    period: "/mo",
    description: "For small teams getting started with compliance",
    features: [
      "Up to 20 employees",
      "1 framework (SOC 2 or ISO 27001)",
      "Automated evidence collection",
      "Basic integrations",
      "Email support",
      "90-day roadmap",
    ],
    cta: "Start Trial",
    href: "/register",
    popular: false,
  },
  {
    name: "Pro",
    price: "€499",
    period: "/mo",
    description: "For growing startups with complex needs",
    features: [
      "20-100 employees",
      "2 frameworks (SOC 2 + ISO 27001)",
      "Advanced integrations",
      "Priority support",
      "Custom policies",
      "Vendor risk management",
      "API access",
    ],
    cta: "Start Trial",
    href: "/register",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "€999",
    period: "/mo",
    description: "For large organizations with custom requirements",
    features: [
      "100+ employees",
      "All frameworks",
      "Dedicated Customer Success Manager",
      "Custom integrations",
      "SSO & advanced security",
      "Audit support",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    href: "mailto:sales@certfast.io",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            5x cheaper than Vanta. No hidden fees. Cancel anytime.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? "bg-certfast-600 text-white shadow-xl scale-105"
                  : "bg-card border shadow-sm"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-sm font-semibold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className={`text-xl font-bold mb-2 ${plan.popular ? "text-white" : "text-foreground"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.popular ? "text-certfast-100" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>
              </div>
              
              <div className="mb-6">
                <span className={`text-4xl font-bold ${plan.popular ? "text-white" : "text-foreground"}`}>
                  {plan.price}
                </span>
                <span className={plan.popular ? "text-certfast-200" : "text-muted-foreground"}>
                  {plan.period}
                </span>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className={`p-0.5 rounded-full ${plan.popular ? "bg-certfast-500" : "bg-green-100"}`}>
                      <Check className={`h-4 w-4 ${plan.popular ? "text-white" : "text-green-600"}`} />
                    </div>
                    <span className={plan.popular ? "text-certfast-50" : "text-muted-foreground"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              <a
                href={plan.href}
                className={`block w-full text-center py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                  plan.popular
                    ? "bg-white text-certfast-600 hover:bg-certfast-50"
                    : "bg-certfast-600 text-white hover:bg-certfast-700"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
