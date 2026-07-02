import React, { useState, useEffect, useRef } from 'react';

type ProductKey = 'website' | 'whatsapp' | 'voice' | 'insta' | 'messenger';

interface ProductInfo {
  id: ProductKey;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  icon: string;
  stats: string;
  bgColor: string;
  accentColor: string;
}

interface ChatMessage {
  sender: 'client' | 'bot';
  text: string;
  time: string;
}

export default function Showcase() {
  const [activeProduct, setActiveProduct] = useState<ProductKey>('whatsapp');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isMicPulsing, setIsMicPulsing] = useState<boolean>(true);
  const [demoTheme, setDemoTheme] = useState<'cyan' | 'violet' | 'amber'>('cyan');
  const [demoLayout, setDemoLayout] = useState<'bento' | 'hero'>('bento');

  const products: ProductInfo[] = [
    {
      id: 'whatsapp',
      title: 'WhatsApp AI Receptionist',
      badge: 'WhatsApp Bot',
      tagline: '24/7/365 Autonomous appointment & FAQ agent',
      description: 'Intelligently manages inquiries on the world’s most popular messenger. Qualifies leads, resolves operational FAQs, and schedules appointments directly inside your CRM.',
      icon: '🟢',
      stats: '2.5x Booking Rate Increase',
      bgColor: 'from-emerald-500/10 to-teal-400/5',
      accentColor: '#25D366',
    },
    {
      id: 'voice',
      title: 'Autonomous Voice Assistant',
      badge: 'Voice AI',
      tagline: 'Low-latency natural conversational voice calling',
      description: 'A friendly, highly professional spoken voice assistant that handles your inbound telephone queues, answers patient/client queries, and schedules calendar events in real-time.',
      icon: '🎙️',
      stats: '0-Sec Queue Hold Time',
      bgColor: 'from-indigo-500/10 to-purple-400/5',
      accentColor: '#818cf8',
    },
    {
      id: 'insta',
      title: 'Instagram DM AI Assistant',
      badge: 'Instagram DM',
      tagline: 'Convert social engagement into immediate sales',
      description: 'Capture story mentions, direct messages, and post comments instantly. Recommends catalogs, handles pricing inquiries, and sends quick checkout/booking links.',
      icon: '📸',
      stats: '3x Faster Lead Discovery',
      bgColor: 'from-pink-500/10 to-rose-400/5',
      accentColor: '#e1306c',
    },
    {
      id: 'messenger',
      title: 'Facebook Messenger AI Assistant',
      badge: 'Messenger Bot',
      tagline: 'Nurture localized leads with frictionless chats',
      description: 'Qualifies property buyers, gathers dental intake credentials, or records salon preferences directly within the Messenger ecosystem. Syncs automatically with local CRM databases.',
      icon: '💬',
      stats: '40%+ CRM Capture Rate',
      bgColor: 'from-blue-600/10 to-indigo-500/5',
      accentColor: '#0084FF',
    },
    {
      id: 'website',
      title: 'Custom Website Development',
      badge: 'Web Design',
      tagline: 'Ultra-fast landing pages & custom web experiences',
      description: 'We build high-performance, responsive websites with hand-crafted motion designs, clean layouts, and instant conversion hooks tailored to lock in high-intent inbound clients.',
      icon: '🕸️',
      stats: '100% Core Web Vitals',
      bgColor: 'from-blue-500/10 to-cyan-400/5',
      accentColor: '#22d3ee',
    },
  ];

  // Conversation data for preview screen
  const conversations: Record<ProductKey, ChatMessage[]> = {
    website: [], // Handled by interactive website preview UI
    whatsapp: [
      { sender: 'client', text: 'Hello, do you have any available dental cleanings tomorrow morning?', time: '09:12 AM' },
      { sender: 'bot', text: 'Hi there! Yes, Dr. Sarah has an opening at 9:30 AM and Dr. Ryan has one at 11:00 AM. Would either slot work for you?', time: '09:12 AM' },
      { sender: 'client', text: '9:30 AM with Dr. Sarah works perfectly!', time: '09:13 AM' },
      { sender: 'bot', text: 'Great Choice! I’ve blocked that slot for you. Could you please share your full name, email, and preferred contact number to confirm?', time: '09:13 AM' },
      { sender: 'client', text: 'Marcus Brody, marcus@gmail.com, +965 5512 3456', time: '09:14 AM' },
      { sender: 'bot', text: 'Confirmed, Marcus! Your dental cleaning appointment is confirmed for tomorrow at 9:30 AM with Dr. Sarah. See you soon! 🦷✨', time: '09:14 AM' },
    ],
    voice: [
      { sender: 'client', text: 'Hello, I need to schedule a consultation with a family lawyer regarding a commercial lease.', time: '02:01 PM' },
      { sender: 'bot', text: 'Thank you for calling ShelSun Legal Services. We can definitely set up a consultation call with Mr. Jenkins. He is available this Thursday at 2:00 PM or 4:30 PM. Which works best?', time: '02:02 PM' },
      { sender: 'client', text: 'Let’s go with Thursday at 4:30 PM, please.', time: '02:02 PM' },
      { sender: 'bot', text: 'Perfect. Thursday at 4:30 PM is reserved. I will text a confirmation link to your number. What is your full name and best number to send it to?', time: '02:03 PM' },
      { sender: 'client', text: 'Fatima Al-Saber, +965 6601 9876', time: '02:03 PM' },
      { sender: 'bot', text: 'Excellent, Fatima. Your meeting is set. A text confirmation has been dispatched. Have a wonderful day!', time: '02:04 PM' },
    ],
    insta: [
      { sender: 'client', text: 'Hey! Loved the leather jackets in your story! How much is the shipping to Kuwait City?', time: '08:44 PM' },
      { sender: 'bot', text: 'Hey there! Glad you love them! 🧥 Our premium leather jacket is $129, and we offer flat-rate express shipping to Kuwait City for just $15 (takes 3-5 business days). Would you like to check available sizes?', time: '08:45 PM' },
      { sender: 'client', text: 'Yes, looking for a Medium size in Black.', time: '08:45 PM' },
      { sender: 'bot', text: 'Perfect! Black Medium is currently in stock. Here is a direct link to check out instantly with your size pre-selected: shelsun.store/jack-m-blk. Let me know if you need any help with ordering!', time: '08:46 PM' },
    ],
    messenger: [
      { sender: 'client', text: 'I saw the 3-bedroom villa listing on your page. Is it still available for a viewing?', time: '11:05 AM' },
      { sender: 'bot', text: 'Hello! Yes, the 3-bedroom villa in Salwa is still available! 🏡 We have open house viewings scheduled for Saturday between 10:00 AM and 2:00 PM. Would you like to lock in a specific 20-minute walkthrough slot?', time: '11:06 AM' },
      { sender: 'client', text: 'Yes, can you do Saturday at 11:30 AM?', time: '11:06 AM' },
      { sender: 'bot', text: 'You’re all set for Saturday at 11:30 AM! Our agent, Tariq, will meet you at the main gate. What’s your best mobile number so he can ping you coordinates?', time: '11:07 AM' },
      { sender: 'client', text: '+965 9934 5678', time: '11:08 AM' },
      { sender: 'bot', text: 'Awesome! Tariq has been notified. We will text you the GPS location 1 hour before your viewing. See you Saturday!', time: '11:08 AM' },
    ],
  };

  // Simulate typing animation on product change
  useEffect(() => {
    setMessages([]);
    setIsTyping(false);
    
    if (activeProduct === 'website') return;

    const flow = conversations[activeProduct];
    let timeoutId: any = null;
    let typingTimeoutId: any = null;
    let idx = 0;

    function renderNext() {
      if (idx >= flow.length) {
        setIsTyping(false);
        return;
      }

      setIsTyping(true);

      typingTimeoutId = setTimeout(() => {
        const nextMessage = flow[idx];
        if (nextMessage) {
          setMessages((prev) => [...prev, nextMessage]);
        }
        setIsTyping(false);
        idx++;

        timeoutId = setTimeout(renderNext, 1400);
      }, 900);
    }

    timeoutId = setTimeout(renderNext, 300);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (typingTimeoutId) clearTimeout(typingTimeoutId);
    };
  }, [activeProduct]);

  // Audio waveform pulse simulation
  useEffect(() => {
    let interval: any = null;
    if (activeProduct === 'voice') {
      interval = setInterval(() => {
        setIsMicPulsing((prev) => !prev);
      }, 800);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeProduct]);

  return (
    <section id="products" className="bg-[#090C10] py-24 px-[5vw] border-b border-white/5 relative overflow-hidden">
      {/* Background radial effects */}
      <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header section with refined typography */}
        <div className="reveal text-center mb-16 max-w-3xl mx-auto">
          <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.16em] block mb-3 font-mono">
            Our Premium Fleet
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.08] text-[#F0F4FA] mb-4 font-sans">
            AI-Engineered Products
          </h2>
          <p className="text-[#F0F4FA]/55 text-sm sm:text-base leading-relaxed font-light">
            We deploy production-grade, highly optimized conversational systems, visual frontends, and automated communication pipelines designed to accelerate capture rates and scale your bottom line.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Side: Product Cards Selection */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {products.map((prod) => {
              const isSelected = activeProduct === prod.id;
              return (
                <button
                  key={prod.id}
                  onClick={() => setActiveProduct(prod.id)}
                  className={`p-5 rounded-2xl text-left border transition-all duration-300 relative overflow-hidden group select-none ${
                    isSelected
                      ? 'bg-[#121822] border-white/10 shadow-[0_12px_40px_-10px_rgba(34,211,238,0.15)]'
                      : 'bg-white/5 border-white/5 hover:bg-[#10151f] hover:border-white/10'
                  }`}
                >
                  {/* Decorative selection bar */}
                  {isSelected && (
                    <div
                      className="absolute left-0 top-0 bottom-0 w-[4px]"
                      style={{ backgroundColor: prod.accentColor }}
                    />
                  )}

                  <div className="flex items-start gap-4">
                    {/* Icon Sphere */}
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg shrink-0 transition-transform duration-300 group-hover:scale-105 border ${
                        isSelected ? 'border-white/10 bg-white/5' : 'border-white/5 bg-[#090C10]'
                      }`}
                    >
                      {prod.icon}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[0.68rem] font-bold text-cyan-400 uppercase tracking-widest font-mono">
                          {prod.badge}
                        </span>
                        <span className="text-[0.62rem] text-[#F0F4FA]/30 font-medium font-mono">
                          {prod.stats}
                        </span>
                      </div>
                      <h3 className="text-base font-black text-[#F0F4FA] tracking-tight mb-1 font-sans">
                        {prod.title}
                      </h3>
                      <p className="text-xs text-[#F0F4FA]/40 leading-relaxed font-light group-hover:text-[#F0F4FA]/60 transition-colors">
                        {prod.tagline}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Side: Interactive Live Screen Simulator */}
          <div className="lg:col-span-7 flex flex-col bg-[#111620]/60 border border-white/5 rounded-3xl p-6 md:p-8 relative overflow-hidden min-h-[520px] justify-between shadow-2xl">
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#111620]/10 via-transparent to-[#090C10]/40 pointer-events-none" />

            {/* Simulated Window Control bar */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6 z-10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/50" />
                <span className="w-3 h-3 rounded-full bg-amber-500/50" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/50" />
                <span className="text-[0.68rem] text-[#F0F4FA]/40 font-mono font-bold uppercase tracking-widest ml-2">
                  {activeProduct === 'website' ? 'Web Generator Interface' : `${activeProduct} Conversation Node`}
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[0.58rem] text-emerald-400 font-bold uppercase tracking-wider font-mono">Simulated Live</span>
              </div>
            </div>

            {/* SCREEN GENERATORS */}
            <div className="flex-1 flex flex-col justify-center relative z-10 w-full">
              
              {/* 1. Website Design Interactive Preview */}
              {activeProduct === 'website' && (
                <div className="w-full h-full flex flex-col justify-between space-y-6 animate-fade-in">
                  
                  {/* Dynamic Custom Web Layout preview */}
                  <div className="flex-1 p-5 rounded-2xl bg-[#090C10] border border-white/5 relative overflow-hidden min-h-[280px] flex flex-col justify-between">
                    
                    {/* Header bar of mock website */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">💎</span>
                        <span className="text-[0.7rem] font-bold text-white uppercase tracking-wider font-sans">Aura Design</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="w-8 h-1 bg-white/10 rounded" />
                        <span className="w-8 h-1 bg-white/10 rounded" />
                        <span className="w-8 h-1 bg-white/10 rounded" />
                      </div>
                    </div>

                    {/* Dynamic Hero Layout preview on the fly */}
                    <div className="my-auto py-4 text-center">
                      <div className="inline-block px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[0.62rem] uppercase tracking-widest text-cyan-400 font-mono mb-3">
                        Featured Service
                      </div>

                      {demoLayout === 'bento' ? (
                        <div className="grid grid-cols-3 gap-3.5 max-w-lg mx-auto text-left">
                          <div className={`col-span-2 p-3.5 rounded-xl border border-white/5 transition-all duration-300 ${
                            demoTheme === 'cyan' ? 'bg-cyan-500/5 hover:border-cyan-400/20' :
                            demoTheme === 'violet' ? 'bg-violet-500/5 hover:border-violet-400/20' :
                            'bg-amber-500/5 hover:border-amber-400/20'
                          }`}>
                            <h4 className="text-xs font-bold text-white mb-1">Tailored Strategy</h4>
                            <p className="text-[0.6rem] text-white/40 leading-relaxed">Scaling localized conversions via lightning-fast React blocks.</p>
                          </div>
                          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-center items-center text-center">
                            <span className="text-base mb-1">⚡</span>
                            <span className="text-[0.65rem] font-extrabold text-white">99 score</span>
                          </div>
                        </div>
                      ) : (
                        <div className="max-w-md mx-auto">
                          <h3 className="text-lg sm:text-2xl font-black text-white leading-tight tracking-tight mb-2">
                            Next-Gen Visual{' '}
                            <span className={`transition-colors duration-300 ${
                              demoTheme === 'cyan' ? 'text-cyan-400' :
                              demoTheme === 'violet' ? 'text-violet-400' :
                              'text-amber-400'
                            }`}>Experiences</span>
                          </h3>
                          <p className="text-[0.65rem] text-white/50 max-w-sm mx-auto leading-relaxed">
                            A bespoke, mobile-optimized landing pad engineered for modern dentists, law firms, and salons.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Bottom CTA Block of mock website */}
                    <div className="flex items-center justify-between border-t border-white/5 pt-3">
                      <span className="text-[0.58rem] text-white/30 font-mono">© 2026 Aura Inc.</span>
                      <button className={`px-4 py-1.5 text-[0.58rem] font-black uppercase tracking-wider rounded-full text-black transition-all duration-300 ${
                        demoTheme === 'cyan' ? 'bg-cyan-400 shadow-md shadow-cyan-400/20' :
                        demoTheme === 'violet' ? 'bg-violet-400 shadow-md shadow-violet-400/20' :
                        'bg-amber-400 shadow-md shadow-amber-400/20'
                      }`}>
                        Contact Us
                      </button>
                    </div>

                  </div>

                  {/* Interactive Controls to customize layout live */}
                  <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-white/50 uppercase tracking-widest font-mono">Theme:</span>
                      <div className="flex gap-2">
                        {(['cyan', 'violet', 'amber'] as const).map((t) => (
                          <button
                            key={t}
                            onClick={() => setDemoTheme(t)}
                            className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                              t === 'cyan' ? 'bg-cyan-400' : t === 'violet' ? 'bg-violet-400' : 'bg-amber-400'
                            } ${demoTheme === t ? 'border-white scale-110' : 'border-transparent opacity-60'}`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white/50 uppercase tracking-widest font-mono mr-1">Structure:</span>
                      <button
                        onClick={() => setDemoLayout('bento')}
                        className={`px-3 py-1 text-[0.62rem] font-bold uppercase tracking-wider rounded-lg transition-all ${
                          demoLayout === 'bento' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'
                        }`}
                      >
                        Bento Grid
                      </button>
                      <button
                        onClick={() => setDemoLayout('hero')}
                        className={`px-3 py-1 text-[0.62rem] font-bold uppercase tracking-wider rounded-lg transition-all ${
                          demoLayout === 'hero' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'
                        }`}
                      >
                        Clean Hero
                      </button>
                    </div>
                  </div>

                </div>
              )}

              {/* 2. WhatsApp Theme Chat Simulation */}
              {activeProduct === 'whatsapp' && (
                <div className="w-full flex flex-col bg-[#0b141a] rounded-2xl border border-white/5 overflow-hidden animate-fade-in shadow-xl">
                  {/* WhatsApp Custom Header */}
                  <div className="bg-[#1f2c34] px-4 py-3 flex items-center justify-between border-b border-[#2b3a43]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#128C7E] flex items-center justify-center text-xs">🦷</div>
                      <div className="text-left">
                        <h4 className="text-xs font-bold text-white">Dentist Receptionist AI</h4>
                        <p className="text-[0.58rem] text-emerald-400 uppercase tracking-wider font-semibold">online</p>
                      </div>
                    </div>
                    <span className="text-xs text-[#8696a0]">📞 📹 ┇</span>
                  </div>

                  {/* Body with simulated content */}
                  <div className="p-4 space-y-3.5 min-h-[250px] flex flex-col justify-end">
                    {messages.map((m, i) => (
                      <div key={i} className={`flex flex-col w-full ${m.sender === 'bot' ? 'items-start' : 'items-end'}`}>
                        <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-[0.72rem] leading-relaxed shadow-sm ${
                          m.sender === 'bot' ? 'bg-[#202c33] text-white rounded-tl-none' : 'bg-[#005c4b] text-white rounded-tr-none'
                        }`}>
                          <p className="text-left">{m.text}</p>
                          <span className="block text-right text-[0.52rem] text-white/30 font-mono mt-1">{m.time}</span>
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex justify-start w-full">
                        <div className="bg-[#202c33] text-white rounded-2xl rounded-tl-none px-3.5 py-2 text-xs flex items-center gap-1">
                          <span className="w-1 h-1 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1 h-1 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1 h-1 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 3. Voice AI Assistant Waveform screen */}
              {activeProduct === 'voice' && (
                <div className="w-full flex flex-col bg-[#0f141d] rounded-2xl border border-white/5 p-6 animate-fade-in text-center min-h-[320px] justify-between">
                  <div className="text-left border-b border-white/5 pb-3">
                    <span className="text-[0.6rem] text-indigo-400 font-mono uppercase tracking-widest block mb-1">Telephone Conduit</span>
                    <h4 className="text-xs font-bold text-white">Active Consultation Call Terminal</h4>
                  </div>

                  {/* soundwave sphere */}
                  <div className="my-auto py-4 flex flex-col items-center justify-center">
                    <div className="relative w-24 h-24 rounded-full bg-indigo-500/10 border border-indigo-400/20 flex items-center justify-center mb-6">
                      {/* Pulse waves */}
                      <span className={`absolute inset-0 rounded-full bg-indigo-500/20 border border-indigo-500/30 transition-all duration-1000 ${
                        isMicPulsing ? 'scale-[1.5] opacity-0' : 'scale-100 opacity-100'
                      }`} />
                      <span className="text-2xl animate-pulse">🎙️</span>
                    </div>

                    {/* visualizer vertical lines */}
                    <div className="flex gap-1.5 justify-center items-center h-8 mb-4">
                      {Array.from({ length: 15 }).map((_, i) => (
                        <span
                          key={i}
                          className="w-1.5 rounded-full bg-indigo-400/80 transition-all duration-300"
                          style={{
                            height: isMicPulsing
                              ? `${Math.max(10, Math.sin(i * 0.5) * 28 + 14)}px`
                              : `${Math.max(10, Math.cos(i * 0.4) * 24 + 10)}px`,
                            animationDelay: `${i * 50}ms`,
                          }}
                        />
                      ))}
                    </div>

                    <p className="text-[0.62rem] text-indigo-400 font-bold uppercase tracking-widest font-mono">
                      {isMicPulsing ? 'Autonomous Agent Speaking' : 'Listening for Client response'}
                    </p>
                  </div>

                  {/* Spoken script logger */}
                  <div className="p-3 bg-black/40 border border-white/5 rounded-xl max-w-md mx-auto w-full">
                    <span className="text-[0.55rem] text-white/30 uppercase font-bold tracking-widest block mb-1.5 text-left font-mono">Live Transcription</span>
                    <div className="space-y-1.5 text-left">
                      <p className="text-[0.68rem] text-white/80 leading-relaxed font-light">
                        <strong className="text-indigo-400 font-bold">AI Voice:</strong> "Thursday at 4:30 PM is reserved. I will text a confirmation link to your number."
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. Instagram DM AI Assistant */}
              {activeProduct === 'insta' && (
                <div className="w-full flex flex-col bg-black rounded-2xl border border-white/5 overflow-hidden animate-fade-in shadow-xl">
                  {/* IG header */}
                  <div className="bg-[#121212] px-4 py-3 flex items-center justify-between border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-xs text-white font-extrabold">🧥</div>
                      <div className="text-left">
                        <h4 className="text-xs font-bold text-white flex items-center gap-1">ShelSun Boutique <span className="text-blue-500 text-[0.65rem]">✓</span></h4>
                        <p className="text-[0.55rem] text-white/40 leading-none">Instagram Direct Message</p>
                      </div>
                    </div>
                    <span className="text-xs text-white/80">ℹ️</span>
                  </div>

                  {/* Body with simulated content */}
                  <div className="p-4 space-y-3.5 min-h-[250px] flex flex-col justify-end">
                    {messages.map((m, i) => (
                      <div key={i} className={`flex flex-col w-full ${m.sender === 'bot' ? 'items-start' : 'items-end'}`}>
                        <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-[0.72rem] leading-relaxed shadow-sm ${
                          m.sender === 'bot'
                            ? 'bg-[#262626] text-white rounded-tl-none border border-white/5'
                            : 'bg-gradient-to-r from-[#833ab4] to-[#e1306c] text-white rounded-tr-none'
                        }`}>
                          <p className="text-left">{m.text}</p>
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex justify-start w-full">
                        <div className="bg-[#262626] border border-white/5 text-white rounded-2xl rounded-tl-none px-3.5 py-2 text-xs flex items-center gap-1">
                          <span className="w-1 h-1 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1 h-1 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1 h-1 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 5. Facebook Messenger AI Assistant */}
              {activeProduct === 'messenger' && (
                <div className="w-full flex flex-col bg-[#0a111a] rounded-2xl border border-white/5 overflow-hidden animate-fade-in shadow-xl">
                  {/* Messenger Header */}
                  <div className="bg-[#121c27] px-4 py-3 flex items-center justify-between border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#0084FF] flex items-center justify-center text-xs text-white font-extrabold">🏠</div>
                      <div className="text-left">
                        <h4 className="text-xs font-bold text-white">Al-Sabah Properties</h4>
                        <p className="text-[0.55rem] text-white/40 leading-none">Messenger Concierge</p>
                      </div>
                    </div>
                    <span className="text-xs text-[#0084FF]">📞 📹 ⓘ</span>
                  </div>

                  {/* Body with simulated content */}
                  <div className="p-4 space-y-3.5 min-h-[250px] flex flex-col justify-end">
                    {messages.map((m, i) => (
                      <div key={i} className={`flex flex-col w-full ${m.sender === 'bot' ? 'items-start' : 'items-end'}`}>
                        <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-[0.72rem] leading-relaxed shadow-sm ${
                          m.sender === 'bot' ? 'bg-[#1e2d3d] text-[#F0F4FA] rounded-tl-none' : 'bg-[#0084FF] text-white rounded-tr-none'
                        }`}>
                          <p className="text-left">{m.text}</p>
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex justify-start w-full">
                        <div className="bg-[#1e2d3d] text-white rounded-2xl rounded-tl-none px-3.5 py-2 text-xs flex items-center gap-1">
                          <span className="w-1 h-1 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1 h-1 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1 h-1 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>

            {/* Simulated Live status feedback footer */}
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-left">
              <div>
                <span className="text-[0.6rem] text-[#F0F4FA]/30 uppercase tracking-widest font-mono font-bold block">Active Technology</span>
                <p className="text-xs font-bold text-cyan-400 font-mono mt-0.5">
                  {activeProduct === 'website' ? 'Vite + React 19 + Tailwind Engine' : 'NLP Dialect Router & Flow State-Machine'}
                </p>
              </div>
              <a
                href="#contact"
                className="px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-[0.65rem] font-bold uppercase tracking-wider rounded-lg transition-all duration-200 text-white"
              >
                Integrate This Solution →
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
