interface ResultCardProps {
  category: string;
  subCategory: string;
  title: string;
  description: string;
  badgeAccent: string;
  imgUrl?: string;
  metrics: Array<{ value: string; label: string }>;
}

function ResultCard({ category, subCategory, title, description, badgeAccent, metrics }: ResultCardProps) {
  return (
    <div className="reveal flex flex-col bg-[#111820] border border-white/5 rounded-2xl overflow-hidden shadow-2xl hover:border-blue-500/20 transition-all duration-300">
      {/* Visual illustration top */}
      <div className="relative h-44 bg-slate-950/60 overflow-hidden flex items-center justify-center p-6 border-b border-white/5">
        <div className="grid-lines opacity-10" />
        <div className="absolute inset-0 bg-radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.12)_0%,transparent_100%) pointer-events-none" />
        
        {/* Animated dynamic wireframe matching category */}
        {category.toLowerCase().includes('spa') ? (
          <div className="w-full h-full flex flex-col justify-between relative">
            <div className="flex justify-between items-center text-[10px] font-mono text-cyan-400">
              <span>● BOT_ACTIVE</span>
              <span>PORT: 3000</span>
            </div>
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-xs">💬</div>
              <div className="bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-lg text-[11px] max-w-[200px] text-[#F0F4FA]/70">
                Hi! Ready to book a hydrafacial session?
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <div className="bg-cyan-500/10 border border-cyan-500/20 px-3 py-1.5 rounded-lg text-[11px] max-w-[200px] text-[#F0F4FA]/70">
                Yes, looking for slots at 6 PM.
              </div>
              <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-xs">👤</div>
            </div>
          </div>
        ) : category.toLowerCase().includes('clinic') ? (
          <div className="w-full h-full flex flex-col justify-between relative">
            <div className="flex justify-between items-center text-[10px] font-mono text-indigo-400">
              <span>● INTEGRATION_OK</span>
              <span>SCHEDULER_DAEMON</span>
            </div>
            <div className="flex items-center justify-center gap-3 py-4">
              <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-center flex-1">
                <div className="text-xs font-bold text-[#F0F4FA]">10:00 AM</div>
                <div className="text-[10px] text-[#F0F4FA]/50 font-mono">CONFIRMED</div>
              </div>
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center flex-1">
                <div className="text-xs font-bold text-[#F0F4FA]">02:30 PM</div>
                <div className="text-[10px] text-[#F0F4FA]/50 font-mono">REMINDED</div>
              </div>
            </div>
            <div className="text-[10px] text-center font-mono text-zinc-500">ELECTRONIC HEALTH RECORD (EHR) BRIDGE</div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col justify-between relative">
            <div className="flex justify-between items-center text-[10px] font-mono text-[#818CF8]">
              <span>● MULTICHANNEL_INBOUND</span>
              <span>PIPELINE_STABLE</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 py-4">
              {['Web', 'Call', 'Ref', 'Social'].map((source) => (
                <div key={source} className="bg-white/4 border border-white/5 rounded-lg py-2 text-center">
                  <div className="text-[10px] font-mono text-zinc-400">{source}</div>
                  <div className="text-xs font-bold text-cyan-400">⚡</div>
                </div>
              ))}
            </div>
            <div className="text-[10px] text-center font-mono text-zinc-500">CONSOLIDATED COMMERCE DASHBOARD</div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
        <div>
          <span className="text-[0.7rem] font-bold tracking-widest uppercase text-amber-500 block mb-2">
            {category} <span className="opacity-40">·</span> {subCategory}
          </span>
          <h3 className="text-[#F0F4FA] text-lg md:text-xl font-extrabold tracking-tight mb-3">
            {title}
          </h3>
          <p className="text-[#F0F4FA]/50 text-xs sm:text-sm leading-relaxed mb-8">
            {description}
          </p>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
          {metrics.map((m, idx) => (
            <div key={idx}>
              <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent mb-1 leading-none">
                {m.value}
              </div>
              <div className="text-[10px] sm:text-xs text-[#F0F4FA]/30 uppercase tracking-widest font-semibold leading-normal">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ClientResults() {
  return (
    <section id="client-results" className="bg-[#0B0F14] py-24 px-[5vw] border-t border-white/5 relative">
      <div className="reveal text-left max-w-3xl mb-16">
        <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.12em] block mb-3">
          Client Results
        </span>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] text-[#F0F4FA] mb-4">
          What happens when enterprise
          <br />
          systems meet small business
        </h2>
        <p className="text-[#F0F4FA]/50 text-base leading-relaxed">
          These results come from applying real engineering discipline — not generic templates — to the specific bottlenecks each business faced.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ResultCard
          category="Med Spa"
          subCategory="AI Receptionist"
          title="Med Spa Captures After-Hours Leads With AI Receptionist Deployment"
          description="High-end med spa was losing consultation requests to voicemail every evening and weekend. We deployed a conversational AI receptionist that qualifies leads, books consultations, and escalates complex inquiries."
          badgeAccent="MED SPA · AI RECEPTIONIST"
          metrics={[
            { value: '47%', label: 'More consultations booked' },
            { value: '24/7', label: 'Coverage, zero staff cost' },
          ]}
        />

        <ResultCard
          category="Dental Clinic"
          subCategory="Automation"
          title="Dental Practice Reduces No-Shows by 38% With Automated Recall System"
          description="Multi-location dental practice had no consistent recall process. Reminders were manual and inconsistent. We built an automated reminder and recall system integrated directly with their EHR platform."
          badgeAccent="DENTAL CLINIC · AUTOMATION"
          metrics={[
            { value: '38%', label: 'Fewer no-shows' },
            { value: '12 hrs', label: 'Admin time saved weekly' },
          ]}
        />

        <ResultCard
          category="Law Firm"
          subCategory="Client Intake"
          title="Personal Injury Firm Automates Lead Intake From 4 Channels Into One Dashboard"
          description="Leads were arriving via website, phone, referral, and social — with no unified tracking. We built an automated intake system that qualifies, routes, and tracks every lead with zero manual data entry."
          badgeAccent="LAW FIRM · CLIENT INTAKE"
          metrics={[
            { value: '3×', label: 'Faster intake speed' },
            { value: '0 leads', label: 'Falling through cracks' },
          ]}
        />
      </div>
    </section>
  );
}
