import React from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  ArrowRight,
  CheckCircle2,
  Clock,
  Smartphone,
  Monitor,
  Globe,
  ArrowUpRight
} from 'lucide-react';
import { APPLICATIONS, CATEGORY_EXPLORER_ITEMS, getCategoryAppCount } from '../config/apps';
import { SEOHead } from '../components/SEOHead';
import { CategoryCard } from '../components/CategoryCard';

export const CategoriesPage: React.FC = () => {
  const androidAppsCount = APPLICATIONS.filter((app) => app.platform === 'Android').length;
  const functionalCategories = CATEGORY_EXPLORER_ITEMS.filter(
    (cat) => !cat.isPlatformCategory
  );

  return (
    <>
      <SEOHead
        title="Software & Platform Categories — AppNexa"
        description="Explore AppNexa applications by platform (Android, Windows, Web) and functional category."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        {/* Page Header */}
        <div className="pb-8 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151D28] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-[#35D9F5] mb-3">
              <Grid className="w-3.5 h-3.5" />
              <span>Category Explorer</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-[#F5F7FA]">
              Platform &amp; Software Categories
            </h1>
            <p className="text-sm sm:text-base text-[#A5B0C0] mt-2 max-w-2xl">
              Explore applications by target operating system or functional software category.
            </p>
          </div>

          <Link
            to="/apps"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#151D28] hover:bg-[#1c2635] border border-white/10 hover:border-[#35D9F5]/40 text-xs sm:text-sm font-medium text-[#F5F7FA] transition-colors self-start sm:self-auto"
          >
            <span>Browse Full Directory</span>
            <ArrowRight className="w-4 h-4 text-[#35D9F5]" />
          </Link>
        </div>

        {/* Platform Categories (Requirement 5) */}
        <section aria-labelledby="platform-cats-heading" className="space-y-6">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#35D9F5]" />
            <h2
              id="platform-cats-heading"
              className="text-xl font-heading font-bold text-[#F5F7FA]"
            >
              Platform Categories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/apps"
              className="group rounded-2xl bg-[#151D28] border border-white/[0.08] hover:border-[#35D9F5]/50 cyan-glow-hover p-6 flex flex-col justify-between transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[#0B0F14] border border-white/10 flex items-center justify-center text-[#35D9F5]">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 font-mono text-xs text-emerald-400">
                    <span>
                      {androidAppsCount} {androidAppsCount === 1 ? 'App' : 'Apps'}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
                <h3 className="text-lg font-heading font-bold text-[#F5F7FA] group-hover:text-[#35D9F5] transition-colors mb-1.5">
                  Android Applications
                </h3>
                <p className="text-xs sm:text-sm text-[#A5B0C0] leading-relaxed">
                  Native Android applications distributed as direct APK packages via GitHub Releases.
                </p>
              </div>
              <div className="mt-5 pt-3.5 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-[#A5B0C0]">
                <span>Active Platform</span>
                <span className="text-[#35D9F5]">Explore →</span>
              </div>
            </Link>

            <div className="rounded-2xl bg-[#151D28]/60 border border-white/[0.06] p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[#0B0F14] border border-white/[0.08] flex items-center justify-center text-[#8B7CFF]">
                    <Monitor className="w-5 h-5" />
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#0B0F14] border border-white/10 font-mono text-[11px] text-[#A5B0C0]">
                    <Clock className="w-3 h-3 text-[#8B7CFF]" />
                    <span>Coming Soon</span>
                  </span>
                </div>
                <h3 className="text-lg font-heading font-bold text-[#F5F7FA] mb-1.5">
                  Windows Software — Coming Soon
                </h3>
                <p className="text-xs sm:text-sm text-[#A5B0C0] leading-relaxed">
                  Native desktop utilities and standalone applications engineered for Windows.
                </p>
              </div>
              <div className="mt-5 pt-3.5 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#A5B0C0]">
                <span>0 published applications</span>
                <span className="text-[#8B7CFF]">Planned</span>
              </div>
            </div>

            <div className="rounded-2xl bg-[#151D28]/60 border border-white/[0.06] p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[#0B0F14] border border-white/[0.08] flex items-center justify-center text-[#8B7CFF]">
                    <Globe className="w-5 h-5" />
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#0B0F14] border border-white/10 font-mono text-[11px] text-[#A5B0C0]">
                    <Clock className="w-3 h-3 text-[#8B7CFF]" />
                    <span>Coming Soon</span>
                  </span>
                </div>
                <h3 className="text-lg font-heading font-bold text-[#F5F7FA] mb-1.5">
                  Web Applications — Coming Soon
                </h3>
                <p className="text-xs sm:text-sm text-[#A5B0C0] leading-relaxed">
                  Browser-accessible tools and instant-launch web software requiring zero installation.
                </p>
              </div>
              <div className="mt-5 pt-3.5 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#A5B0C0]">
                <span>0 published applications</span>
                <span className="text-[#8B7CFF]">Planned</span>
              </div>
            </div>
          </div>
        </section>

        {/* Functional Application Categories */}
        <section aria-labelledby="functional-categories-heading" className="space-y-6">
          <div className="flex items-center gap-2.5">
            <Grid className="w-4 h-4 text-[#8B7CFF]" />
            <h2
              id="functional-categories-heading"
              className="text-xl font-heading font-bold text-[#F5F7FA]"
            >
              Application Categories ({functionalCategories.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {functionalCategories.map((cat) => (
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
