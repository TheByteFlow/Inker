import { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = "" }) => {
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(theme === "dark");

  useEffect(() => {
    setIsDark(theme === "dark");
  }, [theme]);

  const handleToggle = () => {
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center justify-center p-2 rounded-md cursor-pointer
        transition-transform duration-500 
        ${isDark ? "rotate-180 bg-muted text-yellow-500" : "rotate-0 bg-muted text-blue-500"}
        ${className}`}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-6 w-6 text-yellow-500 transition-transform duration-500 rotate-180" />
      ) : (
        <Moon className="h-6 w-6 text-blue-500 transition-transform duration-500 rotate-0" />
      )}
    </button>
  );
};

export default ThemeToggle;
