import { Send } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { getBotLabel } from "./telegram-bot"

export function TelegramBotButton({
  onClick,
  disabled = false,
  isPending = false,
  pendingText = "Yuborilmoqda...",
}: {
  onClick: () => void
  disabled?: boolean
  isPending?: boolean
  pendingText?: string
}) {
  return (
    <Button
      type="button"
      disabled={disabled || isPending}
      className="w-full bg-[#229ED9] text-white hover:bg-[#229ED9]/90"
      onClick={onClick}
    >
      <Send size={18} strokeWidth={2} />
      {isPending ? pendingText : getBotLabel()}
    </Button>
  )
}

interface TelegramBotCardProps {
  steps: string[]
  disabled?: boolean
  isPending?: boolean
  pendingText?: string
  onClick: () => void
}

export function TelegramBotCard({
  steps,
  disabled,
  isPending,
  pendingText,
  onClick,
}: TelegramBotCardProps) {
  return (
    <div className="rounded-xl border border-border bg-muted p-4">
      <p className="mb-2 text-sm font-medium">Telegram bot orqali tasdiqlang</p>
      <ol className="mb-3 space-y-1 text-sm text-muted-foreground">
        {steps.map((step, i) => (
          <li key={i}>
            {i + 1}. {step}
          </li>
        ))}
      </ol>
      <TelegramBotButton
        onClick={onClick}
        disabled={disabled}
        isPending={isPending}
        pendingText={pendingText}
      />
    </div>
  )
}
