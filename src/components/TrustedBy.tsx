import { Layers, Monitor, Globe, Zap, Cpu, Shield, Sun, Share2 } from 'lucide-react';

const LOGOS = [
  { icon: Layers, name: 'NovaSoft' },
  { icon: Monitor, name: 'ClearVista' },
  { icon: Globe, name: 'Meridian AI' },
  { icon: Zap, name: 'Voltex Systems' },
  { icon: Cpu, name: 'Apex Digital' },
  { icon: Shield, name: 'Fortis Cloud' },
  { icon: Sun, name: 'Luminary Tech' },
  { icon: Share2, name: 'FlowBridge' },
];

export default function TrustedBy() {
  return (
    <section id="trusted" className="py-12 border-y border-white/5 bg-[#0B0F14] overflow-hidden">
      <p className="text-center text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#F0F4FA]/30 mb-8">
        Trusted by forward-thinking teams
      </p>
      
      <div className="relative w-full overflow-hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[150px] before:bg-gradient-to-r before:from-[#0B0F14] before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-[150px] after:bg-gradient-to-l after:from-[#0B0F14] after:to-transparent after:z-10">
        <div className="animate-marquee flex gap-16 w-max py-2">
          {/* Loop twice to make it seamless */}
          {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, idx) => {
            const Icon = logo.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2.5 text-sm font-semibold text-[#F0F4FA]/30 hover:text-[#F0F4FA]/65 transition-colors duration-300 pointer-events-auto"
              >
                <Icon className="w-5 h-5 text-current" strokeWidth={2.2} />
                <span className="tracking-tight">{logo.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
