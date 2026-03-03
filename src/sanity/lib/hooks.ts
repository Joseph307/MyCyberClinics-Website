"use client";

import { useEffect, useState } from "react";
import {
  fallbackBlogArticles,
  fallbackSiteSettings,
  fetchBlogArticles,
  fetchSiteSettingsContent,
  type BlogArticle,
  type SiteSettingsContent,
} from "./content";

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettingsContent>(fallbackSiteSettings);

  useEffect(() => {
    let isMounted = true;

    void fetchSiteSettingsContent().then((nextSettings) => {
      if (isMounted) {
        setSettings(nextSettings);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return settings;
}

export function useBlogArticles(limit = 12) {
  const [articles, setArticles] = useState<BlogArticle[]>(
    fallbackBlogArticles.slice(0, limit),
  );

  useEffect(() => {
    let isMounted = true;

    void fetchBlogArticles(limit).then((nextArticles) => {
      if (isMounted) {
        setArticles(nextArticles);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [limit]);

  return articles;
}
