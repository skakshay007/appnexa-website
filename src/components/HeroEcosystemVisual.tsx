import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Smartphone,
  Clock,
  PauseCircle,
  Volume2,
  CheckCircle2,
  ArrowUpRight,
  GitBranch,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { APPLICATIONS } from '../config/apps';
import { useReleases } from '../context/ReleasesContext';
import { formatDate } from '../services/githubReleases';
import { AppIcon } from './AppIcon';
import { DownloadButton } from './DownloadButton';

const PRESET_OPTIONS = [
  { label: '15m', timeDisplay: '14:59', progress: 0.78 },
  { label: '30m', timeDisplay: '29:59', progress: 0.65 },
  { label: '45m', timeDisplay: '44:59', progress: 0.52 },
  { label: 'End of Track', timeDisplay: '03:18', progress: 0.86 }
];

/**
 * Developer-platform Hero Interface Preview (Requirement 2).
 * Features Universal Music Sleep Timer with a product preview card, version information,
 * Android badge, live GitHub release status, and download action.
 * Never falsely indicates that a release is verified or available if the GitHub API does not confirm it.
 */
export const HeroEcosystemVisual: React.FC = () => {
  const [selectedPresetIdx, setSelectedPresetIdx] = useState(1);
  const { getAppReleaseData, isLoading } = useReleases();
  const primaryApp = APPLICATIONS[0];
  const releaseData = getAppReleaseData(primaryApp.id);

  const isApiConfirmed = Boolean(releaseData?.apiConfirmed);
  const confirmedRelease = isApiConfirmed
    ? releaseData?.latestStableRelease ?? releaseData?.latestRelease ?? null
    : null;
  const confirmedAsset = confirmedRelease?.primaryAsset ?? null;

  const activePreset = PRESET_OPTIONS[selectedPresetIdx];
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - activePreset.progress);

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none select-none">
      {/* Subtle architectural grid & ambient glow behind the preview card */}
      <div
        aria-hidden="true"
        className="absolute -inset-3 rounded-2xl bg-nexa-grid border border-white/[0.06] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -top-8 -right-8 w-56 h-56 bg-[#35D9F5]/10 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-8 -left-8 w-56 h-56 bg-[#8B7CFF]/10 rounded-full blur-3xl pointer-events-none"
      />

      {/* Outer Developer-Platform Window Container */}
      <div className="relative rounded-2xl bg-[#111821] border border-white/10 shadow-2xl shadow-black/50 overflow-hidden">
        {/* Top Platform Header Bar */}
        <div className="px-5 py-3.5 bg-[#0B0F14]/90 border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#35D9F5]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B7CFF]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            </div>
            <span className="text-[11px] font-mono text-[#A5B0C0] pl-2 border-l border-white/10">
              appnexa / catalog / {primaryApp.slug}
            </span>
          </div>

          {/* Honest Live GitHub Release Status Badge */}
          {isLoading ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#151D28] border border-white/10 text-[11px] font-mono text-[#A5B0C0]">
              <Loader2 className="w-3 h-3 text-[#35D9F5] animate-spin" />
              <span>Checking GitHub API...</span>
            </span>
          ) : confirmedRelease ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-400">
              <CheckCircle2 className="w-3 h-3" />
              <span>GitHub Release Available</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#151D28] border border-white/10 text-[11px] font-mono text-[#A5B0C0]">
              <AlertCircle className="w-3 h-3 text-[#8B7CFF]" />
              <span>Release Unconfirmed</span>
            </span>
          )}
        </div>

        {/* Main Product Preview Card */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* App Identity Header */}
          <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-[#151D28] border border-white/[0.08]">
            <div className="flex items-center gap-3.5">
              <AppIcon icon={primaryApp.icon} name={primaryApp.name} size="md" />
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#0B0F14] border border-white/10 text-[11px] font-mono text-[#35D9F5]">
                    <Smartphone className="w-3 h-3" />
                    {primaryApp.platform}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#0B0F14] border border-white/10 text-[11px] font-mono text-[#A5B0C0]">
                    {primaryApp.category}
                  </span>
                  {confirmedRelease && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#35D9F5]/10 border border-[#35D9F5]/30 text-[11px] font-mono font-semibold text-[#35D9F5]">
                      v{confirmedRelease.version}
                    </span>
                  )}
                </div>

                <h2 className="text-base sm:text-lg font-heading font-bold text-[#F5F7FA]">
                  {primaryApp.name}
                </h2>
                <p className="text-xs text-[#A5B0C0] mt-0.5 line-clamp-1">
                  {primaryApp.description}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Interface Preview Panel */}
          <div className="rounded-xl bg-[#151D28] border border-white/[0.08] p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
            {/* Left: Interactive Countdown Ring */}
            <div className="sm:col-span-5 flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#0B0F14] border border-white/[0.07]">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 112 112">
                  <circle
                    cx="56"
                    cy="56"
                    r={radius}
                    stroke="#151D28"
                    strokeWidth="6.5"
                    fill="none"
                  />
                  <circle
                    cx="56"
                    cy="56"
                    r={radius}
                    stroke="#35D9F5"
                    strokeWidth="6.5"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-300"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#A5B0C0]">
                    Countdown
                  </span>
                  <span className="text-lg font-mono font-bold text-[#F5F7FA] tracking-tight mt-0.5">
                    {activePreset.timeDisplay}
                  </span>
                  <span className="text-[10px] font-mono text-[#35D9F5]">
                    {activePreset.label}
                  </span>
                </div>
              </div>

              <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-mono text-[#A5B0C0]">
                <Clock className="w-3 h-3 text-[#8B7CFF]" />
                <span>Sleep Timer Preview</span>
              </div>
            </div>

            {/* Right: Preset Controls & MediaSession Telemetry */}
            <div className="sm:col-span-7 space-y-3">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#A5B0C0] mb-1.5">
                  <span>PRESET DURATION</span>
                  <span className="text-[#35D9F5]">Interactive</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {PRESET_OPTIONS.map((preset, idx) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setSelectedPresetIdx(idx)}
                      className={`px-2.5 py-1.5 rounded-lg font-mono text-xs border text-left transition-colors ${
                        selectedPresetIdx === idx
                          ? 'bg-[#35D9F5]/15 border-[#35D9F5] text-[#F5F7FA]'
                          : 'bg-[#0B0F14] border-white/[0.07] text-[#A5B0C0] hover:text-[#F5F7FA] hover:border-white/20'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#0B0F14] border border-white/[0.07] space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1.5 font-medium text-[#F5F7FA]">
                    <PauseCircle className="w-3.5 h-3.5 text-[#35D9F5]" />
                    MediaSession Control
                  </span>
                  <span className="text-[10px] font-mono text-[#8B7CFF]">Android API</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#A5B0C0]">
                  <span className="inline-flex items-center gap-1">
                    <Volume2 className="w-3 h-3 text-[#35D9F5]" />
                    Spotify · YouTube Music
                  </span>
                  <span>Auto-Pause</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Release Metadata & Download Action Bar */}
          <div className="p-4 rounded-xl bg-[#151D28] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-[#A5B0C0]">
                <GitBranch className="w-3.5 h-3.5 text-[#8B7CFF] shrink-0" />
                {isLoading ? (
                  <span>Fetching release metadata from GitHub...</span>
                ) : confirmedRelease ? (
                  <span>
                    Release <strong className="text-[#F5F7FA]">v{confirmedRelease.version}</strong> ·{' '}
                    {formatDate(confirmedRelease.publishedAt)}
                    {confirmedAsset?.formattedSize ? ` · ${confirmedAsset.formattedSize}` : ''}
                  </span>
                ) : (
                  <span>GitHub release metadata currently unavailable</span>
                )}
              </div>
              <p className="text-[11px] font-mono text-[#A5B0C0]/80">
                Source: {primaryApp.repositoryOwner}/{primaryApp.repositoryName}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <DownloadButton
                asset={confirmedAsset}
                label="Download APK"
                size="sm"
              />
              <Link
                to={`/apps/${primaryApp.slug}`}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-[#0B0F14] hover:bg-[#111821] border border-white/10 hover:border-[#35D9F5]/40 text-xs font-medium text-[#F5F7FA] transition-colors"
              >
                <span>Details</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#35D9F5]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
