import { useEffect, useState } from "react";
import { sperreScrollen } from "./scrollSperre";

/**
 * Decides whether the first-visit splash screen runs, and locks scrolling while
 * it does.
 *
 * This lived inline in App.jsx, which is why the splash only ever appeared on
 * /en: the German homepage renders through Startseite.jsx and never had the
 * logic. Both pages now share it.
 *
 * Two constraints the implementation has to respect:
 *
 * During the build-time render there is no window, so the splash must resolve
 * to "already loaded". Otherwise the prerendered HTML would carry the splash
 * and a crawler would read "Loading Portfolio" instead of the page.
 *
 * The flag lives in sessionStorage, so the splash runs once per tab rather than
 * on every navigation. The privacy policy documents exactly this one key.
 *
 * Since 07.11.2026 it also belongs only to arriving: it runs when the homepage
 * is the page the tab opened on. Before, a visitor who came in on a guide and
 * then clicked the logo met "Loading Portfolio" in the middle of the visit,
 * over a homepage that was already there. And a browser with site data
 * switched off throws on sessionStorage, which during render left the
 * homepage blank; that now counts as "seen before".
 *
 * @returns {{ showSplash: boolean, isLoaded: boolean, onSplashDone: () => void }}
 */
const SCHLUESSEL = "hasVisitedPortfolio";

const schonGesehen = () => {
  try {
    return sessionStorage.getItem(SCHLUESSEL);
  } catch {
    return "true";
  }
};

const merken = () => {
  try {
    sessionStorage.setItem(SCHLUESSEL, "true");
  } catch {
    // Without storage the splash simply does not run again in this page view.
  }
};

/* Read once when the app starts, before any navigation: this module is part
   of the homepage, which is in the main bundle. */
const EINSTIEG = typeof window !== "undefined" ? window.location.pathname : null;

export function useSplashGate() {
  const isBrowser = typeof window !== "undefined";
  const hasVisitedBefore = isBrowser ? schonGesehen() : null;
  const amEinstieg = isBrowser && window.location.pathname === EINSTIEG;

  const [isLoaded, setIsLoaded] = useState(!isBrowser || !!hasVisitedBefore || !amEinstieg);
  const [showSplash] = useState(isBrowser && !hasVisitedBefore && amEinstieg);

  useEffect(() => {
    if (!hasVisitedBefore) merken();
  }, [hasVisitedBefore]);

  // Hold the page still underneath the overlay. The lock is released on
  // unmount too, so a route change cannot strand the page unscrollable.
  useEffect(() => {
    if (isLoaded) return undefined;
    return sperreScrollen();
  }, [isLoaded]);

  return { showSplash, isLoaded, onSplashDone: () => setIsLoaded(true) };
}
