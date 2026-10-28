import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Smartphone,
  ShieldCheck,
  Clock,
  PauseCircle,
  Volume2,
  CheckCircle2,
  ArrowUpRight,
  GitCommit
} from 'lucide-react';
import { APPLICATIONS } from '../config/apps';
import { useReleases } from '../context/ReleasesContext';

const PRESET_OPTIONS = [
  { label: '15m', timeDisplay: '14:59', progress: 0.78 },
  { label: '30m', timeDisplay: '29:59', progress: 0.65 },
  { label: '45m', timeDisplay: '44:59', progress: 0.52 },
  { label: 'End of Track', timeDisplay: '03:18', progress: 0.86 }
];

/**
 * Original CSS & SVG-engineered application ecosystem visual for the right side of the Hero section (Section 4).
 * Presents a floating collection of minimal application windows and live release telemetry without stock photos.
 */
export const HeroEcosystemVisual: React.FC = () => {
  const [selectedPresetIdx, setSelectedPresetIdx] = useState(1);
  const { getAppReleaseData } = useReleases();
  const primaryApp = APPLICATIONS[0];
  const releaseData = getAppReleaseData(primaryApp.id);
  const latestRelease =
    releaseData?.latestStableRelease ??
    releaseData?.latestRelease ??
    primaryApp.fallbackReleases[0];

  const activePreset = PRESET_OPTIONS[selectedPresetIdx];
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - activePreset.progress);

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none select-none">
      {/* Subtle architectural background coordinate grid frame */}
      <div
        aria-hidden="true"
        className="absolute -inset-3 rounded-2xl bg-nexa-grid border border-[#252D3D]/60 pointer-events-none"
      />

      <div className="relative space-y-3.5 p-2 sm:p-4">
        {/* Top System Bar Window: Platform Ecosystem Telemetry */}
        <div className="rounded-xl bg-[#101522] border border-[#252D3D] px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#38D9FF]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B7CFF]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#252D3D]" />
            </div>
            <span className="text-[11px] font-mono text-[#9AA4B5] pl-1 border-l border-[#252D3D]">
              appnexa://workspace/android-runtime
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#080B12] border border-[#252D3D] text-[10px] font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            RELEASE PIPELINE READY
          </span>
        </div>

        {/* Main Application Window: Universal Music Sleep Timer Interactive Preview */}
        <div className="rounded-xl bg-[#101522] border border-[#252D3D] overflow-hidden shadow-2xl shadow-black/40">
          {/* Window Title Bar */}
          <div className="px-4 py-2.5 bg-[#080B12] border-b border-[#252D3D] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="w-3.5 h-3.5 text-[#38D9FF]" />
              <span className="text-xs font-heading font-semibold text-[#F5F7FA]">
                Universal Music Sleep Timer
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#38D9FF]">
              v{latestRelease?.version || primaryApp.defaultVersion} · Android APK
            </span>
          </div>

          {/* Window Content Body */}
          <div className="p-5 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
            {/* Left: Interactive Circular Countdown Ring */}
            <div className="sm:col-span-5 flex flex-col items-center justify-center p-3 rounded-xl bg-[#080B12] border border-[#252D3D]">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    stroke="#101522"
                    strokeWidth="7"
                    fill="none"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    stroke="#38D9FF"
                    strokeWidth="7"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-300"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#9AA4B5]">
                    Remaining
                  </span>
                  <span className="text-xl font-mono font-bold text-[#F5F7FA] tracking-tight mt-0.5">
                    {activePreset.timeDisplay}
                  </span>
                  <span className="text-[10px] font-mono text-[#38D9FF] mt-0.5">
                    {activePreset.label}
                  </span>
                </div>
              </div>

              <div className="mt-2.5 flex items-center gap-2 text-[11px] font-mono text-[#9AA4B5]">
                <Clock className="w-3 h-3 text-[#8B7CFF]" />
                <span>Auto-Pause Active</span>
              </div>
            </div>

            {/* Right: Interactive Preset Selector & MediaSession Inspector */}
            <div className="sm:col-span-7 space-y-3.5">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#9AA4B5] mb-1.5">
                  <span>TIMER PRESET SELECTOR</span>
                  <span className="text-[#38D9FF]">Interactive</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {PRESET_OPTIONS.map((preset, idx) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setSelectedPresetIdx(idx)}
                      className={`px-2.5 py-1.5 rounded-lg font-mono text-xs border text-left transition-colors ${
                        selectedPresetIdx === idx
                          ? 'bg-[#38D9FF]/15 border-[#38D9FF] text-[#F5F7FA]'
                          : 'bg-[#080B12] border-[#252D3D] text-[#9AA4B5] hover:text-[#F5F7FA] hover:border-[#252D3D]/90'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active MediaSession Target Card */}
              <div className="p-3 rounded-lg bg-[#080B12] border border-[#252D3D] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1.5 font-medium text-[#F5F7FA]">
                    <PauseCircle className="w-3.5 h-3.5 text-[#38D9FF]" />
                    MediaSession Target
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#101522] border border-[#252D3D] text-[#8B7CFF]">
                    Connected
                  </span>
                </div>
                <p className="text-[11px] font-mono text-[#9AA4B5]">
                  Spotify · YouTube Music · System Audio
                </p>
                <div className="flex items-center justify-between pt-1.5 border-t border-[#252D3D]/70 text-[11px] font-mono text-[#9AA4B5]">
                  <span className="inline-flex items-center gap-1">
                    <Volume2 className="w-3 h-3 text-[#38D9FF]" />
                    Smooth Volume Fade-Out
                  </span>
                  <span className="text-[#F5F7FA]">Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Floating Release Verification Bar */}
        <div className="rounded-xl bg-[#101522] border border-[#252D3D] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#080B12] border border-[#252D3D] flex items-center justify-center text-[#38D9FF] shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-heading font-semibold text-[#F5F7FA]">
                  GitHub Release Binary
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified
                </span>
              </div>
              <p className="text-[11px] font-mono text-[#9AA4B5] flex items-center gap-1.5 mt-0.5">
                <GitCommit className="w-3 h-3 text-[#8B7CFF]" />
                <span>
                  {latestRelease?.primaryAsset?.name || 'app-debug.apk'} ·{' '}
                  {latestRelease?.primaryAsset?.formattedSize || '15.69 MB'}
                </span>
              </p>
            </div>
          </div>

          <Link
            to={`/apps/${primaryApp.slug}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#080B12] hover:bg-[#151C2E] border border-[#252D3D] hover:border-[#38D9FF]/50 text-xs font-mono text-[#38D9FF] transition-colors self-start sm:self-auto"
          >
            <span>Inspect App</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
