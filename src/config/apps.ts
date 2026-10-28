import { AppConfig, CategoryInfo, DirectoryCategory } from '../types/app';

/**
 * Centralized Application Registry for AppNexa.
 *
 * To add a new application to the platform:
 * 1. Append a new AppConfig entry to the APPLICATIONS array below.
 * 2. Configure repositoryOwner and repositoryName for automatic GitHub Releases & APK synchronization.
 * 3. All pages (Home, All Apps, App Details, Latest Releases, Categories) will automatically
 *    discover and render the new application without duplicating page code.
 */
export const APPLICATIONS: AppConfig[] = [
  {
    id: 'universal-music-sleep-timer',
    name: 'Universal Music Sleep Timer',
    slug: 'universal-music-sleep-timer',
    description: 'Automatically pause music playback when your sleep timer expires.',
    fullDescription: [
      'Universal Music Sleep Timer is a native Android application built with Kotlin and Jetpack Compose (Material 3) designed to automatically pause media playback across active music players—including Spotify and YouTube Music—when your countdown expires.',
      'Engineered around Android MediaSession APIs, NotificationListenerService, and Doze-aware AlarmManager scheduling, the application operates reliably in the background even when the device screen is locked. It includes intelligent end-of-track timing, optional gradual volume fade-out with safe volume restoration, and persistent state recovery across device reboots.'
    ],
    icon: 'sleep-timer',
    category: 'Music & Productivity',
    categories: ['Music & Audio', 'Productivity'],
    platform: 'Android',
    defaultVersion: '1.0.0',
    defaultReleaseDate: '2026-10-28T17:01:37Z',
    repositoryOwner: 'skakshay007',
    repositoryName: 'Universal-Music-Sleep-Timer',
    featured: true,
    minAndroidVersion: 'Android 8.0+ (API 26+) · Android 12+ recommended for Exact Alarms',
    targetAndroidVersion: 'Android 14 (API 34)',
    packageName: 'com.universalsleeptimer',
    architecture: 'Universal APK (ARM64 / ARMv7 / x86_64)',
    techStack: [
      'Kotlin',
      'Jetpack Compose (Material 3)',
      'Android MediaSession API',
      'AlarmManager',
      'Jetpack DataStore'
    ],
    features: [
      {
        title: 'Dark-Mode Material 3 Interface',
        description:
          'Purpose-built low-glare dark interface crafted with Jetpack Compose for comfortable nighttime operation.',
        tag: 'UI / UX'
      },
      {
        title: 'Quick Presets & Custom Duration',
        description:
          'Start a timer immediately with 5, 10, 15, 30, 45-minute, or 1-hour presets, or configure custom hours and minutes.',
        tag: 'Timer'
      },
      {
        title: 'Intelligent End-of-Track Mode',
        description:
          'Reads live MediaMetadata duration, playback position, and playback speed to pause right as the current song finishes.',
        tag: 'Smart Mode'
      },
      {
        title: 'External MediaSession Control',
        description:
          'Targets active Spotify and YouTube Music sessions via TransportControls and verifies transition to paused state.',
        tag: 'Integration'
      },
      {
        title: 'Live Countdown & Quick +5m Extension',
        description:
          'Real-time circular countdown display with instant +5 minutes extension and one-tap cancellation.',
        tag: 'Controls'
      },
      {
        title: 'Doze-Aware Background Reliability',
        description:
          'Uses AlarmManager scheduling and Jetpack DataStore persistence so countdowns survive screen lock and app switches.',
        tag: 'System'
      },
      {
        title: 'Ongoing Notification Controls',
        description:
          'Manage active timers directly from the Android notification shade with quick +5m and Cancel actions.',
        tag: 'Notifications'
      },
      {
        title: 'Optional Smooth Volume Fade-Out',
        description:
          'Gradually lowers media stream volume before pausing and safely restores original volume afterward.',
        tag: 'Audio'
      }
    ],
    installationInstructions: [
      {
        stepNumber: 1,
        title: 'Download the APK Package',
        description:
          'Click the "Download APK" button on this page to download the latest published APK asset directly from GitHub Releases.',
        commandOrNote: 'Asset: app-debug.apk (v1.0.0 · 15.69 MB)'
      },
      {
        stepNumber: 2,
        title: 'Open & Allow Installation on Android',
        description:
          'Open the downloaded .apk file on your Android device. If prompted by Android, allow installation from your browser or file manager.',
        commandOrNote: 'Settings → Apps → Special app access → Install unknown apps'
      },
      {
        stepNumber: 3,
        title: 'Grant Notification Access (Required for Media Control)',
        description:
          'Open Universal Music Sleep Timer and tap "Enable in Settings" under Permissions & Setup Status to enable Notification Access. Android requires this service to detect and pause active third-party MediaSessions.',
        commandOrNote:
          'On Android 13+, if Android displays "Restricted setting", open Settings → Apps → Universal Music Sleep Timer → ⋮ (top-right menu) → Allow restricted settings.'
      },
      {
        stepNumber: 4,
        title: 'Verify Alarms & Notification Permissions (Recommended)',
        description:
          'Ensure "Alarms & reminders" (Android 12+) is enabled for exact Doze-mode timing and "Post notifications" (Android 13+) is allowed for ongoing countdown controls.'
      }
    ],
    screenshots: [
      {
        id: 'screen-countdown',
        title: 'Circular Countdown & Active Session Monitor',
        caption:
          'Main Home Screen displaying the active countdown ring, detected media player session, and instant +5m / Cancel controls.',
        screenType: 'countdown'
      },
      {
        id: 'screen-presets',
        title: 'Sleep Timer Preset Bottom Sheet',
        caption:
          'Modal selector with 5m, 10m, 15m, 30m, 45m, 1h presets, Custom duration picker, and End-of-track option.',
        screenType: 'presets'
      },
      {
        id: 'screen-permissions',
        title: 'Permissions, Volume Fade-Out & Diagnostics',
        caption:
          'Dedicated settings and permission status cards for NotificationListenerService, Exact Alarms, and gradual audio fade.',
        screenType: 'permissions'
      },
      {
        id: 'screen-notification',
        title: 'System Notification & Lockscreen Controls',
        caption:
          'Ongoing Android chronometer notification allowing users to extend (+5 Mins) or cancel the sleep timer without unlocking.',
        screenType: 'notification'
      }
    ],
    fallbackReleases: [
      {
        id: 426949760,
        tagName: 'v1.0.0',
        version: '1.0.0',
        name: 'Universal Music Sleep Timer v1.0.0',
        body: `## Universal Music Sleep Timer v1.0.0

Universal Music Sleep Timer is an Android application designed to help users automatically pause music playback when a sleep timer expires.

### Features
- Dark-mode user interface.
- Preset sleep timers: 5, 10, 15, 30, and 45 minutes, and 1 hour.
- Custom timer duration.
- End-of-track timer option.
- Countdown timer with remaining time display.
- Add 5 minutes to an active timer.
- Cancel the active timer.
- Background timer support.
- Notification controls for managing the timer.

### Installation
1. Download \`app-debug.apk\` from the Assets section below.
2. Open the downloaded APK on your Android device.
3. Allow installation from this source if Android requests permission.
4. Install the application and open it.

**Note:** This is an initial release. Audio-pause behavior and background functionality may vary depending on the Android version and the music app. Some features may require additional permissions.

**Package:** Android APK  
**Version:** 1.0.0`,
        publishedAt: '2026-10-28T17:01:37Z',
        createdAt: '2026-10-28T16:56:34Z',
        isPrerelease: false,
        isDraft: false,
        htmlUrl: 'https://github.com/skakshay007/Universal-Music-Sleep-Timer/releases/tag/v1.0.0',
        assets: [
          {
            id: 685702994,
            name: 'app-debug.apk',
            sizeBytes: 16449741,
            formattedSize: '15.69 MB',
            contentType: 'application/vnd.android.package-archive',
            browserDownloadUrl:
              'https://github.com/skakshay007/Universal-Music-Sleep-Timer/releases/download/v1.0.0/app-debug.apk',
            fileType: 'APK',
            sha256: '1a121ccf60886e49b89192d9a92e32ee3d8a154892bc8d2a0172924a97fa616e',
            updatedAt: '2026-10-28T17:00:42Z'
          }
        ],
        primaryAsset: {
          id: 685702994,
          name: 'app-debug.apk',
          sizeBytes: 16449741,
          formattedSize: '15.69 MB',
          contentType: 'application/vnd.android.package-archive',
          browserDownloadUrl:
            'https://github.com/skakshay007/Universal-Music-Sleep-Timer/releases/download/v1.0.0/app-debug.apk',
          fileType: 'APK',
          sha256: '1a121ccf60886e49b89192d9a92e32ee3d8a154892bc8d2a0172924a97fa616e',
          updatedAt: '2026-10-28T17:00:42Z'
        }
      }
    ]
  }
];

