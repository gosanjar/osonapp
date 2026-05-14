import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { useForm, FormProvider } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import AuthLayout from "./layout"
import { AuthApi } from "@/shared/api/auth"
import { OtpStep } from "@/shared/components/otp-step"
import { Input } from "@/shared/ui/input"
import { FormControl } from "@/shared/ui/form-control"
import { PHONE_PATTERN, passwordRules } from "@/shared/utils/validation"
import { getApiError } from "@/shared/api"

type Step = "phone" | "otp" | "details"

const TelegramIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
  </svg>
)

const btnClass =
  "mt-2 w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"


type PhoneForm = { phone_number: string }
type DetailsForm = {
  first_name: string
  last_name: string
  shop_name: string
  password: string
  confirm_password: string
}

export default function RegisterPage() {
  const [step, setStep] = useState<Step>("phone")
  const [phone, setPhone] = useState("")
  const [registerToken, setRegisterToken] = useState("")

  const phoneForm = useForm<PhoneForm>()
  const detailsForm = useForm<DetailsForm>()
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (step !== "phone") return
    const phoneValue = phoneForm.getValues("phone_number") || ""
    if (!PHONE_PATTERN.test(phoneValue)) return

    pollingRef.current = setInterval(async () => {
      try {
        const res = await AuthApi.checkPreReg(phoneValue)
        if (res.data.ready) {
          clearInterval(pollingRef.current!)
          sendOtp.mutate(phoneValue)
        }
      } catch {
        // ignore polling errors
      }
    }, 2500)

    return () => { if (pollingRef.current) clearInterval(pollingRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, phoneForm.watch("phone_number")])

  const sendOtp = useMutation({
    mutationFn: (phone_number: string) => AuthApi.sendRegisterOtp(phone_number),
    onSuccess: (_, phone_number) => {
      setPhone(phone_number)
      setStep("otp")
    },
  })

  const verifyOtp = useMutation({
    mutationFn: (otp: string) => AuthApi.verifyRegisterOtp(phone, otp),
    onSuccess: (res) => {
      setRegisterToken(res.data.register_token)
      setStep("details")
    },
  })

  const register = useMutation({
    mutationFn: ({ first_name, last_name, shop_name, password }: DetailsForm) =>
      AuthApi.register({
        first_name,
        last_name,
        shop_name,
        password,
        phone_number: phone,
        register_token: registerToken,
      }),
    onSuccess: (res) => {
      const appUrl = import.meta.env.VITE_APP_URL || "https://app.osonapp.uz"
      const token = res.data.access
      window.location.assign(token ? `${appUrl}?token=${token}` : appUrl)
    },
  })

  if (step === "phone") {
    const errorMsg = getApiError(sendOtp.error, "Xatolik yuz berdi")
    const phoneValue = phoneForm.watch("phone_number") || ""
    const isPhoneValid = PHONE_PATTERN.test(phoneValue)

    return (
      <AuthLayout>
        <div className="mb-8">
          <h1 className="mb-1 text-2xl font-bold">Ro'yxatdan o'tish</h1>
          <p className="text-sm text-muted-foreground">
            Telefon raqamingizni kiriting va botni ulang
          </p>
        </div>

        <FormProvider {...phoneForm}>
          <form
            onSubmit={phoneForm.handleSubmit((d) => sendOtp.mutate(d.phone_number))}
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

            <div className="rounded-xl border border-border bg-muted p-4">
              <p className="mb-2 text-sm font-medium">Telegram bot orqali tasdiqlang</p>
              <ol className="mb-3 space-y-1 text-sm text-muted-foreground">
                <li>1. Quyidagi tugmani bosing</li>
                <li>2. Botda telefon raqamingizni ulashing</li>
                <li>3. Keyin "Tasdiqlash kodi olish" ni bosing</li>
              </ol>
              {isPhoneValid ? (
                <a
                  href={`https://t.me/osonapp_bot?start=${phoneValue.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#229ED9] py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <TelegramIcon />
                  @osonapp_bot ga o'tish
                </a>
              ) : (
                <span className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-[#229ED9] py-2.5 text-sm font-semibold text-white opacity-40">
                  <TelegramIcon />
                  @osonapp_bot ga o'tish
                </span>
              )}
            </div>

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
              {sendOtp.isPending ? "Yuborilmoqda..." : "Tasdiqlash kodi olish"}
            </button>
          </form>
        </FormProvider>

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

  // step === "details"
  const errorMsg = getApiError(
    register.error,
    "Ro'yxatdan o'tishda xatolik yuz berdi"
  )
  const pw = detailsForm.watch("password")

  return (
    <AuthLayout>
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-bold">Ma'lumotlarni kiriting</h1>
        <p className="text-sm text-muted-foreground">
          Do'koningizni yarating va sotishni boshlang
        </p>
      </div>

      <FormProvider {...detailsForm}>
        <form
          onSubmit={detailsForm.handleSubmit((d) => register.mutate(d))}
          autoComplete="off"
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-3">
            <FormControl<DetailsForm> name="first_name" label="Ism" required>
              <Input placeholder="Ali" autoComplete="given-name" />
            </FormControl>
            <FormControl<DetailsForm> name="last_name" label="Familiya" required>
              <Input placeholder="Karimov" autoComplete="family-name" />
            </FormControl>
          </div>

          <FormControl<DetailsForm> name="shop_name" label="Do'kon nomi" required>
            <Input placeholder="Mening do'konim" autoComplete="off" />
          </FormControl>

          <FormControl<DetailsForm>
            name="password"
            label="Parol"
            required
            rules={passwordRules}
          >
            <Input type="password" placeholder="Kamida 8 ta belgi" autoComplete="new-password" />
          </FormControl>

          <FormControl<DetailsForm>
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

          <button
            type="submit"
            disabled={register.isPending}
            className={btnClass}
          >
            {register.isPending ? "Yaratilmoqda..." : "Ro'yxatdan o'tish"}
          </button>
        </form>
      </FormProvider>

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
