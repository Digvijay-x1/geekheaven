import React from "react";
import { Code, Users, Building } from "lucide-react";

const HeroSection = () => {
  // Generate random stars
  const generateStars = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      animationDelay: Math.random() * 3,
      animationDuration: Math.random() * 2 + 3,
    }));
  };

  const stars = generateStars(50);

  return (
    <div
      className="
        relative h-[80vh] overflow-hidden
        bg-gradient-to-br from-blue-100 to-blue-300 
        dark:from-blue-900 dark:to-black
      "
    >
      {/* Animated Stars Background */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-black dark:bg-white opacity-50 animate-pulse"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.animationDelay}s`,
              animationDuration: `${star.animationDuration}s`,
            }}
          />
        ))}
      </div>

      {/* Additional twinkling effect */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={`twinkle-${i}`}
            className="absolute w-1 h-1 bg-black dark:bg-white rounded-full opacity-50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 4 + 2}s infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        {/* Main Heading */}
        <div className="mb-6">
          <h1
            className="
              text-2xl md:text-4xl lg:text-6xl font-bold mb-4 leading-tight
              text-gray-900 dark:text-white mask-linear-from-neutral-100
            "
          >
            Hype Code
          </h1>
          <h2
            className="
              text-xl md:text-2xl lg:text-3xl font-semibold leading-tight
              text-blue-600 dark:text-blue-300
            "
          >
            One Problem at a Time
          </h2>
        </div>

        {/* Description */}
        <p
          className="
            text-sm md:text-lg lg:text-xl max-w-4xl mx-auto mb-8 leading-relaxed
            text-gray-700 dark:text-blue-100
          "
        >
          Elevate your programming skills with curated coding challenges,
          detailed solutions, and progress tracking. Join thousands of developers
          on their coding journey.
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto w-full">
          {/* Card 1 */}
          <div
            className="
              bg-black/10 dark:bg-white/20 backdrop-blur-sm 
              border border-black/20 dark:border-white/30 
              rounded-2xl p-4 md:p-6 text-center shadow-lg 
              hover:shadow-xl transition-all duration-300 
              transform hover:scale-105 
              hover:bg-black/20 dark:hover:bg-white/30
            "
          >
            <div className="flex justify-center mb-3">
              <Code size={32} className="text-blue-700 dark:text-blue-200" />
            </div>
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              500+
            </div>
            <div className="text-gray-700 dark:text-blue-100 text-sm md:text-base font-medium">
              Coding Problems
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="
              bg-black/10 dark:bg-white/20 backdrop-blur-sm 
              border border-black/20 dark:border-white/30 
              rounded-2xl p-4 md:p-6 text-center shadow-lg 
              hover:shadow-xl transition-all duration-300 
              transform hover:scale-105 
              hover:bg-black/20 dark:hover:bg-white/30
            "
          >
            <div className="flex justify-center mb-3">
              <Users size={32} className="text-blue-700 dark:text-blue-200" />
            </div>
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              50K+
            </div>
            <div className="text-gray-700 dark:text-blue-100 text-sm md:text-base font-medium">
              Active Coders
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="
              bg-black/10 dark:bg-white/20 backdrop-blur-sm 
              border border-black/20 dark:border-white/30 
              rounded-2xl p-4 md:p-6 text-center shadow-lg 
              hover:shadow-xl transition-all duration-300 
              transform hover:scale-105 
              hover:bg-black/20 dark:hover:bg-white/30
            "
          >
            <div className="flex justify-center mb-3">
              <Building size={32} className="text-blue-700 dark:text-blue-200" />
            </div>
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              100+
            </div>
            <div className="text-gray-700 dark:text-blue-100 text-sm md:text-base font-medium">
              Companies
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
