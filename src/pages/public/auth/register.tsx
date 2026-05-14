import { useState } from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import AuthLayout from "./layout"
import { authApi } from "@/shared/api/auth"

type FormValues = {
  first_name: string
  last_name: string
  phone_number: string
  password: string
  shop_name: string
}

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null)
  const [shopUrl, setShopUrl] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>()

  const onSubmit = async (values: FormValues) => {
    setError(null)
    try {
      const res = await authApi.register(values)
      const { subdomain } = res.data.user
      const host = import.meta.env.VITE_APP_DOMAIN || "osonapp.uz"
      setShopUrl(`https://${subdomain}.${host}`)
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Ro'yxatdan o'tishda xatolik yuz berdi"
      setError(msg)
    }
  }

  if (shopUrl) {
    return (
      <AuthLayout>
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-3xl">
            🎉
          </div>
          <h1 className="mb-2 text-2xl font-bold">Do'kon yaratildi!</h1>
          <p className="mb-6 text-sm text-muted-foreground">
            Endi Telegram botga o'ting va telefon raqamingizni yuboring —
            bu parolni tiklash uchun kerak bo'ladi.
          </p>

          <a
            href="https://t.me/osonapp_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#229ED9] py-3 font-semibold text-white transition-opacity hover:opacity-90"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/>
            </svg>
            @osonapp_bot ga o'tish
          </a>

          <a
            href={shopUrl}
            className="w-full rounded-xl border border-border py-3 text-center text-sm font-medium transition-colors hover:bg-muted"
          >
            Admin panelga o'tish →
          </a>
        </div>
      </AuthLayout>
    )
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
              {...register("first_name", { required: true })}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-muted-foreground">
              Familiya
            </label>
            <input
              placeholder="Karimov"
              className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              {...register("last_name", { required: true })}
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
            {...register("shop_name", { required: true })}
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
            {...register("phone_number", { required: true })}
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
