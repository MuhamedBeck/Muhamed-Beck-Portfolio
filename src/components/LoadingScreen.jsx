import { useEffect, useState } from "react";

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
    "AI",
    "Digital Marketing",
  ];

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;

      if (index > fullText.length) {
        clearInterval(typingInterval);
        setTimeout(() => setShowSubtext(true), 400);
      }
    }, 60);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => onComplete(), 1000);
          }, 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => {
      clearInterval(typingInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col items-center justify-center transition-opacity duration-800 overflow-x-hidden ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-40 animation-delay-300"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-indigo-400 rounded-full animate-pulse opacity-50 animation-delay-600"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-30 animation-delay-900"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 w-full">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-light tracking-wider mb-4 whitespace-nowrap">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              {text}
            </span>
            <span className="animate-pulse text-cyan-400 ml-2">|</span>
          </h1>

          <div
            className={`transition-all duration-1000 ${
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
                  className={`px-4 py-2 text-sm border border-white/20 rounded-full bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-blue-400/50 ${
                    showSubtext
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 100 + 300}ms` }}>
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
            <span className="text-sm text-blue-400 font-mono">{progress}%</span>
          </div>

          <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 rounded-full shadow-lg transition-all duration-300 ease-out"
              style={{
                width: `${progress}%`,
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
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

      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30 pointer-events-none"></div>
    </div>
  );
};
