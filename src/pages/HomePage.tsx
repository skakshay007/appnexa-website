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
  GitBranch,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { APPLICATIONS } from '../config/apps';
import { useReleases } from '../context/ReleasesContext';
import { SEOHead } from '../components/SEOHead';
import { HeroEcosystemVisual } from '../components/HeroEcosystemVisual';
import { FeaturedApplications } from '../components/FeaturedApplications';
import { ReleaseCard } from '../components/ReleaseCard';
import { LoadingState } from '../components/LoadingState';
import { EmptyState } from '../components/EmptyState';
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

  const androidAppsCount = APPLICATIONS.filter((app) => app.platform === 'Android').length;

  return (
    <>
      <SEOHead
        title="AppNexa — Discover Software That Makes a Difference."
        description="Explore useful applications, discover new releases, and download software built to improve your digital experience."
      />

      {/* 1. HERO SECTION (Requirement 2) */}
      <section className="relative overflow-hidden bg-nexa-hero-glow border-b border-white/[0.08] py-20 sm:py-28">
        {/* Subtle structural developer-platform grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-nexa-grid opacity-60 pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-7 animate-fade-up">
              {/* Eyebrow Label */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#151D28] border border-white/10 text-xs font-mono tracking-widest uppercase text-[#35D9F5] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#35D9F5]" />
                <span>SOFTWARE DISCOVERY PLATFORM</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-heading font-bold text-[#F5F7FA] tracking-tight leading-[1.1]">
                Discover Software That Makes a Difference.
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-[#A5B0C0] leading-relaxed max-w-xl">
                Explore useful applications, discover new releases, and download software built to
                improve your digital experience.
              </p>

              {/* Primary & Secondary CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <Link
                  to="/apps"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#35D9F5] hover:bg-[#5ce3fa] text-[#0B0F14] font-semibold text-sm shadow-[0_0_28px_-6px_rgba(53,217,245,0.45)] hover:shadow-[0_0_32px_-4px_rgba(53,217,245,0.65)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#35D9F5]/50"
                >
                  <span>Explore Applications</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/releases"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#151D28] hover:bg-[#1c2635] text-[#F5F7FA] border border-white/10 hover:border-[#8B7CFF]/60 font-medium text-sm transition-all duration-200"
                >
                  <span>Latest Releases</span>
                </Link>
              </div>

              {/* Compact Platform Badges */}
              <div className="pt-5 border-t border-white/[0.08]">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Link
                    to="/apps"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#151D28] border border-[#35D9F5]/40 hover:border-[#35D9F5] text-xs font-mono text-[#F5F7FA] transition-colors"
                  >
                    <Smartphone className="w-3.5 h-3.5 text-[#35D9F5]" />
                    <span>Android Apps</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Available" />
                  </Link>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111821] border border-white/[0.08] text-xs font-mono text-[#A5B0C0]">
                    <Monitor className="w-3.5 h-3.5 text-[#8B7CFF]" />
                    <span>Windows Software — Coming Soon</span>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111821] border border-white/[0.08] text-xs font-mono text-[#A5B0C0]">
                    <Globe className="w-3.5 h-3.5 text-[#8B7CFF]" />
                    <span>Web Applications — Coming Soon</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Software Platform Interface Preview */}
            <div className="lg:col-span-6 animate-fade-up">
              <HeroEcosystemVisual />
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED APPLICATIONS SECTION (Requirement 3) */}
      <FeaturedApplications />

      {/* 3. LATEST RELEASES SECTION (Requirement 4) */}
      <section
        id="latest-releases"
        aria-labelledby="latest-releases-heading"
        className="py-20 sm:py-24 border-b border-white/[0.08]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151D28] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-[#8B7CFF] mb-3">
                <span>GitHub Releases API</span>
              </div>
              <h2
                id="latest-releases-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-[#F5F7FA]"
              >
                Latest Releases
              </h2>
              <p className="text-sm sm:text-base text-[#A5B0C0] mt-2 max-w-xl">
                Official release versions, publication dates, changelogs, and direct APK downloads
                retrieved live from GitHub Releases.
              </p>
            </div>

            {/* Channel Filter & Sync Controls */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center p-1 rounded-xl bg-[#111821] border border-white/10">
                <button
                  type="button"
                  onClick={() => setIncludePrereleases(false)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                    !includePrereleases
                      ? 'bg-[#151D28] text-[#35D9F5] border border-white/10'
                      : 'text-[#A5B0C0] hover:text-[#F5F7FA]'
                  }`}
                >
                  Stable Releases
                </button>
                <button
                  type="button"
                  onClick={() => setIncludePrereleases(true)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                    includePrereleases
                      ? 'bg-[#151D28] text-[#8B7CFF] border border-white/10'
                      : 'text-[#A5B0C0] hover:text-[#F5F7FA]'
                  }`}
                >
                  All Channels
                </button>
              </div>

              <button
                type="button"
                onClick={() => void refreshAllReleases()}
                disabled={isLoading}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#151D28] hover:bg-[#1c2635] border border-white/10 hover:border-[#35D9F5]/40 text-xs font-mono text-[#A5B0C0] hover:text-[#F5F7FA] transition-colors disabled:opacity-50"
                title="Refresh release data from GitHub API"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 text-[#35D9F5] ${isLoading ? 'animate-spin' : ''}`}
                />
                <span>Sync</span>
              </button>
            </div>
          </div>

          {/* Error State */}
          {hasError && errorMessages.length > 0 && (
            <div className="mb-6">
              <ErrorState
                message={errorMessages[0]}
                onRetry={() => void refreshAllReleases()}
                externalUrl="https://github.com/skakshay007/Universal-Music-Sleep-Timer/releases"
              />
            </div>
          )}

          {/* Loading, Empty, and Populated States */}
          {isLoading ? (
            <LoadingState variant="releases" count={1} />
          ) : displayedReleases.length === 0 ? (
            <EmptyState
              title="No confirmed GitHub releases available"
              description={
                hasError
                  ? 'Live release data could not be retrieved from the GitHub API at this time. Please retry or view releases directly on GitHub.'
                  : 'No published releases matched the selected channel.'
              }
              actionLabel="Retry GitHub API Sync"
              onAction={() => void refreshAllReleases()}
            />
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

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-white/[0.08]">
            <span className="text-xs font-mono text-[#A5B0C0] inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Synchronized directly with GitHub Releases REST API.
            </span>
            <Link
              to="/releases"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#35D9F5] hover:text-[#5ce3fa] transition-colors"
            >
              <span>View Full Release History</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. PLATFORM CATEGORIES SECTION (Requirement 5) */}
      <section
        id="platform-categories"
        aria-labelledby="platform-categories-heading"
        className="py-20 sm:py-24 bg-[#111821]/50 border-b border-white/[0.08]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151D28] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-[#35D9F5] mb-3">
                <span>Platform Ecosystem</span>
              </div>
              <h2
                id="platform-categories-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-[#F5F7FA]"
              >
                Platform Categories
              </h2>
              <p className="text-sm sm:text-base text-[#A5B0C0] mt-2 max-w-xl">
                Browse software by target platform or explore functional categories across the
                AppNexa catalog.
              </p>
            </div>

            <Link
              to="/categories"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#151D28] hover:bg-[#1c2635] border border-white/10 hover:border-[#35D9F5]/40 text-xs sm:text-sm font-medium text-[#35D9F5] transition-colors self-start sm:self-auto"
            >
              <span>All Categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Android Applications */}
            <Link
              to="/apps"
              className="group rounded-2xl bg-[#151D28] border border-white/[0.08] hover:border-[#35D9F5]/50 cyan-glow-hover p-6 sm:p-7 flex flex-col justify-between transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#0B0F14] border border-white/10 group-hover:border-[#35D9F5]/40 flex items-center justify-center text-[#35D9F5] transition-colors">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 font-mono text-xs font-medium text-emerald-400">
                    <span>
                      {androidAppsCount} {androidAppsCount === 1 ? 'App' : 'Apps'} Available
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                <h3 className="text-xl font-heading font-bold text-[#F5F7FA] group-hover:text-[#35D9F5] transition-colors mb-2">
                  Android Applications
                </h3>
                <p className="text-sm text-[#A5B0C0] leading-relaxed">
                  Native Android applications engineered with Kotlin and Jetpack Compose, distributed
                  as installable APK packages directly from GitHub Releases.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                <span className="text-[#A5B0C0]">Format: Android APK</span>
                <span className="text-[#35D9F5] font-medium">Explore Android Apps →</span>
              </div>
            </Link>

            {/* Card 2: Windows Software — Coming Soon */}
            <div className="rounded-2xl bg-[#151D28]/70 border border-white/[0.07] p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#0B0F14] border border-white/[0.08] flex items-center justify-center text-[#8B7CFF]">
                    <Monitor className="w-6 h-6" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B0F14] border border-white/10 font-mono text-xs text-[#A5B0C0]">
                    <Clock className="w-3.5 h-3.5 text-[#8B7CFF]" />
                    <span>Coming Soon</span>
                  </span>
                </div>

                <h3 className="text-xl font-heading font-bold text-[#F5F7FA] mb-2">
                  Windows Software — Coming Soon
                </h3>
                <p className="text-sm text-[#A5B0C0] leading-relaxed">
                  Standalone desktop utilities, productivity helpers, and developer tools built for
                  modern Windows environments.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.07] flex items-center justify-between text-xs font-mono text-[#A5B0C0]">
                <span>Planned Expansion</span>
                <span className="text-[#8B7CFF]">In Development</span>
              </div>
            </div>

            {/* Card 3: Web Applications — Coming Soon */}
            <div className="rounded-2xl bg-[#151D28]/70 border border-white/[0.07] p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#0B0F14] border border-white/[0.08] flex items-center justify-center text-[#8B7CFF]">
                    <Globe className="w-6 h-6" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B0F14] border border-white/10 font-mono text-xs text-[#A5B0C0]">
                    <Clock className="w-3.5 h-3.5 text-[#8B7CFF]" />
                    <span>Coming Soon</span>
                  </span>
                </div>

                <h3 className="text-xl font-heading font-bold text-[#F5F7FA] mb-2">
                  Web Applications — Coming Soon
                </h3>
                <p className="text-sm text-[#A5B0C0] leading-relaxed">
                  Instant-launch browser applications and lightweight web tools accessible across
                  all devices without installation.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.07] flex items-center justify-between text-xs font-mono text-[#A5B0C0]">
                <span>Planned Expansion</span>
                <span className="text-[#8B7CFF]">In Development</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DEVELOPER PLATFORM TRUST STRIP */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#151D28] border border-white/[0.08] p-8 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#0B0F14] border border-white/10 flex items-center justify-center text-[#35D9F5]">
                  <Code2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-heading font-bold text-[#F5F7FA]">
                  Independent Engineering
                </h3>
                <p className="text-xs sm:text-sm text-[#A5B0C0] leading-relaxed">
                  Applications on AppNexa are built and published directly by the platform creator
                  with focus on performance, reliability, and clean UX.
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#0B0F14] border border-white/10 flex items-center justify-center text-[#8B7CFF]">
                  <GitBranch className="w-5 h-5" />
                </div>
                <h3 className="text-base font-heading font-bold text-[#F5F7FA]">
                  GitHub Releases Provenance
                </h3>
                <p className="text-xs sm:text-sm text-[#A5B0C0] leading-relaxed">
                  Versions, release notes, and binary download links are fetched live from public
                  GitHub repositories—never repackaged or modified.
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#0B0F14] border border-white/10 flex items-center justify-center text-[#35D9F5]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-heading font-bold text-[#F5F7FA]">
                  Transparent &amp; Trustworthy
                </h3>
                <p className="text-xs sm:text-sm text-[#A5B0C0] leading-relaxed">
                  No fabricated metrics, no fake download counters, and no misleading availability
                  badges when release data is unconfirmed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
