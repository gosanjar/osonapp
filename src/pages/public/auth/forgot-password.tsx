import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm, FormProvider } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import AuthLayout from "./layout"
import { AuthApi } from "@/shared/api/auth"
import { OtpStep } from "@/shared/components/otp-step"
import { Input } from "@/shared/ui/input"
import { FormControl } from "@/shared/ui/form-control"
import { PHONE_PATTERN, passwordRules } from "@/shared/utils/validation"
import { getApiError } from "@/shared/api"

type Step = "phone" | "otp" | "reset"

const btnClass =
  "mt-2 w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"

type PhoneForm = { phone_number: string }
type ResetForm = { new_password: string; confirm_password: string }

export default function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>("phone")
  const [phone, setPhone] = useState("")
  const [resetToken, setResetToken] = useState("")

  const phoneForm = useForm<PhoneForm>()
  const resetForm = useForm<ResetForm>()

  const sendOtp = useMutation({
    mutationFn: (phone_number: string) => AuthApi.forgotPassword(phone_number),
    onSuccess: (_, phone_number) => {
      setPhone(phone_number)
      setStep("otp")
    },
  })

  const verifyOtp = useMutation({
    mutationFn: (otp: string) => AuthApi.verifyOtp(phone, otp),
    onSuccess: (res) => {
      setResetToken(res.data.reset_token)
      setStep("reset")
    },
  })

  const resetPassword = useMutation({
    mutationFn: (new_password: string) =>
      AuthApi.resetPassword(phone, resetToken, new_password),
    onSuccess: () => navigate("/login"),
  })

  if (step === "phone") {
    const errorMsg = getApiError(sendOtp.error, "Xatolik yuz berdi")

    return (
      <AuthLayout>
        <div className="mb-8">
          <h1 className="mb-1 text-2xl font-bold">Parolni tiklash</h1>
          <p className="text-sm text-muted-foreground">
            Telegram botga bog'langan telefon raqamingizni kiriting
          </p>
        </div>

        <FormProvider {...phoneForm}>
          <form
            onSubmit={phoneForm.handleSubmit((d) =>
              sendOtp.mutate(d.phone_number)
            )}
            className="space-y-4"
          >
            <FormControl<PhoneForm>
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

            {errorMsg && (
              <p className="rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={sendOtp.isPending}
              className={btnClass}
            >
              {sendOtp.isPending ? "Yuborilmoqda..." : "Kod yuborish"}
            </button>
          </form>
        </FormProvider>

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

  if (step === "otp") {
    return (
      <AuthLayout>
        <OtpStep
          phone={phone}
          isPending={verifyOtp.isPending}
          error={getApiError(verifyOtp.error, "Kod noto'g'ri")}
          onSubmit={(otp) => verifyOtp.mutate(otp)}
          onBack={() => {
            setStep("phone")
            sendOtp.reset()
          }}
        />
      </AuthLayout>
    )
  }

  // step === "reset"
  const errorMsg = getApiError(resetPassword.error, "Xatolik yuz berdi")
  const pw = resetForm.watch("new_password")

  return (
    <AuthLayout>
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-bold">Yangi parol</h1>
        <p className="text-sm text-muted-foreground">
          Kamida 8 ta belgidan iborat parol kiriting
        </p>
      </div>

      <FormProvider {...resetForm}>
        <form
          onSubmit={resetForm.handleSubmit((d) =>
            resetPassword.mutate(d.new_password)
          )}
          className="space-y-4"
        >
          <FormControl<ResetForm>
            name="new_password"
            label="Yangi parol"
            required
            rules={passwordRules}
          >
            <Input type="password" placeholder="••••••••" />
          </FormControl>

          <FormControl<ResetForm>
            name="confirm_password"
            label="Parolni tasdiqlang"
            required
            rules={{ validate: (v) => v === pw || "Parollar mos kelmadi" }}
          >
            <Input type="password" placeholder="••••••••" />
          </FormControl>

          {errorMsg && (
            <p className="rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={resetPassword.isPending}
            className={btnClass}
          >
            {resetPassword.isPending ? "Saqlanmoqda..." : "Parolni yangilash"}
          </button>
        </form>
      </FormProvider>
    </AuthLayout>
  )
}
