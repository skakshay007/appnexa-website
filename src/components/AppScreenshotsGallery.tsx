import React, { useState } from 'react';
import {
  Maximize2,
  X,
  Clock,
  Pause,
  Plus,
  CheckCircle2,
  Bell,
  Sliders,
  Volume2,
  Music
} from 'lucide-react';
import { AppScreenshot } from '../types/app';

interface AppScreenshotsGalleryProps {
  appName: string;
  screenshots: AppScreenshot[];
}

/**
 * Renders authentic Android interface screen previews for the Application Details page
 * with an interactive lightbox viewer.
 */
function ScreenGraphic({ screenType }: { screenType: AppScreenshot['screenType'] }) {
  if (screenType === 'countdown') {
    return (
      <div className="w-full h-full bg-[#080B12] p-4 flex flex-col justify-between font-sans select-none">
        <div className="flex items-center justify-between text-[10px] font-mono text-[#9AA4B5] pb-2 border-b border-[#252D3D]">
          <span>Universal Sleep Timer</span>
          <span className="text-[#38D9FF]">ACTIVE</span>
        </div>

        <div className="my-auto py-3 flex flex-col items-center">
          <div className="w-28 h-28 rounded-full border-4 border-[#38D9FF] bg-[#101522] flex flex-col items-center justify-center">
            <span className="text-[9px] font-mono uppercase text-[#9AA4B5]">Remaining</span>
            <span className="text-lg font-mono font-bold text-[#F5F7FA]">29:42</span>
            <span className="text-[9px] font-mono text-[#38D9FF]">Spotify Session</span>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#101522] border border-[#252D3D] text-[10px] font-mono text-[#F5F7FA]">
              <Plus className="w-3 h-3 text-[#38D9FF]" />5m
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#101522] border border-[#252D3D] text-[10px] font-mono text-[#9AA4B5]">
              Cancel
            </span>
          </div>
        </div>

        <div className="p-2 rounded bg-[#101522] border border-[#252D3D] flex items-center justify-between text-[10px] font-mono">
          <span className="text-[#9AA4B5] flex items-center gap-1">
            <Music className="w-3 h-3 text-[#8B7CFF]" />
            Target: Spotify
          </span>
          <span className="text-emerald-400">Ready</span>
        </div>
      </div>
    );
  }

  if (screenType === 'presets') {
    return (
      <div className="w-full h-full bg-[#080B12] p-4 flex flex-col justify-between font-sans select-none">
        <div className="flex items-center justify-between text-[10px] font-mono text-[#9AA4B5] pb-2 border-b border-[#252D3D]">
          <span>Sleep Timer Bottom Sheet</span>
          <Clock className="w-3 h-3 text-[#38D9FF]" />
        </div>

        <div className="my-auto space-y-1.5 py-2">
          <div className="grid grid-cols-3 gap-1.5">
            {['5 min', '10 min', '15 min', '30 min', '45 min', '1 hour'].map((preset, i) => (
              <div
                key={preset}
                className={`p-2 rounded border text-center text-[10px] font-mono ${
                  i === 3
                    ? 'bg-[#38D9FF]/15 border-[#38D9FF] text-[#F5F7FA] font-semibold'
                    : 'bg-[#101522] border-[#252D3D] text-[#9AA4B5]'
                }`}
              >
                {preset}
              </div>
            ))}
          </div>

          <div className="p-2 rounded bg-[#101522] border border-[#8B7CFF]/40 flex items-center justify-between text-[10px] font-mono">
            <span className="text-[#F5F7FA]">End of current track</span>
            <span className="text-[#8B7CFF]">Auto-calc</span>
          </div>

          <div className="p-2 rounded bg-[#101522] border border-[#252D3D] flex items-center justify-between text-[10px] font-mono">
            <span className="text-[#9AA4B5]">Custom Duration (HH:MM)</span>
            <span className="text-[#38D9FF]">Configure</span>
          </div>
        </div>

        <div className="text-[10px] font-mono text-[#9AA4B5] text-center pt-2 border-t border-[#252D3D]">
          Tap any preset to schedule AlarmManager
        </div>
      </div>
    );
  }

  if (screenType === 'permissions') {
    return (
      <div className="w-full h-full bg-[#080B12] p-4 flex flex-col justify-between font-sans select-none">
        <div className="flex items-center justify-between text-[10px] font-mono text-[#9AA4B5] pb-2 border-b border-[#252D3D]">
          <span>Permissions &amp; Audio Settings</span>
          <Sliders className="w-3 h-3 text-[#8B7CFF]" />
        </div>

        <div className="my-auto space-y-2 py-2">
          <div className="p-2.5 rounded bg-[#101522] border border-[#252D3D] flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-[#F5F7FA]">Notification Listener</p>
              <p className="text-[9px] font-mono text-[#9AA4B5]">MediaSession Access</p>
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400">
              <CheckCircle2 className="w-3 h-3" /> Active
            </span>
          </div>

          <div className="p-2.5 rounded bg-[#101522] border border-[#252D3D] flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-[#F5F7FA]">Exact Doze Alarms</p>
              <p className="text-[9px] font-mono text-[#9AA4B5]">SCHEDULE_EXACT_ALARM</p>
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400">
              <CheckCircle2 className="w-3 h-3" /> Granted
            </span>
          </div>

          <div className="p-2.5 rounded bg-[#101522] border border-[#252D3D] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-[#38D9FF]" />
              <span className="text-[11px] font-medium text-[#F5F7FA]">Volume Fade-Out (10s)</span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-[#38D9FF]/20 text-[9px] font-mono text-[#38D9FF]">
              ON
            </span>
          </div>
        </div>

        <div className="text-[10px] font-mono text-[#9AA4B5] text-center pt-2 border-t border-[#252D3D]">
          Zero personal notification content is ever read
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#080B12] p-4 flex flex-col justify-between font-sans select-none">
      <div className="flex items-center justify-between text-[10px] font-mono text-[#9AA4B5] pb-2 border-b border-[#252D3D]">
        <span>Android System Shade</span>
        <Bell className="w-3 h-3 text-[#38D9FF]" />
      </div>

      <div className="my-auto py-3">
        <div className="p-3 rounded-xl bg-[#101522] border border-[#38D9FF]/40 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-[#38D9FF] font-semibold">
              Universal Sleep Timer · Ongoing
            </span>
            <span className="text-[10px] font-mono text-[#9AA4B5]">14:20 left</span>
          </div>
          <p className="text-xs font-medium text-[#F5F7FA]">
            Pausing playback at 11:15 PM
          </p>
          <div className="w-full h-1.5 rounded-full bg-[#080B12] overflow-hidden">
            <div className="w-2/3 h-full bg-[#38D9FF]" />
          </div>
          <div className="flex items-center gap-2 pt-1">
            <span className="px-2 py-1 rounded bg-[#080B12] border border-[#252D3D] text-[10px] font-mono text-[#38D9FF]">
              +5 Mins
            </span>
            <span className="px-2 py-1 rounded bg-[#080B12] border border-[#252D3D] text-[10px] font-mono text-[#9AA4B5] inline-flex items-center gap-1">
              <Pause className="w-2.5 h-2.5" /> Cancel Timer
            </span>
          </div>
        </div>
      </div>

      <div className="text-[10px] font-mono text-[#9AA4B5] text-center pt-2 border-t border-[#252D3D]">
        Lockscreen &amp; Notification Action Receiver
      </div>
    </div>
  );
}

export const AppScreenshotsGallery: React.FC<AppScreenshotsGalleryProps> = ({
  appName,
  screenshots
}) => {
  const [activeModalScreen, setActiveModalScreen] = useState<AppScreenshot | null>(null);

  if (!screenshots || screenshots.length === 0) return null;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {screenshots.map((shot) => (
          <div
            key={shot.id}
            className="group rounded-xl bg-[#101522] border border-[#252D3D] hover:border-[#38D9FF]/50 transition-all duration-200 overflow-hidden flex flex-col justify-between"
          >
            {/* Device Frame Viewport */}
            <button
              type="button"
              onClick={() => setActiveModalScreen(shot)}
              aria-label={`Inspect ${shot.title} preview`}
              className="relative h-60 w-full text-left overflow-hidden border-b border-[#252D3D] focus:outline-none"
            >
              <ScreenGraphic screenType={shot.screenType} />
              <span className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-[#101522]/90 border border-[#252D3D] text-[#9AA4B5] group-hover:text-[#38D9FF] opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* Caption */}
            <div className="p-3.5">
              <h4 className="text-xs font-heading font-semibold text-[#F5F7FA] mb-1">
                {shot.title}
              </h4>
              <p className="text-[11px] text-[#9AA4B5] leading-relaxed">{shot.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeModalScreen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${appName} — ${activeModalScreen.title}`}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveModalScreen(null)}
        >
          <div
            className="max-w-lg w-full rounded-2xl bg-[#101522] border border-[#252D3D] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-3.5 bg-[#080B12] border-b border-[#252D3D] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-heading font-semibold text-[#F5F7FA]">
                  {activeModalScreen.title}
                </h3>
                <p className="text-[11px] font-mono text-[#38D9FF]">{appName} Interface Preview</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalScreen(null)}
                aria-label="Close preview"
                className="p-1.5 rounded-lg bg-[#101522] border border-[#252D3D] text-[#9AA4B5] hover:text-[#F5F7FA]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="h-80 w-full">
              <ScreenGraphic screenType={activeModalScreen.screenType} />
            </div>

            <div className="p-4 bg-[#080B12] border-t border-[#252D3D]">
              <p className="text-xs text-[#9AA4B5] leading-relaxed">
                {activeModalScreen.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
