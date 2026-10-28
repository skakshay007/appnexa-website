import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReleasesProvider } from './context/ReleasesContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { AllAppsPage } from './pages/AllAppsPage';
import { AppDetailsPage } from './pages/AppDetailsPage';
import { LatestReleasesPage } from './pages/LatestReleasesPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';

export const App: React.FC = () => {
  return (
    <ReleasesProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#0B0F14] text-[#F5F7FA]">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/apps" element={<AllAppsPage />} />
              <Route path="/apps/:slug" element={<AppDetailsPage />} />
              <Route path="/releases" element={<LatestReleasesPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="*" element={<AllAppsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ReleasesProvider>
  );
};

export default App;
