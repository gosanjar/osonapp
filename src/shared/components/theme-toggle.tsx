import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"

const ThemeToggle = () => {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem("theme")
    if (stored === "dark") return true
    if (stored === "light") return false
    return window.matchMedia("(prefers-color-scheme: dark)").matches
  })
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
    localStorage.setItem("theme", dark ? "dark" : "light")
  }, [dark])

  const toggle = () => {
    setAnimating(true)
    setDark(!dark)
    setTimeout(() => setAnimating(false), 300)
  }

  const IconComponent = dark ? Moon : Sun

  return (
    <Button
      onClick={toggle}
      className="rounded-md bg-secondary-foreground p-2 text-secondary dark:bg-secondary-foreground dark:text-secondary"
    >
      <span
        style={{
          display: "inline-flex",
          transition: "transform 0.3s ease, opacity 0.3s ease",
          transform: animating
            ? "rotate(180deg) scale(0)"
            : "rotate(0deg) scale(1)",
          opacity: animating ? 0 : 1,
        }}
      >
        <IconComponent size={18} strokeWidth={2} />
      </span>
    </Button>
  )
}

export default ThemeToggle
