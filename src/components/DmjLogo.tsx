import React from 'react';

interface DmjLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const DmjLogo: React.FC<DmjLogoProps> = ({ 
  className = '', 
  size = 'md',
  showText = true 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10 sm:w-12 sm:h-12',
    lg: 'w-14 h-14 sm:w-16 sm:h-16',
    xl: 'w-20 h-20 sm:w-24 sm:h-24'
  };

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3.5 ${className}`}>
      {/* Emblem Shield Icon */}
      <div className={`relative ${sizeClasses[size]} rounded-xl sm:rounded-2xl p-0.5 bg-gradient-to-tr from-emerald-500 via-amber-400 to-emerald-600 shadow-lg shadow-emerald-950/40 group-hover:scale-105 transition-all duration-300 flex items-center justify-center shrink-0`}>
        <div className="w-full h-full bg-slate-950 rounded-[10px] sm:rounded-[14px] overflow-hidden flex items-center justify-center p-0.5">
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
              <linearGradient id="logoEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
            {/* Shield Outline */}
            <path d="M50 10 L82 24 V52 C82 70 68 84 50 90 C32 84 18 70 18 52 V24 Z" fill="#020617" stroke="url(#logoGold)" strokeWidth="3.5" />
            {/* House Roof Accent */}
            <path d="M50 20 L72 35 H28 Z" fill="url(#logoEmerald)" />
            {/* Sparkle Bolt */}
            <path d="M52 35 L46 50 H52 L46 65 L58 48 H50 Z" fill="url(#logoGold)" />
            {/* DMJ Text */}
            <text x="50" y="78" fontFamily="sans-serif" fontSize="22" fontWeight="900" textAnchor="middle" fill="url(#logoGold)" letterSpacing="1.5">DMJ</text>
          </svg>
        </div>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <span className="font-black text-base sm:text-xl tracking-wider bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-200 bg-clip-text text-transparent leading-tight">
            DMJ
          </span>
          <span className="text-[9px] sm:text-[10px] font-extrabold tracking-widest text-amber-400 uppercase leading-none">
            PRESTATAIRE DE SERVICES
          </span>
        </div>
      )}
    </div>
  );
};
