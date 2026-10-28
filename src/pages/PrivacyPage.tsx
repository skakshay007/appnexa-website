import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export const PrivacyPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Privacy Policy — AppNexa"
        description="Privacy Policy for the AppNexa software distribution platform and its published applications."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        <div className="pb-6 border-b border-white/[0.08]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151D28] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-[#35D9F5] mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy &amp; Data Protection</span>
          </div>
          <h1 className="text-3xl font-heading font-bold text-[#F5F7FA]">Privacy Policy</h1>
          <p className="text-xs font-mono text-[#A5B0C0] mt-2">
            Effective Date: October 28, 2026
          </p>
        </div>

        <div className="space-y-6 text-sm text-[#A5B0C0] leading-relaxed">
          <section className="p-6 rounded-2xl bg-[#151D28] border border-white/[0.08] space-y-2">
            <h2 className="text-base font-heading font-semibold text-[#F5F7FA]">
              1. Website Browsing &amp; Local Storage
            </h2>
            <p>
              AppNexa does not require user accounts, tracking cookies, or invasive analytics to
              browse or download software. To prevent hitting public GitHub REST API rate limits,
              release metadata fetched from GitHub may be temporarily cached in your browser&apos;s
              local <code className="font-mono text-xs text-[#35D9F5]">sessionStorage</code>.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-[#151D28] border border-white/[0.08] space-y-2">
            <h2 className="text-base font-heading font-semibold text-[#F5F7FA]">
              2. GitHub Releases &amp; Binary Downloads
            </h2>
            <p>
              When you view release information or click an APK download button on AppNexa, your
              browser communicates directly with GitHub (<code className="font-mono text-xs text-[#F5F7FA]">api.github.com</code> and{' '}
              <code className="font-mono text-xs text-[#F5F7FA]">github.com</code>). Those requests
              are governed by GitHub&apos;s own Privacy Statement.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-[#151D28] border border-white/[0.08] space-y-2">
            <h2 className="text-base font-heading font-semibold text-[#F5F7FA]">
              3. Published Android Applications
            </h2>
            <p>
              Applications published on AppNexa—such as <strong>Universal Music Sleep Timer</strong>
              —request only the Android system permissions strictly required for their core
              functionality (for example, <code className="font-mono text-xs text-[#35D9F5]">BIND_NOTIFICATION_LISTENER_SERVICE</code>{' '}
              to detect active media playback sessions). Personal notification text, chat messages,
              and listening histories are never collected, stored, or transmitted off your device.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};
