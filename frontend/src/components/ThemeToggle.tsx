import type React from "react"
import { useTheme } from "../hooks/useTheme"

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button className="px-4 py-2 rounded-md bg-background-secondary text-text" onClick={toggleTheme}>
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  )
}

export default ThemeToggle;