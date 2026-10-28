import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, ArrowRight, Mail } from 'lucide-react';
import { APPLICATIONS } from '../config/apps';
import { BrandLogo } from './BrandLogo';
import { AppIcon } from './AppIcon';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'All Apps', to: '/apps' },
  { label: 'Latest Releases', to: '/releases' },
  { label: 'Categories', to: '/categories' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' }
];

/**
 * Responsive developer-platform Navigation Bar (Requirement 1).
 * Left: AppNexa logo
 * Center: Home, All Apps, Latest Releases, Categories, About, Contact
 * Right: Search and Contact buttons
 */
export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    };
    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed) {
      navigate(`/apps?q=${encodeURIComponent(trimmed)}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
    } else {
      navigate('/apps');
      setSearchOpen(false);
    }
  };

  const quickMatches = searchQuery.trim()
    ? APPLICATIONS.filter(
        (app) =>
          app.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
          app.description.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
          app.category.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
    : [];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#0B0F14]/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/30'
          : 'bg-[#0B0F14]/75 backdrop-blur-md border-b border-white/[0.07]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-6">
          {/* Left: AppNexa Logo */}
          <div className="shrink-0">
            <Link
              to="/"
              aria-label="AppNexa Home"
              className="focus:outline-none focus:ring-2 focus:ring-[#35D9F5]/50 rounded-lg"
            >
              <BrandLogo size="md" />
            </Link>
          </div>

          {/* Center: Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-1.5 px-2 py-1.5 rounded-xl bg-[#111821]/90 border border-white/[0.07]"
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `relative px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'text-[#F5F7FA] bg-[#151D28] shadow-sm'
                      : 'text-[#A5B0C0] hover:text-[#F5F7FA] hover:bg-[#151D28]/50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full bg-[#35D9F5]"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right: Search and Contact Buttons */}
          <div className="flex items-center gap-3">
            {/* Search Button / Expandable Search Input */}
            <div ref={searchContainerRef} className="relative hidden sm:block">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <div className="relative flex items-center">
                    <Search className="w-4 h-4 text-[#35D9F5] absolute left-3 pointer-events-none" />
                    <input
                      ref={searchInputRef}
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search software..."
                      aria-label="Search applications"
                      className="w-56 md:w-64 pl-9 pr-8 py-2 rounded-lg bg-[#151D28] border border-[#35D9F5]/60 text-xs sm:text-sm text-[#F5F7FA] placeholder-[#A5B0C0] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery('');
                      }}
                      aria-label="Close search"
                      className="absolute right-2.5 text-[#A5B0C0] hover:text-[#F5F7FA]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  aria-label="Search software"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#111821] hover:bg-[#151D28] border border-white/10 hover:border-[#35D9F5]/40 text-xs sm:text-sm font-medium text-[#A5B0C0] hover:text-[#F5F7FA] transition-colors"
                >
                  <Search className="w-4 h-4 text-[#35D9F5]" />
                  <span>Search</span>
                </button>
              )}

              {/* Instant Quick-Search Results Dropdown */}
              {searchOpen && searchQuery.trim().length > 0 && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl bg-[#151D28] border border-white/10 shadow-2xl p-2 z-50">
                  {quickMatches.length > 0 ? (
                    <div className="space-y-1">
                      {quickMatches.map((app) => (
                        <Link
                          key={app.id}
                          to={`/apps/${app.slug}`}
                          onClick={() => {
                            setSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-[#111821] transition-colors"
                        >
                          <AppIcon icon={app.icon} name={app.name} size="sm" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-heading font-semibold text-[#F5F7FA] truncate">
                              {app.name}
                            </p>
                            <p className="text-[11px] font-mono text-[#35D9F5]">
                              {app.platform} · {app.category}
                            </p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-[#A5B0C0]" />
                        </Link>
                      ))}
                      <button
                        type="button"
                        onClick={handleSearchSubmit}
                        className="w-full text-left px-2.5 py-1.5 text-[11px] font-mono text-[#35D9F5] hover:underline border-t border-white/10 mt-1 pt-2"
                      >
                        View all directory results for &ldquo;{searchQuery.trim()}&rdquo; →
                      </button>
                    </div>
                  ) : (
                    <div className="p-3 text-center">
                      <p className="text-xs text-[#A5B0C0]">
                        No applications matching &ldquo;{searchQuery.trim()}&rdquo;
                      </p>
                      <Link
                        to="/apps"
                        onClick={() => setSearchOpen(false)}
                        className="inline-block mt-1.5 text-xs font-mono text-[#35D9F5] hover:underline"
                      >
                        Browse All Applications →
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Contact Button */}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold border transition-all duration-200 ${
                  isActive
                    ? 'bg-[#35D9F5] border-[#35D9F5] text-[#0B0F14]'
                    : 'bg-[#151D28] hover:bg-[#1c2635] border-white/10 hover:border-[#35D9F5]/50 text-[#F5F7FA]'
                }`
              }
            >
              <Mail className="w-3.5 h-3.5 text-[#35D9F5] shrink-0" />
              <span>Contact</span>
            </NavLink>

            {/* Mobile Navigation Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="lg:hidden inline-flex items-center justify-center p-2.5 rounded-lg bg-[#111821] border border-white/10 text-[#F5F7FA] hover:border-[#35D9F5]/50 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          className="lg:hidden bg-[#111821] border-b border-white/10 px-4 pt-3 pb-6 space-y-4"
        >
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-[#A5B0C0] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search software..."
              aria-label="Search applications"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#151D28] border border-white/10 focus:border-[#35D9F5] focus:outline-none text-sm text-[#F5F7FA] placeholder-[#A5B0C0]"
            />
          </form>

          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#151D28] text-[#35D9F5] border border-white/10'
                      : 'text-[#A5B0C0] hover:text-[#F5F7FA] hover:bg-[#151D28]/60'
                  }`
                }
              >
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
