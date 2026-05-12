import { Link } from "react-router-dom"
import AuthLayout from "./layout"

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-bold">Akkauntga kirish</h1>
        <p className="text-sm text-muted-foreground">
          Telefon raqam va parol bilan kiring
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm text-muted-foreground">
            Telefon raqam
          </label>
          <input
            type="tel"
            placeholder="+998 90 123 45 67"
            className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm text-muted-foreground">Parol</label>
            <Link
              to="/forgot-password"
              className="text-sm text-primary transition-colors hover:text-primary/80"
            >
              Parolni unutdingizmi?
            </Link>
          </div>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <button className="mt-6 w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
        Kirish
      </button>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Akkauntingiz yo'qmi?{" "}
        <Link
          to="/register"
          className="text-primary transition-colors hover:text-primary/80"
        >
          Ro'yxatdan o'tish
        </Link>
      </p>
    </AuthLayout>
  )
}
