import { Link } from "react-router-dom"

interface AuthLayoutProps {
  children: React.ReactNode
  redirectText?: string
  redirectLinkText?: string
  redirectTo?: string
}

export default function AuthLayout({
  children,
  redirectText,
  redirectLinkText,
  redirectTo,
}: AuthLayoutProps) {
  return (
    <div className="grid h-screen grid-cols-1 bg-secondary lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center overflow-y-auto px-8 py-10 text-secondary-foreground sm:px-16">
        <div className="w-full max-w-sm">
          <div className="mb-10 flex items-center justify-between">
            <Link to="/" className="text-lg font-extrabold tracking-wide">
              OSON APP
            </Link>
          </div>

          {children}

          {redirectTo && redirectText && redirectLinkText && (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              {redirectText}{" "}
              <Link
                to={redirectTo}
                className="text-primary transition-colors hover:text-primary/80"
              >
                {redirectLinkText}
              </Link>
            </p>
          )}
        </div>
      </div>

      <div className="hidden flex-col items-center justify-center gap-6 rounded-l-3xl bg-linear-to-br from-blue-600 to-indigo-700 text-white lg:flex">
        <div className="text-7xl">🛍️</div>
        <div className="px-12 text-center">
          <div className="mb-4 inline-block rounded-2xl bg-white/10 px-6 py-3 backdrop-blur-sm">
            <p className="text-lg font-semibold">Oson App</p>
          </div>
          <h2 className="mb-3 text-3xl font-bold">
            Do'koningizni online olib chiqing
          </h2>
          <p className="text-sm leading-relaxed">
            15 daqiqada do'kon yarating va buyurtmalar qabul qiling
          </p>
        </div>
        <div className="mt-4 flex gap-6 text-center">
          {[
            ["500+", "do'kon"],
            ["24/7", "ishlaydi"],
            ["6", "to'lov usuli"],
          ].map(([v, l]) => (
            <div key={l}>
              <div className="text-2xl font-bold">{v}</div>
              <div className="text-xs">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
