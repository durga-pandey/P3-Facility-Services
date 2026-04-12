import { useTheme } from "../context/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const label = theme === "light" ? "Switch to dark mode" : "Switch to light mode";

  return (
    <div className="theme-toggle" role="status" aria-live="polite">
      <button type="button" aria-label={label} onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </div>
  );
}

export default ThemeToggle;
