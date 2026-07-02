import React, { useState, useEffect } from 'react';

interface ChatMessage {
  sender: 'client' | 'bot';
  text: string;
  time: string;
  isRead?: boolean;
}

export default function WhatsAppReceptionistProduct() {
  const [activeTab, setActiveTab] = useState<'english' | 'kuwaiti'>('english');
  const [typedMessages, setTypedMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const englishFlow: ChatMessage[] = [
    {
      sender: 'client',
      text: 'Hey! Do you have any slots open today for a haircut and shave?',
      time: '11:42 AM',
    },
    {
      sender: 'bot',
      text: 'Hi there! Welcome to Serene Salon. 💇‍♂️ Yes, we have two slots open today: 3:00 PM and 5:30 PM with our senior stylist Sarah. Would either of those work for you?',
      time: '11:42 AM',
      isRead: true,
    },
    {
      sender: 'client',
      text: '5:30 PM works great for me.',
      time: '11:43 AM',
    },
    {
      sender: 'bot',
      text: 'Perfect! I will secure that for you right away. Can I please get your full name and a contact number to confirm your booking?',
      time: '11:43 AM',
      isRead: true,
    },
    {
      sender: 'client',
      text: 'Alex Johnson, +1 555-0199',
      time: '11:44 AM',
    },
    {
      sender: 'bot',
      text: 'Got it, Alex! Your haircut slot is confirmed for today at 5:30 PM with Sarah. We look forward to seeing you! A confirmation calendar invite has been dispatched. 📅✨',
      time: '11:44 AM',
      isRead: true,
    },
  ];

  const kuwaitiFlow: ChatMessage[] = [
    {
      sender: 'client',
      text: 'السلام عليكم، بغيت أحجز موعد عندكم اليوم حق تنظيف أسنان؟',
      time: '04:15 PM',
    },
    {
      sender: 'bot',
      text: 'وعليكم السلام يا هلا! حياك الله بمركز أسنان كلينك. 🦷 عندنا موعدين شاغرين اليوم: الساعة ٤:٠٠ العصر والساعة ٧:٣٠ بالليل عند دكتور يوسف. أي وقت يناسبك أكثر؟',
      time: '04:15 PM',
      isRead: true,
    },
    {
      sender: 'client',
      text: '٧:٣٠ بالليل وايد زين ومناسب مع الدوام.',
      time: '04:16 PM',
    },
    {
      sender: 'bot',
      text: 'حلو، تم! عشان نثبت لك الموعد بالسيستم، ممكن تعطيني الاسم الثلاثي ورقم التلفون لو سمحت؟',
      time: '04:16 PM',
      isRead: true,
    },
    {
      sender: 'client',
      text: 'أحمد عبد الله الكندري، +965 9901 2345',
      time: '04:17 PM',
    },
    {
      sender: 'bot',
      text: 'تسلم أخوي أحمد! تم تأكيد موعدك لتنظيف الأسنان اليوم الساعة ٧:٣٠ بالليل مع دكتور يوسف. راح نرسل لك مسج تذكيري قبل الموعد بساعة. حياك الله ونشوفك على خير! 🦷✨',
      time: '04:17 PM',
      isRead: true,
    },
  ];

  // Animate message loading when tab changes with robust cleanup to prevent race conditions
  useEffect(() => {
    setTypedMessages([]);
    setIsTyping(false);
    
    const flow = activeTab === 'english' ? englishFlow : kuwaitiFlow;
    let timeoutId: any = null;
    let typingTimeoutId: any = null;
    let currentIdx = 0;

    function showNextMessage() {
      if (currentIdx >= flow.length) {
        setIsTyping(false);
        return;
      }

      // 1. Show typing indicator
      setIsTyping(true);

      // 2. After a simulated typing delay, show the message
      typingTimeoutId = setTimeout(() => {
        const nextMsg = flow[currentIdx];
        if (nextMsg) {
          setTypedMessages((prev) => [...prev, nextMsg]);
        }
        setIsTyping(false);
        currentIdx++;

        // 3. Wait before starting typing for the next message
        timeoutId = setTimeout(showNextMessage, 1500);
      }, 1000);
    }

    // Start the chain after a small initial delay
    timeoutId = setTimeout(showNextMessage, 600);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (typingTimeoutId) clearTimeout(typingTimeoutId);
    };
  }, [activeTab]);

  return (
    <section id="whatsapp-receptionist" className="bg-[#0B0F14] py-24 px-[5vw] border-b border-white/5 relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Copywriting and benefits */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <div className="reveal">
              <span className="inline-flex items-center gap-2 bg-[#25D366]/10 border border-[#25D366]/20 px-3 py-1.5 rounded-full text-xs font-bold text-[#25D366] mb-5 tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                Featured Launch
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] text-[#F0F4FA] mb-6 font-sans">
                Meet the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#25D366] to-[#0A66C2] font-sans font-extrabold">
                  ShelSunTech WhatsApp
                </span>{' '}
                Receptionist
              </h2>
              <p className="text-[#F0F4FA]/70 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl font-light">
                Turn missed calls and after-hours text inquiries into instant booked slots. Our autonomous AI Receptionist chats with clients 24/7, answers service FAQs, and books appointments directly in both <strong className="text-emerald-400 font-semibold">English</strong> and local <strong className="text-cyan-400 font-semibold">Kuwaiti Dialect Arabic</strong>. Never lose a single lead or a dollar of revenue again.
              </p>
            </div>

            {/* Target Industries Grid */}
            <div className="reveal grid grid-cols-2 gap-4 mb-10 max-w-xl">
              <div className="p-4 bg-[#111822]/60 border border-white/5 rounded-2xl">
                <span className="text-xl mb-1.5 block">💇‍♀️</span>
                <h4 className="text-sm font-bold text-[#F0F4FA] mb-1">Salons & Studios</h4>
                <p className="text-xs text-[#F0F4FA]/40">Book haircuts, styling, treatments, and send instant system reminders.</p>
              </div>
              <div className="p-4 bg-[#111822]/60 border border-white/5 rounded-2xl">
                <span className="text-xl mb-1.5 block">🦷</span>
                <h4 className="text-sm font-bold text-[#F0F4FA] mb-1">Dental Clinics</h4>
                <p className="text-xs text-[#F0F4FA]/40">Automate patient booking, intake verification, and emergency routing.</p>
              </div>
              <div className="p-4 bg-[#111822]/60 border border-white/5 rounded-2xl">
                <span className="text-xl mb-1.5 block">🏠</span>
                <h4 className="text-sm font-bold text-[#F0F4FA] mb-1">Real Estate</h4>
                <p className="text-xs text-[#F0F4FA]/40">Collect buyer/renter specs, pre-qualify leads, and book viewing times.</p>
              </div>
              <div className="p-4 bg-[#111822]/60 border border-white/5 rounded-2xl">
                <span className="text-xl mb-1.5 block">⚖️</span>
                <h4 className="text-sm font-bold text-[#F0F4FA] mb-1">Law Firms</h4>
                <p className="text-xs text-[#F0F4FA]/40">Automate initial client intake and set paid or free consultation calls.</p>
              </div>
            </div>

            {/* Operational features rows */}
            <div className="reveal space-y-4 mb-10 max-w-2xl">
              <div className="flex items-start gap-3.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30 text-emerald-400 text-xs font-bold mt-1">✓</div>
                <div>
                  <h4 className="text-sm font-bold text-[#F0F4FA]">Fully Independent Booking</h4>
                  <p className="text-xs text-[#F0F4FA]/50 leading-relaxed">Asks for full name, service preferences, and phone number, checking calendar slots automatically.</p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30 text-emerald-400 text-xs font-bold mt-1">✓</div>
                <div>
                  <h4 className="text-sm font-bold text-[#F0F4FA]">24/7/365 FAQ Mitigation</h4>
                  <p className="text-xs text-[#F0F4FA]/50 leading-relaxed">Instantly resolves inquiries about pricing packages, location maps, staff profiles, and business hours.</p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30 text-emerald-400 text-xs font-bold mt-1">✓</div>
                <div>
                  <h4 className="text-sm font-bold text-[#F0F4FA]">Dual Dialect Engine</h4>
                  <p className="text-xs text-[#F0F4FA]/50 leading-relaxed">Sounds friendly and authentic in natural Kuwaiti Arabic (اللهجة الكويتية) or clean English, ensuring high client trust.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Simulated Smartphone with Toggle tabs */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Interactive Selector Tabs */}
            <div className="flex bg-[#111822]/60 border border-white/5 p-1 rounded-xl mb-6 w-full max-w-[340px] shadow-lg">
              <button
                onClick={() => setActiveTab('english')}
                className={`flex-1 text-center py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${
                  activeTab === 'english'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-black shadow-md'
                    : 'text-[#F0F4FA]/60 hover:text-[#F0F4FA]'
                }`}
              >
                English Mode
              </button>
              <button
                onClick={() => setActiveTab('kuwaiti')}
                className={`flex-1 text-center py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${
                  activeTab === 'kuwaiti'
                    ? 'bg-gradient-to-r from-[#0A66C2] to-cyan-400 text-white shadow-md'
                    : 'text-[#F0F4FA]/60 hover:text-[#F0F4FA]'
                }`}
              >
                لهجة كويتية
              </button>
            </div>

            {/* Smart Phone Shell Wrapper */}
            <div className="relative w-full max-w-[350px] aspect-[9/18] bg-[#0c1015] border-[6px] border-[#1d2733] rounded-[40px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col justify-between">
              {/* Speaker & Camera notches */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5.5 bg-[#1d2733] rounded-full z-30 flex items-center justify-center">
                <span className="w-10 h-1 bg-[#2b3949] rounded-full mr-2" />
                <span className="w-2.5 h-2.5 bg-[#212c3b] rounded-full" />
              </div>

              {/* Screen Content (WhatsApp Clone UI) */}
              <div className="flex-1 flex flex-col pt-8 bg-[#0b141a] text-white">
                {/* WhatsApp Chat Header */}
                <div className="bg-[#1f2c34] px-4 py-3.5 flex items-center gap-3 border-b border-[#2b3a43]">
                  {/* Avatar */}
                  <div className="relative w-9 h-9 rounded-full bg-[#128C7E] flex items-center justify-center text-sm font-extrabold text-black select-none shadow-inner">
                    🟢
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border border-[#1f2c34] rounded-full" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xs font-black text-[#F0F4FA] tracking-wide">ShelSunTech Receptionist</h3>
                    <p className="text-[0.62rem] text-[#25D366] font-semibold animate-pulse tracking-wider uppercase">online & active</p>
                  </div>
                </div>

                {/* WhatsApp Chat Body */}
                <div 
                  className={`flex-1 p-3.5 space-y-3.5 overflow-y-auto flex flex-col justify-end bg-opacity-95 scroll-smooth`}
                  style={{
                    backgroundImage: `radial-gradient(circle_at_center, rgba(37, 211, 102, 0.025) 0%, transparent 80%)`,
                  }}
                >
                  {/* System date node */}
                  <div className="mx-auto bg-[#1f2c34]/70 border border-white/5 px-3 py-1 rounded-md text-[0.6rem] text-[#F0F4FA]/50 uppercase tracking-widest font-mono font-medium select-none">
                    Today
                  </div>

                  {/* Message Bubbles mapping */}
                  {typedMessages.map((msg, idx) => {
                    const isBot = msg.sender === 'bot';
                    return (
                      <div
                        key={idx}
                        className={`flex flex-col w-full animate-fade-in-up ${
                          isBot ? 'items-start' : 'items-end'
                        }`}
                      >
                        <div
                          dir={activeTab === 'kuwaiti' ? 'rtl' : 'ltr'}
                          className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-[0.76rem] font-medium leading-relaxed shadow-md ${
                            isBot
                              ? 'bg-[#202c33] text-[#f0f4fa] rounded-tl-none'
                              : 'bg-[#005c4b] text-[#f0f4fa] rounded-tr-none'
                          }`}
                        >
                          <p className={activeTab === 'kuwaiti' ? 'text-right' : 'text-left'}>
                            {msg.text}
                          </p>
                          <div className="flex items-center justify-end gap-1.5 mt-1 text-[0.58rem] text-[#f0f4fa]/40 select-none font-mono">
                            <span>{msg.time}</span>
                            {isBot && (
                              <span className="text-[#53bdeb] font-semibold">✓✓</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Animated Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start w-full animate-fade-in">
                      <div className="bg-[#202c33] text-[#f0f4fa] rounded-2xl rounded-tl-none px-4 py-2.5 text-xs shadow-md flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-[#f0f4fa]/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-[#f0f4fa]/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-[#f0f4fa]/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Simulated input tray */}
              <div className="bg-[#1f2c34] px-4 py-3 flex items-center gap-2.5 border-t border-[#2b3a43] select-none">
                <div className="flex-1 bg-[#2a3942] rounded-full px-4 py-1.5 text-[0.7rem] text-[#8696a0] text-left">
                  {activeTab === 'english' ? 'Type message...' : 'اكتب رسالة...'}
                </div>
                <div className="w-8 h-8 rounded-full bg-[#00a884] flex items-center justify-center text-white text-xs font-bold">
                  🎙️
                </div>
              </div>
            </div>

            {/* Simulated Live Action Call */}
            <span className="mt-4 text-[0.68rem] text-emerald-400 font-bold uppercase tracking-widest block select-none">
              ✨ Interactive Chat Simulated Live Above
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