/**
 * Categories for the All Applications Directory filter (Section 6)
 */
export const DIRECTORY_CATEGORY_LIST: DirectoryCategory[] = [
  'Productivity',
  'Music & Audio',
  'Utilities',
  'Entertainment',
  'Developer Tools',
  'Other'
];

/**
 * Category Explorer definitions (Section 10)
 */
export const CATEGORY_EXPLORER_ITEMS: CategoryInfo[] = [
  {
    id: 'Productivity',
    name: 'Productivity',
    shortDescription: 'Focused utilities and time-management tools designed to streamline daily routines.',
    iconName: 'Timer'
  },
  {
    id: 'Music & Audio',
    name: 'Music & Audio',
    shortDescription: 'Playback controllers, sleep timers, and companion tools for audio streaming apps.',
    iconName: 'Headphones'
  },
  {
    id: 'Utilities',
    name: 'Utilities',
    shortDescription: 'Lightweight system helpers and automation tools built for everyday device control.',
    iconName: 'Wrench'
  },
  {
    id: 'Entertainment',
    name: 'Entertainment',
    shortDescription: 'Media companions and interactive experiences crafted with clean interfaces.',
    iconName: 'Sparkles'
  },
  {
    id: 'Developer Tools',
    name: 'Developer Tools',
    shortDescription: 'Inspection utilities, debugging helpers, and workflow tools for software engineers.',
    iconName: 'Terminal'
  },
  {
    id: 'Windows Software',
    name: 'Windows Software',
    shortDescription: 'Native desktop utilities and standalone applications engineered for Windows.',
    iconName: 'Monitor',
    isPlatformCategory: true
  },
  {
    id: 'Web Applications',
    name: 'Web Applications',
    shortDescription: 'Browser-accessible tools and instant-launch web software requiring zero installation.',
    iconName: 'Globe',
    isPlatformCategory: true
  }
];

export function getAppBySlug(slug: string): AppConfig | undefined {
  return APPLICATIONS.find((app) => app.slug === slug);
}

export function getRepositoryUrl(app: AppConfig): string {
  return `https://github.com/${app.repositoryOwner}/${app.repositoryName}`;
}

export function getReleasesPageUrl(app: AppConfig): string {
  return `https://github.com/${app.repositoryOwner}/${app.repositoryName}/releases`;
}

export function getCategoryAppCount(categoryId: DirectoryCategory): number {
  if (categoryId === 'Windows Software') {
    return APPLICATIONS.filter((app) => app.platform === 'Windows').length;
  }
  if (categoryId === 'Web Applications') {
    return APPLICATIONS.filter((app) => app.platform === 'Web').length;
  }
  return APPLICATIONS.filter((app) => app.categories.includes(categoryId)).length;
}
