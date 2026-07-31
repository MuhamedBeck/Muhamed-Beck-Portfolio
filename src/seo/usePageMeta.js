import { useEffect } from "react";
import { DEFAULT_ROBOTS, SITE_URL } from "./routes.meta.js";

const setMetaByName = (name, content) => {
  const el = document.querySelector(`meta[name="${name}"]`);
  if (el) el.setAttribute("content", content);
};

const setMetaByProperty = (property, content) => {
  const el = document.querySelector(`meta[property="${property}"]`);
  if (el) el.setAttribute("content", content);
};

/**
 * Updates the existing head tags (title, description, canonical, Open Graph,
 * Twitter) on client-side navigation. Mutates the tags rendered in index.html
 * instead of adding new ones, so no duplicate metadata is ever emitted.
 *
 * @param {{ path?: string, title: string, description: string, robots?: string, lang?: string }} meta
 *   `path` is the route path used for canonical/og:url; when omitted (e.g. on
 *   the 404 page) the current pathname is used, so the page is self-canonical
 *   instead of wrongly claiming to be the homepage.
 */
export function usePageMeta({ path, title, description, robots = DEFAULT_ROBOTS, lang = "en" }) {
  useEffect(() => {
    const url = `${SITE_URL}${path ?? window.location.pathname}`;
    document.documentElement.lang = lang;
    document.title = title;
    setMetaByName("title", title);
    setMetaByName("description", description);
    setMetaByName("robots", robots);
    setMetaByProperty("og:title", title);
    setMetaByProperty("og:description", description);
    setMetaByName("twitter:title", title);
    setMetaByName("twitter:description", description);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);
    setMetaByProperty("og:url", url);
    setMetaByName("twitter:url", url);
  }, [path, title, description, robots, lang]);
}
