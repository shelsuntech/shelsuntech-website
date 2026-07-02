import React from 'react';

interface LogoProps {
  variant?: 'horizontal' | 'vertical';
  className?: string;
  iconSize?: number;
}

export default function Logo({ variant = 'horizontal', className = '', iconSize = 36 }: LogoProps) {
  // Infinity width = 80, height = 44 inside SVG viewbox
  const isVertical = variant === 'vertical';

  return (
    <div className={`flex ${isVertical ? 'flex-col items-center text-center' : 'flex-row items-center gap-3'} ${className} select-none`}>
      {/* High-fidelity custom SVG for pixelated 3D Infinity Loop */}
      <svg
        width={iconSize}
        height={Math.round(iconSize * (44 / 92))} // Maintain correct aspect ratio with wider viewBox
        viewBox="0 0 92 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 animate-pulse-slow"
        shapeRendering="geometricPrecision"
      >
        <defs>
          <linearGradient id="blueGradient" x1="10" y1="22" x2="60" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E40AF" /> {/* Rich Deep Blue */}
            <stop offset="35%" stopColor="#3B82F6" /> {/* Vibrant Electric Blue */}
            <stop offset="70%" stopColor="#06B6D4" /> {/* Bright Cyan */}
            <stop offset="100%" stopColor="#67E8F9" /> {/* Vivid Ice Cyan */}
          </linearGradient>
          
          <linearGradient id="overlapGradient" x1="35" y1="15" x2="45" y2="29" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#67E8F9" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>

          <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 3D Infinity Ribbon Loops */}
        {/* Left Loop */}
        <path
          d="M 24 34 C 13 34, 6 27, 6 19 C 6 11, 13 4, 24 4 C 33 4, 38 16, 42 22 Q 46 28, 52 32 C 58 36, 68 34, 71 27"
          stroke="url(#blueGradient)"
          strokeWidth="7.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#subtleGlow)"
          className="opacity-95"
        />

        {/* Right Loop overlaying for 3D ribbon twist */}
        <path
          d="M 52 32 C 60 32, 69 26, 69 19 C 69 11, 61 7, 52 7 C 43 7, 39 17, 34 23 C 29 29, 21 34, 18 34"
          stroke="url(#overlapGradient)"
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#subtleGlow)"
        />

        {/* Extra connecting overlap layer */}
        <path
          d="M 32 20 Q 36 15, 41 21 Q 45 27, 49 31"
          stroke="url(#blueGradient)"
          strokeWidth="5.5"
          strokeLinecap="round"
          filter="url(#subtleGlow)"
        />

        {/* Disintegrating floating digital pixels (Inspired by the uploaded reference image) */}
        {/* Core disintegration close to right loop (high opacity) */}
        <rect x="68" y="10" width="3.2" height="3.2" fill="#67E8F9" opacity="0.95" rx="0.4" />
        <rect x="71" y="7" width="2.8" height="2.8" fill="#3B82F6" opacity="0.9" rx="0.3" />
        <rect x="69" y="15" width="3.5" height="3.5" fill="#06B6D4" opacity="0.95" rx="0.4" />
        <rect x="73" y="13" width="2.5" height="2.5" fill="#1E40AF" opacity="0.85" rx="0.3" />

        {/* Medium scatter, drifting further right and up/down */}
        <rect x="73" y="5" width="2.4" height="2.4" fill="#67E8F9" opacity="0.85" rx="0.3" />
        <rect x="76" y="9" width="2.2" height="2.2" fill="#3B82F6" opacity="0.8" rx="0.2" />
        <rect x="75" y="16" width="2.6" height="2.6" fill="#06B6D4" opacity="0.85" rx="0.3" />
        <rect x="72" y="22" width="3.0" height="3.0" fill="#67E8F9" opacity="0.9" rx="0.4" />
        <rect x="77" y="20" width="2.0" height="2.0" fill="#3B82F6" opacity="0.75" rx="0.2" />

        {/* Outer scatter, drifting far right and high/low (fading out) */}
        <rect x="79" y="3" width="1.8" height="1.8" fill="#67E8F9" opacity="0.7" rx="0.2" />
        <rect x="81" y="6" width="1.5" height="1.5" fill="#3B82F6" opacity="0.6" rx="0.2" />
        <rect x="83" y="4" width="1.2" height="1.2" fill="#06B6D4" opacity="0.5" rx="0.1" />
        <rect x="80" y="11" width="2.0" height="2.0" fill="#67E8F9" opacity="0.65" rx="0.2" />
        <rect x="84" y="9" width="1.6" height="1.6" fill="#3B82F6" opacity="0.55" rx="0.2" />
        <rect x="82" y="15" width="1.8" height="1.8" fill="#67E8F9" opacity="0.6" rx="0.2" />
        <rect x="86" y="13" width="1.3" height="1.3" fill="#06B6D4" opacity="0.45" rx="0.1" />
        <rect x="81" y="23" width="2.2" height="2.2" fill="#3B82F6" opacity="0.7" rx="0.2" />
        <rect x="85" y="21" width="1.7" height="1.7" fill="#67E8F9" opacity="0.5" rx="0.2" />
        <rect x="84" y="26" width="1.4" height="1.4" fill="#06B6D4" opacity="0.4" rx="0.1" />
        <rect x="88" y="18" width="1.1" height="1.1" fill="#3B82F6" opacity="0.35" rx="0.1" />

        {/* Dynamic bottom trailing pixels */}
        <rect x="65" y="32" width="2.6" height="2.6" fill="#3B82F6" opacity="0.85" rx="0.3" />
        <rect x="69" y="34" width="2.0" height="2.0" fill="#67E8F9" opacity="0.8" rx="0.2" />
        <rect x="73" y="31" width="1.8" height="1.8" fill="#06B6D4" opacity="0.6" rx="0.2" />
        <rect x="76" y="33" width="1.3" height="1.3" fill="#3B82F6" opacity="0.45" rx="0.1" />
      </svg>

      {/* Brand Text Stack */}
      <div className={`flex flex-col ${isVertical ? 'items-center mt-3' : 'items-start'}`}>
        <div className={`font-extrabold tracking-tight flex items-baseline ${
          isVertical 
            ? 'text-2xl gap-1' 
            : iconSize >= 80
              ? 'text-[2.1rem] gap-1.5 leading-none'
              : iconSize >= 48 
                ? 'text-[1.75rem] gap-1 leading-none' 
                : 'text-[1.35rem] gap-0.5 leading-none'
        }`}>
          <span className="text-[#F0F4FA] font-sans">ShelSun</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 font-sans">Tech</span>
        </div>
        <span
          className={`font-mono text-[#F0F4FA]/40 uppercase tracking-[0.14em] whitespace-nowrap ${
            isVertical 
              ? 'text-[0.62rem] mt-1' 
              : iconSize >= 80
                ? 'text-[0.66rem] mt-1.5'
                : iconSize >= 48 
                  ? 'text-[0.58rem] mt-1' 
                  : 'text-[0.45rem] mt-0.5'
          }`}
        >
          Intelligent Solutions. Limitless Possibilities.
        </span>
      </div>
    </div>
  );
}
