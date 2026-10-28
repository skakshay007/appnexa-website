import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

/**
 * Developer-platform Footer component (Requirement 6).
 * Includes the AppNexa brand, navigation links, About, Contact, Privacy Policy,
 * Terms of Service, and the tagline: "Discover. Download. Experience."
 */
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B0F14] border-t border-white/[0.08] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.08]">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-3.5">
            <Link to="/" className="inline-block focus:outline-none">
              <BrandLogo size="md" />
            </Link>
            <p className="text-sm font-heading font-semibold text-[#F5F7FA] tracking-wide">
              Discover. Download. Experience.
            </p>
            <p className="text-xs sm:text-sm text-[#A5B0C0] max-w-sm leading-relaxed">
              An independent software discovery and distribution platform connecting users directly
              to official application builds and GitHub Releases.
            </p>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#F5F7FA] mb-3.5">
                Navigation
              </h3>
              <ul className="space-y-2.5 text-sm text-[#A5B0C0]">
                <li>
                  <Link to="/" className="hover:text-[#35D9F5] transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/apps" className="hover:text-[#35D9F5] transition-colors">
                    All Apps
                  </Link>
                </li>
                <li>
                  <Link to="/releases" className="hover:text-[#35D9F5] transition-colors">
                    Latest Releases
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="hover:text-[#35D9F5] transition-colors">
                    Categories
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#F5F7FA] mb-3.5">
                Platform &amp; Legal
              </h3>
              <ul className="space-y-2.5 text-sm text-[#A5B0C0]">
                <li>
                  <Link to="/about" className="hover:text-[#35D9F5] transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-[#35D9F5] transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-[#35D9F5] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-[#35D9F5] transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Source & Developer Column */}
          <div className="md:col-span-3 space-y-3.5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#F5F7FA]">
              Developer &amp; Source
            </h3>
            <p className="text-xs text-[#A5B0C0] leading-relaxed">
              Application source repositories and release assets are hosted publicly on GitHub.
            </p>
            <a
              href="https://github.com/skakshay007"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#151D28] hover:bg-[#1c2635] border border-white/10 hover:border-[#35D9F5]/40 text-xs font-mono text-[#F5F7FA] transition-colors"
            >
              <span>GitHub (@skakshay007)</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#35D9F5]" />
            </a>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#A5B0C0]">
          <p>© {currentYear} AppNexa. All rights reserved.</p>
          <p className="text-[11px] text-[#A5B0C0]/80">
            Independent software platform. Not affiliated with Google, Android, GitHub, or Microsoft.
          </p>
        </div>
      </div>
    </footer>
  );
};
