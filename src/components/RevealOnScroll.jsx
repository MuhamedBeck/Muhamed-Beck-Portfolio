import { useEffect, useLayoutEffect, useRef } from "react";

export const RevealOnScroll = ({ children }) => {
  const ref = useRef(null);

  // Content that is already on screen must paint opaque on the very first
  // frame. `.reveal` starts at opacity 0, and Chrome does not accept a
  // fully transparent element as a Largest Contentful Paint candidate, so
  // animating the hero in would leave the page with no measurable LCP.
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    const { top, bottom } = node.getBoundingClientRect();
    if (top < window.innerHeight && bottom > 0) {
      node.classList.add("instant");
    }
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node || node.classList.contains("instant")) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("visible");
          // Reveal is one-way, so stop observing once it has fired.
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px 50px 0px" }
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="reveal">
      {children}
    </div>
  );
};
