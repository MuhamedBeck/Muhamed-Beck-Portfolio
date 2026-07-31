import { RevealOnScroll } from "../RevealOnScroll";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import profilePicture from "../../assets/profilepicture.webp";
import { useState, useEffect } from "react";

export const Home = ({ isLoaded = true }) => {
  const [showImage, setShowImage] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showSocials, setShowSocials] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      // Reset all states when loading
      setShowImage(false);
      setShowBackground(false);
      setShowTitle(false);
      setShowDescription(false);
      setShowSocials(false);
      setShowButtons(false);
      return;
    }

    // Start animations when loading is complete - faster timing
    const imageTimer = setTimeout(() => setShowImage(true), 100);
    const backgroundTimer = setTimeout(() => setShowBackground(true), 150);
    const titleTimer = setTimeout(() => setShowTitle(true), 600);
    const descTimer = setTimeout(() => setShowDescription(true), 800);
    const socialTimer = setTimeout(() => setShowSocials(true), 1000);
    const buttonTimer = setTimeout(() => setShowButtons(true), 1200);

    return () => {
      clearTimeout(imageTimer);
      clearTimeout(backgroundTimer);
      clearTimeout(titleTimer);
      clearTimeout(descTimer);
      clearTimeout(socialTimer);
      clearTimeout(buttonTimer);
    };
  }, [isLoaded]);

  return (
    <>
      <style jsx>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-x-hidden">
      
      <RevealOnScroll>
        <div className="text-center px-4 w-full max-w-4xl mx-auto">
          
          {/* Profile Picture */}
          <div className={`relative mb-4 mt-20 sm:mt-14 md:mt-16 flex justify-center transition-all duration-700 ease-out ${
            showImage ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-98'
          }`} style={{ willChange: 'transform, opacity' }}>
            <div className="relative group">
              {/* Animated gradient background */}
              <div 
                className={`absolute -inset-12 blur-2xl transition-all duration-800 ease-out ${
                  showBackground ? 'opacity-40 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{
                  background: 'linear-gradient(-45deg, rgba(59, 130, 246, 0.12), rgba(34, 211, 238, 0.08), rgba(79, 70, 229, 0.12))',
                  backgroundSize: '300% 300%',
                  animation: showBackground ? 'gradientMove 15s ease infinite' : 'none',
                  transform: 'translateZ(0)',
                  willChange: 'background-position'
                }}
              ></div>
              
              {/* Main profile container - larger size */}
              <div className="relative">
                <div className="relative w-60 h-72 sm:w-72 sm:h-84 md:w-80 md:h-96">
                  {/* Animated outer glow */}
                  <div 
                    className={`absolute -inset-3 transition-all duration-600 ease-out delay-100 ${
                      showBackground ? 'opacity-40 scale-100' : 'opacity-0 scale-98'
                    }`}
                    style={{
                      background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(34, 211, 238, 0.15), rgba(79, 70, 229, 0.2))',
                      borderRadius: '28px',
                      filter: 'blur(6px)',
                      transform: 'translateZ(0)',
                      willChange: 'transform'
                    }}
                  ></div>
                  
                  {/* Optimized glass morphism container */}
                  <div 
                    className="relative w-full h-full overflow-hidden transition-all duration-500 ease-out"
                    style={{
                      borderRadius: '24px',
                      boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.15)',
                      background: 'linear-gradient(150deg, rgba(59, 130, 246, 0.14) 0%, rgba(34, 211, 238, 0.11) 50%, rgba(79, 70, 229, 0.16) 100%)',
                      backdropFilter: 'blur(2px) saturate(1.2)',
                      transform: 'translateZ(0)',
                      willChange: 'transform'
                    }}
                  >
                    <img
                      src={profilePicture}
                      alt="Muhamed Nur Beck"
                      className="w-full h-full object-cover"
                      style={{
                        objectPosition: 'center 20%',
                        borderRadius: '24px',
                        filter: 'brightness(115%) contrast(106%) saturate(105%)',
                        transform: 'translateZ(0)',
                        willChange: 'transform'
                      }}
                      loading="eager"
                      decoding="async"
                    />
                    {/* Professional gradient overlays */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 via-65% to-transparent"
                      style={{ borderRadius: '24px', willChange: 'transform' }}
                    ></div>
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-blue-500/18 via-transparent to-cyan-400/22"
                      style={{ borderRadius: '24px', willChange: 'transform' }}
                    ></div>
                    <div 
                      className="absolute inset-0 bg-gradient-to-tl from-indigo-600/12 via-transparent to-blue-400/15"
                      style={{ borderRadius: '24px', willChange: 'transform' }}
                    ></div>
                    
                    {/* Optimized light reflection */}
                    <div 
                      className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-25"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 30%)',
                        borderRadius: '24px',
                        mixBlendMode: 'overlay'
                      }}
                    ></div>
                  </div>
                  
                  {/* Professional multi-layer borders */}
                  <div 
                    className="absolute -inset-px border border-white/25 opacity-70"
                    style={{ borderRadius: '24px', willChange: 'transform' }}
                  ></div>
                  <div 
                    className="absolute -inset-px border border-cyan-400/50 opacity-80"
                    style={{ borderRadius: '24px', willChange: 'transform' }}
                  ></div>
                  <div 
                    className="absolute -inset-1 border border-blue-500/30 opacity-40"
                    style={{ borderRadius: '25px', filter: 'blur(1px)', willChange: 'transform' }}
                  ></div>
                </div>
                
                {/* Animated premium accent lights */}
                <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 w-18 h-1.5 bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent transition-all duration-500 ease-out delay-300 ${
                  showBackground ? 'opacity-100 animate-pulse' : 'opacity-0'
                }`} style={{ animationDuration: showBackground ? '4s' : '0s', willChange: 'opacity', filter: 'blur(2px)' }}></div>
                <div className={`absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-22 h-1.5 bg-gradient-to-r from-transparent via-blue-500/70 to-transparent transition-all duration-500 ease-out delay-400 ${
                  showBackground ? 'opacity-100 animate-pulse' : 'opacity-0'
                }`} style={{ animationDuration: showBackground ? '5s' : '0s', animationDelay: showBackground ? '1s' : '0s', willChange: 'opacity', filter: 'blur(2px)' }}></div>
                <div className={`absolute -left-3 top-1/2 transform -translate-y-1/2 w-1.5 h-18 bg-gradient-to-b from-transparent via-indigo-400/60 to-transparent transition-all duration-500 ease-out delay-500 ${
                  showBackground ? 'opacity-100 animate-pulse' : 'opacity-0'
                }`} style={{ animationDuration: showBackground ? '6s' : '0s', animationDelay: showBackground ? '2s' : '0s', willChange: 'opacity', filter: 'blur(2px)' }}></div>
                <div className={`absolute -right-3 top-1/2 transform -translate-y-1/2 w-1.5 h-22 bg-gradient-to-b from-transparent via-cyan-300/60 to-transparent transition-all duration-500 ease-out delay-600 ${
                  showBackground ? 'opacity-100 animate-pulse' : 'opacity-0'
                }`} style={{ animationDuration: showBackground ? '4.5s' : '0s', animationDelay: showBackground ? '0.5s' : '0s', willChange: 'opacity', filter: 'blur(2px)' }}></div>
              </div>
            </div>
          </div>

          {/* Animated 3D background extension */}
          <div className={`absolute top-80 sm:top-96 md:top-[28rem] left-1/2 transform -translate-x-1/2 w-40 h-32 sm:w-48 sm:h-36 md:w-56 md:h-40 opacity-12 -z-10 transition-all duration-700 ease-out delay-200 ${
            showBackground ? 'opacity-12 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-98'
          }`} style={{ willChange: 'transform, opacity' }}>
            <div 
              className="w-full h-full overflow-hidden"
              style={{
                clipPath: 'polygon(25% 0%, 75% 0%, 90% 100%, 10% 100%)',
                background: 'linear-gradient(180deg, rgba(59, 130, 246, 0.08) 0%, rgba(34, 211, 238, 0.04) 100%)',
                willChange: 'transform'
              }}
            >
              <img
                src={profilePicture}
                alt=""
                className="w-full h-full object-cover object-bottom"
                style={{
                  transform: 'scale(1.15) translateY(-55%)',
                  transformOrigin: 'center bottom',
                  filter: 'brightness(85%) contrast(110%) blur(0.5px)',
                  willChange: 'transform'
                }}
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent"></div>
            </div>
          </div>

          {/* Animated Text Content */}
          <div className="relative z-20">
          <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent leading-tight transition-all duration-600 ease-out ${
            showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`} style={{ willChange: 'transform, opacity' }}>
            Hi, I'm Muhamed Nur Beck
          </h1>
          <p className={`text-gray-400 text-base sm:text-lg mb-8 max-w-lg mx-auto px-2 transition-all duration-600 ease-out ${
            showDescription ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`} style={{ willChange: 'transform, opacity' }}>
            AI Automation Manager & Full-Stack Developer based in Frankfurt.
            I build production-ready AI pipelines with OpenAI, Claude & OpenClaw,
            automate workflows with n8n & Zapier, and craft scalable web
            applications with React, Angular & Spring Boot.
          </p>

          {/* Animated Social Links */}
          <div className={`flex justify-center items-center gap-6 mb-8 transition-all duration-600 ease-out ${
            showSocials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`} style={{ willChange: 'transform, opacity' }}>
            <a
              href="https://www.linkedin.com/in/muhamed-nur-beck"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 bg-transparent focus:outline-none transition-all duration-300"
              aria-label="Connect on LinkedIn">
              <FaLinkedin className="w-8 h-8 hover:text-blue-400 hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300" />
            </a>
            <a
              href="https://www.github.com/MuhamedBeck"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 bg-transparent focus:outline-none transition-all duration-300"
              aria-label="View GitHub profile">
              <FaGithub className="w-8 h-8 hover:text-cyan-400 hover:scale-110 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300" />
            </a>
            <a
              href="mailto:m.nur.beck@hotmail.de"
              className="text-gray-400 bg-transparent focus:outline-none transition-all duration-300"
              aria-label="Send email">
              <FaEnvelope className="w-8 h-8 hover:text-green-400 hover:scale-110 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-300" />
            </a>
          </div>

          <div className={`flex flex-col sm:flex-row justify-center items-center gap-4 sm:space-x-4 px-4 transition-all duration-600 ease-out ${
            showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`} style={{ willChange: 'transform, opacity' }}>
            <a
              href="#projects"
              className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:from-blue-500 hover:via-blue-600 hover:to-indigo-600 text-center group cursor-pointer"
              aria-label="View featured projects section">
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg
                  className="w-4 h-4 transition-transform group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                Explore Projects
              </span>
            </a>
            <a
              href="#contact"
              className="border border-blue-500 text-blue-500 py-3 px-6 rounded font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:bg-blue-500/10 text-center group flex items-center justify-center gap-2 cursor-pointer"
              aria-label="Go to contact section">
              <svg
                className="w-4 h-4 transition-transform group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Contact Me
            </a>
          </div>
          </div>
        </div>
      </RevealOnScroll>
      </section>
    </>
  );
};
