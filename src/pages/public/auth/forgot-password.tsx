import { Send } from "lucide-react"
import { useForm, FormProvider, useWatch } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { ROUTES } from "@/shared/config/routes"
import AuthLayout from "./layout"
import { AuthApi } from "@/entities/auth/api"
import { PhoneFormControl } from "@shared/phone-form-control"
import { getApiError } from "@/shared/api"
import { PHONE_PATTERN } from "@/shared/utils/validation"
import { TelegramBotCard, TelegramBotButton } from "./components/telegram-bot-card"
import { openBot } from "./components/telegram-bot"

type PhoneForm = { phone_number: string }

export default function ForgotPasswordPage() {
  const form = useForm<PhoneForm>()
  const phoneValue =
    useWatch({ control: form.control, name: "phone_number" }) || ""
  const isPhoneValid = PHONE_PATTERN.test(phoneValue)

  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: (phone_number: string) => AuthApi.forgotPassword(phone_number),
    onSuccess: () => openBot(),
  })

  const errorMsg = getApiError(error, "Xatolik yuz berdi")

  if (isSuccess) {
    return (
      <AuthLayout
        redirectText="Esladingizmi?"
        redirectLinkText="Kirish"
        redirectTo={ROUTES.LOGIN}
      >
        <div className="mb-8">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Send size={24} strokeWidth={2} className="text-primary" />
          </div>
          <h1 className="mb-1 text-2xl font-bold">Telegram ga o'ting</h1>
          <p className="text-sm text-muted-foreground">
            Parolni tiklash havolasi Telegram botga yuborildi. Botni oching va
            havolaga bosing.
          </p>
        </div>

        <TelegramBotButton onClick={() => openBot()} />
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      redirectText="Esladingizmi?"
      redirectLinkText="Kirish"
      redirectTo={ROUTES.LOGIN}
    >
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-bold">Parolni tiklash</h1>
        <p className="text-sm text-muted-foreground">
          Telegram botga bog'langan telefon raqamingizni kiriting
        </p>
      </div>

      <FormProvider {...form}>
        <form className="space-y-4" noValidate>
          <PhoneFormControl<PhoneForm> name="phone_number" />

          {errorMsg && (
            <p className="rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">
              {errorMsg}
            </p>
          )}

          <TelegramBotCard
            steps={[
              "Quyidagi tugmani bosing",
              "Bot parolni tiklash havolasini yuboradi",
              "Havolaga bosib parolni yangilang",
            ]}
            disabled={!isPhoneValid}
            isPending={isPending}
            onClick={() => mutate(phoneValue)}
          />
        </form>
      </FormProvider>
    </AuthLayout>
  )
}
