import React from 'react';
import { AlertTriangle, RefreshCw, ExternalLink } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  externalUrl?: string;
  externalLabel?: string;
}

/**
 * Reusable Error / Fallback Notice component when GitHub API cannot be reached.
 */
export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Release Synchronization Notice',
  message,
  onRetry,
  externalUrl,
  externalLabel = 'View on GitHub Releases'
}) => {
  return (
    <div
      role="alert"
      className="p-5 rounded-xl bg-[#101522] border border-[#8B7CFF]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div className="flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-lg bg-[#8B7CFF]/10 border border-[#8B7CFF]/30 flex items-center justify-center shrink-0 text-[#8B7CFF] mt-0.5">
          <AlertTriangle className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-sm font-heading font-semibold text-[#F5F7FA]">{title}</h4>
          <p className="text-xs text-[#9AA4B5] mt-1 leading-relaxed">{message}</p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#080B12] hover:bg-[#151C2E] border border-[#252D3D] hover:border-[#38D9FF]/50 text-xs font-medium text-[#F5F7FA] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#38D9FF]" />
            <span>Retry Sync</span>
          </button>
        )}
        {externalUrl && (
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#080B12] hover:bg-[#151C2E] border border-[#252D3D] hover:border-[#8B7CFF]/50 text-xs font-medium text-[#9AA4B5] hover:text-[#F5F7FA] transition-colors"
          >
            <span>{externalLabel}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
};
