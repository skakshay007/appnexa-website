import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Calendar, Smartphone, Tag, CheckCircle2 } from 'lucide-react';
import { AppConfig } from '../types/app';
import { useReleases } from '../context/ReleasesContext';
import { formatDate } from '../services/githubReleases';
import { AppIcon } from './AppIcon';
import { DownloadButton } from './DownloadButton';

interface ApplicationCardProps {
  app: AppConfig;
}

/**
 * Reusable Application Card component (Requirement 3).
 * Displays actual app icon or fallback icon, application name, short description,
 * category and platform badges, latest version when confirmed by GitHub API,
 * and View Details + Download actions.
 */
export const ApplicationCard: React.FC<ApplicationCardProps> = ({ app }) => {
  const { getAppReleaseData, isLoading } = useReleases();
  const releaseData = getAppReleaseData(app.id);

  const isConfirmed = Boolean(releaseData?.apiConfirmed);
  const confirmedRelease = isConfirmed
    ? releaseData?.latestStableRelease ?? releaseData?.latestRelease ?? null
    : null;
  const primaryAsset = confirmedRelease?.primaryAsset ?? null;

  return (
    <article className="group relative flex flex-col justify-between rounded-2xl bg-[#151D28] border border-white/[0.08] hover:border-[#35D9F5]/45 cyan-glow-hover p-6 sm:p-7 h-full">
      {/* Subtle top gradient line on hover */}
      <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#35D9F5]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

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
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#0B0F14] border border-white/10 text-[11px] font-mono text-[#35D9F5]">
                  <Smartphone className="w-3 h-3" />
                  {app.platform}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#0B0F14] border border-white/10 text-[11px] font-mono text-[#A5B0C0]">
                  <Tag className="w-3 h-3 text-[#8B7CFF]" />
                  {app.category}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-heading font-bold text-[#F5F7FA] group-hover/title:text-[#35D9F5] transition-colors">
                {app.name}
              </h3>
            </div>
          </Link>
        </div>

        {/* Short Description */}
        <p className="text-sm text-[#A5B0C0] leading-relaxed mb-6">{app.description}</p>

        {/* Version & Release Date Metadata Strip (reflective of real GitHub API state) */}
        <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#111821] border border-white/[0.07] mb-6">
          <div>
            <span className="block text-[11px] font-mono uppercase tracking-wider text-[#A5B0C0]">
              Latest Version
            </span>
            <span className="text-xs font-mono font-semibold text-[#F5F7FA] mt-1 inline-flex items-center gap-1.5">
              {isLoading ? (
                <span className="text-[#A5B0C0]">Checking API...</span>
              ) : confirmedRelease ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>v{confirmedRelease.version}</span>
                  {primaryAsset?.formattedSize && (
                    <span className="text-[#A5B0C0] font-normal">
                      · {primaryAsset.formattedSize}
                    </span>
                  )}
                </>
              ) : (
                <span className="text-[#A5B0C0]">Unconfirmed</span>
              )}
            </span>
          </div>
          <div>
            <span className="block text-[11px] font-mono uppercase tracking-wider text-[#A5B0C0]">
              Release Date
            </span>
            <span className="text-xs font-mono text-[#F5F7FA] mt-1 inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#8B7CFF] shrink-0" />
              {isLoading
                ? 'Loading...'
                : confirmedRelease
                  ? formatDate(confirmedRelease.publishedAt)
                  : 'Unavailable'}
            </span>
          </div>
        </div>
      </div>

      {/* Actions Footer: Download & View Details */}
      <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
        <DownloadButton
          asset={primaryAsset}
          label={app.platform === 'Android' ? 'Download APK' : 'Download'}
          size="md"
        />

        <Link
          to={`/apps/${app.slug}`}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#111821] hover:bg-[#0B0F14] border border-white/10 hover:border-[#35D9F5]/45 text-sm font-medium text-[#F5F7FA] transition-colors"
        >
          <span>View Details</span>
          <ArrowUpRight className="w-4 h-4 text-[#35D9F5] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
};
