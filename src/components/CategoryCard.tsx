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
  Smartphone,
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
  Globe,
  Smartphone
};

/**
 * Reusable CategoryCard component.
 */
export const CategoryCard: React.FC<CategoryCardProps> = ({ category, appCount }) => {
  const IconComponent = ICON_MAP[category.iconName] || Timer;
  const isAvailable = appCount > 0;

  const cardInner = (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl p-6 h-full border transition-all duration-200 ${
        isAvailable
          ? 'bg-[#151D28] border-white/[0.08] hover:border-[#35D9F5]/50 cyan-glow-hover cursor-pointer'
          : 'bg-[#151D28]/60 border-white/[0.06] opacity-90'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div
            className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-colors ${
              isAvailable
                ? 'bg-[#0B0F14] border-white/10 text-[#35D9F5] group-hover:border-[#35D9F5]/40'
                : 'bg-[#0B0F14]/70 border-white/[0.07] text-[#A5B0C0]'
            }`}
          >
            <IconComponent className="w-5 h-5" />
          </div>

          {isAvailable ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0B0F14] border border-white/10 font-mono text-xs font-medium text-[#35D9F5]">
              <span>
                {appCount} {appCount === 1 ? 'App' : 'Apps'}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#0B0F14] border border-white/10 font-mono text-[11px] text-[#A5B0C0]">
              <Clock className="w-3 h-3 text-[#8B7CFF]" />
              <span>Coming Soon</span>
            </span>
          )}
        </div>

        <h3 className="text-base sm:text-lg font-heading font-bold text-[#F5F7FA] mb-1.5 group-hover:text-[#35D9F5] transition-colors">
          {category.name}
        </h3>
        <p className="text-xs sm:text-sm text-[#A5B0C0] leading-relaxed">
          {category.shortDescription}
        </p>
      </div>

      <div className="mt-5 pt-3.5 border-t border-white/[0.07] flex items-center justify-between text-[11px] font-mono text-[#A5B0C0]">
        <span>
          {isAvailable
            ? `${appCount} published ${appCount === 1 ? 'application' : 'applications'}`
            : 'Coming Soon'}
        </span>
        {isAvailable && <span className="text-[#35D9F5]">Browse →</span>}
      </div>
    </div>
  );

  if (isAvailable) {
    return (
      <Link
        to={`/apps?category=${encodeURIComponent(category.id)}`}
        className="block h-full focus:outline-none focus:ring-2 focus:ring-[#35D9F5]/50 rounded-2xl"
      >
        {cardInner}
      </Link>
    );
  }

  return <div className="h-full">{cardInner}</div>;
};
