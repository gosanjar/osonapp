import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import AuthLayout from "./layout"
import { AuthApi } from "@/shared/api/auth"
import { OtpStep } from "@/shared/components/otp-step"

type Step = "phone" | "otp" | "reset"

const inputClass =
  "w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none"

const btnClass =
  "mt-2 w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"

function getErrorMsg(error: unknown, fallback: string) {
  return (
    (error as { response?: { data?: { message?: string } } })?.response?.data
      ?.message ?? (error ? fallback : null)
  )
}

export default function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>("phone")
  const [phone, setPhone] = useState("")
  const [resetToken, setResetToken] = useState("")

  const phoneForm = useForm<{ phone_number: string }>()
  const resetForm = useForm<{ new_password: string; confirm_password: string }>()

  const sendOtp = useMutation({
    mutationFn: (phone_number: string) => AuthApi.forgotPassword(phone_number)(),
    onSuccess: (_, phone_number) => {
      setPhone(phone_number)
      setStep("otp")
    },
  })

  const verifyOtp = useMutation({
    mutationFn: (otp: string) => AuthApi.verifyOtp(phone, otp)(),
    onSuccess: (res) => {
      setResetToken(res.data.reset_token)
      setStep("reset")
    },
  })

  const resetPassword = useMutation({
    mutationFn: (new_password: string) =>
      AuthApi.resetPassword(phone, resetToken, new_password)(),
    onSuccess: () => navigate("/login"),
  })

  if (step === "phone") {
    const errorMsg = getErrorMsg(sendOtp.error, "Xatolik yuz berdi")

    return (
      <AuthLayout>
        <div className="mb-8">
          <h1 className="mb-1 text-2xl font-bold">Parolni tiklash</h1>
          <p className="text-sm text-muted-foreground">
            Telegram botga bog'langan telefon raqamingizni kiriting
          </p>
        </div>

        <form
          onSubmit={phoneForm.handleSubmit((d) => sendOtp.mutate(d.phone_number))}
          className="space-y-4"
        >
          <div>
            <label className="mb-1.5 block text-sm text-muted-foreground">
              Telefon raqam
            </label>
            <input
              type="tel"
              placeholder="+998 90 123 45 67"
              className={inputClass}
              {...phoneForm.register("phone_number", { required: true })}
            />
          </div>

          {errorMsg && (
            <p className="rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">
              {errorMsg}
            </p>
          )}

          <button type="submit" disabled={sendOtp.isPending} className={btnClass}>
            {sendOtp.isPending ? "Yuborilmoqda..." : "Kod yuborish"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Esladingizmi?{" "}
          <Link to="/login" className="text-primary transition-colors hover:text-primary/80">
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
          error={getErrorMsg(verifyOtp.error, "Kod noto'g'ri")}
          onSubmit={(otp) => verifyOtp.mutate(otp)}
          onBack={() => { setStep("phone"); sendOtp.reset() }}
        />
      </AuthLayout>
    )
  }

  // step === "reset"
  const errorMsg = getErrorMsg(resetPassword.error, "Xatolik yuz berdi")
  const pw = resetForm.watch("new_password")

  return (
    <AuthLayout>
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-bold">Yangi parol</h1>
        <p className="text-sm text-muted-foreground">
          Kamida 8 ta belgidan iborat parol kiriting
        </p>
      </div>

      <form
        onSubmit={resetForm.handleSubmit((d) => resetPassword.mutate(d.new_password))}
        className="space-y-4"
      >
        <div>
          <label className="mb-1.5 block text-sm text-muted-foreground">Yangi parol</label>
          <input
            type="password"
            placeholder="••••••••"
            className={inputClass}
            {...resetForm.register("new_password", { required: true, minLength: 8 })}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm text-muted-foreground">Parolni tasdiqlang</label>
          <input
            type="password"
            placeholder="••••••••"
            className={inputClass}
            {...resetForm.register("confirm_password", {
              required: true,
              validate: (v) => v === pw || "Parollar mos kelmadi",
            })}
          />
          {resetForm.formState.errors.confirm_password && (
            <p className="mt-1 text-xs text-destructive">
              {resetForm.formState.errors.confirm_password.message}
            </p>
          )}
        </div>

        {errorMsg && (
          <p className="rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">
            {errorMsg}
          </p>
        )}

        <button type="submit" disabled={resetPassword.isPending} className={btnClass}>
          {resetPassword.isPending ? "Saqlanmoqda..." : "Parolni yangilash"}
        </button>
      </form>
    </AuthLayout>
  )
}
