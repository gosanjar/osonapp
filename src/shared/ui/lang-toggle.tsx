import { useEffect, useState } from "react"
import { Button } from "./button"

const LANGUAGES = ["uz", "ru"] as const
type Lang = (typeof LANGUAGES)[number]

const LangToggle = () => {
  const [lang, setLang] = useState<Lang>(
    () => (localStorage.getItem("lang") as Lang) || "uz"
  )
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    localStorage.setItem("lang", lang)
    document.documentElement.setAttribute("lang", lang)
  }, [lang])

  const toggle = () => {
    setAnimating(true)
    setLang((prev) => {
      const idx = LANGUAGES.indexOf(prev)
      return LANGUAGES[(idx + 1) % LANGUAGES.length]
    })
    setTimeout(() => setAnimating(false), 300)
  }

  return (
    <Button
      onClick={toggle}
      className="rounded-md bg-secondary-foreground px-3 py-2 text-sm font-medium text-secondary dark:bg-secondary-foreground dark:text-secondary"
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
        {lang.toUpperCase()}
      </span>
    </Button>
  )
}

export default LangToggle
