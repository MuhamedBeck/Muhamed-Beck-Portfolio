const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-black text-gray-100">
    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
      404
    </h1>
    <p className="text-lg mb-8">
      Page not found. The content you are looking for does not exist.
    </p>
    <a
      href="/"
      className="text-blue-400 underline hover:text-cyan-400 transition">
      Return to Home
    </a>
  </div>
);

export default NotFound;
