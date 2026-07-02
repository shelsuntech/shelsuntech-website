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
        height={Math.round(iconSize * (44 / 80))} // Maintain correct aspect ratio without fractional subpixel blur
        viewBox="0 0 80 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        shapeRendering="geometricPrecision"
      >
        <defs>
          <linearGradient id="blueGradient" x1="10" y1="22" x2="60" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E40AF" /> {/* Deep blue */}
            <stop offset="35%" stopColor="#3B82F6" /> {/* Vibrant blue */}
            <stop offset="70%" stopColor="#06B6D4" /> {/* Cyan */}
            <stop offset="100%" stopColor="#22D3EE" /> {/* Light Cyan */}
          </linearGradient>
          
          <linearGradient id="overlapGradient" x1="35" y1="15" x2="45" y2="29" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>

          <filter id="subtleGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Ribbon Overlay to give 3D overlap effect */}
        {/* Left Loop */}
        <path
          d="M 24 34 C 13 34, 6 27, 6 19 C 6 11, 13 4, 24 4 C 33 4, 38 16, 42 22 Q 46 28, 52 32 C 58 36, 68 34, 71 27"
          stroke="url(#blueGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-95"
        />

        {/* Right Loop overlaying for 3D ribbon twist */}
        <path
          d="M 52 32 C 60 32, 69 26, 69 19 C 69 11, 61 7, 52 7 C 43 7, 39 17, 34 23 C 29 29, 21 34, 18 34"
          stroke="url(#overlapGradient)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Extra connecting overlap layer */}
        <path
          d="M 32 20 Q 36 15, 41 21 Q 45 27, 49 31"
          stroke="url(#blueGradient)"
          strokeWidth="4.5"
          strokeLinecap="round"
        />

        {/* Disintegrating floating digital pixels on the right side */}
        {/* Row 1 */}
        <rect x="66" y="8" width="2.5" height="2.5" fill="#22D3EE" opacity="0.9" rx="0.3" />
        <rect x="71" y="6" width="1.8" height="1.8" fill="#3B82F6" opacity="0.85" rx="0.2" />
        <rect x="75" y="10" width="1.5" height="1.5" fill="#3B82F6" opacity="0.5" rx="0.2" />

        {/* Row 2 */}
        <rect x="64" y="15" width="3" height="3" fill="#22D3EE" opacity="0.95" rx="0.3" />
        <rect x="69" y="16" width="2.2" height="2.2" fill="#06B6D4" opacity="0.8" rx="0.2" />
        <rect x="73" y="14" width="2" height="2" fill="#1E40AF" opacity="0.65" rx="0.2" />
        <rect x="77" y="17" width="1.5" height="1.5" fill="#06B6D4" opacity="0.4" rx="0.1" />

        {/* Row 3 */}
        <rect x="58" y="24" width="3.2" height="3.2" fill="#06B6D4" opacity="0.95" rx="0.4" />
        <rect x="63" y="26" width="2" height="2" fill="#22D3EE" opacity="0.75" rx="0.2" />
        <rect x="67" y="23" width="2.5" height="2.5" fill="#3B82F6" opacity="0.6" rx="0.2" />
        <rect x="72" y="25" width="1.8" height="1.8" fill="#22D3EE" opacity="0.45" rx="0.2" />

        {/* Row 4 (Lower scatter) */}
        <rect x="54" y="32" width="2.2" height="2.2" fill="#3B82F6" opacity="0.8" rx="0.2" />
        <rect x="59" y="34" width="3" height="3" fill="#22D3EE" opacity="0.9" rx="0.3" />
        <rect x="64" y="31" width="1.6" height="1.6" fill="#06B6D4" opacity="0.5" rx="0.1" />
      </svg>

      {/* Brand Text Stack */}
      <div className={`flex flex-col ${isVertical ? 'items-center mt-3' : 'items-start'}`}>
        <div className={`font-extrabold tracking-tight flex items-baseline ${
          isVertical 
            ? 'text-2xl gap-1' 
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
