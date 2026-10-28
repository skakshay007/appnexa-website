import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Calendar, Smartphone, Tag } from 'lucide-react';
import { AppConfig } from '../types/app';
import { useReleases } from '../context/ReleasesContext';
import { formatDate } from '../services/githubReleases';
import { AppIcon } from './AppIcon';
import { DownloadButton } from './DownloadButton';

interface ApplicationCardProps {
  app: AppConfig;
}

/**
 * Reusable Application Card component.
 * Displays icon, name, short description, platform badge, category, current version,
 * release date, Download APK button, and View Details link.
 */
export const ApplicationCard: React.FC<ApplicationCardProps> = ({ app }) => {
  const { getAppReleaseData } = useReleases();
  const releaseData = getAppReleaseData(app.id);

  // Prefer the latest stable release from GitHub API; fallback to configured defaults
  const activeRelease =
    releaseData?.latestStableRelease ??
    releaseData?.latestRelease ??
    app.fallbackReleases[0] ??
    null;

  const currentVersion = activeRelease?.version || app.defaultVersion;
  const releaseDate = formatDate(activeRelease?.publishedAt || app.defaultReleaseDate);
  const primaryAsset = activeRelease?.primaryAsset ?? null;

  return (
    <article className="group relative flex flex-col justify-between rounded-xl bg-[#101522] border border-[#252D3D] hover:border-[#38D9FF]/45 transition-all duration-200 p-6 h-full">
      {/* Top accent line on hover */}
      <div className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#38D9FF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

      <div>
        {/* Header: Icon + Platform & Category Badges */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <Link
            to={`/apps/${app.slug}`}
            className="flex items-center gap-4 focus:outline-none group/title"
          >
            <div className="transition-transform duration-200 group-hover:-translate-y-0.5">
              <AppIcon icon={app.icon} name={app.name} size="md" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#080B12] border border-[#252D3D] text-[11px] font-mono text-[#38D9FF]">
                  <Smartphone className="w-3 h-3" />
                  {app.platform}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#080B12] border border-[#252D3D] text-[11px] font-mono text-[#9AA4B5]">
                  <Tag className="w-3 h-3 text-[#8B7CFF]" />
                  {app.category}
                </span>
              </div>
              <h3 className="text-lg font-heading font-semibold text-[#F5F7FA] group-hover/title:text-[#38D9FF] transition-colors">
                {app.name}
              </h3>
            </div>
          </Link>
        </div>

        {/* Short Description */}
        <p className="text-sm text-[#9AA4B5] leading-relaxed mb-5">{app.description}</p>

        {/* Version & Release Date Metadata Strip */}
        <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-[#080B12]/70 border border-[#252D3D]/80 mb-6">
          <div>
            <span className="block text-[11px] font-mono uppercase tracking-wider text-[#9AA4B5]">
              Current Version
            </span>
            <span className="text-xs font-mono font-semibold text-[#F5F7FA] mt-0.5 inline-flex items-center gap-1.5">
              v{currentVersion}
              {primaryAsset?.formattedSize && (
                <span className="text-[#9AA4B5] font-normal">
                  · {primaryAsset.formattedSize}
                </span>
              )}
            </span>
          </div>
          <div>
            <span className="block text-[11px] font-mono uppercase tracking-wider text-[#9AA4B5]">
              Release Date
            </span>
            <span className="text-xs font-mono text-[#F5F7FA] mt-0.5 inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#8B7CFF]" />
              {releaseDate}
            </span>
          </div>
        </div>
      </div>

      {/* Actions Footer: Download APK & View Details */}
      <div className="pt-4 border-t border-[#252D3D] flex flex-wrap items-center justify-between gap-3">
        <DownloadButton
          asset={primaryAsset}
          label={app.platform === 'Android' ? 'Download APK' : 'Download'}
          size="md"
        />

        <Link
          to={`/apps/${app.slug}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-[#080B12] hover:bg-[#151C2E] border border-[#252D3D] hover:border-[#38D9FF]/40 text-sm font-medium text-[#F5F7FA] transition-colors"
        >
          <span>View Details</span>
          <ArrowUpRight className="w-4 h-4 text-[#38D9FF] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
};
