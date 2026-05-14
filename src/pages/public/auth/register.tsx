import { useState, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"
import { useForm, FormProvider } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import AuthLayout from "./layout"
import { AuthApi } from "@/shared/api/auth"
import { Input } from "@/shared/ui/input"
import { FormControl } from "@/shared/ui/form-control"
import { PHONE_PATTERN, passwordRules } from "@/shared/utils/validation"
import { getApiError } from "@/shared/api"

type Step = "phone" | "details"

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
  const [wsError, setWsError] = useState<string | null>(null)
  const [botClicked, setBotClicked] = useState(false)

  const phoneForm = useForm<PhoneForm>()
  const detailsForm = useForm<DetailsForm>()

  const phoneValue = phoneForm.watch("phone_number") || ""
  const isPhoneValid = PHONE_PATTERN.test(phoneValue)

  useEffect(() => {
    setBotClicked(false)
    setWsError(null)
  }, [phoneValue])

  const onRegisterToken = useCallback(
    (token: string) => {
      setPhone(phoneForm.getValues("phone_number"))
      setRegisterToken(token)
      setStep("details")
    },
    [phoneForm]
  )

  useEffect(() => {
    if (step !== "phone" || !isPhoneValid || !botClicked) return

    const wsUrl = (import.meta.env.VITE_API_URL as string).replace(
      /^http/,
      "ws"
    )
    const digits = phoneValue.replace(/\D/g, "")
    const ws = new WebSocket(`${wsUrl}/ws/pre-reg/${digits}/`)

    ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data) as {
          register_token?: string
          already_registered?: boolean
        }
        if (data.already_registered) {
          setWsError("Bu raqam allaqachon ro'yxatdan o'tgan.")
        } else if (data.register_token) {
          onRegisterToken(data.register_token)
        }
      } catch {
        /* ignore */
      }
    }

    ws.onerror = () => ws.close()

    setWsError(null)
    return () => ws.close()
  }, [step, isPhoneValid, phoneValue, botClicked, onRegisterToken])

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
    return (
      <AuthLayout>
        <div className="mb-8">
          <h1 className="mb-1 text-2xl font-bold">Ro'yxatdan o'tish</h1>
          <p className="text-sm text-muted-foreground">
            Telefon raqamingizni kiriting va botni ulang
          </p>
        </div>

        <FormProvider {...phoneForm}>
          <form className="space-y-4">
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
              <p className="mb-2 text-sm font-medium">
                Telegram bot orqali tasdiqlang
              </p>
              <ol className="mb-3 space-y-1 text-sm text-muted-foreground">
                <li>1. Quyidagi tugmani bosing</li>
                <li>2. Botda telefon raqamingizni ulashing</li>
                <li>3. Tasdiqlanishi bilan avtomatik davom etadi</li>
              </ol>
              {isPhoneValid ? (
                <a
                  href={`https://t.me/osonapp_bot?start=${phoneValue.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setBotClicked(true)}
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

            {isPhoneValid && botClicked && !wsError && (
              <p className="animate-pulse text-center text-sm text-muted-foreground">
                Bot tasdiqlashi kutilmoqda...
              </p>
            )}
            {wsError && (
              <p className="rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">
                {wsError}{" "}
                <Link to="/login" className="font-semibold underline">
                  Kirish
                </Link>
              </p>
            )}
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
            <FormControl<DetailsForm>
              name="last_name"
              label="Familiya"
              required
            >
              <Input placeholder="Karimov" autoComplete="family-name" />
            </FormControl>
          </div>

          <FormControl<DetailsForm>
            name="shop_name"
            label="Do'kon nomi"
            required
          >
            <Input placeholder="Mening do'konim" autoComplete="off" />
          </FormControl>

          <FormControl<DetailsForm>
            name="password"
            label="Parol"
            required
            rules={passwordRules}
          >
            <Input
              type="password"
              placeholder="Kamida 8 ta belgi"
              autoComplete="new-password"
            />
          </FormControl>

          <FormControl<DetailsForm>
            name="confirm_password"
            label="Parolni tasdiqlang"
            required
            rules={{ validate: (v) => v === pw || "Parollar mos kelmadi" }}
          >
            <Input
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
            />
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
