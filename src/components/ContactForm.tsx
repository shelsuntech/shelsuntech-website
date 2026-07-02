import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!formData.name.trim()) nextErrors.name = 'Your name is required';
    if (!formData.email.trim()) {
      nextErrors.email = 'Work email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = 'Please provide a valid work email';
    }
    if (!formData.phone.trim()) {
      nextErrors.phone = 'Contact number is required';
    }
    if (!formData.message.trim()) nextErrors.message = 'Please tell us about your project';
    return nextErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const apiURL = (import.meta as any).env?.VITE_CONTACT_API_URL || '/api/contact';
      const response = await fetch(apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          pageUrl: window.location.href,
        }),
      });

      const data = await response.json() as any;

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'The server could not transmit your coordinate details. Please try again.');
      }

      console.log('Submission received successfully via Cloudflare Worker:', data);
      setSubmitStatus('success');
      setFormData({ name: '', company: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      console.error('Submission failed:', err);
      setSubmitError(err.message || 'An unexpected error occurred. Please try again or reach out on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-[#0B0F14] relative py-24 px-[5vw] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(59,130,246,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <div className="reveal">
          <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.12em] block mb-3">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.05] text-[#F0F4FA] mb-4 font-sans">
            Let's Build
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent font-sans font-extrabold">
              What's Next
            </span>
          </h2>
          <p className="text-[#F0F4FA]/50 text-base leading-relaxed mb-8 max-w-[500px] mx-auto font-normal">
            Tell us about your product challenge or schedule a system architecture review. We respond in under 24 hours.
          </p>

          {/* Direct Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto text-center">
            <div className="bg-[#111822]/40 border border-white/5 p-4 rounded-xl flex flex-col items-center hover:border-blue-500/30 transition-all duration-300">
              <span className="text-xl mb-1 select-none">✉️</span>
              <span className="text-[0.6rem] uppercase tracking-widest font-mono text-[#F0F4FA]/30 font-black mb-1">Corporate</span>
              <a href="mailto:info@shelsuntech.com" className="text-[0.8rem] font-bold text-cyan-400 hover:text-cyan-300 hover:underline break-all">
                info@shelsuntech.com
              </a>
            </div>
            <div className="bg-[#111822]/40 border border-white/5 p-4 rounded-xl flex flex-col items-center hover:border-blue-500/30 transition-all duration-300">
              <span className="text-xl mb-1 select-none">✉️</span>
              <span className="text-[0.6rem] uppercase tracking-widest font-mono text-[#F0F4FA]/30 font-black mb-1">Business Inquiry</span>
              <a href="mailto:contact@shelsuntech.com" className="text-[0.8rem] font-bold text-blue-400 hover:text-blue-300 hover:underline break-all">
                contact@shelsuntech.com
              </a>
            </div>
            <div className="bg-[#111822]/40 border border-white/5 p-4 rounded-xl flex flex-col items-center hover:border-blue-500/30 transition-all duration-300">
              <span className="text-xl mb-1 select-none">📞</span>
              <span className="text-[0.6rem] uppercase tracking-widest font-mono text-[#F0F4FA]/30 font-black mb-1">Direct Helpline</span>
              <a href="tel:+918076664199" className="text-[0.8rem] font-bold text-[#F0F4FA]/90 hover:text-[#F0F4FA] hover:underline whitespace-nowrap">
                +91 80766 64199
              </a>
            </div>
          </div>
        </div>

        {submitStatus === 'success' ? (
          <div className="reveal bg-[#111820] border border-cyan-400/20 rounded-2xl p-8 sm:p-12 text-center shadow-2xl animate-fade-in relative overflow-hidden">
            <div className="w-12 h-12 bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 rounded-full flex items-center justify-center text-xl mx-auto mb-6">
              ✓
            </div>
            <h3 className="text-xl font-bold text-[#F0F4FA] tracking-tight mb-2 font-sans">Message Transmitted!</h3>
            <p className="text-[#F0F4FA]/50 text-sm max-w-md mx-auto leading-relaxed mb-6 font-normal">
              We have received your coordinates and initiated high-priority dispatch to <span className="text-[#F0F4FA]/80 font-medium font-mono">info@shelsuntech.com</span>.
            </p>

            {/* Offline WhatsApp Contact Button */}
            <div className="mb-8 p-5 bg-[#161d28] border border-white/5 rounded-2xl max-w-sm mx-auto">
              <span className="text-[0.68rem] text-cyan-400 font-bold block mb-3.5 uppercase tracking-[0.14em]">
                Direct Offline Escalation
              </span>
              <a
                href="https://wa.me/918076664199?text=Hi!%20I'm%20interested%20in%20your%20intelligent%20software%20and%20automation%20solutions.%20Could%20we%20connect%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-3 rounded-full hover:scale-[1.03] active:scale-95 transition-all duration-300 shadow-[0_4px_18px_rgba(37,211,102,0.25)] font-bold text-xs uppercase tracking-wider w-full select-none"
              >
                {/* Micro Animated Glow Icon */}
                <svg className="w-4.5 h-4.5 text-white fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.031 0C5.39 0 0 5.39 0 12.03c0 2.115.553 4.184 1.597 6.012L0 24l6.135-1.609a12.012 12.012 0 0 0 5.891 1.54C18.66 23.931 24 18.54 24 11.9a11.9 11.9 0 0 0-11.969-11.9zm-.031 21.921c-2.022 0-4.01-.54-5.753-1.562l-.41-.244-3.666.963.979-3.573-.269-.427a9.851 9.851 0 0 1-1.503-5.048c.003-5.432 4.425-9.854 9.863-9.854 2.632 0 5.109 1.025 6.969 2.887a9.81 9.81 0 0 1 2.884 6.974c-.004 5.434-4.426 9.857-9.864 9.857zm5.405-7.38c-.296-.148-1.751-.864-2.023-.963-.27-.1-.468-.148-.664.148-.197.296-.762.963-.935 1.16-.173.197-.346.223-.642.075-.296-.148-1.25-.46-2.383-1.47-1.127-1.004-1.888-2.245-2.11-2.616-.222-.37-.024-.57.161-.754.166-.165.37-.432.555-.648.185-.216.247-.37.37-.617.123-.247.062-.463-.03-.66-.093-.198-.664-1.602-.911-2.195-.24-.577-.484-.498-.664-.508l-.567-.01c-.197 0-.518.074-.79.37-.27.296-1.037 1.012-1.037 2.47 0 1.456 1.062 2.864 1.21 3.061.148.198 2.09 3.193 5.064 4.477.708.305 1.26.488 1.691.625.712.226 1.36.194 1.872.118.571-.085 1.751-.716 1.999-1.407.247-.691.247-1.284.173-1.407-.074-.123-.272-.197-.568-.346z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>

            <button
              onClick={() => setSubmitStatus('idle')}
              className="px-6 py-2.5 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 pointer-events-auto"
            >
              Send Another Coordinate
            </button>
          </div>
        ) : (
          <div className="flex flex-col w-full">
            <form onSubmit={handleSubmit} className="reveal contact-form text-left w-full">
              {/* Row 1: Name and Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div className="flex flex-col">
                  <label className="text-[0.72rem] font-bold text-[#F0F4FA]/50 uppercase tracking-widest mb-2 font-mono">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Alex Johnson"
                    className={`bg-[#111820] border rounded-xl px-5 py-3.5 text-[#F0F4FA] font-medium text-sm placeholder-[#F0F4FA]/15 outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 transition-all duration-200 ${
                      errors.name ? 'border-red-500/40' : 'border-white/5'
                    }`}
                  />
                  {errors.name && <span className="text-xs text-red-400 mt-1.5">{errors.name}</span>}
                </div>

                <div className="flex flex-col">
                  <label className="text-[0.72rem] font-bold text-[#F0F4FA]/50 uppercase tracking-widest mb-2 font-mono">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Acme Corp"
                    className="bg-[#111820] border border-white/5 rounded-xl px-5 py-3.5 text-[#F0F4FA] font-medium text-sm placeholder-[#F0F4FA]/15 outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Row 2: Work Email and Contact Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div className="flex flex-col">
                  <label className="text-[0.72rem] font-bold text-[#F0F4FA]/50 uppercase tracking-widest mb-2 font-mono">
                    Work Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@company.com"
                    className={`bg-[#111820] border rounded-xl px-5 py-3.5 text-[#F0F4FA] font-medium text-sm placeholder-[#F0F4FA]/15 outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 transition-all duration-200 ${
                      errors.email ? 'border-red-500/40' : 'border-white/5'
                    }`}
                  />
                  {errors.email && <span className="text-xs text-red-400 mt-1.5">{errors.email}</span>}
                </div>

                <div className="flex flex-col">
                  <label className="text-[0.72rem] font-bold text-[#F0F4FA]/50 uppercase tracking-widest mb-2 font-mono">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className={`bg-[#111820] border rounded-xl px-5 py-3.5 text-[#F0F4FA] font-medium text-sm placeholder-[#F0F4FA]/15 outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 transition-all duration-200 ${
                      errors.phone ? 'border-red-500/40' : 'border-white/5'
                    }`}
                  />
                  {errors.phone && <span className="text-xs text-red-400 mt-1.5">{errors.phone}</span>}
                </div>
              </div>

              {/* Row 3: Project Details */}
              <div className="flex flex-col mb-6">
                <label className="text-[0.72rem] font-bold text-[#F0F4FA]/50 uppercase tracking-widest mb-2 font-mono">
                  Project Details
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project lines, cloud goals, or target milestones…"
                  className={`bg-[#111820] border rounded-xl px-5 py-4 text-[#F0F4FA] font-medium text-sm placeholder-[#F0F4FA]/15 outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 transition-all duration-200 resize-none min-h-[140px] ${
                    errors.message ? 'border-red-500/40' : 'border-white/5'
                  }`}
                />
                {errors.message && <span className="text-xs text-red-400 mt-1.5">{errors.message}</span>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-black font-black text-sm uppercase tracking-wider rounded-full shadow-xl shadow-blue-500/20 active:scale-98 hover:opacity-90 hover:scale-[1.01] transition-all duration-200 cursor-pointer pointer-events-auto"
              >
                {isSubmitting ? 'Transmitting Data...' : 'Send Message →'}
              </button>

              {submitError && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/25 rounded-xl text-red-400 text-xs font-semibold text-center font-mono">
                  ⚠ Error: {submitError}
                </div>
              )}
            </form>

            {/* Social contact link badges as in the Floating Widget underneath the form card */}
            <div className="mt-12 pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full animate-fade-in">
              <span className="text-[#F0F4FA]/30 text-xs uppercase tracking-[0.15em] font-mono font-bold">
                Direct Channels :
              </span>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                {/* Official WhatsApp Button */}
                <a
                  href="https://wa.me/918076664199?text=Hi!%20I'm%20interested%20in%20your%20intelligent%20software%20and%20automation%20solutions.%20Could%20we%20connect%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-2.5 rounded-full shadow-lg shadow-emerald-500/10 hover:scale-[1.04] active:scale-95 transition-all duration-300 border border-emerald-400/10 select-none cursor-pointer"
                >
                  <svg className="w-4.5 h-4.5 fill-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.031 0C5.39 0 0 5.39 0 12.03c0 2.115.553 4.184 1.597 6.012L0 24l6.135-1.609a12.012 12.012 0 0 0 5.891 1.54C18.66 23.931 24 18.54 24 11.9a11.9 11.9 0 0 0-11.969-11.9zm-.031 21.921c-2.022 0-4.01-.54-5.753-1.562l-.41-.244-3.666.963.979-3.573-.269-.427a9.851 9.851 0 0 1-1.503-5.048c.003-5.432 4.425-9.854 9.863-9.854 2.632 0 5.109 1.025 6.969 2.887a9.81 9.81 0 0 1 2.884 6.974c-.004 5.434-4.426 9.857-9.864 9.857zm5.405-7.38c-.296-.148-1.751-.864-2.023-.963-.27-.1-.468-.148-.664.148-.197.296-.762.963-.935 1.16-.173.197-.346.223-.642.075-.296-.148-1.25-.46-2.383-1.47-1.127-1.004-1.888-2.245-2.11-2.616-.222-.37-.024-.57.161-.754.166-.165.37-.432.555-.648.185-.216.247-.37.37-.617.123-.247.062-.463-.03-.66-.093-.198-.664-1.602-.911-2.195-.24-.577-.484-.498-.664-.508l-.567-.01c-.197 0-.518.074-.79.37-.27.296-1.037 1.012-1.037 2.47 0 1.456 1.062 2.864 1.21 3.061.148.198 2.09 3.193 5.064 4.477.708.305 1.26.488 1.691.625.712.226 1.36.194 1.872.118.571-.085 1.751-.716 1.999-1.407.247-.691.247-1.284.173-1.407-.074-.123-.272-.197-.568-.346z" />
                  </svg>
                  <span className="text-xs font-black uppercase tracking-widest font-sans">WhatsApp Chat</span>
                </a>

                {/* Same Official LinkedIn Button */}
                <a
                  href="https://www.linkedin.com/company/131874101/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 bg-[#0A66C2] hover:bg-[#0958a8] text-white px-5 py-2.5 rounded-full shadow-lg shadow-[#0A66C2]/10 hover:scale-[1.04] active:scale-95 transition-all duration-300 border border-[#0A66C2]/20 select-none cursor-pointer"
                >
                  <svg className="w-4.5 h-4.5 fill-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span className="text-xs font-black uppercase tracking-widest font-sans">LinkedIn Page</span>
                </a>

                {/* Founder's LinkedIn Button */}
                <a
                  href="https://www.linkedin.com/in/himanshu-khanna-673b3b20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 bg-[#0A66C2] hover:bg-[#0958a8] text-white px-5 py-2.5 rounded-full shadow-lg shadow-[#0A66C2]/10 hover:scale-[1.04] active:scale-95 transition-all duration-300 border border-[#0A66C2]/20 select-none cursor-pointer"
                >
                  <svg className="w-4.5 h-4.5 fill-current text-white flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span className="text-xs font-black uppercase tracking-widest font-sans">Founder's LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

