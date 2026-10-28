import { AppConfig, NormalizedAsset, NormalizedRelease } from '../types/app';

const CACHE_KEY_PREFIX = 'appnexa_gh_releases_v1_';
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes cache to respect GitHub API rate limits

interface RawGitHubAsset {
  id?: unknown;
  name?: unknown;
  size?: unknown;
  content_type?: unknown;
  browser_download_url?: unknown;
  digest?: unknown;
  updated_at?: unknown;
  state?: unknown;
}

interface RawGitHubRelease {
  id?: unknown;
  tag_name?: unknown;
  name?: unknown;
  body?: unknown;
  draft?: unknown;
  prerelease?: unknown;
  published_at?: unknown;
  created_at?: unknown;
  html_url?: unknown;
  assets?: unknown;
}

export interface RepoReleasesResult {
  releases: NormalizedRelease[];
  stableReleases: NormalizedRelease[];
  latestStableRelease: NormalizedRelease | null;
  latestRelease: NormalizedRelease | null;
  source: 'live' | 'cache' | 'fallback';
  errorMessage: string | null;
  rateLimited: boolean;
  fetchedAt: string;
}

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return 'Unknown size';
  const units = ['B', 'KB', 'MB', 'GB'];
  let value = bytes;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex++;
  }
  return `${value.toFixed(unitIndex === 0 ? 0 : 2)} ${units[unitIndex]}`;
}

export function formatDate(isoDate: string | undefined | null): string {
  if (!isoDate) return 'Unavailable';
  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) return 'Unavailable';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(parsed);
}

export function normalizeVersion(tagName: string): string {
  const trimmed = tagName.trim();
  return trimmed.replace(/^[vV](?=\d)/, '') || trimmed;
}

function isTrustedGitHubUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === 'https:' &&
      (parsed.hostname === 'github.com' ||
        parsed.hostname.endsWith('.github.com') ||
        parsed.hostname.endsWith('.githubusercontent.com'))
    );
  } catch {
    return false;
  }
}

function detectFileType(name: string, contentType: string): NormalizedAsset['fileType'] {
  const lower = name.toLowerCase();
  if (lower.endsWith('.apk') || contentType === 'application/vnd.android.package-archive') {
    return 'APK';
  }
  if (lower.endsWith('.exe')) return 'EXE';
  if (lower.endsWith('.msi')) return 'MSI';
  if (lower.endsWith('.zip')) return 'ZIP';
  return 'OTHER';
}

function sanitizeAsset(raw: RawGitHubAsset): NormalizedAsset | null {
  if (!raw || typeof raw !== 'object') return null;
  if (raw.state && raw.state !== 'uploaded') return null;

  const id = typeof raw.id === 'number' ? raw.id : 0;
  const name = typeof raw.name === 'string' ? raw.name.trim() : '';
  const sizeBytes = typeof raw.size === 'number' && raw.size >= 0 ? raw.size : 0;
  const contentType = typeof raw.content_type === 'string' ? raw.content_type : 'application/octet-stream';
  const browserDownloadUrl =
    typeof raw.browser_download_url === 'string' ? raw.browser_download_url.trim() : '';

  if (!name || !browserDownloadUrl || !isTrustedGitHubUrl(browserDownloadUrl)) {
    return null;
  }

  let sha256: string | undefined;
  if (typeof raw.digest === 'string' && raw.digest.startsWith('sha256:')) {
    sha256 = raw.digest.slice('sha256:'.length);
  }

  const updatedAt = typeof raw.updated_at === 'string' ? raw.updated_at : '';
  const fileType = detectFileType(name, contentType);

  return {
    id,
    name,
    sizeBytes,
    formattedSize: formatBytes(sizeBytes),
    contentType,
    browserDownloadUrl,
    fileType,
    sha256,
    updatedAt
  };
}

function selectPrimaryAsset(assets: NormalizedAsset[], platform: AppConfig['platform']): NormalizedAsset | null {
  if (assets.length === 0) return null;
  if (platform === 'Android') {
    const apk = assets.find((asset) => asset.fileType === 'APK');
    if (apk) return apk;
  }
  if (platform === 'Windows') {
    const win = assets.find((asset) => asset.fileType === 'EXE' || asset.fileType === 'MSI');
    if (win) return win;
  }
  return assets[0];
}

