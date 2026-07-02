import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      document.documentElement.classList.add('custom-cursor-active');
      mx = e.clientX;
      my = e.clientY;
    };

    const onTouchStart = () => {
      setIsVisible(false);
      document.documentElement.classList.remove('custom-cursor-active');
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchStart, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });

    // Dynamic Hover delegation
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = target.closest('a, button, [role="button"], input, textarea, .service-card, .tech-pill, .why-card, .case-card, .showcase-item, .testi-dot');
      if (isInteractive) {
        setIsHovered(true);
        document.body.classList.add('hovering');
      } else {
        setIsHovered(false);
        document.body.classList.remove('hovering');
      }
    };

    window.addEventListener('mouseover', onMouseOver);

    let animationFrameId: number;
    const updatePosition = () => {
      // Ring smooth following formula
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    updatePosition();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchStart);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animationFrameId);
      document.documentElement.classList.remove('custom-cursor-active');
      document.body.classList.remove('hovering');
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div id="cursor" className="pointer-events-none fixed inset-0 z-[9999]">
      <div
        ref={ringRef}
        id="cursor-ring"
        className={`w-9 h-9 border rounded-full absolute pointer-events-none transition-all duration-300 ease-out ${
          isHovered 
            ? 'w-14 h-14 border-cyan-400/80 bg-cyan-400/5 scale-110' 
            : 'border-cyan-400/40 bg-transparent'
        }`}
        style={{ left: 0, top: 0 }}
      />
      <div
        ref={dotRef}
        id="cursor-dot"
        className="w-2 h-2 bg-cyan-400 rounded-full absolute pointer-events-none"
        style={{ left: 0, top: 0 }}
      />
    </div>
  );
}
