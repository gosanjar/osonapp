import { useState } from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import AuthLayout from "./layout"
import { authApi } from "@/shared/api/auth"

type FormValues = {
  phone: string
  password: string
}

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>()

  const onSubmit = async (values: FormValues) => {
    setError(null)
    try {
      const res = await authApi.login(values)
      const { subdomain } = res.data.user
      const host = import.meta.env.VITE_APP_DOMAIN || "osonapp.uz"
      window.location.assign(`https://${subdomain}.${host}`)
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Telefon raqam yoki parol noto'g'ri"
      setError(msg)
    }
  }

  return (
    <AuthLayout>
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-bold">Akkauntga kirish</h1>
        <p className="text-sm text-muted-foreground">
          Telefon raqam va parol bilan kiring
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm text-muted-foreground">
            Telefon raqam
          </label>
          <input
            type="tel"
            placeholder="+998 90 123 45 67"
            className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            {...register("phone", { required: true })}
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
            {...register("password", { required: true })}
          />
        </div>

        {error && (
          <p className="rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {isSubmitting ? "Kirilmoqda..." : "Kirish"}
        </button>
      </form>

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
