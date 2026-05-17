import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useForm, useWatch, FormProvider } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { ROUTES } from "@/shared/config/routes"
import { AuthApi } from "@/entities/auth/api"
import { FormControl } from "@/shared/ui/form-control"
import { Input } from "@/shared/ui/input"
import { passwordRules } from "@/shared/utils/validation"
import { getApiError } from "@/shared/api"
import AuthLayout from "./layout"

type ResetForm = { new_password: string; confirm_password: string }

const btnClass =
  "mt-2 w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const [params] = useSearchParams()

  const phone = params.get("phone") ?? ""
  const token = params.get("token") ?? ""

  useEffect(() => {
    if (!phone || !token) navigate(ROUTES.FORGOT_PASSWORD, { replace: true })
  }, [phone, token, navigate])

  const form = useForm<ResetForm>()
  const pw = useWatch({ control: form.control, name: "new_password" })

  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: (new_password: string) =>
      AuthApi.resetPassword(phone, token, new_password),
    onSuccess: () => navigate(ROUTES.LOGIN),
  })

  const errorMsg = getApiError(error, "Xatolik yuz berdi")

  if (isSuccess) return null

  return (
    <AuthLayout>
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-bold">Yangi parol</h1>
        <p className="text-sm text-muted-foreground">
          Kamida 8 ta belgidan iborat parol kiriting
        </p>
      </div>

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit((d) => mutate(d.new_password))}
          className="space-y-4"
        >
          <FormControl<ResetForm>
            name="new_password"
            label="Yangi parol"
            required
            rules={passwordRules}
          >
            <Input type="password" placeholder="••••••••" autoComplete="new-password" />
          </FormControl>

          <FormControl<ResetForm>
            name="confirm_password"
            label="Parolni tasdiqlang"
            required
            rules={{ validate: (v) => v === pw || "Parollar mos kelmadi" }}
          >
            <Input type="password" placeholder="••••••••" autoComplete="new-password" />
          </FormControl>

          {errorMsg && (
            <p className="rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">
              {errorMsg}
            </p>
          )}

          <button type="submit" disabled={isPending} className={btnClass}>
            {isPending ? "Saqlanmoqda..." : "Parolni yangilash"}
          </button>
        </form>
      </FormProvider>
    </AuthLayout>
  )
}
