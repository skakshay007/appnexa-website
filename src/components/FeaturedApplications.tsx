import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, ShieldCheck, GitBranch } from 'lucide-react';
import { APPLICATIONS } from '../config/apps';
import { useReleases } from '../context/ReleasesContext';
import { ApplicationCard } from './ApplicationCard';
import { LoadingState } from './LoadingState';

/**
 * Featured Applications Section (Requirement 3).
 * Uses the application registry in src/config/apps.ts without hardcoded fake applications.
 */
export const FeaturedApplications: React.FC = () => {
  const { isLoading } = useReleases();
  const featuredApps = APPLICATIONS.filter((app) => app.featured);

  return (
    <section
      id="featured-applications"
      aria-labelledby="featured-apps-heading"
      className="py-20 sm:py-24 bg-[#111821]/60 border-b border-white/[0.07]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151D28] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-[#35D9F5] mb-3">
              <span>Catalog Spotlight</span>
            </div>
            <h2
              id="featured-apps-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-[#F5F7FA]"
            >
              Featured Applications
            </h2>
            <p className="text-sm sm:text-base text-[#A5B0C0] mt-2 max-w-xl">
              Production-ready software built with clean native architecture and distributed directly
              from GitHub Releases.
            </p>
          </div>

          <Link
            to="/apps"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#151D28] hover:bg-[#1c2635] border border-white/10 hover:border-[#35D9F5]/40 text-xs sm:text-sm font-medium text-[#35D9F5] transition-colors group self-start sm:self-auto"
          >
            <span>Explore Full Directory</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Featured Applications Grid */}
        {isLoading && featuredApps.length === 0 ? (
          <LoadingState variant="cards" count={2} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {featuredApps.map((app) => (
              <ApplicationCard key={app.id} app={app} />
            ))}

            {/* Developer-Platform Architecture Card alongside single featured app */}
            {featuredApps.length === 1 && (
              <div className="rounded-2xl bg-[#151D28]/60 border border-white/10 border-dashed p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#0B0F14] border border-white/10 flex items-center justify-center text-[#8B7CFF]">
                      <Layers className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-[#0B0F14] border border-white/10 text-[11px] font-mono text-[#A5B0C0] uppercase tracking-wider">
                      Registry Architecture
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-heading font-bold text-[#F5F7FA] mb-2">
                    Modular Software Distribution
                  </h3>
                  <p className="text-sm text-[#A5B0C0] leading-relaxed mb-6">
                    AppNexa connects directly to official GitHub repositories. New Android builds,
                    Windows utilities, and web tools registered in the platform catalog appear here
                    automatically with live release telemetry.
                  </p>

                  <div className="space-y-3 p-4 rounded-xl bg-[#111821] border border-white/[0.06] mb-6">
                    <div className="flex items-center gap-2.5 text-xs text-[#A5B0C0]">
                      <ShieldCheck className="w-4 h-4 text-[#35D9F5] shrink-0" />
                      <span>Direct APK &amp; binary assets served from official GitHub tags</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-[#A5B0C0]">
                      <GitBranch className="w-4 h-4 text-[#8B7CFF] shrink-0" />
                      <span>Automated version detection, changelogs, and SHA-256 digests</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-mono text-[#A5B0C0]">
                    Registry: <code className="text-[#35D9F5]">src/config/apps.ts</code>
                  </span>
                  <Link
                    to="/releases"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#35D9F5] hover:underline"
                  >
                    <span>View Release Feed</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
