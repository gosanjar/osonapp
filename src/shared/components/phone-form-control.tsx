import React from "react"
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from "react-hook-form"
import { Label } from "@/shared/ui/label"
import { FieldError } from "@/shared/ui/field"
import { PhoneInput } from "./phone-input"
import { cn } from "@utils/utils"

const PHONE_PATTERN = /^\+998\d{9}$/

interface PhoneFormControlProps<T extends FieldValues> {
  name: Path<T>
  label?: string
  labelRight?: React.ReactNode
  required?: boolean
  rules?: RegisterOptions<T, Path<T>>
  className?: string
  placeholder?: string
}

export function PhoneFormControl<T extends FieldValues>({
  name,
  label = "Telefon raqam",
  labelRight,
  required = true,
  rules,
  className,
  placeholder,
}: PhoneFormControlProps<T>) {
  const { control } = useFormContext<T>()

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? "Maydon to'ldirilishi shart" : false,
        pattern: {
          value: PHONE_PATTERN,
          message: "Noto'g'ri format",
        },
        ...rules,
      }}
      render={({ field, fieldState: { error } }) => (
        <div className={cn("flex flex-col gap-1.5", className)}>
          {label && (
            <div className="flex items-center gap-2">
              <Label htmlFor={name}>
                {label}
                {required && <span className="text-destructive">*</span>}
              </Label>
              {labelRight}
            </div>
          )}
          <PhoneInput
            value={field.value ?? ""}
            onChange={field.onChange}
            onBlur={field.onBlur}
            aria-invalid={!!error}
            placeholder={placeholder}
          />
          <FieldError errors={error ? [error] : []} />
        </div>
      )}
    />
  )
}
