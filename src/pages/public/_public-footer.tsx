import { Link } from "react-router-dom"

export default function PublicFooter() {
  return (
    <footer className="border-t border-border bg-muted/30 py-16 text-muted-foreground">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="mb-4 block text-lg font-bold text-foreground">
              Oson App
            </span>
            <p className="text-sm leading-relaxed">
              Telegramda sotuvlar bo'yicha O'zbekistondagi platforma
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Mahsulot</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/pricing" className="transition-colors hover:text-foreground">
                  Narxlar
                </Link>
              </li>
              <li>
                <a href="#faq" className="transition-colors hover:text-foreground">
                  FAQ
                </a>
              </li>
              <li>
                <Link to="/register" className="transition-colors hover:text-foreground">
                  Boshlash
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Kompaniya</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Biz haqimizda
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Kontaktlar
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-foreground">
              Qo'llab-quvvatlash
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Yordam
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/osonapp_support"
                  target="_blank"
                  rel="noopener"
                  className="transition-colors hover:text-foreground"
                >
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 mb-4 overflow-hidden select-none" aria-hidden="true">
          <p className="text-center text-[12vw] leading-none font-extrabold tracking-tight whitespace-nowrap text-foreground/5 lg:text-[10vw]">
            OSON APP
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-sm">© 2026 Oson App. Barcha huquqlar himoyalangan.</p>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="transition-colors hover:text-foreground">
              Foydalanish shartlari
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Maxfiylik siyosati
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
