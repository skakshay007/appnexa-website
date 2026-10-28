import React from 'react';
import { Link } from 'react-router-dom';
import {
  Timer,
  Headphones,
  Wrench,
  Sparkles,
  Terminal,
  Monitor,
  Globe,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { CategoryInfo } from '../types/app';

interface CategoryCardProps {
  category: CategoryInfo;
  appCount: number;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Timer,
  Headphones,
  Wrench,
  Sparkles,
  Terminal,
  Monitor,
  Globe
};

/**
 * Reusable CategoryCard component (Section 10 & 15).
 * Displays minimal icon, category name, short description, and calculated number of applications.
 * Marks future categories with 0 published applications as "Coming Soon".
 */
export const CategoryCard: React.FC<CategoryCardProps> = ({ category, appCount }) => {
  const IconComponent = ICON_MAP[category.iconName] || Timer;
  const isAvailable = appCount > 0;

  const cardInner = (
    <div
      className={`group relative flex flex-col justify-between rounded-xl p-5 h-full border transition-all duration-200 ${
        isAvailable
          ? 'bg-[#101522] border-[#252D3D] hover:border-[#38D9FF]/50 cursor-pointer'
          : 'bg-[#101522]/55 border-[#252D3D]/70 opacity-85'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div
            className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors ${
              isAvailable
                ? 'bg-[#080B12] border-[#252D3D] text-[#38D9FF] group-hover:border-[#38D9FF]/40'
                : 'bg-[#080B12]/70 border-[#252D3D]/70 text-[#9AA4B5]'
            }`}
          >
            <IconComponent className="w-5 h-5" />
          </div>

          {isAvailable ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#080B12] border border-[#252D3D] font-mono text-xs font-medium text-[#38D9FF]">
              <span>
                {appCount} {appCount === 1 ? 'App' : 'Apps'}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#080B12] border border-[#252D3D] font-mono text-[11px] text-[#9AA4B5]">
              <Clock className="w-3 h-3 text-[#8B7CFF]" />
              <span>Coming Soon</span>
            </span>
          )}
        </div>

        <h3 className="text-base font-heading font-semibold text-[#F5F7FA] mb-1.5 group-hover:text-[#38D9FF] transition-colors">
          {category.name}
        </h3>
        <p className="text-xs sm:text-sm text-[#9AA4B5] leading-relaxed">
          {category.shortDescription}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-[#252D3D]/60 flex items-center justify-between text-[11px] font-mono text-[#9AA4B5]">
        <span>
          {isAvailable
            ? `${appCount} published ${appCount === 1 ? 'application' : 'applications'}`
            : '0 published applications'}
        </span>
        {isAvailable && <span className="text-[#38D9FF]">Explore →</span>}
      </div>
    </div>
  );

  if (isAvailable) {
    return (
      <Link
        to={`/apps?category=${encodeURIComponent(category.id)}`}
        className="block h-full focus:outline-none focus:ring-2 focus:ring-[#38D9FF]/50 rounded-xl"
      >
        {cardInner}
      </Link>
    );
  }

  return <div className="h-full">{cardInner}</div>;
};
