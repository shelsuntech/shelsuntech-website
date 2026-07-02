import { useEffect, useState } from 'react';

const TESTIMONIALS = [
  {
    stars: 5,
    quote: "Shelsun Tech didn't just build our platform — they redesigned how we think about data. The AI layers they integrated became our primary market competitive differentiator within six months of launch.",
    avatar: 'AR',
    name: 'Ananya Reddy',
    role: 'CTO, Meridian AI',
  },
  {
    stars: 5,
    quote: "We have collaborated with many agencies over the years. None have matched Shelsun Tech's elite combination of system engineering excellence and deep respect for strategic business outcomes.",
    avatar: 'JK',
    name: 'James Kori',
    role: 'VP Engineering, Apex Digital',
  },
  {
    stars: 5,
    quote: "The programmatic workflow pipelines they created execute tasks that used to consume over forty human hours. It has run round-the-clock with zero faults. That is pristine engineering.",
    avatar: 'SM',
    name: 'Sara Mansouri',
    role: 'COO, FlowBridge Logistics',
  },
];

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="bg-[#0B0F14] py-24 px-[5vw] overflow-hidden">
      <div className="reveal text-center mb-16">
        <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.12em] block mb-3">
          What Clients Say
        </span>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] text-[#F0F4FA]">
          Trusted by the teams
          <br />
          shaping what's next
        </h2>
      </div>

      <div className="reveal max-w-lg sm:max-w-xl md:max-w-2xl mx-auto overflow-hidden relative">
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `translate3d(-${activeIdx * 100}%, 0, 0)` }}
        >
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="w-full flex-shrink-0 px-4">
              <div className="relative bg-[#111820] border border-white/5 p-8 sm:p-10 rounded-2xl shadow-xl overflow-hidden before:content-['\u201C'] before:absolute before:top-2 before:right-6 before:font-serif before:text-8xl before:text-blue-500/5 before:leading-none select-none">
                <div className="text-amber-400 text-sm tracking-widest mb-6">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                <blockquote className="text-[#F0F4FA] text-base sm:text-lg leading-relaxed font-normal mb-8 italic">
                  "{t.quote}"
                </blockquote>

                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-gradient-to-br from-blue-500 to-cyan-400 text-black shadow-inner">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-black text-[#F0F4FA]">{t.name}</div>
                    <div className="text-xs text-[#F0F4FA]/40 font-medium">{t.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide pagination selectors */}
      <div className="flex gap-2.5 justify-center mt-10">
        {TESTIMONIALS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`testi-dot w-2 h-2 rounded-full border-none outline-none cursor-none p-0 transition-all duration-300 ${
              activeIdx === idx ? 'bg-blue-500 scale-125' : 'bg-white/10 hover:bg-white/30'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
