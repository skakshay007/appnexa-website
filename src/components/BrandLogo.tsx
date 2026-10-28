import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

/**
 * Custom geometric AppNexa brand mark and wordmark.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', showTagline = false }) => {
  const iconDimensions =
    size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-11 h-11' : 'w-9 h-9';
  const textClass =
    size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';

  return (
    <div className="inline-flex items-center gap-3 group select-none">
      <div
        className={`${iconDimensions} relative flex items-center justify-center rounded-lg bg-[#151D28] border border-white/10 group-hover:border-[#35D9F5]/60 transition-colors duration-200 overflow-hidden shadow-sm`}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 transition-transform duration-300 group-hover:scale-105"
          aria-hidden="true"
        >
          <rect
            x="7"
            y="7"
            width="26"
            height="26"
            rx="4"
            stroke="#1F2A38"
            strokeWidth="1.5"
          />
          <path
            d="M11 29L20 10L29 29"
            stroke="#35D9F5"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.5 23H25.5"
            stroke="#8B7CFF"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <rect
            x="17.5"
            y="16.5"
            width="5"
            height="5"
            rx="1"
            fill="#0B0F14"
            stroke="#F5F7FA"
            strokeWidth="1.4"
          />
          <circle cx="20" cy="10" r="2" fill="#35D9F5" />
          <circle cx="11" cy="29" r="1.75" fill="#35D9F5" />
          <circle cx="29" cy="29" r="1.75" fill="#8B7CFF" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span
          className={`font-heading font-bold tracking-tight text-[#F5F7FA] leading-none ${textClass}`}
        >
          App<span className="text-[#35D9F5]">Nexa</span>
        </span>
        {showTagline && (
          <span className="text-[11px] font-mono tracking-wider uppercase text-[#A5B0C0] mt-1">
            Discover. Download. Experience.
          </span>
        )}
      </div>
    </div>
  );
};
