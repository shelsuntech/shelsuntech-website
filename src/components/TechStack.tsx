const TECHS = [
  { icon: '⚛️', name: 'React' },
  { icon: '▲', name: 'Next.js' },
  { icon: '🟩', name: 'Node.js' },
  { icon: '🐍', name: 'Python' },
  { icon: '🧠', name: 'AI / ML' },
  { icon: '☁️', name: 'AWS' },
  { icon: '🐳', name: 'Docker' },
  { icon: '⚙️', name: 'Kubernetes' },
  { icon: '🐘', name: 'PostgreSQL' },
  { icon: '🍃', name: 'MongoDB' },
  { icon: '📡', name: 'GraphQL' },
  { icon: '🔷', name: 'TypeScript' },
  { icon: '🔴', name: 'Redis' },
  { icon: '🔥', name: 'PyTorch' },
  { icon: '🌊', name: 'Kafka' },
  { icon: '🔧', name: 'Terraform' },
];

export default function TechStack() {
  return (
    <section id="techstack" className="bg-[#0E1319] py-24 px-[5vw] border-t border-b border-white/5">
      <div className="reveal text-center mb-16">
        <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.12em] block mb-3">
          Technology Stack
        </span>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] text-[#F0F4FA]">
          Best-in-class tools,
          <br />
          applied with expertise
        </h2>
      </div>

      <div className="reveal flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
        {TECHS.map((tech, idx) => (
          <div
            key={idx}
            className="tech-pill px-5.5 py-3 border border-white/5 rounded-full bg-white/4 text-xs sm:text-[0.88rem] font-semibold text-[#F0F4FA]/50 flex items-center gap-2 hover:border-blue-500/50 hover:text-[#F0F4FA] hover:bg-blue-500/5 hover:-translate-y-1 transition-all duration-300 cursor-none"
          >
            <span>{tech.icon}</span>
            <span className="tracking-tight">{tech.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
