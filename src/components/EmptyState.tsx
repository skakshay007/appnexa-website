import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

/**
 * Reusable Empty State component for search and category filter results.
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No matching applications found',
  description = 'Try adjusting your search query, category filter, or platform selection.',
  actionLabel = 'Reset All Filters',
  onAction
}) => {
  return (
    <div className="p-10 sm:p-14 rounded-xl bg-[#101522] border border-[#252D3D] text-center max-w-xl mx-auto my-4">
      <div className="w-12 h-12 rounded-xl bg-[#080B12] border border-[#252D3D] flex items-center justify-center mx-auto mb-4 text-[#38D9FF]">
        <SearchX className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-heading font-semibold text-[#F5F7FA] mb-2">{title}</h3>
      <p className="text-sm text-[#9AA4B5] leading-relaxed mb-6">{description}</p>
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#080B12] hover:bg-[#151C2E] text-[#F5F7FA] border border-[#252D3D] hover:border-[#38D9FF]/50 text-sm font-medium transition-colors"
        >
          <RotateCcw className="w-4 h-4 text-[#38D9FF]" />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
};
