import { Helmet } from "react-helmet-async";
import {
  Hero,
  SocialProof,
  ProblemSolution,
  Features,
  HowItWorks,
  Pricing,
  FAQ,
  FinalCTA,
  Footer,
} from "@/components/landing";

export function LandingPage() {
  return (
    <>
      <Helmet>
        <title>CertFast - SOC 2 Compliance in 90 Days | 5x Cheaper Than Vanta</title>
        <meta
          name="description"
          content="Automate SOC 2, ISO 27001, and GDPR compliance for your startup. Get certified in 90 days for €199/month. No consultants needed."
        />
        <meta
          property="og:title"
          content="CertFast - Compliance Automation for Startups"
        />
        <meta
          property="og:description"
          content="Get SOC 2 certified in 90 days for 5x less than Vanta"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CertFast - SOC 2 in 90 Days" />
        <meta
          name="twitter:description"
          content="Compliance automation for European startups. 5x cheaper than Vanta."
        />
      </Helmet>

      <main className="min-h-screen bg-background">
        <Hero />
        <SocialProof />
        <ProblemSolution />
        <Features />
        <HowItWorks />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
}
