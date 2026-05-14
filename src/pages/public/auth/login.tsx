import { Link } from "react-router-dom"
import { useForm, FormProvider } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import AuthLayout from "./layout"
import { AuthApi } from "@/shared/api/auth"
import { Input } from "@/shared/ui/input"
import { FormControl } from "@/shared/ui/form-control"
import { PHONE_PATTERN } from "@/shared/utils/validation"
import { getApiError } from "@/shared/api"

const APP_URL = import.meta.env.VITE_APP_URL || "https://app.osonapp.uz"

type FormValues = { phone_number: string; password: string }

export default function LoginPage() {
  const form = useForm<FormValues>()

  const { mutate, error, isPending } = useMutation({
    mutationFn: (data: FormValues) => AuthApi.login(data),
    onSuccess: (res) => {
      const token = res.data.access
      window.location.assign(token ? `${APP_URL}?token=${token}` : APP_URL)
    },
  })

  const errorMsg = getApiError(error, "Telefon raqam yoki parol noto'g'ri")

  return (
    <AuthLayout>
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-bold">Akkauntga kirish</h1>
        <p className="text-sm text-muted-foreground">
          Telefon raqam va parol bilan kiring
        </p>
      </div>

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit((data) => mutate(data))}
          className="space-y-4"
          noValidate
        >
          <FormControl<FormValues>
            name="phone_number"
            label="Telefon raqam"
            required
            rules={{
              pattern: {
                value: PHONE_PATTERN,
                message: "Noto'g'ri format. Masalan: +998901234567",
              },
            }}
          >
            <Input type="tel" placeholder="+998 90 123 45 67" />
          </FormControl>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm leading-none font-medium">
                Parol <span className="text-destructive">*</span>
              </span>
              <Link
                to="/forgot-password"
                className="text-sm text-primary transition-colors hover:text-primary/80"
              >
                Parolni unutdingizmi?
              </Link>
            </div>
            <FormControl<FormValues> name="password" required>
              <Input type="password" placeholder="••••••••" />
            </FormControl>
          </div>

          {errorMsg && (
            <p className="rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending || form.formState.isSubmitting}
            className="mt-2 w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {isPending ? "Kirilmoqda..." : "Kirish"}
          </button>
        </form>
      </FormProvider>

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
