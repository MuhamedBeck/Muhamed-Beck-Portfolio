import { useEffect, useState } from "react";
import mnbLogo from "../assets/MNB_Logo.webp";

/**
 * First-visit splash screen.
 *
 * This is the one place on the site that keeps the gradient wordmark, the
 * gradient progress bar and the drifting accent dots, and it keeps them on
 * purpose. A splash is a self-contained moment before the site rather than a
 * page in it: it has no content to compete with, it is shown once per session,
 * and its whole job is to be pleasant while something loads. The editorial
 * restraint the pages follow exists so content can lead, and here there is no
 * content yet.

 * The one thing it was missing is a reduced-motion path. Four pulsing dots,
 * three bouncing dots and a typewriter caret are exactly what WCAG 2.3.3 asks
 * you to drop for someone who has asked the OS for less motion.
 */
export const LoadingScreen = ({ onComplete }) => {
  const [text, setText] = useState("");
  const [showSubtext, setShowSubtext] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const fullText = "<Hello World/>";
  const subText = "Welcome to Muhamed Nur Beck's Portfolio";
  const techStack = [
    "Angular",
    "React",
    "Spring Boot",
    "Java",
    "n8n & Zapier",
    "Claude AI",
    "AI Automation",
  ];

  // Splash timing. The text is typed quickly so it is readable early, then the
  // screen holds long enough to actually read it. Total is roughly
  // TYPING_MS + BAR_MS + FADE_MS. Keep the total under ~2.5s: it is the delay
  // before real content appears and it feeds directly into LCP and Speed Index.
  const TYPING_MS = 42; // per character, 14 characters
  const BAR_STEP_MS = 30; // progress bar tick
  const BAR_STEP = 2; // percent per tick, so 50 ticks = 1.5s
  const FADE_MS = 400;

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;

      if (index > fullText.length) {
        clearInterval(typingInterval);
        setShowSubtext(true);
      }
    }, TYPING_MS);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setFadeOut(true);
          setTimeout(() => onComplete(), FADE_MS);
          return 100;
        }
        return prev + BAR_STEP;
      });
    }, BAR_STEP_MS);

    return () => {
      clearInterval(typingInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div
      className={`loading-screen-safe z-50 bg-ink text-white flex flex-col items-center justify-center transition-opacity duration-[400ms] ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      style={{
        willChange: "opacity"
      }}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-40 animation-delay-300"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-indigo-400 rounded-full animate-pulse opacity-50 animation-delay-600"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-30 animation-delay-900"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 w-full">
        <div className="mb-8">
          <div className="flex justify-center mb-8">
            <img src={mnbLogo} alt="MNB Logo" width="500" height="500" className="h-28 w-auto opacity-90" />
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-light tracking-wider mb-4 whitespace-nowrap">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              {text}
            </span>
            <span className="animate-pulse text-cyan-400 ml-2">|</span>
          </h1>

          <div
            className={`transition-all duration-500 ${
              showSubtext
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light tracking-wide mb-8 px-2">
              {subText}
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {techStack.map((tech, index) => (
                <span
                  key={tech}
                  className={`px-4 py-2 text-sm border border-white/20 rounded-full bg-white/5 backdrop-blur-sm transition-all duration-[400ms] hover:border-blue-400/50 ${
                    showSubtext
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 55}ms` }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full max-w-lg mx-auto">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-400 font-light">
              Loading Portfolio
            </span>
            <span className="text-sm text-accent font-mono">{progress}%</span>
          </div>

          <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 rounded-full shadow-lg transition-all duration-200 ease-out"
              style={{
                width: `${progress}%`,
                boxShadow: "0 0 15px rgba(59, 130, 246, 0.4)",
                transform: "translateZ(0)",
                willChange: "width",
              }}></div>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}></div>
            <div
              className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}></div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 splash-vignette pointer-events-none"></div>
    </div>
  );
};
