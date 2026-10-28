import React from 'react';

interface AppIconProps {
  icon: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

/**
 * Renders an application icon. Supports custom bespoke SVG vector emblems
 * (such as 'sleep-timer' for Universal Music Sleep Timer) as well as external image URLs.
 */
export const AppIcon: React.FC<AppIconProps> = ({
  icon,
  name,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10 rounded-lg',
    md: 'w-14 h-14 rounded-xl',
    lg: 'w-16 h-16 rounded-xl',
    xl: 'w-20 h-20 rounded-2xl'
  }[size];

  if (icon.startsWith('http') || icon.startsWith('/')) {
    return (
      <img
        src={icon}
        alt={`${name} icon`}
        loading="lazy"
        className={`${sizeClasses} object-cover bg-[#101522] border border-[#252D3D] ${className}`}
      />
    );
  }

  if (icon === 'sleep-timer') {
    return (
      <div
        className={`${sizeClasses} relative flex items-center justify-center bg-[#080B12] border border-[#252D3D] shrink-0 overflow-hidden select-none ${className}`}
        aria-label={`${name} icon`}
      >
        {/* Subtle technical corner accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#38D9FF]/10 via-transparent to-[#8B7CFF]/10 pointer-events-none" />
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3/5 h-3/5 relative z-10"
        >
          {/* Outer countdown progress arc */}
          <circle
            cx="24"
            cy="24"
            r="18"
            stroke="#252D3D"
            strokeWidth="2.5"
          />
          <path
            d="M24 6A18 18 0 1 1 8.4 33"
            stroke="#38D9FF"
            strokeWidth="2.75"
            strokeLinecap="round"
          />
          {/* Top timer crown */}
          <path d="M21 3H27" stroke="#8B7CFF" strokeWidth="2.5" strokeLinecap="round" />
          {/* Inner music note / pause hybrid glyph */}
          <path
            d="M21 17V27.5C21 29.433 19.433 31 17.5 31C15.567 31 14 29.433 14 27.5C14 25.567 15.567 24 17.5 24C18.3 24 19.04 24.27 19.63 24.72V17L29 15V21"
            stroke="#F5F7FA"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Pause bars on bottom right */}
          <rect x="25.5" y="24" width="2.4" height="7" rx="1" fill="#8B7CFF" />
          <rect x="30" y="24" width="2.4" height="7" rx="1" fill="#38D9FF" />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`${sizeClasses} flex items-center justify-center bg-[#080B12] border border-[#252D3D] text-[#38D9FF] font-heading font-bold ${className}`}
      aria-label={`${name} icon`}
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
};
