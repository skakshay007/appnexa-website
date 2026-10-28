import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, ShieldCheck, GitBranch } from 'lucide-react';
import { APPLICATIONS } from '../config/apps';
import { useReleases } from '../context/ReleasesContext';
import { ApplicationCard } from './ApplicationCard';
import { LoadingState } from './LoadingState';

/**
 * Reusable Featured Applications section component.
 * Heading: "Featured Applications"
 * Description: "Explore applications built for everyday use."
 */
export const FeaturedApplications: React.FC = () => {
  const { isLoading } = useReleases();
  const featuredApps = APPLICATIONS.filter((app) => app.featured);

  return (
    <section
      id="featured-applications"
      aria-labelledby="featured-apps-heading"
      className="py-20 border-b border-[#252D3D]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#101522] border border-[#252D3D] text-[11px] font-mono uppercase tracking-widest text-[#38D9FF] mb-3">
              <span>Curated Directory</span>
            </div>
            <h2
              id="featured-apps-heading"
              className="text-2xl sm:text-3xl font-heading font-bold text-[#F5F7FA]"
            >
              Featured Applications
            </h2>
            <p className="text-sm sm:text-base text-[#9AA4B5] mt-1.5">
              Explore applications built for everyday use.
            </p>
          </div>

          <Link
            to="/apps"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#38D9FF] hover:text-[#5ce1ff] transition-colors group self-start sm:self-auto"
          >
            <span>View Full Directory</span>
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

            {/* Architectural Expansion Card when there is 1 featured app, maintaining a balanced 2-column grid */}
            {featuredApps.length === 1 && (
              <div className="rounded-xl bg-[#101522]/60 border border-[#252D3D] border-dashed p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#080B12] border border-[#252D3D] flex items-center justify-center text-[#8B7CFF]">
                      <Layers className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 rounded bg-[#080B12] border border-[#252D3D] text-[11px] font-mono text-[#9AA4B5] uppercase tracking-wider">
                      Multi-Platform Architecture
                    </span>
                  </div>

                  <h3 className="text-lg font-heading font-semibold text-[#F5F7FA] mb-2">
                    Engineered for Continuous Releases
                  </h3>
                  <p className="text-sm text-[#9AA4B5] leading-relaxed mb-5">
                    AppNexa distributes software directly from verified GitHub Releases. Additional
                    Android utilities, Windows desktop tools, and web applications will appear here
                    as new releases are published.
                  </p>

                  <div className="space-y-2.5 mb-6">
                    <div className="flex items-center gap-2.5 text-xs text-[#9AA4B5]">
                      <ShieldCheck className="w-4 h-4 text-[#38D9FF] shrink-0" />
                      <span>Direct, unmodified APK binaries served from official release tags</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-[#9AA4B5]">
                      <GitBranch className="w-4 h-4 text-[#8B7CFF] shrink-0" />
                      <span>Full version history, changelogs, and SHA-256 asset digests</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#252D3D]/80 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-mono text-[#9AA4B5]">
                    Next targets: Windows &amp; Web Tools
                  </span>
                  <Link
                    to="/releases"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#38D9FF] hover:underline"
                  >
                    <span>Inspect Release Feed</span>
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
