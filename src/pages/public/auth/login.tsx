import { ROUTES } from "@/shared/config/routes"
import { useForm, FormProvider } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import AuthLayout from "./layout"
import { AuthApi } from "@/entities/auth/api"
import { PhoneFormControl } from "@/shared/ui/phone-form-control"
import { FormControl } from "@/shared/ui/form-control"
import { getApiError } from "@/shared/api"
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { Alert, AlertDescription } from "@/shared/ui/alert"
import { Link, useLocation } from "react-router-dom"

const APP_URL = import.meta.env.VITE_APP_URL || "https://app.osonapp.uz"

type FormValues = { phone_number: string; password: string }

export default function LoginPage() {
  const { state } = useLocation()
  const locationState = state as {
    phone?: string
    alreadyRegistered?: boolean
  } | null
  const form = useForm<FormValues>({
    defaultValues: { phone_number: locationState?.phone ?? "" },
  })

  const { mutate, error, isPending } = useMutation({
    mutationFn: (data: FormValues) => AuthApi.login(data),
    onSuccess: (res) => {
      const { access, refresh } = res.data
      const params = new URLSearchParams()
      if (access) params.set("token", access)
      if (refresh) params.set("refresh", refresh)
      window.location.assign(`${APP_URL}?${params}`)
    },
  })

  const errorMsg = getApiError(error, "Telefon raqam yoki parol noto'g'ri")

  return (
    <AuthLayout
      redirectText="Akkauntingiz yo'qmi?"
      redirectLinkText="Ro'yxatdan o'tish"
      redirectTo={ROUTES.REGISTER}
    >
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-bold">Akkauntga kirish</h1>
        <p className="text-sm text-muted-foreground">
          Telefon raqam va parol bilan kiring
        </p>
      </div>

      {locationState?.alreadyRegistered && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            Bu raqam allaqachon ro'yxatdan o'tgan. Parolingizni kiriting.
          </AlertDescription>
        </Alert>
      )}

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit((data) => mutate(data))}
          className="space-y-4"
          noValidate
        >
          <PhoneFormControl<FormValues> name="phone_number" />

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm leading-none font-medium">
                Parol <span className="text-destructive">*</span>
              </span>
              <Button variant="link" size="sm" asChild className="h-auto p-0">
                <Link to={ROUTES.FORGOT_PASSWORD}>Parolni unutdingizmi?</Link>
              </Button>
            </div>
            <FormControl<FormValues> name="password" required>
              <Input type="password" placeholder="Kamida 8 ta belgi" />
            </FormControl>
          </div>

          {errorMsg && (
            <Alert variant="destructive">
              <AlertDescription>{errorMsg}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            disabled={isPending || form.formState.isSubmitting}
            className="mt-2 w-full"
          >
            {isPending ? "Kirilmoqda..." : "Kirish"}
          </Button>
        </form>
      </FormProvider>
    </AuthLayout>
  )
}
