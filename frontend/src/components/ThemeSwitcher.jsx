import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "../stores/useTheme";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useThemeStore();
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Track background with icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2">
        <Sun className="w-4 h-4 text-yellow-500 opacity-70" />
        <Moon className="w-4 h-4 text-blue-400 opacity-70" />
      </div>
      
      {/* Sliding thumb */}
      <div
        className={`relative flex items-center justify-center w-7 h-7 bg-white dark:bg-gray-200 rounded-full shadow-md transition-all duration-300 ease-in-out transform ${
          isDark ? "translate-x-8" : "translate-x-0.5"
        }`}
      >
        {/* Active icon in thumb */}
        <div className="w-4 h-4">
          <Sun 
            className={`absolute w-4 h-4 text-yellow-600 transition-all duration-300 transform ${
              isDark 
                ? "opacity-0 rotate-90 scale-0" 
                : "opacity-100 rotate-0 scale-100"
            }`}
          />
          <Moon 
            className={`absolute w-4 h-4 text-blue-600 transition-all duration-300 transform ${
              isDark 
                ? "opacity-100 rotate-0 scale-100" 
                : "opacity-0 -rotate-90 scale-0"
            }`}
          />
        </div>
      </div>
    </button>
  );
};

export default ThemeSwitcher;