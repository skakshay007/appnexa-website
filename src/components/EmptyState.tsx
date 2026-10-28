import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

/**
 * Reusable Empty State component for search, filter, and release states.
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No matching applications found',
  description = 'Try adjusting your search query, category filter, or platform selection.',
  actionLabel = 'Reset All Filters',
  onAction
}) => {
  return (
    <div className="p-10 sm:p-14 rounded-2xl bg-[#151D28] border border-white/[0.08] text-center max-w-xl mx-auto my-4">
      <div className="w-12 h-12 rounded-xl bg-[#0B0F14] border border-white/10 flex items-center justify-center mx-auto mb-4 text-[#35D9F5]">
        <SearchX className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-heading font-bold text-[#F5F7FA] mb-2">{title}</h3>
      <p className="text-sm text-[#A5B0C0] leading-relaxed mb-6">{description}</p>
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#111821] hover:bg-[#0B0F14] text-[#F5F7FA] border border-white/10 hover:border-[#35D9F5]/50 text-sm font-medium transition-colors"
        >
          <RotateCcw className="w-4 h-4 text-[#35D9F5]" />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
};
