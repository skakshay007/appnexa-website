import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title: string;
  description: string;
  ogType?: 'website' | 'article' | 'product';
}

/**
 * Dynamically updates document title, meta description, Open Graph metadata,
 * and canonical URL (only when VITE_SITE_URL is configured in environment).
 */
export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  ogType = 'website'
}) => {
  const location = useLocation();

  useEffect(() => {
    const fullTitle = title.includes('AppNexa') ? title : `${title} | AppNexa`;
    document.title = fullTitle;

    const setMetaTag = (selector: string, attrName: string, attrValue: string, content: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMetaTag('meta[name="description"]', 'name', 'description', description);
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);

    // Only emit a canonical link if a real production domain is configured via VITE_SITE_URL
    const configuredSiteUrl = import.meta.env.VITE_SITE_URL as string | undefined;
    let canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (configuredSiteUrl && configuredSiteUrl.trim().startsWith('http')) {
      const base = configuredSiteUrl.trim().replace(/\/+$/, '');
      const canonicalHref = `${base}${location.pathname}`;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonicalHref);
    } else if (canonicalLink) {
      canonicalLink.remove();
    }
  }, [title, description, ogType, location.pathname]);

  return null;
};
