import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import ThemeToggle from "@shared/theme-toggle"
import LangToggle from "@shared/lang-toggle"
import { Button } from "@/shared/ui/button"

const niches = [
  { slug: "clothes", label: "Kiyim" },
  { slug: "beauty", label: "Go'zallik" },
  { slug: "food", label: "Ovqat" },
  { slug: "electronics", label: "Elektronika" },
  { slug: "pharmacy", label: "Dorixona" },
  { slug: "kids", label: "Bolalar" },
  { slug: "sport", label: "Sport" },
  { slug: "accessories", label: "Aksessuarlar" },
]

export default function PublicNav() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [solutionsMobileOpen, setSolutionsMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (mobileMenu) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenu])

  const navLink = (to: string, label: string) => (
    <Link
      to={to}
      onClick={() => setMobileMenu(false)}
      className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${pathname === to ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
    >
      {label}
    </Link>
  )

  return (
    <>
      {/* Topbar */}
      <div className="hidden h-10 items-center border-b border-border bg-muted/50 lg:flex">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <svg
              className="h-4 w-4 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>
            <span>Qo'llab-quvvatlash:</span>
            <a
              href="https://t.me/osonapp_support"
              target="_blank"
              rel="noopener"
              className="text-primary hover:underline"
            >
              Telegram
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Kirish →
            </Link>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav
        className={`sticky top-0 z-50 flex h-17 items-center border-b transition-all ${scrolled ? "border-border bg-background/95 shadow-sm backdrop-blur-md" : "border-transparent bg-background"}`}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-10 px-4 sm:px-6">
          <Link
            to="/"
            className="shrink-0 font-extrabold tracking-wide text-[17]"
          >
            OSON APP
          </Link>

          {/* Desktop links */}
          <div className="hidden flex-1 items-center justify-center gap-1 lg:flex">
            <div
              className="relative"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <Button type="button" variant="ghost" className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                Yechimlar
                <svg
                  className={`h-3.5 w-3.5 transition-transform ${solutionsOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Button>
              {solutionsOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 overflow-hidden rounded-xl border border-border bg-background shadow-lg">
                  <div className="px-3 py-2 text-xs font-semibold text-muted-foreground">
                    Yo'nalishlar bo'yicha
                  </div>
                  <div className="grid grid-cols-2 gap-0.5 p-2">
                    {niches.map((n) => (
                      <Link
                        key={n.slug}
                        to={`/for/${n.slug}`}
                        onClick={() => setSolutionsOpen(false)}
                        className={`rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-muted hover:text-foreground ${pathname === `/for/${n.slug}` ? "font-medium text-foreground" : "text-muted-foreground"}`}
                      >
                        {n.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {navLink("/pricing", "Narxlar")}
            {navLink("/blog", "Blog")}
          </div>

          {/* Right */}
          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden items-center gap-2 lg:flex">
              <LangToggle />
              <ThemeToggle />
            </div>
            <Link
              to="/register"
              className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:inline-flex"
            >
              Bepul boshlash
            </Link>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setMobileMenu(!mobileMenu)}
              className="rounded-lg p-2 text-foreground transition-colors hover:bg-muted lg:hidden"
              aria-label="Menu"
            >
              {mobileMenu ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenu && (
        <div className="fixed inset-x-0 top-17 bottom-0 z-999 flex flex-col bg-background lg:hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="border-b border-border">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setSolutionsMobileOpen(!solutionsMobileOpen)}
                className="flex w-full items-center justify-between px-5 py-4 font-medium text-[15]"
              >
                <span>Yechimlar</span>
                <svg
                  className={`h-5 w-5 text-muted-foreground transition-transform ${solutionsMobileOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Button>
              {solutionsMobileOpen && (
                <div className="grid grid-cols-2 gap-1 px-5 pb-4">
                  {niches.map((n) => (
                    <Link
                      key={n.slug}
                      to={`/for/${n.slug}`}
                      onClick={() => setMobileMenu(false)}
                      className={`rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted ${pathname === `/for/${n.slug}` ? "font-medium text-foreground" : "text-muted-foreground"}`}
                    >
                      {n.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              to="/pricing"
              onClick={() => setMobileMenu(false)}
              className={`block border-b border-border px-5 py-4 font-medium text-[15] ${pathname === "/pricing" ? "text-foreground" : "text-muted-foreground"}`}
            >
              Narxlar
            </Link>
            <Link
              to="/blog"
              onClick={() => setMobileMenu(false)}
              className={`block border-b border-border px-5 py-4 font-medium text-[15] ${pathname === "/blog" ? "text-foreground" : "text-muted-foreground"}`}
            >
              Blog
            </Link>
            <Link
              to="/faq"
              onClick={() => setMobileMenu(false)}
              className={`block border-b border-border px-5 py-4 font-medium text-[15] ${pathname === "/faq" ? "text-foreground" : "text-muted-foreground"}`}
            >
              FAQ
            </Link>
          </div>
          <div className="flex gap-3 border-t border-border px-5 py-5">
            <div className="flex flex-1 items-center justify-center gap-3 rounded-xl bg-muted py-3.5">
              <LangToggle />
              <ThemeToggle />
            </div>
            <Link
              to="/login"
              onClick={() => setMobileMenu(false)}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-muted py-3.5 text-sm font-medium text-foreground"
            >
              Kirish →
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileMenu(false)}
              className="flex flex-1 items-center justify-center rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground"
            >
              Boshlash
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
