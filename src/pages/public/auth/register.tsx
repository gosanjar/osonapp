import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/shared/config/routes"
import { useForm, useWatch, FormProvider } from "react-hook-form"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import AuthLayout from "./layout"
import { AuthApi } from "@/entities/auth/api"
import { Button } from "@/shared/ui/button"
import { PhoneFormControl } from "@/shared/ui/phone-form-control"
import { TelegramBotCard } from "./components/telegram-bot-card"
import { openBot, getDeepLink } from "./components/telegram-bot"
import { Input } from "@/shared/ui/input"
import { FormControl } from "@/shared/ui/form-control"
import {
  PHONE_PATTERN,
  passwordRules,
  shopNameRules,
} from "@/shared/utils/validation"
import { getApiError } from "@/shared/api"

type Step = "phone" | "details"

type PhoneForm = { phone_number: string }
type DetailsForm = {
  first_name: string
  last_name: string
  subdomain: string
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
    if (phoneCheck?.data.exists)
      navigate(ROUTES.LOGIN, { state: { phone: phoneValue } })
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

    const apiUrl = (import.meta.env.VITE_API_URL as string) ?? ""
    const es = new EventSource(
      `${apiUrl}/auth/pre-reg-stream/?phone_number=${encodeURIComponent(phoneValue)}`
    )

    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data) as {
          register_token?: string
          already_registered?: boolean
        }
        if (data.already_registered) {
          navigate(ROUTES.LOGIN, {
            state: { phone: phoneValue, alreadyRegistered: true },
          })
        } else if (data.register_token) {
          onRegisterToken(data.register_token)
        }
      } catch {
        /* ignore */
      }
    }

    es.onerror = () => es.close()

    return () => es.close()
  }, [step, isPhoneValid, phoneValue, botClicked, onRegisterToken])

  const subdomain =
    useWatch({ control: detailsForm.control, name: "subdomain" }) || ""
  const pw = useWatch({ control: detailsForm.control, name: "password" })

  useEffect(() => {
    const cleaned = subdomain.replace(/[^a-zA-Z\s]/g, "")
    if (cleaned !== subdomain) detailsForm.setValue("subdomain", cleaned)
  }, [subdomain, detailsForm])

  const register = useMutation({
    mutationFn: ({ first_name, last_name, subdomain, password }: DetailsForm) =>
      AuthApi.register({
        first_name,
        last_name,
        subdomain,
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
      <AuthLayout
        redirectText="Akkauntingiz bormi?"
        redirectLinkText="Kirish"
        redirectTo={ROUTES.LOGIN}
      >
        <div className="mb-8">
          <h1 className="mb-1 text-2xl font-bold">Ro'yxatdan o'tish</h1>
          <p className="text-sm text-muted-foreground">
            Telefon raqamingizni kiriting va botni ulang
          </p>
        </div>

        <FormProvider {...phoneForm}>
          <form className="space-y-4" noValidate>
            <PhoneFormControl<PhoneForm>
              name="phone_number"
              labelRight={
                isCheckingPhone ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : null
              }
            />

            <TelegramBotCard
              steps={[
                "Quyidagi tugmani bosing",
                "Botda telefon raqamingizni ulashing",
                "Tasdiqlanishi bilan avtomatik davom etadi",
              ]}
              disabled={!isPhoneValid || isCheckingPhone}
              onClick={() => {
                setBotClickedPhone(phoneValue)
                openBot(getDeepLink(phoneValue.replace(/\D/g, "")))
              }}
            />

            {isPhoneValid && botClicked && (
              <p className="animate-pulse text-center text-sm text-muted-foreground">
                Bot tasdiqlashi kutilmoqda...
              </p>
            )}
          </form>
        </FormProvider>
      </AuthLayout>
    )
  }

  // step === "details"
  const errorMsg = getApiError(
    register.error,
    "Ro'yxatdan o'tishda xatolik yuz berdi"
  )

  return (
    <AuthLayout
      redirectText="Akkauntingiz bormi?"
      redirectLinkText="Kirish"
      redirectTo={ROUTES.LOGIN}
    >
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
            name="subdomain"
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
    </AuthLayout>
  )
}
