import { Link } from "react-router-dom"
import AuthLayout from "./layout"

export default function RegisterPage() {
  return (
    <AuthLayout>
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-bold">Ro'yxatdan o'tish</h1>
        <p className="text-sm text-muted-foreground">
          Do'koningizni yarating va sotishni boshlang
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-sm text-muted-foreground">
              Ism
            </label>
            <input
              placeholder="Ali"
              className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-muted-foreground">
              Familiya
            </label>
            <input
              placeholder="Karimov"
              className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
          </div>
        </div>
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
          <label className="mb-1.5 block text-sm text-muted-foreground">
            Parol
          </label>
          <input
            type="password"
            placeholder="Kamida 8 ta belgi"
            className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <button className="mt-6 w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
        Ro'yxatdan o'tish
      </button>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Akkauntingiz bormi?{" "}
        <Link
          to="/login"
          className="text-primary transition-colors hover:text-primary/80"
        >
          Kirish
        </Link>
      </p>
    </AuthLayout>
  )
}
