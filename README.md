# AppNexa — Independent Software & Application Distribution Platform

**Tagline:** *"Discover. Download. Experience."*

AppNexa is a modern, production-oriented software distribution platform engineered with **React 18**, **TypeScript**, **Vite**, **Tailwind CSS**, **React Router**, and **Lucide React**. It synchronizes published releases, version tags, changelogs, and downloadable APK assets directly from **GitHub Releases**.

---

## 1. Running & Building the Website Locally

### Prerequisites
- **Node.js** `v18+` (tested with Node `v24.19.0`)
- **npm** `v9+`

### Install Dependencies
```bash
npm install
```

### Start the Development Server
```bash
npm run dev
```
Open the local URL displayed in the terminal (typically `http://localhost:5173`).

### Type-Check & Build for Production
```bash
npm run build
```
This runs `tsc -b` to verify zero TypeScript errors and outputs optimized production assets into the `dist/` directory.

### Preview the Production Build Locally
```bash
npm run preview
```

---

## 2. How to Add Another Application (GitHub Releases Integration)

All applications are managed through a single centralized configuration file at [`src/config/apps.ts`](src/config/apps.ts). You do **not** need to duplicate page templates or route components.

1. Open [`src/config/apps.ts`](src/config/apps.ts).
2. Append a new `AppConfig` object to the `APPLICATIONS` array:
   ```ts
   {
     id: 'your-new-app-id',
     name: 'Your Application Name',
     slug: 'your-new-app-slug',
     description: 'One-sentence summary shown on application cards.',
     fullDescription: [
       'Detailed first paragraph for the Application Details page.',
       'Detailed second paragraph describing architecture and capabilities.'
     ],
     icon: 'default-app', // Or a custom SVG key / '/icons/your-app.svg' URL
     category: 'Utilities',
     categories: ['Utilities'], // Matches DIRECTORY_CATEGORY_LIST & CATEGORY_EXPLORER_ITEMS
     platform: 'Android', // 'Android' | 'Windows' | 'Web' | 'Developer Tools'
     defaultVersion: '1.0.0',
     defaultReleaseDate: '2026-10-28T00:00:00Z',
     repositoryOwner: 'skakshay007',
     repositoryName: 'Your-GitHub-Repo-Name',
     featured: true,
     minAndroidVersion: 'Android 8.0+ (API 26+)',
     features: [
       { title: 'Feature Title', description: 'Feature description.', tag: 'Core' }
     ],
     installationInstructions: [
       { stepNumber: 1, title: 'Download APK', description: 'Download from the release asset button.' }
     ],
     screenshots: [],
     fallbackReleases: []
   }
   ```
3. Once added:
   - **GitHub Releases Service** ([`src/services/githubReleases.ts`](src/services/githubReleases.ts)) automatically fetches `https://api.github.com/repos/{repositoryOwner}/{repositoryName}/releases`.
   - **Featured Applications**, **All Apps Directory** (`/apps`), **Application Details** (`/apps/{slug}`), **Latest Releases** (`/releases`), and **Category Counts** (`/categories`) automatically update.

---

## 3. Deploying to a Hosting Provider

AppNexa compiles to a static Single-Page Application (SPA) in `dist/` and includes SPA routing rules in both [`vercel.json`](vercel.json) and [`public/_redirects`](public/_redirects).

### Option A: Deploy to Vercel
1. Push this project to a GitHub repository.
2. Import the repository in Vercel.
3. Configure build settings:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. *(Optional)* Add environment variables (`VITE_SITE_URL`, `VITE_CONTACT_ENDPOINT`) in Vercel Project Settings.

### Option B: Deploy to Netlify or Cloudflare Pages
1. Connect your repository to Netlify or Cloudflare Pages.
2. Set:
   - **Build Command:** `npm run build`
   - **Publish / Output Directory:** `dist`
3. [`public/_redirects`](public/_redirects) is automatically copied into `dist/_redirects` to handle client-side routes such as `/apps/universal-music-sleep-timer`.
