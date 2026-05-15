import * as React from "react"
import { Input } from "./input"

interface PhoneInputProps extends Omit<
  React.ComponentProps<"input">,
  "value" | "onChange"
> {
  value?: string
  onChange?: (value: string) => void
  "aria-invalid"?: boolean
}

const PREFIX = "+998"

export function PhoneInput({
  value = "",
  onChange,
  "aria-invalid": ariaInvalid,
  ...props
}: PhoneInputProps) {
  const suffix = value.startsWith(PREFIX) ? value.slice(PREFIX.length) : value

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(PREFIX + e.target.value.replace(/\D/g, ""))
  }

  return (
    <div className="flex w-full">
      <span className="flex shrink-0 items-center rounded-l-lg border border-r-0 border-input bg-muted px-2.5 text-sm font-medium text-muted-foreground select-none">
        +998
      </span>
      <Input
        type="tel"
        value={suffix}
        onChange={handleChange}
        maxLength={9}
        aria-invalid={ariaInvalid}
        className="rounded-l-none"
        {...props}
      />
    </div>
  )
}
