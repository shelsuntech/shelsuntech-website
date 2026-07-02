import { useEffect, useRef } from 'react';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      o: number;
    }> = [];

    const resize = () => {
      canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', onMouseMove);
    }

    // Initialize particles
    for (let i = 0; i < 75; i++) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0003,
        vy: (Math.random() - 0.5) * 0.0003,
        r: Math.random() * 1.5 + 0.5,
        o: Math.random() * 0.5 + 0.2,
      });
    }

    let animationId: number;
    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Mouse reactive atmospheric ambient glow tint
      const gx = mouseRef.current.x || W / 2;
      const gy = mouseRef.current.y || H / 2;
      const radialGlow = ctx.createRadialGradient(gx, gy, 0, gx, gy, 450);
      radialGlow.addColorStop(0, 'rgba(59, 130, 246, 0.05)');
      radialGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, W, H);

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1;
        if (p.y > 1) p.y = 0;

        const px = p.x * W;
        const py = p.y * H;

        const dx = (mouseRef.current.x || W / 2) - px;
        const dy = (mouseRef.current.y || H / 2) - py;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / 300);

        ctx.beginPath();
        ctx.arc(px, py, p.r + proximity * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${p.o + proximity * 0.55})`;
        ctx.fill();
      });

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = (a.x - b.x) * W;
          const dy = (a.y - b.y) * H;
          const d = Math.sqrt(dx * dx + dy * dy);

          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x * W, a.y * H);
            ctx.lineTo(b.x * W, b.y * H);
            ctx.strokeStyle = `rgba(59, 130, 246, ${(1 - d / 120) * 0.16})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (container) {
        container.removeEventListener('mousemove', onMouseMove);
      }
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 px-5"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse pointer-events-none" />

      <div className="relative z-10 text-center max-w-[860px] mx-auto animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 text-xs font-bold tracking-widest uppercase rounded-full mb-8">
          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
          Available for New Projects
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6">
          Engineering{' '}
          <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Intelligent
            <br />
            Digital Solutions
          </span>
        </h1>

        <p className="text-[#F0F4FA]/55 text-base sm:text-xl leading-relaxed max-w-[560px] mx-auto mb-10 font-normal">
          AI-native products, custom systems, and dynamic web platforms engineered to scale.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="#contact"
            className="px-8 py-3.5 bg-gradient-to-r from-blue-500 to-cyan-400 text-black font-extrabold text-sm rounded-full tracking-wide hover:opacity-90 hover:scale-[1.03] transition-all duration-200 shadow-lg shadow-blue-500/20"
          >
            Book Demo
          </a>
          <a
            href="#products"
            className="px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-[#F0F4FA] font-semibold text-sm rounded-full tracking-wide hover:scale-[1.03] transition-all duration-200"
          >
            Explore Products →
          </a>
        </div>
      </div>
    </section>
  );
}
