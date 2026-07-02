import { useEffect, useState } from 'react';
import Logo from './Logo';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when the mobile menu drawer is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const menuItems = [
    { id: 'services', label: 'Services' },
    { id: 'whatsapp-receptionist', label: 'AI Agent' },
    { id: 'products', label: 'Products' },
    { id: 'process', label: 'Process' },
    { id: 'techstack', label: 'Stack' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <nav
        id="nav"
        className={`fixed top-0 left-0 right-0 z-50 px-[5vw] flex items-center justify-between h-[72px] border-b transition-all duration-400 ${
          isScrolled || isMenuOpen
            ? 'bg-[#0B0F14]/95 border-white/10 backdrop-blur-md shadow-lg shadow-black/20'
            : 'bg-transparent border-transparent'
        }`}
      >
        <a href="#" className="hover:opacity-90 active:scale-95 transition-all duration-200 -ml-2 sm:-ml-4 relative z-50">
          <Logo variant="horizontal" iconSize={82} />
        </a>

        {/* Desktop Landscape Menu (Visible on lg and larger) */}
        <ul className="hidden lg:flex gap-8 list-none">
          {menuItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-xs font-semibold uppercase tracking-wider text-[#F0F4FA]/50 hover:text-[#F0F4FA] transition-colors duration-200"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {/* Book Demo Button */}
          <a
            href="#contact"
            className="hidden sm:inline-block px-5 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-black font-extrabold text-[0.82rem] rounded-full tracking-wider hover:opacity-85 hover:scale-105 transition-all duration-200 shadow-md shadow-blue-500/25"
          >
            Book Demo
          </a>

          {/* Toggle Button for Mobile/Tablet (Visible below lg) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-[#F0F4FA] hover:text-[#22D3EE] focus:outline-none transition-colors duration-200 relative z-50 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile/Tablet Drawer Menu Overlay (Active below lg) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-x-0 top-0 pt-[84px] pb-10 px-8 bg-[#0B0F14]/98 backdrop-blur-xl z-40 flex lg:hidden flex-col border-b border-white/5 shadow-2xl shadow-black/80 max-h-[100vh] overflow-y-auto"
          >
            <ul className="flex flex-col gap-5 list-none mb-8">
              {menuItems.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-base font-bold uppercase tracking-widest text-[#F0F4FA]/70 hover:text-[#22D3EE] active:text-[#22D3EE] transition-colors duration-200 block py-2 border-b border-white/5"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mt-auto"
            >
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-center block py-3.5 bg-gradient-to-r from-blue-500 to-cyan-400 text-black font-extrabold text-[0.95rem] rounded-xl tracking-wider hover:opacity-85 active:scale-95 transition-all duration-200 shadow-lg shadow-blue-500/25"
              >
                Book Demo
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
