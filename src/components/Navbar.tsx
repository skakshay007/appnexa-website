import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, ArrowRight } from 'lucide-react';
import { APPLICATIONS } from '../config/apps';
import { BrandLogo } from './BrandLogo';
import { AppIcon } from './AppIcon';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'All Apps', to: '/apps' },
  { label: 'Latest Releases', to: '/releases' },
  { label: 'Categories', to: '/categories' },
  { label: 'About', to: '/about' }
];

/**
 * Premium responsive sticky Navigation Bar (Section 3 & 15).
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
      setIsScrolled(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  // Focus input when expandable search opens
  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  // Close expandable search when clicking outside
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
          ? 'bg-[#080B12]/95 backdrop-blur-md border-b border-[#252D3D] shadow-lg shadow-black/25'
          : 'bg-[#080B12]/80 backdrop-blur-sm border-b border-[#252D3D]/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-4">
          {/* Left: AppNexa Logo and Wordmark */}
          <div className="shrink-0">
            <Link
              to="/"
              aria-label="AppNexa Home"
              className="focus:outline-none focus:ring-2 focus:ring-[#38D9FF]/50 rounded-lg"
            >
              <BrandLogo size="md" />
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-1"
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `relative px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? 'text-[#F5F7FA] bg-[#101522]'
                      : 'text-[#9AA4B5] hover:text-[#F5F7FA] hover:bg-[#101522]/60'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full bg-[#38D9FF]"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right: Expandable Search + Contact Link + Mobile Menu Trigger */}
          <div className="flex items-center gap-2.5">
            {/* Expandable Search Field (Desktop & Tablet) */}
            <div ref={searchContainerRef} className="relative hidden sm:block">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <div className="relative flex items-center">
                    <Search className="w-4 h-4 text-[#38D9FF] absolute left-3 pointer-events-none" />
                    <input
                      ref={searchInputRef}
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search applications..."
                      aria-label="Search applications"
                      className="w-56 md:w-64 pl-9 pr-8 py-1.5 rounded-lg bg-[#101522] border border-[#38D9FF]/60 text-xs sm:text-sm text-[#F5F7FA] placeholder-[#9AA4B5] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery('');
                      }}
                      aria-label="Close search"
                      className="absolute right-2 text-[#9AA4B5] hover:text-[#F5F7FA]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  aria-label="Open application search"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#101522] hover:bg-[#151C2E] border border-[#252D3D] hover:border-[#38D9FF]/40 text-xs font-medium text-[#9AA4B5] hover:text-[#F5F7FA] transition-colors"
                >
                  <Search className="w-4 h-4 text-[#38D9FF]" />
                  <span className="hidden md:inline">Search</span>
                </button>
              )}

              {/* Quick Instant Search Dropdown */}
              {searchOpen && searchQuery.trim().length > 0 && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl bg-[#101522] border border-[#252D3D] shadow-xl p-2 z-50">
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
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#080B12] transition-colors"
                        >
                          <AppIcon icon={app.icon} name={app.name} size="sm" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-heading font-semibold text-[#F5F7FA] truncate">
                              {app.name}
                            </p>
                            <p className="text-[11px] font-mono text-[#38D9FF]">
                              {app.platform} · v{app.defaultVersion}
                            </p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-[#9AA4B5]" />
                        </Link>
                      ))}
                      <button
                        type="button"
                        onClick={handleSearchSubmit}
                        className="w-full text-left px-2.5 py-1.5 text-[11px] font-mono text-[#38D9FF] hover:underline border-t border-[#252D3D] mt-1 pt-2"
                      >
                        View all directory results for &ldquo;{searchQuery.trim()}&rdquo; →
                      </button>
                    </div>
                  ) : (
                    <div className="p-3 text-center">
                      <p className="text-xs text-[#9AA4B5]">
                        No applications matching &ldquo;{searchQuery.trim()}&rdquo;
                      </p>
                      <Link
                        to="/apps"
                        onClick={() => setSearchOpen(false)}
                        className="inline-block mt-1.5 text-xs font-mono text-[#38D9FF] hover:underline"
                      >
                        Browse All Applications →
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Contact Link */}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `hidden sm:inline-flex items-center px-3.5 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  isActive
                    ? 'bg-[#38D9FF]/15 border-[#38D9FF] text-[#38D9FF]'
                    : 'bg-[#101522] hover:bg-[#151C2E] border-[#252D3D] hover:border-[#38D9FF]/40 text-[#F5F7FA]'
                }`
              }
            >
              Contact
            </NavLink>

            {/* Mobile Navigation Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg bg-[#101522] border border-[#252D3D] text-[#F5F7FA] hover:border-[#38D9FF]/50 transition-colors"
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
          className="lg:hidden bg-[#080B12] border-b border-[#252D3D] px-4 pt-3 pb-6 space-y-4"
        >
          {/* Mobile Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-[#9AA4B5] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search applications..."
              aria-label="Search applications"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#101522] border border-[#252D3D] focus:border-[#38D9FF] focus:outline-none text-sm text-[#F5F7FA] placeholder-[#9AA4B5]"
            />
          </form>

          {/* Mobile Nav Links */}
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#101522] text-[#38D9FF] border border-[#252D3D]'
                      : 'text-[#9AA4B5] hover:text-[#F5F7FA] hover:bg-[#101522]/60'
                  }`
                }
              >
                <span>{link.label}</span>
              </NavLink>
            ))}

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#101522] text-[#38D9FF] border border-[#252D3D]'
                    : 'text-[#9AA4B5] hover:text-[#F5F7FA] hover:bg-[#101522]/60'
                }`
              }
            >
              <span>Contact</span>
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};
