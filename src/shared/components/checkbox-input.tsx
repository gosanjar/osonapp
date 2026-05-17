import { useId } from "react"
import { Checkbox } from "@/shared/ui/checkbox"
import { Label } from "@/shared/ui/label"
import Flex from "./flex"
import { cn } from "@utils/utils"

interface CheckboxInputProps {
  value?: boolean
  onChange?: (value: boolean) => void
  label?: string
  className?: string
  disabled?: boolean
  "aria-invalid"?: boolean
}

export function CheckboxInput({
  value,
  onChange,
  label,
  className,
  disabled,
}: CheckboxInputProps) {
  const id = useId()
  return (
    <Flex align="center" gap={2} className={cn(className)}>
      <Checkbox
        id={id}
        checked={!!value}
        onCheckedChange={(v) => onChange?.(!!v)}
        disabled={disabled}
      />
      {label && (
        <Label htmlFor={id} className="cursor-pointer">
          {label}
        </Label>
      )}
    </Flex>
  )
}
