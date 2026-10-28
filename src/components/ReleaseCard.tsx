import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FileArchive, ExternalLink, CheckCircle2, FlaskConical, History } from 'lucide-react';
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
 * Reusable ReleaseCard component (Section 9 & 15).
 * Displays application name, application icon, version, publication date,
 * release notes, file type, file size, download button, stable vs prerelease badge,
 * and a link to view all releases for the application.
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
    <article className="rounded-xl bg-[#101522] border border-[#252D3D] hover:border-[#252D3D]/90 transition-colors p-6">
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#252D3D]">
        <div className="flex items-start sm:items-center gap-4">
          <Link to={`/apps/${app.slug}`} className="shrink-0">
            <AppIcon icon={app.icon} name={app.name} size="md" />
          </Link>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <Link
                to={`/apps/${app.slug}`}
                className="text-base sm:text-lg font-heading font-semibold text-[#F5F7FA] hover:text-[#38D9FF] transition-colors"
              >
                {app.name}
              </Link>

              {/* Version Pill */}
              <span className="px-2 py-0.5 rounded bg-[#080B12] border border-[#252D3D] font-mono text-xs font-semibold text-[#38D9FF]">
                v{release.version}
              </span>

              {/* Clear Distinction Between Stable Releases and Prereleases */}
              {release.isPrerelease ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#8B7CFF]/15 border border-[#8B7CFF]/40 font-mono text-[11px] font-medium text-[#8B7CFF]">
                  <FlaskConical className="w-3 h-3" />
                  Prerelease
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 font-mono text-[11px] font-medium text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" />
                  Stable Release
                </span>
              )}
            </div>

            {/* Metadata Sub-row: Publication Date, File Type, File Size */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-[#9AA4B5]">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#8B7CFF]" />
                Published {formatDate(release.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FileArchive className="w-3.5 h-3.5 text-[#38D9FF]" />
                Type: <strong className="text-[#F5F7FA] font-medium">{fileType}</strong>
              </span>
              {fileSize && (
                <span>
                  Size: <strong className="text-[#F5F7FA] font-medium">{fileSize}</strong>
                </span>
              )}
              {primaryAsset?.name && (
                <span className="text-[#9AA4B5]">
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

      {/* Release Notes Body */}
      <div className="py-4">
        <div className="text-xs font-mono uppercase tracking-wider text-[#9AA4B5] mb-2">
          Release Notes — {release.name}
        </div>
        <div className="p-4 rounded-lg bg-[#080B12]/70 border border-[#252D3D]/80">
          <ReleaseNotesRenderer markdown={release.body} compact={compact} />
        </div>
      </div>

      {/* Footer Links: View All Releases for Application & GitHub Release Tag */}
      <div className="pt-3 border-t border-[#252D3D]/70 flex flex-wrap items-center justify-between gap-3 text-xs">
        <Link
          to={`/apps/${app.slug}#version-history`}
          className="inline-flex items-center gap-1.5 font-medium text-[#38D9FF] hover:text-[#5ce1ff] transition-colors"
        >
          <History className="w-3.5 h-3.5" />
          <span>View all releases for {app.name}</span>
        </Link>

        <a
          href={githubReleasesUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-[#9AA4B5] hover:text-[#F5F7FA] transition-colors"
        >
          <span>GitHub Tag ({release.tagName})</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </article>
  );
};
