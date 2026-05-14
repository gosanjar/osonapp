import React, { cloneElement } from "react"
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from "react-hook-form"
import { Label } from "./label"
import { FieldError } from "./field"
import { cn } from "@utils/utils"

interface ChildProps {
  error?: string
  name?: string
  value?: unknown
  onChange?: (...args: unknown[]) => void
  required?: boolean
  "aria-invalid"?: boolean
}

interface FormControlProps<T extends FieldValues> {
  name: Path<T>
  label?: string
  required?: boolean
  rules?: RegisterOptions<T, Path<T>>
  className?: string
  children: React.ReactElement<ChildProps>
}

export function FormControl<T extends FieldValues>({
  name,
  label,
  required,
  rules,
  className,
  children,
}: FormControlProps<T>) {
  const { control } = useFormContext<T>()

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? "Maydon to'ldirilishi shart" : false,
        ...rules,
      }}
      render={({ field, fieldState: { error } }) => (
        <div className={cn("flex flex-col gap-1.5", className)}>
          {label && (
            <Label htmlFor={name}>
              {label}
              {required && <span className="text-destructive">*</span>}
            </Label>
          )}
          {cloneElement(children, {
            ...field,
            "aria-invalid": !!error,
            error: error?.message,
            required,
            onChange: (...args: unknown[]) => {
              field.onChange(...args)
              children.props.onChange?.(...args)
            },
          })}
          <FieldError errors={error ? [error] : []} />
        </div>
      )}
    />
  )
}
