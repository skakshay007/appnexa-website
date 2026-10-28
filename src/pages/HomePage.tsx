import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Smartphone,
  Monitor,
  Globe,
  RefreshCw,
  CheckCircle2,
  ShieldCheck,
  Code2,
  GitBranch
} from 'lucide-react';
import { CATEGORY_EXPLORER_ITEMS, getCategoryAppCount } from '../config/apps';
import { useReleases } from '../context/ReleasesContext';
import { SEOHead } from '../components/SEOHead';
import { HeroEcosystemVisual } from '../components/HeroEcosystemVisual';
import { FeaturedApplications } from '../components/FeaturedApplications';
import { ReleaseCard } from '../components/ReleaseCard';
import { CategoryCard } from '../components/CategoryCard';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';

export const HomePage: React.FC = () => {
  const {
    allStableReleases,
    allPublishedReleases,
    isLoading,
    hasError,
    errorMessages,
    refreshAllReleases
  } = useReleases();

  const [includePrereleases, setIncludePrereleases] = useState(false);
  const displayedReleases = includePrereleases ? allPublishedReleases : allStableReleases;

  return (
    <>
      <SEOHead
        title="AppNexa — Discover. Download. Experience."
        description="Discover useful applications, explore new releases, and download software built to make your digital life better."
      />

      {/* 1. HERO SECTION (Section 4) */}
      <section className="relative overflow-hidden border-b border-[#252D3D] py-16 sm:py-24">
        {/* Subtle radial spotlight */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/4 -translate-x-1/2 w-[540px] h-[320px] bg-[#38D9FF]/5 blur-[110px] pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Column: Brand Copy, Buttons & Platform Indicators */}
            <div className="lg:col-span-6 space-y-6">
              {/* Small Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#101522] border border-[#252D3D] text-xs font-mono tracking-wider text-[#38D9FF]">
                <span className="w-2 h-2 rounded-full bg-[#38D9FF]" />
                <span>INDEPENDENT SOFTWARE PLATFORM</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl font-heading font-bold text-[#F5F7FA] tracking-tight leading-[1.12]">
                Your Next Favorite App Starts Here.
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-[#9AA4B5] leading-relaxed max-w-xl">
                Discover useful applications, explore new releases, and download software built to
                make your digital life better.
              </p>

              {/* Primary & Secondary Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  to="/apps"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#38D9FF] hover:bg-[#5ce1ff] text-[#080B12] font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#38D9FF]/50"
                >
                  <span>Explore Applications</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/releases"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#101522] hover:bg-[#151C2E] text-[#F5F7FA] border border-[#252D3D] hover:border-[#8B7CFF]/60 font-medium text-sm transition-all duration-200"
                >
                  <span>Latest Releases</span>
                </Link>
              </div>

              {/* Three Small Platform Indicators */}
              <div className="pt-4 border-t border-[#252D3D]/80">
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#101522] border border-[#38D9FF]/40 text-xs font-mono text-[#F5F7FA]">
                    <Smartphone className="w-3.5 h-3.5 text-[#38D9FF]" />
                    <span>Android Apps</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Available" />
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#101522]/60 border border-[#252D3D] text-xs font-mono text-[#9AA4B5]">
                    <Monitor className="w-3.5 h-3.5 text-[#8B7CFF]" />
                    <span>Windows Software — Coming Soon</span>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#101522]/60 border border-[#252D3D] text-xs font-mono text-[#9AA4B5]">
                    <Globe className="w-3.5 h-3.5 text-[#8B7CFF]" />
                    <span>Web Applications — Coming Soon</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Original Application Ecosystem Visual */}
            <div className="lg:col-span-6">
              <HeroEcosystemVisual />
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED APPLICATIONS SECTION (Section 5) */}
      <FeaturedApplications />

      {/* 3. LATEST RELEASES SECTION (Section 9) */}
      <section
        id="latest-releases"
        aria-labelledby="latest-releases-heading"
        className="py-20 border-b border-[#252D3D]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#101522] border border-[#252D3D] text-[11px] font-mono uppercase tracking-widest text-[#8B7CFF] mb-3">
                <span>GitHub Release Feed</span>
              </div>
              <h2
                id="latest-releases-heading"
                className="text-2xl sm:text-3xl font-heading font-bold text-[#F5F7FA]"
              >
                Latest Releases
              </h2>
              <p className="text-sm sm:text-base text-[#9AA4B5] mt-1.5">
                Direct binary builds, release notes, and verified APK packages synchronized from
                GitHub Releases.
              </p>
            </div>

            {/* Channel Filter & Sync Controls */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center p-1 rounded-lg bg-[#101522] border border-[#252D3D]">
                <button
                  type="button"
                  onClick={() => setIncludePrereleases(false)}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                    !includePrereleases
                      ? 'bg-[#080B12] text-[#38D9FF] border border-[#252D3D]'
                      : 'text-[#9AA4B5] hover:text-[#F5F7FA]'
                  }`}
                >
                  Stable Releases
                </button>
                <button
                  type="button"
                  onClick={() => setIncludePrereleases(true)}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                    includePrereleases
                      ? 'bg-[#080B12] text-[#8B7CFF] border border-[#252D3D]'
                      : 'text-[#9AA4B5] hover:text-[#F5F7FA]'
                  }`}
                >
                  All Channels
                </button>
              </div>

              <button
                type="button"
                onClick={() => void refreshAllReleases()}
                disabled={isLoading}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#101522] hover:bg-[#151C2E] border border-[#252D3D] hover:border-[#38D9FF]/40 text-xs font-mono text-[#9AA4B5] hover:text-[#F5F7FA] transition-colors disabled:opacity-50"
                title="Refresh release data from GitHub API"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-[#38D9FF] ${isLoading ? 'animate-spin' : ''}`} />
                <span>Sync</span>
              </button>
            </div>
          </div>

          {hasError && errorMessages.length > 0 && (
            <div className="mb-6">
              <ErrorState
                message={errorMessages[0]}
                onRetry={() => void refreshAllReleases()}
                externalUrl="https://github.com/skakshay007/Universal-Music-Sleep-Timer/releases"
              />
            </div>
          )}

          {isLoading && displayedReleases.length === 0 ? (
            <LoadingState variant="releases" count={1} />
          ) : (
            <div className="space-y-5">
              {displayedReleases.slice(0, 3).map(({ app, release }) => (
                <ReleaseCard
                  key={`${app.id}-${release.id}`}
                  app={app}
                  release={release}
                  compact
                />
              ))}
            </div>
          )}

          <div className="mt-8 flex items-center justify-between pt-4 border-t border-[#252D3D]/60">
            <span className="text-xs font-mono text-[#9AA4B5] inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Drafts are excluded automatically. Sorted by publication date.
            </span>
            <Link
              to="/releases"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#38D9FF] hover:text-[#5ce1ff] transition-colors"
            >
              <span>Open Full Release Log</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. CATEGORIES SECTION (Section 10) */}
      <section
        id="categories-explorer"
        aria-labelledby="categories-heading"
        className="py-20 border-b border-[#252D3D]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#101522] border border-[#252D3D] text-[11px] font-mono uppercase tracking-widest text-[#38D9FF] mb-3">
                <span>Taxonomy &amp; Roadmap</span>
              </div>
              <h2
                id="categories-heading"
                className="text-2xl sm:text-3xl font-heading font-bold text-[#F5F7FA]"
              >
                Explore by Category
              </h2>
              <p className="text-sm sm:text-base text-[#9AA4B5] mt-1.5">
                Browse active software categories or preview upcoming platform expansions.
              </p>
            </div>

            <Link
              to="/categories"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#38D9FF] hover:text-[#5ce1ff] transition-colors self-start sm:self-auto"
            >
              <span>View Category Directory</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CATEGORY_EXPLORER_ITEMS.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                appCount={getCategoryAppCount(cat.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. INDEPENDENT PLATFORM PILLARS */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#101522] border border-[#252D3D] p-8 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-lg bg-[#080B12] border border-[#252D3D] flex items-center justify-center text-[#38D9FF]">
                  <Code2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-heading font-semibold text-[#F5F7FA]">
                  First-Party Craftsmanship
                </h3>
                <p className="text-xs sm:text-sm text-[#9AA4B5] leading-relaxed">
                  Every application on AppNexa is designed, engineered, and maintained directly by
                  the platform owner with clean native architectures.
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-lg bg-[#080B12] border border-[#252D3D] flex items-center justify-center text-[#8B7CFF]">
                  <GitBranch className="w-5 h-5" />
                </div>
                <h3 className="text-base font-heading font-semibold text-[#F5F7FA]">
                  Transparent Release Provenance
                </h3>
                <p className="text-xs sm:text-sm text-[#9AA4B5] leading-relaxed">
                  Version tags, changelogs, file sizes, and APK binaries are retrieved directly from
                  public GitHub Releases—never repackaged or bundled.
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-lg bg-[#080B12] border border-[#252D3D] flex items-center justify-center text-[#38D9FF]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-heading font-semibold text-[#F5F7FA]">
                  Zero Adware or Fake Metrics
                </h3>
                <p className="text-xs sm:text-sm text-[#9AA4B5] leading-relaxed">
                  No inflated download counters, no fabricated reviews, and no deceptive download
                  buttons. Just straightforward software distribution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
