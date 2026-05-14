import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import AuthLayout from "./layout"
import { AuthApi, type LoginPayload } from "@/shared/api/auth"

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginPayload>()

  const { mutate, error, isPending } = useMutation({
    mutationFn: (data: LoginPayload) => AuthApi.login(data)(),
    onSuccess: () => {
      const appUrl = import.meta.env.VITE_APP_URL || "https://app.osonapp.uz"
      window.location.assign(appUrl)
    },
  })

  const errorMsg =
    (error as { response?: { data?: { message?: string } } })?.response?.data
      ?.message ?? (error ? "Telefon raqam yoki parol noto'g'ri" : null)

  return (
    <AuthLayout>
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-bold">Akkauntga kirish</h1>
        <p className="text-sm text-muted-foreground">
          Telefon raqam va parol bilan kiring
        </p>
      </div>

      <form onSubmit={handleSubmit((data) => mutate(data))} className="space-y-4">
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

        {errorMsg && (
          <p className="rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending || isSubmitting}
          className="mt-2 w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {isPending ? "Kirilmoqda..." : "Kirish"}
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
