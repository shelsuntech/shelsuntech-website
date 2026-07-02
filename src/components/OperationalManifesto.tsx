import React from 'react';
import { motion } from 'motion/react';

export default function OperationalManifesto() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.85,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section className="bg-[#0B0F14] py-24 px-[5vw] relative overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_40%,rgba(59,130,246,0.03)_0%,transparent_100%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Pills / Capsule grid row (2x2 grid as shown in the screenshot) */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20 max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Capsule 1 */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-3.5 bg-[#111822]/40 border border-white/5 hover:border-emerald-500/10 px-5 py-3.5 rounded-xl transition-all duration-300"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.7)] flex-shrink-0 animate-pulse" />
            <span className="text-xs sm:text-[0.9rem] font-medium text-[#F0F4FA]/90 tracking-wide">
              Founders' Enterprise Software Experience
            </span>
          </motion.div>

          {/* Capsule 2 */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-3.5 bg-[#111822]/40 border border-white/5 hover:border-amber-500/10 px-5 py-3.5 rounded-xl transition-all duration-300"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.7)] flex-shrink-0 animate-pulse" />
            <span className="text-xs sm:text-[0.9rem] font-medium text-[#F0F4FA]/90 tracking-wide">
              Founders' ERP & Business Process Expertise
            </span>
          </motion.div>

          {/* Capsule 3 */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-3.5 bg-[#111822]/40 border border-white/5 hover:border-blue-500/10 px-5 py-3.5 rounded-xl transition-all duration-300"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.7)] flex-shrink-0 animate-pulse" />
            <span className="text-xs sm:text-[0.9rem] font-medium text-[#F0F4FA]/90 tracking-wide">
              Founders' US Client Project Delivery
            </span>
          </motion.div>

          {/* Capsule 4 */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-3.5 bg-[#111822]/40 border border-white/5 hover:border-cyan-500/10 px-5 py-3.5 rounded-xl transition-all duration-300"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.7)] flex-shrink-0 animate-pulse" />
            <span className="text-xs sm:text-[0.9rem] font-medium text-[#F0F4FA]/90 tracking-wide">
              Founders' Custom Software & Automation
            </span>
          </motion.div>
        </motion.div>

        {/* Huge bold headline from mockup */}
        <motion.div 
          className="max-w-5xl mb-24"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] text-[#F0F4FA]">
            Stop running your business on{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 font-sans font-extrabold">
              manual processes
            </span>{' '}
            and{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-sans font-extrabold">
              missed revenue.
            </span>
          </h2>
        </motion.div>

        {/* Line divider with animation from mockup */}
        <motion.div 
          className="w-full h-px bg-white/5 mb-16 origin-left"
          variants={lineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />

        {/* 5 Capability Columns with thin vertical borders exactly matching the visual style */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-12 lg:gap-y-0 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Column 1 */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center px-6 lg:border-r border-white/5 last:border-r-0 group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/5 to-cyan-400/5 border border-white/5 group-hover:border-blue-500/25 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 shadow-xl select-none">
              <span className="text-3xl filter drop-shadow group-hover:scale-110 transition-transform duration-300">🏢</span>
            </div>
            <h3 className="text-[#F0F4FA] text-[1rem] font-bold tracking-tight mb-2.5">
              Enterprise Background
            </h3>
            <p className="text-[#F0F4FA]/40 text-xs sm:text-xs leading-relaxed max-w-[210px]">
              Large-scale ERP and enterprise software delivery
            </p>
          </motion.div>

          {/* Column 2 */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center px-6 lg:border-r border-white/5 last:border-r-0 group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/5 to-cyan-400/5 border border-white/5 group-hover:border-amber-500/25 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 shadow-xl select-none">
              <span className="text-3xl filter drop-shadow group-hover:rotate-45 transition-transform duration-300">⚙️</span>
            </div>
            <h3 className="text-[#F0F4FA] text-[1rem] font-bold tracking-tight mb-2.5">
              ERP Implementation
            </h3>
            <p className="text-[#F0F4FA]/40 text-xs sm:text-xs leading-relaxed max-w-[210px]">
              End-to-end implementation and go-live expertise
            </p>
          </motion.div>

          {/* Column 3 */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center px-6 lg:border-r border-white/5 last:border-r-0 group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/5 to-cyan-400/5 border border-white/5 group-hover:border-cyan-500/25 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 shadow-xl select-none">
              <span className="text-3xl filter drop-shadow group-hover:scale-110 transition-transform duration-300">🔗</span>
            </div>
            <h3 className="text-[#F0F4FA] text-[1rem] font-bold tracking-tight mb-2.5">
              Systems Integration
            </h3>
            <p className="text-[#F0F4FA]/40 text-xs sm:text-xs leading-relaxed max-w-[210px]">
              Oracle SOA, REST APIs, and enterprise integration
            </p>
          </motion.div>

          {/* Column 4 */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center px-6 lg:border-r border-white/5 last:border-r-0 group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/5 to-cyan-400/5 border border-white/5 group-hover:border-rose-500/25 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 shadow-xl select-none">
              <span className="text-3xl filter drop-shadow group-hover:translate-y-[-2px] transition-transform duration-300">🇺🇸</span>
            </div>
            <h3 className="text-[#F0F4FA] text-[1rem] font-bold tracking-tight mb-2.5">
              US Client Delivery
            </h3>
            <p className="text-[#F0F4FA]/40 text-xs sm:text-xs leading-relaxed max-w-[210px]">
              Cross-timezone project management and delivery
            </p>
          </motion.div>

          {/* Column 5 */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center px-6 last:border-r-0 group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/5 to-cyan-400/5 border border-white/5 group-hover:border-emerald-500/25 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 shadow-xl select-none">
              <span className="text-3xl filter drop-shadow group-hover:scale-110 transition-transform duration-300">🛡️</span>
            </div>
            <h3 className="text-[#F0F4FA] text-[1rem] font-bold tracking-tight mb-2.5">
              Production Support
            </h3>
            <p className="text-[#F0F4FA]/40 text-xs sm:text-xs leading-relaxed max-w-[210px]">
              Mission-critical systems maintenance and uptime
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
