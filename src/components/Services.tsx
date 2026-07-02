import React, { useState } from 'react';

interface ServiceCardProps {
  key?: React.Key;
  icon: string;
  title: string;
  description: string;
}

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCoords({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="service-card relative bg-[#0E1319] p-8 border-b border-r border-[#2d3a4f]/10 overflow-hidden group hover:bg-[#111820] transition-colors duration-300 min-h-[220px]"
    >
      {/* Spotlight highlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 180px at ${coords.x}% ${coords.y}%, rgba(59,130,246,0.07) 0%, transparent 100%)`,
        }}
      />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-white/4 border border-white/5 mb-6 group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-lg group-hover:shadow-blue-500/10 transition-all duration-300">
          {icon}
        </div>
        <h3 className="text-[1.05rem] font-bold mb-2.5 text-[#F0F4FA] tracking-tight">{title}</h3>
        <p className="text-[#F0F4FA]/50 text-[0.88rem] leading-relaxed font-normal">{description}</p>
      </div>

      <span className="absolute bottom-6 right-6 text-[#F0F4FA]/15 text-lg group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-cyan-400 transition-all duration-300">
        ↗
      </span>
    </div>
  );
}

const SERVICES = [
  { icon: '🤖', title: 'AI Solutions', description: 'Custom models, intelligent agents, and predictive systems that learn and evolve with your business.' },
  { icon: '⚙️', title: 'Custom Software', description: 'Purpose-built applications engineered to solve the exact problems your industry faces.' },
  { icon: '🌐', title: 'Web Applications', description: 'High-performance web platforms with exceptional UX that converts and retains.' },
  { icon: '📱', title: 'Mobile Applications', description: 'Native and cross-platform mobile experiences that delight users on every device.' },
  { icon: '⚡', title: 'Automation Systems', description: 'Intelligent workflows that eliminate manual processes and accelerate operations at scale.' },
  { icon: '☁️', title: 'Cloud & DevOps', description: 'Infrastructure that scales automatically, deploys reliably, and monitors itself 24/7.' },
  { icon: '✦', title: 'UI/UX Design', description: 'Interfaces born from deep user research and refined through data-driven iteration.' },
  { icon: '🔄', title: 'Digital Transformation', description: 'Strategic technology adoption that repositions legacy businesses for a digital-first future.' },
];

export default function Services() {
  return (
    <section id="services" className="bg-[#0E1319] py-24 px-[5vw]">
      <div className="reveal flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
        <div>
          <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.12em] block mb-3">
            What We Build
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] text-[#F0F4FA]">
            End-to-end solutions
            <br />
            for modern enterprises
          </h2>
        </div>
        <p className="text-[#F0F4FA]/50 text-base max-w-[500px] leading-relaxed">
          From intelligence to interface — every layer of your digital infrastructure, built to scale.
        </p>
      </div>

      <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-[#F0F4FA]/5 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        {SERVICES.map((svc, i) => (
          <ServiceCard key={i} icon={svc.icon} title={svc.title} description={svc.description} />
        ))}
      </div>
    </section>
  );
}
