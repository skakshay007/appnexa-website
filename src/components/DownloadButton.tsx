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
        className={`inline-flex items-center justify-center rounded-lg bg-[#101522] border border-[#252D3D] text-[#9AA4B5] font-medium cursor-not-allowed select-none ${sizeStyles} ${
          fullWidth ? 'w-full' : ''
        } ${className}`}
      >
        <AlertCircle className="w-4 h-4 text-[#9AA4B5] shrink-0" />
        <span>Download currently unavailable.</span>
      </div>
    );
  }

  return (
    <a
      href={asset.browserDownloadUrl}
      download={asset.name}
      rel="noopener noreferrer"
      className={`group/dl inline-flex items-center justify-center rounded-lg bg-[#38D9FF] hover:bg-[#5ce1ff] active:bg-[#22c3eb] text-[#080B12] font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#38D9FF]/50 focus:ring-offset-2 focus:ring-offset-[#080B12] ${sizeStyles} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      title={`Download ${asset.name} (${asset.formattedSize})`}
    >
      <Download className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover/dl:translate-y-0.5" />
      <span>{label}</span>
      {showSize && asset.formattedSize && (
        <span className="ml-1 px-1.5 py-0.5 rounded bg-[#080B12]/15 font-mono text-[11px] font-medium">
          {asset.formattedSize}
        </span>
      )}
    </a>
  );
};
