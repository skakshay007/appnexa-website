export type PlatformType = 'Android' | 'Windows' | 'Web' | 'Developer Tools';

export type DirectoryCategory =
  | 'Productivity'
  | 'Music & Audio'
  | 'Utilities'
  | 'Entertainment'
  | 'Developer Tools'
  | 'Windows Software'
  | 'Web Applications'
  | 'Other';

export interface AppFeature {
  title: string;
  description: string;
  tag?: string;
}

export interface AppInstallationStep {
  stepNumber: number;
  title: string;
  description: string;
  commandOrNote?: string;
}

export interface AppScreenshot {
  id: string;
  title: string;
  caption: string;
  screenType: 'countdown' | 'presets' | 'permissions' | 'notification';
}

export interface NormalizedAsset {
  id: number;
  name: string;
  sizeBytes: number;
  formattedSize: string;
  contentType: string;
  browserDownloadUrl: string;
  fileType: 'APK' | 'EXE' | 'MSI' | 'ZIP' | 'OTHER';
  sha256?: string;
  updatedAt: string;
}

export interface NormalizedRelease {
  id: number;
  tagName: string;
  version: string;
  name: string;
  body: string;
  publishedAt: string;
  createdAt: string;
  isPrerelease: boolean;
  isDraft: boolean;
  htmlUrl: string;
  assets: NormalizedAsset[];
  primaryAsset: NormalizedAsset | null;
}

export interface AppConfig {
  id: string;
  name: string;
  slug: string;
  /** Short one-line description for cards */
  description: string;
  /** Detailed multi-paragraph overview for the application details page */
  fullDescription: string[];
  /** Identifier for custom vector icon or URL to image asset */
  icon: 'sleep-timer' | 'default-app' | string;
  /** Primary display category label shown on featured cards (e.g. "Music & Productivity") */
  category: string;
  /** Structured directory categories used for filtering & category counts */
  categories: DirectoryCategory[];
  platform: PlatformType;
  /** Default version number before live GitHub API resolves or as fallback */
  defaultVersion: string;
  /** ISO date string of initial/latest known release */
  defaultReleaseDate: string;
  repositoryOwner: string;
  repositoryName: string;
  featured: boolean;
  minAndroidVersion?: string;
  targetAndroidVersion?: string;
  packageName?: string;
  architecture?: string;
  license?: string;
  techStack?: string[];
  features: AppFeature[];
  installationInstructions: AppInstallationStep[];
  screenshots: AppScreenshot[];
  /** Verified snapshot of published GitHub releases used only if GitHub API is unreachable */
  fallbackReleases: NormalizedRelease[];
}

export interface CategoryInfo {
  id: DirectoryCategory;
  name: DirectoryCategory;
  shortDescription: string;
  iconName: string;
  isPlatformCategory?: boolean;
}
