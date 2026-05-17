import type { ReactNode } from "react"
import Flex from "./flex"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"

export interface SelectOption {
  value: string
  label: string
}

interface SelectInputProps {
  options: SelectOption[]
  label?: ReactNode
  placeholder?: string
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  disabled?: boolean
  "aria-invalid"?: boolean
}

export function SelectInput({
  options,
  label,
  placeholder,
  value,
  defaultValue,
  onChange,
  disabled,
  "aria-invalid": ariaInvalid,
}: SelectInputProps) {
  return (
    <Flex direction="column">
      {label && <label className="text-sm font-medium">{label}</label>}
      <Select value={value} defaultValue={defaultValue} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className="w-full" aria-invalid={ariaInvalid}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Flex>
  )
}
