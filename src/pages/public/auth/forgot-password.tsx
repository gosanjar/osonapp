import { Link } from "react-router-dom"
import AuthLayout from "./layout"

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-bold">Parolni tiklash</h1>
        <p className="text-sm text-muted-foreground">
          Telefon raqamingizni kiriting, SMS kod yuboramiz
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
      </div>

      <button className="mt-6 w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
        Kod yuborish
      </button>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Esladingizmi?{" "}
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
