const REASONS = [
  {
    num: '01',
    icon: '🏛️',
    title: 'Enterprise Architecture',
    description: 'We design systems that enterprise teams trust — modular, clean, documented, and built for seamless scaling.',
  },
  {
    num: '02',
    icon: '📈',
    title: 'Scalable Systems',
    description: 'From 100 to 10 million active users — our infrastructure adjusts automatically without rewriting core logic.',
  },
  {
    num: '03',
    icon: '🔐',
    title: 'Security First',
    description: 'Every deployment layer is hardened by default. Fully compliance-ready and structurally fortified from day one.',
  },
  {
    num: '04',
    icon: '🚀',
    title: 'Rapid Delivery',
    description: 'We ship production modules in weeks, not quarters, utilizing agile iteration methods proven on 200+ solutions.',
  },
  {
    num: '05',
    icon: '🧠',
    title: 'AI-Native Development',
    description: 'Intelligence is not a secondary feature — it is woven directly into workflows, processing, and visual modules.',
  },
  {
    num: '06',
    icon: '🤝',
    title: 'Long-Term Partnership',
    description: 'We measure success in years, not sprints. The vast majority of our core clients maintain active 3+ year relationships.',
  },
];

export default function WhyUs() {
  return (
    <section id="why" className="bg-[#0E1319] py-24 px-[5vw] border-t border-b border-white/5">
      <div className="reveal text-center mb-16">
        <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.12em] block mb-3">
          Why ShelSun Tech
        </span>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] text-[#F0F4FA]">
          Built different.
          <br />
          Engineered to last.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {REASONS.map((item, idx) => (
          <div
            key={idx}
            className="reveal why-card p-8 border border-white/5 hover:border-blue-500/30 rounded-2xl bg-white/4 hover:bg-blue-500/[0.03] hover:-translate-y-1 transition-all duration-300 group cursor-none"
          >
            <span className="font-mono text-xs font-bold tracking-widest text-blue-400 block mb-6">
              {item.num}
            </span>
            <span className="text-3xl mb-4 block group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
              {item.icon}
            </span>
            <h3 className="text-[1.05rem] font-bold text-[#F0F4FA] mb-2.5 tracking-tight">
              {item.title}
            </h3>
            <p className="text-[#F0F4FA]/50 text-[0.875rem] leading-relaxed font-normal">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
