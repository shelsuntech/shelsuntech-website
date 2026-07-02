import { useEffect, useState } from 'react';
import Logo from './Logo';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      id="nav"
      className={`fixed top-0 left-0 right-0 z-50 px-[5vw] flex items-center justify-between h-[72px] border-b transition-all duration-400 ${
        isScrolled
          ? 'bg-[#0B0F14]/85 border-white/10 backdrop-blur-md shadow-lg shadow-black/20'
          : 'bg-transparent border-transparent'
      }`}
    >
      <a href="#" className="hover:opacity-90 active:scale-95 transition-all duration-200 -ml-2 sm:-ml-4">
        <Logo variant="horizontal" iconSize={82} />
      </a>

      <ul className="hidden md:flex gap-8 list-none">
        {['services', 'whatsapp-receptionist', 'products', 'process', 'techstack', 'contact'].map((item) => (
          <li key={item}>
            <a
              href={`#${item}`}
              className="text-xs font-semibold uppercase tracking-wider text-[#F0F4FA]/50 hover:text-[#F0F4FA] transition-colors duration-200"
            >
              {item === 'whatsapp-receptionist' ? 'AI Agent' : item === 'products' ? 'Products' : item === 'techstack' ? 'Stack' : item}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className="px-5 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-black font-extrabold text-[0.82rem] rounded-full tracking-wider hover:opacity-85 hover:scale-105 transition-all duration-200 shadow-md shadow-blue-500/25"
      >
        Book Demo
      </a>
    </nav>
  );
}
