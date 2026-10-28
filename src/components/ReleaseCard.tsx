import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  FileArchive,
  ExternalLink,
  CheckCircle2,
  FlaskConical,
  History
} from 'lucide-react';
import { AppConfig, NormalizedRelease } from '../types/app';
import { getReleasesPageUrl } from '../config/apps';
import { formatDate } from '../services/githubReleases';
import { AppIcon } from './AppIcon';
import { DownloadButton } from './DownloadButton';
import { ReleaseNotesRenderer } from './ReleaseNotesRenderer';

interface ReleaseCardProps {
  app: AppConfig;
  release: NormalizedRelease;
  compact?: boolean;
}

/**
 * Reusable ReleaseCard component (Requirement 4).
 * Displays actual version, release date, changelog, and APK download link when available.
 */
export const ReleaseCard: React.FC<ReleaseCardProps> = ({
  app,
  release,
  compact = false
}) => {
  const primaryAsset = release.primaryAsset;
  const fileType = primaryAsset?.fileType || (app.platform === 'Android' ? 'APK' : 'BINARY');
  const fileSize = primaryAsset?.formattedSize || null;
  const githubReleasesUrl = release.htmlUrl || getReleasesPageUrl(app);

  return (
    <article className="rounded-2xl bg-[#151D28] border border-white/[0.08] hover:border-[#35D9F5]/35 cyan-glow-hover p-6 sm:p-7">
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
        <div className="flex items-start sm:items-center gap-4">
          <Link to={`/apps/${app.slug}`} className="shrink-0">
            <AppIcon icon={app.icon} name={app.name} size="md" />
          </Link>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <Link
                to={`/apps/${app.slug}`}
                className="text-base sm:text-lg font-heading font-bold text-[#F5F7FA] hover:text-[#35D9F5] transition-colors"
              >
                {app.name}
              </Link>

              <span className="px-2.5 py-0.5 rounded-md bg-[#0B0F14] border border-white/10 font-mono text-xs font-semibold text-[#35D9F5]">
                v{release.version}
              </span>

              {release.isPrerelease ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#8B7CFF]/15 border border-[#8B7CFF]/40 font-mono text-[11px] font-medium text-[#8B7CFF]">
                  <FlaskConical className="w-3 h-3" />
                  Prerelease
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 font-mono text-[11px] font-medium text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" />
                  Stable Release
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-[#A5B0C0]">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#8B7CFF]" />
                Published {formatDate(release.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FileArchive className="w-3.5 h-3.5 text-[#35D9F5]" />
                Type: <strong className="text-[#F5F7FA] font-medium">{fileType}</strong>
              </span>
              {fileSize && (
                <span>
                  Size: <strong className="text-[#F5F7FA] font-medium">{fileSize}</strong>
                </span>
              )}
              {primaryAsset?.name && (
                <span className="text-[#A5B0C0]">
                  Asset: <code className="text-[#F5F7FA]">{primaryAsset.name}</code>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="flex items-center gap-3 shrink-0">
          <DownloadButton
            asset={primaryAsset}
            label={fileType === 'APK' ? 'Download APK' : `Download ${fileType}`}
            showSize={Boolean(fileSize)}
            size="md"
          />
        </div>
      </div>

      {/* Changelog / Release Notes */}
      <div className="py-5">
        <div className="text-xs font-mono uppercase tracking-wider text-[#A5B0C0] mb-2.5">
          Changelog — {release.name}
        </div>
        <div className="p-4 sm:p-5 rounded-xl bg-[#111821] border border-white/[0.07]">
          <ReleaseNotesRenderer markdown={release.body} compact={compact} />
        </div>
      </div>

      {/* Footer Links */}
      <div className="pt-3 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs">
        <Link
          to={`/apps/${app.slug}#version-history`}
          className="inline-flex items-center gap-1.5 font-medium text-[#35D9F5] hover:text-[#5ce3fa] transition-colors"
        >
          <History className="w-3.5 h-3.5" />
          <span>View all releases for {app.name}</span>
        </Link>

        <a
          href={githubReleasesUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-[#A5B0C0] hover:text-[#F5F7FA] transition-colors"
        >
          <span>GitHub Release ({release.tagName})</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </article>
  );
};
