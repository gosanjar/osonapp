import { useForm } from "react-hook-form"

type Props = {
  phone: string
  isPending: boolean
  error: string | null
  onSubmit: (otp: string) => void
  onBack: () => void
}

export function OtpStep({ phone, isPending, error, onSubmit, onBack }: Props) {
  const { register, handleSubmit } = useForm<{ otp: string }>()

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-bold">Kodni kiriting</h1>
        <p className="text-sm text-muted-foreground">
          Telegram botga{" "}
          <span className="font-medium text-foreground">{phone}</span> raqamiga
          kod yuborildi
        </p>
      </div>

      <form onSubmit={handleSubmit((d) => onSubmit(d.otp))} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm text-muted-foreground">
            Tasdiqlash kodi
          </label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="123456"
            maxLength={6}
            className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-center text-xl tracking-widest text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            {...register("otp", { required: true, minLength: 6, maxLength: 6 })}
          />
        </div>

        {error && (
          <p className="rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="mt-2 w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {isPending ? "Tekshirilmoqda..." : "Tasdiqlash"}
        </button>

        <button
          type="button"
          onClick={onBack}
          className="w-full text-center text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Orqaga
        </button>
      </form>
    </div>
  )
}
