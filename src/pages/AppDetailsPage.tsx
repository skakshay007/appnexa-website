import React, { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  ShieldAlert,
  Smartphone,
  Calendar,
  HardDrive,
  Cpu,
  Tag,
  CheckCircle2,
  FlaskConical,
  History,
  Terminal,
  Copy,
  Check,
  RefreshCw,
  FileCode,
  AlertCircle
} from 'lucide-react';
import { getAppBySlug, getReleasesPageUrl, getRepositoryUrl } from '../config/apps';
import { useReleases } from '../context/ReleasesContext';
import { formatDate } from '../services/githubReleases';
import { SEOHead } from '../components/SEOHead';
import { AppIcon } from '../components/AppIcon';
import { DownloadButton } from '../components/DownloadButton';
import { AppScreenshotsGallery } from '../components/AppScreenshotsGallery';
import { ReleaseNotesRenderer } from '../components/ReleaseNotesRenderer';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';

export const AppDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const app = slug ? getAppBySlug(slug) : undefined;
  const { getAppReleaseData, isLoading, refreshAllReleases } = useReleases();

  const [selectedReleaseId, setSelectedReleaseId] = useState<number | null>(null);
  const [copiedSha, setCopiedSha] = useState(false);

  if (!app) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SEOHead
          title="Application Not Found — AppNexa"
          description="The requested application could not be found in the AppNexa directory."
        />
        <EmptyState
          title="Application Not Found"
          description="The application you are looking for does not exist or may have been moved."
        />
        <div className="text-center mt-6">
          <Link
            to="/apps"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#35D9F5] text-[#0B0F14] font-semibold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Applications</span>
          </Link>
        </div>
      </div>
    );
  }

  const releaseData = getAppReleaseData(app.id);
  const isApiConfirmed = Boolean(releaseData?.apiConfirmed);

  // Only expose releases confirmed by the GitHub REST API
  const availableReleases = useMemo(() => {
    if (isApiConfirmed && releaseData && releaseData.releases.length > 0) {
      return releaseData.releases;
    }
    return [];
  }, [isApiConfirmed, releaseData]);

  const selectedRelease = useMemo(() => {
    if (selectedReleaseId !== null) {
      const found = availableReleases.find((r) => r.id === selectedReleaseId);
      if (found) return found;
    }
    return (
      availableReleases.find((r) => !r.isPrerelease) ??
      availableReleases[0] ??
      null
    );
  }, [selectedReleaseId, availableReleases]);

  const primaryAsset = selectedRelease?.primaryAsset ?? null;
  const versionDisplay = selectedRelease ? `v${selectedRelease.version}` : 'Unconfirmed';
  const releaseDateDisplay = selectedRelease
    ? formatDate(selectedRelease.publishedAt)
    : 'Unavailable';
  const repositoryUrl = getRepositoryUrl(app);
  const releasesPageUrl = getReleasesPageUrl(app);

  const handleCopySha = async (sha: string) => {
    try {
      await navigator.clipboard.writeText(sha);
      setCopiedSha(true);
      setTimeout(() => setCopiedSha(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  };

  return (
    <>
      <SEOHead
        title={`${app.name}${selectedRelease ? ` (v${selectedRelease.version})` : ''} — AppNexa`}
        description={app.description}
        ogType="product"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        {/* Top Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/apps"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-[#A5B0C0] hover:text-[#35D9F5] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Application Directory</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#151D28] border border-white/10 text-[11px] font-mono text-[#A5B0C0]">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isLoading
                    ? 'bg-[#35D9F5] animate-pulse'
                    : isApiConfirmed && selectedRelease
                      ? 'bg-emerald-400'
                      : 'bg-[#8B7CFF]'
                }`}
              />
              <span>
                GitHub API:{' '}
                {isLoading
                  ? 'Checking...'
                  : isApiConfirmed
                    ? 'Confirmed'
                    : 'Unconfirmed'}
              </span>
            </span>

            <button
              type="button"
              onClick={() => void refreshAllReleases()}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#151D28] hover:bg-[#1c2635] border border-white/10 text-[11px] font-mono text-[#35D9F5] transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Error Notice if GitHub API could not be reached */}
        {releaseData?.errorMessage && (
          <ErrorState
            message={releaseData.errorMessage}
            onRetry={() => void refreshAllReleases()}
            externalUrl={releasesPageUrl}
          />
        )}

        {/* Primary Application Header Card */}
        {isLoading ? (
          <LoadingState variant="details" count={1} />
        ) : (
          <section className="rounded-2xl bg-[#151D28] border border-white/[0.08] p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 8 Columns: Icon, Title, Badges, Description */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                  <AppIcon icon={app.icon} name={app.name} size="xl" />
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#0B0F14] border border-white/10 text-xs font-mono text-[#35D9F5]">
                        <Smartphone className="w-3.5 h-3.5" />
                        {app.platform}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#0B0F14] border border-white/10 text-xs font-mono text-[#A5B0C0]">
                        <Tag className="w-3.5 h-3.5 text-[#8B7CFF]" />
                        {app.category}
                      </span>
                      {selectedRelease ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          v{selectedRelease.version}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#111821] border border-white/10 text-xs font-mono text-[#A5B0C0]">
                          <AlertCircle className="w-3.5 h-3.5 text-[#8B7CFF]" />
                          Release Unconfirmed
                        </span>
                      )}
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-heading font-bold text-[#F5F7FA]">
                      {app.name}
                    </h1>
                    <p className="text-sm sm:text-base text-[#A5B0C0]">{app.description}</p>
                  </div>
                </div>

                {/* Full Multi-Paragraph Description */}
                <div className="space-y-3 pt-5 border-t border-white/[0.08]">
                  <h2 className="text-xs font-mono uppercase tracking-wider text-[#35D9F5]">
                    Application Overview
                  </h2>
                  {app.fullDescription.map((paragraph, idx) => (
                    <p key={idx} className="text-sm sm:text-base text-[#A5B0C0] leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Technical Stack Pills */}
                {app.techStack && app.techStack.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    {app.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-[#0B0F14] border border-white/10 text-xs font-mono text-[#A5B0C0]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Right 4 Columns: Release Download & Repository Box */}
              <div className="lg:col-span-4 rounded-xl bg-[#111821] border border-white/[0.08] p-5 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <div>
                    <span className="block text-[11px] font-mono uppercase tracking-wider text-[#A5B0C0]">
                      Selected Release
                    </span>
                    <span className="text-base font-mono font-bold text-[#F5F7FA]">
                      {versionDisplay}
                    </span>
                  </div>
                  {selectedRelease ? (
                    selectedRelease.isPrerelease ? (
                      <span className="px-2 py-0.5 rounded bg-[#8B7CFF]/15 border border-[#8B7CFF]/40 text-[11px] font-mono text-[#8B7CFF]">
                        Prerelease
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-400">
                        Stable
                      </span>
                    )
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-[#151D28] border border-white/10 text-[11px] font-mono text-[#A5B0C0]">
                      Unavailable
                    </span>
                  )}
                </div>

                {/* Release Selector Dropdown when releases exist */}
                {availableReleases.length > 0 && (
                  <div>
                    <label
                      htmlFor="release-version-select"
                      className="block text-[11px] font-mono uppercase tracking-wider text-[#A5B0C0] mb-1.5"
                    >
                      Release Package Version
                    </label>
                    <select
                      id="release-version-select"
                      value={selectedRelease?.id ?? ''}
                      onChange={(e) => setSelectedReleaseId(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-[#0B0F14] border border-white/10 focus:border-[#35D9F5] focus:outline-none text-xs font-mono text-[#F5F7FA]"
                    >
                      {availableReleases.map((rel) => (
                        <option key={rel.id} value={rel.id}>
                          v{rel.version} ({rel.isPrerelease ? 'Prerelease' : 'Stable'}) —{' '}
                          {formatDate(rel.publishedAt)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Primary Download APK Button */}
                <DownloadButton
                  asset={primaryAsset}
                  label={app.platform === 'Android' ? 'Download APK' : 'Download Package'}
                  showSize
                  size="lg"
                  fullWidth
                />

                {/* Asset Filename & SHA-256 Digest */}
                {primaryAsset && (
                  <div className="p-3 rounded-lg bg-[#0B0F14] border border-white/[0.08] space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between text-[#A5B0C0]">
                      <span>Filename:</span>
                      <span className="text-[#F5F7FA]">{primaryAsset.name}</span>
                    </div>
                    <div className="flex items-center justify-between text-[#A5B0C0]">
                      <span>APK Size:</span>
                      <span className="text-[#F5F7FA]">
                        {primaryAsset.formattedSize} ({primaryAsset.sizeBytes.toLocaleString()} B)
                      </span>
                    </div>
                    {primaryAsset.sha256 && (
                      <div className="pt-2 border-t border-white/[0.08]">
                        <div className="flex items-center justify-between text-[11px] text-[#A5B0C0] mb-1">
                          <span>SHA-256 Checksum:</span>
                          <button
                            type="button"
                            onClick={() => void handleCopySha(primaryAsset.sha256!)}
                            className="inline-flex items-center gap-1 text-[#35D9F5] hover:underline"
                          >
                            {copiedSha ? (
                              <>
                                <Check className="w-3 h-3" /> Copied
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" /> Copy
                              </>
                            )}
                          </button>
                        </div>
                        <p className="text-[10px] text-[#A5B0C0] break-all bg-[#151D28] p-1.5 rounded border border-white/10">
                          {primaryAsset.sha256}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Link to Application's GitHub Repository */}
                <div className="space-y-2 pt-1">
                  <a
                    href={repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#151D28] hover:bg-[#1c2635] border border-white/10 hover:border-[#35D9F5]/50 text-xs sm:text-sm font-medium text-[#F5F7FA] transition-colors"
                  >
                    <FileCode className="w-4 h-4 text-[#35D9F5]" />
                    <span>GitHub Repository</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#A5B0C0]" />
                  </a>

                  <a
                    href={releasesPageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-mono text-[#A5B0C0] hover:text-[#35D9F5] transition-colors"
                  >
                    <span>View Releases on GitHub</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Technical Specifications Strip */}
            <div className="mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="p-3.5 rounded-xl bg-[#111821] border border-white/[0.08]">
                <span className="flex items-center gap-1.5 text-[11px] font-mono uppercase text-[#A5B0C0]">
                  <Tag className="w-3.5 h-3.5 text-[#35D9F5]" />
                  Version
                </span>
                <p className="text-sm font-mono font-semibold text-[#F5F7FA] mt-1">
                  {versionDisplay}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#111821] border border-white/[0.08]">
                <span className="flex items-center gap-1.5 text-[11px] font-mono uppercase text-[#A5B0C0]">
                  <Calendar className="w-3.5 h-3.5 text-[#8B7CFF]" />
                  Release Date
                </span>
                <p className="text-sm font-mono font-semibold text-[#F5F7FA] mt-1">
                  {releaseDateDisplay}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#111821] border border-white/[0.08]">
                <span className="flex items-center gap-1.5 text-[11px] font-mono uppercase text-[#A5B0C0]">
                  <HardDrive className="w-3.5 h-3.5 text-[#35D9F5]" />
                  APK File Size
                </span>
                <p className="text-sm font-mono font-semibold text-[#F5F7FA] mt-1">
                  {primaryAsset?.formattedSize || 'Unavailable'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#111821] border border-white/[0.08]">
                <span className="flex items-center gap-1.5 text-[11px] font-mono uppercase text-[#A5B0C0]">
                  <Smartphone className="w-3.5 h-3.5 text-[#8B7CFF]" />
                  Supported Platform
                </span>
                <p className="text-sm font-mono font-semibold text-[#F5F7FA] mt-1">
                  {app.platform}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#111821] border border-white/[0.08] col-span-2 sm:col-span-1">
                <span className="flex items-center gap-1.5 text-[11px] font-mono uppercase text-[#A5B0C0]">
                  <Cpu className="w-3.5 h-3.5 text-[#35D9F5]" />
                  Min Android Version
                </span>
                <p className="text-xs font-mono font-semibold text-[#F5F7FA] mt-1 leading-snug">
                  {app.minAndroidVersion || 'Android 8.0+'}
                </p>
              </div>
            </div>

            {/* Required Visible Security Note */}
            <div
              role="note"
              aria-label="Security Notice"
              className="mt-6 p-4 rounded-xl bg-[#0B0F14] border border-[#35D9F5]/35 flex items-start gap-3.5"
            >
              <ShieldAlert className="w-5 h-5 text-[#35D9F5] shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-[#F5F7FA] leading-relaxed">
                <strong className="font-semibold text-[#35D9F5] mr-1.5">Security Note:</strong>
                Only download applications from sources you trust. Android may display a security
                warning when installing APK files from outside Google Play.
              </div>
            </div>
          </section>
        )}

        {/* Screenshots Gallery Section */}
        <section aria-labelledby="screenshots-heading" className="space-y-5">
          <div>
            <h2
              id="screenshots-heading"
              className="text-xl sm:text-2xl font-heading font-bold text-[#F5F7FA]"
            >
              Interface &amp; Screenshots Gallery
            </h2>
            <p className="text-sm text-[#A5B0C0] mt-1">
              Click any screen preview to inspect the application interface in detail.
            </p>
          </div>
          <AppScreenshotsGallery appName={app.name} screenshots={app.screenshots} />
        </section>

        {/* Features List & Installation Instructions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <section
            aria-labelledby="features-heading"
            className="lg:col-span-7 rounded-2xl bg-[#151D28] border border-white/[0.08] p-6 sm:p-8 space-y-6"
          >
            <div>
              <h2
                id="features-heading"
                className="text-xl sm:text-2xl font-heading font-bold text-[#F5F7FA]"
              >
                Key Features
              </h2>
              <p className="text-sm text-[#A5B0C0] mt-1">
                Core capabilities built into {app.name}.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {app.features.map((feature, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-[#111821] border border-white/[0.08] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-[#35D9F5] shrink-0" />
                      {feature.tag && (
                        <span className="px-2 py-0.5 rounded bg-[#0B0F14] border border-white/10 text-[10px] font-mono text-[#8B7CFF]">
                          {feature.tag}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-heading font-semibold text-[#F5F7FA] mb-1.5">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-[#A5B0C0] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section
            aria-labelledby="installation-heading"
            className="lg:col-span-5 rounded-2xl bg-[#151D28] border border-white/[0.08] p-6 sm:p-8 space-y-6"
          >
            <div>
              <h2
                id="installation-heading"
                className="text-xl sm:text-2xl font-heading font-bold text-[#F5F7FA] flex items-center gap-2"
              >
                <Terminal className="w-5 h-5 text-[#35D9F5]" />
                <span>Installation Instructions</span>
              </h2>
              <p className="text-sm text-[#A5B0C0] mt-1">
                Follow these steps to install and configure {app.name} on your Android device.
              </p>
            </div>

            <ol className="space-y-4">
              {app.installationInstructions.map((step) => (
                <li
                  key={step.stepNumber}
                  className="p-4 rounded-xl bg-[#111821] border border-white/[0.08] space-y-2"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-md bg-[#35D9F5]/15 border border-[#35D9F5]/40 flex items-center justify-center font-mono text-xs font-bold text-[#35D9F5] shrink-0">
                      {step.stepNumber}
                    </span>
                    <h3 className="text-sm font-heading font-semibold text-[#F5F7FA]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#A5B0C0] leading-relaxed pl-8">
                    {step.description}
                  </p>
                  {step.commandOrNote && (
                    <div className="ml-8 p-2.5 rounded-lg bg-[#0B0F14] border border-white/10 font-mono text-[11px] text-[#35D9F5]">
                      {step.commandOrNote}
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* Version History & Changelog Section */}
        <section
          id="version-history"
          aria-labelledby="version-history-heading"
          className="rounded-2xl bg-[#151D28] border border-white/[0.08] p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
            <div>
              <h2
                id="version-history-heading"
                className="text-xl sm:text-2xl font-heading font-bold text-[#F5F7FA] flex items-center gap-2.5"
              >
                <History className="w-5 h-5 text-[#8B7CFF]" />
                <span>Version History &amp; Changelog</span>
              </h2>
              <p className="text-sm text-[#A5B0C0] mt-1">
                All published releases retrieved from{' '}
                <code className="font-mono text-xs text-[#35D9F5]">
                  {app.repositoryOwner}/{app.repositoryName}
                </code>
              </p>
            </div>

            <a
              href={releasesPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#111821] hover:bg-[#0B0F14] border border-white/10 text-xs font-mono text-[#F5F7FA] transition-colors self-start sm:self-auto"
            >
              <span>View on GitHub Releases</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#35D9F5]" />
            </a>
          </div>

          {availableReleases.length === 0 ? (
            <EmptyState
              title="No confirmed GitHub release history"
              description="Release history could not be confirmed from the GitHub API right now. Click Retry Sync or view the repository releases directly on GitHub."
              actionLabel="Retry Sync"
              onAction={() => void refreshAllReleases()}
            />
          ) : (
            <div className="space-y-6">
              {availableReleases.map((rel) => {
                const relAsset = rel.primaryAsset;
                const isSelected = selectedRelease?.id === rel.id;
                return (
                  <div
                    key={rel.id}
                    className={`rounded-xl bg-[#111821] border p-5 sm:p-6 transition-colors ${
                      isSelected ? 'border-[#35D9F5]/50' : 'border-white/[0.08]'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="text-base sm:text-lg font-heading font-semibold text-[#F5F7FA]">
                            {rel.name}
                          </h3>
                          <span className="px-2 py-0.5 rounded bg-[#0B0F14] border border-white/10 font-mono text-xs text-[#35D9F5]">
                            Tag: {rel.tagName}
                          </span>
                          {rel.isPrerelease ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#8B7CFF]/15 border border-[#8B7CFF]/40 font-mono text-[11px] text-[#8B7CFF]">
                              <FlaskConical className="w-3 h-3" />
                              Prerelease
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 font-mono text-[11px] text-emerald-400">
                              <CheckCircle2 className="w-3 h-3" />
                              Stable
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-mono text-[#A5B0C0]">
                          Published on {formatDate(rel.publishedAt)}
                          {relAsset && (
                            <>
                              {' '}
                              · Asset: <span className="text-[#F5F7FA]">{relAsset.name}</span> (
                              {relAsset.formattedSize})
                            </>
                          )}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <DownloadButton
                          asset={relAsset}
                          label={`Download v${rel.version} APK`}
                          showSize
                          size="sm"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <ReleaseNotesRenderer markdown={rel.body} />
                    </div>

                    {rel.assets.length > 0 && (
                      <div className="mt-5 pt-4 border-t border-white/[0.08]">
                        <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#A5B0C0] mb-2.5">
                          Release Assets ({rel.assets.length})
                        </h4>
                        <div className="space-y-2">
                          {rel.assets.map((asset) => (
                            <div
                              key={asset.id}
                              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-[#0B0F14] border border-white/[0.08] text-xs font-mono"
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="px-1.5 py-0.5 rounded bg-[#151D28] border border-white/10 text-[#35D9F5]">
                                  {asset.fileType}
                                </span>
                                <span className="text-[#F5F7FA] font-medium">{asset.name}</span>
                                <span className="text-[#A5B0C0]">({asset.formattedSize})</span>
                              </div>

                              <a
                                href={asset.browserDownloadUrl}
                                download={asset.name}
                                rel="noopener noreferrer"
                                className="text-[#35D9F5] hover:underline"
                              >
                                Direct Asset URL →
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </>
  );
};
