import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { CATEGORY_EXPLORER_ITEMS, getCategoryAppCount } from '../config/apps';
import { SEOHead } from '../components/SEOHead';
import { CategoryCard } from '../components/CategoryCard';

export const CategoriesPage: React.FC = () => {
  const activeCategoryItems = CATEGORY_EXPLORER_ITEMS.filter(
    (cat) => getCategoryAppCount(cat.id) > 0
  );
  const upcomingCategoryItems = CATEGORY_EXPLORER_ITEMS.filter(
    (cat) => getCategoryAppCount(cat.id) === 0
  );

  return (
    <>
      <SEOHead
        title="Software Categories — AppNexa"
        description="Explore AppNexa applications by category, including Productivity, Music & Audio, Utilities, Developer Tools, Windows Software, and Web Applications."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-14">
        {/* Page Header */}
        <div className="pb-8 border-b border-[#252D3D] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#101522] border border-[#252D3D] text-[11px] font-mono uppercase tracking-widest text-[#38D9FF] mb-3">
              <Grid className="w-3.5 h-3.5" />
              <span>Category Explorer</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-[#F5F7FA]">
              Application Categories
            </h1>
            <p className="text-sm sm:text-base text-[#9AA4B5] mt-2 max-w-2xl">
              Application counts are calculated dynamically from published software data. Future
              categories are marked as coming soon until relevant applications are released.
            </p>
          </div>

          <Link
            to="/apps"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#101522] hover:bg-[#151C2E] border border-[#252D3D] hover:border-[#38D9FF]/40 text-xs sm:text-sm font-medium text-[#F5F7FA] transition-colors self-start sm:self-auto"
          >
            <span>Browse Full Directory</span>
            <ArrowRight className="w-4 h-4 text-[#38D9FF]" />
          </Link>
        </div>

        {/* Active Categories */}
        <section aria-labelledby="active-categories-heading" className="space-y-5">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <h2
              id="active-categories-heading"
              className="text-xl font-heading font-semibold text-[#F5F7FA]"
            >
              Active Categories ({activeCategoryItems.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeCategoryItems.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                appCount={getCategoryAppCount(cat.id)}
              />
            ))}
          </div>
        </section>

        {/* Upcoming / Coming Soon Categories */}
        <section aria-labelledby="upcoming-categories-heading" className="space-y-5">
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-[#8B7CFF]" />
            <h2
              id="upcoming-categories-heading"
              className="text-xl font-heading font-semibold text-[#F5F7FA]"
            >
              Upcoming Categories &amp; Platforms ({upcomingCategoryItems.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingCategoryItems.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                appCount={getCategoryAppCount(cat.id)}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};
