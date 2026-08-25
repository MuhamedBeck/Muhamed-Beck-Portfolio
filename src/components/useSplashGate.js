import { useEffect, useState } from "react";

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
 * @returns {{ showSplash: boolean, isLoaded: boolean, onSplashDone: () => void }}
 */
export function useSplashGate() {
  const isBrowser = typeof window !== "undefined";
  const hasVisitedBefore = isBrowser
    ? sessionStorage.getItem("hasVisitedPortfolio")
    : null;

  const [isLoaded, setIsLoaded] = useState(!isBrowser || !!hasVisitedBefore);
  const [showSplash] = useState(isBrowser && !hasVisitedBefore);

  useEffect(() => {
    if (!hasVisitedBefore) {
      sessionStorage.setItem("hasVisitedPortfolio", "true");
    }
  }, [hasVisitedBefore]);

  // Hold the page still underneath the overlay, and always hand scrolling back
  // on unmount so a route change cannot strand the body in overflow: hidden.
  useEffect(() => {
    document.body.style.overflow = isLoaded ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoaded]);

  return { showSplash, isLoaded, onSplashDone: () => setIsLoaded(true) };
}
