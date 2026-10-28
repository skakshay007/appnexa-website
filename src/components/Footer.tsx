import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

/**
 * Clean, minimal Footer component (Section 13 & 15).
 */
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#080B12] border-t border-[#252D3D] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#252D3D]">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-3">
            <Link to="/" className="inline-block focus:outline-none">
              <BrandLogo size="md" />
            </Link>
            <p className="text-sm font-heading font-medium text-[#F5F7FA]">
              Discover. Download. Experience.
            </p>
            <p className="text-xs sm:text-sm text-[#9AA4B5] max-w-sm leading-relaxed">
              An independent software platform for discovering, exploring, and downloading
              applications published with transparent release metadata.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#F5F7FA] mb-3">
                Platform
              </h3>
              <ul className="space-y-2 text-sm text-[#9AA4B5]">
                <li>
                  <Link to="/" className="hover:text-[#38D9FF] transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/apps" className="hover:text-[#38D9FF] transition-colors">
                    All Apps
                  </Link>
                </li>
                <li>
                  <Link to="/releases" className="hover:text-[#38D9FF] transition-colors">
                    Latest Releases
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="hover:text-[#38D9FF] transition-colors">
                    Categories
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#F5F7FA] mb-3">
                Information
              </h3>
              <ul className="space-y-2 text-sm text-[#9AA4B5]">
                <li>
                  <Link to="/about" className="hover:text-[#38D9FF] transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-[#38D9FF] transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-[#38D9FF] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-[#38D9FF] transition-colors">
                    Terms of Use
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Developer / Repository Column */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#F5F7FA]">
              Developer &amp; Source
            </h3>
            <p className="text-xs text-[#9AA4B5] leading-relaxed">
              Release binaries and source repositories are published transparently on GitHub.
            </p>
            <a
              href="https://github.com/skakshay007"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#101522] hover:bg-[#151C2E] border border-[#252D3D] hover:border-[#38D9FF]/40 text-xs font-mono text-[#F5F7FA] transition-colors"
            >
              <span>GitHub Profile (@skakshay007)</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#38D9FF]" />
            </a>
          </div>
        </div>

        {/* Bottom Copyright & Independent Notice */}
        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#9AA4B5]">
          <p>© {currentYear} AppNexa. All rights reserved.</p>
          <p className="text-[11px] text-[#9AA4B5]/80">
            Independent software platform. Not affiliated with Google, Android, GitHub, or Microsoft.
          </p>
        </div>
      </div>
    </footer>
  );
};
