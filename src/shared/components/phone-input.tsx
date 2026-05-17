import * as React from "react"
import { Input } from "@/shared/ui/input"

interface PhoneInputProps extends Omit<
  React.ComponentProps<"input">,
  "value" | "onChange"
> {
  value?: string
  onChange?: (value: string) => void
  "aria-invalid"?: boolean
}

const PREFIX = "+998"

// "901234567" → "90 123 45 67"
function formatDisplay(digits: string): string {
  const d = digits.slice(0, 9)
  const parts: string[] = []
  if (d.length > 0) parts.push(d.slice(0, 2))
  if (d.length > 2) parts.push(d.slice(2, 5))
  if (d.length > 5) parts.push(d.slice(5, 7))
  if (d.length > 7) parts.push(d.slice(7, 9))
  return parts.join(" ")
}

// "90 123 45 67" → "901234567"
function stripFormatting(str: string): string {
  return str.replace(/\D/g, "")
}

export function PhoneInput({
  value = "",
  onChange,
  "aria-invalid": ariaInvalid,
  placeholder = "90 123 45 67",
  ...props
}: PhoneInputProps) {
  const digits = value.startsWith(PREFIX) ? value.slice(PREFIX.length) : value
  const displayed = formatDisplay(digits)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = stripFormatting(e.target.value).slice(0, 9)
    onChange?.(PREFIX + raw)
  }

  return (
    <div className="flex w-full">
      <span className="flex shrink-0 items-center rounded-l-lg border border-r-0 border-input bg-muted px-2.5 text-sm font-medium text-muted-foreground select-none">
        +998
      </span>
      <Input
        type="tel"
        value={displayed}
        onChange={handleChange}
        placeholder={placeholder}
        aria-invalid={ariaInvalid}
        className="rounded-l-none"
        {...props}
      />
    </div>
  )
}
