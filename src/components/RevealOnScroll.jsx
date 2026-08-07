import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * Arms the entrance animations inside it once it scrolls into view.
 *
 * Adds `is-ready`, which is the class the `.stagger` and `.reveal-line` rules
 * in index.css key off. Nothing is hidden until that class is present, so a
 * visitor without JavaScript, or one whose observer never fires, sees the
 * content rather than an empty page. The prerendered HTML is unaffected either
 * way, since effects do not run during the build-time render.
 *
 * `legacy` keeps the older `.reveal` fade for pages that have not been moved to
 * the stagger system yet.
 */
export const RevealOnScroll = ({ children, legacy = false }) => {
  const ref = useRef(null);

  // Content already on screen has to paint on the first frame. `.reveal` starts
  // at opacity 0, and Chrome does not accept a fully transparent element as a
  // Largest Contentful Paint candidate, so fading the hero in would leave the
  // page with no measurable LCP at all.
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    const { top, bottom } = node.getBoundingClientRect();
    if (top < window.innerHeight && bottom > 0) {
      node.classList.add(legacy ? "instant" : "is-ready");
    }
  }, [legacy]);

  useEffect(() => {
    const node = ref.current;
    if (!node || node.classList.contains("instant") || node.classList.contains("is-ready")) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add(legacy ? "visible" : "is-ready");
          // Reveal is one-way, so stop observing once it has fired.
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px 50px 0px" }
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, [legacy]);

  return (
    <div ref={ref} className={legacy ? "reveal" : undefined}>
      {children}
    </div>
  );
};
