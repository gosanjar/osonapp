import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { AuthRedirectLink } from "./components/auth-redirect-link"
import { ROUTES } from "@/shared/config/routes"
import { useForm, useWatch, FormProvider } from "react-hook-form"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import AuthLayout from "./layout"
import { AuthApi } from "@/entities/auth/api"
import { Button } from "@/shared/ui/button"
import { PhoneInput } from "@/shared/ui/phone-input"
import { Input } from "@/shared/ui/input"
import { FormControl } from "@/shared/ui/form-control"
import {
  PHONE_PATTERN,
  passwordRules,
  shopNameRules,
} from "@/shared/utils/validation"
import { getApiError } from "@/shared/api"

type Step = "phone" | "details"

const TelegramIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
  </svg>
)

type PhoneForm = { phone_number: string }
type DetailsForm = {
  first_name: string
  last_name: string
  shop_name: string
  password: string
  confirm_password: string
}

export default function RegisterPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>("phone")
  const [phone, setPhone] = useState("")
  const [registerToken, setRegisterToken] = useState("")
  const [botClickedPhone, setBotClickedPhone] = useState("")

  const phoneForm = useForm<PhoneForm>()
  const detailsForm = useForm<DetailsForm>()

  const phoneValue =
    useWatch({ control: phoneForm.control, name: "phone_number" }) || ""
  const botClicked = botClickedPhone === phoneValue
  const isPhoneValid = PHONE_PATTERN.test(phoneValue)

  const { data: phoneCheck, isFetching: isCheckingPhone } = useQuery({
    queryKey: ["check-phone", phoneValue],
    queryFn: () => AuthApi.checkPhone(phoneValue),
    enabled: isPhoneValid,
    retry: false,
  })

  useEffect(() => {
    if (phoneCheck?.data.exists) navigate(ROUTES.LOGIN, { state: { phone: phoneValue } })
  }, [phoneCheck, navigate])

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
          navigate(ROUTES.LOGIN, { state: { phone: phoneValue, alreadyRegistered: true } })
        } else if (data.register_token) {
          onRegisterToken(data.register_token)
        }
      } catch {
        /* ignore */
      }
    }

    ws.onerror = () => ws.close()

    return () => ws.close()
  }, [step, isPhoneValid, phoneValue, botClicked, onRegisterToken])

  const shopName =
    useWatch({ control: detailsForm.control, name: "shop_name" }) || ""
  const pw = useWatch({ control: detailsForm.control, name: "password" })

  useEffect(() => {
    const cleaned = shopName.replace(/[^a-zA-Z\s]/g, "")
    if (cleaned !== shopName) detailsForm.setValue("shop_name", cleaned)
  }, [shopName, detailsForm])

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
          <form className="space-y-4" noValidate>
            <FormControl<PhoneForm>
              name="phone_number"
              label="Telefon raqam"
              required
              labelRight={
                isCheckingPhone ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : null
              }
              rules={{
                pattern: {
                  value: PHONE_PATTERN,
                  message: "Noto'g'ri format. Masalan: +998901234567",
                },
              }}
            >
              <PhoneInput placeholder="90 123 45 67" />
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
              {isPhoneValid && !isCheckingPhone ? (
                <Button
                  className="w-full bg-[#229ED9] text-white hover:bg-[#229ED9]/90"
                  onClick={() => {
                    setBotClickedPhone(phoneValue)
                    const tab = window.open(`https://t.me/osonapp_bot?start=${phoneValue.replace(/\D/g, "")}`, "_blank")
                    if (tab) setTimeout(() => tab.close(), 2000)
                  }}
                >
                  <TelegramIcon />
                  @osonapp_bot ga o'tish
                </Button>
              ) : (
                <Button disabled className="w-full bg-[#229ED9] text-white">
                  <TelegramIcon />
                  @osonapp_bot ga o'tish
                </Button>
              )}
            </div>

            {isPhoneValid && botClicked && (
              <p className="animate-pulse text-center text-sm text-muted-foreground">
                Bot tasdiqlashi kutilmoqda...
              </p>
            )}
          </form>
        </FormProvider>

        <AuthRedirectLink
          text="Akkauntingiz bormi?"
          linkText="Kirish"
          to={ROUTES.LOGIN}
        />
      </AuthLayout>
    )
  }

  // step === "details"
  const errorMsg = getApiError(
    register.error,
    "Ro'yxatdan o'tishda xatolik yuz berdi"
  )
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
            rules={shopNameRules}
          >
            <Input placeholder="Mening dokonim" autoComplete="off" />
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
              placeholder="Kamida 8 ta belgi"
              autoComplete="new-password"
            />
          </FormControl>

          {errorMsg && (
            <p className="rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">
              {errorMsg}
            </p>
          )}

          <Button
            type="submit"
            disabled={register.isPending}
            className="mt-2 w-full"
          >
            {register.isPending ? "Yaratilmoqda..." : "Ro'yxatdan o'tish"}
          </Button>
        </form>
      </FormProvider>

      <AuthRedirectLink
        text="Akkauntingiz bormi?"
        linkText="Kirish"
        to={ROUTES.LOGIN}
      />
    </AuthLayout>
  )
}
