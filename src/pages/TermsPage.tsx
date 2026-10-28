import React from 'react';
import { FileText } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export const TermsPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Terms of Use — AppNexa"
        description="Terms of Use for downloading and using software distributed via AppNexa."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        <div className="pb-6 border-b border-[#252D3D]">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#101522] border border-[#252D3D] text-[11px] font-mono uppercase tracking-widest text-[#8B7CFF] mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>Platform Terms</span>
          </div>
          <h1 className="text-3xl font-heading font-bold text-[#F5F7FA]">Terms of Use</h1>
          <p className="text-xs font-mono text-[#9AA4B5] mt-2">
            Effective Date: October 28, 2026
          </p>
        </div>

        <div className="space-y-6 text-sm text-[#9AA4B5] leading-relaxed">
          <section className="p-6 rounded-xl bg-[#101522] border border-[#252D3D] space-y-2">
            <h2 className="text-base font-heading font-semibold text-[#F5F7FA]">
              1. Independent Distribution
            </h2>
            <p>
              AppNexa is an independent platform that provides information and direct download links
              to official GitHub release assets for software created by the platform owner.
            </p>
          </section>

          <section className="p-6 rounded-xl bg-[#101522] border border-[#252D3D] space-y-2">
            <h2 className="text-base font-heading font-semibold text-[#F5F7FA]">
              2. Software Provided &ldquo;As Is&rdquo;
            </h2>
            <p>
              All applications and APK packages linked on AppNexa are provided &ldquo;as is&rdquo;
              without warranty of any kind, express or implied. Users are responsible for verifying
              device compatibility and reviewing installation instructions before installing
              packages on their devices.
            </p>
          </section>

          <section className="p-6 rounded-xl bg-[#101522] border border-[#252D3D] space-y-2">
            <h2 className="text-base font-heading font-semibold text-[#F5F7FA]">
              3. Trademarks &amp; Non-Affiliation
            </h2>
            <p>
              AppNexa is not affiliated with Google, Android, GitHub, Microsoft, Spotify, or any
              other third-party organization mentioned for compatibility purposes.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};
