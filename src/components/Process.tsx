import { useState } from 'react';

const STEPS = [
  {
    num: '01',
    title: 'Discover',
    description: 'We map your goals, constraints, and core scope parameters before writing a single line of database or code.',
  },
  {
    num: '02',
    title: 'Design',
    description: 'Architecture blueprints, logical schema drafts, and interactive wireframes that align all project anchors.',
  },
  {
    num: '03',
    title: 'Build',
    description: 'Iterative, highly visible dev sprints with weekly demos — transparent, fully accountable, and adaptive.',
  },
  {
    num: '04',
    title: 'Deploy',
    description: 'Zero-downtime pipelines equipped with complete system observability, automatic health guards, and rollback.',
  },
  {
    num: '05',
    title: 'Scale',
    description: 'Ongoing query performance optimization, routine security updates, and active performance tuning during peaks.',
  },
];

export default function Process() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="process" className="bg-[#0E1319] py-24 px-[5vw]">
      <div className="reveal text-center mb-20">
        <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.12em] block mb-3">
          How We Work
        </span>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] text-[#F0F4FA]">
          A process built
          <br />
          for precision
        </h2>
      </div>

      <div className="reveal relative flex flex-col md:flex-row gap-12 md:gap-0 max-w-6xl mx-auto">
        {/* Horizontal glowing connector line on mid-large screens */}
        <div className="absolute hidden md:block top-7 left-[8%] right-[8%] h-[1.5px] bg-gradient-to-r from-transparent via-blue-500 via-cyan-400 via-blue-500 to-transparent pointer-events-none opacity-30 z-0" />

        {STEPS.map((step, idx) => {
          const isActive = activeIdx === idx;
          return (
            <div
              key={idx}
              onMouseEnter={() => setActiveIdx(idx)}
              className="flex-1 text-center px-4 relative z-10 group"
            >
              <div
                className={`w-14 h-14 rounded-full border-2 mx-auto flex items-center justify-center font-extrabold text-sm mb-6 transition-all duration-300 transform cursor-none ${
                  isActive
                    ? 'border-blue-500 bg-blue-500/10 text-blue-400 scale-110 shadow-lg shadow-blue-500/25 ring-4 ring-blue-500/5'
                    : 'border-white/10 bg-[#0E1319] text-[#F0F4FA]/40 group-hover:border-blue-500 group-hover:text-blue-400'
                }`}
              >
                {step.num}
              </div>

              <h4 className="text-[#F0F4FA] font-bold text-lg mb-2.5 tracking-tight">
                {step.title}
              </h4>
              <p className="text-[#F0F4FA]/50 text-xs sm:text-[0.82rem] leading-relaxed max-w-[220px] mx-auto font-normal">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
