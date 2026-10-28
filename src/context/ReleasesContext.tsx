import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { APPLICATIONS } from '../config/apps';
import { fetchAppReleases, RepoReleasesResult } from '../services/githubReleases';
import { AppConfig, NormalizedRelease } from '../types/app';

export interface ReleaseWithApp {
  app: AppConfig;
  release: NormalizedRelease;
}

interface ReleasesContextValue {
  releasesByAppId: Record<string, RepoReleasesResult>;
  isLoading: boolean;
  hasError: boolean;
  errorMessages: string[];
  refreshAllReleases: () => Promise<void>;
  getAppReleaseData: (appId: string) => RepoReleasesResult | undefined;
  allPublishedReleases: ReleaseWithApp[];
  allStableReleases: ReleaseWithApp[];
}

const ReleasesContext = createContext<ReleasesContextValue | undefined>(undefined);

export const ReleasesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [releasesByAppId, setReleasesByAppId] = useState<Record<string, RepoReleasesResult>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadAll = useCallback(async (forceRefresh = false) => {
    setIsLoading(true);
    try {
      const entries = await Promise.all(
        APPLICATIONS.map(async (app) => {
          const result = await fetchAppReleases(app, { forceRefresh });
          return [app.id, result] as const;
        })
      );
      const nextMap: Record<string, RepoReleasesResult> = {};
      for (const [id, res] of entries) {
        nextMap[id] = res;
      }
      setReleasesByAppId(nextMap);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAll(false);
  }, [loadAll]);

  const refreshAllReleases = useCallback(async () => {
    await loadAll(true);
  }, [loadAll]);

  const getAppReleaseData = useCallback(
    (appId: string) => releasesByAppId[appId],
    [releasesByAppId]
  );

  const { allPublishedReleases, allStableReleases, hasError, errorMessages } = useMemo(() => {
    const published: ReleaseWithApp[] = [];
    const stable: ReleaseWithApp[] = [];
    const errors: string[] = [];

    for (const app of APPLICATIONS) {
      const data = releasesByAppId[app.id];
      if (!data) continue;
      if (data.errorMessage) {
        errors.push(`${app.name}: ${data.errorMessage}`);
      }
      for (const rel of data.releases) {
        published.push({ app, release: rel });
        if (!rel.isPrerelease && !rel.isDraft) {
          stable.push({ app, release: rel });
        }
      }
    }

    const sortByDateDesc = (a: ReleaseWithApp, b: ReleaseWithApp) => {
      const timeA = new Date(a.release.publishedAt || a.release.createdAt).getTime() || 0;
      const timeB = new Date(b.release.publishedAt || b.release.createdAt).getTime() || 0;
      return timeB - timeA;
    };

    published.sort(sortByDateDesc);
    stable.sort(sortByDateDesc);

    return {
      allPublishedReleases: published,
      allStableReleases: stable,
      hasError: errors.length > 0,
      errorMessages: errors
    };
  }, [releasesByAppId]);

  const value = useMemo<ReleasesContextValue>(
    () => ({
      releasesByAppId,
      isLoading,
      hasError,
      errorMessages,
      refreshAllReleases,
      getAppReleaseData,
      allPublishedReleases,
      allStableReleases
    }),
    [
      releasesByAppId,
      isLoading,
      hasError,
      errorMessages,
      refreshAllReleases,
      getAppReleaseData,
      allPublishedReleases,
      allStableReleases
    ]
  );

  return <ReleasesContext.Provider value={value}>{children}</ReleasesContext.Provider>;
};

export function useReleases(): ReleasesContextValue {
  const ctx = useContext(ReleasesContext);
  if (!ctx) {
    throw new Error('useReleases must be used within a ReleasesProvider');
  }
  return ctx;
}
