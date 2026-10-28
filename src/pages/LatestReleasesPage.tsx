import React, { useState, useMemo } from 'react';
import { GitBranch, RefreshCw, CheckCircle2, FlaskConical } from 'lucide-react';
import { APPLICATIONS } from '../config/apps';
import { useReleases } from '../context/ReleasesContext';
import { SEOHead } from '../components/SEOHead';
import { ReleaseCard } from '../components/ReleaseCard';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';

export const LatestReleasesPage: React.FC = () => {
  const {
    allPublishedReleases,
    allStableReleases,
    isLoading,
    hasError,
    errorMessages,
    refreshAllReleases
  } = useReleases();

  const [channelFilter, setChannelFilter] = useState<'stable' | 'all' | 'prerelease'>('stable');
  const [selectedAppId, setSelectedAppId] = useState<string>('ALL');

  const filteredReleases = useMemo(() => {
    const baseList =
      channelFilter === 'stable'
        ? allStableReleases
        : channelFilter === 'prerelease'
          ? allPublishedReleases.filter((item) => item.release.isPrerelease)
          : allPublishedReleases;

    if (selectedAppId === 'ALL') {
      return baseList;
    }
    return baseList.filter((item) => item.app.id === selectedAppId);
  }, [channelFilter, selectedAppId, allPublishedReleases, allStableReleases]);

  return (
    <>
      <SEOHead
        title="Latest Releases — AppNexa Software Distribution"
        description="Explore the latest published software releases, version changelogs, and direct APK downloads on AppNexa."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151D28] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-[#8B7CFF] mb-3">
              <GitBranch className="w-3.5 h-3.5" />
              <span>GitHub Releases Integration</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-[#F5F7FA]">
              Latest Releases
            </h1>
            <p className="text-sm sm:text-base text-[#A5B0C0] mt-2 max-w-2xl">
              Live release feed sorted by publication date. Stable releases are displayed by
              default; draft releases are excluded automatically.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void refreshAllReleases()}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#151D28] hover:bg-[#1c2635] border border-white/10 hover:border-[#35D9F5]/50 text-xs sm:text-sm font-mono text-[#F5F7FA] transition-colors self-start md:self-auto disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 text-[#35D9F5] ${isLoading ? 'animate-spin' : ''}`} />
            <span>Sync with GitHub API</span>
          </button>
        </div>

        {/* Channel & Application Filters */}
        <div className="rounded-2xl bg-[#111821] border border-white/[0.08] p-4 sm:p-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-[#A5B0C0] mr-1">Release Channel:</span>
            <button
              type="button"
              onClick={() => setChannelFilter('stable')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                channelFilter === 'stable'
                  ? 'bg-[#35D9F5] text-[#0B0F14] font-semibold'
                  : 'bg-[#151D28] text-[#A5B0C0] hover:text-[#F5F7FA] border border-white/10'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Stable Only ({allStableReleases.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setChannelFilter('all')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                channelFilter === 'all'
                  ? 'bg-[#35D9F5] text-[#0B0F14] font-semibold'
                  : 'bg-[#151D28] text-[#A5B0C0] hover:text-[#F5F7FA] border border-white/10'
              }`}
            >
              <span>All Published ({allPublishedReleases.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setChannelFilter('prerelease')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                channelFilter === 'prerelease'
                  ? 'bg-[#8B7CFF] text-[#0B0F14] font-semibold'
                  : 'bg-[#151D28] text-[#A5B0C0] hover:text-[#F5F7FA] border border-white/10'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>
                Prereleases ({allPublishedReleases.filter((r) => r.release.isPrerelease).length})
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="release-app-filter" className="text-xs font-mono text-[#A5B0C0]">
              Application:
            </label>
            <select
              id="release-app-filter"
              value={selectedAppId}
              onChange={(e) => setSelectedAppId(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-[#0B0F14] border border-white/10 text-xs font-mono text-[#F5F7FA] focus:border-[#35D9F5] focus:outline-none"
            >
              <option value="ALL">All Applications</option>
              {APPLICATIONS.map((app) => (
                <option key={app.id} value={app.id}>
                  {app.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* API Error Notice */}
        {hasError && errorMessages.length > 0 && (
          <div className="mb-6">
            <ErrorState
              message={errorMessages[0]}
              onRetry={() => void refreshAllReleases()}
              externalUrl="https://github.com/skakshay007/Universal-Music-Sleep-Timer/releases"
            />
          </div>
        )}

        {/* Releases List */}
        {isLoading ? (
          <LoadingState variant="releases" count={2} />
        ) : filteredReleases.length === 0 ? (
          <EmptyState
            title={
              channelFilter === 'prerelease'
                ? 'No prereleases currently published'
                : 'No confirmed releases found'
            }
            description={
              channelFilter === 'prerelease'
                ? 'All currently published builds are stable releases. Switch to "Stable Only" or "All Published" to view available builds.'
                : 'No releases matched the current filter or the GitHub API could not be reached.'
            }
            actionLabel="Show Stable Releases"
            onAction={() => {
              setChannelFilter('stable');
              setSelectedAppId('ALL');
            }}
          />
        ) : (
          <div className="space-y-6">
            {filteredReleases.map(({ app, release }) => (
              <ReleaseCard key={`${app.id}-${release.id}`} app={app} release={release} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
