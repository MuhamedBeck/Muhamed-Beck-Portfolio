import { RevealOnScroll } from "../RevealOnScroll";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import profilePicture from "../../assets/profilepicture.png";

export const Home = () => {
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
          <div className="relative mb-4 mt-20 sm:mt-14 md:mt-16 flex justify-center">
            <div className="relative group">
              {/* Animated gradient background */}
              <div 
                className="absolute -inset-16 blur-3xl opacity-60"
                style={{
                  background: 'linear-gradient(-45deg, rgba(59, 130, 246, 0.2), rgba(34, 211, 238, 0.15), rgba(79, 70, 229, 0.2), rgba(59, 130, 246, 0.15))',
                  backgroundSize: '400% 400%',
                  animation: 'gradientMove 8s ease infinite'
                }}
              ></div>
              <div 
                className="absolute -inset-12 blur-2xl opacity-40"
                style={{
                  background: 'linear-gradient(45deg, rgba(34, 211, 238, 0.15), rgba(59, 130, 246, 0.2), rgba(34, 211, 238, 0.1), rgba(79, 70, 229, 0.15))',
                  backgroundSize: '300% 300%',
                  animation: 'gradientMove 12s ease infinite reverse'
                }}
              ></div>
              
              {/* Main profile container - larger size */}
              <div className="relative">
                <div className="relative w-60 h-72 sm:w-72 sm:h-84 md:w-80 md:h-96">
                  {/* Enhanced outer glow with motion */}
                  <div 
                    className="absolute -inset-3 opacity-80"
                    style={{
                      background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.4), rgba(34, 211, 238, 0.3), rgba(79, 70, 229, 0.4), rgba(34, 211, 238, 0.3))',
                      borderRadius: '28px',
                      filter: 'blur(12px)',
                      backgroundSize: '200% 200%',
                      animation: 'gradientMove 6s ease infinite'
                    }}
                  ></div>
                  
                  {/* Premium glass morphism container */}
                  <div 
                    className="relative w-full h-full overflow-hidden transition-all duration-1200 ease-out"
                    style={{
                      borderRadius: '24px',
                      boxShadow: '0 35px 70px -12px rgba(59, 130, 246, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.2), 0 0 0 3px rgba(59, 130, 246, 0.4), inset 0 3px 0 rgba(255, 255, 255, 0.4), inset 0 -3px 0 rgba(0, 0, 0, 0.3)',
                      background: 'linear-gradient(150deg, rgba(59, 130, 246, 0.18) 0%, rgba(34, 211, 238, 0.15) 25%, rgba(79, 70, 229, 0.22) 50%, rgba(34, 211, 238, 0.18) 75%, rgba(59, 130, 246, 0.18) 100%)',
                      backdropFilter: 'blur(6px) saturate(1.8) contrast(1.1)',
                      backgroundSize: '400% 400%',
                      animation: 'gradientMove 10s ease infinite reverse'
                    }}
                  >
                    <img
                      src={profilePicture}
                      alt="Muhamed Nur Beck"
                      className="w-full h-full object-cover filter brightness-112 contrast-118 saturate-115"
                      style={{
                        objectPosition: 'center 20%',
                        borderRadius: '24px',
                        filter: 'brightness(112%) contrast(118%) saturate(115%) drop-shadow(0 0 20px rgba(59,130,246,0.3))'
                      }}
                    />
                    {/* Sophisticated gradient overlays */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/12 via-65% to-transparent"
                      style={{ borderRadius: '24px' }}
                    ></div>
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-blue-500/22 via-transparent to-cyan-400/28"
                      style={{ borderRadius: '24px' }}
                    ></div>
                    <div 
                      className="absolute inset-0 bg-gradient-to-tl from-indigo-600/15 via-transparent to-blue-400/18"
                      style={{ borderRadius: '24px' }}
                    ></div>
                    
                    {/* Premium light reflection */}
                    <div 
                      className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 20%, transparent 80%, rgba(255,255,255,0.2) 100%)',
                        borderRadius: '24px',
                        mixBlendMode: 'overlay'
                      }}
                    ></div>
                  </div>
                  
                  {/* Premium multi-layer borders */}
                  <div 
                    className="absolute -inset-px border border-white/30 opacity-70"
                    style={{ borderRadius: '24px' }}
                  ></div>
                  <div 
                    className="absolute -inset-px border border-cyan-400/60 opacity-80"
                    style={{ borderRadius: '24px' }}
                  ></div>
                  <div 
                    className="absolute -inset-1 border border-blue-500/40 opacity-50 blur-sm"
                    style={{ borderRadius: '25px' }}
                  ></div>
                </div>
                
                {/* Elegant accent lights */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-20 h-1.5 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent blur-md animate-pulse" style={{ animationDuration: '4s' }}></div>
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-gradient-to-r from-transparent via-blue-500/80 to-transparent blur-md animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
                <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-1.5 h-20 bg-gradient-to-b from-transparent via-indigo-400/70 to-transparent blur-md animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
                <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-1.5 h-24 bg-gradient-to-b from-transparent via-cyan-300/70 to-transparent blur-md animate-pulse" style={{ animationDuration: '4.5s', animationDelay: '0.5s' }}></div>
              </div>
            </div>
          </div>

          {/* 3D Background Extension - Bottom part of profile behind text */}
          <div className="absolute top-80 sm:top-96 md:top-[28rem] left-1/2 transform -translate-x-1/2 w-40 h-32 sm:w-48 sm:h-36 md:w-56 md:h-40 opacity-15 blur-sm -z-10">
            <div 
              className="w-full h-full overflow-hidden"
              style={{
                clipPath: 'polygon(25% 0%, 75% 0%, 90% 100%, 10% 100%)',
                background: 'linear-gradient(180deg, rgba(59, 130, 246, 0.1) 0%, rgba(34, 211, 238, 0.05) 100%)'
              }}
            >
              <img
                src={profilePicture}
                alt=""
                className="w-full h-full object-cover object-bottom filter brightness-90 contrast-120 blur-xs"
                style={{
                  transform: 'scale(1.2) translateY(-60%)',
                  transformOrigin: 'center bottom'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
            </div>
          </div>

          {/* Text Content */}
          <div className="relative z-20">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent leading-tight">
            Hi, I'm Muhamed Nur Beck
          </h1>
          <p className="text-gray-400 text-base sm:text-lg mb-8 max-w-lg mx-auto px-2">
            I'm a full-stack and AI developer passionate about crafting clean,
            scalable web applications. I build solutions that deliver
            exceptional performance and a good user experience.
          </p>

          {/* Social Links */}
          <div className="flex justify-center items-center gap-6 mb-8">
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

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:space-x-4 px-4">
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
