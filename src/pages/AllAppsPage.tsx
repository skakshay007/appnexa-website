import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ArrowUpDown, Smartphone, Layers } from 'lucide-react';
import {
  APPLICATIONS,
  DIRECTORY_CATEGORY_LIST,
  getCategoryAppCount
} from '../config/apps';
import { DirectoryCategory, PlatformType } from '../types/app';
import { useReleases } from '../context/ReleasesContext';
import { SEOHead } from '../components/SEOHead';
import { SearchBar } from '../components/SearchBar';
import { ApplicationCard } from '../components/ApplicationCard';
import { EmptyState } from '../components/EmptyState';
import { LoadingState } from '../components/LoadingState';

type SortOption = 'newest' | 'alpha-asc' | 'alpha-desc';

export const AllAppsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = (searchParams.get('category') as DirectoryCategory | 'ALL') || 'ALL';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<DirectoryCategory | 'ALL'>(
    initialCategory
  );
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const { getAppReleaseData, isLoading } = useReleases();

  useEffect(() => {
    const qParam = searchParams.get('q') || '';
    const catParam = (searchParams.get('category') as DirectoryCategory | 'ALL') || 'ALL';
    setSearchQuery(qParam);
    setSelectedCategory(catParam);
  }, [searchParams]);

  const updateUrlParams = (nextQ: string, nextCat: DirectoryCategory | 'ALL') => {
    const params = new URLSearchParams();
    if (nextQ.trim()) params.set('q', nextQ.trim());
    if (nextCat !== 'ALL') params.set('category', nextCat);
    setSearchParams(params, { replace: true });
  };

  const handleQueryChange = (val: string) => {
    setSearchQuery(val);
    updateUrlParams(val, selectedCategory);
  };

  const handleCategoryChange = (cat: DirectoryCategory | 'ALL') => {
    setSelectedCategory(cat);
    updateUrlParams(searchQuery, cat);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedPlatform('ALL');
    setSortBy('newest');
    setSearchParams({}, { replace: true });
  };

  const activeCategories = useMemo(() => {
    return DIRECTORY_CATEGORY_LIST.filter((cat) => getCategoryAppCount(cat) > 0);
  }, []);

  const activePlatforms = useMemo(() => {
    const set = new Set<PlatformType>();
    for (const app of APPLICATIONS) {
      set.add(app.platform);
    }
    return Array.from(set);
  }, []);

  const filteredAndSortedApps = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const filtered = APPLICATIONS.filter((app) => {
      const matchesQuery =
        !normalizedQuery ||
        app.name.toLowerCase().includes(normalizedQuery) ||
        app.description.toLowerCase().includes(normalizedQuery) ||
        app.category.toLowerCase().includes(normalizedQuery) ||
        app.features.some((f) => f.title.toLowerCase().includes(normalizedQuery));

      const matchesCategory =
        selectedCategory === 'ALL' || app.categories.includes(selectedCategory);

      const matchesPlatform =
        selectedPlatform === 'ALL' || app.platform === selectedPlatform;

      return matchesQuery && matchesCategory && matchesPlatform;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'alpha-asc') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'alpha-desc') {
        return b.name.localeCompare(a.name);
      }
      const relA =
        getAppReleaseData(a.id)?.latestStableRelease?.publishedAt || a.defaultReleaseDate;
      const relB =
        getAppReleaseData(b.id)?.latestStableRelease?.publishedAt || b.defaultReleaseDate;
      const timeA = new Date(relA).getTime() || 0;
      const timeB = new Date(relB).getTime() || 0;
      return timeB - timeA;
    });
  }, [searchQuery, selectedCategory, selectedPlatform, sortBy, getAppReleaseData]);

  return (
    <>
      <SEOHead
        title="All Applications — AppNexa Directory"
        description="Browse, search, and filter Android applications and software tools published on AppNexa."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Page Header */}
        <div className="mb-10 pb-8 border-b border-white/[0.08]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151D28] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-[#35D9F5] mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Application Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-[#F5F7FA]">
            All Applications
          </h1>
          <p className="text-sm sm:text-base text-[#A5B0C0] mt-2 max-w-2xl">
            Search applications by name, filter by category or platform, and download official
            release packages directly from GitHub.
          </p>
        </div>

        {/* Search, Filter & Sort Controls Bar */}
        <div className="rounded-2xl bg-[#111821] border border-white/[0.08] p-4 sm:p-6 mb-8 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            <div className="lg:col-span-6">
              <SearchBar
                value={searchQuery}
                onChange={handleQueryChange}
                placeholder="Search applications by name or keyword..."
                enableShortcut
              />
            </div>

            <div className="lg:col-span-3 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-[#35D9F5] shrink-0" />
              <label htmlFor="platform-filter" className="sr-only">
                Filter by Platform
              </label>
              <select
                id="platform-filter"
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value as PlatformType | 'ALL')}
                className="w-full px-3 py-2.5 rounded-lg bg-[#0B0F14] border border-white/10 focus:border-[#35D9F5] focus:outline-none text-xs sm:text-sm font-mono text-[#F5F7FA]"
              >
                <option value="ALL">All Platforms ({APPLICATIONS.length})</option>
                {activePlatforms.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-3 flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-[#8B7CFF] shrink-0" />
              <label htmlFor="sort-selector" className="sr-only">
                Sort applications
              </label>
              <select
                id="sort-selector"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full px-3 py-2.5 rounded-lg bg-[#0B0F14] border border-white/10 focus:border-[#35D9F5] focus:outline-none text-xs sm:text-sm font-mono text-[#F5F7FA]"
              >
                <option value="newest">Sort: Newest Release</option>
                <option value="alpha-asc">Sort: Alphabetical (A–Z)</option>
                <option value="alpha-desc">Sort: Alphabetical (Z–A)</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A5B0C0] mr-1">
                <Filter className="w-3.5 h-3.5 text-[#35D9F5]" />
                Categories:
              </span>

              <button
                type="button"
                onClick={() => handleCategoryChange('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                  selectedCategory === 'ALL'
                    ? 'bg-[#35D9F5] text-[#0B0F14] font-semibold'
                    : 'bg-[#151D28] text-[#A5B0C0] hover:text-[#F5F7FA] border border-white/10'
                }`}
              >
                All ({APPLICATIONS.length})
              </button>

              {activeCategories.map((category) => {
                const count = getCategoryAppCount(category);
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryChange(category)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                      isSelected
                        ? 'bg-[#35D9F5] text-[#0B0F14] font-semibold'
                        : 'bg-[#151D28] text-[#A5B0C0] hover:text-[#F5F7FA] border border-white/10'
                    }`}
                  >
                    {category} ({count})
                  </button>
                );
              })}
            </div>

            <span className="text-[11px] font-mono text-[#A5B0C0]">
              Showing {filteredAndSortedApps.length} of {APPLICATIONS.length}{' '}
              {APPLICATIONS.length === 1 ? 'application' : 'applications'}
            </span>
          </div>
        </div>

        {/* Directory Results Grid */}
        {isLoading && APPLICATIONS.length === 0 ? (
          <LoadingState variant="cards" count={2} />
        ) : filteredAndSortedApps.length === 0 ? (
          <EmptyState
            title="No applications match your filter criteria"
            description={
              searchQuery.trim()
                ? `No applications matched "${searchQuery.trim()}". Try clearing the search query or selecting "All" categories.`
                : 'No published applications exist in the selected category or platform yet.'
            }
            actionLabel="Reset Search & Filters"
            onAction={handleResetFilters}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAndSortedApps.map((app) => (
              <ApplicationCard key={app.id} app={app} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
