import { useEffect, type ReactNode } from "react"

export function LangProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const saved = localStorage.getItem("lang")
    document.documentElement.setAttribute("lang", saved === "ru" ? "ru" : "uz")
  }, [])

  return <>{children}</>
}
