import { useState } from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import AuthLayout from "./layout"
import { authApi } from "@/shared/api/auth"

type FormValues = {
  firstName: string
  lastName: string
  phone: string
  password: string
  shopName: string
}

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>()

  const onSubmit = async (values: FormValues) => {
    setError(null)
    try {
      await authApi.register(values)
      window.location.assign(import.meta.env.VITE_APP_URL || "https://app.osonapp.uz")
    } catch {
      setError("Ro'yxatdan o'tishda xatolik yuz berdi")
    }
  }

  return (
    <AuthLayout>
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-bold">Ro'yxatdan o'tish</h1>
        <p className="text-sm text-muted-foreground">
          Do'koningizni yarating va sotishni boshlang
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-sm text-muted-foreground">
              Ism
            </label>
            <input
              placeholder="Ali"
              className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              {...register("firstName", { required: true })}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-muted-foreground">
              Familiya
            </label>
            <input
              placeholder="Karimov"
              className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              {...register("lastName", { required: true })}
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm text-muted-foreground">
            Do'kon nomi
          </label>
          <input
            placeholder="Mening do'konim"
            className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            {...register("shopName", { required: true })}
          />
        </div>

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
          <label className="mb-1.5 block text-sm text-muted-foreground">
            Parol
          </label>
          <input
            type="password"
            placeholder="Kamida 8 ta belgi"
            className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            {...register("password", { required: true, minLength: 8 })}
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
          {isSubmitting ? "Yaratilmoqda..." : "Ro'yxatdan o'tish"}
        </button>
      </form>

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
