import { useRef, useState, useEffect } from "react"
import { Globe, ChevronDown, Check } from "lucide-react"
import { Button } from "@/shared/ui/button"

type LangCode = "uz" | "ru"

const VALID_LANGS: LangCode[] = ["uz", "ru"]

const LANGUAGES = [
  { code: "uz" as LangCode, label: "O'zbek", flag: "🇺🇿" },
  { code: "ru" as LangCode, label: "Русский", flag: "🇷🇺" },
]

function getLang(): LangCode {
  const saved = localStorage.getItem("lang")
  return VALID_LANGS.includes(saved as LangCode) ? (saved as LangCode) : "uz"
}

function setLang(code: LangCode) {
  localStorage.setItem("lang", code)
  document.documentElement.setAttribute("lang", code)
  window.dispatchEvent(new CustomEvent("langchange", { detail: code }))
}

const LangToggle = () => {
  const [lang, setLangState] = useState<LangCode>(getLang)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: Event) => setLangState((e as CustomEvent<LangCode>).detail)
    window.addEventListener("langchange", handler)
    return () => window.removeEventListener("langchange", handler)
  }, [])

  const currentLang = LANGUAGES.find((l) => l.code === lang)!

  return (
    <div ref={ref} className="relative">
      <Button
        type="button"
        variant="ghost"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Globe size={14} strokeWidth={1.5} />
        <span>{currentLang.label}</span>
        <ChevronDown
          size={12}
          strokeWidth={2}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </Button>

      {open && (
        <div className="absolute top-full right-0 z-50 mt-1.5 w-44 overflow-hidden rounded-xl border border-border bg-background shadow-lg shadow-black/10">
          <div className="py-1">
            {LANGUAGES.map((l) => (
              <Button
                key={l.code}
                type="button"
                variant="ghost"
                onClick={() => { setLang(l.code); setOpen(false) }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-muted"
              >
                <span className="text-base">{l.flag}</span>
                <span
                  className={`font-medium ${l.code === lang ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {l.label}
                </span>
                {l.code === lang && (
                  <Check size={16} strokeWidth={2} className="ml-auto text-primary" />
                )}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default LangToggle
