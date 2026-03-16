import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How long does SOC 2 really take?",
    answer:
      "With CertFast, most startups achieve SOC 2 Type II in 90 days on average. Without automation, the process typically takes 12+ months due to manual evidence collection and consultant back-and-forth.",
  },
  {
    question: "Do I still need an auditor?",
    answer:
      "Yes, you'll still need a third-party auditor to issue your SOC 2 report. However, CertFast prepares all the evidence, documentation, and processes needed for the audit, significantly reducing the time and cost of the audit itself.",
  },
  {
    question: "What if I'm not technical?",
    answer:
      "CertFast is designed for teams of all technical levels. Our guided roadmap breaks down each task into simple, actionable steps. Plus, our support team is always available to help if you get stuck.",
  },
  {
    question: "Can I switch from Vanta?",
    answer:
      "Absolutely! We can import your existing compliance data, evidence, and progress from Vanta or other platforms. Most customers switch within a day and save 80% on their compliance costs.",
  },
  {
    question: "What frameworks do you support?",
    answer:
      "We currently support SOC 2 Type I & II, ISO 27001, and GDPR compliance. HIPAA and PCI DSS are coming soon. You can track multiple frameworks simultaneously with our Pro and Enterprise plans.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about CertFast.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-xl overflow-hidden bg-card"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-semibold text-foreground pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
