import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-[#0B0F14] border-t border-white/5 py-16 px-[5vw]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        {/* Brand */}
        <div className="lg:col-span-2">
          <Logo variant="horizontal" iconSize={50} className="mb-6" />
          <p className="text-[#F0F4FA]/50 text-sm leading-relaxed max-w-[280px] mb-6">
            Engineering intelligent digital solutions that transform operational structures and secure structural advantages.
          </p>
          <div className="flex flex-col gap-2.5 text-xs font-normal">
            <span className="text-[#F0F4FA]/30 font-semibold uppercase tracking-widest block font-mono mb-1">Contact Details:</span>
            <div className="flex items-center gap-2 text-[#F0F4FA]/60">
              <span className="text-sm">✉️</span>
              <a href="mailto:info@shelsuntech.com" className="hover:text-cyan-400 transition-colors">info@shelsuntech.com</a>
            </div>
            <div className="flex items-center gap-2 text-[#F0F4FA]/60">
              <span className="text-sm">✉️</span>
              <a href="mailto:contact@shelsuntech.com" className="hover:text-blue-400 transition-colors">contact@shelsuntech.com</a>
            </div>
            <div className="flex items-center gap-2 text-[#F0F4FA]/60">
              <span className="text-sm">📞</span>
              <a href="tel:+918076664199" className="hover:text-[#F0F4FA] transition-colors">+91 80766 64199</a>
            </div>
            <div className="flex items-center gap-2 text-[#F0F4FA]/60 border-t border-white/5 pt-2 mt-1">
              <span className="text-sm">👤</span>
              <span className="text-[#F0F4FA]/30">Founder:</span>
              <a href="https://www.linkedin.com/in/himanshu-khanna-673b3b20" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors underline decoration-blue-500/30 underline-offset-4">
                Himanshu Khanna
              </a>
            </div>
          </div>
        </div>

        {/* Links: Services */}
        <div>
          <h4 className="text-[0.72rem] font-bold text-[#F0F4FA]/30 uppercase tracking-widest mb-6">
            Services
          </h4>
          <ul className="flex flex-col gap-3 font-normal text-sm">
            {['AI Solutions', 'Custom Software', 'Web Applications', 'Mobile Apps', 'Cloud & DevOps'].map(
              (item) => (
                <li key={item}>
                  <a href="#services" className="text-[#F0F4FA]/50 hover:text-[#F0F4FA] transition-colors duration-200">
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Links: Company */}
        <div>
          <h4 className="text-[0.72rem] font-bold text-[#F0F4FA]/30 uppercase tracking-widest mb-6">
            Company
          </h4>
          <ul className="flex flex-col gap-3 font-normal text-sm">
            {[
              { label: 'About Us', link: '#why' },
              { label: 'Our Products', link: '#products' },
              { label: 'Our Process', link: '#process' },
              { label: 'Contact', link: '#contact' },
            ].map((item) => (
              <li key={item.label}>
                <a href={item.link} className="text-[#F0F4FA]/50 hover:text-[#F0F4FA] transition-colors duration-200">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Links: Tech */}
        <div>
          <h4 className="text-[0.72rem] font-bold text-[#F0F4FA]/30 uppercase tracking-widest mb-6">
            Technologies
          </h4>
          <ul className="flex flex-col gap-3 font-normal text-sm">
            {['React & Next.js', 'AI / ML', 'Cloud Networks', 'Data Systems'].map((item) => (
              <li key={item}>
                <a href="#techstack" className="text-[#F0F4FA]/50 hover:text-[#F0F4FA] transition-colors duration-200">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-[#F0F4FA]/30 text-xs text-center sm:text-left">
          © {new Date().getFullYear()} ShelSun Tech. All rights reserved.
        </span>

        <div className="flex flex-wrap justify-center gap-6">
          {[
            { name: 'LinkedIn (Company)', href: 'https://www.linkedin.com/company/131874101/' },
            { name: 'LinkedIn (Founder)', href: 'https://www.linkedin.com/in/himanshu-khanna-673b3b20' },
            { name: 'WhatsApp', href: 'https://wa.me/918076664199?text=Hi!%20I\'m%20interested%20in%20your%20intelligent%20software%20and%20automation%20solutions.%20Could%20we%20connect%3F' },
            { name: 'Twitter', href: '#' },
            { name: 'GitHub', href: '#' },
            { name: 'Dribbble', href: '#' },
          ].map((social) => (
            <a
              key={social.name}
              href={social.href}
              target={social.href !== '#' ? '_blank' : undefined}
              rel={social.href !== '#' ? 'noopener noreferrer' : undefined}
              className="text-[#F0F4FA]/30 hover:text-[#F0F4FA] text-xs transition-colors duration-200"
            >
              {social.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