function sanitizeRelease(raw: RawGitHubRelease, platform: AppConfig['platform']): NormalizedRelease | null {
  if (!raw || typeof raw !== 'object') return null;

  const isDraft = Boolean(raw.draft);
  // Exclude drafts completely from public view
  if (isDraft) return null;

  const id = typeof raw.id === 'number' ? raw.id : Date.now();
  const tagName = typeof raw.tag_name === 'string' ? raw.tag_name.trim() : '';
  if (!tagName) return null;

  const version = normalizeVersion(tagName);
  const name =
    typeof raw.name === 'string' && raw.name.trim().length > 0 ? raw.name.trim() : `${tagName}`;
  const body = typeof raw.body === 'string' ? raw.body : '';
  const publishedAt =
    typeof raw.published_at === 'string' && raw.published_at
      ? raw.published_at
      : typeof raw.created_at === 'string'
        ? raw.created_at
        : '';
  const createdAt = typeof raw.created_at === 'string' ? raw.created_at : publishedAt;
  const isPrerelease = Boolean(raw.prerelease);
  const htmlUrl =
    typeof raw.html_url === 'string' && isTrustedGitHubUrl(raw.html_url) ? raw.html_url : '';

  const rawAssets = Array.isArray(raw.assets) ? raw.assets : [];
  const assets: NormalizedAsset[] = rawAssets
    .map((item) => sanitizeAsset(item as RawGitHubAsset))
    .filter((item): item is NormalizedAsset => item !== null);

  const primaryAsset = selectPrimaryAsset(assets, platform);

  return {
    id,
    tagName,
    version,
    name,
    body,
    publishedAt,
    createdAt,
    isPrerelease,
    isDraft,
    htmlUrl,
    assets,
    primaryAsset
  };
}

function sortReleasesByDate(releases: NormalizedRelease[]): NormalizedRelease[] {
  return [...releases].sort((a, b) => {
    const timeA = new Date(a.publishedAt || a.createdAt).getTime() || 0;
    const timeB = new Date(b.publishedAt || b.createdAt).getTime() || 0;
    return timeB - timeA;
  });
}

function buildResult(
  releases: NormalizedRelease[],
  source: RepoReleasesResult['source'],
  errorMessage: string | null = null,
  rateLimited = false
): RepoReleasesResult {
  const sorted = sortReleasesByDate(releases);
  const stableReleases = sorted.filter((r) => !r.isPrerelease && !r.isDraft);
  return {
    releases: sorted,
    stableReleases,
    latestStableRelease: stableReleases[0] ?? null,
    latestRelease: sorted[0] ?? null,
    source,
    errorMessage,
    rateLimited,
    fetchedAt: new Date().toISOString()
  };
}

export async function fetchAppReleases(
  app: AppConfig,
  options?: { forceRefresh?: boolean }
): Promise<RepoReleasesResult> {
  const cacheKey = `${CACHE_KEY_PREFIX}${app.repositoryOwner}_${app.repositoryName}`;

  if (!options?.forceRefresh) {
    try {
      const cachedRaw = sessionStorage.getItem(cacheKey);
      if (cachedRaw) {
        const parsed = JSON.parse(cachedRaw) as {
          timestamp: number;
          releases: NormalizedRelease[];
        };
        if (
          parsed &&
          typeof parsed.timestamp === 'number' &&
          Date.now() - parsed.timestamp < CACHE_TTL_MS &&
          Array.isArray(parsed.releases)
        ) {
          return buildResult(parsed.releases, 'cache');
        }
      }
    } catch {
      // Ignore storage access errors
    }
  }

  const endpoint = `https://api.github.com/repos/${encodeURIComponent(
    app.repositoryOwner
  )}/${encodeURIComponent(app.repositoryName)}/releases`;

  try {
    const response = await fetch(endpoint, {
      headers: {
        Accept: 'application/vnd.github+json'
      }
    });

    if (!response.ok) {
      const isRateLimit =
        response.status === 403 ||
        response.status === 429 ||
        response.headers.get('x-ratelimit-remaining') === '0';

      const reason = isRateLimit
        ? 'GitHub API rate limit reached. Showing verified release snapshot.'
        : `GitHub API returned status ${response.status}. Showing verified release snapshot.`;

      return buildResult(app.fallbackReleases, 'fallback', reason, isRateLimit);
    }

    const data: unknown = await response.json();
    if (!Array.isArray(data)) {
      return buildResult(
        app.fallbackReleases,
        'fallback',
        'Unexpected response format from GitHub API.'
      );
    }

    const sanitizedReleases = data
      .map((item) => sanitizeRelease(item as RawGitHubRelease, app.platform))
      .filter((item): item is NormalizedRelease => item !== null);

    try {
      sessionStorage.setItem(
        cacheKey,
        JSON.stringify({
          timestamp: Date.now(),
          releases: sanitizedReleases
        })
      );
    } catch {
      // Ignore quota errors
    }

    return buildResult(sanitizedReleases, 'live');
  } catch {
    return buildResult(
      app.fallbackReleases,
      'fallback',
      'Unable to connect to GitHub API. Showing verified release snapshot.'
    );
  }
}
