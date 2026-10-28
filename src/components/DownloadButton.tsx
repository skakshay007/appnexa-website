import React from 'react';
import { Download, AlertCircle } from 'lucide-react';
import { NormalizedAsset } from '../types/app';

interface DownloadButtonProps {
  asset: NormalizedAsset | null | undefined;
  label?: string;
  showSize?: boolean;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

/**
 * Reusable Download Button component.
 * Uses the actual GitHub Release asset browser_download_url.
 * When no asset is available, renders a disabled "Download currently unavailable." state.
 */
export const DownloadButton: React.FC<DownloadButtonProps> = ({
  asset,
  label = 'Download APK',
  showSize = false,
  size = 'md',
  fullWidth = false,
  className = ''
}) => {
  const sizeStyles = {
    sm: 'px-3.5 py-2 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-sm gap-2.5'
  }[size];

  if (!asset || !asset.browserDownloadUrl) {
    return (
      <div
        role="status"
        aria-disabled="true"
        className={`inline-flex items-center justify-center rounded-lg bg-[#111821] border border-white/10 text-[#A5B0C0] font-medium cursor-not-allowed select-none ${sizeStyles} ${
          fullWidth ? 'w-full' : ''
        } ${className}`}
      >
        <AlertCircle className="w-4 h-4 text-[#A5B0C0] shrink-0" />
        <span>Download currently unavailable.</span>
      </div>
    );
  }

  return (
    <a
      href={asset.browserDownloadUrl}
      download={asset.name}
      rel="noopener noreferrer"
      className={`group/dl inline-flex items-center justify-center rounded-lg bg-[#35D9F5] hover:bg-[#5ce3fa] active:bg-[#22c2de] text-[#0B0F14] font-semibold shadow-[0_0_24px_-6px_rgba(53,217,245,0.4)] hover:shadow-[0_0_28px_-4px_rgba(53,217,245,0.55)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#35D9F5]/50 focus:ring-offset-2 focus:ring-offset-[#0B0F14] ${sizeStyles} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      title={`Download ${asset.name} (${asset.formattedSize})`}
    >
      <Download className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover/dl:translate-y-0.5" />
      <span>{label}</span>
      {showSize && asset.formattedSize && (
        <span className="ml-1 px-1.5 py-0.5 rounded bg-[#0B0F14]/15 font-mono text-[11px] font-medium">
          {asset.formattedSize}
        </span>
      )}
    </a>
  );
};
