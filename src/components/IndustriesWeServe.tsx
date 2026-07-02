import React from 'react';

interface IndustryCardProps {
  key?: React.Key;
  icon: string;
  title: string;
  description: string;
  tags: string[];
}

function IndustryCard({ icon, title, description, tags }: IndustryCardProps) {
  return (
    <div className="reveal flex flex-col justify-between bg-[#111820] border border-white/5 p-8 rounded-2xl shadow-xl hover:border-cyan-400/20 hover:shadow-cyan-400/[0.02] hover:-translate-y-1 transition-all duration-300">
      <div>
        <span className="text-3xl mb-5 block">{icon}</span>
        <h3 className="text-[#F0F4FA] text-lg font-extrabold tracking-tight mb-3">
          {title}
        </h3>
        <p className="text-[#F0F4FA]/50 text-xs sm:text-sm leading-relaxed mb-8">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-[0.68rem] font-bold text-[#F0F4FA]/55 bg-white/4 border border-white/5 py-1 px-2.5 rounded-md hover:bg-cyan-400/5 hover:border-cyan-400/20 hover:text-cyan-400 transition-colors duration-200"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

const INDUSTRIES = [
  {
    icon: '💇',
    title: 'Salons & Beauty Studios',
    description: 'Online booking, automated reminders, client retention campaigns, and point-of-sale integrations that reduce no-shows and fill your calendar.',
    tags: ['Online Booking', 'Reminders', 'AI Receptionist', 'POS Integration'],
  },
  {
    icon: '🦷',
    title: 'Dental Clinics',
    description: 'HIPAA-conscious patient communication, appointment recall automation, insurance verification workflows, and EHR system integrations.',
    tags: ['Patient Recall', 'EHR Integration', 'HIPAA Aware', 'Billing Automation'],
  },
  {
    icon: '✨',
    title: 'Med Spas',
    description: 'Consultation intake automation, treatment plan follow-ups, membership management systems, and premium client experience workflows.',
    tags: ['Intake Forms', 'Memberships', 'Follow-up Sequences', 'CRM'],
  },
  {
    icon: '⚖️',
    title: 'Law Firms',
    description: 'Client intake automation, matter management integrations, secure document workflows, and 24/7 AI intake capture for after-hours inquiries.',
    tags: ['Intake Automation', 'Document Workflow', 'Billing Integration', '24/7 AI Intake'],
  },
  {
    icon: '🏠',
    title: 'Home Service Businesses',
    description: 'Dispatch automation, customer follow-up systems, review requests workflows, and field team management tools for HVAC, plumbing, landscaping, and cleaning companies.',
    tags: ['Dispatch', 'Job Tracking', 'Review Requests'],
  },
  {
    icon: '🏢',
    title: 'Local Service Companies',
    description: 'Custom CRM buildouts, quote-to-invoice automation, lead nurturing sequences, and reporting dashboards for any service business ready to scale.',
    tags: ['Custom CRM', 'Quote Automation', 'Lead Nurturing'],
  },
];

export default function IndustriesWeServe() {
  return (
    <section id="industries" className="bg-[#0E1319] py-24 px-[5vw] border-t border-b border-white/5">
      <div className="reveal text-left max-w-3xl mb-16">
        <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.12em] block mb-3">
          INDUSTRIES WE SERVE
        </span>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] text-[#F0F4FA] mb-4">
          Built for businesses where
          <br />
          every appointment matters
        </h2>
        <p className="text-[#F0F4FA]/50 text-base leading-relaxed">
          Each industry has unique compliance requirements, customer expectations, and workflow patterns. We've built systems for all of these.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INDUSTRIES.map((ind, idx) => (
          <IndustryCard
            key={idx}
            icon={ind.icon}
            title={ind.title}
            description={ind.description}
            tags={ind.tags}
          />
        ))}
      </div>
    </section>
  );
}
