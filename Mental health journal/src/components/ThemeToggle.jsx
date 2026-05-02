// src/components/ThemeToggle.jsx
import { useTheme } from "../context/ThemeContext";
import "./ThemeToggle.css";

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      className="themeToggle"
      onClick={toggleTheme}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle dark mode"
    >
      <span className="themeIcon">{isDark ? "☀️" : "🌙"}</span>
      <div className={`themeTrack ${isDark ? "dark" : ""}`}>
        <div className="themeThumb" />
      </div>
    </button>
  );
}

export default ThemeToggle;
