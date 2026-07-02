import { useState } from 'react';

interface ArticleCardProps {
  tag: string;
  title: string;
  meta: string;
}

function ArticleCard({ tag, title, meta }: ArticleCardProps) {
  return (
    <div className="reveal flex flex-col justify-between bg-[#111820]/60 hover:bg-[#111820] border border-white/5 p-6 rounded-xl hover:border-blue-500/20 transition-all duration-300 cursor-none h-full group">
      <div>
        <span className="text-[0.62rem] sm:text-[0.68rem] font-bold text-amber-500 uppercase tracking-widest block mb-3.5">
          {tag}
        </span>
        <h4 className="text-[#F0F4FA] font-bold text-xs sm:text-[0.95rem] tracking-tight leading-snug group-hover:text-cyan-400 transition-colors duration-300 mb-6 line-clamp-3">
          {title}
        </h4>
      </div>
      <div className="text-[10px] sm:text-xs text-[#F0F4FA]/30 font-semibold uppercase tracking-wider">
        {meta}
      </div>
    </div>
  );
}

export default function Insights() {
  const [activeTab, setActiveTab] = useState<'featured' | 'article'>('featured');

  return (
    <section id="insights" className="bg-[#0B0F14] py-24 px-[5vw] border-t border-b border-white/5 relative">
      <div className="reveal text-left max-w-3xl mb-16">
        <span className="text-amber-500 text-xs font-bold uppercase tracking-[0.14em] block mb-3">
          INSIGHTS FOR LOCAL BUSINESSES
        </span>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] text-[#F0F4FA] mb-4">
          Practical technology guidance
          <br />
          for service businesses
        </h2>
        <p className="text-[#F0F4FA]/50 text-base leading-relaxed">
          No fluff — these are operational insights for business owners making real decisions about technology.
        </p>
      </div>

      {/* Featured Insight Card */}
      <div className="reveal bg-[#111820]/40 border border-blue-500/30 rounded-2xl p-6 md:p-8 mb-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl hover:shadow-blue-500/[0.02] hover:border-blue-400/40 transition-all duration-300">
        
        {/* Left Side: Illustration / Image placeholder */}
        <div className="lg:col-span-6 bg-slate-950/80 border border-white/5 rounded-xl h-60 flex flex-col justify-between p-6 relative overflow-hidden">
          <div className="grid-lines opacity-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(34,211,238,0.1)_0%,transparent_70%)] pointer-events-none" />

          <div className="flex justify-between items-center z-10">
            <span className="text-[10px] font-mono text-cyan-400/60 font-semibold tracking-wider">CORESYSTEM: INBOUND_FLOW</span>
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          </div>

          <div className="flex flex-col gap-2 mx-auto justify-center items-center my-auto z-10 w-full">
            {/* Team metric mock visual */}
            <div className="flex gap-1.5 items-end justify-center w-full max-w-[200px] h-20 border-b border-white/5 pb-1">
              {[40, 75, 45, 95, 60, 110, 80].map((h, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-sm flex-1"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <span className="text-[10px] text-zinc-500 font-mono tracking-widest mt-1.5 uppercase">Weekly Inbound Call Volume</span>
          </div>

          <div className="text-[10px] text-zinc-500 font-mono text-center z-10 uppercase">
            Interactive Diagnostics Portal
          </div>
        </div>

        {/* Right Side: Article summary */}
        <div className="lg:col-span-6 text-left flex flex-col justify-center h-full">
          <div>
            <span className="inline-block px-3.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[0.68rem] font-bold tracking-wider uppercase rounded-full mb-4">
              AI Receptionist
            </span>
            <h3 className="text-[#F0F4FA] text-xl sm:text-2xl font-extrabold tracking-tight mb-4 leading-snug">
              Why Your Salon or Clinic Is Losing 20% of New Clients to Voicemail — And How to Fix It in 2 Weeks
            </h3>
            <p className="text-[#F0F4FA]/50 text-xs sm:text-sm leading-relaxed mb-8 font-normal">
              A breakdown of the revenue impact of missed after-hours calls, with a practical implementation guide for AI phone coverage that doesn't sound robotic.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('article')}
            className="self-start px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-[#F0F4FA] font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 cursor-none"
          >
            Read Article →
          </button>
        </div>
      </div>

      {/* Grid of Other Articles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ArticleCard
          tag="AUTOMATION"
          title="The 5 Administrative Tasks Killing Your Dental Practice's Productivity (And What to Automate First)"
          meta="8 min read · Dental Clinics"
        />
        <ArticleCard
          tag="SOFTWARE SELECTION"
          title="How to Evaluate Business Software Without Getting Sold the Wrong Thing"
          meta="6 min read · All Businesses"
        />
        <ArticleCard
          tag="LAW FIRMS"
          title="Client Intake Automation for Solo and Small Law Firms: A Practical Implementation Guide"
          meta="10 min read · Legal"
        />
        <ArticleCard
          tag="AI TOOLS"
          title="AI Receptionists vs. Answering Services: A Cost and Quality Comparison for Small Businesses"
          meta="7 min read · All Industries"
        />
      </div>
    </section>
  );
}
