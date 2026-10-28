import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  ShieldCheck,
  GitBranch,
  Download,
  Layers,
  ExternalLink,
  ArrowRight,
  Info
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

const PILLARS = [
  {
    icon: Code2,
    title: 'Independent Development',
    description:
      'AppNexa is built and operated independently. Every application published here is crafted from the ground up with focus on reliability, clean architecture, and respect for user privacy.'
  },
  {
    icon: Layers,
    title: 'Useful Digital Tools',
    description:
      'Rather than bloated software suites, we focus on solving real everyday friction points—starting with intelligent audio sleep timing on Android and expanding into desktop and web utilities.'
  },
  {
    icon: GitBranch,
    title: 'Transparent Release Information',
    description:
      'Every version number, release date, changelog, and asset size displayed on AppNexa is synchronized directly from public GitHub Releases so users can verify what they are installing.'
  },
  {
    icon: Download,
    title: 'Direct Access to Application Downloads',
    description:
      'Download buttons link directly to official GitHub release assets—no intermediary download wrappers, no countdown timers, and no bundled adware.'
  }
];

export const AboutPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="About AppNexa — Built with Purpose. Shared with Everyone."
        description="Learn about AppNexa, an independent platform for discovering and downloading applications developed by its creator."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        {/* Hero Header (Section 11) */}
        <section className="max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101522] border border-[#252D3D] text-xs font-mono uppercase tracking-wider text-[#38D9FF]">
            <span>About AppNexa</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-bold text-[#F5F7FA] tracking-tight leading-tight">
            Built with Purpose. Shared with Everyone.
          </h1>

          <p className="text-base sm:text-lg text-[#9AA4B5] leading-relaxed">
            AppNexa is an independent software platform created for discovering, exploring, and
            downloading applications developed and published directly by its creator.
          </p>
        </section>

        {/* Core Pillars Grid */}
        <section aria-labelledby="pillars-heading" className="space-y-6">
          <h2 id="pillars-heading" className="sr-only">
            Platform Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="p-6 sm:p-8 rounded-xl bg-[#101522] border border-[#252D3D] space-y-3"
                >
                  <div className="w-11 h-11 rounded-lg bg-[#080B12] border border-[#252D3D] flex items-center justify-center text-[#38D9FF]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-[#F5F7FA]">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#9AA4B5] leading-relaxed">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Future Expansion Roadmap */}
        <section className="rounded-2xl bg-[#101522] border border-[#252D3D] p-6 sm:p-10 space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8B7CFF]">
              Platform Roadmap
            </span>
            <h2 className="text-2xl font-heading font-bold text-[#F5F7FA]">
              Future Expansion Across Software Platforms
            </h2>
            <p className="text-sm text-[#9AA4B5] leading-relaxed">
              While AppNexa currently focuses on native Android applications distributed as verified
              APK packages, the underlying platform architecture is designed to support multi-platform
              releases as new tools are completed.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#080B12] border border-[#38D9FF]/40 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#38D9FF]">STAGE 01</span>
                <span className="text-emerald-400">ACTIVE</span>
              </div>
              <h3 className="text-base font-heading font-semibold text-[#F5F7FA]">
                Android Applications
              </h3>
              <p className="text-xs text-[#9AA4B5] leading-relaxed">
                Native Kotlin &amp; Jetpack Compose utilities distributed with direct APK downloads
                and full GitHub release changelogs.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#080B12] border border-[#252D3D] space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#8B7CFF]">STAGE 02</span>
                <span className="text-[#9AA4B5]">PLANNED</span>
              </div>
              <h3 className="text-base font-heading font-semibold text-[#F5F7FA]">
                Windows Software
              </h3>
              <p className="text-xs text-[#9AA4B5] leading-relaxed">
                Lightweight desktop tools and standalone utilities engineered for Windows workflows.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#080B12] border border-[#252D3D] space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#8B7CFF]">STAGE 03</span>
                <span className="text-[#9AA4B5]">PLANNED</span>
              </div>
              <h3 className="text-base font-heading font-semibold text-[#F5F7FA]">
                Web &amp; Developer Tools
              </h3>
              <p className="text-xs text-[#9AA4B5] leading-relaxed">
                Browser-based web applications and specialized utilities for developers.
              </p>
            </div>
          </div>
        </section>

        {/* Independent Non-Affiliation Statement */}
        <section className="rounded-xl bg-[#101522]/70 border border-[#252D3D] p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-3.5 max-w-2xl">
            <Info className="w-5 h-5 text-[#38D9FF] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h2 className="text-sm font-heading font-semibold text-[#F5F7FA]">
                Independent Platform Disclosure
              </h2>
              <p className="text-xs sm:text-sm text-[#9AA4B5] leading-relaxed">
                AppNexa is an independent software distribution website. AppNexa is not affiliated
                with, endorsed by, or sponsored by Google, Android, GitHub, Microsoft, Spotify, or
                any other third-party company. All third-party product and platform names are
                trademarks of their respective owners.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/apps"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#38D9FF] text-[#080B12] font-semibold text-xs sm:text-sm transition-colors"
            >
              <span>Explore Apps</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://github.com/skakshay007"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#080B12] hover:bg-[#151C2E] border border-[#252D3D] text-xs sm:text-sm font-mono text-[#F5F7FA] transition-colors"
            >
              <span>Developer GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#38D9FF]" />
            </a>
          </div>
        </section>

        {/* Security Assurance */}
        <section className="flex items-center gap-2.5 text-xs font-mono text-[#9AA4B5]">
          <ShieldCheck className="w-4 h-4 text-[#38D9FF] shrink-0" />
          <span>
            All release metadata is fetched client-side via the official public GitHub REST API.
          </span>
        </section>
      </div>
    </>
  );
};
