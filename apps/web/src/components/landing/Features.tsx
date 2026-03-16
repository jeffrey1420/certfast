import { Zap, Shield, Clock, Users, BarChart3, Lock } from 'lucide-react';

const features = [
  {
    name: 'Automated Evidence Collection',
    description:
      'Connect your cloud infrastructure and let CertFast automatically gather evidence. Save 40+ hours per audit with intelligent automation.',
    icon: Zap,
    color: 'bg-yellow-500',
  },
  {
    name: 'Control Management',
    description:
      'Track and manage all your compliance controls in one place. Map controls to multiple frameworks like SOC 2, ISO 27001, and GDPR.',
    icon: Shield,
    color: 'bg-green-500',
  },
  {
    name: 'Policy Templates',
    description:
      'Get started quickly with pre-built policy templates customized for your industry. Version control and approval workflows built-in.',
    icon: Lock,
    color: 'bg-blue-500',
  },
  {
    name: 'Real-time Dashboards',
    description:
      'Monitor your compliance posture with intuitive dashboards. Track progress, identify gaps, and stay audit-ready at all times.',
    icon: BarChart3,
    color: 'bg-purple-500',
  },
  {
    name: 'Team Collaboration',
    description:
      'Invite team members, assign roles, and collaborate on compliance tasks. Keep everyone aligned with automated reminders.',
    icon: Users,
    color: 'bg-pink-500',
  },
  {
    name: 'Audit Preparation',
    description:
      'Generate audit-ready reports with a single click. Organize evidence, document procedures, and impress your auditors.',
    icon: Clock,
    color: 'bg-orange-500',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-certfast-600 mb-2">
            Features
          </h2>
          <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything you need for compliance
          </p>
          <p className="text-xl text-gray-600">
            Powerful tools that streamline your entire compliance journey, from
            initial assessment to audit completion.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="relative group bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
            >
              <div
                className={`absolute top-0 right-0 w-24 h-24 ${feature.color} opacity-5 rounded-bl-full rounded-tr-2xl group-hover:opacity-10 transition-opacity`}
              ></div>

              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.color} bg-opacity-10 mb-6`}
              >
                <feature.icon
                  className={`h-6 w-6 ${feature.color.replace('bg-', 'text-')}`}
                />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.name}
              </h3>

              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-24 bg-gray-900 rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '500+', label: 'Companies' },
              { value: '50K+', label: 'Controls Tracked' },
              { value: '99.9%', label: 'Uptime' },
              { value: '4.9/5', label: 'Customer Rating' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
