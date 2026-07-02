import React, { useRef, useState } from 'react';

const STUDIES = [
  {
    industry: 'Fintech',
    title: 'AI-Powered Risk Engine',
    description: 'Replaced legacy rule systems with a real-time machine learning engine parsing over 50 signals.',
    metric: '340%',
    metricLabel: 'Increase in fraud detection accuracy',
    visual: (
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d1b2a] to-[#1a3a5c] flex items-center justify-center p-8 overflow-hidden">
        <div className="grid-lines opacity-10" />
        <svg width="150" height="80" viewBox="0 0 150 80" className="opacity-70 transform hover:scale-105 transition-transform duration-300">
          <polyline
            points="0,65 24,45 50,55 75,20 100,38 124,10 150,25"
            fill="none"
            stroke="#22D3EE"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M0,65 L24,45 L50,55 L75,20 L100,38 L124,10 L150,25 L150,80 L0,80 Z"
            fill="url(#finGrad)"
            opacity="0.25"
          />
          <defs>
            <linearGradient id="finGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22D3EE" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    ),
  },
  {
    industry: 'Healthcare',
    title: 'Patient Analytics Platform',
    description: 'Unified electronic health records across 12 individual networks into a single compliance cloud.',
    metric: '68%',
    metricLabel: 'Reduction in report generation time',
    visual: (
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a14] to-[#1a3828] flex items-center justify-center p-8 overflow-hidden">
        <div className="grid-lines opacity-10" />
        <svg width="150" height="80" viewBox="0 0 150 80" className="opacity-70 transform hover:scale-105 transition-transform duration-300">
          <rect x="15" y="50" width="20" height="30" rx="3.5" fill="#3B82F6" />
          <rect x="45" y="30" width="20" height="50" rx="3.5" fill="#22D3EE" />
          <rect x="75" y="15" width="20" height="65" rx="3.5" fill="#3B82F6" />
          <rect x="105" y="5" width="20" height="75" rx="3.5" fill="#22D3EE" />
        </svg>
      </div>
    ),
  },
  {
    industry: 'Retail & E-Commerce',
    title: 'Personalization Engine',
    description: 'Real-time recommended-buying array trained on 40M+ product lines, delivered across mobile & web.',
    metric: '2.8×',
    metricLabel: 'Lift in average cart order checkouts',
    visual: (
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0d28] to-[#301a4a] flex items-center justify-center p-8 overflow-hidden">
        <div className="grid-lines opacity-10" />
        <svg width="120" height="80" viewBox="0 0 100 80" className="opacity-70 transform hover:scale-105 transition-transform duration-300">
          <circle cx="50" cy="40" r="32" fill="none" stroke="#818CF8" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="50" cy="40" r="22" fill="none" stroke="#3B82F6" strokeWidth="2" />
          <circle cx="50" cy="40" r="10" fill="#22D3EE" opacity="0.6" />
          <line x1="50" y1="8" x2="50" y2="22" stroke="#818CF8" strokeWidth="2" />
          <line x1="50" y1="58" x2="50" y2="72" stroke="#818CF8" strokeWidth="2" />
          <line x1="18" y1="40" x2="32" y2="40" stroke="#818CF8" strokeWidth="2" />
          <line x1="68" y1="40" x2="82" y2="40" stroke="#818CF8" strokeWidth="2" />
        </svg>
      </div>
    ),
  },
  {
    industry: 'Logistics',
    title: 'Supply Chain Intelligence',
    description: 'Predictive fleet route coordinator mapping 10K+ deliveries based on live telemetry & load sensors.',
    metric: '$4.2M',
    metricLabel: 'Validated yearly operational savings',
    visual: (
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1400] to-[#2a2000] flex items-center justify-center p-8 overflow-hidden">
        <div className="grid-lines opacity-10" />
        <svg width="150" height="80" viewBox="0 0 150 80" className="opacity-70 transform hover:scale-105 transition-transform duration-300">
          <circle cx="20" cy="40" r="6" fill="#3B82F6" />
          <circle cx="75" cy="20" r="6" fill="#22D3EE" />
          <circle cx="130" cy="40" r="6" fill="#3B82F6" />
          <circle cx="75" cy="60" r="6" fill="#818CF8" />
          <line x1="20" y1="40" x2="75" y2="20" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="75" y1="20" x2="130" y2="40" stroke="#22D3EE" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="130" y1="40" x2="75" y2="60" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="75" y1="60" x2="20" y2="40" stroke="#818CF8" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="20" y1="40" x2="130" y2="40" stroke="rgba(59,130,246,0.2)" strokeWidth="1.2" />
        </svg>
      </div>
    ),
  },
];

export default function CaseStudies() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed modifier
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  return (
    <section id="cases" className="bg-[#0B0F14] py-24 px-[5vw] overflow-hidden">
      <div className="reveal flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
        <div>
          <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.12em] block mb-3">
            Case Studies
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] text-[#F0F4FA]">
            Results that
            <br />
            speak for themselves
          </h2>
        </div>
        <p className="text-[#F0F4FA]/50 text-base max-w-[400px] leading-relaxed">
          Tangible business outcomes, not just technical features. Drag to explore.
        </p>
      </div>

      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex gap-6 overflow-x-auto pb-10 no-scrollbar touch-pan-x cursor-grab ${
          isMouseDown ? 'cursor-grabbing select-none' : ''
        }`}
      >
        {STUDIES.map((study, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-[290px] sm:w-[360px] border border-white/5 rounded-2xl bg-[#111820] overflow-hidden hover:border-blue-500/25 shadow-lg flex flex-col group transition-all duration-300 transform select-none"
          >
            <div className="relative h-48 select-none pointer-events-none w-full overflow-hidden">
              {study.visual}
            </div>

            <div className="p-6 flex-grow flex flex-col select-none">
              <span className="text-cyan-400 text-[0.7rem] font-bold tracking-widest uppercase block mb-2 select-none">
                {study.industry}
              </span>
              <h3 className="text-lg font-black tracking-tight text-[#F0F4FA] mb-2 select-none">
                {study.title}
              </h3>
              <p className="text-[#F0F4FA]/50 text-xs sm:text-sm leading-relaxed mb-6 flex-grow select-none">
                {study.description}
              </p>

              <div className="border-t border-white/5 pt-4 select-none">
                <span className="block text-3xl font-black tracking-tight text-transparent bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text select-none">
                  {study.metric}
                </span>
                <span className="text-xs text-[#F0F4FA]/30 font-semibold uppercase tracking-wider select-none">
                  {study.metricLabel}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
