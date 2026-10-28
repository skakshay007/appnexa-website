import React from 'react';

interface LoadingStateProps {
  variant?: 'cards' | 'releases' | 'details';
  count?: number;
}

/**
 * Reusable Skeleton Loading State component.
 */
export const LoadingState: React.FC<LoadingStateProps> = ({
  variant = 'cards',
  count = 2
}) => {
  const items = Array.from({ length: count }, (_, idx) => idx);

  if (variant === 'releases') {
    return (
      <div className="space-y-4" role="status" aria-label="Loading releases">
        {items.map((idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-[#151D28] border border-white/[0.08] animate-pulse-subtle"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-white/10" />
                <div className="space-y-2">
                  <div className="h-4 w-48 rounded bg-white/10" />
                  <div className="h-3 w-32 rounded bg-white/[0.06]" />
                </div>
              </div>
              <div className="h-9 w-36 rounded-lg bg-white/10" />
            </div>
            <div className="mt-4 space-y-2.5">
              <div className="h-3 w-3/4 rounded bg-white/[0.07]" />
              <div className="h-3 w-2/3 rounded bg-white/[0.05]" />
              <div className="h-3 w-1/2 rounded bg-white/[0.05]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'details') {
    return (
      <div
        className="p-8 rounded-2xl bg-[#151D28] border border-white/[0.08] animate-pulse-subtle space-y-6"
        role="status"
        aria-label="Loading application details"
      >
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-white/10" />
          <div className="space-y-3 flex-1">
            <div className="h-6 w-64 rounded bg-white/10" />
            <div className="h-4 w-96 max-w-full rounded bg-white/[0.07]" />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/[0.08]">
          <div className="h-14 rounded-lg bg-white/[0.05]" />
          <div className="h-14 rounded-lg bg-white/[0.05]" />
          <div className="h-14 rounded-lg bg-white/[0.05]" />
          <div className="h-14 rounded-lg bg-white/[0.05]" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      role="status"
      aria-label="Loading applications"
    >
      {items.map((idx) => (
        <div
          key={idx}
          className="p-6 rounded-2xl bg-[#151D28] border border-white/[0.08] animate-pulse-subtle flex flex-col justify-between h-64"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/10 shrink-0" />
            <div className="space-y-2.5 flex-1">
              <div className="h-5 w-3/4 rounded bg-white/10" />
              <div className="h-3.5 w-full rounded bg-white/[0.07]" />
              <div className="h-3.5 w-2/3 rounded bg-white/[0.05]" />
            </div>
          </div>
          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
            <div className="h-4 w-24 rounded bg-white/[0.07]" />
            <div className="h-9 w-32 rounded-lg bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
};
